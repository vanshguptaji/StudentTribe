import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
// import Footer from './components/Footer';

export default function BrandsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const isBrands = location.pathname === "/brands";
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // GSAP animation for images appearing from bottom
      if (imagesRef.current.length > 0) {
        // Set initial position - all images start from extreme bottom of viewport
        gsap.set(imagesRef.current, {
          y: window.innerHeight + 200, // Start from below viewport
          opacity: 0,
          scale: 0.8
        });

        // Animate images to their final positions with staggered timing
        gsap.to(imagesRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: {
            amount: 1.5, // Total time for all animations
            from: "random" // Random order for more dynamic effect
          }
        });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Function to add image refs
  const addToRefs = (el) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  return (
    <div className="relative w-screen min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#fff6f6] to-[#FFF8F8] overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 pt-16">
        <div className="mb-8 text-center">
          <div className="logo-container">
            <div className="text-[#b8001f] font-black text-6xl leading-none drop-shadow-lg tracking-tight">
              st.
            </div>
            <div className="text-[#b8001f] text-lg font-medium drop-shadow mb-4">
              Student Tribe
            </div>
          </div>
          <div className="mx-auto mt-8 w-[400px] max-w-[90vw] bg-[#2d000a] rounded-full flex overflow-hidden shadow-lg text-xl font-bold">
            <button
              className={`flex-1 py-4 text-center rounded-l-full transition-colors duration-300 ${
                !isBrands
                  ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                  : "text-gray-300 bg-transparent"
              }`}
              onClick={() => navigate("/")}
            >
              Students
            </button>
            <button
              className={`flex-1 py-4 text-center rounded-r-full transition-colors duration-300 ${
                isBrands
                  ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                  : "text-gray-300 bg-transparent"
              }`}
              onClick={() => navigate("/brands")}
            >
              Brands
            </button>
          </div>
        </div>

      {/* Content Area */}
      <div className="relative z-20 px-8 w-full">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-[#2d1c1c] mb-6 leading-tight">
            Discover career paths you never know!
          </h1>
          <p className="text-2xl text-[#2d1c1c] mb-8 leading-relaxed">
            Workshops that don't bore. Webinars with no-zoom fatigue.<br/>
            Courses that actually upskill. Dive into learning with vibe.
          </p>
        </div>

        {/* Image Grid Layout */}
        <div className="relative max-w-6xl mx-auto" ref={containerRef}>
          {/* Main Photo Grid - 4 columns on large screens, 2x2 grid on smaller screens */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {/* Column 1 - First image tall, second image below */}
            <div className="flex flex-col gap-6">
              <div>
                <img 
                  ref={addToRefs}
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team Meeting"
                  className="w-full h-80 mt-10 object-cover rounded-3xl shadow-xl"
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
                  className="w-full h-28 object-cover rounded-3xl shadow-xl"
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
                className="w-full h-5/6 object-cover rounded-3xl shadow-xl mt-18"
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
                className="w-full h-76 object-cover rounded-3xl shadow-xl mt-28"
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
                className="w-full h-5/6 object-cover rounded-3xl shadow-xl mt-18"
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
                  className="w-full h-80 object-cover rounded-3xl shadow-xl mt-10"
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
                  className="w-full h-28 object-cover rounded-3xl shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Central Button */}
          <div className={`text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <button 
              ref={addToRefs}
              className="absolute bottom-10 left-2/5 transform -translate-x-1/2 px-10 py-3 rounded-full bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Explore Now →
            </button>
          </div>
        </div>

        {/* Additional spacing for content below */}
        <div className="h-32"></div>
      </div>
      </div>

      {/* Right Side Label */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#2d1c1c] text-white font-bold text-xl px-4 py-8 rounded-l-xl tracking-widest flex items-center justify-center shadow-lg z-30" 
           style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
        ST SCHOOL
      </div>

      {/* Bottom Right Small Images */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="grid grid-cols-2 gap-2">
          <div className="w-16 h-16 bg-gray-300 rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Thumb 1" className="w-full h-full object-cover" />
          </div>
          <div className="w-16 h-16 bg-gray-300 rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Thumb 2" className="w-full h-full object-cover" />
          </div>
          <div className="w-16 h-16 bg-gray-300 rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Thumb 3" className="w-full h-full object-cover" />
          </div>
          <div className="w-16 h-16 bg-gray-300 rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Thumb 4" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
