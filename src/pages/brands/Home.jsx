import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Random background images for both sections
const leftSectionImages = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80", 
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80"
];

const rightSectionImages = [
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
];

// Position configurations for background images
const leftImagePositions = [
  { top: "15%", left: "10%", size: 80 },
  { top: "35%", right: "15%", size: 100 },
  { bottom: "30%", left: "20%", size: 90 },
  { bottom: "15%", right: "25%", size: 110 },
  { top: "55%", left: "5%", size: 85 }
];

const rightImagePositions = [
  { top: "20%", left: "15%", size: 95 },
  { top: "40%", right: "20%", size: 85 },
  { bottom: "25%", left: "10%", size: 100 },
  { bottom: "45%", right: "15%", size: 80 },
  { top: "65%", right: "25%", size: 90 }
];

function Home() {
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const centerElementsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial positions - entire columns move as one unit
    gsap.set(leftColumnRef.current, { 
      y: "100vh" // Start from bottom
    });
    
    gsap.set(rightColumnRef.current, { 
      y: "-100vh" // Start from top
    });

    gsap.set(centerElementsRef.current, {
      opacity: 0,
      scale: 0.8
    });

    // Animate entire columns sliding in
    tl.to(leftColumnRef.current, {
      y: 0,
      duration: 1.5,
      ease: "power3.out"
    })
    .to(rightColumnRef.current, {
      y: 0,
      duration: 1.5,
      ease: "power3.out"
    }, "-=1.2") // Start slightly overlapped
    .to(centerElementsRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left Column */}
      <div 
        ref={leftColumnRef}
        className="flex-1 relative bg-gradient-to-br from-[#2d1b69] via-[#11047a] to-[#000000]"
      >
        {/* Background Images for Left Column */}
        <div className="absolute inset-0 overflow-hidden">
          {leftSectionImages.map((src, index) => {
            const position = leftImagePositions[index];
            return (
              <img
                key={`left-${index}`}
                src={src}
                alt="background"
                className="absolute rounded-lg object-cover pointer-events-none select-none opacity-20"
                style={{
                  top: position.top,
                  left: position.left,
                  right: position.right,
                  bottom: position.bottom,
                  width: `${position.size}px`,
                  height: `${position.size}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            );
          })}
        </div>

        {/* Left Content */}
        <div className="flex flex-col justify-center items-start px-8 lg:px-16 relative z-10 h-full">
          <div className="max-w-lg">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl text-left">
              We don't just promote your brand, We build it.
            </h1>
            <p className="text-base lg:text-lg xl:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-lg text-left">
              Whether you're targeting one neighborhood or the entire country, we build campaigns that grow with you — meaningfully and measurably.
            </p>
          </div>
        </div>
      </div>

      {/* Center Elements - Logo and Toggle */}
      <div 
        ref={centerElementsRef}
        className="absolute top-26 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center"
      >
        {/* Custom Logo */}
        <div className="rounded-full p-6 mb-6">
          <div className="flex flex-col items-center">
            <span className="text-6xl font-black text-[#b8001f] mb-1">st.</span>
            <span className="text-lg font-semibold text-[#b8001f] tracking-wider">Student Tribe</span>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="bg-black/40 backdrop-blur-sm rounded-full p-1 flex shadow-2xl">
          <button className="px-6 py-3 text-white/70 font-medium transition-all duration-300 rounded-full hover:text-white">
            Students
          </button>
          <button className="px-6 py-3 bg-[#b8001f] text-white font-medium rounded-full shadow-lg">
            Brands
          </button>
        </div>
      </div>

      {/* Right Column */}
      <div 
        ref={rightColumnRef}
        className="flex-1 relative bg-gradient-to-br from-[#4a1a1a] via-[#8B4B6B] to-[#E8B4CD]"
      >
        {/* Background Images for Right Column */}
        <div className="absolute inset-0 overflow-hidden">
          {rightSectionImages.map((src, index) => {
            const position = rightImagePositions[index];
            return (
              <img
                key={`right-${index}`}
                src={src}
                alt="background"
                className="absolute rounded-lg object-cover pointer-events-none select-none opacity-20"
                style={{
                  top: position.top,
                  left: position.left,
                  right: position.right,
                  bottom: position.bottom,
                  width: `${position.size}px`,
                  height: `${position.size}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            );
          })}
        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-center items-center px-8 lg:px-16 relative z-10 h-full">
          {/* Main Content */}
          <div className="text-center text-white z-10 max-w-lg">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 leading-tight drop-shadow-2xl text-center">
              You focus on the message, We handle{' '}
              <span className="block font-black">everything else</span>
            </h2>
            <button className="bg-[#b8001f] hover:bg-[#9a0019] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl">
              Explore More →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;