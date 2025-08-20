// import React, { useState, useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import banner from "../../assets/Stschool/banner.svg";
// import stlogo from "../../assets/Red logo.png"
// import centerImg from "../../assets/BrandsSection/center.svg"
// import leftmostUpper1st from "../../assets/BrandsSection/left1st1.jpg";
// import leftmost2nd from "../../assets/BrandsSection/left2nd.jpg";
// import rightUpper1st from "../../assets/BrandsSection/rightUpper1st.jpg";
// import rightmost2nd from "../../assets/BrandsSection/right2nd.jpg";
// import leftLower from "../../assets/BrandsSection/leftLower1st.jpg";
// import meeting from "../../assets/BrandsSection/meeting.jpg";

// export default function BrandsScreen() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [showButtons, setShowButtons] = useState(false);
//   const [hoveredButton, setHoveredButton] = useState('students');
//   const containerRef = useRef(null);
//   const imagesRef = useRef([]);
//   const logoRef = useRef(null);
//   const logoContainerRef = useRef(null);
//   const hideButtonsTimeoutRef = useRef(null);
  
//   // Logo hover logic (copied from MainScreen)
//   const handleLogoOrButtonsMouseEnter = () => {
//     if (hideButtonsTimeoutRef.current) {
//       clearTimeout(hideButtonsTimeoutRef.current);
//       hideButtonsTimeoutRef.current = null;
//     }
//     setShowButtons(true);
//   };

//   const handleLogoOrButtonsMouseLeave = (e) => {
//     const relatedTarget = e.relatedTarget;
//     const currentTarget = e.currentTarget;
//     if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
//       hideButtonsTimeoutRef.current = setTimeout(() => {
//         setShowButtons(false);
//       }, 300);
//     }
//   };

//   // Animation function
//   const runAnimation = () => {
//     if (containerRef.current && imagesRef.current.length > 0) {
//       gsap.set(imagesRef.current, {
//         y: window.innerHeight + 200,
//         opacity: 0,
//         scale: 0.8
//       });
//       gsap.to(imagesRef.current, {
//         y: 0,
//         opacity: 1,
//         scale: 1,
//         duration: 1.2,
//         ease: "power3.out",
//         stagger: 0.08, // quick burst, not scroll-based
//         onStart: () => setIsVisible(true)
//       });
//     }
//   };

//   useEffect(() => {
//     // Clear refs before collecting again (prevents duplicate refs)
//     imagesRef.current = [];
    
//     // Wait for refs to be collected, then run animation
//     const timer = setTimeout(() => {
//       if (imagesRef.current.length > 0) {
//         runAnimation();
//       }
//     }, 100);

//     // Listen for custom event to re-trigger animation
//     const handleTrigger = (event) => {
//       if (event.detail?.sectionName === 'brands') {
//         setIsVisible(false);
//         // Reset images to hidden state immediately
//         if (imagesRef.current.length > 0) {
//           gsap.set(imagesRef.current, {
//             y: window.innerHeight + 200,
//             opacity: 0,
//             scale: 0.8
//           });
//         }
//         setTimeout(runAnimation, 100);
//       }
//     };
//     window.addEventListener('triggerSectionAnimation', handleTrigger);

//     // Intersection Observer to re-trigger animation when section enters viewport
//     let observer;
//     if (containerRef.current) {
//       observer = new window.IntersectionObserver(
//         (entries) => {
//           entries.forEach(entry => {
//             if (entry.isIntersecting) {
//               setIsVisible(false);
//               // Reset images to hidden state immediately
//               if (imagesRef.current.length > 0) {
//                 gsap.set(imagesRef.current, {
//                   y: window.innerHeight + 200,
//                   opacity: 0,
//                   scale: 0.8
//                 });
//               }
//               setTimeout(runAnimation, 100);
//             }
//           });
//         },
//         { threshold: 0.5 }
//       );
//       observer.observe(containerRef.current);
//     }

