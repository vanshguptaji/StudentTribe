// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import banner from "../../assets/StEvent/banner.svg";
// import stlogo from "../../assets/Red logo.png";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// export default function STEvents() {
//   const navigate = useNavigate();
//   const [showButtons, setShowButtons] = useState(false);
//   const [hoveredButton, setHoveredButton] = useState('students');
//   const hideButtonsTimeoutRef = useRef(null);

//   // Refs for GSAP animations
//   const containerRef = useRef(null);
//   const mainSliderRef = useRef(null);
//   const bottomSliderRef = useRef(null);
//   const textContentRef = useRef(null);
//   const buttonsRef = useRef(null);
  
//   // Refs for continuous animation
//   const mainSliderInnerRef = useRef(null);
//   const bottomSliderInnerRef = useRef(null);
//   const animationRef = useRef(null);

//   // Sample images for the slider - using placeholder images that represent the content
//   const sliderImages = [
//     "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
//     "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
//   ];

//   // Create infinite loop by duplicating images (triple for seamless loop)
//   const infiniteImages = [...sliderImages, ...sliderImages, ...sliderImages];

//   // Continuous infinite scroll animation
//   useEffect(() => {
//     if (mainSliderInnerRef.current && bottomSliderInnerRef.current) {
//       // Calculate the width of one complete set of images
//       const imageWidth = window.innerWidth / sliderImages.length;
//       const totalSetWidth = imageWidth * sliderImages.length;
      
//       // Create continuous animation for main slider (left to right)
//       const mainTl = gsap.timeline({ repeat: -1 });
//       mainTl.fromTo(
//         mainSliderInnerRef.current,
//         { x: 0 },
//         {
//           x: -totalSetWidth,
//           duration: sliderImages.length * 3, // 3 seconds per image
//           ease: "none",
//         }
//       );

//       // Create continuous animation for bottom slider (right to left)
//       const bottomTl = gsap.timeline({ repeat: -1 });
//       bottomTl.fromTo(
//         bottomSliderInnerRef.current,
//         { x: -totalSetWidth },
//         {
//           x: 0,
//           duration: sliderImages.length * 3, // 3 seconds per image
//           ease: "none",
//         }
//       );

//       // Store animation references for cleanup
//       animationRef.current = { mainTl, bottomTl };

//       return () => {
//         if (animationRef.current) {
//           animationRef.current.mainTl.kill();
//           animationRef.current.bottomTl.kill();
//         }
//       };
//     }
//   }, [sliderImages.length]);

//   // GSAP Animation Timeline with entrance animations
//   useEffect(() => {
//     if (containerRef.current && mainSliderRef.current && bottomSliderRef.current && textContentRef.current && buttonsRef.current) {
//       // Set initial positions for entrance animation
//       gsap.set(mainSliderRef.current, { x: -window.innerWidth, opacity: 0 });
//       gsap.set(bottomSliderRef.current, { x: window.innerWidth, opacity: 0 });
//       gsap.set(textContentRef.current, { y: 50, opacity: 0 });
//       gsap.set(buttonsRef.current, { y: 50, opacity: 0 });

//       // Create entrance timeline that plays immediately
//       const entranceTl = gsap.timeline({ delay: 0.3 });
      
//       entranceTl
//         .to(textContentRef.current, {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           ease: "power3.out",
//         })
//         .to(
//           mainSliderRef.current,
//           {
//             x: 0,
//             opacity: 1,
//             duration: 1.2,
//             ease: "power3.out",
//           },
//           "-=0.5" // Start 0.5s before the previous animation ends
//         )
//         .to(
//           bottomSliderRef.current,
//           {
//             x: 0,
//             opacity: 1,
//             duration: 1.2,
//             ease: "power3.out",
//           },
//           "-=1" // Start at the same time as the top slider
//         )
//         .to(
//           buttonsRef.current,
//           {
//             y: 0,
//             opacity: 1,
//             duration: 0.8,
//             ease: "power3.out",
//           },
//           "-=0.3"
//         );

//       return () => {
//         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//       };
//     }
//   }, []);

//   // Hover handlers for logo/buttons
//   const handleLogoOrButtonsMouseEnter = () => {
//     // Clear any pending hide timeout
//     if (hideButtonsTimeoutRef.current) {
//       clearTimeout(hideButtonsTimeoutRef.current);
//       hideButtonsTimeoutRef.current = null;
//     }
//     setShowButtons(true);
//   };

//   const handleLogoOrButtonsMouseLeave = (e) => {
//     // Check if the mouse is leaving to go to a related element within the same container
//     const relatedTarget = e.relatedTarget;
//     const currentTarget = e.currentTarget;

