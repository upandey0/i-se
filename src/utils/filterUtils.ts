import type { Filters, Internship } from '../types/internship.type';

/**
 * Applies all selected filters to the internship data
 * @param internships Array of internship objects
 * @param filters Object containing filter criteria
 * @returns Filtered array of internships
 */
export const applyFilters = (internships: Internship[], filters: Partial<Filters>): Internship[] => {
  if (!filters || Object.keys(filters).length === 0) {
    return internships;
  }

  return internships.filter(internship => {
    // Profile filter
    if (filters.profile && filters.profile.length > 0) {
      if (!internship.profile || !filters.profile.includes(internship.profile)) {
        return false;
      }
    }

    // Location filter
    if (filters.location && filters.location.length > 0) {
      if (!internship.location || !filters.location.includes(internship.location)) {
        return false;
      }
    }

    // Duration filter
    if (filters.duration && filters.duration.length > 0) {
      if (!internship.duration || !filters.duration.includes(internship.duration)) {
        return false;
      }
    }

    // Remote work filter
    if (filters.isRemote !== undefined) {
      if (internship.isRemote !== filters.isRemote) {
        return false;
      }
    }

    // Part-time filter
    if (filters.isPartTime !== undefined) {
      if (internship.isPartTime !== filters.isPartTime) {
        return false;
      }
    }

    // Stipend range filter
    if (filters.stipendRange) {
      // Extract numeric value from stipend
      const stipendAmount = parseStipendAmount(internship.stipend?.amount);
      
      if (isNaN(stipendAmount) || 
          stipendAmount < filters.stipendRange.min || 
          stipendAmount > filters.stipendRange.max) {
        return false;
      }
    }

    // All filters passed
    return true;
  });
};

/**
 * Searches internships by a text query
 * Searches across multiple fields like title, company, profile, etc.
 * @param internships Array of internship objects
 * @param query Search query string
 * @returns Filtered array of internships
 */
export const searchInternships = (internships: Internship[], query: string): Internship[] => {
  if (!query || query.trim() === '') {
    return internships;
  }

  const searchTerm = query.toLowerCase().trim();
  
  return internships.filter(internship => {
    // Search in common text fields
    const searchableFields = [
      'title',
      'company',
      'profile',
      'location',
      'description',
    ];
    
    return searchableFields.some(field => {
      const value = internship[field as keyof Internship];
      return value && 
        typeof value === 'string' && 
        value.toLowerCase().includes(searchTerm);
    });
  });
};

/**
 * Sorts internships based on specified criteria
 * @param internships Array of internship objects
 * @param sortBy Field to sort by
 * @param sortOrder Sort direction ('asc' or 'desc')
 * @returns Sorted array of internships
 */
export const sortInternships = (
  internships: Internship[], 
  sortBy: keyof Internship, 
  sortOrder: 'asc' | 'desc' = 'asc'
): Internship[] => {
  if (!sortBy) {
    return internships;
  }

  return [...internships].sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];
    
    // Handle stipend special case
    if (sortBy === 'stipend') {
      valueA = parseStipendAmount(a.stipend?.amount);
      valueB = parseStipendAmount(b.stipend?.amount);
    }
    
    // Handle numeric values
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }
    
    // Handle string values
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
      return sortOrder === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    // Handle date values
    if (sortBy === 'startDate' || sortBy === 'postedOn' || sortBy === 'applyBy') {
      const dateA = valueA ? new Date(valueA as string).getTime() : 0;
      const dateB = valueB ? new Date(valueB as string).getTime() : 0;
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    // Default return
    return 0;
  });
};

/**
 * Helper function to parse stipend amount from string
 * Handles different formats like "₹5000", "5000", "5K", etc.
 * @param stipendStr Stipend amount as string
 * @returns Numeric value of stipend
 */
export const parseStipendAmount = (stipendStr?: string): number => {
  if (!stipendStr) return 0;
  
  // Remove currency symbols and commas
  const cleanedStr = stipendStr.replace(/[₹,]/g, '').trim();
  
  // Handle "K" notation (e.g., "5K" -> 5000)
  if (cleanedStr.toLowerCase().includes('k')) {
    const value = parseFloat(cleanedStr.toLowerCase().replace('k', ''));
    return isNaN(value) ? 0 : value * 1000;
  }
  
  // Handle ranges (e.g., "5000-10000" -> take the average)
  if (cleanedStr.includes('-')) {
    const [min, max] = cleanedStr.split('-').map(part => parseFloat(part.trim()));
    if (!isNaN(min) && !isNaN(max)) {
      return (min + max) / 2;
    }
  }
  
  // Handle simple numeric values
  const value = parseFloat(cleanedStr);
  return isNaN(value) ? 0 : value;
};