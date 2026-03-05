import React from 'react';

const LTGLogo: React.FC<{ className?: string }> = ({ className }) => (
  <img
    src="/LTGlogo.png"
    alt="LTG Logo"
    className={className}
    aria-label="LTG Logo"
  />
);

export default LTGLogo;
