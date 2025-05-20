export const API_ROUTE = {
  // Internship routes
  INTERNSHIPS: 'internships',
  INTERNSHIP_DETAILS: 'internship/{id}',
  
  // Filter related routes
  PROFILES: 'filters/profiles',
  LOCATIONS: 'filters/locations',
  DURATIONS: 'filters/durations',
} as const;

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:3000/api';