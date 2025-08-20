// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import banner from "../../assets/stApp/banner.svg";
// import stlogo from "../../assets/White logo.png";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import robot from "../../assets/BrandsSection/image 269.svg";
// import iphone from "../../assets/BrandsSection/iPhone.svg";
// import quizImg from "../../assets/BrandsSection/center.svg";

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// export default function StudentApp() {
//   const navigate = useNavigate();
//   const [isVisible, setIsVisible] = useState(false);
//   const [showButtons, setShowButtons] = useState(false);
//   const [hoveredButton, setHoveredButton] = useState('students');
  
//   // Carousel states
//   const [quizIndex, setQuizIndex] = useState(0);
//   const [gigsIndex, setGigsIndex] = useState(0);
  
//   const hideButtonsTimeoutRef = useRef(null);
//   const containerRef = useRef(null);
//   const phoneRef = useRef(null);
//   const topLeftCardRef = useRef(null);
//   const topRightCardRef = useRef(null);
//   const bottomLeftCardRef = useRef(null);
//   const bottomRightCardRef = useRef(null);

//   // Refs for card backgrounds
//   const topLeftBgRef = useRef(null);
//   const topRightBgRef = useRef(null);
//   const bottomLeftBgRef = useRef(null);
//   const bottomRightBgRef = useRef(null);

//   // Refs for card content
//   const topLeftContentRef = useRef(null);
//   const topRightContentRef = useRef(null);
//   const bottomLeftContentRef = useRef(null);
//   const bottomRightContentRef = useRef(null);

//   // Image arrays
//   const quizImages = [quizImg, robot, quizImg, robot];
//   const gigsImages = [robot, quizImg, robot, quizImg];

//   // Auto slider for quiz images
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setQuizIndex(prev => (prev + 1) % quizImages.length);
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   // Auto slider for gigs images  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setGigsIndex(prev => (prev + 1) % gigsImages.length);
//     }, 2500);

//     return () => clearInterval(interval);
//   }, []);

//   // Simple Slider Component
//   const AutoSlider = ({ images, currentIndex, className }) => (
//     <div className={`relative overflow-hidden ${className}`}>
//       <div 
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`Slide ${index}`}
//             className="min-w-full h-full object-cover flex-shrink-0"
//           />
//         ))}
//       </div>
//     </div>
//   );

//   useEffect(() => {
//     const runAnimation = () => {
//       setIsVisible(true);

//       // Create GSAP timeline for simultaneous animations
//       const tl = gsap.timeline();

//       // Set initial states
//       gsap.set([phoneRef.current], { opacity: 0, y: 200 });
//       gsap.set(
//         [
//           topLeftCardRef.current,
//           topRightCardRef.current,
//           bottomLeftCardRef.current,
//           bottomRightCardRef.current,
//         ],
//         { opacity: 0 }
//       );

//       // Set initial scale for card backgrounds
//       gsap.set(
//         [
//           topLeftBgRef.current,
//           topRightBgRef.current,
//           bottomLeftBgRef.current,
//           bottomRightBgRef.current,
//         ],
//         {
//           scale: 0,
//           transformOrigin: "center center",
//         }
//       );

//       // Set initial positions for card content
//       gsap.set(topLeftContentRef.current, { x: -200, y: -100, opacity: 0 });
//       gsap.set(topRightContentRef.current, { x: 200, y: -100, opacity: 0 });
//       gsap.set(bottomLeftContentRef.current, { x: -200, y: 100, opacity: 0 });
//       gsap.set(bottomRightContentRef.current, { x: 200, y: 100, opacity: 0 });

//       // Start animations simultaneously
//       tl.to(
//         [
//           topLeftCardRef.current,
//           topRightCardRef.current,
//           bottomLeftCardRef.current,
//           bottomRightCardRef.current,
//         ],
//         {
//           opacity: 1,
//           duration: 0.1,
//         }
//       )
//         .to(
//           [
//             topLeftBgRef.current,
//             topRightBgRef.current,
//             bottomLeftBgRef.current,
//             bottomRightBgRef.current,
//           ],
//           {
//             scale: 1,
//             duration: 0.8,
//             ease: "back.out(1.7)",
//             stagger: 0.1,
//           },
//           0
//         )
//         .to(
//           phoneRef.current,
//           {
//             opacity: 1,
//             y: 0,
//             duration: 1.2,
//             ease: "power3.out",
//           },
//           0.2
//         )
//         .to(
//           [
//             topLeftContentRef.current,
//             topRightContentRef.current,
//             bottomLeftContentRef.current,
//             bottomRightContentRef.current,
//           ],
//           {
//             opacity: 1,
//             x: 0,
//             y: 0,
//             duration: 1.0,
//             ease: "power3.out",
//             stagger: 0.1,
//           },
//           0.3
//         );
//     };

