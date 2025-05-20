import type { Internship } from '../types/internship.type';

/**
 * Transforms the API response format to match the Internship interface
 * @param apiData Raw API response data
 * @returns Formatted array of internships
 */
export const transformInternshipData = (apiData: any): Internship[] => {
  if (!apiData || typeof apiData !== 'object') {
    return [];
  }
  
  // Handle the specific structure of the API response
  if (apiData.internships_meta && apiData.internship_ids) {
    // Get all internships using the IDs in the order they appear
    return apiData.internship_ids.map((id: number) => {
      const item = apiData.internships_meta[id];
      if (!item) return null;

      // Extract stipend amount and period from stipend.salary
      const stipendInfo = parseStipendInfo(item.stipend?.salary || '');
      
      // Transform location names to a single string
      const location = Array.isArray(item.location_names) 
        ? item.location_names.join(', ') 
        : (item.location_names || '');
      
      // Extract skills from item if available
      const skills = item.skills || [];
      
      // Calculate days left from application_deadline if available
      const daysLeft = calculateDaysLeft(item.application_deadline);
      
      return {
        id: String(item.id || ''),
        title: item.title || '',
        company: item.company_name || '',
        location: location,
        isRemote: item.work_from_home || false,
        duration: item.duration || '',
        stipend: {
          amount: stipendInfo.amount,
          period: stipendInfo.period,
        },
        startDate: item.start_date || '',
        applyBy: item.application_deadline || item.expiring_in || '',
        postedOn: item.posted_on || '',
        openings: item.openings || undefined,
        applicants: extractApplicantsCount(item.application_status_message),
        skills: skills,
        description: item.description || '',
        isPartTime: item.part_time || false,
        logo: item.company_logo || '',
        isHiring: item.is_ppo || false,
        daysLeft: daysLeft,
      };
    }).filter(Boolean); // Remove any null entries
  }
  
  // Fallback to the previous logic for other data structures
  // Handle both array or object with ID keys formats
  const dataItems = Array.isArray(apiData) 
    ? apiData 
    : Object.values(apiData);
  
  return dataItems.map((item: any): Internship => {
    // Extract stipend amount and period from stipend.salary
    const stipendInfo = parseStipendInfo(item.stipend?.salary || '');
    
    // Transform location names to a single string
    const location = Array.isArray(item.location_names) 
      ? item.location_names.join(', ') 
      : (item.location_names || '');
    
    // Extract skills from item if available
    const skills = item.skills || [];
    
    // Calculate days left from application_deadline if available
    const daysLeft = calculateDaysLeft(item.application_deadline);
    
    return {
      id: String(item.id || ''),
      title: item.title || '',
      company: item.company_name || '',
      location: location,
      isRemote: item.work_from_home || false,
      duration: item.duration || '',
      stipend: {
        amount: stipendInfo.amount,
        period: stipendInfo.period,
      },
      startDate: item.start_date || '',
      applyBy: item.application_deadline || item.expiring_in || '',
      postedOn: item.posted_on || '',
      openings: item.openings || undefined,
      applicants: extractApplicantsCount(item.application_status_message),
      skills: skills,
      description: item.description || '',
      isPartTime: item.part_time || false,
      logo: item.company_logo || '',
      isHiring: item.is_ppo || false,
      daysLeft: daysLeft,
    };
  });
};

/**
 * Parse stipend information from a string like "₹ 20,000 /month"
 */
const parseStipendInfo = (stipendString: string): { amount: string; period: string } => {
  // Default values
  const defaultResult = { amount: '0', period: 'month' };
  
  if (!stipendString) return defaultResult;
  
  // Try to extract amount and period using regex
  const match = stipendString.match(/([₹$€£]?\s?[\d,]+)\s*(?:\/|\s+per\s+)?(\w+)?/i);
  
  if (!match) return defaultResult;
  
  return {
    amount: match[1]?.trim() || '0',
    period: match[2]?.toLowerCase() || 'month',
  };
};

/**
 * Extract applicants count from application status message
 */
const extractApplicantsCount = (statusMessage: any): number | undefined => {
  if (!statusMessage) return undefined;
  
  // If it's a string, try to extract the number
  if (typeof statusMessage === 'string') {
    const match = statusMessage.match(/(\d+)\s*applicants?/i);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return undefined;
  }
  
  // If it's an object with a message property
  if (typeof statusMessage === 'object' && statusMessage.message) {
    const match = statusMessage.message.match(/(\d+)\s*applicants?/i);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
  }
  
  return undefined;
};

/**
 * Calculate days left from a deadline string
 */
const calculateDaysLeft = (deadline: string | undefined): number | undefined => {
  if (!deadline) return undefined;
  
  // Try to parse dates like "24 Jan' 24"
  const datePattern = /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(?:'|')?\s*(\d{2})?/i;
  const match = deadline.match(datePattern);
  
  if (!match) return undefined;
  
  const day = parseInt(match[1], 10);
  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const month = monthNames.findIndex(m => m.toLowerCase() === match[2].toLowerCase());
  
  if (month === -1) return undefined;
  
  // Handle two-digit year
  let year = new Date().getFullYear();
  if (match[3]) {
    year = parseInt(`20${match[3]}`, 10);
  }
  
  const deadlineDate = new Date(year, month, day);
  const currentDate = new Date();
  
  // Calculate difference in days
  const diffTime = deadlineDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};