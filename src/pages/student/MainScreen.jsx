// Prevent browser from restoring scroll position on reload
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
// // import React, { useRef, useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { gsap } from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import stlogo from "../../assets/White logo.png";

// // // Register ScrollTrigger plugin
// // gsap.registerPlugin(ScrollTrigger);

// // const randomPhotos = [
// //   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80",
// //   "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80",
// // ];

// // // Fixed positions for images to match motivational words layout
// // const imagePositions = [
// //   // Top area images
// //   { top: "10%", left: "25%", animationType: "vertical", direction: 1 },
// //   { top: "15%", right: "20%", animationType: "horizontal", direction: 1 },
// //   { top: "20%", left: "15%", animationType: "vertical", direction: -1 },
// //   { top: "25%", right: "25%", animationType: "horizontal", direction: -1 },

// //   // Middle area images
// //   { top: "35%", left: "10%", animationType: "horizontal", direction: -1 },
// //   { top: "40%", right: "15%", animationType: "horizontal", direction: 1 },
// //   { top: "45%", left: "20%", animationType: "vertical", direction: 1 },
// //   { top: "50%", right: "30%", animationType: "vertical", direction: -1 },

// //   // Bottom area images
// //   { bottom: "30%", left: "15%", animationType: "vertical", direction: 1 },
// //   { bottom: "25%", right: "20%", animationType: "horizontal", direction: 1 },
// //   { bottom: "20%", left: "25%", animationType: "horizontal", direction: -1 },
// //   { bottom: "15%", right: "15%", animationType: "vertical", direction: -1 },
// //   { bottom: "10%", left: "10%", animationType: "vertical", direction: 1 },
// //   { bottom: "12%", right: "10%", animationType: "horizontal", direction: 1 },
// //   { bottom: "18%", left: "30%", animationType: "vertical", direction: -1 },
// //   { bottom: "22%", right: "25%", animationType: "horizontal", direction: -1 },
// // ];

// // function getFixedStyle(index) {
// //   const position = imagePositions[index % imagePositions.length];
// //   const size = 80; // Fixed size for all images

// //   return {
// //     position: "absolute",
// //     ...position,
// //     width: `${size}px`,
// //     height: `${size}px`,
// //     opacity: 0.18,
// //     borderRadius: "0.5rem",
// //     objectFit: "cover",
// //     pointerEvents: "none",
// //     zIndex: 1,
// //     transform: "translate(-50%, -50%)",
// //   };
// // }

// // const MainScreen = ({ onNavigateToSection }) => {
// //   const navigate = useNavigate();
// //   const logoRef = useRef(null);
// //   const backgroundRef = useRef(null);
// //   const descriptionRef = useRef(null);
// //   const descriptionWordsRef = useRef([]);
// //   const secondaryDescriptionRef = useRef(null);
// //   const secondaryDescriptionWordsRef = useRef([]);
// //   const backgroundImagesRef = useRef([]);
// //   const containerRef = useRef(null);
// //   const logoContainerRef = useRef(null);
// //   const [showButtons, setShowButtons] = useState(false);
// //   const hideButtonsTimeoutRef = useRef(null);

// //   const scrollToSection = (sectionId) => {
// //     const element = document.getElementById(sectionId);
// //     if (element) {
// //       element.scrollIntoView({ behavior: "smooth" });
// //     }
// //   };

// //   const handleBrandsClick = () => {
// //     navigate("/brands");
// //   };

// //   // Use React state for hover and buttons
// //   // Keep buttons visible when hovering logo or buttons
// //   const handleLogoOrButtonsMouseEnter = () => {
// //     // Clear any pending hide timeout
// //     if (hideButtonsTimeoutRef.current) {
// //       clearTimeout(hideButtonsTimeoutRef.current);
// //       hideButtonsTimeoutRef.current = null;
// //     }
// //     setShowButtons(true);
// //   };

// //   const handleLogoOrButtonsMouseLeave = (e) => {
// //     // Check if the mouse is leaving to go to a related element within the same container
// //     const relatedTarget = e.relatedTarget;
// //     const currentTarget = e.currentTarget;