//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener('triggerSectionAnimation', handleTrigger);
//       if (observer && containerRef.current) observer.unobserve(containerRef.current);
//     };
//   }, []);

//   // Function to add image refs
//   const addToRefs = (el) => {
//     if (el && !imagesRef.current.includes(el)) {
//       imagesRef.current.push(el);
//     }
//   };

//   // Button hover handlers
//   const handleButtonHover = (buttonType) => {
//     setHoveredButton(buttonType);
//   };

//   const handleButtonLeave = () => {
//     setHoveredButton('students');
//   };

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   // Clean up timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (hideButtonsTimeoutRef.current) {
//         clearTimeout(hideButtonsTimeoutRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="relative w-screen min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#fff6f6] to-[#FFF8F8] overflow-hidden"
//          id="brands-section">
//           {/* <img
//                   src={banner}
//                   alt="ST Care Banner"
//                   className="absolute top-0 right-4 md:top-0 md:right-8 lg:top-0 lg:right-2 w-[20px] md:w-[30px] lg:w-[56px] h-auto select-none pointer-events-none"
//                   style={{ minWidth: "20px" }}
//                   loading="eager"
//                 /> */}
//       {/* Main content */}
//       <div className="relative z-10 flex flex-col items-center w-full px-4 pt-4">
//         <div className="mb-6 md:mb-8 text-center">
//           <div
//             ref={el => { logoRef.current = el; logoContainerRef.current = el; }}
//             className="logo-container group inline-block cursor-pointer relative"
//             onMouseEnter={handleLogoOrButtonsMouseEnter}
//             onMouseLeave={handleLogoOrButtonsMouseLeave}
//           >
//             {/* Replace manual logo with image logo */}
//             <img 
//               src={stlogo} 
//               alt="Student Tribe Logo"
//               className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
//             />
//             {/* Buttons appear below logo on hover */}
//             <div
//               className={`absolute left-1/2 -translate-x-1/2 w-[400px] h-[50px] md:w-[400px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
//                 showButtons ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
//               }`}
//               style={{
//                 top: 'calc(100% + 8px)',
//               }}
//               onMouseEnter={handleLogoOrButtonsMouseEnter}
//               onMouseLeave={handleLogoOrButtonsMouseLeave}
//             >
//               <button
//                 className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm md:text-lg hover:scale-105 ${
//                   hoveredButton === 'students'
//                     ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
//                     : 'bg-transparent text-gray-300 hover:text-white'
//                 }`}
//                 onClick={() => scrollToSection('main-section')}
//                 onMouseEnter={() => handleButtonHover('students')}
//                 onMouseLeave={handleButtonLeave}
//               >
//                 Students
//               </button>
//               <button
//                 className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm md:text-lg hover:scale-105 ${
//                   hoveredButton === 'brands'
//                     ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
//                     : 'bg-transparent text-gray-300 hover:text-white'
//                 }`}
//                 onClick={() => scrollToSection('brands-section')}
//                 onMouseEnter={() => handleButtonHover('brands')}
//                 onMouseLeave={handleButtonLeave}
//               >
//                 Brands
//               </button>
//             </div>
//           </div>
//         </div>

//       {/* Content Area with translateY on logo hover */}
//       <div
//         className="relative z-20 px-4 md:px-8 w-full transition-transform duration-500"
//         style={{ transform: showButtons ? 'translateY(80px)' : 'translateY(0)' }}
//       >
//         {/* Title and Description */}
//         <div className="text-center mb-6 md:mb-12">
//           <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-[#2d1c1c] mb-3 md:mb-6 leading-tight px-2 md:px-4">
//             Discover career paths you never know!
//           </h1>
//           <p className="text-base md:text-xl lg:text-2xl text-[#2d1c1c] mb-0 leading-relaxed px-2 md:px-4">
//             Workshops that don't bore. Webinars with no-zoom fatigue.<br className="hidden md:block"/>
//             Courses that actually upskill. Dive into learning with vibe.
//           </p>
//         </div>

