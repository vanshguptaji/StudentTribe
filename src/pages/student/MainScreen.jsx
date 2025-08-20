// import React, { useRef, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import stlogo from "../../assets/White logo.png";

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// const randomPhotos = [
//   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
//   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
// ];

// // Fixed positions for images to match motivational words layout
// const imagePositions = [
//   // Top area images
//   { top: "10%", left: "25%", animationType: "vertical", direction: 1 },
//   { top: "15%", right: "20%", animationType: "horizontal", direction: 1 },
//   { top: "20%", left: "15%", animationType: "vertical", direction: -1 },
//   { top: "25%", right: "25%", animationType: "horizontal", direction: -1 },

//   // Middle area images
//   { top: "35%", left: "10%", animationType: "horizontal", direction: -1 },
//   { top: "40%", right: "15%", animationType: "horizontal", direction: 1 },
//   { top: "45%", left: "20%", animationType: "vertical", direction: 1 },
//   { top: "50%", right: "30%", animationType: "vertical", direction: -1 },

//   // Bottom area images
//   { bottom: "30%", left: "15%", animationType: "vertical", direction: 1 },
//   { bottom: "25%", right: "20%", animationType: "horizontal", direction: 1 },
//   { bottom: "20%", left: "25%", animationType: "horizontal", direction: -1 },
//   { bottom: "15%", right: "15%", animationType: "vertical", direction: -1 },
//   { bottom: "10%", left: "10%", animationType: "vertical", direction: 1 },
//   { bottom: "12%", right: "10%", animationType: "horizontal", direction: 1 },
//   { bottom: "18%", left: "30%", animationType: "vertical", direction: -1 },
//   { bottom: "22%", right: "25%", animationType: "horizontal", direction: -1 },
// ];

// function getFixedStyle(index) {
//   const position = imagePositions[index % imagePositions.length];
//   const size = 80; // Fixed size for all images

//   return {
//     position: "absolute",
//     ...position,
//     width: `${size}px`,
//     height: `${size}px`,
//     opacity: 0.18,
//     borderRadius: "0.5rem",
//     objectFit: "cover",
//     pointerEvents: "none",
//     zIndex: 1,
//     transform: "translate(-50%, -50%)",
//   };
// }

// const MainScreen = ({
//   onNavigateToSection,
//   splashCompleted = false,
//   startMainAnimation = false,
// }) => {
//   const navigate = useNavigate();
//   const logoRef = useRef(null);
//   const backgroundRef = useRef(null);
//   const descriptionRef = useRef(null);
//   const descriptionWordsRef = useRef([]);
//   const secondaryDescriptionRef = useRef(null);
//   const secondaryDescriptionWordsRef = useRef([]);
//   const backgroundImagesRef = useRef([]);
//   const containerRef = useRef(null);
//   const logoContainerRef = useRef(null);
//   const buttonsContainerRef = useRef(null);

//   // State for tracking which button is being hovered and animation status
//   const [hoveredButton, setHoveredButton] = useState("students");
//   const [animationStarted, setAnimationStarted] = useState(false);

//   // Check if we should start animation (either when splash starts fading or completes)
//   useEffect(() => {
//     if ((startMainAnimation || splashCompleted) && !animationStarted) {
//       setAnimationStarted(true);
//       // Start animation immediately when triggered
//       setTimeout(() => {
//         runAnimation();
//       }, 50); // Minimal delay just to ensure DOM is ready
//     }
//   }, [startMainAnimation, splashCompleted, animationStarted]);