// //     // If there's no related target (mouse left the window) or the related target
// //     // is not within our logo container, hide the buttons with a delay
// //     if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
// //       // Add a small delay before hiding to allow smooth movement to buttons
// //       hideButtonsTimeoutRef.current = setTimeout(() => {
// //         setShowButtons(false);
// //       }, 300); // 300ms delay
// //     }
// //   };

// //   useEffect(() => {
// //     const runAnimation = () => {
// //       if (logoRef.current && containerRef.current) {
// //         // Initially hide all elements
// //         gsap.set([backgroundRef.current], {
// //           opacity: 0,
// //         });

// //         gsap.set(descriptionWordsRef.current, {
// //           opacity: 0,
// //           rotateX: 90,
// //           transformOrigin: "left bottom",
// //           display: "inline-block",
// //         });

// //         gsap.set(secondaryDescriptionWordsRef.current, {
// //           opacity: 0,
// //           rotateX: 90,
// //           transformOrigin: "left bottom",
// //           display: "inline-block",
// //         });

// //         // Set logo initial state
// //         gsap.set(logoRef.current, {
// //           scale: 2.5,
// //           x: 0,
// //           y: 0,
// //           opacity: 1,
// //         });

// //         // Create timeline for sequence
// //         const tl = gsap.timeline();
// //         tl.to(
// //           logoRef.current,
// //           {
// //             duration: 1.2,
// //             scale: 1,
// //             ease: "power3.out",
// //           },
// //           "+=0.3"
// //         )
// //           .to(
// //             backgroundRef.current,
// //             {
// //               duration: 0.8,
// //               opacity: 1,
// //               ease: "power2.out",
// //             },
// //             "-=0.6"
// //           )
// //           .to(descriptionWordsRef.current, {
// //             opacity: 1,
// //             rotateX: 0,
// //             duration: 0.5,
// //             ease: "back.out(1.7)",
// //             stagger: 0.12,
// //           })
// //           .to(
// //             secondaryDescriptionWordsRef.current,
// //             {
// //               opacity: 1,
// //               rotateX: 0,
// //               duration: 0.4,
// //               ease: "back.out(1.7)",
// //               stagger: 0.08,
// //             },
// //             "+=0.3"
// //           );

// //         // Animate background images similar to motivational words
// //         backgroundImagesRef.current.forEach((image, index) => {
// //           if (image) {
// //             const position = imagePositions[index % imagePositions.length];

// //             if (position.animationType === "vertical") {
// //               // Up/down animation
// //               gsap.to(image, {
// //                 y: position.direction * 20,
// //                 duration: 3 + index * 0.2,
// //                 ease: "power2.inOut",
// //                 repeat: -1,
// //                 yoyo: true,
// //                 delay: 1.5, // Start after main animation
// //               });
// //             } else {
// //               // Left/right animation
// //               gsap.to(image, {
// //                 x: position.direction * 30,
// //                 duration: 4 + index * 0.3,
// //                 ease: "power2.inOut",
// //                 repeat: -1,
// //                 yoyo: true,
// //                 delay: 1.5, // Start after main animation
// //               });
// //             }
// //           }
// //         });
// //       }
// //     };

// //     if (logoRef.current && containerRef.current) {
// //       // Create scroll trigger for main screen animation
// //       ScrollTrigger.create({
// //         trigger: containerRef.current,
// //         start: "top 80%",
// //         onEnter: runAnimation,
// //       });

// //       // Listen for manual animation triggers
// //       const handleAnimationTrigger = (event) => {
// //         if (event.detail?.sectionName === "main") {
// //           runAnimation();
// //         }
// //       };

// //       window.addEventListener(
// //         "triggerSectionAnimation",
// //         handleAnimationTrigger
// //       );

// //       return () => {
// //         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
// //         window.removeEventListener(
// //           "triggerSectionAnimation",
// //           handleAnimationTrigger
// //         );
// //         // Clean up timeout on unmount
// //         if (hideButtonsTimeoutRef.current) {
// //           clearTimeout(hideButtonsTimeoutRef.current);
// //         }
// //       };
// //     }
// //   }, []);

