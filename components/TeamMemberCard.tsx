import React from 'react';
import { useTilt, useInView } from '../utils/animations';

interface TeamMemberCardProps {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, title, bio, imageUrl }) => {
  const tiltRef = useTilt(6);
  const { ref: viewRef, isVisible } = useInView();

  return (
    <div ref={viewRef} className={`reveal reveal-fade-up ${isVisible ? 'is-visible' : ''}`}>
      <div
        ref={tiltRef}
        className="tilt-card bg-navy-light rounded-lg shadow-lg overflow-hidden"
      >
        <div className="overflow-hidden">
          <img
            className={`w-full h-56 object-cover object-center img-reveal ${isVisible ? 'is-visible' : ''}`}
            src={imageUrl}
            alt={`Photo of ${name}`}
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-1 font-lato">{name}</h3>
          <p className="text-accent font-semibold mb-3">{title}</p>
          <p className="text-gray-300 text-base">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
