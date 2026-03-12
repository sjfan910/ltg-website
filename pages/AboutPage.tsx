import React from 'react';
import ImpactStats from '../components/ImpactStats';
import ScrollReveal from '../components/ScrollReveal';
import WaveDivider from '../components/WaveDivider';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-navy">
      <div className="py-16 sm:py-24 relative overflow-hidden">
        {/* Morphing blobs */}
        <div className="morphing-blob w-[400px] h-[400px] -top-20 -right-40 opacity-20" />
        <div className="morphing-blob w-[300px] h-[300px] bottom-20 -left-32 opacity-15" style={{ animationDelay: '-10s' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-lato">Our Mission</h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-accent">
                To provide affordable, high-quality online tutoring worldwide, with 100% of proceeds funding scholarships for underprivileged students in rural Thailand.
              </p>
            </div>
          </ScrollReveal>

          {/* Our Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <ScrollReveal variant="slide-right">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4 font-lato">Our Story & Impact</h2>
                <p className="text-gray-300 mb-4 text-lg">
                  LearnToGive was founded in 2023 with the goal of using peer-to-peer tutoring as a powerful force for change. We saw a triple need: opportunities for deeper subject engagement, accessible academic support for students globally, and critical funding for underprivileged children in rural Thailand.
                </p>
                <h2 className="text-3xl font-bold text-white mb-4 font-lato">Why Thailand?</h2>
                <p className="text-accent text-lg mb-4">
                  Our founder, Xander, grew up living alongside the stark inequality that pervades Thai society. In the marginalised North and Northeast, families struggle to afford the hidden costs of a <i>'free education.'</i> Compulsory uniforms and stationery are a significant burden.
                </p>
                <h3 className="text-gray mb-4 text-lg italic">
                  Still, a sturdy pair of school shoes can cost <b>under £5,</b> and a year's worth of pens and pencils <b>even less.</b>
                </h3>
                <p className="text-accent text-lg">
                  What may seem like a small contribution in the UK can provide a child in rural Thailand with the essentials they need to stay in school, continue learning, and pursue a brighter future.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="slide-left">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img src="/donations.png" alt="Donations making an impact for students in Thailand" className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Wave into stats */}
      <WaveDivider from="#0A2A3C" to="#1E3A56" />

      {/* Impact Stats */}
      <ImpactStats />

      {/* Wave back */}
      <WaveDivider from="#1E3A56" to="#0A2A3C" flip />

      {/* Transparency Section */}
      <div className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4 font-lato">Our Commitment to Transparency</h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-6">
                We believe you should know exactly where your money goes. Every donation and its use is tracked to ensure full transparency and accountability.
              </p>
              <a
                href="https://www.justgiving.com/crowdfunding/learn-to-give"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-navy font-bold py-3 px-8 rounded-full hover:bg-white transition-colors duration-300 text-lg shadow-lg ripple-container"
              >
                View Donation Report
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