// //   return (
// //     <>
// //       <div
// //         ref={containerRef}
// //         className="relative w-screen h-screen flex items-center justify-center bg-[#b8001f] overflow-hidden"
// //         id="main-section"
// //       >
// //         {/* Background images container */}
// //         <div
// //           ref={backgroundRef}
// //           className="absolute inset-0 pointer-events-none z-0"
// //         >
// //           {randomPhotos.map((src, i) => (
// //             <img
// //               key={i}
// //               ref={(el) => (backgroundImagesRef.current[i] = el)}
// //               src={src}
// //               alt="bg"
// //               style={getFixedStyle(i)}
// //               className="select-none"
// //             />
// //           ))}
// //         </div>
// //         {/* Main content */}
// //         <div className="absolute top-0 z-10 mt-4 flex flex-col items-center w-full px-4">
// //           <div className="text-center">
// //             <div
// //               ref={(el) => {
// //                 logoRef.current = el;
// //                 logoContainerRef.current = el;
// //               }}
// //               className="logo-container group inline-block cursor-pointer relative"
// //               onMouseEnter={handleLogoOrButtonsMouseEnter}
// //               onMouseLeave={handleLogoOrButtonsMouseLeave}
// //             >
// //               {/* Replace manual logo with image logo */}
// //               <img
// //                 src={stlogo}
// //                 alt="Student Tribe Logo"
// //                 className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
// //               />
// //               {/* Buttons appear below logo on hover */}
// //               <div
// //                 className={`absolute left-1/2 -translate-x-1/2 w-[400px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
// //                   showButtons
// //                     ? "opacity-100 pointer-events-auto"
// //                     : "opacity-0 pointer-events-none"
// //                 }`}
// //                 style={{
// //                   top: "calc(100% + 8px)",
// //                 }}
// //                 onMouseEnter={handleLogoOrButtonsMouseEnter}
// //                 onMouseLeave={handleLogoOrButtonsMouseLeave}
// //               >
// //                 <button
// //                   className="flex-1 py-4 text-center rounded-full transition-all duration-300 bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white border-none cursor-pointer text-lg hover:scale-105"
// //                   onClick={() => scrollToSection("main-section")}
// //                 >
// //                   Students
// //                 </button>
// //                 <button
// //                   className="flex-1 py-4 text-center rounded-full transition-all duration-300 bg-transparent text-gray-300 border-none cursor-pointer text-lg hover:bg-[#b8001f] hover:text-white hover:scale-105"
// //                   onClick={() => navigate("/brands")}
// //                 >
// //                   Brands
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //           <div
// //             ref={descriptionRef}
// //             className="text-white text-2xl sm:text-3xl md:text-4xl leading-relaxed lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-center mt-8 drop-shadow-lg max-w-4xl px-4 transition-transform duration-500"
// //             style={{
// //               transform: showButtons ? "translateY(80px)" : "translateY(0)",
// //             }}
// //           >
// //             {(() => {
// //               // The text to animate - split into three lines for larger screens
// //               const text =
// //                 "Be a part of India's largest and fastest growing student community.";
// //               const words = text.split(" ");

// //               return (
// //                 <>
// //                   {/* For screens between 760px and 2660px, display in exactly 3 lines */}
// //                   <span className="hidden screen-lg-range:block">
// //                     {/* Line 1: "Be a part of India's largest" */}
// //                     <span className="block">
// //                       {words.slice(0, 6).map((word, i) => (
// //                         <span
// //                           key={i}
// //                           ref={(el) => (descriptionWordsRef.current[i] = el)}
// //                           style={{ display: "inline-block", whiteSpace: "pre" }}
// //                         >
// //                           {word + " "}
// //                         </span>
// //                       ))}
// //                     </span>
// //                     {/* Line 2: "and fastest growing student" */}
// //                     <span className="block">
// //                       {words.slice(6, 11).map((word, i) => (
// //                         <span
// //                           key={i + 6}
// //                           ref={(el) =>
// //                             (descriptionWordsRef.current[i + 6] = el)
// //                           }
// //                           style={{ display: "inline-block", whiteSpace: "pre" }}
// //                         >
// //                           {word + " "}
// //                         </span>
// //                       ))}
// //                     </span>
// //                     {/* Line 3: "community." */}
// //                     <span className="block">
// //                       {words.slice(11).map((word, i) => (
// //                         <span
// //                           key={i + 11}
// //                           ref={(el) =>
// //                             (descriptionWordsRef.current[i + 11] = el)
// //                           }
// //                           style={{ display: "inline-block", whiteSpace: "pre" }}
// //                         >
// //                           {word + (i < words.slice(11).length - 1 ? " " : "")}
// //                         </span>
// //                       ))}
// //                     </span>
// //                   </span>