//     if (containerRef.current) {
//       // Set initial states
//       gsap.set([phoneRef.current], { opacity: 0, y: 200 });
//       gsap.set(
//         [
//           topLeftCardRef.current,
//           topRightCardRef.current,
//           bottomLeftCardRef.current,
//           bottomRightCardRef.current,
//         ],
//         { opacity: 0 }
//       );
//       gsap.set(
//         [
//           topLeftBgRef.current,
//           topRightBgRef.current,
//           bottomLeftBgRef.current,
//           bottomRightBgRef.current,
//         ],
//         { scale: 0 }
//       );
//       gsap.set(
//         [
//           topLeftContentRef.current,
//           topRightContentRef.current,
//           bottomLeftContentRef.current,
//           bottomRightContentRef.current,
//         ],
//         { opacity: 0 }
//       );

//       // Create scroll trigger for student app section - improved to work for both scroll directions
//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: "top 80%",
//         end: "bottom 20%",
//         onEnter: runAnimation,
//         onEnterBack: runAnimation, // Also trigger when scrolling back up to this section
//       });

//       // Listen for manual animation triggers with improved handling
//       const handleAnimationTrigger = (event) => {
//         if (event.detail?.sectionName === "app") {
//           // Small delay to ensure the section is visible before starting animation
//           setTimeout(() => {
//             runAnimation();
//           }, 100);
//         }
//       };

//       window.addEventListener(
//         "triggerSectionAnimation",
//         handleAnimationTrigger
//       );

//       // Refresh ScrollTrigger to ensure accurate calculations
//       ScrollTrigger.refresh();

//       // Handle window resize to recalculate ScrollTrigger positions
//       const handleResize = () => {
//         ScrollTrigger.refresh();
//       };

//       window.addEventListener("resize", handleResize);

//       return () => {
//         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//         window.removeEventListener(
//           "triggerSectionAnimation",
//           handleAnimationTrigger
//         );
//         window.removeEventListener("resize", handleResize);
//         // Clean up timeout on unmount
//         if (hideButtonsTimeoutRef.current) {
//           clearTimeout(hideButtonsTimeoutRef.current);
//         }
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

//    // MainScreen radial gradient background
//   const gradientBg = (
//     <div className="mainscreen-gradient-bg" style={{
//       position: 'absolute',
//       inset: 0,
//       zIndex: 0,
//       width: '100vw',
//       height: '100vh',
//       pointerEvents: 'none',
//       background: 'radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%)',
//     }} />
//   );

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
//       }, 300);
//     }
//   };

//   // Button hover handlers
//   const handleButtonHover = (buttonType) => {
//     setHoveredButton(buttonType);
//   };

//   const handleButtonLeave = () => {
//     setHoveredButton('students');
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="h-[1500px] w-full overflow-hidden relative"
//       style={{
//       background: 'radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%)',
//     }} 
//     >
//       {/* Banner image top-right */}
//       <img
//         src={banner}
//         alt="ST Beast Banner"
//         className="absolute top-0 right-4 md:top-0 md:right-8 lg:top-0 lg:right-12 w-[20px] md:w-[30px] lg:w-[56px] h-auto select-none pointer-events-none"
//         style={{ minWidth: "20px" }}
//         loading="eager"
//       />
//       {/* Header */}
//       <div className="relative z-20 pt-16 text-center">
//         <div
//           className="logo-container group inline-block cursor-pointer relative"
//           onMouseEnter={handleLogoOrButtonsMouseEnter}
//           onMouseLeave={handleLogoOrButtonsMouseLeave}
//         >
//           {/* Replace manual logo with image logo */}
//           <img
//             src={stlogo}
//             alt="Student Tribe Logo"
//             className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
//           />
//           {/* Buttons appear below logo on hover */}
//           <div
//             className={`absolute left-1/2 -translate-x-1/2 w-[400px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
//               showButtons
//                 ? "opacity-100 pointer-events-auto"
//                 : "opacity-0 pointer-events-none"
//             }`}
//             style={{
//               top: "calc(100% + 8px)",
//             }}
//           >
//             <button
//               className={`flex-1 py-4 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
//                 hoveredButton === 'students'
//                   ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
//                   : 'bg-transparent text-gray-300 hover:text-white'
//               }`}
//               onClick={() => navigate("/")}
//               onMouseEnter={() => handleButtonHover('students')}
//               onMouseLeave={handleButtonLeave}
//             >
//               Students
//             </button>
//             <button
//               className={`flex-1 py-4 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
//                 hoveredButton === 'brands'
//                   ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
//                   : 'bg-transparent text-gray-300 hover:text-white'
//               }`}
//               onClick={() => navigate("/brands")}
//               onMouseEnter={() => handleButtonHover('brands')}
//               onMouseLeave={handleButtonLeave}
//             >
//               Brands
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         className="relative z-20 px-8 transition-transform duration-500"
//         style={{
//           transform: showButtons ? "translateY(80px)" : "translateY(0)",
//         }}
//       >
//         {/* Title */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
//             Where Fun Meets Learning and New
//             <br />
//             Connections
//           </h1>
//         </div>

