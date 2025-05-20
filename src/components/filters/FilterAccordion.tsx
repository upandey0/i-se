import { useState, useEffect } from 'react';
import { FilterSection } from './FilterSection';
import { Button } from '../common/Button';
import { UserPreferencesModal } from '../../modal/UserPreferenceModal';
import { FilterChips } from './FilterChips';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FilterModal = ({ isOpen, onClose, children }: FilterModalProps) => {
  if (!isOpen) return null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-md max-h-screen overflow-auto mx-4">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center z-10">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Filter Internships</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <Button onClick={onClose} variant="primary">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export const FilterAccordion = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect screen size to determine if we're on mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Handle filter button click based on screen size
  const handleFilterClick = () => {
    if (isMobile) {
      setIsFilterModalOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };
 
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200 ${className}`}>
      {/* Accordion header */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Filter Internships</h2>
       
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsPreferencesModalOpen(true)}
            className="hidden md:flex"
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              Preferences
            </div>
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsPreferencesModalOpen(true)}
            className="md:hidden"
            aria-label="Preferences"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
          </Button>
         
          {/* Filter toggle/open button - changes behavior based on screen size */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleFilterClick}
            className={isMobile ? "flex" : "hidden"}
            aria-label="Open filters"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6h10m-12 4h14m-10 4h6" />
            </svg>
          </Button>
          
          {/* Desktop accordion toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-200 ${isMobile ? "hidden" : "block"}`}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Collapse filters" : "Expand filters"}
          >
            <svg
              className={`w-6 h-6 transition-transform ${isOpen ? '' : 'transform rotate-180'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
     
      {/* Selected filters chips - visible even when accordion is closed */}
      <div className="px-4 pb-2">
        <FilterChips />
      </div>
     
      {/* Accordion content - only visible on desktop */}
      {!isMobile && (
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <FilterSection />
          </div>
        </div>
      )}
     
      {/* Filter Modal for mobile */}
      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)}
      >
        <FilterSection />
      </FilterModal>
      
      {/* User Preferences Modal */}
      <UserPreferencesModal
        isOpen={isPreferencesModalOpen}
        onClose={() => setIsPreferencesModalOpen(false)}
      />
    </div>
  );
};