// //                   {/* For screens < 760px or > 2660px, display with natural wrapping */}
// //                   <span className="block screen-lg-range:hidden">
// //                     {words.map((word, i) => (
// //                       <span
// //                         key={i}
// //                         ref={(el) => (descriptionWordsRef.current[i] = el)}
// //                         style={{ display: "inline-block", whiteSpace: "pre" }}
// //                       >
// //                         {word + (i < words.length - 1 ? " " : "")}
// //                       </span>
// //                     ))}
// //                   </span>
// //                 </>
// //               );
// //             })()}
// //           </div>

// //           {/* Secondary description text */}
// //           <div
// //             ref={secondaryDescriptionRef}
// //             className="text-white text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-center mt-56 drop-shadow-lg max-w-3xl px-4 transition-transform duration-500"
// //             style={{
// //               transform: showButtons ? "translateY(80px)" : "translateY(0)",
// //             }}
// //           >
// //             {(() => {
// //               // The secondary text to animate
// //               const secondaryText =
// //                 "From classrooms to career moves. We're the tribe that's with you all the way.";
// //               const words = secondaryText.split(" ");
// //               return words.map((word, i) => (
// //                 <span
// //                   key={i}
// //                   ref={(el) => (secondaryDescriptionWordsRef.current[i] = el)}
// //                   style={{ display: "inline-block", whiteSpace: "pre" }}
// //                 >
// //                   {word + (i < words.length - 1 ? " " : "")}
// //                 </span>
// //               ));
// //             })()}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default MainScreen;






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

