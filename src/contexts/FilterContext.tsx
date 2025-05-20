import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Filters } from '../types/internship.type';

const defaultFilters: Filters = {
  profile: [],
  location: [],
  duration: [],
};

interface FilterContextType {
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  clearFilters: () => void;
  clearFilter: (filterKey: keyof Filters) => void;
}

const FilterContext = createContext<FilterContextType>({
  filters: defaultFilters,
  updateFilters: () => {},
  clearFilters: () => {},
  clearFilter: () => {}
});

export const useFilters = () => useContext(FilterContext);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  // Initialize filters from localStorage or default values
  const [filters, setFilters] = useState<Filters>(() => {
    const savedFilters = localStorage.getItem('internshipFilters');
    return savedFilters ? JSON.parse(savedFilters) : defaultFilters;
  });

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('internshipFilters', JSON.stringify(filters));
  }, [filters]);

  // Update filters with new values
  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  // Clear a specific filter
  const clearFilter = (filterKey: keyof Filters) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
     
      if (Array.isArray(newFilters[filterKey])) {
        newFilters[filterKey] = [] as any;
      } else if (filterKey === 'stipendRange') {
        // Remove the stipendRange property entirely instead of setting it to default
        delete newFilters.stipendRange;
      } else if (filterKey === 'isRemote' || filterKey === 'isPartTime') {
        // Remove the boolean properties entirely instead of setting them to false
        delete newFilters[filterKey];
      } else {
        newFilters[filterKey] = defaultFilters[filterKey];
      }
     
      return newFilters;
    });
  };

  const value = {
    filters,
    updateFilters,
    clearFilters,
    clearFilter
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};