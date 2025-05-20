import React from 'react';
import type { Internship } from '../../types/internship.type';
import { InternshipCard } from './InternshipCard';
import { Button } from '../common/Button';

interface InternshipListProps {
  internships: Internship[];
  loading: boolean;
  totalCount: number;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export const InternshipList: React.FC<InternshipListProps> = ({
  internships,
  loading,
  totalCount,
  hasMore = false,
  onLoadMore,
}) => {
  if (loading && internships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading internships...</p>
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow py-10 px-4 text-center transition-colors duration-200">
        <svg 
          className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No internships found</h3>
        <p className="text-gray-600 dark:text-gray-300">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4 flex justify-between items-center transition-colors duration-200">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{totalCount} Total Internships</h2>
      </div>
      
      <div className="space-y-4">
        {internships.map(internship => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
      
      {loading && internships.length > 0 && (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {!loading && hasMore && onLoadMore && (
        <div className="flex justify-center mt-6">
          <Button onClick={onLoadMore}>Load More Internships</Button>
        </div>
      )}
    </div>
  );
};