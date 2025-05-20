import { useEffect, useState } from 'react';
import { MainLayout, SidebarLayout } from '../components/layout/MainLayout';
import { FilterAccordion } from '../components/filters/FilterAccordion';
import { FilterChips } from '../components/filters/FilterChips';
import { InternshipList } from '../components/internships/InternshipList';
import { SearchBanner } from '../components/internships/SearchBanner';
import { FilterProvider, useFilters } from '../contexts/FilterContext';
import { useInternships } from '../hooks/useInternships';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ThemeProvider } from '../contexts/ThemeContext';
import { getInternships } from '../api/internshipApi';

export const InternshipSearchContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { filters, updateFilters, clearFilter } = useFilters();
  const { internships, loading, totalCount, applyFilters } = useInternships();
  const [page, setPage] = useState(1);

  useEffect(()=>{
    const fetchInternships = async () => {
      // setLoading(true);
      try {
        const result = await getInternships(filters);
        console.log('Fetched Internships:', result);
        // setInternships(result.internships);
        // setTotalCount(result.total);
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchInternships();

  },[filters, updateFilters, clearFilter]);
  // Update document title
  useDocumentTitle('Find Internships');

  

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const sidebar = (
    <>
      <FilterAccordion className="mb-4" />
      <FilterChips className="mt-4" />
    </>
  );

  const content = (
    <div className="space-y-6">
      {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition-colors duration-200">
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for internships..."
          className="w-full"
        />
      </div> */}

      <SearchBanner />

      <InternshipList
        internships={internships}
        loading={loading}
        totalCount={totalCount}
        hasMore={internships.length < totalCount}
        onLoadMore={handleLoadMore}
      />
    </div>
  );

  return <SidebarLayout sidebar={sidebar} content={content} />;
};

const InternshipSearchPage = () => {
  return (
    <ThemeProvider>
      <FilterProvider>
        <MainLayout>
          <InternshipSearchContent />
        </MainLayout>
      </FilterProvider>
    </ThemeProvider>
  );
};

export default InternshipSearchPage;