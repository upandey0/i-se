import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">InternHub</h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-grow">{children}</main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-auto transition-colors duration-200">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
          <p>&copy; {new Date().getFullYear()} InternHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Modified SidebarLayout with sticky filters
export const SidebarLayout: React.FC<{
  sidebar: React.ReactNode;
  content: React.ReactNode;
}> = ({ sidebar, content }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar with sticky behavior */}
      <div className="lg:col-span-1">
        <div className="sticky top-4">
          {sidebar}
        </div>
      </div>
      
      {/* Main content area that scrolls independently */}
      <div className="lg:col-span-3">
        {content}
      </div>
    </div>
  );
};

// You can also create a specialized component for the internship list page
export const InternshipListLayout: React.FC<{
  filters: React.ReactNode;
  internshipsList: React.ReactNode;
}> = ({ filters, internshipsList }) => {
  return (
    <SidebarLayout
      sidebar={
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition-colors duration-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Filters</h2>
          {filters}
        </div>
      }
      content={
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition-colors duration-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Internships List</h2>
          <div className="space-y-4">
            {internshipsList}
          </div>
        </div>
      }
    />
  );
};