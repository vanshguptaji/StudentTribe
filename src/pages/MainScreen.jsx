import React, { useRef, useEffect } from "react";
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

function getRandomStyle() {
  const top = Math.random() * 80 + 5;
  const left = Math.random() * 80 + 5;
  const size = Math.random() * 60 + 60;
  return {
    position: "absolute",
    top: `${top}%`,
    left: `${left}%`,
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
  const logoRef = useRef(null);
  const backgroundRef = useRef(null);
  const buttonsRef = useRef(null);
  const descriptionRef = useRef(null);
  const descriptionLettersRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const runAnimation = () => {
      if (logoRef.current && containerRef.current) {
        // Initially hide all elements
        gsap.set([backgroundRef.current, buttonsRef.current], {
          opacity: 0,
        });

        gsap.set(descriptionLettersRef.current, {
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
        tl
          .to(
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
          .to(
            buttonsRef.current,
            {
              duration: 0.6,
              opacity: 1,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .to(descriptionLettersRef.current, {
            opacity: 1,
            rotateX: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.035,
          });
      }
    };

    if (logoRef.current && containerRef.current) {
      // Create scroll trigger for main screen animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: runAnimation
      });

      // Listen for manual animation triggers
      const handleAnimationTrigger = (event) => {
        if (event.detail?.sectionName === 'main') {
          runAnimation();
        }
      };

      window.addEventListener('triggerSectionAnimation', handleAnimationTrigger);

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        window.removeEventListener('triggerSectionAnimation', handleAnimationTrigger);
      };
    }
  }, []);
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div ref={containerRef} className="relative w-screen h-screen flex items-center justify-center bg-[#b8001f] overflow-hidden"
           id="main-section">
        {/* Background images container */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 pointer-events-none z-0"
        >
          {randomPhotos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="bg"
              style={{
                ...getRandomStyle(),
                // Restrict background images to not overlap center content
                top: `calc(${Math.random() * 70 + 10}%)`,
                left: `calc(${Math.random() * 70 + 15}%)`,
                maxWidth: "120px",
                maxHeight: "120px",
                minWidth: "60px",
                minHeight: "60px",
              }}
              className="select-none"
            />
          ))}
        </div>
        {/* Main content */}
        <div className="absolute top-20 z-10 flex flex-col items-center w-full px-4">
          <div className="mb-8 text-center">
            <div ref={logoRef} className="logo-container">
              <div className="text-white font-black text-6xl leading-none drop-shadow-lg tracking-tight">
                st.
              </div>
              <div className="text-white text-lg font-medium drop-shadow mb-4">
                Student Tribe
              </div>
            </div>
                        <div
              ref={buttonsRef}
              className="mx-auto mt-8 w-[400px] max-w-[90vw] bg-[#2d000a] rounded-full flex overflow-hidden shadow-lg text-xl font-bold"
            >
              <button
                className="flex-1 py-4 text-center rounded-l-full transition-colors duration-300 bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                onClick={() => scrollToSection('main-section')}
              >
                Students
              </button>
              <button
                className="flex-1 py-4 text-center rounded-r-full transition-colors duration-300 text-gray-300 bg-transparent"
                onClick={() => scrollToSection('brands-section')}
              >
                Brands
              </button>
            </div>
          </div>
          <div
            ref={descriptionRef}
            className="text-white text-4xl md:text-5xl font-extrabold text-center mt-8 drop-shadow-lg max-w-3xl"
          >
            {(() => {
              // The text to animate, with <br /> preserved
              const lines = [
                "Be a part of India’s largest",
                "and fastest growing student",
                "community.",
              ];
              let letterIndex = 0;
              return lines.map((line, i) => (
                <React.Fragment key={i}>
                  {Array.from(line).map((char, j) => {
                    if (char === " ") {
                      letterIndex++;
                      return " ";
                    }
                    return (
                      <span
                        key={j}
                        ref={(el) =>
                          (descriptionLettersRef.current[letterIndex++] = el)
                        }
                        style={{ display: "inline-block" }}
                      >
                        {char}
                      </span>
                    );
                  })}
                  {i < lines.length - 1 && <br />}
                </React.Fragment>
              ));
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