//         {/* Image Grid Layout */}
//         <div className="relative max-w-6xl mx-auto">
//           {/* Mobile Layout: 2x4 Grid */}
//           <div className="block md:hidden">
//             <div className="grid grid-cols-2 gap-2 mb-6">
//               {/* Row 1 */}
//               <div>
//                 <img 
//                   ref={addToRefs}
//                   src={leftmostUpper1st}
//                   alt="Team Meeting"
//                   className="w-full h-32 object-cover rounded-xl shadow-lg opacity-0"
//                   style={{ transform: 'translateY(100vh)' }}
//                 />
//               </div>
//               <div>
//                 <img 
//                   ref={addToRefs}
//                   src={leftmost2nd}
//                   alt="Professional Woman"
//                   className="w-full h-32 object-cover rounded-xl shadow-lg opacity-0"
//                   style={{ transform: 'translateY(100vh)' }}
//                 />
//               </div>
              
//               {/* Row 2 */}
//               <div>
//                 <img 
//                   ref={addToRefs}
//                   src={leftLower}
//                   alt="Team Collaboration"
//                   className="w-full h-32 object-cover rounded-xl shadow-lg opacity-0"
//                   style={{ transform: 'translateY(100vh)' }}
//                 />
//               </div>
//               <div>
//                 <img 
//                   ref={addToRefs}
//                   src={rightmost2nd}
//                   alt="Tech Team"
//                   className="w-full h-32 object-cover rounded-xl shadow-lg opacity-0"
//                   style={{ transform: 'translateY(100vh)' }}
//                 />
//               </div>
              
//               {/* Row 3 */}
//               <div>
//                 <img 
//                   ref={addToRefs}
//                   src={rightUpper1st}
//                   alt="University Campus"
//                   className="w-full h-32 object-cover rounded-xl shadow-lg opacity-0"
//                   style={{ transform: 'translateY(100vh)' }}
//                 />
//               </div>
//               <div>
//                 <img 
//                   ref={addToRefs}
//                   src={meeting}
//                   alt="Business Meeting"
//                   className="w-full h-32 object-cover rounded-xl shadow-lg opacity-0"
//                   style={{ transform: 'translateY(100vh)' }}
//                 />
//               </div>
              
//               {/* Row 4 */}
//               <div>
//                 <img 
//                   ref={addToRefs}
//                   src=""
//                   alt="Additional Image"
//                   className="w-full h-32 object-cover rounded-xl shadow-lg opacity-0"
//                   style={{ transform: 'translateY(100vh)' }}
//                 />
//               </div>
//               <div>
//                 <img 
//                   ref={addToRefs}
//                   src=""
//                   alt="Additional Image 2"
//                   className="w-full h-32 object-cover rounded-xl shadow-lg opacity-0"
//                   style={{ transform: 'translateY(100vh)' }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Desktop Layout: Original Complex Grid */}
//           <div className="hidden md:block">
//             <div className="grid grid-cols-5 gap-8 mb-8">
//               {/* Column 1 - First image tall, second image below */}
//               <div className="flex flex-col gap-6">
//                 <div>
//                   <img 
//                     ref={addToRefs}
//                     src={leftmostUpper1st}
//                     alt="Team Meeting"
//                     className="w-full h-64 lg:h-80 mt-10 object-center rounded-3xl shadow-xl opacity-0"
//                     style={{ 
//                       transform: 'perspective(500px) rotateX(0deg) rotateY(12deg) translateY(100vh)',
//                       transformOrigin: 'bottom center'
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <img 
//                     ref={addToRefs}
//                     src={leftLower}
//                     alt="Team Collaboration"
//                     className="w-full h-20 lg:h-28 object-cover rounded-3xl shadow-xl opacity-0"
//                     style={{ 
//                       transform: 'perspective(1000px) rotateX(8deg) rotateY(-3deg) translateY(100vh)',
//                       transformOrigin: 'top center'
//                     }}
//                   />
//                 </div>
//               </div>
              
