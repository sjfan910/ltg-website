import React from 'react';
import { useStatistics } from '../hooks/useStatistics';
import { useInView, useCountUp } from '../utils/animations';

interface AnimatedStatProps {
  rawValue: number | null;
  displayValue: string;
  label: string;
  prefix?: string;
  suffix?: string;
  delay: number;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ rawValue, displayValue, label, prefix = '', suffix = '', delay }) => {
  const { ref, isVisible } = useInView();
  const count = useCountUp(rawValue ?? 0, isVisible);

  return (
    <div
      ref={ref}
      className={`stat-card flex flex-col items-center p-6 rounded-xl cursor-default reveal reveal-fade-up ${isVisible ? 'is-visible' : ''}`}
      style={{ animationDelay: `${delay * 0.15}s` }}
    >
      <span className="text-4xl sm:text-5xl font-bold text-white font-lato">
        {rawValue !== null && isVisible ? `${prefix}${count.toLocaleString()}${suffix}` : displayValue}
      </span>
      <span className="mt-2 text-lg text-accent">{label}</span>
    </div>
  );
};

const ImpactStats: React.FC = () => {
  const { displayStats, data, loading } = useStatistics();

  if (loading) {
    return (
      <div className="bg-navy-light py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-12 w-32 bg-navy/50 rounded animate-pulse" />
                <div className="mt-2 h-6 w-24 bg-navy/30 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-navy-light py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
          <AnimatedStat
            rawValue={null}
            displayValue={displayStats.raised}
            label="Raised"
            delay={0}
          />
          <AnimatedStat
            rawValue={data?.tutoringSessions ?? null}
            displayValue={displayStats.sessions}
            label="Tutoring Sessions"
            suffix="+"
            delay={1}
          />
          <AnimatedStat
            rawValue={data?.studentsSupported ?? null}
            displayValue={displayStats.students}
            label="Students Supported"
            delay={2}
          />
          <AnimatedStat
            rawValue={null}
            displayValue="100%"
            label="Proceeds Donated"
            delay={3}
          />
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
