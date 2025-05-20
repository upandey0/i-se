import { useEffect } from 'react';

/**
 * Custom hook to update the document title
 * @param title Title to set for the page
 * @param suffix Optional suffix to append to the title
 */
export const useDocumentTitle = (
  title: string, 
  suffix: string = '| Internship Search'
): void => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} ${suffix}`;
    
    // Cleanup function to restore the original title when component unmounts
    return () => {
      document.title = previousTitle;
    };
  }, [title, suffix]);
};