import React, { useState, useEffect } from 'react';
import { useFilters } from '../contexts/FilterContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badges';

interface UserPreference {
  id: string;
  name: string;
  filters: any;
  createdAt: string;
}

interface UserPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { filters, updateFilters } = useFilters();
  const [savedPreferences, setSavedPreferences] = useState<UserPreference[]>([]);
  const [preferenceName, setPreferenceName] = useState('');
  const [activeTab, setActiveTab] = useState<'save' | 'load'>('load');

  // Load saved preferences from localStorage on mount
  useEffect(() => {
    const preferences = localStorage.getItem('userPreferences');
    if (preferences) {
      setSavedPreferences(JSON.parse(preferences));
    }
  }, []);

  const savePreference = () => {
    if (!preferenceName.trim()) {
      alert('Please enter a name for your preferences');
      return;
    }

    const newPreference: UserPreference = {
      id: `pref-${Date.now()}`,
      name: preferenceName,
      filters: { ...filters },
      createdAt: new Date().toISOString()
    };

    const updatedPreferences = [...savedPreferences, newPreference];
    setSavedPreferences(updatedPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
    setPreferenceName('');
    setActiveTab('load');
  };

  const loadPreference = (preference: UserPreference) => {
    updateFilters(preference.filters);
    onClose();
  };

  const deletePreference = (id: string) => {
    const updatedPreferences = savedPreferences.filter(pref => pref.id !== id);
    setSavedPreferences(updatedPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
  };

  // Format date for better readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        {/* Modal header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User Preferences</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'load'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('load')}
          >
            Load Preferences
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'save'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('save')}
          >
            Save Current Filters
          </button>
        </div>

        {/* Modal content */}
        <div className="overflow-y-auto flex-1 p-4">
          {activeTab === 'load' ? (
            <>
              {savedPreferences.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No saved preferences</h3>
                  <p className="text-gray-600 dark:text-gray-400">Save your filter preferences to easily apply them later</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedPreferences.map(preference => (
                    <div 
                      key={preference.id} 
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex flex-col gap-3"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-900 dark:text-white">{preference.name}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(preference.createdAt)}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {preference.filters.profile?.map((profile: string) => (
                          <Badge key={profile} variant="primary" size="sm">{profile}</Badge>
                        ))}
                        {preference.filters.location?.map((location: string) => (
                          <Badge key={location} variant="info" size="sm">{location}</Badge>
                        ))}
                        {preference.filters.duration?.map((duration: string) => (
                          <Badge key={duration} variant="success" size="sm">{duration}</Badge>
                        ))}
                        {preference.filters.isRemote && (
                          <Badge variant="warning" size="sm">Work from home</Badge>
                        )}
                        {preference.filters.isPartTime && (
                          <Badge variant="error" size="sm">Part-time</Badge>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 mt-2">
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={() => loadPreference(preference)}
                          className="flex-1"
                        >
                          Apply
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={() => deletePreference(preference.id)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-6">
              <div>
                <label htmlFor="preference-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Preference Name
                </label>
                <input
                  type="text"
                  id="preference-name"
                  value={preferenceName}
                  onChange={(e) => setPreferenceName(e.target.value)}
                  placeholder="My preferred filters"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Filters to save:</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
                  {/* Profile filters */}
                  {filters.profile && filters.profile.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Profiles:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {filters.profile.map(profile => (
                          <Badge key={profile} variant="primary" size="sm">{profile}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Location filters */}
                  {filters.location && filters.location.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Locations:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {filters.location.map(location => (
                          <Badge key={location} variant="info" size="sm">{location}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Duration filters */}
                  {filters.duration && filters.duration.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Durations:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {filters.duration.map(duration => (
                          <Badge key={duration} variant="success" size="sm">{duration}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Other filters */}
                  <div className="flex flex-wrap gap-2">
                    {filters.isRemote && <Badge variant="warning" size="sm">Work from home</Badge>}
                    {filters.isPartTime && <Badge variant="error" size="sm">Part-time</Badge>}
                    {filters.stipendRange && (
                      <Badge variant="default" size="sm">
                        Stipend: ₹{filters.stipendRange.min} - ₹{filters.stipendRange.max}
                      </Badge>
                    )}
                  </div>
                  
                  {(!filters.profile?.length && !filters.location?.length && !filters.duration?.length && 
                    !filters.isRemote && !filters.isPartTime) && (
                    <p className="text-gray-500 dark:text-gray-400 italic text-sm">No filters selected</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Modal footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          {activeTab === 'save' && (
            <Button
              onClick={savePreference}
              disabled={!preferenceName.trim()}
            >
              Save Preference
            </Button>
          )}
          <Button variant="secondary" onClick={onClose} className="ml-2">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};