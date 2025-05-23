import React, { useState, useEffect, useRef } from 'react';
import { useFilters } from '../../contexts/FilterContext';
import { SearchInput } from '../common/SearchInput';
import { Checkbox } from '../common/Checkbox';
import { RangeSlider } from '../common/RangeSlider';
import { Button } from '../common/Button';

// Mock data for filter options - in a real app, these would come from an API
const profileOptions = [
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

const locationOptions = [
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

const durationOptions = [
  '1 Month',
  '2 Months',
  '3 Months',
  '4 Months',
  '5 Months',
  '6 Months',
];

export const FilterSection: React.FC = () => {
  const { filters, updateFilters, clearFilters } = useFilters();
  
  // Search inputs for filters
  const [profileSearch, setProfileSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  
  // Filtered options based on search
  const [filteredProfiles, setFilteredProfiles] = useState<string[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  
  // Track if user has typed enough to show suggestions
  const [showProfileSuggestions, setShowProfileSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  
  // Create refs for the suggestion containers
  const profileSuggestionsRef = useRef<HTMLDivElement>(null);
  const locationSuggestionsRef = useRef<HTMLDivElement>(null);
  const profileInputRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside suggestions to dismiss them
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // For profile suggestions
      if (showProfileSuggestions && 
          profileSuggestionsRef.current && 
          !profileSuggestionsRef.current.contains(event.target as Node) &&
          profileInputRef.current && 
          !profileInputRef.current.contains(event.target as Node)) {
        setShowProfileSuggestions(false);
      }
      
      // For location suggestions
      if (showLocationSuggestions && 
          locationSuggestionsRef.current && 
          !locationSuggestionsRef.current.contains(event.target as Node) &&
          locationInputRef.current && 
          !locationInputRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
    }
    
    // Add event listener when suggestions are showing
    if (showProfileSuggestions || showLocationSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileSuggestions, showLocationSuggestions]);
  
  // Update filtered options when search changes
  useEffect(() => {
    if (profileSearch.trim().length > 0) {
      setFilteredProfiles(
        profileOptions.filter(profile => 
          profile.toLowerCase().includes(profileSearch.toLowerCase())
        )
      );
      setShowProfileSuggestions(true);
    } else {
      setFilteredProfiles([]);
      setShowProfileSuggestions(false);
    }
  }, [profileSearch]);
  
  useEffect(() => {
    if (locationSearch.trim().length > 0) {
      setFilteredLocations(
        locationOptions.filter(location => 
          location.toLowerCase().includes(locationSearch.toLowerCase())
        )
      );
      setShowLocationSuggestions(true);
    } else {
      setFilteredLocations([]);
      setShowLocationSuggestions(false);
    }
  }, [locationSearch]);
  
  // Handle selecting a profile
  const handleProfileSelect = (profile: string) => {
    const currentProfiles = [...(filters.profile || [])];
    if (!currentProfiles.includes(profile)) {
      updateFilters({ profile: [...currentProfiles, profile] });
    }
    setProfileSearch('');
    setShowProfileSuggestions(false);
  };
  
  // Handle selecting a location
  const handleLocationSelect = (location : any) => {
    const currentLocations = [...(filters.location || [])];
    if (!currentLocations.includes(location)) {
      updateFilters({ location: [...currentLocations, location] });
    }
    setLocationSearch('');
    setShowLocationSuggestions(false);
  };
  
  const handleDurationChange = (duration: string, isChecked: boolean) => {
    const currentDurations = [...(filters.duration || [])];
    
    if (isChecked) {
      updateFilters({ duration: [...currentDurations, duration] });
    } else {
      updateFilters({ 
        duration: currentDurations.filter(d => d !== duration) 
      });
    }
  };
  
  const handleStipendChange = (value: { min: number; max: number }) => {
    // Ensure min doesn't exceed max
    const validValue = {
      min: Math.min(value.min, value.max),
      max: Math.max(value.min, value.max)
    };
    
    // Ensure max doesn't exceed the maximum allowed value
    validValue.max = Math.min(validValue.max, 20000);
    
    updateFilters({ stipendRange: validValue });
  };
  
  const handleRemoteChange = (isChecked: any) => {
    updateFilters({ isRemote: isChecked ? true : undefined });
  };
  
  const handlePartTimeChange = (isChecked: any) => {
    updateFilters({ isPartTime: isChecked ? true : undefined });
  };
  
  const formatStipend = (value: number) => {
    if (value === 0) return '₹0';
    if (value >= 1000) return `₹${value / 1000}K`;
    return `₹${value}`;
  };
  
  
  // Manually handle focus
  const handleProfileInputChange = (value: string) => {
    setProfileSearch(value);
  };
  
  const handleLocationInputChange = (value: string) => {
    setLocationSearch(value);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-5 transition-colors duration-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
        
        {/* Clear filters button - now prominently displayed at the top */}
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={clearFilters}
        >
          Clear All
        </Button>
      </div>
      
      {/* Profile Filter */}
      <div className="relative">
        <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Profile</h3>
        <div ref={profileInputRef}>
          <SearchInput 
            value={profileSearch}
            onChange={handleProfileInputChange}
            placeholder="Search for profiles..."
            className="mb-2 w-full"
          />
        </div>
        {showProfileSuggestions && filteredProfiles.length > 0 && (
          <div 
            ref={profileSuggestionsRef}
            className="absolute z-20 bg-white dark:bg-gray-700 shadow-lg rounded-md mt-1 w-full max-h-48 overflow-y-auto"
          >
            {filteredProfiles.map(profile => (
              <div 
                key={profile}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                onClick={() => handleProfileSelect(profile)}
              >
                {profile}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Location Filter */}
      <div className="relative">
        <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Location</h3>
        <div ref={locationInputRef}>
          <SearchInput 
            value={locationSearch}
            onChange={handleLocationInputChange}
            placeholder="Search for locations..."
            className="mb-2 w-full"
          />
        </div>
        {showLocationSuggestions && filteredLocations.length > 0 && (
          <div 
            ref={locationSuggestionsRef}
            className="absolute z-20 bg-white dark:bg-gray-700 shadow-lg rounded-md mt-1 w-full max-h-48 overflow-y-auto"
          >
            {filteredLocations.map(location => (
              <div 
                key={location}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                onClick={() => handleLocationSelect(location)}
              >
                {location}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Work Type Filters */}
      <div className="space-y-2">
        <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Work Type</h3>
        <div className="flex flex-wrap gap-4">
          <Checkbox
            id="remote"
            label="Work from home"
            checked={filters.isRemote || false}
            onChange={handleRemoteChange}
          />
          <Checkbox
            id="part-time"
            label="Part-time"
            checked={filters.isPartTime || false}
            onChange={handlePartTimeChange}
          />
        </div>
      </div>
      
      {/* Duration Filter */}
      <div>
        <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Duration</h3>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          {durationOptions.map(duration => (
            <div key={duration} className="flex items-center">
              <Checkbox
                id={`duration-${duration}`}
                label=""
                checked={filters.duration?.includes(duration) || false}
                onChange={(isChecked) => handleDurationChange(duration, isChecked)}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">{duration}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stipend Range Filter */}
      <div>
        <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Stipend (₹)</h3>
        <RangeSlider
          min={0}
          max={20000}
          step={1000}
          value={filters.stipendRange || { min: 0, max: 20000 }}
          onChange={handleStipendChange}
          formatValue={formatStipend}
        />
        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span>₹0</span>
          <span>₹20K</span>
        </div>
      </div>
    </div>
  );
};