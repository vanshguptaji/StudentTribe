  // import React, { useState, useRef, useEffect } from "react";
  // import { useNavigate } from "react-router-dom";
  // import stlogo from "../../assets/White logo.png";
  // import { gsap } from "gsap";
  // import { ScrollTrigger } from "gsap/ScrollTrigger";
  // import banner from "../../assets/stApp/banner.svg";

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

  //   // Desktop specific refs for complex animation
  //   const centerImageRef = useRef(null);
  //   const leftImageRef = useRef(null);
  //   const rightImageRef = useRef(null);
  //   const leftTextRef = useRef(null);
  //   const rightTextRef = useRef(null);

  //   useEffect(() => {
  //     const runAnimation = () => {
  //       setIsVisible(true);

  //       // Animate logo first with smoother entrance
  //       gsap.set(logoRef.current, {
  //         opacity: 0,
  //         y: -50,
  //         scale: 0.9,
  //         force3D: true,
  //       });
  //       gsap.to(logoRef.current, {
  //         opacity: 1,
  //         y: 0,
  //         scale: 1,
  //         duration: 1.4,
  //         ease: "power3.out",
  //         clearProps: "transform",
  //       });

  //       // Check if we're on desktop (has the complex layout)
  //       if (window.innerWidth >= 1024) {
  //         // Desktop animation sequence matching the frames

  //         // Create GSAP timeline for precise control
  //         const tl = gsap.timeline();

  //         // Frame 1: Only center card visible (JOB OPENINGS)
  //         gsap.set(centerImageRef.current, {
  //           opacity: 0,
  //           scale: 0.85,
  //           y: 30,
  //           transformOrigin: "center center",
  //           force3D: true,
  //         });

  //         // Hide all other elements initially
  //         gsap.set(
  //           [
  //             leftImageRef.current,
  //             rightImageRef.current,
  //             leftTextRef.current,
  //             rightTextRef.current,
  //           ],
  //           {
  //             opacity: 0,
  //             scale: 1,
  //             force3D: true,
  //           }
  //         );

  //         gsap.set(leftImageRef.current, {
  //           x: "25%", // Start off-screen left
  //           y: 0, // Same vertical position as center card
  //           height: "600px", // Start with full height like center card
  //           transformOrigin: "center center",
  //         });

  //         gsap.set(rightImageRef.current, {
  //           x: "-75%", // Start off-screen right
  //           y: 0, // Same vertical position as center card (will move down later)
  //           height: "600px", // Start with full height like center card
  //           transformOrigin: "center center",
  //         });

  //         gsap.set(leftTextRef.current, {
  //           opacity: 0,
  //           x: "25%", // Start from left side
  //           y: "258px", // Position in bottom half
  //         });

  //         gsap.set(rightTextRef.current, {
  //           opacity: 0,
  //           x: "-75%", // Start from right side
  //           y: "458px", // Position at bottom
  //         });

  //         // Animation sequence
  //         tl
  //           // Frame 1 -> Frame 2: Center card appears
  //           .to(
  //             centerImageRef.current,
  //             {
  //               opacity: 1,
  //               scale: 1,
  //               y: 0,
  //               duration: 1.2,
  //               ease: "power3.out",
  //             },
  //             0.3
  //           )

  //           // Frame 2 -> Frame 3: Side cards slide in at FULL HEIGHT (same as center)
  //           .to(
  //             leftImageRef.current,
  //             {
  //               opacity: 1,
  //               scale: 1,
  //               x: 0,
  //               duration: 1.0,
  //               ease: "power2.out",
  //             },
  //             1.5
  //           )

  //           .to(
  //             rightImageRef.current,
  //             {
  //               opacity: 1,
  //               scale: 1,
  //               x: 0,
  //               duration: 1.0,
  //               ease: "power2.out",
  //             },
  //             1.5
  //           )

  //           // Frame 3 -> Frame 4: Side cards shrink to half height and reposition
  //           .to(
  //             leftImageRef.current,
  //             {
  //               height: "242px",
  //               y: 0, // Stay at top position
  //               duration: 0.8,
  //               ease: "power2.inOut",
  //             },
  //             2.8
  //           )

  //           .to(
  //             rightImageRef.current,
  //             {
  //               height: "242px",
  //               y: "350px", // Stay at top position
  //               duration: 0.8,
  //               ease: "power2.inOut",
  //             },
  //             2.8
  //           )

  //           // Text cards appear as side cards are resizing
  //           .to(
  //             leftTextRef.current,
  //             {
  //               opacity: 1,
  //               scale: 1,
  //               x: 0,
  //               y: "258px", // Position in bottom half
  //               duration: 0.8,
  //               ease: "power2.out",
  //             },
  //             3.0
  //           )

  //           .to(
  //             rightTextRef.current,
  //             {
  //               opacity: 1,
  //               scale: 1,
  //               x: 0,
  //               y: "458px", // Position at bottom
  //               duration: 0.8,
  //               ease: "power2.out",
  //             },
  //             3.0
  //           )

  //           // Final cleanup
  //           .set(
  //             [
  //               centerImageRef.current,
  //               leftImageRef.current,
  //               rightImageRef.current,
  //               leftTextRef.current,
  //               rightTextRef.current,
  //             ],
  //             {
  //               clearProps: "all",
  //             },
  //             4.0
  //           );
  //       } else {
  //         // Mobile animation with smoother transitions
  //         cardRefs.current.forEach((ref, i) => {
  //           if (ref) {
  //             gsap.set(ref, {
  //               opacity: 0,
  //               y: 60,
  //               scale: 0.95,
  //               rotationX: 10,
  //               transformOrigin: "center center",
  //               force3D: true,
  //             });
  //             gsap.to(ref, {
  //               opacity: 1,
  //               y: 0,
  //               scale: 1,
  //               rotationX: 0,
  //               duration: 1.4,
  //               delay: 0.3 + i * 0.15,
  //               ease: "power3.out",
  //               clearProps: "transform",
  //             });
  //           }
  //         });
  //       }
  //     };

  //     if (containerRef.current) {
  //       ScrollTrigger.create({
  //         trigger: containerRef.current,
  //         start: "top 80%",
  //         onEnter: runAnimation,
  //         onEnterBack: runAnimation,
  //         once: false, // Allow re-triggering
  //         refreshPriority: 1, // Higher priority for smooth scrolling
  //       });

  //       // Manual trigger event support
  //       const handleAnimationTrigger = (event) => {
  //         if (event.detail?.sectionName === "opportunities") {
  //           setTimeout(() => {
  //             runAnimation();
  //           }, 100);
  //         }
  //       };

  //       window.addEventListener(
  //         "triggerSectionAnimation",
  //         handleAnimationTrigger
  //       );
  //       ScrollTrigger.refresh();

  //       return () => {
  //         // Proper cleanup for smoother performance
  //         ScrollTrigger.getAll().forEach((trigger) => {
  //           trigger.kill();
  //         });
  //         gsap.killTweensOf([
  //           logoRef.current,
  //           centerImageRef.current,
  //           leftImageRef.current,
  //           rightImageRef.current,
  //           leftTextRef.current,
  //           rightTextRef.current,
  //           ...cardRefs.current,
  //         ]);
  //         window.removeEventListener(
  //           "triggerSectionAnimation",
  //           handleAnimationTrigger
  //         );
  //       };
  //     }
  //   }, []);

  //   // Logo hover handlers
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

  //   // MainScreen radial gradient background
  //   const gradientBg = (
  //     <div
  //       className="mainscreen-gradient-bg"
  //       style={{
  //         position: "absolute",
  //         inset: 0,
  //         zIndex: 0,
  //         width: "100vw",
  //         height: "100vh",
  //         pointerEvents: "none",
  //         background:
  //           "radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%)",
  //       }}
  //     />
  //   );

  //   return (
  //     <div
  //       ref={containerRef}
  //       className="w-full h-screen text-white relative overflow-hidden"
  //     >
  //       {gradientBg}

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
  //             className={`absolute left-1/2 -translate-x-1/2 w-[400px] h-[50px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-500 ease-out ${
  //               showButtons
  //                 ? "opacity-100 pointer-events-auto transform translate-y-0"
  //                 : "opacity-0 pointer-events-none transform translate-y-2"
  //             }`}
  //             style={{
  //               top: "calc(100% + 8px)",
  //             }}
  //           >
  //             <button
  //               className="flex-1 text-center rounded-full transition-all duration-400 ease-out bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white border-none cursor-pointer text-base md:text-lg hover:scale-105 hover:shadow-lg transform"
  //               onClick={() => navigate("/")}
  //             >
  //               Students
  //             </button>
  //             <button
  //               className="flex-1 text-center rounded-full transition-all duration-400 ease-out bg-transparent text-gray-300 border-none cursor-pointer text-base md:text-lg hover:bg-[#b8001f] hover:text-white hover:scale-105 hover:shadow-lg transform"
  //               onClick={() => navigate("/brands")}
  //             >
  //               Brands
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Main Content Grid with shifting */}
  //       <div
  //         className="flex items-center justify-center min-h-screen px-4 md:px-8 transition-all duration-700 ease-out"
  //         style={{
  //           transform: showButtons ? "translateY(80px)" : "translateY(0)",
  //         }}
  //       >
  //         {/* Mobile Layout */}
  //         <div className="lg:hidden w-full max-w-md mx-auto">
  //           <div className="grid grid-cols-1 gap-4 mb-6">
  //             {/* INTERNSHIPS Card */}
  //             <div
  //               ref={(el) => (cardRefs.current[0] = el)}
  //               className="relative h-48 rounded-2xl overflow-hidden shadow-lg"
  //             >
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
  //             <div
  //               ref={(el) => (cardRefs.current[1] = el)}
  //               className="relative h-48 rounded-2xl overflow-hidden shadow-lg"
  //             >
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
  //             <div
  //               ref={(el) => (cardRefs.current[2] = el)}
  //               className="relative h-48 rounded-2xl overflow-hidden shadow-lg"
  //             >
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
  //             <div
  //               ref={(el) => (cardRefs.current[3] = el)}
  //               className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6"
  //             >
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

  //         {/* Desktop Layout - Updated positioning for smooth animation */}
  //         <div
  //           className="hidden lg:block max-w-7xl w-full relative"
  //           style={{ height: "600px" }}
  //         >
  //           {/* Left Column Container */}
  //           <div className="absolute left-0 top-1/2 w-[calc(33.333%-24px)] h-full transform -translate-y-1/2">
  //             {/* Left Image Card - INTERNSHIPS */}
  //             <div
  //               ref={leftImageRef}
  //               className="relative rounded-2xl overflow-hidden shadow-lg"
  //               style={{ height: "242px" }}
  //             >
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

  //             {/* Left Text Card - Description */}
  //             <div
  //               ref={leftTextRef}
  //               className="absolute bottom-0 w-full bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center"
  //               style={{ height: "242px" }}
  //             >
  //               <p className="text-white text-base leading-relaxed text-center">
  //                 Find it all here — workshops, internships, and job openings that
  //                 kick-start your career. Get real-world exposure, build skills,
  //                 and land roles that turn effort into pride and recognition.
  //               </p>
  //             </div>
  //           </div>

  //           {/* Center Column - Tall Image - Perfectly Centered */}
  //           <div className="absolute left-1/2 top-1/2 w-[calc(33.333%-24px)] h-full transform -translate-x-1/2 -translate-y-1/2 z-10">
  //             <div
  //               ref={centerImageRef}
  //               className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl"
  //               style={{
  //                 transform: "translateZ(0)",
  //                 boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  //                 height: "600px",
  //               }}
  //             >
  //               <img
  //                 src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
  //                 alt="Center workplace"
  //                 className="w-full h-full object-cover"
  //                 style={{ objectPosition: "center" }}
  //               />
  //               <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
  //               <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
  //                 <h3 className="text-white text-3xl font-bold text-center">
  //                   JOB OPENINGS
  //                 </h3>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Right Column Container */}
  //           <div className="absolute right-0 top-0 w-[calc(33.333%-24px)] h-full">
  //             {/* Right Text Card - Testimonial - NOW AT BOTTOM */}
  //             <div
  //               ref={rightTextRef}
  //               className="absolute bottom-0 w-full bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center"
  //               style={{ height: "242px" }}
  //             >
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
  //             {/* Right Image Card - VOLUNTEER WORKS - NOW AT TOP */}
  //             <div
  //               ref={rightImageRef}
  //               className="w-full rounded-2xl overflow-hidden shadow-lg"
  //               style={{ height: "242px", marginBottom: "0px" }}
  //             >
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

  useEffect(() => {
    const runAnimation = () => {
      setIsVisible(true);

      // Animate logo first with smoother entrance
      gsap.set(logoRef.current, {
        opacity: 0,
        y: -50,
        scale: 0.9,
        force3D: true,
      });
      gsap.to(logoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
        clearProps: "transform",
      });

      // Check if we're on desktop (has the complex layout)
      if (window.innerWidth >= 1024) {
        // Desktop animation sequence matching the frames

        // Create GSAP timeline for precise control
        const tl = gsap.timeline();

        // Frame 1: Only center card visible (JOB OPENINGS)
        gsap.set(centerImageRef.current, {
          opacity: 0,
          scale: 0.85,
          y: 30,
          transformOrigin: "center center",
          force3D: true,
        });

        // Hide all other elements initially
        gsap.set(
          [
            leftImageRef.current,
            rightImageRef.current,
            leftTextRef.current,
            rightTextRef.current,
          ],
          {
            opacity: 0,
            scale: 1,
            force3D: true,
          }
        );

        gsap.set(leftImageRef.current, {
          x: "25%", // Start off-screen left
          y: 0, // Same vertical position as center card
          height: "600px", // Start with full height like center card
          transformOrigin: "center center",
        });

        gsap.set(rightImageRef.current, {
          x: "-75%", // Start off-screen right
          y: "-57%", // Same vertical position as center card (will move down later)
          height: "600px", // Start with full height like center card
          transformOrigin: "center center",
        });

        gsap.set(leftTextRef.current, {
          opacity: 0,
          x: "25%", // Start from left side
          y: "258px", // Position in bottom half
        });

        gsap.set(rightTextRef.current, {
          opacity: 0,
          x: "-75%", // Start from right side
          y: 0, // Position at top
        });

        // Animation sequence
        tl
          // Frame 1 -> Frame 2: Center card appears
          .to(
            centerImageRef.current,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
            },
            0.3
          )

          // Frame 2 -> Frame 3: Side cards slide in at FULL HEIGHT (same as center)
          .to(
            leftImageRef.current,
            {
              opacity: 1,
              scale: 1,
              x: 0,
              duration: 1.0,
              ease: "power2.out",
            },
            1.5
          )

          .to(
            rightImageRef.current,
            {
              opacity: 1,
              scale: 1,
              x: 0,
              duration: 1.0,
              ease: "power2.out",
            },
            1.5
          )

          // Frame 3 -> Frame 4: Side cards shrink to half height and reposition
          .to(
            leftImageRef.current,
            {
              height: "342px",
              y: 0, // Stay at top position
              duration: 0.8,
              ease: "power2.inOut",
            },
            2.8
          )

          .to(
            rightImageRef.current,
            {
              height: "242px", // Fixed height to match left side
              y: 0, // Move to bottom position (600px - 242px = 358px)
              duration: 0.8,
              ease: "power2.inOut",
            },
            2.8
          )

          // Text cards appear as side cards are resizing
          .to(
            leftTextRef.current,
            {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0, // Position in bottom half
              duration: 0.8,
              ease: "power2.out",
            },
            3.0
          )

          .to(
            rightTextRef.current,
            {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0, // Position at top
              duration: 0.8,
              ease: "power2.out",
            },
            3.0
          )

          // Final cleanup
          .set(
            [
              centerImageRef.current,
              leftImageRef.current,
              rightImageRef.current,
              leftTextRef.current,
              rightTextRef.current,
            ],
            {
              clearProps: "all",
            },
            4.0
          );
      } else {
        // Mobile animation with smoother transitions
        cardRefs.current.forEach((ref, i) => {
          if (ref) {
            gsap.set(ref, {
              opacity: 0,
              y: 60,
              scale: 0.95,
              rotationX: 10,
              transformOrigin: "center center",
              force3D: true,
            });
            gsap.to(ref, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: 1.4,
              delay: 0.3 + i * 0.15,
              ease: "power3.out",
              clearProps: "transform",
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
        once: false, // Allow re-triggering
        refreshPriority: 1, // Higher priority for smooth scrolling
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
        // Proper cleanup for smoother performance
        ScrollTrigger.getAll().forEach((trigger) => {
          trigger.kill();
        });
        gsap.killTweensOf([
          logoRef.current,
          centerImageRef.current,
          leftImageRef.current,
          rightImageRef.current,
          leftTextRef.current,
          rightTextRef.current,
          ...cardRefs.current,
        ]);
        window.removeEventListener(
          "triggerSectionAnimation",
          handleAnimationTrigger
        );
      };
    }
  }, []);

  // Logo hover handlers
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
      className="w-full h-full min-h-[700px] text-white relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%)",
      }}
    >
      {gradientBg}

      {/* ST Logo at Top - centered like StudentApp */}
      <div className="relative z-20 pt-8 md:pt-16 text-center">
        <div
          className="logo-container group inline-block cursor-pointer relative"
          onMouseEnter={handleLogoOrButtonsMouseEnter}
          onMouseLeave={handleLogoOrButtonsMouseLeave}
        >
          <img
            ref={logoRef}
            src={stlogo}
            alt="Student Tribe Logo"
            className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
          />

          {/* Buttons appear below logo on hover (matches StudentApp sizing) */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
              showButtons
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            style={{
              top: "calc(100% + 8px)",
            }}
          >
            <button
              className="flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm sm:text-lg hover:scale-105 py-2 px-4 bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
              onClick={() => navigate("/")}
            >
              Students
            </button>
            <button
              className="flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm sm:text-lg hover:scale-105 py-2 px-4 bg-transparent text-gray-300 hover:text-white"
              onClick={() => navigate("/brands")}
            >
              Brands
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid with shifting */}
      <div
        className="flex items-center justify-center min-h-screen px-4 md:px-8 transition-all duration-700 ease-out"
        style={{
          transform: showButtons ? "translateY(60px)" : "translateY(0)",
        }}
      >
        {/* Mobile Layout */}
        <div className="lg:hidden w-full max-w-md mx-auto">
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
                <span className="text-7xl md:text-6xl text-white/30 absolute -top-3 -left-2 leading-none select-none pointer-events-none">
                  “
                </span>
                <p className="text-white text-sm leading-relaxed ml-3">
                  Find it all here — workshops, internships, and job openings
                  that kick-start your career.
                </p>
                <span className="text-7xl md:text-6xl text-white/30 absolute -bottom-6 -right-2 leading-none select-none pointer-events-none">
                  ”
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Updated positioning for smooth animation */}
        <div
          className="hidden lg:block max-w-7xl w-full relative"
          style={{ height: "600px" }}
        >
          {/* Left Column Container */}
          <div className="absolute left-0 top-1/2 w-[calc(33.333%-24px)] h-full transform -translate-y-1/2">
            {/* Left Image Card - INTERNSHIPS */}
            <div
              ref={leftImageRef}
              className="relative rounded-2xl overflow-hidden shadow-lg h-[342px]"
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

            {/* Left Text Card - Description */}
            <div
              ref={leftTextRef}
              className="w-full bg-gray-900/80 backdrop-blur-sm rounded-2xl mt-4 p-6 flex items-center justify-center"
              style={{ height: "242px" }}
            >
              <p className="text-white text-xl leading-relaxed text-center">
                Find it all here — workshops, internships, and job openings that
                kick-start your career. Get real-world exposure, build skills,
                and land roles that turn effort into pride and recognition.
              </p>
            </div>
          </div>

          {/* Center Column - Tall Image - Perfectly Centered */}
          <div className="absolute left-1/2 top-1/2 w-[calc(33.333%-24px)] h-full transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              ref={centerImageRef}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl"
              style={{
                transform: "translateZ(0)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                height: "600px",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
                alt="Center workplace"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center" }}
              />
              <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-3xl font-bold text-center">
                  JOB OPENINGS
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column Container */}
          <div className="absolute right-0 top-1/2 w-[calc(33.333%-24px)] h-full transform -translate-y-1/2">
            {/* Right Text Card - Testimonial - NOW AT TOP */}
            <div
              ref={rightTextRef}
              className="top-0 w-full bg-gray-900/80 mb-4 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center"
              style={{ height: "342px" }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b390?auto=format&fit=crop&w=100&q=80"
                    alt="Dharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-white text-lg font-medium">Akshay</h4>
              </div>
              <div className="relative p-8">
                <span className="text-8xl text-white absolute top-3 left-3 leading-none select-none pointer-events-none">
                  “
                </span>
                <p className="text-white text-2xl leading-relaxed ml-4">
                  Find it all here — workshops, internships, and job openings
                  that kick-start your career.
                </p>
                <span className="text-8xl text-white absolute -bottom-8 right-10 leading-none select-none pointer-events-none">
                  ”
                </span>
              </div>
            </div>
            
            {/* Right Image Card - VOLUNTEER WORKS - NOW AT BOTTOM */}
            <div
              ref={rightImageRef}
              className="relative w-full rounded-2xl overflow-hidden shadow-lg"
              style={{ height: "252px" }}
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