import React from 'react';
import { Link } from 'react-router-dom';
import ImpactStats from '../components/ImpactStats';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-navy py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-lato">Our Mission</h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-accent">
            To provide affordable, high-quality online tutoring worldwide, with 100% of proceeds funding scholarships for underprivileged students in rural Thailand.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4 font-lato">Our Story & Impact</h2>
            <p className="text-gray-300 mb-4 text-lg">
              LearnToGive was founded in 2023 by a group of passionate high school students who believed education could be a powerful force for change. We saw a dual need: accessible academic support for students globally and critical funding for children in rural Thailand at risk of dropping out of school due to poverty.
            </p>
            <h2 className="text-3xl font-bold text-white mb-4 font-lato">Why Thailand?</h2>
            <p className="text-gray-300 text-lg mb-4">
              Our founder, Xander, spent his childhood in one of the most rural and underdeveloped regions of Thailand, where many children attend school without proper uniforms, shoes, or basic stationery. In Thailand, a sturdy pair of school shoes can cost under £5, and essential stationery is even less.
            </p>
            <p className="text-gray-300 text-lg">
              This is where purchasing power parity comes in. What may seem like a small contribution in the UK can provide a child in rural Thailand with the essentials they need to stay in school, continue learning, and pursue a brighter future.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img src="/assets/donations.png" alt="Donations making an impact for students in Thailand" className="w-full h-full object-cover"/>
          </div>
        </div>

        {/* Our Chapters Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 font-lato">Our Chapters</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
              LearnToGive is expanding its impact through student-led chapters across Thailand, each making a difference in their local communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* TeachtoReach Card */}
            <div className="bg-navy-light rounded-xl p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-2 font-lato">TeachtoReach</h3>
              <p className="text-accent font-medium mb-4">Pattaya, Thailand</p>

              <div className="space-y-2 text-gray-300 mb-6">
                <p><span className="text-white font-medium">Leader:</span> Sarute Amnuayruangsri</p>
                <p><span className="text-white font-medium">Community:</span> Rugby School Thailand</p>
                <p><span className="text-white font-medium">Members:</span> 7</p>
                <p><span className="text-white font-medium">Funds Raised:</span> ฿11,300</p>
                <p><span className="text-white font-medium">Founded:</span> 2025</p>
              </div>

              <a
                href="https://www.instagram.com/teachtoreach_th"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-navy font-bold py-2 px-4 rounded-full hover:bg-white transition-colors duration-300 text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                @teachtoreach_th
              </a>
            </div>

            {/* Gifted Card */}
            <div className="bg-navy-light rounded-xl p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-2 font-lato">Gifted</h3>
              <p className="text-accent font-medium mb-4">Bangkok, Thailand</p>

              <div className="space-y-2 text-gray-300 mb-6">
                <p><span className="text-white font-medium">Leader:</span> Jerry Sintuphandacha</p>
                <p><span className="text-white font-medium">Community:</span> Wellington College Bangkok</p>
                <p><span className="text-white font-medium">Members:</span> 10</p>
                <p><span className="text-white font-medium">Funds Raised:</span> ฿9,500</p>
                <p><span className="text-white font-medium">Founded:</span> 2025</p>
              </div>

              <a
                href="https://www.instagram.com/gifted.club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-navy font-bold py-2 px-4 rounded-full hover:bg-white transition-colors duration-300 text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                @gifted.club
              </a>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <ImpactStats />
        
        {/* Transparency Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-white mb-4 font-lato">Our Commitment to Transparency</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-6">
            We believe you should know exactly where your money goes. Every donation and its use is tracked to ensure full transparency and accountability.
          </p>
          <a
            href="https://www.justgiving.com/crowdfunding/learn-to-give"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-navy font-bold py-3 px-8 rounded-full hover:bg-white transition-colors duration-300 text-lg shadow-lg"
          >
            View Donation Report
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default AboutPage;
