import React, { useEffect, useState } from 'react';
import type { Internship } from '../../types/internship.type';
import defaultCompanyLogo from '../../assets/default-company.png';

interface InternshipCardProps {
  internship: Internship;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  const {
    title,
    company,
    location,
    isRemote,
    duration,
    stipend,
    startDate,
    applyBy,
    skills,
    isPartTime,
    logo,
    daysLeft,
  } = internship;

  // Use state to track if default logo should be used
  const [useDefaultLogo, setUseDefaultLogo] = useState(false);

  // Default logo path
  const defaultLogoPath = '../../assets/default-company.png';
  const companyLogo = `/${logo}`

  useEffect(() => {
    console.log(companyLogo)
  }, [companyLogo])

  // Determine logo URL with fallback logic
  const logoUrl = useDefaultLogo || !logo
    ? defaultCompanyLogo
    : (logo.startsWith('http') ? logo : `/images/logos/${logo}`);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={logoUrl}
                alt={`${company} logo`}
                className="max-w-full max-h-full object-contain"
                onError={() => setUseDefaultLogo(true)}
                loading="lazy"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Title and Tags */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-0">{title}</h3>
              <div className="flex flex-wrap gap-2">
                {isRemote && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded dark:bg-blue-900 dark:text-blue-200">
                    Remote
                  </span>
                )}
                {isPartTime && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded dark:bg-purple-900 dark:text-purple-200">
                    Part-time
                  </span>
                )}
                {daysLeft !== undefined && daysLeft <= 3 && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded dark:bg-red-900 dark:text-red-200">
                    {daysLeft === 0 ? 'Last day!' : `${daysLeft} days left`}
                  </span>
                )}
              </div>
            </div>

            {/* Company and Location */}
            <div className="mb-2">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">{company}</span>
                {location && (
                  <>
                    {' • '}
                    <span className="text-gray-600 dark:text-gray-400">{location}</span>
                  </>
                )}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">Duration: {duration}</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Stipend: {stipend.amount}/{stipend.period}
                </span>
              </div>
              {startDate && (
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Starts: {startDate}</span>
                </div>
              )}
              {applyBy && (
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Apply by: {applyBy}</span>
                </div>
              )}
            </div>

            {/* Skills */}
            {skills && skills.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded dark:bg-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Apply Now
        </button>
      </div>
    </div>
  );
};