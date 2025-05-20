/**
 * Formats a number as currency (INR)
 * @param value Number to format
 * @param currency Currency symbol, defaults to '₹'
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency = '₹'): string => {
  if (value === 0) return `${currency}0`;
  
  // Format thousands with K
  if (value >= 1000) {
    const valueInK = value / 1000;
    return `${currency}${valueInK}K`;
  }
  
  return `${currency}${value}`;
};

/**
 * Formats a date string in a human-readable format
 * @param dateString Date string to format
 * @param options Intl.DateTimeFormatOptions for customizing output
 * @returns Formatted date string
 */
export const formatDate = (
  dateString?: string, 
  options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  }
): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', options).format(date);
  } catch (error) {
    return dateString;
  }
};

/**
 * Calculates days left until a deadline
 * @param deadlineString Deadline date string
 * @returns String representation of days left
 */
export const getDaysLeft = (deadlineString?: string): string => {
  if (!deadlineString) return '';
  
  try {
    const deadline = new Date(deadlineString);
    const today = new Date();
    
    // Reset time part to compare only dates
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);
    
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'Expired';
    } else if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return '1 day left';
    } else {
      return `${diffDays} days left`;
    }
  } catch (error) {
    return '';
  }
};