//         {/* Mobile Grid Layout - 2x2 cards */}
//         <div className="lg:hidden max-w-md mx-auto grid grid-cols-2 gap-4 mb-8">
//           {/* Communities & Daily Quizzes */}
//           <div className="">
//             <div
//               className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 h-full flex flex-col border-2 border-white/40 shadow-lg min-h-[280px]"
//               style={{
//                 borderRadius: "16px",
//                 border: "2px solid rgba(255,255,255,0.34)",
//                 boxShadow:
//                   "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
//                 background: "rgba(44,27,27,0.92)",
//               }}
//             >
//               <div>
//                 <h3 className="text-white text-sm font-extrabold mb-3 text-center">
//                   Communities & Daily Quizzes
//                 </h3>
//                 <div className="w-full mb-3">
//                   <AutoSlider
//                     images={quizImages}
//                     currentIndex={quizIndex}
//                     className="w-full h-20 rounded-xl shadow-lg"
//                   />
//                 </div>
//                 <p className="text-white/90 text-xs text-center leading-relaxed">
//                   Be part of active student communities across India.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ST PRO Membership */}
//           <div className="">
//             <div
//               className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 h-full flex flex-col border-2 border-white/40 shadow-lg items-center justify-center min-h-[280px]"
//               style={{
//                 borderRadius: "16px",
//                 border: "2px solid rgba(255,255,255,0.34)",
//                 boxShadow:
//                   "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
//                 background: "rgba(44,27,27,0.92)",
//               }}
//             >
//               <div>
//                 <h3 className="text-white text-sm font-extrabold mb-3 text-center">
//                   ST PRO Membership
//                 </h3>
//                 <p className="text-white/90 text-xs text-center leading-relaxed">
//                   Exclusive opportunities, career events & priority invites –
//                   all for just{" "}
//                   <span className="font-extrabold">₹299/month</span>.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Your Dost AI */}
//           <div className="">
//             <div
//               className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 h-full flex flex-col border-2 border-white/40 shadow-lg min-h-[280px]"
//               style={{
//                 borderRadius: "16px",
//                 border: "2px solid rgba(255,255,255,0.34)",
//                 boxShadow:
//                   "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
//                 background: "rgba(44,27,27,0.92)",
//               }}
//             >
//               <div className="flex flex-col items-center justify-center h-full text-center">
//                 <div className="mb-3">
//                   <img
//                     src={robot}
//                     alt="Your Dost AI"
//                     className="w-16 h-16 object-contain mx-auto"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-white text-sm font-extrabold mb-2">
//                     Your Dost AI
//                   </h3>
//                   <p className="text-white/90 text-xs leading-relaxed">
//                     Your <span className="font-bold">AI buddy</span> for
//                     everything – from silly questions to serious career advice.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Gigs & Star Connects */}
//           <div className="">
//             <div
//               className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 h-full flex flex-col border-2 border-white/40 shadow-lg min-h-[280px]"
//               style={{
//                 borderRadius: "16px",
//                 border: "2px solid rgba(255,255,255,0.34)",
//                 boxShadow:
//                   "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
//                 background: "rgba(44,27,27,0.92)",
//               }}
//             >
//               <div>
//                 <h3 className="text-white text-sm font-extrabold mb-3 text-center">
//                   Gigs & Star Connects
//                 </h3>
//                 <div className="w-full mb-3">
//                   <AutoSlider
//                     images={gigsImages}
//                     currentIndex={gigsIndex}
//                     className="w-full h-20 rounded-xl shadow-lg"
//                   />
//                 </div>
//                 <p className="text-white/90 text-xs text-center leading-relaxed">
//                   Chill gigs, fun open mics, and star connects – vibe, showcase
//                   your talent.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Phone Mockup - Mobile After Cards */}
//         <div className="lg:hidden mb-16">
//           <div className="flex justify-center">
//             <img
//               src={iphone}
//               alt="iPhone Mockup"
//               className="w-[280px] h-auto drop-shadow-2xl"
//             />
//           </div>
//         </div>

