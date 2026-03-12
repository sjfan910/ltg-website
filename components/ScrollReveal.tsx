import React from 'react';
import { useInView } from '../utils/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in';
  delay?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
}) => {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={delay ? { animationDelay: `${delay * 0.1}s` } : undefined}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
