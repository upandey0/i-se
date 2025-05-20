export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  isRemote?: boolean;
  duration: string;
  stipend: {
    amount: string;
    period: string;
  };
  startDate?: string;
  applyBy?: string;
  postedOn?: string;
  openings?: number;
  applicants?: number;
  skills?: string[];
  description?: string;
  isPartTime?: boolean;
  logo?: string;
  isHiring?: boolean;
  daysLeft?: number;
}

// Filter types
export interface Filters {
  profile: string[];
  location: string[];
  duration: string[];
  isRemote?: boolean;
  isPartTime?: boolean;
  stipendRange?: {
    min: number;
    max: number;
  };
}

export interface InternshipResponse {
  internships: Internship[];
  total: number;
  page: number;
  limit: number;
}


export type SortOption = 'newest' | 'oldest' | 'stipend_high_to_low' | 'stipend_low_to_high' | 'deadline_nearest';
