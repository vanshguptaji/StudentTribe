import React, { useEffect, useRef, useState } from 'react';

const CurvedCarousel = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);

  // Architecture/building images that match the style
  const images = [
    "https://images.unsplash.com/photo-1565626424178-c699f6601afd?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1554435493-93422e8220c8?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1565626424178-c699f6601afd?w=600&h=800&fit=crop",
  ];

  const radius = 1200; // Radius of the cylinder
  const angleStep = (2 * Math.PI) / images.length; // Angle between each image

  // Mouse drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRotation(rotation);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.clientX - startX;
    const newRotation = startRotation + (deltaX * 0.5); // Adjust sensitivity
    setRotation(newRotation);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch support
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartRotation(rotation);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.touches[0].clientX - startX;
    const newRotation = startRotation + (deltaX * 0.5);
    setRotation(newRotation);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden flex items-center justify-center">
      <div 
        className="relative w-full h-screen flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="relative"
          style={{
            width: '800px',
            height: '500px',
            perspective: '1200px',
            perspectiveOrigin: 'center center',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            {images.map((image, index) => {
              const angle = index * angleStep;
              const x = Math.sin(angle) * radius;
              const z = Math.cos(angle) * radius;
              const rotateY = angle * (180 / Math.PI);
              
              // Calculate visibility based on angle
              const normalizedAngle = ((rotateY - rotation) % 360 + 360) % 360;
              const isVisible = normalizedAngle < 90 || normalizedAngle > 270;
              const opacity = isVisible ? 1 : 0.1;
              
              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    width: '800px',
                    height: '900px',
                    left: '50%',
                    top: '50%',
                    transform: `
                      translateX(-50%) 
                      translateY(-50%) 
                      translateX(${x}px) 
                      translateZ(${z}px) 
                      rotateY(${rotateY}deg)
                    `,
                    transformStyle: 'preserve-3d',
                    opacity: opacity,
                    transition: isDragging ? 'opacity 0.3s' : 'opacity 0.3s, transform 0.3s ease-out',
                  }}
                >
                  <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl bg-gray-800">
                    <img
                      src={image}
                      alt={`Architecture ${index + 1}`}
                      className="w-full h-full object-cover select-none"
                      draggable="false"
                      style={{
                        userSelect: 'none',
                        backfaceVisibility: 'hidden',
                      }}
                    />
                  </div>
                  
                  {/* Reflection effect */}
                  <div 
                    className="absolute top-full left-0 w-full h-24 mt-4"
                    style={{
                      transform: 'rotateX(180deg)',
                      transformOrigin: 'top',
                      opacity: 0.3,
                      maskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
                    }}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{
                        filter: 'blur(3px)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Center glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Instructions */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
          Drag to rotate the carousel
        </div>
      </div>
    </div>
  );
};

export default CurvedCarousel;