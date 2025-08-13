import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const navigate = useNavigate();
  const logoRef = useRef(null);
  const backgroundRef = useRef(null);
  const descriptionRef = useRef(null);
  const descriptionWordsRef = useRef([]);
  const backgroundImagesRef = useRef([]);
  const containerRef = useRef(null);
  const logoContainerRef = useRef(null);
  const buttonsContainerRef = useRef(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBrandsClick = () => {
    navigate('/brands');
  };

  // Function to create buttons dynamically
  const createButtons = () => {
    console.log('Creating buttons...'); // Debug log
    if (buttonsContainerRef.current) {
      console.log('Buttons already exist');
      return;
    }

    const buttonsContainer = document.createElement('div');
    buttonsContainer.innerHTML = `
      <button id="students-btn" style="
        flex: 1;
        padding: 16px;
        text-align: center;
        border-radius: 9999px;
        transition: all 0.3s;
        background: linear-gradient(to right, rgb(184, 0, 31), rgb(122, 0, 21));
        color: white;
        border: none;
        cursor: pointer;
      ">Students</button>
      <button id="brands-btn" style="
        flex: 1;
        padding: 16px;
        text-align: center;
        border-radius: 9999px;
        transition: all 0.3s;
        background: transparent;
        color: rgb(209, 213, 219);
        border: none;
        cursor: pointer;
      ">Brands</button>
    `;
    
    buttonsContainer.style.cssText = `
      position: absolute;
      top: calc(100% + 16px);
      left: 50%;
      transform: translateX(-50%);
      width: 400px;
      max-width: 90vw;
      background: rgb(45, 0, 10);
      border-radius: 9999px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      font-size: 1.25rem;
      font-weight: bold;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease-out;
      display: flex;
      z-index: 20;
    `;
    
    // Add event listeners
    const studentsBtn = buttonsContainer.querySelector('#students-btn');
    const brandsBtn = buttonsContainer.querySelector('#brands-btn');
    
    studentsBtn.onclick = () => scrollToSection('main-section');
    brandsBtn.onclick = () => navigate('/brands');
    
    // Hover effects for brands button
    brandsBtn.onmouseenter = () => {
      brandsBtn.style.background = 'rgb(184, 0, 31)';
      brandsBtn.style.color = 'white';
    };
    brandsBtn.onmouseleave = () => {
      brandsBtn.style.background = 'transparent';
      brandsBtn.style.color = 'rgb(209, 213, 219)';
    };

    // Keep buttons visible when hovering over them
    buttonsContainer.onmouseenter = () => {
      console.log('Mouse entered buttons');
    };
    
    buttonsContainer.onmouseleave = () => {
      console.log('Mouse left buttons');
      removeButtons();
    };

    logoContainerRef.current.appendChild(buttonsContainer);
    buttonsContainerRef.current = buttonsContainer;

    // Move description text down
    console.log('Moving description down');
    if (descriptionRef.current) {
      descriptionRef.current.style.transform = 'translateY(100px)';
    }

    // Animate buttons in
    setTimeout(() => {
      buttonsContainer.style.opacity = '1';
      buttonsContainer.style.pointerEvents = 'auto';
    }, 50);
  };

  // Function to remove buttons
  const removeButtons = () => {
    console.log('Removing buttons...'); // Debug log
    if (buttonsContainerRef.current) {
      buttonsContainerRef.current.style.opacity = '0';
      buttonsContainerRef.current.style.pointerEvents = 'none';
      
      // Move description text back up
      console.log('Moving description back up');
      if (descriptionRef.current) {
        descriptionRef.current.style.transform = 'translateY(0)';
      }
      
      setTimeout(() => {
        if (buttonsContainerRef.current && logoContainerRef.current && logoContainerRef.current.contains(buttonsContainerRef.current)) {
          logoContainerRef.current.removeChild(buttonsContainerRef.current);
          buttonsContainerRef.current = null;
        }
      }, 300);
    }
  };

  // Setup hover event listeners
  useEffect(() => {
    const logoContainer = logoContainerRef.current;
    console.log('Setting up hover listeners', logoContainer); // Debug log
    
    if (logoContainer) {
      const handleMouseEnter = () => {
        console.log('Mouse entered logo'); // Debug log
        createButtons();
      };
      
      const handleMouseLeave = (event) => {
        console.log('Mouse left logo', event.relatedTarget); // Debug log
        // Add small delay to allow moving to buttons
        setTimeout(() => {
          // Check if we're not hovering over the buttons
          if (!buttonsContainerRef.current || !buttonsContainerRef.current.matches(':hover')) {
            removeButtons();
          }
        }, 100);
      };
      
      logoContainer.addEventListener('mouseenter', handleMouseEnter);
      logoContainer.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        logoContainer.removeEventListener('mouseenter', handleMouseEnter);
        logoContainer.removeEventListener('mouseleave', handleMouseLeave);
        if (buttonsContainerRef.current) {
          removeButtons();
        }
      };
    }
  }, []);

  useEffect(() => {
    const runAnimation = () => {
      if (logoRef.current && containerRef.current) {
        // Initially hide all elements
        gsap.set([backgroundRef.current], {
          opacity: 0,
        });

        gsap.set(descriptionWordsRef.current, {
          opacity: 0,
          rotateX: 90,
          transformOrigin: "left bottom",
          display: "inline-block",
        });

        // Set logo initial state
        gsap.set(logoRef.current, {
          scale: 2.5,
          x: 0,
          y: 0,
          opacity: 1,
        });

        // Create timeline for sequence
        const tl = gsap.timeline();
        tl.to(
          logoRef.current,
          {
            duration: 1.2,
            scale: 1,
            ease: "power3.out",
          },
          "+=0.3"
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
          .to(descriptionWordsRef.current, {
            opacity: 1,
            rotateX: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.12,
          });

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

    if (logoRef.current && containerRef.current) {
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
      };
    }
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
        <div className="absolute top-0 z-10 flex flex-col items-center w-full px-4">
          <div className="text-center">
            <div ref={(el) => {logoRef.current = el; logoContainerRef.current = el;}} className="logo-container group inline-block cursor-pointer relative">
              <div className="text-white font-black text-6xl leading-none drop-shadow-lg tracking-tight group-hover:scale-105 transition-transform duration-300">
                st.
              </div>
              <div className="text-white text-lg font-medium drop-shadow group-hover:scale-105 transition-transform duration-300">
                Student Tribe
              </div>
            </div>
          </div>
          <div
            ref={descriptionRef}
            className="text-white text-2xl sm:text-3xl md:text-4xl leading-relaxed lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-center mt-8 drop-shadow-lg max-w-4xl px-4"
            style={{ transition: 'transform 0.5s ease-out' }}
          >
            {(() => {
              // The text to animate as one line
              const text =
                "Be a part of India's largest and fastest growing student community.";
              const words = text.split(" ");
              return words.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => (descriptionWordsRef.current[i] = el)}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {word + (i < words.length - 1 ? " " : "")}
                </span>
              ));
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
