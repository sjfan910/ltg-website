import React from 'react';
import { useStatistics } from '../hooks/useStatistics';

const ImpactStats: React.FC = () => {
  const { displayStats, loading } = useStatistics();

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-navy-light py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-12 w-32 bg-navy/50 rounded animate-pulse"></div>
                <div className="mt-2 h-6 w-24 bg-navy/30 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { value: displayStats.raised, label: 'Raised' },
    { value: displayStats.sessions, label: 'Tutoring Sessions' },
    { value: displayStats.students, label: 'Students Supported' },
    { value: '100%', label: 'Proceeds Donated' },
  ];

  return (
    <div className="bg-navy-light py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-bold text-white font-lato">{stat.value}</span>
              <span className="mt-2 text-lg text-accent">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
