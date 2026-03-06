import React from 'react';
import ImpactStats from '../components/ImpactStats';

const HomePage: React.FC = () => {
  return (
    <div className="bg-navy">
      {/* Hero Section */}
      <div className="relative text-center py-24 sm:py-32 md:py-48 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/ltgfrontpage.jpeg')" }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight font-lato">
            Tutoring that <span className="text-accent">changes lives.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
            Affordable online tutoring where 100% of proceeds fund scholarships for underprivileged children in rural Thailand.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScmEU8mzEDRsSIJ4Wk-cUGqWqPjOYRL3ax-KU0CPn3Y7skacQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-accent text-navy font-bold py-3 px-8 rounded-full hover:bg-white transition-colors duration-300 text-lg shadow-lg"
            >
              Book a Tutor
            </a>
            <a
              href="https://www.justgiving.com/crowdfunding/learn-to-give"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-transparent border-2 border-accent text-accent font-bold py-3 px-8 rounded-full hover:bg-accent hover:text-navy transition-colors duration-300 text-lg"
            >
              Donate Now
            </a>
          </div>
        </div>
      </div>

      {/* Impact Stats Section */}
      <ImpactStats />

      {/* Testimonials Section */}
      <div className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12 font-lato">
            What People Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <div className="bg-navy-light p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <blockquote className="text-gray-300 italic">
                "The SAT tutoring was clearly structured with specific weekly goals, so I always knew what I was working towards. Focused, intentional, and genuinely effective."
              </blockquote>

            </div>
            {/* Testimonial Card 2 */}
            <div className="bg-navy-light p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <blockquote className="text-gray-300 italic">
                "LTG's tutors have personal experience in high achievement, which filled me with confidence before my exams. Knowing my learning makes a difference in the world makes the experience so much better."
              </blockquote>

            </div>
            {/* Testimonial Card 3 */}
            <div className="bg-navy-light p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <blockquote className="text-gray-300 italic">
                "The biggest impact was how my mental approach to the SAT changed. I learned to think strategically, manage pressure, and tackle questions in the SAT's style."
              </blockquote>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
