export interface Internship {
  id: string;
  title: string;
  company_name: string;
  company_logo?: string;
  locations: string[];
  start_date: string;
  duration: string;
  stipend: {
    salary: string;
    currency: string;
  };
  work_from_home: boolean;
  part_time: boolean;
  applies_count?: number;
  posted_date?: string;
  application_deadline?: string;
  is_actively_hiring: boolean;
  skills_required?: string[];
}

export interface FilterState {
  profile: string;
  location: string;
  duration: string;
  workFromHome: boolean;
  partTime: boolean;
  salary: {
    min: number;
    max: number;
  };
}

export interface InternshipResponse {
  internships: Internship[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}