//     // If there's no related target (mouse left the window) or the related target
//     // is not within our logo container, hide the buttons with a delay
//     if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
//       // Add a small delay before hiding to allow smooth movement to buttons
//       hideButtonsTimeoutRef.current = setTimeout(() => {
//         setShowButtons(false);
//       }, 300); // 300ms delay
//     }
//   };

//   // Button hover handlers
//   const handleButtonHover = (buttonType) => {
//     setHoveredButton(buttonType);
//   };

//   const handleButtonLeave = () => {
//     setHoveredButton(null);
//   };

//   // Scroll to section function (if needed)
//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="min-h-screen bg-rose-100 relative overflow-hidden"
//       id="events-section"
//     >
//       {/* Banner image top-right */}
//       {/* <img
//         src={banner}
//         alt="ST Beast Banner"
//         className="absolute top-0 right-4 md:top-0 md:right-4 lg:top-0 lg:right-4 w-[20px] md:w-[30px] lg:w-[56px] h-auto select-none pointer-events-none"
//         style={{ minWidth: "20px" }}
//         loading="eager"
//         onError={(e) => {
//           e.target.style.display = 'none';
//         }}
//       /> */}

//       {/* Main Content Container */}
//       <div className="w-full px-0 py-8">
//         {/* Header with Logo */}
//         <div className="text-center mb-8">
//           <div
//             className="logo-container group inline-block cursor-pointer relative"
//             onMouseEnter={handleLogoOrButtonsMouseEnter}
//             onMouseLeave={handleLogoOrButtonsMouseLeave}
//           >
//             {/* Replace manual logo with image logo */}
//             <img
//               src={stlogo}
//               alt="Student Tribe Logo"
//               className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
//               onError={(e) => {
//                 e.target.style.display = 'none';
//               }}
//             />
//             {/* Buttons appear below logo on hover */}
//             <div
//               className={`absolute left-1/2 -translate-x-1/2 w-[400px] h-[50px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
//                 showButtons
//                   ? "opacity-100 pointer-events-auto"
//                   : "opacity-0 pointer-events-none"
//               }`}
//               style={{
//                 top: "calc(100% + 8px)",
//               }}
//             >
//               <button
//                 className={`flex-1 py-4 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
//                   hoveredButton === 'students'
//                     ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
//                     : 'bg-transparent text-gray-300 hover:text-white'
//                 }`}
//                 onClick={() => scrollToSection("main-section")}
//                 onMouseEnter={() => handleButtonHover('students')}
//                 onMouseLeave={() => setHoveredButton('students')}
//               >
//                 Students
//               </button>
//               <button
//                 className={`flex-1 py-4 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
//                   hoveredButton === 'brands'
//                     ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
//                     : 'bg-transparent text-gray-300 hover:text-white'
//                 }`}
//                 onClick={() => navigate("/brands")}
//                 onMouseEnter={() => handleButtonHover('brands')}
//                 onMouseLeave={() => setHoveredButton('students')}
//               >
//                 Brands
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content with shifting */}
//         <div
//           className="transition-transform duration-500"
//           style={{
//             transform: showButtons ? "translateY(80px)" : "translateY(0)",
//           }}
//         >
//           {/* Main Heading */}
//           <div ref={textContentRef} className="text-center mb-12">
//             <h1 className="text-4xl md:text-54xl font-bold text-gray-900 mb-8">
//               Say Goodbye to FOMO. Step Into the Action.
//             </h1>
//             {/* Description Text */}
//             <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
//               Vibrant cultural fests, insightful workshops, creative jams —
//               discover experiences that are unforgettable and student-powered.
//             </p>
//           </div>