//         {/* Desktop Grid Layout - 2 rows, 3 columns, phone spans 2 rows */}
//         <div className="hidden lg:grid max-w-7xl mx-auto grid-cols-3 grid-rows-2 gap-8 mb-16">
//           {/* Communities & Daily Quizzes */}
//           <div
//             ref={topLeftCardRef}
//             className="opacity-0 lg:opacity-0"
//             style={{ gridRow: "1", gridColumn: "1" }}
//           >
//             <div
//               ref={topLeftBgRef}
//               className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col border-2 border-white/40 shadow-lg"
//               style={{
//                 borderRadius: "16px",
//                 border: "2px solid rgba(255,255,255,0.34)",
//                 boxShadow:
//                   "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
//                 background: "rgba(44,27,27,0.92)",
//               }}
//             >
//               <div ref={topLeftContentRef}>
//                 <h3 className="text-white text-2xl font-extrabold mb-4 text-center">
//                   Communities & Daily Quizzes
//                 </h3>
//                 <div className="w-full mb-6">
//                   <AutoSlider
//                     images={quizImages}
//                     currentIndex={quizIndex}
//                     className="w-full h-48 rounded-2xl shadow-lg"
//                   />
//                 </div>
//                 <p className="text-white/90 text-lg text-center leading-relaxed">
//                   Be part of active student communities across India. Learn,
//                   laugh, and level up together.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Phone Mockup - spans 2 rows */}
//           <div
//             ref={phoneRef}
//             className="opacity-0"
//             style={{ gridRow: "1 / span 2", gridColumn: "2" }}
//           >
//             <div className="relative flex flex-col items-center justify-center h-full">
//               <img
//                 src={iphone}
//                 alt="iPhone Mockup"
//                 className="w-[320px] md:w-[370px] lg:w-[420px] h-auto drop-shadow-2xl z-10"
//               />
//               <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20"></div>
//             </div>
//           </div>

