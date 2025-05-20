// src/services/internshipService.ts
import { API_ROUTE } from './apiRoutes';
import { _get } from './apiClient';
import type { Filters, InternshipResponse } from '../types/internship.type';
import { transformInternshipData } from '../utils/adapter';
import { applyFilters } from '../utils/filterUtils';

// Cache for storing all internships to avoid repeated API calls
let internshipCache: any[] = [];

/**
 * Fetches internship data from the API and applies client-side filtering
 * @param filters Optional filters to apply to the search
 * @param page Optional page number for pagination
 * @param limit Optional limit of internships per page
 * @returns Promise with filtered internship data
 */
export const getInternships = async (
  filters?: Partial<Filters>,
  page: number = 1,
  limit: number = 10
): Promise<InternshipResponse> => {
  // If we don't have cached data yet, fetch all internships
  if (internshipCache.length === 0) {
    const url = API_ROUTE.INTERNSHIPS;
    const response: { isError?: boolean; data?: { data?: any } } = await _get(url);
    
    if (!response.isError && response.data && response.data.data) {
      internshipCache = transformInternshipData(response.data.data);
    }
  }
  console.log('Filters Applied:', filters)
  // Apply filters to the cached internships
  const filteredInternships = filters ? applyFilters(internshipCache, filters) : internshipCache;
  
  // Handle pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedInternships = filteredInternships.slice(startIndex, endIndex);
  
  return {
    internships: paginatedInternships,
    total: filteredInternships.length,
    page,
    limit
  };
};

/**
 * Clears the internship cache
 * Useful for refreshing data or handling logout
 */
export const clearInternshipCache = () => {
  internshipCache = [];
};

/**
 * Fetches available profile categories for filtering
 * @returns Promise with profile data
 */
export const getProfiles = async () => {
  const url = API_ROUTE.PROFILES;
  return await _get(url);
};

/**
 * Fetches available locations for filtering
 * @returns Promise with location data
 */
export const getLocations = async () => {
  const url = API_ROUTE.LOCATIONS;
  return await _get(url);
};

/**
 * Fetches available durations for filtering
 * @returns Promise with duration data
 */
export const getDurations = async () => {
  const url = API_ROUTE.DURATIONS;
  return await _get(url);
};

/**
 * Extracts unique values for a specific field from internship data
 * Useful for generating filter options dynamically
 * @param field The field to extract values from
 * @returns Array of unique values
 */
export const getUniqueValuesFromInternships = async (field: string): Promise<string[]> => {
  // Ensure we have data in the cache
  if (internshipCache.length === 0) {
    await getInternships();
  }
  
  // Extract unique values
  const values = new Set<string>();
  
  internshipCache.forEach(internship => {
    if (internship[field] && typeof internship[field] === 'string') {
      values.add(internship[field]);
    }
  });
  
  return Array.from(values).sort();
};