//               {/* Column 2 - Just one tall image */}
//               <div>
//                 <img 
//                   ref={addToRefs}
//                   src={leftmost2nd}
//                   alt="Professional Woman"
//                   className="w-full h-72 lg:h-5/6 object-cover rounded-3xl shadow-xl mt-18 opacity-0"
//                   style={{ 
//                     transform: 'perspective(1000px) rotateX(5deg) rotateY(12deg) translateY(100vh)',
//                     transformOrigin: 'bottom center'
//                   }}
//                 />
//               </div>

//               <div>
//                 <img 
//                   ref={addToRefs}
//                   src={centerImg}
//                   alt="centerImage"
//                   className="w-full h-64 lg:h-76 object-cover rounded-3xl shadow-xl mt-28 opacity-0"
//                   style={{ 
//                     transform: 'perspective(500px) rotateX(2deg) rotateY(0deg) translateY(100vh)',
//                     transformOrigin: 'top center'
//                   }}
//                 />
//               </div>
              
//               {/* Column 3 - Just one tall image */}
//               <div>
//                 <img 
//                   ref={addToRefs}
//                   src={rightmost2nd}
//                   alt="Tech Team"
//                   className="w-full h-72 lg:h-5/6 object-cover rounded-3xl shadow-xl mt-18 opacity-0"
//                   style={{ 
//                     transform: 'perspective(1000px) rotateX(5deg) rotateY(-12deg) translateY(100vh)',
//                     transformOrigin: 'bottom center'
//   }}
//                 />
//               </div>
              
//               {/* Column 4 - First image tall, second image below */}
//               <div className="flex flex-col gap-6">
//                 <div>
//                   <img 
//                     ref={addToRefs}
//                     src={rightUpper1st}
//                     alt="5th row top"
//                     className="w-full h-64 lg:h-80 object-cover rounded-3xl shadow-xl mt-10 opacity-0"
//                     style={{ 
//                     transform: 'perspective(500px) rotateX(0deg) rotateY(-12deg) translateY(100vh)',
//                     transformOrigin: 'bottom center'
//                   }}
//                   />
//                 </div>
//                 <div>
//                   <img 
//                     ref={addToRefs}
//                     src={meeting}
//                     alt="Business Meeting"
//                     className="w-full h-20 lg:h-28 object-cover rounded-3xl shadow-xl opacity-0"
//                     style={{ transform: 'translateY(100vh)' }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Central Button */}
//           <div className="text-center relative">
//             <button 
//               ref={addToRefs}
//               className="relative -top-2 sm:-top-8 lg:-top-16 px-6 md:px-10 py-3 md:py-3 rounded-full bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white font-bold text-base md:text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl opacity-0"
//               style={{ transform: 'translateY(100vh)' }}
//             >
//               Explore Now →
//             </button>
//           </div>
//         </div>

//         {/* Additional spacing for content below */}
//         <div className="h-20 md:h-32"></div>
//       </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import banner from "../../assets/Stschool/banner.svg";
import stlogo from "../../assets/Red logo.png"
import centerImg from "../../assets/BrandsSection/center.svg"
import leftmostUpper1st from "../../assets/BrandsSection/left1st1.jpg";
import leftmost2nd from "../../assets/BrandsSection/left2nd.jpg";
import rightUpper1st from "../../assets/BrandsSection/rightUpper1st.jpg";
import rightmost2nd from "../../assets/BrandsSection/right2nd.jpg";
import leftLower from "../../assets/BrandsSection/leftLower1st.jpg";
import meeting from "../../assets/BrandsSection/meeting.jpg";