//           {/* ST PRO Membership */}
//           <div
//             ref={topRightCardRef}
//             className="opacity-0 lg:opacity-0"
//             style={{ gridRow: "1", gridColumn: "3" }}
//           >
//             <div
//               ref={topRightBgRef}
//               className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col border-2 border-white/40 shadow-lg items-center justify-center"
//               style={{
//                 borderRadius: "16px",
//                 border: "2px solid rgba(255,255,255,0.34)",
//                 boxShadow:
//                   "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
//                 background: "rgba(44,27,27,0.92)",
//               }}
//             >
//               <div ref={topRightContentRef}>
//                 <h3 className="text-white text-2xl font-extrabold mb-6 text-center">
//                   ST PRO Membership
//                 </h3>
//                 <p className="text-white/90 text-lg text-center leading-relaxed mb-2">
//                   Exclusive opportunities, career events, expert sessions
//                   <br />
//                   &amp; priority invites – all for just{" "}
//                   <span className="font-extrabold">₹299/month</span>.<br />
//                   Totally worth it, 1000% yes!
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Your Dost AI */}
//           <div
//             ref={bottomLeftCardRef}
//             className="opacity-0 lg:opacity-0"
//             style={{ gridRow: "2", gridColumn: "1" }}
//           >
//             <div
//               ref={bottomLeftBgRef}
//               className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col border-2 border-white/40 shadow-lg"
//               style={{
//                 borderRadius: "16px",
//                 border: "2px solid rgba(255,255,255,0.34)",
//                 boxShadow:
//                   "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
//                 background: "rgba(44,27,27,0.92)",
//               }}
//             >
//               <div
//                 ref={bottomLeftContentRef}
//                 className="flex flex-row items-center h-full gap-6"
//               >
//                 <div className="flex-shrink-0 flex items-center justify-center h-full">
//                   <img
//                     src={robot}
//                     alt="Your Dost AI"
//                     className="w-40 h-40 object-contain"
//                   />
//                 </div>
//                 <div className="flex flex-col justify-center h-full">
//                   <h3 className="text-white text-2xl font-extrabold mb-4">
//                     Your Dost AI
//                   </h3>
//                   <p className="text-white/90 text-lg leading-relaxed">
//                     Your <span className="font-bold">AI buddy</span> for
//                     everything – from silly questions to serious career advice,
//                     smarter than your group chat
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Gigs & Star Connects */}
//           <div
//             ref={bottomRightCardRef}
//             className="opacity-0 lg:opacity-0"
//             style={{ gridRow: "2", gridColumn: "3" }}
//           >
//             <div
//               ref={bottomRightBgRef}
//               className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col border-2 border-white/40 shadow-lg"
//               style={{
//                 borderRadius: "16px",
//                 border: "2px solid rgba(255,255,255,0.34)",
//                 boxShadow:
//                   "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
//                 background: "rgba(44,27,27,0.92)",
//               }}
//             >
//               <div ref={bottomRightContentRef}>
//                 <h3 className="text-white text-2xl font-extrabold mb-4 text-center">
//                   Gigs & Star Connects
//                 </h3>
//                 <div className="w-full mb-6">
//                   <AutoSlider
//                     images={gigsImages}
//                     currentIndex={gigsIndex}
//                     className="w-full h-48 rounded-2xl shadow-lg"
//                   />
//                 </div>
//                 <p className="text-white/90 text-lg text-center leading-relaxed">
//                   Chill gigs, fun open mics, and star connects – vibe, showcase
//                   your talent, and learn directly from the pros who inspire.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/stApp/banner.svg";
import stlogo from "../../assets/White logo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import robot from "../../assets/BrandsSection/image 269.svg";
import iphone from "../../assets/BrandsSection/iPhone.svg";
import quizImg from "../../assets/BrandsSection/center.svg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function StudentApp() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState('students');
  
  // Carousel states
  const [quizIndex, setQuizIndex] = useState(0);
  const [gigsIndex, setGigsIndex] = useState(0);
  
  const hideButtonsTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const topLeftCardRef = useRef(null);
  const topRightCardRef = useRef(null);
  const bottomLeftCardRef = useRef(null);
  const bottomRightCardRef = useRef(null);

  // Refs for card backgrounds
  const topLeftBgRef = useRef(null);
  const topRightBgRef = useRef(null);
  const bottomLeftBgRef = useRef(null);
  const bottomRightBgRef = useRef(null);

  // Refs for card content
  const topLeftContentRef = useRef(null);
  const topRightContentRef = useRef(null);
  const bottomLeftContentRef = useRef(null);
  const bottomRightContentRef = useRef(null);

  // Image arrays with corresponding text content
  const quizData = [
    { image: quizImg, text: "Join daily quiz challenges and compete with students nationwide" },
    { image: robot, text: "AI-powered learning modules tailored for your academic growth" },
    { image: quizImg, text: "Interactive community discussions on trending topics" },
    { image: robot, text: "Smart study recommendations based on your performance" }
  ];
  
  const gigsData = [
    { image: robot, text: "Showcase your talent at exclusive student events and competitions" },
    { image: quizImg, text: "Connect with industry professionals through networking sessions" },
    { image: robot, text: "Participate in creative challenges and win exciting prizes" },
    { image: quizImg, text: "Join open mic nights and express your creativity freely" }
  ];

  // Auto slider for quiz data with synchronized content
  useEffect(() => {
    const interval = setInterval(() => {
      setQuizIndex(prev => (prev + 1) % quizData.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  // Auto slider for gigs data with offset timing
  useEffect(() => {
    const interval = setInterval(() => {
      setGigsIndex(prev => (prev + 1) % gigsData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Cool Enhanced Carousel Component with advanced animations
  const AutoSlider = ({ data, currentIndex, className }) => (
    <div 
      className={`relative w-full ${className}`}
      data-carousel='{ "loadingClasses": "opacity-0" }'
    >
      <div className="carousel h-full">
        <div className="carousel-body h-full relative">
          {data.map((item, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === currentIndex - 1 || (currentIndex === 0 && index === data.length - 1);
            const isNext = index === currentIndex + 1 || (currentIndex === data.length - 1 && index === 0);
            
            return (
              <div 
                key={index}
                className={`carousel-slide absolute inset-0 transition-all duration-[2000ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isActive 
                    ? 'opacity-100 translate-x-0 scale-100 z-20' 
                    : isPrev 
                    ? 'opacity-70 -translate-x-full scale-95 z-10 blur-[2px]'
                    : isNext
                    ? 'opacity-70 translate-x-full scale-95 z-10 blur-[2px]'
                    : 'opacity-0 translate-x-full scale-90 z-0'
                }`}
                style={{
                  transform: `translateX(${
                    isActive ? '0%' : 
                    isPrev ? '-100%' : 
                    isNext ? '100%' : '100%'
                  }) scale(${
                    isActive ? '1' : '0.95'
                  }) rotateY(${
                    isActive ? '0deg' : 
                    isPrev ? '15deg' : 
                    isNext ? '-15deg' : '0deg'
                  })`,
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <div className="flex flex-col h-full justify-start relative overflow-hidden rounded-lg shadow-2xl">
                  {/* Enhanced Image section with parallax effect */}
                  <div className="w-full h-3/4 mb-2 relative overflow-hidden group">
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent transition-opacity duration-2000 ${
                        isActive ? 'opacity-0' : 'opacity-30'
                      }`}
                    />
                    <img
                      src={item.image}
                      alt={`Slide ${index + 1}`}
                      className={`w-full h-full object-cover rounded-lg transition-all duration-2000 ease-out ${
                        isActive ? 'scale-100 brightness-100' : 'scale-110 brightness-75'
                      }`}
                      draggable={false}
                      style={{
                        filter: isActive 
                          ? 'brightness(1) contrast(1) saturate(1)' 
                          : 'brightness(0.8) contrast(0.9) saturate(0.8)'
                      }}
                    />
                    
                    {/* Cool shimmer effect on active slide */}
                    {isActive && (
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                          animation: 'shimmer 3s ease-in-out infinite'
                        }}
                      />
                    )}
                    
                    {/* Vignette effect */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 pointer-events-none" />
                  </div>
                  
                  {/* Enhanced Text section with slide-up animation */}
                  <div className="w-full h-1/4 flex items-center justify-center px-2 relative overflow-hidden">
                    <p 
                      className={`text-white/90 text-xs lg:text-sm text-center leading-relaxed transition-all duration-2000 ease-out ${
                        isActive 
                          ? 'transform translate-y-0 opacity-100' 
                          : 'transform translate-y-4 opacity-70'
                      }`}
                      style={{
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        transform: isActive ? 'translateY(0px)' : 'translateY(16px)'
                      }}
                    >
                      {item.text}
                    </p>
                    
                    {/* Text background glow effect for active slide */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-lg" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Enhanced Carousel pagination with glow effects */}
      <div className="carousel-pagination absolute -bottom-4 end-0 start-0 flex justify-center gap-3">
        {data.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot rounded-full transition-all duration-700 cursor-pointer relative ${
              currentIndex === index 
                ? 'w-8 h-2 bg-white shadow-lg scale-110' 
                : 'w-2 h-2 bg-white/40 hover:bg-white/60 hover:scale-125'
            }`}
            style={{
              backdropFilter: 'blur(8px)',
              boxShadow: currentIndex === index 
                ? '0 4px 12px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.2)' 
                : '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {/* Active indicator glow ring */}
            {currentIndex === index && (
              <div 
                className="absolute inset-0 rounded-full bg-white/20 animate-pulse"
                style={{
                  transform: 'scale(1.5)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Add custom CSS animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotateZ(45deg); }
          100% { transform: translateX(200%) rotateZ(45deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1.5); }
          50% { opacity: 0.1; transform: scale(2); }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .carousel-slide {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );

  useEffect(() => {
    const runAnimation = () => {
      setIsVisible(true);

      // Create GSAP timeline for simultaneous animations with smoother easing
      const tl = gsap.timeline();

      // Set initial states
      gsap.set([phoneRef.current], { opacity: 0, y: 200 });
      gsap.set(
        [
          topLeftCardRef.current,
          topRightCardRef.current,
          bottomLeftCardRef.current,
          bottomRightCardRef.current,
        ],
        { opacity: 0 }
      );

      // Set initial scale for card backgrounds
      gsap.set(
        [
          topLeftBgRef.current,
          topRightBgRef.current,
          bottomLeftBgRef.current,
          bottomRightBgRef.current,
        ],
        {
          scale: 0,
          transformOrigin: "center center",
        }
      );

      // Set initial positions for card content
      gsap.set(topLeftContentRef.current, { x: -200, y: -100, opacity: 0 });
      gsap.set(topRightContentRef.current, { x: 200, y: -100, opacity: 0 });
      gsap.set(bottomLeftContentRef.current, { x: -200, y: 100, opacity: 0 });
      gsap.set(bottomRightContentRef.current, { x: 200, y: 100, opacity: 0 });

      // Start animations simultaneously with smoother easing
      tl.to(
        [
          topLeftCardRef.current,
          topRightCardRef.current,
          bottomLeftCardRef.current,
          bottomRightCardRef.current,
        ],
        {
          opacity: 1,
          duration: 0.2, // Slightly increased for smoother fade-in
        }
      )
        .to(
          [
            topLeftBgRef.current,
            topRightBgRef.current,
            bottomLeftBgRef.current,
            bottomRightBgRef.current,
          ],
          {
            scale: 1,
            duration: 1.2, // Increased from 0.8 for smoother animation
            ease: "power2.out", // Smoother easing than back.out
            stagger: 0.15, // Slightly increased stagger
          },
          0
        )
        .to(
          phoneRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.5, // Increased duration for smoother phone animation
            ease: "power2.out", // Smoother easing
          },
          0.3
        )
        .to(
          [
            topLeftContentRef.current,
            topRightContentRef.current,
            bottomLeftContentRef.current,
            bottomRightContentRef.current,
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.3, // Increased for smoother content animation
            ease: "power2.out", // Smoother easing
            stagger: 0.12, // Slightly adjusted stagger
          },
          0.4
        );
    };

    if (containerRef.current) {
      // Set initial states
      gsap.set([phoneRef.current], { opacity: 0, y: 200 });
      gsap.set(
        [
          topLeftCardRef.current,
          topRightCardRef.current,
          bottomLeftCardRef.current,
          bottomRightCardRef.current,
        ],
        { opacity: 0 }
      );
      gsap.set(
        [
          topLeftBgRef.current,
          topRightBgRef.current,
          bottomLeftBgRef.current,
          bottomRightBgRef.current,
        ],
        { scale: 0 }
      );
      gsap.set(
        [
          topLeftContentRef.current,
          topRightContentRef.current,
          bottomLeftContentRef.current,
          bottomRightContentRef.current,
        ],
        { opacity: 0 }
      );

      // Create scroll trigger for student app section - improved to work for both scroll directions
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: runAnimation,
        onEnterBack: runAnimation, // Also trigger when scrolling back up to this section
      });

      // Listen for manual animation triggers with improved handling
      const handleAnimationTrigger = (event) => {
        if (event.detail?.sectionName === "app") {
          // Small delay to ensure the section is visible before starting animation
          setTimeout(() => {
            runAnimation();
          }, 100);
        }
      };

      window.addEventListener(
        "triggerSectionAnimation",
        handleAnimationTrigger
      );

      // Refresh ScrollTrigger to ensure accurate calculations
      ScrollTrigger.refresh();

      // Handle window resize to recalculate ScrollTrigger positions
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        window.removeEventListener(
          "triggerSectionAnimation",
          handleAnimationTrigger
        );
        window.removeEventListener("resize", handleResize);
        // Clean up timeout on unmount
        if (hideButtonsTimeoutRef.current) {
          clearTimeout(hideButtonsTimeoutRef.current);
        }
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

   // MainScreen radial gradient background
  const gradientBg = (
    <div className="mainscreen-gradient-bg" style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      background: 'radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%)',
    }} />
  );

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

  return (
    <div
      ref={containerRef}
      className="h-[1500px] w-full overflow-hidden relative"
      style={{
      background: 'radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%)',
    }} 
    >
      {/* Banner image top-right */}
      {/* <img
        src={banner}
        alt="ST Beast Banner"
        className="absolute top-0 right-4 md:top-0 md:right-8 lg:top-0 lg:right-12 w-[20px] md:w-[30px] lg:w-[56px] h-auto select-none pointer-events-none"
        style={{ minWidth: "20px" }}
        loading="eager"
      /> */}
      {/* Header */}
      <div className="relative z-20 pt-16 text-center">
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
          />
          {/* Buttons appear below logo on hover */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-[400px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
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
              onClick={() => navigate("/")}
              onMouseEnter={() => handleButtonHover('students')}
              onMouseLeave={handleButtonLeave}
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
              onMouseLeave={handleButtonLeave}
            >
              Brands
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="relative z-20 px-8 transition-transform duration-500"
        style={{
          transform: showButtons ? "translateY(80px)" : "translateY(0)",
        }}
      >
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Where Fun Meets Learning and New
            <br />
            Connections
          </h1>
        </div>

        {/* Mobile Grid Layout - 2x2 cards */}
        <div className="lg:hidden max-w-md mx-auto grid grid-cols-2 gap-4 mb-8">
          {/* Communities & Daily Quizzes */}
          <div className="">
            <div
              className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 h-full flex flex-col border-2 border-white/40 shadow-lg min-h-[320px]" // Increased from min-h-[280px]
              style={{
                borderRadius: "16px",
                border: "2px solid rgba(255,255,255,0.34)",
                boxShadow:
                  "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                background: "rgba(44,27,27,0.92)",
              }}
            >
              <div>
                <h3 className="text-white text-sm font-extrabold mb-3 text-center">
                  Communities & Daily Quizzes
                </h3>
                <div className="w-full mb-3">
                  <AutoSlider
                    data={quizData}
                    currentIndex={quizIndex}
                    className="w-full h-32 rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ST PRO Membership */}
          <div className="">
            <div
              className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 h-full flex flex-col border-2 border-white/40 shadow-lg items-center justify-center min-h-[320px]" // Increased from min-h-[280px]
              style={{
                borderRadius: "16px",
                border: "2px solid rgba(255,255,255,0.34)",
                boxShadow:
                  "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                background: "rgba(44,27,27,0.92)",
              }}
            >
              <div>
                <h3 className="text-white text-sm font-extrabold mb-3 text-center">
                  ST PRO Membership
                </h3>
                <p className="text-white/90 text-xs text-center leading-relaxed">
                  Exclusive opportunities, career events & priority invites –
                  all for just{" "}
                  <span className="font-extrabold">₹299/month</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Your Dost AI */}
          <div className="">
            <div
              className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 h-full flex flex-col border-2 border-white/40 shadow-lg min-h-[320px]" // Increased from min-h-[280px]
              style={{
                borderRadius: "16px",
                border: "2px solid rgba(255,255,255,0.34)",
                boxShadow:
                  "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                background: "rgba(44,27,27,0.92)",
              }}
            >
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-3">
                  <img
                    src={robot}
                    alt="Your Dost AI"
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </div>
                <div>
                  <h3 className="text-white text-sm font-extrabold mb-2">
                    Your Dost AI
                  </h3>
                  <p className="text-white/90 text-xs leading-relaxed">
                    Your <span className="font-bold">AI buddy</span> for
                    everything – from silly questions to serious career advice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gigs & Star Connects */}
          <div className="">
            <div
              className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 h-full flex flex-col border-2 border-white/40 shadow-lg min-h-[320px]" // Increased from min-h-[280px]
              style={{
                borderRadius: "16px",
                border: "2px solid rgba(255,255,255,0.34)",
                boxShadow:
                  "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                background: "rgba(44,27,27,0.92)",
              }}
            >
              <div>
                <h3 className="text-white text-sm font-extrabold mb-3 text-center">
                  Gigs & Star Connects
                </h3>
                <div className="w-full mb-3">
                  <AutoSlider
                    data={gigsData}
                    currentIndex={gigsIndex}
                    className="w-full h-32 rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Mockup - Mobile After Cards */}
        <div className="lg:hidden mb-16">
          <div className="flex justify-center">
            <img
              src={iphone}
              alt="iPhone Mockup"
              className="w-[280px] h-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Desktop Grid Layout - 2 rows, 3 columns, phone spans 2 rows */}
        <div className="hidden lg:grid max-w-7xl mx-auto grid-cols-3 grid-rows-2 gap-8 mb-16">
          {/* Communities & Daily Quizzes */}
          <div
            ref={topLeftCardRef}
            className="opacity-0 lg:opacity-0"
            style={{ gridRow: "1", gridColumn: "1" }}
          >
            <div
              ref={topLeftBgRef}
              className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col border-2 border-white/40 shadow-lg"
              style={{
                borderRadius: "16px",
                border: "2px solid rgba(255,255,255,0.34)",
                boxShadow:
                  "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                background: "rgba(44,27,27,0.92)",
              }}
            >
              <div ref={topLeftContentRef}>
                <h3 className="text-white text-2xl font-extrabold mb-4 text-center">
                  Communities & Daily Quizzes
                </h3>
                <div className="w-full mb-6">
                  <AutoSlider
                    data={quizData}
                    currentIndex={quizIndex}
                    className="w-full h-72 rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Phone Mockup - spans 2 rows */}
          <div
            ref={phoneRef}
            className="opacity-0"
            style={{ gridRow: "1 / span 2", gridColumn: "2" }}
          >
            <div className="relative flex flex-col items-center justify-center h-full">
              <img
                src={iphone}
                alt="iPhone Mockup"
                className="w-[320px] md:w-[370px] lg:w-[420px] h-auto drop-shadow-2xl z-10"
              />
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20"></div>
            </div>
          </div>

          {/* ST PRO Membership */}
          <div
            ref={topRightCardRef}
            className="opacity-0 lg:opacity-0"
            style={{ gridRow: "1", gridColumn: "3" }}
          >
            <div
              ref={topRightBgRef}
              className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col border-2 border-white/40 shadow-lg items-center justify-center"
              style={{
                borderRadius: "16px",
                border: "2px solid rgba(255,255,255,0.34)",
                boxShadow:
                  "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                background: "rgba(44,27,27,0.92)",
              }}
            >
              <div ref={topRightContentRef}>
                <h3 className="text-white text-2xl font-extrabold mb-6 text-center">
                  ST PRO Membership
                </h3>
                <p className="text-white/90 text-lg text-center leading-relaxed mb-2">
                  Exclusive opportunities, career events, expert sessions
                  <br />
                  &amp; priority invites – all for just{" "}
                  <span className="font-extrabold">₹299/month</span>.<br />
                  Totally worth it, 1000% yes!
                </p>
              </div>
            </div>
          </div>

          {/* Your Dost AI */}
          <div
            ref={bottomLeftCardRef}
            className="opacity-0 lg:opacity-0"
            style={{ gridRow: "2", gridColumn: "1" }}
          >
            <div
              ref={bottomLeftBgRef}
              className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col border-2 border-white/40 shadow-lg"
              style={{
                borderRadius: "16px",
                border: "2px solid rgba(255,255,255,0.34)",
                boxShadow:
                  "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                background: "rgba(44,27,27,0.92)",
              }}
            >
              <div
                ref={bottomLeftContentRef}
                className="flex flex-row items-center h-full gap-6"
              >
                <div className="flex-shrink-0 flex items-center justify-center h-full">
                  <img
                    src={robot}
                    alt="Your Dost AI"
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center h-full">
                  <h3 className="text-white text-2xl font-extrabold mb-4">
                    Your Dost AI
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Your <span className="font-bold">AI buddy</span> for
                    everything – from silly questions to serious career advice,
                    smarter than your group chat
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gigs & Star Connects */}
          <div
            ref={bottomRightCardRef}
            className="opacity-0 lg:opacity-0"
            style={{ gridRow: "2", gridColumn: "3" }}
          >
            <div
              ref={bottomRightBgRef}
              className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col border-2 border-white/40 shadow-lg"
              style={{
                borderRadius: "16px",
                border: "2px solid rgba(255,255,255,0.34)",
                boxShadow:
                  "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                background: "rgba(44,27,27,0.92)",
              }}
            >
              <div ref={bottomRightContentRef}>
                <h3 className="text-white text-2xl font-extrabold mb-4 text-center">
                  Gigs & Star Connects
                </h3>
                <div className="w-full mb-6">
                  <AutoSlider
                    data={gigsData}
                    currentIndex={gigsIndex}
                    className="w-full h-72 rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}