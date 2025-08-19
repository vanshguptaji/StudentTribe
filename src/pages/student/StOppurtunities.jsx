// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import stlogo from "../../assets/White logo.png";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const StOpportunities = () => {
//   const navigate = useNavigate();
//   const [showButtons, setShowButtons] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const hideButtonsTimeoutRef = useRef(null);
//   const containerRef = useRef(null);
//   // Card refs for animation
//   const cardRefs = useRef([]);
//   const logoRef = useRef(null);

//   useEffect(() => {
//     const runAnimation = () => {
//       setIsVisible(true);
//       // Animate logo
//       gsap.set(logoRef.current, { opacity: 0, y: -60 });
//       gsap.to(logoRef.current, {
//         opacity: 1,
//         y: 0,
//         duration: 1.1,
//         ease: "power3.out",
//       });
//       // Animate cards
//       cardRefs.current.forEach((ref, i) => {
//         if (ref) {
//           gsap.set(ref, { opacity: 0, y: 80 });
//           gsap.to(ref, {
//             opacity: 1,
//             y: 0,
//             duration: 1.1,
//             delay: 0.2 + i * 0.13,
//             ease: "power3.out",
//           });
//         }
//       });
//     };

//     if (containerRef.current) {
//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: "top 80%",
//         onEnter: runAnimation,
//         onEnterBack: runAnimation,
//       });
//       // Manual trigger event support
//       const handleAnimationTrigger = (event) => {
//         if (event.detail?.sectionName === "opportunities") {
//           setTimeout(() => {
//             runAnimation();
//           }, 100);
//         }
//       };
//       window.addEventListener("triggerSectionAnimation", handleAnimationTrigger);
//       ScrollTrigger.refresh();
//       return () => {
//         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//         window.removeEventListener("triggerSectionAnimation", handleAnimationTrigger);
//       };
//     }
//   }, []);

//   // Logo hover handlers (copied from StudentApp)
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

//   return (
//     <div ref={containerRef} id="opportunities-section" className="min-h-screen bg-gradient-to-bl to-[#b8001f] from-[#7a0015] text-white relative overflow-hidden">
//       {/* ST Logo at Top - hover to show buttons */}
//       <div className="absolute top-6 md:top-8 left-1/2 transform -translate-x-1/2 z-20">
//         <div
//           className="logo-container group inline-block cursor-pointer relative mb-8"
//           onMouseEnter={handleLogoOrButtonsMouseEnter}
//           onMouseLeave={handleLogoOrButtonsMouseLeave}
//         >
//           <img
//             ref={logoRef}
//             src={stlogo}
//             alt="Student Tribe Logo"
//             className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
//           />
//           {/* Buttons appear below logo on hover */}
//           <div
//             className={`absolute left-1/2 -translate-x-1/2 w-[400px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
//               showButtons ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//             }`}
//             style={{
//               top: "calc(100% + 8px)",
//             }}
//           >
//             <button
//               className="flex-1 py-3 md:py-4 text-center rounded-full transition-all duration-300 bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white border-none cursor-pointer text-base md:text-lg hover:scale-105"
//               onClick={() => navigate("/")}
//             >
//               Students
//             </button>
//             <button
//               className="flex-1 py-3 md:py-4 text-center rounded-full transition-all duration-300 bg-transparent text-gray-300 border-none cursor-pointer text-base md:text-lg hover:bg-[#b8001f] hover:text-white hover:scale-105"
//               onClick={() => navigate("/brands")}
//             >
//               Brands
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Grid with shifting */}
//       <div
//         className="flex items-center justify-center min-h-screen px-4 md:px-8 transition-transform duration-500"
//         style={{
//           transform: showButtons ? "translateY(80px)" : "translateY(0)",
//         }}
//       >
//         {/* Mobile Layout */}
//         <div className="lg:hidden w-full max-w-md mx-auto">
//           {/* Title */}

//           {/* Mobile Grid - 2x2 */}
//           <div className="grid grid-cols-1 gap-4 mb-6">
//             {/* INTERNSHIPS Card */}
//             <div ref={el => cardRefs.current[0] = el} className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
//               <img
//                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
//                 alt="Internships"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/30"></div>
//               <div className="absolute bottom-4 left-4">
//                 <h3 className="text-white text-xl font-bold">INTERNSHIPS</h3>
//               </div>
//             </div>

