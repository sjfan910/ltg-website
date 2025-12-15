import React from 'react';

const subjects = [
  'Chemistry', 'Economics', 'English', 'Computer Science', 'Mathematics', 'Physics',
  'SAT Prep', 'IB Subjects', 'GCSE Subjects', 'A-Level Subjects'
];

const BookLessonPage: React.FC = () => {
  return (
    <div className="bg-navy py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-lato">
            Book a Lesson
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-accent">
            Expert academic support that empowers you and funds education for others.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column: Services & Info */}
            <div className="space-y-8">
                {/* Subjects */}
                <div className="bg-navy-light p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-white mb-6 font-lato">Subjects Offered</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {subjects.map(subject => (
                        <li key={subject} className="flex items-center text-gray-300">
                        <svg className="h-5 w-5 text-accent mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        {subject}
                        </li>
                    ))}
                    </ul>
                </div>

                {/* Pricing */}
                <div className="bg-navy-light p-8 rounded-lg shadow-xl border-l-4 border-accent">
                    <h2 className="text-2xl font-bold text-white mb-2 font-lato">Simple Pricing</h2>
                    <div className="flex items-baseline">
                        <span className="text-5xl font-extrabold text-white">£10</span>
                        <span className="text-xl text-accent ml-2">/ hour</span>
                    </div>
                    <p className="mt-4 text-gray-300">
                        100% of your payment goes directly to funding scholarships for students in rural Thailand.
                    </p>
                </div>
            </div>

            {/* Right Column: Process & Booking */}
            <div className="space-y-8">
                 {/* How It Works */}
                <div className="bg-navy-light p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-white mb-6 font-lato">How It Works</h2>
                    <div className="space-y-6">
                        <div className="flex">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent text-navy flex items-center justify-center font-bold">1</div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-white">Submit Request</h3>
                                <p className="text-sm text-gray-300">Fill out the booking form with your subject, level, and availability.</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent text-navy flex items-center justify-center font-bold">2</div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-white">Get Matched</h3>
                                <p className="text-sm text-gray-300">We'll connect you with an expert tutor via email within 48 hours.</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent text-navy flex items-center justify-center font-bold">3</div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-white">Start Learning</h3>
                                <p className="text-sm text-gray-300">Join your session on Zoom. Simple, effective, and impactful.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Call to Action */}
                <div className="bg-gradient-to-br from-navy-light to-gray-800 p-8 rounded-lg shadow-2xl text-center border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-4">Ready to Start?</h2>
                    <p className="text-gray-300 mb-8">
                        Our booking form is secure and takes less than 2 minutes to complete.
                    </p>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScmEU8mzEDRsSIJ4Wk-cUGqWqPjOYRL3ax-KU0CPn3Y7skacQ/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full bg-accent text-navy font-bold py-4 px-8 rounded-full hover:bg-white transition-colors duration-300 text-lg shadow-lg"
                    >
                        Open Booking Form
                    </a>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default BookLessonPage;