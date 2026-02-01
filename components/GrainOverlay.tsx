import React from 'react';

// Using the SVG filter defined in index.html for a performant, resolution-independent grain
const GrainOverlay: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay"
      style={{ filter: 'url(#film-grain)' }}
    />
  );
};

export default GrainOverlay;