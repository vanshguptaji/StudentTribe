import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import banner from "../../assets/stschool/banner.svg";
import stlogo from "../../assets/Red logo.png"
// import Footer from './components/Footer';

export default function BrandsScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState('students');
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const logoRef = useRef(null);
  const logoContainerRef = useRef(null);
  const hideButtonsTimeoutRef = useRef(null);
  
  // Logo hover logic (copied from MainScreen)
  const handleLogoOrButtonsMouseEnter = () => {
    if (hideButtonsTimeoutRef.current) {
      clearTimeout(hideButtonsTimeoutRef.current);
      hideButtonsTimeoutRef.current = null;
    }
    setShowButtons(true);
  };

  const handleLogoOrButtonsMouseLeave = (e) => {
    const relatedTarget = e.relatedTarget;
    const currentTarget = e.currentTarget;
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      hideButtonsTimeoutRef.current = setTimeout(() => {
        setShowButtons(false);
      }, 300);
    }
  };

  // Animation function
  const runAnimation = () => {
    if (containerRef.current) {
      gsap.set(imagesRef.current, {
        y: window.innerHeight + 200,
        opacity: 0,
        scale: 0.8
      });
      gsap.to(imagesRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.08, // quick burst, not scroll-based
        onStart: () => setIsVisible(true)
      });
    }
  };

  useEffect(() => {
    // Clear refs before collecting again (prevents duplicate refs)
    imagesRef.current = [];
    setTimeout(runAnimation, 0); // Run after refs are attached

    // Listen for custom event to re-trigger animation
    const handleTrigger = (event) => {
      if (event.detail?.sectionName === 'brands') {
        setIsVisible(false);
        imagesRef.current = [];
        setTimeout(runAnimation, 50); // Small delay to allow for reset
      }
    };
    window.addEventListener('triggerSectionAnimation', handleTrigger);

    // Intersection Observer to re-trigger animation when section enters viewport
    let observer;
    if (containerRef.current) {
      observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(false);
              imagesRef.current = [];
              setTimeout(runAnimation, 50);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('triggerSectionAnimation', handleTrigger);
      if (observer && containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Function to add image refs
  const addToRefs = (el) => {
    if (el) {
      imagesRef.current.push(el);
    }
  };

  // Button hover handlers
  const handleButtonHover = (buttonType) => {
    setHoveredButton(buttonType);
  };

  const handleButtonLeave = () => {
    setHoveredButton('students');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hideButtonsTimeoutRef.current) {
        clearTimeout(hideButtonsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-screen min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#fff6f6] to-[#FFF8F8] overflow-hidden"
         id="brands-section">
          <img
                  src={banner}
                  alt="ST Care Banner"
                  className="absolute top-0 right-4 md:top-0 md:right-8 lg:top-0 lg:right-12 w-[20px] md:w-[30px] lg:w-[56px] h-auto z-30 select-none pointer-events-none"
                  style={{ minWidth: "20px" }}
                  loading="eager"
                />
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 pt-4">
        <div className="mb-6 md:mb-8 text-center">
          <div
            ref={el => { logoRef.current = el; logoContainerRef.current = el; }}
            className="logo-container group inline-block cursor-pointer relative"
            onMouseEnter={handleLogoOrButtonsMouseEnter}
            onMouseLeave={handleLogoOrButtonsMouseLeave}
          >
            {/* Replace manual logo with image logo */}
            <img 
              src={stlogo} 
              alt="Student Tribe Logo"
              className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
            />
            {/* Buttons appear below logo on hover */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-[300px] md:w-[400px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
                showButtons ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              style={{
                top: 'calc(100% + 8px)',
              }}
              onMouseEnter={handleLogoOrButtonsMouseEnter}
              onMouseLeave={handleLogoOrButtonsMouseLeave}
            >
              <button
                className={`flex-1 py-2 md:py-4 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm md:text-lg hover:scale-105 ${
                  hoveredButton === 'students'
                    ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
                    : 'bg-transparent text-gray-300 hover:text-white'
                }`}
                onClick={() => scrollToSection('main-section')}
                onMouseEnter={() => handleButtonHover('students')}
                onMouseLeave={handleButtonLeave}
              >
                Students
              </button>
              <button
                className={`flex-1 py-2 md:py-4 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm md:text-lg hover:scale-105 ${
                  hoveredButton === 'brands'
                    ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
                    : 'bg-transparent text-gray-300 hover:text-white'
                }`}
                onClick={() => scrollToSection('brands-section')}
                onMouseEnter={() => handleButtonHover('brands')}
                onMouseLeave={handleButtonLeave}
              >
                Brands
              </button>
            </div>
          </div>
        </div>

      {/* Content Area with translateY on logo hover */}
      <div
        className="relative z-20 px-4 md:px-8 w-full transition-transform duration-500"
        style={{ transform: showButtons ? 'translateY(80px)' : 'translateY(0)' }}
      >
        {/* Title and Description */}
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-[#2d1c1c] mb-3 md:mb-6 leading-tight px-2 md:px-4">
            Discover career paths you never know!
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-[#2d1c1c] mb-0 leading-relaxed px-2 md:px-4">
            Workshops that don't bore. Webinars with no-zoom fatigue.<br className="hidden md:block"/>
            Courses that actually upskill. Dive into learning with vibe.
          </p>
        </div>

        {/* Image Grid Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Mobile Layout: 2x4 Grid */}
          <div className="block md:hidden">
            <div className="grid grid-cols-2 gap-2 mb-6">
              {/* Row 1 */}
              <div>
                <img 
                  ref={addToRefs}
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team Meeting"
                  className="w-full h-32 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div>
                <img 
                  ref={addToRefs}
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Professional Woman"
                  className="w-full h-32 object-cover rounded-xl shadow-lg"
                />
              </div>
              
              {/* Row 2 */}
              <div>
                <img 
                  ref={addToRefs}
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team Collaboration"
                  className="w-full h-32 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div>
                <img 
                  ref={addToRefs}
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Tech Team"
                  className="w-full h-32 object-cover rounded-xl shadow-lg"
                />
              </div>
              
              {/* Row 3 */}
              <div>
                <img 
                  ref={addToRefs}
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="University Campus"
                  className="w-full h-32 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div>
                <img 
                  ref={addToRefs}
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Business Meeting"
                  className="w-full h-32 object-cover rounded-xl shadow-lg"
                />
              </div>
              
              {/* Row 4 */}
              <div>
                <img 
                  ref={addToRefs}
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Additional Image"
                  className="w-full h-32 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div>
                <img 
                  ref={addToRefs}
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Additional Image 2"
                  className="w-full h-32 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Desktop Layout: Original Complex Grid */}
          <div className="hidden md:block">
            <div className="grid grid-cols-5 gap-4 mb-8">
              {/* Column 1 - First image tall, second image below */}
              <div className="flex flex-col gap-6">
                <div>
                  <img 
                    ref={addToRefs}
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Team Meeting"
                    className="w-full h-64 lg:h-80 mt-10 object-cover rounded-3xl shadow-xl"
                    style={{ 
                      transform: 'perspective(500px) rotateX(0deg) rotateY(12deg)',
                      transformOrigin: 'bottom center'
                    }}
                  />
                </div>
                <div>
                  <img 
                    ref={addToRefs}
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Team Collaboration"
                    className="w-full h-20 lg:h-28 object-cover rounded-3xl shadow-xl"
                    style={{ 
                      transform: 'perspective(1000px) rotateX(8deg) rotateY(-3deg)',
                      transformOrigin: 'top center'
                    }}
                  />
                </div>
              </div>
              
              {/* Column 2 - Just one tall image */}
              <div>
                <img 
                  ref={addToRefs}
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Professional Woman"
                  className="w-full h-72 lg:h-5/6 object-cover rounded-3xl shadow-xl mt-18"
                  style={{ 
                    transform: 'perspective(1000px) rotateX(5deg) rotateY(12deg)',
                    transformOrigin: 'bottom center'
                  }}
                />
              </div>

              <div>
                <img 
                  ref={addToRefs}
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Professional Woman"
                  className="w-full h-64 lg:h-76 object-cover rounded-3xl shadow-xl mt-28"
                  style={{ 
                    transform: 'perspective(500px) rotateX(2deg) rotateY(0deg)',
                    transformOrigin: 'top center'
                  }}
                />
              </div>
              
              {/* Column 3 - Just one tall image */}
              <div>
                <img 
                  ref={addToRefs}
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Tech Team"
                  className="w-full h-72 lg:h-5/6 object-cover rounded-3xl shadow-xl mt-18"
                  style={{ 
                    transform: 'perspective(1000px) rotateX(5deg) rotateY(-12deg)',
                    transformOrigin: 'bottom center'
                  }}
                />
              </div>
              
              {/* Column 4 - First image tall, second image below */}
              <div className="flex flex-col gap-6">
                <div>
                  <img 
                    ref={addToRefs}
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="University Campus"
                    className="w-full h-64 lg:h-80 object-cover rounded-3xl shadow-xl mt-10"
                    style={{ 
                    transform: 'perspective(500px) rotateX(0deg) rotateY(-12deg)',
                    transformOrigin: 'bottom center'
                  }}
                  />
                </div>
                <div>
                  <img 
                    ref={addToRefs}
                    src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Business Meeting"
                    className="w-full h-20 lg:h-28 object-cover rounded-3xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Central Button */}
          <div className="text-center relative">
            <button 
              ref={addToRefs}
              className="relative -top-20 px-6 md:px-10 py-3 md:py-3 rounded-full bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white font-bold text-base md:text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Explore Now →
            </button>
          </div>
        </div>

        {/* Additional spacing for content below */}
        <div className="h-20 md:h-32"></div>
      </div>
      </div>
    </div>
  );
}