//           {/* Top Image Slider - Continuous scroll left to right */}
//           <div ref={mainSliderRef} className="relative mb-8 w-full overflow-hidden">
//             <div
//               ref={mainSliderInnerRef}
//               className="flex items-center space-x-2 sm:space-x-4 w-fit"
//             >
//               {infiniteImages.map((image, index) => (
//                 <div
//                   key={`top-infinite-${index}`}
//                   className="relative flex-shrink-0 flex justify-center"
//                   style={{ width: `calc(100vw / ${sliderImages.length})` }}
//                 >
//                   <img
//                     src={image}
//                     alt={`Event ${(index % sliderImages.length) + 1}`}
//                     className="w-48 h-32 sm:w-64 sm:h-48 lg:w-80 lg:h-60 rounded-lg object-cover opacity-80 hover:opacity-100 transition-all duration-300 mx-auto hover:scale-105 z-10"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div
//             ref={buttonsRef}
//             className="flex justify-center space-x-4 sm:space-x-6"
//           >
//             <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-8 sm:py-4 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base">
//               <span>Register now</span>
//               <ChevronRight className="w-5 h-5" />
//             </button>
//             <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-8 sm:py-4 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base">
//               <span>Host an Event</span>
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Bottom Image Slider - Continuous scroll right to left */}
//           <div
//             ref={bottomSliderRef}
//             className="mt-16 relative w-full overflow-hidden"
//           >
//             <div
//               ref={bottomSliderInnerRef}
//               className="flex items-center space-x-2 sm:space-x-4 w-fit"
//             >
//               {infiniteImages.map((image, index) => (
//                 <div
//                   key={`bottom-infinite-${index}`}
//                   className="relative flex-shrink-0 flex justify-center"
//                   style={{ width: `calc(100vw / ${sliderImages.length})` }}
//                 >
//                   <img
//                     src={image}
//                     alt={`Bottom event ${(index % sliderImages.length) + 1}`}
//                     className="w-48 h-32 sm:w-64 sm:h-48 lg:w-80 lg:h-60 rounded-lg object-cover opacity-80 hover:opacity-100 transition-all duration-300 mx-auto hover:scale-105 z-10"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/StEvent/banner.svg";
import stlogo from "../../assets/Red logo.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function STEvents() {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState('students');
  const hideButtonsTimeoutRef = useRef(null);

  // Refs for GSAP animations
  const containerRef = useRef(null);
  const mainSliderRef = useRef(null);
  const bottomSliderRef = useRef(null);
  const textContentRef = useRef(null);
  const buttonsRef = useRef(null);
  
  // Refs for continuous animation
  const mainSliderInnerRef = useRef(null);
  const bottomSliderInnerRef = useRef(null);
  const animationRef = useRef(null);

  // Sample images for the slider - using placeholder images that represent the content
  const sliderImages = [
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
  ];

  // Create infinite loop by duplicating images (triple for seamless loop)
  const infiniteImages = [...sliderImages, ...sliderImages, ...sliderImages];

  // Continuous infinite scroll animation
  useEffect(() => {
    if (mainSliderInnerRef.current && bottomSliderInnerRef.current) {
      // Calculate the width of one complete set of images
      const imageWidth = window.innerWidth / sliderImages.length;
      const totalSetWidth = imageWidth * sliderImages.length;
      
      // Create continuous animation for main slider (left to right)
      const mainTl = gsap.timeline({ repeat: -1 });
      mainTl.fromTo(
        mainSliderInnerRef.current,
        { x: 0 },
        {
          x: -totalSetWidth,
          duration: sliderImages.length * 3, // 3 seconds per image
          ease: "none",
        }
      );

      // Create continuous animation for bottom slider (right to left)
      const bottomTl = gsap.timeline({ repeat: -1 });
      bottomTl.fromTo(
        bottomSliderInnerRef.current,
        { x: -totalSetWidth },
        {
          x: 0,
          duration: sliderImages.length * 3, // 3 seconds per image
          ease: "none",
        }
      );

      // Store animation references for cleanup
      animationRef.current = { mainTl, bottomTl };

      return () => {
        if (animationRef.current) {
          animationRef.current.mainTl.kill();
          animationRef.current.bottomTl.kill();
        }
      };
    }
  }, [sliderImages.length]);

  // GSAP Animation Timeline with entrance animations
  useEffect(() => {
    if (containerRef.current && mainSliderRef.current && bottomSliderRef.current && textContentRef.current && buttonsRef.current) {
      // Set initial positions for entrance animation
      gsap.set(mainSliderRef.current, { x: -window.innerWidth, opacity: 0 });
      gsap.set(bottomSliderRef.current, { x: window.innerWidth, opacity: 0 });
      gsap.set(textContentRef.current, { y: 50, opacity: 0 });
      gsap.set(buttonsRef.current, { y: 50, opacity: 0 });

      // Create entrance timeline that plays immediately
      const entranceTl = gsap.timeline({ delay: 0.3 });
      
      entranceTl
        .to(textContentRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        })
        .to(
          mainSliderRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.5" // Start 0.5s before the previous animation ends
        )
        .to(
          bottomSliderRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=1" // Start at the same time as the top slider
        )
        .to(
          buttonsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        );

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
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

  // Button hover handlers
  const handleButtonHover = (buttonType) => {
    setHoveredButton(buttonType);
  };

  const handleButtonLeave = () => {
    setHoveredButton(null);
  };

  // Scroll to section function (if needed)
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-rose-100 relative overflow-hidden"
      id="events-section"
    >
      {/* Banner image top-right */}
      {/* <img
        src={banner}
        alt="ST Beast Banner"
        className="absolute top-0 right-4 md:top-0 md:right-4 lg:top-0 lg:right-4 w-[20px] md:w-[30px] lg:w-[56px] h-auto select-none pointer-events-none"
        style={{ minWidth: "20px" }}
        loading="eager"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      /> */}

      {/* Main Content Container */}
      <div className="w-full px-0 py-8">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div
            className="logo-container group inline-block cursor-pointer relative"
            onMouseEnter={handleLogoOrButtonsMouseEnter}
            onMouseLeave={handleLogoOrButtonsMouseLeave}
          >
            {/* Replace manual logo with image logo */}
            <img
              src={stlogo}
              alt="Student Tribe Logo"
              className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
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
                className={`flex-1 py-4 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
                  hoveredButton === 'students'
                    ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
                    : 'bg-transparent text-gray-300 hover:text-white'
                }`}
                onClick={() => scrollToSection("main-section")}
                onMouseEnter={() => handleButtonHover('students')}
                onMouseLeave={() => setHoveredButton('students')}
              >
                Students
              </button>
              <button
                className={`flex-1 py-4 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
                  hoveredButton === 'brands'
                    ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
                    : 'bg-transparent text-gray-300 hover:text-white'
                }`}
                onClick={() => navigate("/brands")}
                onMouseEnter={() => handleButtonHover('brands')}
                onMouseLeave={() => setHoveredButton('students')}
              >
                Brands
              </button>
            </div>
          </div>
        </div>

        {/* Main Content with shifting */}
        <div
          className="transition-transform duration-500"
          style={{
            transform: showButtons ? "translateY(80px)" : "translateY(0)",
          }}
        >
          {/* Main Heading */}
          <div ref={textContentRef} className="text-center mb-12">
            <h1 className="text-4xl md:text-54xl font-bold text-gray-900 mb-8">
              Say Goodbye to FOMO. Step Into the Action.
            </h1>
            {/* Description Text */}
            <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
              Vibrant cultural fests, insightful workshops, creative jams —
              discover experiences that are unforgettable and student-powered.
            </p>
          </div>

          {/* Top Image Slider - Continuous scroll left to right */}
          <div ref={mainSliderRef} className="relative mb-8 w-full overflow-hidden">
            <div
              ref={mainSliderInnerRef}
              className="flex items-center space-x-2 sm:space-x-4 w-fit"
            >
              {infiniteImages.map((image, index) => (
                <div
                  key={`top-infinite-${index}`}
                  className="relative flex-shrink-0 flex justify-center"
                  style={{ width: `calc(100vw / ${sliderImages.length})` }}
                >
                  <img
                    src={image}
                    alt={`Event ${(index % sliderImages.length) + 1}`}
                    className="w-48 h-32 sm:w-64 sm:h-48 lg:w-80 lg:h-60 rounded-lg object-cover opacity-80 hover:opacity-100 transition-all duration-300 mx-auto hover:scale-105 z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div
            ref={buttonsRef}
            className="flex justify-center space-x-4 sm:space-x-6"
          >
            <button className="bg-gradient-to-r from-[#b8001f] to-[#7a0015] hover:bg-red-700 text-white px-4 py-2 sm:px-8 sm:py-4 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base">
              <span>Register now</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="bg-gradient-to-r from-[#b8001f] to-[#7a0015] hover:bg-red-700 text-white px-4 py-2 sm:px-8 sm:py-4 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base">
              <span>Host an Event</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Image Slider - Continuous scroll right to left */}
          <div
            ref={bottomSliderRef}
            className="mt-16 relative w-full overflow-hidden"
          >
            <div
              ref={bottomSliderInnerRef}
              className="flex items-center space-x-2 sm:space-x-4 w-fit"
            >
              {infiniteImages.map((image, index) => (
                <div
                  key={`bottom-infinite-${index}`}
                  className="relative flex-shrink-0 flex justify-center"
                  style={{ width: `calc(100vw / ${sliderImages.length})` }}
                >
                  <img
                    src={image}
                    alt={`Bottom event ${(index % sliderImages.length) + 1}`}
                    className="w-48 h-32 sm:w-64 sm:h-48 lg:w-80 lg:h-60 rounded-lg object-cover opacity-80 hover:opacity-100 transition-all duration-300 mx-auto hover:scale-105 z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}