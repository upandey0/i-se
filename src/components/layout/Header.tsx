import React from 'react';
import { ThemeToggleButton } from '../common/ToggleThemeButton';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-200">
            InternshipSearch
          </a>
         
          <nav className="hidden md:flex ml-8 space-x-6">
            <a href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">
              Internships
            </a>
            <a href="/jobs" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Jobs
            </a>
            <a href="/courses" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Courses
            </a>
            <a href="/hiring" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Hire Talent
            </a>
          </nav>
        </div>
       
        <div className="flex items-center space-x-4">
          <ThemeToggleButton />
          <a href="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            Login
          </a>
          <a href="/register" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
            Register
          </a>
        </div>
      </div>
    </header>
  );
};