// const MainScreen = ({ onNavigateToSection }) => {
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

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const handleBrandsClick = () => {
//     navigate("/brands");
//   };


//   useEffect(() => {
//     // Add a small delay to ensure all refs are populated
//     const timer = setTimeout(() => {
//       const runAnimation = () => {
//         if (logoRef.current && containerRef.current && buttonsContainerRef.current) {
//           // Initially hide all elements
//           gsap.set([backgroundRef.current], {
//             opacity: 0,
//           });

//           // Filter out null refs and set initial state for text animations
//           const validDescriptionRefs = descriptionWordsRef.current.filter(ref => ref !== null && ref !== undefined);
//           const validSecondaryRefs = secondaryDescriptionWordsRef.current.filter(ref => ref !== null && ref !== undefined);

//           console.log("Valid description refs:", validDescriptionRefs.length);
//           console.log("Valid secondary refs:", validSecondaryRefs.length);

//           if (validDescriptionRefs.length > 0) {
//             gsap.set(validDescriptionRefs, {
//               opacity: 0,
//               rotateX: 90,
//               transformOrigin: "left bottom",
//               display: "inline-block",
//             });
//           }

//           if (validSecondaryRefs.length > 0) {
//             gsap.set(validSecondaryRefs, {
//               opacity: 0,
//               rotateX: 90,
//               transformOrigin: "left bottom",
//               display: "inline-block",
//             });
//           }

//           // Initially hide buttons and position them above their final position
//           gsap.set(buttonsContainerRef.current, {
//             opacity: 0,
//             y: -100,
//           });

//           // Set logo initial state - center of screen, scaled up
//           gsap.set(logoRef.current, {
//             scale: 3,
//             x: 0,
//             y: window.innerHeight * 0.2, // Move down from top to center
//             opacity: 1,
//           });

//           // Create timeline for sequence
//           const tl = gsap.timeline();
          
//           // First animation: Logo moves from center to final position and scales down
//           tl.to(
//             logoRef.current,
//             {
//               duration: 1.5,
//               scale: 1,
//               y: 0, // Move to final position (top)
//               ease: "power3.out",
//             },
//             "+=0.5"
//           )
//             .to(
//               backgroundRef.current,
//               {
//                 duration: 0.8,
//                 opacity: 1,
//                 ease: "power2.out",
//               },
//               "-=0.6"
//             )
//             .to(
//               buttonsContainerRef.current,
//               {
//                 duration: 0.8,
//                 opacity: 1,
//                 y: 0,
//                 ease: "back.out(1.2)",
//               },
//               "-=0.4"
//             );

//           // Add text animations if refs are available
//           if (validDescriptionRefs.length > 0) {
//             tl.to(validDescriptionRefs, {
//               opacity: 1,
//               rotateX: 0,
//               duration: 0.5,
//               ease: "back.out(1.7)",
//               stagger: 0.12,
//             }, "+=0.3");
//           }

//           if (validSecondaryRefs.length > 0) {
//             tl.to(validSecondaryRefs, {
//               opacity: 1,
//               rotateX: 0,
//               duration: 0.4,
//               ease: "back.out(1.7)",
//               stagger: 0.08,
//             }, "+=0.3");
//           }

//           // Animate background images similar to motivational words
//           backgroundImagesRef.current.forEach((image, index) => {
//             if (image) {
//               const position = imagePositions[index % imagePositions.length];

//               if (position.animationType === "vertical") {
//                 // Up/down animation
//                 gsap.to(image, {
//                   y: position.direction * 20,
//                   duration: 3 + index * 0.2,
//                   ease: "power2.inOut",
//                   repeat: -1,
//                   yoyo: true,
//                   delay: 1.5, // Start after main animation
//                 });
//               } else {
//                 // Left/right animation
//                 gsap.to(image, {
//                   x: position.direction * 30,
//                   duration: 4 + index * 0.3,
//                   ease: "power2.inOut",
//                   repeat: -1,
//                   yoyo: true,
//                   delay: 1.5, // Start after main animation
//                 });
//               }
//             }
//           });
//         }
//       };

//       if (logoRef.current && containerRef.current && buttonsContainerRef.current) {
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
//     }, 100); // Small delay to ensure refs are populated
//   }, []);  return (
//     <>
//       <div
//         ref={containerRef}
//         className="relative w-screen h-screen flex items-center justify-center bg-[#b8001f] overflow-hidden"
//         id="main-section"
//       >
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
//         <div className="absolute top-0 z-10 mt-4 flex flex-col items-center w-full px-4">
//           <div className="text-center">
//             <div
//               ref={(el) => {
//                 logoRef.current = el;
//                 logoContainerRef.current = el;
//               }}
//               className="logo-container group inline-block cursor-pointer relative"
//             >
//               {/* Replace manual logo with image logo */}
//               <img
//                 src={stlogo}
//                 alt="Student Tribe Logo"
//                 className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
//               />
//               {/* Buttons appear below logo on hover */}
//               <div
//                 ref={buttonsContainerRef}
//                 className="absolute -left-40 -translate-x-1/2 w-[400px] max-w-[90vw] flex  bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300"
//                 style={{
//                   top: "calc(100% + 8px)",
//                 }}
//               >
//                 <button
//                   className="flex-1 py-4 text-center rounded-full transition-all duration-300 bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white border-none cursor-pointer text-lg hover:scale-105"
//                   onClick={() => scrollToSection("main-section")}
//                 >
//                   Students
//                 </button>
//                 <button
//                   className="flex-1 py-4 text-center rounded-full transition-all duration-300 bg-transparent text-gray-300 border-none cursor-pointer text-lg hover:bg-[#b8001f] hover:text-white hover:scale-105"
//                   onClick={() => navigate("/brands")}
//                 >
//                   Brands
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div
//             ref={descriptionRef}
//             className="text-white text-2xl sm:text-3xl md:text-4xl leading-relaxed lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-center mt-8 drop-shadow-lg max-w-4xl px-4 transition-transform duration-500"
//             style={{
//               transform: "translateY(80px)",
//             }}
//           >
//             {(() => {
//               // The text to animate - split into three lines for larger screens
//               const text =
//                 "Be a part of India's largest and fastest growing student community.";
//               const words = text.split(" ");

//               return (
//                 <>
//                   {/* For screens between 756px and 2556px, display in exactly 3 lines */}
//                   <div className="screen-three-lines:block hidden">
//                     {/* Line 1: "Be a part of India's largest" (6 words) */}
//                     <div className="block">
//                       {words.slice(0, 6).map((word, i) => (
//                         <span
//                           key={`line1-${i}`}
//                           ref={(el) => (descriptionWordsRef.current[i] = el)}
//                           style={{ display: "inline-block", whiteSpace: "pre" }}
//                         >
//                           {word + " "}
//                         </span>
//                       ))}
//                     </div>
//                     {/* Line 2: "and fastest growing student" (4 words) */}
//                     <div className="block">
//                       {words.slice(6, 10).map((word, i) => (
//                         <span
//                           key={`line2-${i}`}
//                           ref={(el) =>
//                             (descriptionWordsRef.current[i + 6] = el)
//                           }
//                           style={{ display: "inline-block", whiteSpace: "pre" }}
//                         >
//                           {word + " "}
//                         </span>
//                       ))}
//                     </div>
//                     {/* Line 3: "community." (1 word) */}
//                     <div className="block">
//                       {words.slice(10).map((word, i) => (
//                         <span
//                           key={`line3-${i}`}
//                           ref={(el) =>
//                             (descriptionWordsRef.current[i + 10] = el)
//                           }
//                           style={{ display: "inline-block", whiteSpace: "pre" }}
//                         >
//                           {word}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* For screens outside 756px-2556px range, display with natural wrapping */}
//                   <div className="screen-three-lines:hidden block">
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
//             className="text-white text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-center drop-shadow-lg max-w-3xl px-4 transition-transform duration-500"
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
//                           ref={(el) => (secondaryDescriptionWordsRef.current[i] = el)}
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
//                           ref={(el) => (secondaryDescriptionWordsRef.current[i + 6] = el)}
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
//                           if (el) secondaryDescriptionWordsRef.current[i + 100] = el;
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

const MainScreen = ({ onNavigateToSection }) => {
  // Always scroll to main-section on mount (reload)
  useEffect(() => {
    const el = document.getElementById('main-section');
    if (el) {
      el.scrollIntoView({ behavior: 'auto' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, []);
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
  
  // State for tracking which button is being hovered
  const [hoveredButton, setHoveredButton] = useState('students'); // Default to 'students'

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

  useEffect(() => {
    // Add a small delay to ensure all refs are populated
    const timer = setTimeout(() => {
      const runAnimation = () => {
        if (logoRef.current && containerRef.current && buttonsContainerRef.current) {
          // Initially hide all elements
          gsap.set([backgroundRef.current], {
            opacity: 0,
          });

          // Filter out null refs and set initial state for text animations
          const validDescriptionRefs = descriptionWordsRef.current.filter(ref => ref !== null && ref !== undefined);
          const validSecondaryRefs = secondaryDescriptionWordsRef.current.filter(ref => ref !== null && ref !== undefined);

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
            scale: 3,
            x: 0,
            y: window.innerHeight * 0.2, // Move down from top to center
            opacity: 1,
          });

          // Create timeline for sequence
          const tl = gsap.timeline();
          // Add a delay before starting the logo animation
          tl.to({}, { duration: 0.8 }); // 0.8s delay before logo animates
          // First animation: Logo moves from center to final position and scales down
          tl.to(
            logoRef.current,
            {
              duration: 1.5,
              scale: 1,
              y: 0, // Move to final position (top)
              ease: "power3.out",
            },
            "+=0"
          )
            .to(
              backgroundRef.current,
              {
                duration: 0.8,
                opacity: 1,
                ease: "power2.out",
              },
              "-=0.6"
            )
            .to(
              buttonsContainerRef.current,
              {
                duration: 0.8,
                opacity: 1,
                y: 0,
                ease: "back.out(1.2)",
              },
              "-=0.4"
            );

          // Add text animations if refs are available
          if (validDescriptionRefs.length > 0) {
            tl.to(validDescriptionRefs, {
              opacity: 1,
              rotateX: 0,
              duration: 0.5,
              ease: "back.out(1.7)",
              stagger: 0.12,
            }, "+=0.3");
          }

          if (validSecondaryRefs.length > 0) {
            tl.to(validSecondaryRefs, {
              opacity: 1,
              rotateX: 0,
              duration: 0.4,
              ease: "back.out(1.7)",
              stagger: 0.08,
            }, "+=0.3");
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
                  delay: 1.5, // Start after main animation
                });
              } else {
                // Left/right animation
                gsap.to(image, {
                  x: position.direction * 30,
                  duration: 4 + index * 0.3,
                  ease: "power2.inOut",
                  repeat: -1,
                  yoyo: true,
                  delay: 1.5, // Start after main animation
                });
              }
            }
          });
        }
      };

      if (logoRef.current && containerRef.current && buttonsContainerRef.current) {
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
    }, 100); // Small delay to ensure refs are populated
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-screen h-screen flex items-center justify-center bg-[#b8001f] overflow-hidden"
        id="main-section"
      >
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
        {/* Main content */}
        <div className="absolute top-0 z-10 mt-4 flex flex-col items-center w-full px-4">
          <div className="text-center">
            <div
              ref={(el) => {
                logoRef.current = el;
                logoContainerRef.current = el;
              }}
              className="logo-container group inline-block cursor-pointer relative"
            >
              {/* Replace manual logo with image logo */}
              <img
                src={stlogo}
                alt="Student Tribe Logo"
                className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
              />
              {/* Buttons appear below logo */}
              <div
                ref={buttonsContainerRef}
                className="absolute -left-40 -translate-x-1/2 w-[400px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300"
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
                >
                  Brands
                </button>
              </div>
            </div>
          </div>
          <div
            ref={descriptionRef}
            className="text-white text-2xl sm:text-3xl md:text-4xl leading-relaxed lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-center mt-8 drop-shadow-lg max-w-4xl px-4 transition-transform duration-500"
            style={{
              transform: "translateY(80px)",
            }}
          >
            {(() => {
              // The text to animate - split into three lines for larger screens
              const text =
                "Be a part of India's largest and fastest growing student community.";
              const words = text.split(" ");

              return (
                <>
                  {/* For screens between 756px and 2556px, display in exactly 3 lines */}
                  <div className="screen-three-lines:block hidden">
                    {/* Line 1: "Be a part of India's largest" (6 words) */}
                    <div className="block">
                      {words.slice(0, 6).map((word, i) => (
                        <span
                          key={`line1-${i}`}
                          ref={(el) => (descriptionWordsRef.current[i] = el)}
                          style={{ display: "inline-block", whiteSpace: "pre" }}
                        >
                          {word + " "}
                        </span>
                      ))}
                    </div>
                    {/* Line 2: "and fastest growing student" (4 words) */}
                    <div className="block">
                      {words.slice(6, 10).map((word, i) => (
                        <span
                          key={`line2-${i}`}
                          ref={(el) =>
                            (descriptionWordsRef.current[i + 6] = el)
                          }
                          style={{ display: "inline-block", whiteSpace: "pre" }}
                        >
                          {word + " "}
                        </span>
                      ))}
                    </div>
                    {/* Line 3: "community." (1 word) */}
                    <div className="block">
                      {words.slice(10).map((word, i) => (
                        <span
                          key={`line3-${i}`}
                          ref={(el) =>
                            (descriptionWordsRef.current[i + 10] = el)
                          }
                          style={{ display: "inline-block", whiteSpace: "pre" }}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* For screens outside 756px-2556px range, display with natural wrapping */}
                  <div className="screen-three-lines:hidden block">
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
            className="text-white text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-center drop-shadow-lg max-w-3xl px-4 transition-transform duration-500"
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
                          ref={(el) => (secondaryDescriptionWordsRef.current[i] = el)}
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
                          ref={(el) => (secondaryDescriptionWordsRef.current[i + 6] = el)}
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
                          if (el) secondaryDescriptionWordsRef.current[i + 100] = el;
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