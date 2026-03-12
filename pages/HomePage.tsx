import React, { useState, useEffect, useCallback, useRef } from 'react';
import ImpactStats from '../components/ImpactStats';
import ScrollReveal from '../components/ScrollReveal';
import WaveDivider from '../components/WaveDivider';

const TESTIMONIALS = [
  {
    quote: "The SAT tutoring was clearly structured with specific weekly goals, so I always knew what I was working towards. Focused, intentional, and genuinely effective.",
  },
  {
    quote: "LTG's tutors have personal experience in high achievement, which filled me with confidence before my exams. Knowing my learning makes a difference in the world makes the experience so much better.",
  },
  {
    quote: "The biggest impact was how my mental approach to the SAT changed. I learned to think strategically, manage pressure, and tackle questions in the SAT's style.",
  },
];

// CSS-only particles for hero (desktop only)
const Particles: React.FC = () => {
  const particles = React.useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 15,
      opacity: 0.2 + Math.random() * 0.3,
    })),
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

const HomePage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const goToTestimonial = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial(index);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const nextTestimonial = useCallback(() => {
    goToTestimonial((currentTestimonial + 1) % TESTIMONIALS.length);
  }, [currentTestimonial, goToTestimonial]);

  const prevTestimonial = useCallback(() => {
    goToTestimonial((currentTestimonial - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, [currentTestimonial, goToTestimonial]);

  // Auto-rotate
  useEffect(() => {
    autoPlayRef.current = setInterval(nextTestimonial, 6000);
    return () => clearInterval(autoPlayRef.current);
  }, [nextTestimonial]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    clearInterval(autoPlayRef.current);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextTestimonial() : prevTestimonial();
    }
    autoPlayRef.current = setInterval(nextTestimonial, 6000);
  };

  return (
    <div className="bg-navy">
      {/* Hero Section */}
      <div className="relative text-center py-24 sm:py-32 md:py-48 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[70vh] hero-gradient overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/ltgfrontpage.jpeg')" }}
        />
        <Particles />
        {/* Morphing blobs */}
        <div className="morphing-blob w-[500px] h-[500px] -top-40 -left-40 opacity-30" />
        <div className="morphing-blob w-[400px] h-[400px] -bottom-20 -right-20 opacity-20" style={{ animationDelay: '-7s' }} />

        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight font-lato hero-text-reveal">
            Tutoring that <span className="text-accent">changes lives.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 hero-subtitle-reveal">
            Affordable online tutoring where 100% of proceeds fund scholarships for underprivileged children in rural Thailand.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 hero-cta-reveal">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScmEU8mzEDRsSIJ4Wk-cUGqWqPjOYRL3ax-KU0CPn3Y7skacQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-accent text-navy font-bold py-3 px-8 rounded-full hover:bg-white transition-colors duration-300 text-lg shadow-lg cta-glow ripple-container"
            >
              Book a Tutor
            </a>
            <a
              href="https://www.justgiving.com/crowdfunding/learn-to-give"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-transparent border-2 border-accent text-accent font-bold py-3 px-8 rounded-full hover:bg-accent hover:text-navy transition-colors duration-300 text-lg ripple-container"
            >
              Donate Now
            </a>
          </div>
        </div>
      </div>

      {/* Wave from hero to stats */}
      <WaveDivider from="#0A2A3C" to="#1E3A56" />

      {/* Impact Stats Section */}
      <ImpactStats />

      {/* Wave from stats to testimonials */}
      <WaveDivider from="#1E3A56" to="#0A2A3C" flip />

      {/* Testimonials Section */}
      <div className="py-20 sm:py-24 relative overflow-hidden">
        <div className="morphing-blob w-[350px] h-[350px] top-10 -right-32 opacity-15" style={{ animationDelay: '-12s' }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12 font-lato">
              What People Are Saying
            </h2>
          </ScrollReveal>

          {/* Desktop: grid view */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={i} variant="fade-up" delay={i + 1}>
                <div className="testimonial-card bg-navy-light p-8 rounded-lg shadow-lg transform hover:scale-[1.03] transition-all duration-300 h-full">
                  <blockquote className="text-gray-300 italic">"{t.quote}"</blockquote>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mobile/Tablet: carousel */}
          <div
            className="lg:hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative">
              <div
                className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
              >
                <div className="testimonial-card bg-navy-light p-8 rounded-lg shadow-lg carousel-slide-enter">
                  <blockquote className="text-gray-300 italic">
                    "{TESTIMONIALS[currentTestimonial].quote}"
                  </blockquote>
                </div>
              </div>
              {/* Nav arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute top-1/2 -left-2 -translate-y-1/2 bg-navy-light/80 backdrop-blur-sm text-accent hover:text-white p-2 rounded-full transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute top-1/2 -right-2 -translate-y-1/2 bg-navy-light/80 backdrop-blur-sm text-accent hover:text-white p-2 rounded-full transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === currentTestimonial ? 'bg-accent w-6' : 'bg-accent/30'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
