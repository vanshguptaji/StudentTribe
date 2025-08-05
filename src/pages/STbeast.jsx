import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CurvedCarousel = ({ products }) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const autoRotateRef = useRef(null);

  const radius = 1200; // Radius of the cylinder
  const angleStep = (2 * Math.PI) / products.length; // Angle between each image
  const rotationSpeed = 360 / products.length; // Degrees to rotate per step

  // Auto rotation functionality
  const startAutoRotation = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    
    autoRotateRef.current = setInterval(() => {
      setRotation(prevRotation => prevRotation + rotationSpeed);
    }, 2000); // Rotate every 2 seconds
  };

  const stopAutoRotation = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  };

  // Mouse drag functionality
  const handleMouseDown = (e) => {
    stopAutoRotation(); // Stop auto rotation when user interacts
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
    // Restart auto rotation after a delay
    setTimeout(() => {
      startAutoRotation();
    }, 3000); // Wait 3 seconds before resuming auto rotation
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    // Restart auto rotation after a delay
    setTimeout(() => {
      startAutoRotation();
    }, 3000);
  };

  // Touch support
  const handleTouchStart = (e) => {
    stopAutoRotation(); // Stop auto rotation when user interacts
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
    // Restart auto rotation after a delay
    setTimeout(() => {
      startAutoRotation();
    }, 3000);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    
    // Start auto rotation when component mounts
    startAutoRotation();
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
      stopAutoRotation(); // Clean up interval on unmount
    };
  }, []);

  return (
    <div 
      className="relative w-full h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
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
          width: '1400px',
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
          {products.map((product, index) => {
            const angle = index * angleStep;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;
            const rotateY = angle * (180 / Math.PI);
            
            // Calculate visibility based on angle
            const normalizedAngle = ((rotateY - rotation) % 360 + 360) % 360;
            // Hide images when they're in front (between 270 and 90 degrees)
            // Show images only when they're on the back side (between 90 and 270 degrees)
            const isVisible = normalizedAngle >= 0 && normalizedAngle <= 360;
            const opacity = isVisible ? 1 : 0;
            
            return (
              <div
                key={index}
                className="absolute"
                style={{
                  width: '700px',
                  height: hoveredIndex === index ? '1000px' : '500px',
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
                  transition: isDragging ? 'opacity 0.3s' : 'opacity 0.3s, transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  zIndex: hoveredIndex === index ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  className="w-full h-full rounded-lg overflow-hidden bg-gray-800"
                  style={{
                    boxShadow: hoveredIndex === index 
                      ? '0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 35px 35px -5px rgba(0, 0, 0, 0.5)' 
                      : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    transition: 'box-shadow 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                    style={{
                      userSelect: 'none',
                      backfaceVisibility: 'hidden',
                      transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
                      transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />
                  
                  {/* Product Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                {/* Reflection effect */}
                <div 
                  className="absolute top-full left-0 w-full h-24 mt-4"
                  style={{
                    transform: 'rotateX(0deg)',
                    transformOrigin: 'top',
                    opacity: 0.3,
                    maskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
                  }}
                >
                  <img
                    src={product.image}
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
      
      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
        Auto-rotating carousel • Drag to pause
      </div>
    </div>
  );
};

const StBeast = () => {
  // Sample product data - replace with your actual images
  const products = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      title: "Oversized Hoodie",
      description: "Comfortable cotton blend hoodie",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      title: "Vintage Tee",
      description: "Classic vintage style t-shirt",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      title: "Royal Blue Sweatshirt",
      description:
        "Unisex oversized t-shirt in bold royal blue with puff print detailing.",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop",
      title: "Casual Shirt",
      description: "Premium cotton casual wear",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=500&fit=crop",
      title: "Crop Top",
      description: "Stylish casual crop top",
    },{
      id: 6,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      title: "Oversized Hoodie",
      description: "Comfortable cotton blend hoodie",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      title: "Vintage Tee",
      description: "Classic vintage style t-shirt",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      title: "Royal Blue Sweatshirt",
      description:
        "Unisex oversized t-shirt in bold royal blue with puff print detailing.",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop",
      title: "Casual Shirt",
      description: "Premium cotton casual wear",
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=500&fit=crop",
      title: "Crop Top",
      description: "Stylish casual crop top",
    },
  ];

  return (
    <div className="min-h-screen bg-[#b8001f] relative overflow-hidden">
      {/* Background Pattern and Top Dashed Texts */}
      <div className="absolute inset-0 opacity-10">
        {/* Decorative dashed boxes */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white border-dashed rounded-lg transform rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white border-dashed rounded-lg transform -rotate-12"></div>
        <div className="absolute top-1/2 left-20 text-white text-sm font-bold transform -rotate-90">
          SWEARR..SWEARR..!
        </div>
        <div className="absolute top-1/3 right-10 text-white text-lg font-bold transform rotate-90">
          ST BEAST
        </div>

        {/* Top left dashed/tilted text elements */}
        <div
          className="absolute top-6 left-4 z-20"
          style={{ transform: "rotate(-13deg)" }}
        >
          <div
            className="border-2 border-white border-dashed rounded-2xl px-4 py-2 text-white font-bold text-sm shadow-lg"
            style={{ background: "rgba(0,0,0,1)" }}
          >
            TRY chey mama,
            <br />
            hero la undu!
          </div>
        </div>
        <div
          className="absolute top-24 left-32 z-20"
          style={{ transform: "rotate(-8deg)" }}
        >
          <div
            className="border-2 border-white border-dashed rounded-2xl px-3 py-1 text-white font-semibold text-xs shadow-md"
            style={{ background: "rgba(0,0,0,1)" }}
          >
            SWEARR..SWEARR..!
          </div>
        </div>
      </div>

      {/* Header - Styled like MainScreen */}
      <div className="relative z-10 pt-12 pb-8">
        <div className="text-center">
          <div
            className="text-white font-black text-6xl leading-none drop-shadow-lg tracking-tight"
            style={{
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            st.
          </div>
          <div className="text-white text-lg font-medium drop-shadow mb-4">
            Student Tribe
          </div>
          <div className="mx-auto mt-8 w-[400px] max-w-[90vw] bg-[#2d000a] rounded-full flex overflow-hidden shadow-lg text-xl font-bold">
            <button
              className={`flex-1 py-4 text-center rounded-l-full transition-colors duration-300 bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white`}
              style={{ pointerEvents: "none" }}
            >
              Students
            </button>
            <button
              className={`flex-1 py-4 text-center rounded-r-full transition-colors duration-300 text-gray-300 bg-transparent`}
              style={{ pointerEvents: "none" }}
            >
              Brands
            </button>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center text-white mb-16">
        <h1 className="text-4xl font-bold mb-4">Beast Mode - Wear What Roars</h1>
        <p className="text-lg opacity-80">
          From oversized fits that scream confidence to punchlines that rep
          <br />
          your vibe — this drop is all about you.
        </p>
      </div>

      {/* 3D Curved Carousel */}
      <div className="relative flex items-center justify-center min-h-[500px] px-8">
        <CurvedCarousel products={products} />
      </div>
    </div>
  );
};

export default StBeast;
