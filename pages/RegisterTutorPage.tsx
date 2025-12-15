import React from 'react';

const RegisterTutorPage: React.FC = () => {
  return (
    <div className="bg-navy py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-lato">
            Become a Tutor
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-accent">
            Join a community of passionate students using education to create global impact.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
                <h2 className="text-3xl font-bold text-white mb-6 font-lato">Why Join LearnToGive?</h2>
                <ul className="space-y-6 text-gray-300 text-lg">
                    <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent mt-1 mr-4"></div>
                        <p><strong className="text-white">Make a Real Impact:</strong> Your teaching directly funds scholarships for underprivileged children in Thailand. 100% of the fees generated go to the cause.</p>
                    </li>
                    <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent mt-1 mr-4"></div>
                        <p><strong className="text-white">Gain Experience:</strong> Develop your communication and leadership skills. Teaching is one of the best ways to master a subject yourself (the Feynman technique).</p>
                    </li>
                    <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent mt-1 mr-4"></div>
                        <p><strong className="text-white">Flexible Volunteering:</strong> Tutoring happens online via Zoom. You can schedule sessions that fit around your own studies and commitments.</p>
                    </li>
                </ul>
            </div>
            <div className="bg-navy-light p-8 rounded-lg shadow-xl">
                 <h2 className="text-2xl font-bold text-white mb-4 font-lato">What We Are Looking For</h2>
                 <p className="text-gray-300 mb-6">
                    We are looking for high-achieving students who are passionate about their subjects and eager to help others succeed.
                 </p>
                 <div className="space-y-4 mb-8">
                    <div className="bg-navy/50 p-4 rounded border border-navy-light">
                        <h3 className="font-bold text-white">Academic Excellence</h3>
                        <p className="text-sm text-gray-400">Strong grasp of GCSE, A-Level, IB, or similar curriculums.</p>
                    </div>
                    <div className="bg-navy/50 p-4 rounded border border-navy-light">
                        <h3 className="font-bold text-white">Communication Skills</h3>
                        <p className="text-sm text-gray-400">Ability to explain complex concepts simply and patiently.</p>
                    </div>
                 </div>
            </div>
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto bg-navy-light/50 p-10 rounded-2xl border border-accent/20">
            <h2 className="text-3xl font-bold text-white mb-6 font-lato">Ready to Apply?</h2>
            <p className="text-gray-300 text-lg mb-8">
                Fill out our application form to let us know about your subjects and availability. We'll get back to you regarding the next steps.
            </p>
            <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfivp2cDp2Wz06_-wTAnmnVUTOLZXPbeXkKFUz813mNx78KvQ/viewform?usp=header" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-accent text-navy font-bold py-4 px-12 rounded-full hover:bg-white transition-colors duration-300 text-xl shadow-lg"
                onClick={(e) => {
                    if ((e.currentTarget.getAttribute('href') === '#')) {
                        e.preventDefault();
                        alert("Registration form coming soon!");
                    }
                }}
            >
                Apply to be a Tutor
            </a>
        </div>

      </div>
    </div>
  );
};

export default RegisterTutorPage;