//             {/* JOB OPENINGS Card */}
//             <div ref={el => cardRefs.current[1] = el} className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
//               <img
//                 src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
//                 alt="Job Openings"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/20"></div>
//               <div className="absolute bottom-4 left-4">
//                 <h3 className="text-white text-xl font-bold">JOB OPENINGS</h3>
//               </div>
//             </div>

//             {/* VOLUNTEER WORKS Card */}
//             <div ref={el => cardRefs.current[2] = el} className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
//               <img
//                 src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80"
//                 alt="Volunteer Works"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/30"></div>
//               <div className="absolute bottom-4 left-4">
//                 <h3 className="text-white text-xl font-bold">
//                   VOLUNTEER WORKS
//                 </h3>
//               </div>
//             </div>

//             {/* Testimonial Card */}
//             <div ref={el => cardRefs.current[3] = el} className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6">
//               <div className="flex items-center mb-4">
//                 <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
//                   <img
//                     src="https://images.unsplash.com/photo-1494790108755-2616b612b390?auto=format&fit=crop&w=100&q=80"
//                     alt="Dharma"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h4 className="text-white text-base font-medium">Dharma</h4>
//               </div>
//               <div className="relative">
//                 <span className="text-3xl text-white/30 absolute -top-1 -left-1">
//                   "
//                 </span>
//                 <p className="text-white text-sm leading-relaxed ml-3">
//                   Find it all here — workshops, internships, and job openings
//                   that kick-start your career.
//                 </p>
//                 <span className="text-3xl text-white/30 absolute -bottom-3 -right-1">
//                   "
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Desktop Layout */}
//         <div
//           className="hidden lg:grid grid-cols-3 gap-6 max-w-7xl w-full"
//           style={{ height: "500px" }}
//         >
//           {/* Left Column */}
//           <div className="flex flex-col gap-6">
//             {/* Top Left Card - INTERNSHIPS */}
//             <div ref={el => cardRefs.current[4] = el} className="relative flex-1 rounded-2xl overflow-hidden shadow-lg">
//               <img
//                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
//                 alt="Internships"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/20"></div>
//               <div className="absolute bottom-6 left-6">
//                 <h3 className="text-white text-2xl font-bold">INTERNSHIPS</h3>
//               </div>
//             </div>

//             {/* Bottom Left Card - Description */}
//             <div ref={el => cardRefs.current[5] = el} className="flex-1 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center">
//               <p className="text-white text-base leading-relaxed text-center">
//                 Find it all here — workshops, internships, and job openings that
//                 kick-start your career. Get real-world exposure, build skills,
//                 and land roles that turn effort into pride and recognition.
//               </p>
//             </div>
//           </div>

//           {/* Center Column - Tall Image */}
//           <div ref={el => cardRefs.current[6] = el} className="relative">
//             <div className="h-full rounded-2xl overflow-hidden shadow-lg">
//               <img
//                 src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
//                 alt="Center workplace"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/10"></div>
//               <div className="absolute bottom-6 left-6">
//                 <h3 className="text-white text-2xl font-bold">JOB OPENINGS</h3>
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//             <div className="flex flex-col gap-6">
//             {/* Top Right Card - Testimonial */}
//             <div ref={el => cardRefs.current[7] = el} className="flex-1 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center">
//               <div className="flex items-center mb-4">
//                 <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
//                   <img
//                     src="https://images.unsplash.com/photo-1494790108755-2616b612b390?auto=format&fit=crop&w=100&q=80"
//                     alt="Dharma"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h4 className="text-white text-lg font-medium">Dharma</h4>
//               </div>
//               <div className="relative">
//                 <span className="text-4xl text-white/30 absolute -top-2 -left-1">
//                   "
//                 </span>
//                 <p className="text-white text-sm leading-relaxed ml-4">
//                   Find it all here — workshops, internships, and job openings
//                   that kick-start your career.
//                 </p>
//                 <span className="text-4xl text-white/30 absolute -bottom-4 -right-1">
//                   "
//                 </span>
//               </div>
//             </div>

//             {/* Bottom Right Card - VOLUNTEER WORKS */}
//             <div ref={el => cardRefs.current[8] = el} className="relative flex-1 rounded-2xl overflow-hidden shadow-lg">
//               <img
//                 src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80"
//                 alt="Volunteer Works"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/20"></div>
//               <div className="absolute bottom-6 left-6">
//                 <h3 className="text-white text-2xl font-bold">
//                   VOLUNTEER WORKS
//                 </h3>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default StOpportunities;

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stlogo from "../../assets/White logo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import banner from "../../assets/stApp/banner.svg";

