export const CONSTANTS = {
  ITEMS_PER_PAGE: 10,
  DEFAULT_STIPEND_MIN: 0,
  DEFAULT_STIPEND_MAX: 20000,
  MAX_STIPEND_VALUE: 50000,
  MAX_FILTER_ITEMS: 100,
};

export const WORK_TYPES = {
  REMOTE: 'Work from home',
  PART_TIME: 'Part-time',
  FULL_TIME: 'Full-time',
  INTERNSHIP: 'Internship'
};

// Mock data for when API is unavailable or for development
export const MOCK_PROFILES = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'Digital Marketing',
  'Content Writing',
  'UI/UX Design',
  'Graphic Design',
  'Business Development',
  'Finance',
  'HR',
  'Operations',
  'Sales',
  'Marketing',
  'Fashion Design',
];

export const MOCK_LOCATIONS = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Remote',
];

export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  STIPEND_HIGH_TO_LOW: 'stipend_high_to_low',
  STIPEND_LOW_TO_HIGH: 'stipend_low_to_high',
  DEADLINE_NEAREST: 'deadline_nearest'
};

export const FILTER_KEYS = {
  PROFILE: 'profile',
  LOCATION: 'location',
  DURATION: 'duration',
  REMOTE: 'isRemote',
  PART_TIME: 'isPartTime',
  STIPEND_RANGE: 'stipendRange'
};


export const MOCK_DURATIONS = [
  '1 Month',
  '2 Months',
  '3 Months',
  '4 Months',
  '5 Months',
  '6 Months',
];

export const DEFAULT_STIPEND_RANGE = {
  min: 0,
  max: 20000
};

export const ITEMS_PER_PAGE = 10;
