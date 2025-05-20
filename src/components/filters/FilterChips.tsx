import React from 'react';
import { Badge } from '../common/Badges';
import { Button } from '../common/Button';
import { useFilters } from '../../contexts/FilterContext';
import { WORK_TYPES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

interface FilterChipsProps {
  className?: string;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ className = '' }) => {
  const { filters, updateFilters, clearFilters, clearFilter } = useFilters();
 
  // Handle profile filter removal
  const handleProfileRemove = (profile: string) => {
    const currentProfiles = [...(filters.profile || [])];
    updateFilters({
      profile: currentProfiles.filter(p => p !== profile)
    });
  };
 
  // Handle location filter removal
  const handleLocationRemove = (location: string) => {
    const currentLocations = [...(filters.location || [])];
    updateFilters({
      location: currentLocations.filter(l => l !== location)
    });
  };
 
  // Handle duration filter removal
  const handleDurationRemove = (duration: string) => {
    const currentDurations = [...(filters.duration || [])];
    updateFilters({
      duration: currentDurations.filter(d => d !== duration)
    });
  };
 
  // Check if there are any active filters - modified for undefined boolean values
  const hasFilters =
    (filters.profile && filters.profile.length > 0) ||
    (filters.location && filters.location.length > 0) ||
    (filters.duration && filters.duration.length > 0) ||
    filters.isRemote === true || 
    filters.isPartTime === true || 
    (filters.stipendRange &&
      (filters.stipendRange.min > 0 || filters.stipendRange.max < 20000));
 
  if (!hasFilters) return null;
 
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* Profile filters */}
      {filters.profile?.map((profile) => (
        <Badge
          key={`profile-${profile}`}
          variant="primary"
          removable
          onRemove={() => handleProfileRemove(profile)}
        >
          {profile}
        </Badge>
      ))}
     
      {/* Location filters */}
      {filters.location?.map((location) => (
        <Badge
          key={`location-${location}`}
          variant="info"
          removable
          onRemove={() => handleLocationRemove(location)}
        >
          {location}
        </Badge>
      ))}
     
      {/* Duration filters */}
      {filters.duration?.map((duration) => (
        <Badge
          key={`duration-${duration}`}
          variant="success"
          removable
          onRemove={() => handleDurationRemove(duration)}
        >
          {duration}
        </Badge>
      ))}
     
      {/* Remote filter - modified to remove the property entirely */}
      {filters.isRemote === true && (
        <Badge
          variant="warning"
          removable
          onRemove={() => {
            const updatedFilters = { ...filters };
            delete updatedFilters.isRemote;
            updateFilters(updatedFilters);
          }}
        >
          {WORK_TYPES.REMOTE}
        </Badge>
      )}
     
      {/* Part-time filter - modified to remove the property entirely */}
      {filters.isPartTime === true && (
        <Badge
          variant="error"
          removable
          onRemove={() => {
            const updatedFilters = { ...filters };
            delete updatedFilters.isPartTime;
            updateFilters(updatedFilters);
          }}
        >
          {WORK_TYPES.PART_TIME}
        </Badge>
      )}
     
      {/* Stipend range filter */}
      {filters.stipendRange &&
        (filters.stipendRange.min > 0 || filters.stipendRange.max < 20000) && (
        <Badge
          variant="default"
          removable
          onRemove={() => {
            const updatedFilters = { ...filters };
            delete updatedFilters.stipendRange;
            updateFilters(updatedFilters);
          }}
        >
          {`Stipend: ${formatCurrency(filters.stipendRange.min)} - ${formatCurrency(filters.stipendRange.max)}`}
        </Badge>
      )}
     
      {/* Clear all filters button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={clearFilters}
        className="ml-auto"
      >
        Clear All
      </Button>
    </div>
  );
};