gsap.registerPlugin(ScrollTrigger);

const StOpportunities = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hideButtonsTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Card refs for animation
  const cardRefs = useRef([]);
  const logoRef = useRef(null);

  // Desktop specific refs for complex animation
  const centerImageRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  // No floating background images, just gradient

  useEffect(() => {
    const runAnimation = () => {
      setIsVisible(true);

      // Create GSAP timeline for desktop animation
      const tl = gsap.timeline();

      // Animate logo first
      gsap.set(logoRef.current, { opacity: 0, y: -60 });
      gsap.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
      });

      // Check if we're on desktop (has the complex layout)
      if (window.innerWidth >= 1024) {
        // Desktop animation sequence

        // Set initial states
        gsap.set(
          [centerImageRef.current, leftImageRef.current, rightImageRef.current],
          {
            opacity: 0,
            scale: 0.8,
          }
        );
        gsap.set([leftTextRef.current, rightTextRef.current], {
          opacity: 0,
          scale: 0,
          transformOrigin: "center center",
        });

        // Initially set left and right image cards to span full height (same as center)
        gsap.set([leftImageRef.current, rightImageRef.current], {
          gridRow: "1 / span 2",
          height: "100%",
        });

        // Step 1: Show center image first
        tl.to(
          centerImageRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          0.3
        )

          // Step 2: Show left and right image cards at same height as center (no space for text cards yet)
          .to(
            [leftImageRef.current, rightImageRef.current],
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              stagger: 0.1,
            },
            0.8
          )

          // Step 3: Shrink image cards to half height to make space for text cards
          .to(
            [leftImageRef.current, rightImageRef.current],
            {
              duration: 0.6,
              ease: "power2.out",
              onComplete: function () {
                // Reset grid properties to allow text cards to appear
                gsap.set([leftImageRef.current, rightImageRef.current], {
                  gridRow: "1",
                  height: "auto",
                });
              },
            },
            1.8
          )
          .to(
            [leftTextRef.current, rightTextRef.current],
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              stagger: 0.1,
            },
            2.0
          );
      } else {
        // Mobile animation (simpler)
        cardRefs.current.forEach((ref, i) => {
          if (ref) {
            gsap.set(ref, { opacity: 0, y: 80 });
            gsap.to(ref, {
              opacity: 1,
              y: 0,
              duration: 1.1,
              delay: 0.2 + i * 0.13,
              ease: "power3.out",
            });
          }
        });
      }
    };

    if (containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: runAnimation,
        onEnterBack: runAnimation,
      });

      // Manual trigger event support
      const handleAnimationTrigger = (event) => {
        if (event.detail?.sectionName === "opportunities") {
          setTimeout(() => {
            runAnimation();
          }, 100);
        }
      };

      window.addEventListener(
        "triggerSectionAnimation",
        handleAnimationTrigger
      );
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        window.removeEventListener(
          "triggerSectionAnimation",
          handleAnimationTrigger
        );
      };
    }
  }, []);

  // Logo hover handlers (copied from StudentApp)
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

  // MainScreen radial gradient background
  const gradientBg = (
    <div
      className="mainscreen-gradient-bg"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        background:
          "radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%)",
      }}
    />
  );
  return (
    <div
      ref={containerRef}
      id="opportunities-section"
      className="w-full h-screen text-white relative overflow-hidden"
    >
      {gradientBg}
      /* Banner image top-right */
      <img
        src={banner}
        alt="ST Beast Banner"
        className="absolute top-0 right-8 md:top-0 md:right-8 lg:top-0 lg:right-4 w-[1px] md:w-[30px] lg:w-[50px] h-auto select-none pointer-events-none"
        style={{ minWidth: "20px" }}
        loading="eager"
      />
      {/* ST Logo at Top - hover to show buttons */}
      <div className="absolute top-6 md:top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div
          className="logo-container group inline-block cursor-pointer relative mb-8"
          onMouseEnter={handleLogoOrButtonsMouseEnter}
          onMouseLeave={handleLogoOrButtonsMouseLeave}
        >
          <img
            ref={logoRef}
            src={stlogo}
            alt="Student Tribe Logo"
            className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
          />
          {/* Buttons appear below logo on hover */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-[400px] h-[50px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
              showButtons
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            style={{
              top: "calc(100% + 8px)",
            }}
          >
            <button
              className="flex-1 py-3 md:py-4 text-center rounded-full transition-all duration-300 bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white border-none cursor-pointer text-base md:text-lg hover:scale-105"
              onClick={() => navigate("/")}
            >
              Students
            </button>
            <button
              className="flex-1 py-3 md:py-4 text-center rounded-full transition-all duration-300 bg-transparent text-gray-300 border-none cursor-pointer text-base md:text-lg hover:bg-[#b8001f] hover:text-white hover:scale-105"
              onClick={() => navigate("/brands")}
            >
              Brands
            </button>
          </div>
        </div>
      </div>
      {/* Main Content Grid with shifting */}
      <div
        className="flex items-center justify-center min-h-screen px-4 md:px-8 transition-transform duration-500"
        style={{
          transform: showButtons ? "translateY(80px)" : "translateY(0)",
        }}
      >
        {/* Mobile Layout */}
        <div className="lg:hidden w-full max-w-md mx-auto">
          {/* Mobile Grid - 2x2 */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* INTERNSHIPS Card */}
            <div
              ref={(el) => (cardRefs.current[0] = el)}
              className="relative h-48 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                alt="Internships"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl font-bold">INTERNSHIPS</h3>
              </div>
            </div>

            {/* JOB OPENINGS Card */}
            <div
              ref={(el) => (cardRefs.current[1] = el)}
              className="relative h-48 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
                alt="Job Openings"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl font-bold">JOB OPENINGS</h3>
              </div>
            </div>

            {/* VOLUNTEER WORKS Card */}
            <div
              ref={(el) => (cardRefs.current[2] = el)}
              className="relative h-48 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80"
                alt="Volunteer Works"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl font-bold">
                  VOLUNTEER WORKS
                </h3>
              </div>
            </div>

            {/* Testimonial Card */}
            <div
              ref={(el) => (cardRefs.current[3] = el)}
              className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b390?auto=format&fit=crop&w=100&q=80"
                    alt="Dharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-white text-base font-medium">Dharma</h4>
              </div>
              <div className="relative">
                <span className="text-3xl text-white/30 absolute -top-1 -left-1">
                  "
                </span>
                <p className="text-white text-sm leading-relaxed ml-3">
                  Find it all here — workshops, internships, and job openings
                  that kick-start your career.
                </p>
                <span className="text-3xl text-white/30 absolute -bottom-3 -right-1">
                  "
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div
          className="hidden lg:grid grid-cols-3 gap-6 max-w-7xl w-full"
          style={{ height: "500px" }}
        >
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Top Left Card - INTERNSHIPS */}
            <div
              ref={leftImageRef}
              className="relative flex-1 rounded-2xl overflow-hidden shadow-lg opacity-0"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                alt="Internships"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-bold">INTERNSHIPS</h3>
              </div>
            </div>

            {/* Bottom Left Card - Description */}
            <div
              ref={leftTextRef}
              className="flex-1 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center opacity-0"
            >
              <p className="text-white text-base leading-relaxed text-center">
                Find it all here — workshops, internships, and job openings that
                kick-start your career. Get real-world exposure, build skills,
                and land roles that turn effort into pride and recognition.
              </p>
            </div>
          </div>

          {/* Center Column - Tall Image */}
          <div ref={centerImageRef} className="relative opacity-0">
            <div className="h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
                alt="Center workplace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-bold">JOB OPENINGS</h3>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Top Right Card - Testimonial */}
            <div
              ref={rightTextRef}
              className="flex-1 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center opacity-0"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b390?auto=format&fit=crop&w=100&q=80"
                    alt="Dharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-white text-lg font-medium">Dharma</h4>
              </div>
              <div className="relative">
                <span className="text-4xl text-white/30 absolute -top-2 -left-1">
                  "
                </span>
                <p className="text-white text-sm leading-relaxed ml-4">
                  Find it all here — workshops, internships, and job openings
                  that kick-start your career.
                </p>
                <span className="text-4xl text-white/30 absolute -bottom-4 -right-1">
                  "
                </span>
              </div>
            </div>

            {/* Bottom Right Card - VOLUNTEER WORKS */}
            <div
              ref={rightImageRef}
              className="relative flex-1 rounded-2xl overflow-hidden shadow-lg opacity-0"
            >
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80"
                alt="Volunteer Works"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-bold">
                  VOLUNTEER WORKS
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StOpportunities;
