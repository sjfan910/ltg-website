import React from 'react';

interface WaveDividerProps {
  from?: string;
  to?: string;
  flip?: boolean;
}

const WaveDivider: React.FC<WaveDividerProps> = ({
  from = '#0A2A3C',
  to = '#1E3A56',
  flip = false,
}) => {
  return (
    <div className="wave-divider" style={flip ? { transform: 'rotate(180deg)' } : undefined}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`wg-${flip ? 'f' : 'n'}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <path
          d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
          fill={to}
        />
        <path
          d="M0,40 C150,55 350,10 600,35 C850,60 1050,15 1200,40 L1200,60 L0,60 Z"
          fill={to}
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
