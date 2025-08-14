import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import stlogo from "../../assets/Red logo.png";

const CurvedCarousel = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const hideButtonsTimeoutRef = useRef(null);
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
      // Clean up timeout on unmount
      if (hideButtonsTimeoutRef.current) {
        clearTimeout(hideButtonsTimeoutRef.current);
      }
    };
  }, []);

  // Hover handlers for logo/buttons
  const handleLogoOrButtonsMouseEnter = () => {
    // Clear any pending hide timeout
    if (hideButtonsTimeoutRef.current) {
      clearTimeout(hideButtonsTimeoutRef.current);
      hideButtonsTimeoutRef.current = null;
    }
    setShowButtons(true);
  };
  
  const handleLogoOrButtonsMouseLeave = (e) => {
    // Check if the mouse is leaving to go to a related element within the same container
    const relatedTarget = e.relatedTarget;
    const currentTarget = e.currentTarget;
    
    // If there's no related target (mouse left the window) or the related target 
    // is not within our logo container, hide the buttons with a delay
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      // Add a small delay before hiding to allow smooth movement to buttons
      hideButtonsTimeoutRef.current = setTimeout(() => {
        setShowButtons(false);
      }, 300); // 300ms delay
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden flex flex-col">
      {/* Header with Logo */}
      <div className="relative z-20 pt-16 pb-8 text-center">
        <div 
          className="logo-container group inline-block cursor-pointer relative"
          onMouseEnter={handleLogoOrButtonsMouseEnter}
          onMouseLeave={handleLogoOrButtonsMouseLeave}
        >
          <img 
            src={stlogo} 
            alt="Student Tribe Logo"
            className="h-16 md:h-20 lg:h-24 w-auto drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-[400px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
              showButtons ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              top: 'calc(100% + 8px)',
            }}
          >
            <button
              className="flex-1 py-4 text-center rounded-full transition-all duration-300 bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white border-none cursor-pointer text-lg hover:scale-105"
              onClick={() => navigate('/')}
            >
              Students
            </button>
            <button
              className="flex-1 py-4 text-center rounded-full transition-all duration-300 bg-transparent text-gray-300 border-none cursor-pointer text-lg hover:bg-[#b8001f] hover:text-white hover:scale-105"
              onClick={() => navigate('/brands')}
            >
              Brands
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        className="flex-1 flex items-center justify-center transition-transform duration-500"
        style={{
          transform: showButtons ? 'translateY(80px)' : 'translateY(0)',
        }}
      >
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
    </div>
  );
};

export default CurvedCarousel;