import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

function WhoweAre() {
  const [activeTab, setActiveTab] = useState('Students');
  
  // Refs for GSAP animations
  const logoRef = useRef(null);
  const tabsRef = useRef(null);
  const zeroRef = useRef(null);
  const textContentRef = useRef(null);
  const navigationRef = useRef(null);
  const sideTextRef = useRef(null);

  // Sample images for the zero shape
  const zeroImages = [
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop',
  ];

  // GSAP Animation Timeline
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Set initial positions
    gsap.set([logoRef.current, tabsRef.current], { y: -50, opacity: 0 });
    gsap.set(zeroRef.current, { scale: 0, opacity: 0 });
    gsap.set(textContentRef.current, { y: 50, opacity: 0 });
    gsap.set(navigationRef.current, { y: 50, opacity: 0 });
    gsap.set(sideTextRef.current, { opacity: 0 });
    
    // Animate all elements
    tl.to([logoRef.current, tabsRef.current], { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      ease: "power2.out",
      stagger: 0.1
    }, 0)
    .to(zeroRef.current, { 
      scale: 1, 
      opacity: 1, 
      duration: 1.2, 
      ease: "back.out(1.7)" 
    }, 0.3)
    .to(textContentRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      ease: "power2.out" 
    }, 0.6)
    .to(navigationRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      ease: "power2.out" 
    }, 0.8)
    .to(sideTextRef.current, { 
      opacity: 1, 
      duration: 0.6, 
      ease: "power2.out" 
    }, 1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 relative overflow-hidden">
      {/* Side Text Elements */}
      <div ref={sideTextRef} className="absolute right-0 top-1/2 transform -translate-y-1/2 rotate-90 text-white font-bold text-lg tracking-widest z-10">
        WHO WE ARE
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-5">
        {/* Header with Logo */}
        <div ref={logoRef} className="text-center mb-8">
          <div className="logo-container">
            <div className="text-white font-black text-6xl leading-none drop-shadow-lg tracking-tight">
              st.
            </div>
            <div className="text-red-200 text-lg font-medium drop-shadow mb-4">
              Student Tribe
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div ref={tabsRef} className="flex justify-center mb-12">
          <div className="bg-black bg-opacity-50 rounded-full p-1 flex backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('Students')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'Students'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab('Brands')}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'Brands'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Brands
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div ref={textContentRef} className="text-white space-y-6">
            <div className="text-xl leading-relaxed">
              We are India's largest and fastest growing student community, 
              connecting thousands of students across the nation through 
              innovative platforms and experiences.
            </div>
          </div>

          {/* Right Side - Large Zero with Images */}
          <div ref={zeroRef} className="flex justify-center">
            <div className="relative">
              {/* Large Zero Background */}
              <div 
                className="text-[40rem] font-black text-transparent bg-clip-text bg-center bg-contain leading-none"
                style={{ 
                  backgroundImage: `url(${zeroImages[0]})`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}
              >
                0
              </div>
              
              {/* Image Grid Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-2 w-48 h-64">
                  {zeroImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Student ${index + 1}`}
                        className="w-full h-16 rounded-lg object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-red-600 bg-opacity-20 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-black to-transparent"></div>
      </div>
    </div>
  );
}

export default WhoweAre;