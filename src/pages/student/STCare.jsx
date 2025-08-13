import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import banner from "../../assets/StCare/banner.svg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const STCare = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const hideButtonsTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightContentRef = useRef(null);
  const rightImage1Ref = useRef(null);
  const rightImage2Ref = useRef(null);
  const buttonRef = useRef(null);
  const bottomTextRef = useRef(null);
  const overwhelmedParaRef = useRef(null);

  useEffect(() => {
    const runAnimation = () => {
      const tl = gsap.timeline();

      // Set initial states - don't set absolute positioning for headings initially
      gsap.set(
        [
          leftImageRef.current,
          rightContentRef.current,
          rightImage1Ref.current,
          rightImage2Ref.current,
          buttonRef.current,
          bottomTextRef.current,
          overwhelmedParaRef.current,
        ],
        {
          opacity: 0,
        }
      );

      gsap.set(headingRef.current, {
        opacity: 0,
        y: -50,
      });

      gsap.set(subheadingRef.current, {
        opacity: 0,
        y: -50,
      });

      gsap.set(leftImageRef.current, { x: -400 });
      gsap.set(rightContentRef.current, { x: 400 });
      gsap.set(rightImage1Ref.current, { scale: 0 });
      gsap.set(rightImage2Ref.current, { x: 300 });
      gsap.set(buttonRef.current, { y: -500 }); // Button starts from top of screen
      gsap.set(bottomTextRef.current, { y: -500 }); // Bottom text starts from top of screen
      gsap.set(overwhelmedParaRef.current, { y: -500 }); // Overwhelmed para starts from top of screen

      // Animation sequence - start with headings
      tl.to([headingRef.current, subheadingRef.current], {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      })
        .to(
          leftImageRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          0.5
        ) // Start slightly after headings
        .to(
          rightContentRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          0.5
        ) // Start slightly after headings
        .to(
          rightImage1Ref.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          0.5
        ) // Start slightly after headings
        .to(
          rightImage2Ref.current,
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          0.5
        ) // Start slightly after headings
        .to(
          [
            buttonRef.current,
            bottomTextRef.current,
            overwhelmedParaRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
          },
          "+=0.3"
        ); // Start after other animations
    };

    if (containerRef.current) {
      // Set initial states first
      gsap.set(
        [
          leftImageRef.current,
          rightContentRef.current,
          rightImage1Ref.current,
          rightImage2Ref.current,
          buttonRef.current,
          bottomTextRef.current,
          overwhelmedParaRef.current,
        ],
        {
          opacity: 0,
        }
      );
      gsap.set(headingRef.current, { opacity: 0, y: -50 });
      gsap.set(subheadingRef.current, { opacity: 0, y: -50 });
      gsap.set(leftImageRef.current, { x: -400 });
      gsap.set(rightContentRef.current, { x: 400 });
      gsap.set(rightImage1Ref.current, { scale: 0 });
      gsap.set(rightImage2Ref.current, { x: 300 });
      gsap.set(buttonRef.current, { y: -500 });
      gsap.set(bottomTextRef.current, { y: -500 });
      gsap.set(overwhelmedParaRef.current, { y: -500 });

      // Create scroll trigger for care section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        onEnter: () => {
          console.log("STCare animation triggered!"); // Debug log
          runAnimation();
        },
      });

      // Listen for manual animation triggers
      const handleAnimationTrigger = (event) => {
        if (event.detail?.sectionName === "care") {
          console.log("STCare manual trigger!"); // Debug log
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

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-rose-100 relative overflow-hidden"
      id="care-section"
    >
      {/* Banner image top-right */}
      <img
        src={banner}
        alt="ST Care Banner"
        className="absolute top-0 right-4 md:top-0 md:right-8 lg:top-0 lg:right-12 w-[20px] md:w-[30px] lg:w-[56px] h-auto z-30 select-none pointer-events-none"
        style={{ minWidth: "20px" }}
        loading="eager"
      />
      {/* Background design elements */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full opacity-10"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0,0 C300,200 600,100 1200,300 L1200,800 L0,800 Z"
            fill="rgba(200,200,200,0.2)"
          />
        </svg>
      </div>

      {/* Main content container */}
      <div className="relative z-10 px-8 py-12 max-w-6xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-12">
          {/* ST logo */}
          <div 
            className="logo-container group inline-block cursor-pointer relative mb-8"
            onMouseEnter={handleLogoOrButtonsMouseEnter}
            onMouseLeave={handleLogoOrButtonsMouseLeave}
          >
            <span className="text-5xl font-bold text-red-700 px-4 py-2 group-hover:scale-105 transition-transform duration-300">
              st.
            </span>
            <p className="text-red-700 text-lg mt-2 font-medium group-hover:scale-105 transition-transform duration-300">
              Student Tribe
            </p>
            {/* Buttons appear below text on hover */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-[400px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
                showButtons ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              style={{
                top: 'calc(100% + 8px)',
              }}
            >
              <button
                className="flex-1 py-4 text-center rounded-full transition-all duration-300 bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white border-none cursor-pointer text-lg hover:scale-105"
                onClick={() => navigate('/')}
              >
                Students
              </button>
              <button
                className="flex-1 py-4 text-center rounded-full transition-all duration-300 bg-transparent text-gray-300 border-none cursor-pointer text-lg hover:bg-[#b8001f] hover:text-white hover:scale-105"
                onClick={() => navigate('/brands')}
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
            transform: showButtons ? 'translateY(80px)' : 'translateY(0)',
          }}
        >
          {/* Main content section - Two main flex sections */}
          <div className="flex flex-col lg:flex-row gap-8 items-start mb-12">
          {/* Left side - Assembly image */}
          <div className="flex-1">
            <h1
              ref={headingRef}
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 text-center"
            >
              Feeling Stuck?
            </h1>
            <h2
              ref={subheadingRef}
              className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-center text-gray-700 mb-6"
            >
              You're Not Alone — We're Here.
            </h2>
            <div
              ref={leftImageRef}
              className="relative overflow-hidden shadow-2xl opacity-0"
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop"
                alt="Assembly gathering"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Right side - Text and images */}
          <div ref={rightContentRef} className="flex-1 opacity-0">
            {/* Text content */}
            <div className="mb-8">
              <div className="text-gray-700 space-y-4 mb-6 text-2xl text-bold">
                <p ref={overwhelmedParaRef} className="opacity-0">
                  Overwhelmed? Anxious? Confused? You're safe here. We provide
                  supportive conversations, judgment-free care, and guidance to
                  help you build emotional strength.
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <span className="text-xl font-medium text-gray-800">
                    Because mental health matters.
                  </span>
                </div>
              </div>
            </div>

            {/* Right side divided into two columns for images */}
            <div className="flex gap-6">
              {/* Left column in right section */}
              <div className="flex-1">
                {/* Community image 1 */}
                <div
                  ref={rightImage1Ref}
                  className="relative rounded-2xl overflow-hidden shadow-2xl mb-6 opacity-0"
                >
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop"
                    alt="Community gathering"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>

              {/* Right column in right section */}
              <div className="flex-1">
                {/* Community image 2 */}
                <div
                  ref={rightImage2Ref}
                  className="relative rounded-2xl overflow-hidden shadow-2xl opacity-0"
                >
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
                    alt="Support group"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        {/* Call to action button below left image */}
        <button
          ref={buttonRef}
          className="bg-red-800 text-white px-4 py-3 sm:px-8 sm:py-4 rounded-full font-bold flex items-center gap-2 hover:bg-red-700 transition-all duration-300 text-sm sm:text-base shadow-xl w-full justify-center opacity-0 min-h-[50px]"
          style={{ boxShadow: "0 4px 24px rgba(184,0,31,0.15)" }}
        >
          <span className="text-center flex-1">Feel Heard. Find Strength.</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div ref={bottomTextRef} className="text-center mt-8 opacity-0">
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            From oversized fits that scream confidence to punchlines that rep
            your vibe — this drop is all about you.
          </p>
        </div>
      </div>

      {/* Bottom curved element */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 200"
          className="w-full h-32"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 C400,0 800,0 1200,200 L1200,200 L0,200 Z"
            fill="rgba(200,200,200,0.1)"
          />
        </svg>
      </div>
      </div>
    </div>
  );
};

export default STCare;