export default function BrandsScreen() {
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState('students');
  const logoRef = useRef(null);
  const logoContainerRef = useRef(null);
  const hideButtonsTimeoutRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  
  // Logo hover logic (copied from original)
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

  // GSAP ScrollTrigger: scatter images then gather them back while pinned + scrub
  useEffect(() => {
    // register plugin
    try { gsap.registerPlugin(ScrollTrigger); } catch (e) { /* already registered or not available */ }

    const pinEl = pinWrapperRef.current;
    console.log('[BrandsScreen] ScrollTrigger effect running. window.innerWidth=', window.innerWidth);
    if (!pinEl) {
      console.warn('[BrandsScreen] pin wrapper not found');
      return;
    }

    // collect only the images inside the pin wrapper
    const imgs = Array.from(pinEl.querySelectorAll('img'));
    if (!imgs.length) return;

    // Set initial scattered state to match your provided frames
    // Frame 1: Images scattered across the entire screen area
    const scatterPositions = [
      { x: -200, y: -150, rotation: -25, scale: 0.7 }, // Top left
      { x: 250, y: -120, rotation: 15, scale: 0.8 },  // Top right
      { x: -180, y: 80, rotation: -18, scale: 0.75 },  // Middle left
      { x: 150, y: 90, rotation: 22, scale: 0.85 },    // Middle right
      { x: -250, y: 200, rotation: -12, scale: 0.8 },  // Bottom left
      { x: 200, y: 180, rotation: 18, scale: 0.7 },    // Bottom right
      { x: 0, y: -180, rotation: -8, scale: 0.9 },     // Top center
      { x: -100, y: -50, rotation: 12, scale: 0.85 },  // Upper middle
    ];

    imgs.forEach((el, idx) => {
      const pos = scatterPositions[idx % scatterPositions.length];
      gsap.set(el, {
        x: pos.x,
        y: pos.y,
        rotation: pos.rotation,
        scale: pos.scale,
        opacity: 1,
      });
    });

    // Enable pin for the scroll animation
    const enablePin = true;

    // Ensure there is enough vertical space for the pinned animation to play
    try { pinEl.style.minHeight = pinEl.style.minHeight || '300px'; } catch (e) { }

    console.log('[BrandsScreen] found', imgs.length, 'images inside pin wrapper, enablePin=', enablePin);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinEl,
        start: 'top 30%',
        end: 'top 5%', // Extended length for smoother scroll animation
        scrub: 0.8, // Smoother scrub - lower value = more responsive to scroll
        pin: true,
        markers: false, // visible markers for debugging
      }
    });

    // Single smooth animation instead of multiple stages for better scroll performance
    tl.to(imgs, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 1.5,
      ease: "linear", // Linear easing works best with scrub
      stagger: {
        amount: 0.3, // Total stagger duration
        from: "random", // Random stagger pattern
        ease: "power2.inOut"
      }
    });

    // force a refresh so markers and pin are calculated correctly
    try { ScrollTrigger.refresh(); } catch (e) { /* ignore */ }

    // Animate title and description from top with opacity
    if (titleRef.current) {
      gsap.set(titleRef.current, {
        y: -200, // Start from much higher - top of screen
        opacity: 0,
        duration: 2, // Match the duration of the image animation
      });

      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 20%",
          end: "bottom 60%",
          scrub: 0.5,
          markers: false,
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      });
    }

    // Animate explore button from top with opacity
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        y: -550, // Start from higher up - top of screen
        opacity: 0
      });

      gsap.to(buttonRef.current, {
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 85%",
          end: "bottom 65%",
          scrub: 0.5,
          markers: false,
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "linear"
      });
    }

    // Clean up on unmount
    return () => {
      try {
        tl.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      } catch (e) { }
    };
  }, []);

  return (
    <div className="relative w-screen min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#fff6f6] to-[#FFF8F8] overflow-hidden"
         id="brands-section">
      {/* Uncomment if you want the banner */}
      {/* <img
        src={banner}
        alt="ST Care Banner"
        className="absolute top-0 right-4 md:top-0 md:right-8 lg:top-0 lg:right-2 w-[20px] md:w-[30px] lg:w-[56px] h-auto select-none pointer-events-none"
        style={{ minWidth: "20px" }}
        loading="eager"
      /> */}

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
              className={`absolute left-1/2 -translate-x-1/2 w-[400px] h-[50px] md:w-[400px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
                showButtons ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              style={{
                top: 'calc(100% + 8px)',
              }}
              onMouseEnter={handleLogoOrButtonsMouseEnter}
              onMouseLeave={handleLogoOrButtonsMouseLeave}
            >
              <button
                className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm md:text-lg hover:scale-105 ${
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
                className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm md:text-lg hover:scale-105 ${
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
          <div ref={titleRef} className="text-center mb-6 md:mb-12">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-[#2d1c1c] mb-3 md:mb-6 leading-tight px-2 md:px-4">
              Discover career paths you never know!
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-[#2d1c1c] mb-0 leading-relaxed px-2 md:px-4">
              Workshops that don't bore. Webinars with no-zoom fatigue.<br className="hidden md:block"/>
              Courses that actually upskill. Dive into learning with vibe.
            </p>
          </div>

          {/* Image Grid Layout */}
          <div ref={pinWrapperRef} id="pin-windmill-wrap" className="relative max-w-6xl mx-auto">
            {/* Mobile Layout: 2x4 Grid */}
            <div className="block md:hidden">
              <div className="grid grid-cols-2 gap-2 mb-6">
                {/* Row 1 */}
                <div>
                  <img 
                    src={leftmostUpper1st}
                    alt="Team Meeting"
                    className="w-full h-32 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div>
                  <img 
                    src={leftmost2nd}
                    alt="Professional Woman"
                    className="w-full h-32 object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                {/* Row 2 */}
                <div>
                  <img 
                    src={leftLower}
                    alt="Team Collaboration"
                    className="w-full h-32 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div>
                  <img 
                    src={rightmost2nd}
                    alt="Tech Team"
                    className="w-full h-32 object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                {/* Row 3 */}
                <div>
                  <img 
                    src={rightUpper1st}
                    alt="University Campus"
                    className="w-full h-32 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div>
                  <img 
                    src={meeting}
                    alt="Business Meeting"
                    className="w-full h-32 object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                {/* Row 4 - You'll need to add more images or remove these */}
                <div>
                  <img 
                    src={centerImg}
                    alt="Additional Image"
                    className="w-full h-32 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div>
                  <img 
                    src={leftmostUpper1st}
                    alt="Additional Image 2"
                    className="w-full h-32 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Layout: Original Complex Grid */}
            <div className="hidden md:block">
              <div className="grid grid-cols-5 gap-8 mb-8">
                {/* Column 1 - First image tall, second image below */}
                <div className="flex flex-col gap-6">
                  <div>
                    <img 
                      src={leftmostUpper1st}
                      alt="Team Meeting"
                      className="w-full h-64 lg:h-80 mt-10 object-center rounded-3xl shadow-xl"
                      style={{ 
                        transform: 'perspective(500px) rotateX(0deg) rotateY(12deg)',
                        transformOrigin: 'bottom center'
                      }}
                    />
                  </div>
                  <div>
                    <img 
                      src={leftLower}
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
                    src={leftmost2nd}
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
                    src={centerImg}
                    alt="centerImage"
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
                    src={rightmost2nd}
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
                      src={rightUpper1st}
                      alt="5th row top"
                      className="w-full h-64 lg:h-80 object-cover rounded-3xl shadow-xl mt-10"
                      style={{ 
                        transform: 'perspective(500px) rotateX(0deg) rotateY(-12deg)',
                        transformOrigin: 'bottom center'
                      }}
                    />
                  </div>
                  <div>
                    <img 
                      src={meeting}
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
                ref={buttonRef}
                className="relative -top-2 sm:-top-8 lg:-top-16 px-6 md:px-10 py-3 md:py-3 rounded-full bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white font-bold text-base md:text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
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