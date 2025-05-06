import React, { useState, useRef, useEffect } from 'react';
import './imageMagnifier.css';

const ImageMagnifier = ({ ImageUrl }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  // Handle mouse movement over the image
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate position as percentage
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    // Update position state
    setPosition({ x, y });
  };

  return (
    <div className="magnifier-wrapper">
      <div 
        ref={containerRef}
        className="magnifier-container"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowMagnifier(false)}
      >
        <img 
          src={ImageUrl} 
          alt="Product" 
          className="magnifier-image" 
        />
        
        {showMagnifier && (
          <div 
            className="magnified-area"
            style={{
              backgroundImage: `url(${ImageUrl})`,
              backgroundPosition: `${position.x}% ${position.y}%`
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageMagnifier;