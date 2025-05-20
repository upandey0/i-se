import { useState, useEffect, useCallback } from 'react';
import { getInternships, getProfiles, getLocations, getDurations } from '../api/internshipApi';
import type { Internship, Filters } from '../types/internship.type';
import { useFilters } from '../contexts/FilterContext';

interface UseInternshipsReturn {
  internships: Internship[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  availableFilters: {
    profiles: string[];
    locations: string[];
    durations: string[];
  };
  currentPage: number;
  hasMore: boolean;
  loadMore: () => void;
  applyFilters: (newFilters: Partial<Filters>) => void;
  resetFilters: () => void;
}

export const useInternships = (): UseInternshipsReturn => {
  const { filters, updateFilters, clearFilters } = useFilters();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [availableFilters, setAvailableFilters] = useState<{
    profiles: string[];
    locations: string[];
    durations: string[];
  }>({
    profiles: [],
    locations: [],
    durations: [],
  });

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [profilesResponse, locationsResponse, durationsResponse] = await Promise.all([
          getProfiles(),
          getLocations(),
          getDurations(),
        ]);

        if (!profilesResponse.isError && profilesResponse.data) {
          setAvailableFilters(prev => ({
            ...prev,
            profiles: Array.isArray(profilesResponse.data) 
              ? profilesResponse.data
              : Object.keys(profilesResponse.data),
          }));
        }

        if (!locationsResponse.isError && locationsResponse.data) {
          setAvailableFilters(prev => ({
            ...prev,
            locations: Array.isArray(locationsResponse.data) 
              ? locationsResponse.data
              : Object.keys(locationsResponse.data),
          }));
        }

        if (!durationsResponse.isError && durationsResponse.data) {
          setAvailableFilters(prev => ({
            ...prev,
            durations: Array.isArray(durationsResponse.data) 
              ? durationsResponse.data
              : Object.keys(durationsResponse.data),
          }));
        }
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch internships
  const fetchInternships = useCallback(async (page: number = 1, resetList: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getInternships(filters, page, 10);
      console.log('Fetched With or Without Filter internships:', response);
      if (response && Array.isArray(response)) {
        if (resetList) {
          setInternships(response);
        } else {
          setInternships(prev => [...prev, ...response]);
        }
        
        setTotalCount(response.length); 
        setHasMore(response.length === 10); 
      } else if (response && response.internships) {
        if (resetList) {
          setInternships(response.internships);
        } else {
          setInternships(prev => [...prev, ...response.internships]);
        }
        
        setTotalCount(response.total);
        setHasMore(response.internships.length > 0 && response.internships.length === 10);
      } else {
        setError('Failed to load internships');
        setInternships([]);
        setTotalCount(0);
      }
    } catch (err) {
      setError('An error occurred while fetching internships');
      console.error('Internship fetch error:', err);
      setInternships([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Initial fetch and when filters change
  useEffect(() => {
    setCurrentPage(1);
    fetchInternships(1, true);
  }, [filters, fetchInternships]);

  // Load more internships
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchInternships(nextPage, false);
    }
  }, [currentPage, fetchInternships, hasMore, loading]);

  // Apply filters - integrates with FilterContext
  const applyFilters = useCallback((newFilters: Partial<Filters>) => {
    updateFilters(newFilters);
    // The useEffect hook will handle fetching with the new filters
  }, [updateFilters]);

  // Reset filters - integrates with FilterContext
  const resetFilters = useCallback(() => {
    clearFilters();
    // The useEffect hook will handle fetching with reset filters
  }, [clearFilters]);

  return {
    internships,
    totalCount,
    loading,
    error,
    availableFilters,
    currentPage,
    hasMore,
    loadMore,
    applyFilters,
    resetFilters,
  };
};