//   // Always scroll to main-section on mount (reload)
//   useEffect(() => {
//     const el = document.getElementById("main-section");
//     if (el) {
//       el.scrollIntoView({ behavior: "auto" });
//     } else {
//       window.scrollTo({ top: 0, left: 0, behavior: "auto" });
//     }
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const handleBrandsClick = () => {
//     navigate("/brands");
//   };

//   // Handle button hover states
//   const handleButtonHover = (buttonType) => {
//     setHoveredButton(buttonType);
//   };

//   // Main animation function
//   const runAnimation = () => {
//     if (
//       logoRef.current &&
//       containerRef.current &&
//       buttonsContainerRef.current
//     ) {
//       // Set the main content container to be visible
//       const mainContentContainer = document.querySelector(
//         ".main-screen-content"
//       );
//       if (mainContentContainer) {
//         gsap.set(mainContentContainer, { opacity: 1 });
//       }

//       // Initially hide all elements for animation
//       gsap.set([backgroundRef.current], {
//         opacity: 0,
//       });

//       // Filter out null refs and set initial state for text animations
//       const validDescriptionRefs = descriptionWordsRef.current.filter(
//         (ref) => ref !== null && ref !== undefined
//       );
//       const validSecondaryRefs = secondaryDescriptionWordsRef.current.filter(
//         (ref) => ref !== null && ref !== undefined
//       );

//       if (validDescriptionRefs.length > 0) {
//         gsap.set(validDescriptionRefs, {
//           opacity: 0,
//           rotateX: 90,
//           transformOrigin: "left bottom",
//           display: "inline-block",
//         });
//       }

//       if (validSecondaryRefs.length > 0) {
//         gsap.set(validSecondaryRefs, {
//           opacity: 0,
//           rotateX: 90,
//           transformOrigin: "left bottom",
//           display: "inline-block",
//         });
//       }

//       // Initially hide buttons and position them above their final position
//       gsap.set(buttonsContainerRef.current, {
//         opacity: 0,
//         y: -100,
//       });

//       // Set logo initial state - center of screen, scaled up
//       gsap.set(logoRef.current, {
//         scale: 2,
//         x: 0,
//         y: window.innerHeight * 0.35, // Move down from top to center
//         opacity: 1,
//       });

//       // Make background images visible for animation
//       gsap.set(backgroundImagesRef.current.filter(Boolean), {
//         opacity: 0.18,
//       });

//       // Create timeline for sequence
//       const tl = gsap.timeline();
//       // Reduced delay - start logo animation almost immediately
//       tl.to({}, { duration: 0.2 }); // Reduced from 0.8s to 0.2s
//       // First animation: Logo moves from center to final position and scales down
//       tl.to(
//         logoRef.current,
//         {
//           duration: 1.2, // Slightly faster
//           scale: 1,
//           y: 0, // Move to final position (top)
//           ease: "power3.out",
//         },
//         "+=0"
//       )
//         .to(
//           backgroundRef.current,
//           {
//             duration: 0.6, // Faster background fade
//             opacity: 1,
//             ease: "power2.out",
//           },
//           "-=0.8" // Start earlier, more overlap
//         )
//         .to(
//           buttonsContainerRef.current,
//           {
//             duration: 0.6, // Faster button animation
//             opacity: 1,
//             y: 0,
//             ease: "back.out(1.2)",
//           },
//           "-=0.6" // Start earlier, more overlap
//         );

//       // Add text animations if refs are available - start sooner
//       if (validDescriptionRefs.length > 0) {
//         tl.to(
//           validDescriptionRefs,
//           {
//             opacity: 1,
//             rotateX: 0,
//             duration: 0.5,
//             ease: "back.out(1.7)",
//             stagger: 0.1, // Slightly faster stagger
//           },
//           "+=0.1"
//         ); // Reduced delay
//       }

//       if (validSecondaryRefs.length > 0) {
//         tl.to(
//           validSecondaryRefs,
//           {
//             opacity: 1,
//             rotateX: 0,
//             duration: 0.4,
//             ease: "back.out(1.7)",
//             stagger: 0.02, // Faster stagger
//           },
//           "-=1.2"
//         ); // Reduced delay
//       }

//       // Animate background images similar to motivational words
//       backgroundImagesRef.current.forEach((image, index) => {
//         if (image) {
//           const position = imagePositions[index % imagePositions.length];

//           if (position.animationType === "vertical") {
//             // Up/down animation
//             gsap.to(image, {
//               y: position.direction * 20,
//               duration: 3 + index * 0.2,
//               ease: "power2.inOut",
//               repeat: -1,
//               yoyo: true,
//               delay: 0.8, // Start much sooner, reduced from 1.5s
//             });
//           } else {
//             // Left/right animation
//             gsap.to(image, {
//               x: position.direction * 30,
//               duration: 4 + index * 0.3,
//               ease: "power2.inOut",
//               repeat: -1,
//               yoyo: true,
//               delay: 0.8, // Start much sooner, reduced from 1.5s
//             });
//           }
//         }
//       });
//     }
//   };

//   // Set initial hidden state for all elements
//   useEffect(() => {
//     // Initially hide all elements immediately when component mounts
//     const setInitialState = () => {
//       if (
//         logoRef.current &&
//         containerRef.current &&
//         buttonsContainerRef.current
//       ) {
//         // Hide all main elements initially
//         gsap.set(
//           [logoRef.current, backgroundRef.current, buttonsContainerRef.current],
//           {
//             opacity: 0,
//           }
//         );

//         // Hide all text elements initially
//         const allDescriptionRefs = [
//           ...descriptionWordsRef.current.filter(
//             (ref) => ref !== null && ref !== undefined
//           ),
//           ...secondaryDescriptionWordsRef.current.filter(
//             (ref) => ref !== null && ref !== undefined
//           ),
//         ];

//         if (allDescriptionRefs.length > 0) {
//           gsap.set(allDescriptionRefs, {
//             opacity: 0,
//           });
//         }

//         // Hide background images initially
//         gsap.set(backgroundImagesRef.current.filter(Boolean), {
//           opacity: 0,
//         });
//       }
//     };

//     // Set initial state immediately
//     setInitialState();

//     // Also set initial state after a small delay to catch any late-rendered elements
//     const timer = setTimeout(setInitialState, 50);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     // Only run ScrollTrigger and event listeners if animation has started
//     if (!animationStarted) return;

//     // Add a small delay to ensure all refs are populated
//     const timer = setTimeout(() => {
//       if (
//         logoRef.current &&
//         containerRef.current &&
//         buttonsContainerRef.current
//       ) {
//         // Create scroll trigger for main screen animation
//         ScrollTrigger.create({
//           trigger: containerRef.current,
//           start: "top 80%",
//           onEnter: runAnimation,
//         });

//         // Listen for manual animation triggers
//         const handleAnimationTrigger = (event) => {
//           if (event.detail?.sectionName === "main") {
//             runAnimation();
//           }
//         };

//         window.addEventListener(
//           "triggerSectionAnimation",
//           handleAnimationTrigger
//         );

//         return () => {
//           ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//           window.removeEventListener(
//             "triggerSectionAnimation",
//             handleAnimationTrigger
//           );
//           // Clean up timer
//           clearTimeout(timer);
//         };
//       }
//     }, 50); // Reduced delay

//     return () => {
//       if (timer) clearTimeout(timer);
//     };
//   }, [animationStarted]); // Dependency on animationStarted

//   return (
//     <>
//       <style>{`
//         /* MainScreen radial gradient background */
//         .mainscreen-gradient-bg {
//           position: absolute;
//           inset: 0;
//           z-index: 0;
//           width: 100vw;
//           height: 100vh;
//           pointer-events: none;
//           background: radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%);
//         }
//         /* Custom styles for 3-line layout */
//         .three-line-layout {
//           display: none;
//         }
        
//         .natural-layout {
//           display: block;
//         }
        
//         /* Show 3-line layout only for screens between 1024px and 2560px */
//         @media (min-width: 1024px) and (max-width: 2560px) {
//           .three-line-layout {
//             display: block;
//           }
//           .natural-layout {
//             display: none;
//           }
          
//           /* Ensure container has enough width for 3 lines */
//           .description-container {
//             max-width: 90vw !important;
//             width: 100% !important;
//           }
//         }

//         /* Mobile-first approach: Start with larger text for small screens */
//         .primary-text {
//           font-size: clamp(2.5rem, 8vw, 6rem);
//           line-height: 1.1;
//         }

//         .secondary-text {
//           font-size: clamp(1.5rem, 4vw, 2rem);
//           line-height: 1.3;
//         }

//         /* For medium screens (tablets) - slightly smaller */
//         @media (min-width: 768px) {
//           .primary-text {
//             font-size: clamp(2rem, 6vw, 5rem);
//           }
//           .secondary-text {
//             font-size: clamp(1.2rem, 3vw, 1.8rem);
//           }
//         }
//         /* Height-responsive adjustments - maintain bigger text on shorter screens */
//         @media (max-height: 800px) {
//           .text-container {
//             margin-top: 6rem !important;
//           }
//           .secondary-spacing {
//             margin-top: clamp(1rem, 4vh, 6rem) !important;
//           }
//           /* Keep text larger on short screens */
//           .primary-text {
//             font-size: clamp(2rem, 7vw, 5rem);
//           }
//           .secondary-text {
//             font-size: clamp(1.2rem, 3.5vw, 1.8rem);
//           }
//         }

//         @media (max-height: 600px) {
//           .text-container {
//             margin-top: 4rem !important;
//           }
//           .secondary-spacing {
//             margin-top: clamp(0.5rem, 2vh, 3rem) !important;
//           }
//           /* Still keep reasonable size on very short screens */
//           .primary-text {
//             font-size: clamp(1.8rem, 6vw, 4rem);
//           }
//           .secondary-text {
//             font-size: clamp(1.1rem, 3vw, 1.6rem);
//           }
//         }

//         @media (max-height: 500px) {
//           .text-container {
//             margin-top: 3rem !important;
//           }
//           .secondary-spacing {
//             margin-top: clamp(0.3rem, 1.5vh, 2rem) !important;
//           }
//           .primary-text {
//             font-size: clamp(1.5rem, 5vw, 3.5rem);
//           }
//           .secondary-text {
//             font-size: clamp(0.9rem, 2.5vw, 1.4rem);
//           }
//         }

//         /* For very small screens (phones in portrait), maximize text size */
//         @media (max-width: 480px) {
//           .primary-text {
//             font-size: clamp(2.3rem, 9vw, 4rem);
//             line-height: 1.05;
//           }
//           .secondary-text {
//             font-size: clamp(0.6rem, 4.5vw, 2rem);
//           }
//         }

//         /* Initially hide all content */
//         .main-screen-content {
//           opacity: 0;
//         }
//       `}</style>

//       <div
//         ref={containerRef}
//         className="relative w-screen h-screen flex items-center justify-center overflow-hidden"
//         id="main-section"
//       >
//         {/* Radial gradient background */}
//         <div className="mainscreen-gradient-bg" />
//         {/* Background images container */}
//         <div
//           ref={backgroundRef}
//           className="absolute inset-0 pointer-events-none z-0"
//         >
//           {randomPhotos.map((src, i) => (
//             <img
//               key={i}
//               ref={(el) => (backgroundImagesRef.current[i] = el)}
//               src={src}
//               alt="bg"
//               style={getFixedStyle(i)}
//               className="select-none"
//             />
//           ))}
//         </div>
//         {/* Main content */}
//         <div className="absolute top-0 z-10 mt-4 flex flex-col items-center w-full px-4 main-screen-content">
//           <div className="text-center">
//             <div
//               ref={(el) => {
//                 logoRef.current = el;
//                 logoContainerRef.current = el;
//               }}
//               className="logo-container absolute top-0 transform -translate-x-1/2 -translate-y-full z-30"
//             >
//               {/* Replace manual logo with image logo */}
//               <img
//                 src={stlogo}
//                 alt="Student Tribe Logo"
//                 className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4 flex mx-auto"
//               />
//               {/* Buttons appear below logo */}
//               <div
//                 ref={buttonsContainerRef}
//                 className=" w-[400px] h-[50px] max-w-[90vw] mt-8 flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 mb-8"
//               >
//                 <button
//                   className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
//                     hoveredButton === "students"
//                       ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
//                       : "bg-transparent text-gray-300 hover:text-white"
//                   }`}
//                   onClick={() => scrollToSection("main-section")}
//                   onMouseEnter={() => handleButtonHover("students")}
//                 >
//                   Students
//                 </button>
//                 <button
//                   className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
//                     hoveredButton === "brands"
//                       ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
//                       : "bg-transparent text-gray-300 hover:text-white"
//                   }`}
//                   onClick={() => navigate("/brands")}
//                   onMouseEnter={() => handleButtonHover("brands")}
//                 >
//                   Brands
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div
//             ref={descriptionRef}
//             className="description-container text-container text-white primary-text leading-relaxed font-extrabold text-center mt-32 drop-shadow-lg max-w-4xl px-4 transition-transform duration-300"
//             style={{
//               transform: "translateY(80px)",
//             }}
//           >
//             {(() => {
//               // The text to animate - split into three lines for screens 1024px-2560px
//               const text =
//                 "Be a part of India's largest and fastest growing student community.";
//               const words = text.split(" ");

//               return (
//                 <>
//                   {/* For screens between 1024px-2560px, display in exactly 3 lines */}
//                   <div className="three-line-layout">
//                     {/* Line 1: "Be a part of India's" (5 words) */}
//                     <div className="block">
//                       {words.slice(0, 5).map((word, i) => (
//                         <span
//                           key={`line1-${i}`}
//                           ref={(el) => (descriptionWordsRef.current[i] = el)}
//                           style={{ display: "inline-block", whiteSpace: "pre" }}
//                         >
//                           {word + " "}
//                         </span>
//                       ))}
//                     </div>
//                     {/* Line 2: "largest and fastest growing" (4 words) */}
//                     <div className="block">
//                       {words.slice(5, 9).map((word, i) => (
//                         <span
//                           key={`line2-${i}`}
//                           ref={(el) =>
//                             (descriptionWordsRef.current[i + 5] = el)
//                           }
//                           style={{ display: "inline-block", whiteSpace: "pre" }}
//                         >
//                           {word + " "}
//                         </span>
//                       ))}
//                     </div>
//                     {/* Line 3: "student community." (2 words) */}
//                     <div className="block">
//                       {words.slice(9).map((word, i) => (
//                         <span
//                           key={`line3-${i}`}
//                           ref={(el) =>
//                             (descriptionWordsRef.current[i + 9] = el)
//                           }
//                           style={{ display: "inline-block", whiteSpace: "pre" }}
//                         >
//                           {word + (i < words.slice(9).length - 1 ? " " : "")}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* For screens outside 1024px-2560px range, display with natural wrapping */}
//                   <div className="natural-layout">
//                     {words.map((word, i) => (
//                       <span
//                         key={`natural-${i}`}
//                         ref={(el) => {
//                           // Use different indices to avoid conflicts with the three-line layout
//                           if (el) descriptionWordsRef.current[i + 100] = el;
//                         }}
//                         style={{ display: "inline-block", whiteSpace: "pre" }}
//                       >
//                         {word + (i < words.length - 1 ? " " : "")}
//                       </span>
//                     ))}
//                   </div>
//                 </>
//               );
//             })()}
//           </div>

//           {/* Secondary description text */}
//           <div
//             ref={secondaryDescriptionRef}
//             className="text-white secondary-text text-center drop-shadow-lg max-w-3xl px-4 transition-transform duration-300 secondary-spacing"
//             style={{
//               transform: "translateY(80px)",
//               letterSpacing: "0.08em",
//               marginTop: "clamp(1.5rem, 8vh, 12rem)",
//             }}
//           >
//             {(() => {
//               // The secondary text to animate
//               const secondaryText =
//                 "From classrooms to career moves. We're the tribe that's with you all the way.";
//               const words = secondaryText.split(" ");
//               // For screens above 750px, split into two lines
//               return (
//                 <>
//                   <span className="hidden md:inline">
//                     {/* Line 1: From classrooms to career moves. */}
//                     <span className="block">
//                       {words.slice(0, 6).map((word, i) => (
//                         <span
//                           key={`sec1-${i}`}
//                           ref={(el) =>
//                             (secondaryDescriptionWordsRef.current[i] = el)
//                           }
//                           style={{ display: "inline-block", whiteSpace: "pre" }}
//                         >
//                           {word + " "}
//                         </span>
//                       ))}
//                     </span>
//                     {/* Line 2: We're the tribe that's with you all the way. */}
//                     <span className="block">
//                       {words.slice(6).map((word, i) => (
//                         <span
//                           key={`sec2-${i}`}
//                           ref={(el) =>
//                             (secondaryDescriptionWordsRef.current[i + 6] = el)
//                           }
//                           style={{ display: "inline-block", whiteSpace: "pre" }}
//                         >
//                           {word + (i < words.slice(6).length - 1 ? " " : "")}
//                         </span>
//                       ))}
//                     </span>
//                   </span>
//                   {/* For screens <= 750px, natural wrapping */}
//                   <span className="md:hidden">
//                     {words.map((word, i) => (
//                       <span
//                         key={`secn-${i}`}
//                         ref={(el) => {
//                           // Use different indices to avoid conflicts with the two-line layout
//                           if (el)
//                             secondaryDescriptionWordsRef.current[i + 100] = el;
//                         }}
//                         style={{ display: "inline-block", whiteSpace: "pre" }}
//                       >
//                         {word + (i < words.length - 1 ? " " : "")}
//                       </span>
//                     ))}
//                   </span>
//                 </>
//               );
//             })()}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MainScreen;




import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import stlogo from "../../assets/White logo.png";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const randomPhotos = [
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
];

// Fixed positions for images to match motivational words layout
const imagePositions = [
  // Top area images
  { top: "10%", left: "25%", animationType: "vertical", direction: 1 },
  { top: "15%", right: "20%", animationType: "horizontal", direction: 1 },
  { top: "20%", left: "15%", animationType: "vertical", direction: -1 },
  { top: "25%", right: "25%", animationType: "horizontal", direction: -1 },

  // Middle area images
  { top: "35%", left: "10%", animationType: "horizontal", direction: -1 },
  { top: "40%", right: "15%", animationType: "horizontal", direction: 1 },
  { top: "45%", left: "20%", animationType: "vertical", direction: 1 },
  { top: "50%", right: "30%", animationType: "vertical", direction: -1 },

  // Bottom area images
  { bottom: "30%", left: "15%", animationType: "vertical", direction: 1 },
  { bottom: "25%", right: "20%", animationType: "horizontal", direction: 1 },
  { bottom: "20%", left: "25%", animationType: "horizontal", direction: -1 },
  { bottom: "15%", right: "15%", animationType: "vertical", direction: -1 },
  { bottom: "10%", left: "10%", animationType: "vertical", direction: 1 },
  { bottom: "12%", right: "10%", animationType: "horizontal", direction: 1 },
  { bottom: "18%", left: "30%", animationType: "vertical", direction: -1 },
  { bottom: "22%", right: "25%", animationType: "horizontal", direction: -1 },
];

function getFixedStyle(index) {
  const position = imagePositions[index % imagePositions.length];
  const size = 80; // Fixed size for all images

  return {
    position: "absolute",
    ...position,
    width: `${size}px`,
    height: `${size}px`,
    opacity: 0.18,
    borderRadius: "0.5rem",
    objectFit: "cover",
    pointerEvents: "none",
    zIndex: 1,
    transform: "translate(-50%, -50%)",
  };
}

const MainScreen = ({
  onNavigateToSection,
  splashCompleted = false,
  startMainAnimation = false,
}) => {
  const navigate = useNavigate();
  const logoRef = useRef(null);
  const backgroundRef = useRef(null);
  const descriptionRef = useRef(null);
  const descriptionWordsRef = useRef([]);
  const secondaryDescriptionRef = useRef(null);
  const secondaryDescriptionWordsRef = useRef([]);
  const backgroundImagesRef = useRef([]);
  const containerRef = useRef(null);
  const logoContainerRef = useRef(null);
  const buttonsContainerRef = useRef(null);

  // State for tracking which button is being hovered and animation status
  const [hoveredButton, setHoveredButton] = useState("students");
  const [animationStarted, setAnimationStarted] = useState(false);

  // Check if we should start animation (either when splash starts fading or completes)
  useEffect(() => {
    if ((startMainAnimation || splashCompleted) && !animationStarted) {
      setAnimationStarted(true);
      // Start animation immediately when triggered
      setTimeout(() => {
        runAnimation();
      }, 50); // Minimal delay just to ensure DOM is ready
    }
  }, [startMainAnimation, splashCompleted, animationStarted]);

  // Always scroll to main-section on mount (reload)
  useEffect(() => {
    const el = document.getElementById("main-section");
    if (el) {
      el.scrollIntoView({ behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBrandsClick = () => {
    navigate("/brands");
  };

  // Handle button hover states
  const handleButtonHover = (buttonType) => {
    setHoveredButton(buttonType);
  };

  // Main animation function
  const runAnimation = () => {
    if (
      logoRef.current &&
      containerRef.current &&
      buttonsContainerRef.current
    ) {
      // Set the main content container to be visible
      const mainContentContainer = document.querySelector(
        ".main-screen-content"
      );
      if (mainContentContainer) {
        gsap.set(mainContentContainer, { opacity: 1 });
      }

      // Initially hide all elements for animation
      gsap.set([backgroundRef.current], {
        opacity: 0,
      });

      // Filter out null refs and set initial state for text animations
      const validDescriptionRefs = descriptionWordsRef.current.filter(
        (ref) => ref !== null && ref !== undefined
      );
      const validSecondaryRefs = secondaryDescriptionWordsRef.current.filter(
        (ref) => ref !== null && ref !== undefined
      );

      if (validDescriptionRefs.length > 0) {
        gsap.set(validDescriptionRefs, {
          opacity: 0,
          rotateX: 90,
          transformOrigin: "left bottom",
          display: "inline-block",
        });
      }

      if (validSecondaryRefs.length > 0) {
        gsap.set(validSecondaryRefs, {
          opacity: 0,
          rotateX: 90,
          transformOrigin: "left bottom",
          display: "inline-block",
        });
      }

      // Initially hide buttons and position them above their final position
      gsap.set(buttonsContainerRef.current, {
        opacity: 0,
        y: -100,
      });

      // Set logo initial state - center of screen, scaled up
      gsap.set(logoRef.current, {
        scale: 2,
        x: 0,
        y: window.innerHeight * 0.35, // Move down from top to center
        opacity: 1,
      });

      // Make background images visible for animation
      gsap.set(backgroundImagesRef.current.filter(Boolean), {
        opacity: 0.18,
      });

      // Create timeline for sequence
      const tl = gsap.timeline();
      // Reduced delay - start logo animation almost immediately
      tl.to({}, { duration: 0.2 }); // Reduced from 0.8s to 0.2s
      // First animation: Logo moves from center to final position and scales down
      tl.to(
        logoRef.current,
        {
          duration: 1.2, // Slightly faster
          scale: 1,
          y: 0, // Move to final position (top)
          ease: "power3.out",
        },
        "+=0"
      )
        .to(
          backgroundRef.current,
          {
            duration: 0.6, // Faster background fade
            opacity: 1,
            ease: "power2.out",
          },
          "-=0.8" // Start earlier, more overlap
        )
        .to(
          buttonsContainerRef.current,
          {
            duration: 0.6, // Faster button animation
            opacity: 1,
            y: 0,
            ease: "back.out(1.2)",
          },
          "-=0.6" // Start earlier, more overlap
        );

      // Add text animations if refs are available - start sooner
      if (validDescriptionRefs.length > 0) {
        tl.to(
          validDescriptionRefs,
          {
            opacity: 1,
            rotateX: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.1, // Slightly faster stagger
          },
          "+=0.1"
        ); // Reduced delay
      }

      if (validSecondaryRefs.length > 0) {
        tl.to(
          validSecondaryRefs,
          {
            opacity: 1,
            rotateX: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
            stagger: 0.02, // Faster stagger
          },
          "-=1.2"
        ); // Reduced delay
      }

      // Animate background images similar to motivational words
      backgroundImagesRef.current.forEach((image, index) => {
        if (image) {
          const position = imagePositions[index % imagePositions.length];

          if (position.animationType === "vertical") {
            // Up/down animation
            gsap.to(image, {
              y: position.direction * 20,
              duration: 3 + index * 0.2,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
              delay: 0.8, // Start much sooner, reduced from 1.5s
            });
          } else {
            // Left/right animation
            gsap.to(image, {
              x: position.direction * 30,
              duration: 4 + index * 0.3,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
              delay: 0.8, // Start much sooner, reduced from 1.5s
            });
          }
        }
      });
    }
  };

  // Set initial hidden state for all elements
  useEffect(() => {
    // Initially hide all elements immediately when component mounts
    const setInitialState = () => {
      if (
        logoRef.current &&
        containerRef.current &&
        buttonsContainerRef.current
      ) {
        // Hide all main elements initially
        gsap.set(
          [logoRef.current, backgroundRef.current, buttonsContainerRef.current],
          {
            opacity: 0,
          }
        );

        // Hide all text elements initially
        const allDescriptionRefs = [
          ...descriptionWordsRef.current.filter(
            (ref) => ref !== null && ref !== undefined
          ),
          ...secondaryDescriptionWordsRef.current.filter(
            (ref) => ref !== null && ref !== undefined
          ),
        ];

        if (allDescriptionRefs.length > 0) {
          gsap.set(allDescriptionRefs, {
            opacity: 0,
          });
        }

        // Hide background images initially
        gsap.set(backgroundImagesRef.current.filter(Boolean), {
          opacity: 0,
        });
      }
    };

    // Set initial state immediately
    setInitialState();

    // Also set initial state after a small delay to catch any late-rendered elements
    const timer = setTimeout(setInitialState, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only run ScrollTrigger and event listeners if animation has started
    if (!animationStarted) return;

    // Add a small delay to ensure all refs are populated
    const timer = setTimeout(() => {
      if (
        logoRef.current &&
        containerRef.current &&
        buttonsContainerRef.current
      ) {
        // Create scroll trigger for main screen animation
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          onEnter: runAnimation,
        });

        // Listen for manual animation triggers
        const handleAnimationTrigger = (event) => {
          if (event.detail?.sectionName === "main") {
            runAnimation();
          }
        };

        window.addEventListener(
          "triggerSectionAnimation",
          handleAnimationTrigger
        );

        return () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
          window.removeEventListener(
            "triggerSectionAnimation",
            handleAnimationTrigger
          );
          // Clean up timer
          clearTimeout(timer);
        };
      }
    }, 50); // Reduced delay

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [animationStarted]); // Dependency on animationStarted

  return (
    <>
      <style>{`
        /* MainScreen radial gradient background */
        .mainscreen-gradient-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          background: radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%);
        }
        
        /* Ensure the main container allows scrolling */
        .main-container {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          /* Removed overflow-hidden to allow scrolling */
          touch-action: pan-y; /* Allow vertical scrolling on touch devices */
          -webkit-overflow-scrolling: touch; /* Enable smooth scrolling on iOS */
        }
        
        /* Custom styles for 3-line layout */
        .three-line-layout {
          display: none;
        }
        
        .natural-layout {
          display: block;
        }
        
        /* Show 3-line layout only for screens between 1024px and 2560px */
        @media (min-width: 1024px) and (max-width: 2560px) {
          .three-line-layout {
            display: block;
          }
          .natural-layout {
            display: none;
          }
          
          /* Ensure container has enough width for 3 lines */
          .description-container {
            max-width: 90vw !important;
            width: 100% !important;
          }
        }

        /* Mobile-first approach: Start with larger text for small screens */
        .primary-text {
          font-size: clamp(2.5rem, 8vw, 6rem);
          line-height: 1.1;
        }

        .secondary-text {
          font-size: clamp(1.5rem, 4vw, 2rem);
          line-height: 1.3;
        }

        /* For medium screens (tablets) - slightly smaller */
        @media (min-width: 768px) {
          .primary-text {
            font-size: clamp(2rem, 6vw, 5rem);
          }
          .secondary-text {
            font-size: clamp(1.2rem, 3vw, 1.8rem);
          }
        }
        
        /* Height-responsive adjustments - maintain bigger text on shorter screens */
        @media (max-height: 800px) {
          .text-container {
            margin-top: 6rem !important;
          }
          .secondary-spacing {
            margin-top: clamp(1rem, 4vh, 6rem) !important;
          }
          /* Keep text larger on short screens */
          .primary-text {
            font-size: clamp(2rem, 7vw, 5rem);
          }
          .secondary-text {
            font-size: clamp(1.2rem, 3.5vw, 1.8rem);
          }
        }

        @media (max-height: 600px) {
          .text-container {
            margin-top: 4rem !important;
          }
          .secondary-spacing {
            margin-top: clamp(0.5rem, 2vh, 3rem) !important;
          }
          /* Still keep reasonable size on very short screens */
          .primary-text {
            font-size: clamp(1.8rem, 6vw, 4rem);
          }
          .secondary-text {
            font-size: clamp(1.1rem, 3vw, 1.6rem);
          }
        }

        @media (max-height: 500px) {
          .text-container {
            margin-top: 3rem !important;
          }
          .secondary-spacing {
            margin-top: clamp(0.3rem, 1.5vh, 2rem) !important;
          }
          .primary-text {
            font-size: clamp(1.5rem, 5vw, 3.5rem);
          }
          .secondary-text {
            font-size: clamp(0.9rem, 2.5vw, 1.4rem);
          }
        }

        /* For very small screens (phones in portrait), maximize text size */
        @media (max-width: 480px) {
          .primary-text {
            font-size: clamp(2.3rem, 9vw, 4rem);
            line-height: 1.05;
          }
          .secondary-text {
            font-size: clamp(0.6rem, 4.5vw, 2rem);
          }
        }

        /* Initially hide all content */
        .main-screen-content {
          opacity: 0;
        }
        
        /* Ensure content is scrollable and positioned correctly */
        .content-wrapper {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
      `}</style>

      <div
        ref={containerRef}
        className="main-container flex items-center justify-center"
        id="main-section"
      >
        {/* Radial gradient background */}
        <div className="mainscreen-gradient-bg" />
        
        {/* Background images container */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 pointer-events-none z-0"
        >
          {randomPhotos.map((src, i) => (
            <img
              key={i}
              ref={(el) => (backgroundImagesRef.current[i] = el)}
              src={src}
              alt="bg"
              style={getFixedStyle(i)}
              className="select-none"
            />
          ))}
        </div>
        
        {/* Main content wrapper */}
        <div className="content-wrapper main-screen-content">
          <div className="text-center w-full">
            <div
              ref={(el) => {
                logoRef.current = el;
                logoContainerRef.current = el;
              }}
              className="logo-container absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-30"
            >
              {/* Replace manual logo with image logo */}
              <img
                src={stlogo}
                alt="Student Tribe Logo"
                className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4 flex mx-auto"
              />
              {/* Buttons appear below logo */}
              <div
                ref={buttonsContainerRef}
                className="w-[400px] h-[50px] max-w-[90vw] mt-8 flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 mb-8"
              >
                <button
                  className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
                    hoveredButton === "students"
                      ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                      : "bg-transparent text-gray-300 hover:text-white"
                  }`}
                  onClick={() => scrollToSection("main-section")}
                  onMouseEnter={() => handleButtonHover("students")}
                >
                  Students
                </button>
                <button
                  className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
                    hoveredButton === "brands"
                      ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                      : "bg-transparent text-gray-300 hover:text-white"
                  }`}
                  onClick={() => navigate("/brands")}
                  onMouseEnter={() => handleButtonHover("brands")}
                >
                  Brands
                </button>
              </div>
            </div>
          </div>
          
          <div
            ref={descriptionRef}
            className="description-container text-container text-white primary-text leading-relaxed font-extrabold text-center mt-32 drop-shadow-lg max-w-4xl px-4 transition-transform duration-300"
            style={{
              transform: "translateY(80px)",
            }}
          >
            {(() => {
              // The text to animate - split into three lines for screens 1024px-2560px
              const text =
                "Be a part of India's largest and fastest growing student community.";
              const words = text.split(" ");

              return (
                <>
                  {/* For screens between 1024px-2560px, display in exactly 3 lines */}
                  <div className="three-line-layout">
                    {/* Line 1: "Be a part of India's" (5 words) */}
                    <div className="block">
                      {words.slice(0, 5).map((word, i) => (
                        <span
                          key={`line1-${i}`}
                          ref={(el) => (descriptionWordsRef.current[i] = el)}
                          style={{ display: "inline-block", whiteSpace: "pre" }}
                        >
                          {word + " "}
                        </span>
                      ))}
                    </div>
                    {/* Line 2: "largest and fastest growing" (4 words) */}
                    <div className="block">
                      {words.slice(5, 9).map((word, i) => (
                        <span
                          key={`line2-${i}`}
                          ref={(el) =>
                            (descriptionWordsRef.current[i + 5] = el)
                          }
                          style={{ display: "inline-block", whiteSpace: "pre" }}
                        >
                          {word + " "}
                        </span>
                      ))}
                    </div>
                    {/* Line 3: "student community." (2 words) */}
                    <div className="block">
                      {words.slice(9).map((word, i) => (
                        <span
                          key={`line3-${i}`}
                          ref={(el) =>
                            (descriptionWordsRef.current[i + 9] = el)
                          }
                          style={{ display: "inline-block", whiteSpace: "pre" }}
                        >
                          {word + (i < words.slice(9).length - 1 ? " " : "")}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* For screens outside 1024px-2560px range, display with natural wrapping */}
                  <div className="natural-layout">
                    {words.map((word, i) => (
                      <span
                        key={`natural-${i}`}
                        ref={(el) => {
                          // Use different indices to avoid conflicts with the three-line layout
                          if (el) descriptionWordsRef.current[i + 100] = el;
                        }}
                        style={{ display: "inline-block", whiteSpace: "pre" }}
                      >
                        {word + (i < words.length - 1 ? " " : "")}
                      </span>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>

          {/* Secondary description text */}
          <div
            ref={secondaryDescriptionRef}
            className="text-white secondary-text text-center drop-shadow-lg max-w-3xl px-4 transition-transform duration-300 secondary-spacing"
            style={{
              transform: "translateY(80px)",
              letterSpacing: "0.08em",
              marginTop: "clamp(1.5rem, 8vh, 12rem)",
            }}
          >
            {(() => {
              // The secondary text to animate
              const secondaryText =
                "From classrooms to career moves. We're the tribe that's with you all the way.";
              const words = secondaryText.split(" ");
              // For screens above 750px, split into two lines
              return (
                <>
                  <span className="hidden md:inline">
                    {/* Line 1: From classrooms to career moves. */}
                    <span className="block">
                      {words.slice(0, 6).map((word, i) => (
                        <span
                          key={`sec1-${i}`}
                          ref={(el) =>
                            (secondaryDescriptionWordsRef.current[i] = el)
                          }
                          style={{ display: "inline-block", whiteSpace: "pre" }}
                        >
                          {word + " "}
                        </span>
                      ))}
                    </span>
                    {/* Line 2: We're the tribe that's with you all the way. */}
                    <span className="block">
                      {words.slice(6).map((word, i) => (
                        <span
                          key={`sec2-${i}`}
                          ref={(el) =>
                            (secondaryDescriptionWordsRef.current[i + 6] = el)
                          }
                          style={{ display: "inline-block", whiteSpace: "pre" }}
                        >
                          {word + (i < words.slice(6).length - 1 ? " " : "")}
                        </span>
                      ))}
                    </span>
                  </span>
                  {/* For screens <= 750px, natural wrapping */}
                  <span className="md:hidden">
                    {words.map((word, i) => (
                      <span
                        key={`secn-${i}`}
                        ref={(el) => {
                          // Use different indices to avoid conflicts with the two-line layout
                          if (el)
                            secondaryDescriptionWordsRef.current[i + 100] = el;
                        }}
                        style={{ display: "inline-block", whiteSpace: "pre" }}
                      >
                        {word + (i < words.length - 1 ? " " : "")}
                      </span>
                    ))}
                  </span>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;