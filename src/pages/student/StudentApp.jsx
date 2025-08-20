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
  const [hoveredButton, setHoveredButton] = useState("students");

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

  // Image arrays
  const quizImages = [quizImg, robot, quizImg, robot];
  const gigsImages = [robot, quizImg, robot, quizImg];

  // Auto slider for quiz images
  useEffect(() => {
    const interval = setInterval(() => {
      setQuizIndex((prev) => (prev + 1) % quizImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto slider for gigs images
  useEffect(() => {
    const interval = setInterval(() => {
      setGigsIndex((prev) => (prev + 1) % gigsImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Simple Slider Component
  const AutoSlider = ({ images, currentIndex, className }) => (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className="min-w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    const runAnimation = () => {
      setIsVisible(true);

      // Check if all refs are available before running animations
      const allRefs = [
        phoneRef.current,
        topLeftCardRef.current,
        topRightCardRef.current,
        bottomLeftCardRef.current,
        bottomRightCardRef.current,
        topLeftBgRef.current,
        topRightBgRef.current,
        bottomLeftBgRef.current,
        bottomRightBgRef.current,
        topLeftContentRef.current,
        topRightContentRef.current,
        bottomLeftContentRef.current,
        bottomRightContentRef.current,
      ];

      // Only run animation if all required refs exist
      const allRefsExist = allRefs.every((ref) => ref !== null);
      if (!allRefsExist) {
        console.warn("Some animation refs are null, skipping animation");
        return;
      }

      // Create GSAP timeline for simultaneous animations
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

      // Start animations simultaneously
      tl.to(
        [
          topLeftCardRef.current,
          topRightCardRef.current,
          bottomLeftCardRef.current,
          bottomRightCardRef.current,
        ],
        {
          opacity: 1,
          duration: 0.1,
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
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.1,
          },
          0
        )
        .to(
          phoneRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          0.2
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
            duration: 1.0,
            ease: "power3.out",
            stagger: 0.1,
          },
          0.3
        );
    };

    if (containerRef.current) {
      // Set initial states with null checks
      if (phoneRef.current) {
        gsap.set([phoneRef.current], { opacity: 0, y: 200 });
      }

      const cardRefs = [
        topLeftCardRef.current,
        topRightCardRef.current,
        bottomLeftCardRef.current,
        bottomRightCardRef.current,
      ].filter((ref) => ref !== null);

      if (cardRefs.length > 0) {
        gsap.set(cardRefs, { opacity: 0 });
      }

      const bgRefs = [
        topLeftBgRef.current,
        topRightBgRef.current,
        bottomLeftBgRef.current,
        bottomRightBgRef.current,
      ].filter((ref) => ref !== null);

      if (bgRefs.length > 0) {
        gsap.set(bgRefs, { scale: 0 });
      }

      const contentRefs = [
        topLeftContentRef.current,
        topRightContentRef.current,
        bottomLeftContentRef.current,
        bottomRightContentRef.current,
      ].filter((ref) => ref !== null);

      if (contentRefs.length > 0) {
        gsap.set(contentRefs, { opacity: 0 });
      }

      // Create scroll trigger with improved handling
      const scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: runAnimation,
        onEnterBack: runAnimation,
      });

      // Listen for manual animation triggers
      const handleAnimationTrigger = (event) => {
        if (event.detail?.sectionName === "app") {
          setTimeout(() => {
            runAnimation();
          }, 100);
        }
      };

      window.addEventListener(
        "triggerSectionAnimation",
        handleAnimationTrigger
      );

      // Handle window resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        scrollTrigger.kill();
        window.removeEventListener(
          "triggerSectionAnimation",
          handleAnimationTrigger
        );
        window.removeEventListener("resize", handleResize);
        if (hideButtonsTimeoutRef.current) {
          clearTimeout(hideButtonsTimeoutRef.current);
        }
      };
    }
  }, []);

  // Hover handlers for logo/buttons
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
    setHoveredButton("students");
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full overflow-hidden relative"
      style={{
        background:
          "radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%)",
      }}
    >
      {/* Header */}
      <div className="relative z-20 pt-8 md:pt-16 text-center">
        <div
          className="logo-container group inline-block cursor-pointer relative"
          onMouseEnter={handleLogoOrButtonsMouseEnter}
          onMouseLeave={handleLogoOrButtonsMouseLeave}
        >
          <img
            src={stlogo}
            alt="Student Tribe Logo"
            className="h-6 md:h-8 lg:h-12 xl:h-16 w-auto drop-shadow-lg mb-4"
          />
          {/* Buttons appear below logo on hover */}
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
              className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm sm:text-lg hover:scale-105 py-2 px-4 ${
                hoveredButton === "students"
                  ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                  : "bg-transparent text-gray-300 hover:text-white"
              }`}
              onClick={() => navigate("/")}
              onMouseEnter={() => handleButtonHover("students")}
              onMouseLeave={handleButtonLeave}
            >
              Students
            </button>
            <button
              className={`flex-1 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-sm sm:text-lg hover:scale-105 py-2 px-4 ${
                hoveredButton === "brands"
                  ? "bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white"
                  : "bg-transparent text-gray-300 hover:text-white"
              }`}
              onClick={() => navigate("/brands")}
              onMouseEnter={() => handleButtonHover("brands")}
              onMouseLeave={handleButtonLeave}
            >
              Brands
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="relative z-20 px-4 sm:px-6 md:px-8 transition-transform duration-500"
        style={{
          transform: showButtons ? "translateY(60px)" : "translateY(0)",
        }}
      >
        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-6 leading-tight px-4">
            Where Fun Meets Learning and New
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Connections
          </h1>
        </div>

        {/* Mobile Layout - Two columns side by side */}
        <div className="lg:hidden max-w-sm sm:max-w-md mx-auto mb-8">
          <div className="flex gap-1 sm:gap-6">
            {/* Left Column */}
            <div className="flex-1 space-y-2">
              {/* Communities & Daily Quizzes */}
              <div className="w-full">
                <div
                  className="bg-[#2C1B1B]/80 backdrop-blur-lg h-[300px] rounded-2xl p-3 sm:p-4  flex flex-col border-2 border-white/40 shadow-lg min-h-[240px] sm:min-h-[280px]"
                  style={{
                    borderRadius: "16px",
                    border: "2px solid rgba(255,255,255,0.34)",
                    boxShadow:
                      "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                    background: "rgba(44,27,27,0.92)",
                  }}
                >
                  <div>
                    <h3 className="text-white text-xs sm:text-sm font-extrabold mb-2 sm:mb-3 text-center">
                      Communities & Daily Quizzes
                    </h3>
                    <div className="w-full mb-2 sm:mb-3">
                      <AutoSlider
                        images={quizImages}
                        currentIndex={quizIndex}
                        className="w-full h-32 sm:h-48 rounded-xl shadow-lg"
                      />
                    </div>
                    <p className="text-white/90 text-xs text-center leading-relaxed">
                      Be part of active student communities across India.
                    </p>
                  </div>
                </div>
              </div>

              {/* Your Dost AI */}
              <div className="w-full">
                <div
                  className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-3 sm:p-4 h-[150px] flex flex-col border-2 border-white/40 shadow-lg "
                  style={{
                    borderRadius: "16px",
                    border: "2px solid rgba(255,255,255,0.34)",
                    boxShadow:
                      "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                    background: "rgba(44,27,27,0.92)",
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="mb-2 sm:mb-3">
                      <img
                        src={robot}
                        alt="Your Dost AI"
                        className="w-12 sm:w-16 h-12 sm:h-16 object-contain mx-auto"
                      />
                    </div>
                    <div>
                      <h3 className="text-white text-[11px] sm:text-sm font-extrabold mb-1 sm:mb-2">
                        Your Dost AI
                      </h3>
                      <p className="text-white/90 text-[10px] sm:text-sm leading-relaxed">
                        Your <span className="font-bold">AI buddy</span> for
                        everything – from silly questions to serious career
                        advice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-2">
              {/* ST PRO Membership */}
              <div className="w-full">
                <div
                  className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-3 sm:p-4 h-[150px] flex flex-col border-2 border-white/40 shadow-lg items-center justify-center "
                  style={{
                    borderRadius: "16px",
                    border: "2px solid rgba(255,255,255,0.34)",
                    boxShadow:
                      "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                    background: "rgba(44,27,27,0.92)",
                  }}
                >
                  <div>
                    <h3 className="text-white text-[11px] sm:text-sm font-extrabold mb-2 sm:mb-3 text-center">
                      ST PRO Membership
                    </h3>
                    <p className="text-white/90 text-[10px] sm:text-sm text-center leading-relaxed">
                      Exclusive opportunities, career events & priority invites
                      – all for just{" "}
                      <span className="font-extrabold">₹299/month</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gigs & Star Connects */}
              <div className="w-full">
                <div
                  className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-3 sm:p-4 h-[300px] flex flex-col border-2 border-white/40 shadow-lg min-h-[240px] sm:min-h-[280px]"
                  style={{
                    borderRadius: "16px",
                    border: "2px solid rgba(255,255,255,0.34)",
                    boxShadow:
                      "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                    background: "rgba(44,27,27,0.92)",
                  }}
                >
                  <div>
                    <div className="w-full mb-2 sm:mb-3">
                      <AutoSlider
                        images={gigsImages}
                        currentIndex={gigsIndex}
                        className="w-full h-32 sm:h-20 rounded-xl shadow-lg"
                      />
                    </div>
                    <h3 className="text-white text-xs sm:text-sm font-extrabold mb-2 sm:mb-3 text-center">
                      Gigs & Star Connects
                    </h3>
                    <p className="text-white/90 text-xs text-center leading-relaxed">
                      Chill gigs, fun open mics, and star connects – vibe,
                      showcase your talent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Mockup - Mobile After Cards */}
        <div className="lg:hidden mb-12 md:mb-16">
          <div className="flex justify-center">
            <img
              src={iphone}
              alt="iPhone Mockup"
              className="w-[200px] sm:w-[250px] md:w-[280px] h-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Desktop Layout - 3 columns with items stacked vertically */}
        <div className="hidden lg:block max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-3 gap-6 xl:gap-8">
            {/* Column 1 */}
            <div className="flex flex-col gap-6 xl:gap-8 max-w-[400px]">
              {/* Communities & Daily Quizzes */}
              <div ref={topLeftCardRef} className="opacity-0 lg:opacity-0">
                <div
                  ref={topLeftBgRef}
                  className="bg-[#2C1B1B]/80 backdrop-blur-lg h-[450px] xl:h-[500px] rounded-2xl p-4 xl:p-6 flex flex-col border-2 border-white/40 shadow-lg"
                  style={{
                    borderRadius: "16px",
                    border: "2px solid rgba(255,255,255,0.34)",
                    boxShadow:
                      "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                    background: "rgba(44,27,27,0.92)",
                  }}
                >
                  <div ref={topLeftContentRef}>
                    <h3 className="text-white text-xl xl:text-2xl font-extrabold mb-3 xl:mb-4 text-center">
                      Communities & Daily Quizzes
                    </h3>
                    <div className="w-full mb-4 xl:mb-6">
                      <AutoSlider
                        images={quizImages}
                        currentIndex={quizIndex}
                        className="w-full h-60 xl:h-72 rounded-2xl shadow-lg"
                      />
                    </div>
                    <p className="text-white/90 text-base xl:text-lg text-center leading-relaxed">
                      Be part of active student communities across India. Learn,
                      laugh, and level up together.
                    </p>
                  </div>
                </div>
              </div>

              {/* Your Dost AI */}
              <div ref={bottomLeftCardRef} className="opacity-0 lg:opacity-0">
                <div
                  ref={bottomLeftBgRef}
                  className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 xl:p-6 flex flex-col border-2 border-white/40 shadow-lg"
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
                    className="flex flex-row items-center gap-4 xl:gap-6"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <img
                        src={robot}
                        alt="Your Dost AI"
                        className="w-32 xl:w-40 h-32 xl:h-40 object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-white text-xl xl:text-2xl font-extrabold mb-3 xl:mb-4">
                        Your Dost AI
                      </h3>
                      <p className="text-white/90 text-base xl:text-lg leading-relaxed">
                        Your <span className="font-bold">AI buddy</span> for
                        everything – from silly questions to serious career
                        advice, smarter than your group chat
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 - Phone Mockup */}
            <div className="flex flex-col justify-center">
              <div ref={phoneRef} className="opacity-0">
                <div className="relative flex flex-col items-center justify-center">
                  <img
                    src={iphone}
                    alt="iPhone Mockup"
                    className="w-[280px] xl:w-[320px] 2xl:w-[420px] h-auto drop-shadow-2xl z-10"
                  />
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6 xl:gap-8">
              {/* ST PRO Membership */}
              <div ref={topRightCardRef} className="opacity-0 lg:opacity-0">
                <div
                  ref={topRightBgRef}
                  className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 xl:p-6 flex flex-col border-2 border-white/40 shadow-lg items-center justify-center"
                  style={{
                    borderRadius: "16px",
                    border: "2px solid rgba(255,255,255,0.34)",
                    boxShadow:
                      "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                    background: "rgba(44,27,27,0.92)",
                  }}
                >
                  <div ref={topRightContentRef}>
                    <h3 className="text-white text-xl xl:text-2xl font-extrabold mb-4 xl:mb-6 text-center">
                      ST PRO Membership
                    </h3>
                    <p className="text-white/90 text-base xl:text-lg text-center leading-relaxed mb-2">
                      Exclusive opportunities, career events, expert sessions
                      <br />
                      &amp; priority invites – all for just{" "}
                      <span className="font-extrabold">₹299/month</span>.<br />
                      Totally worth it, 1000% yes!
                    </p>
                  </div>
                </div>
              </div>

              {/* Gigs & Star Connects */}
              <div ref={bottomRightCardRef} className="opacity-0 lg:opacity-0">
                <div
                  ref={bottomRightBgRef}
                  className="bg-[#2C1B1B]/80 backdrop-blur-lg h-[500px] xl:h-[550px] rounded-2xl p-4 xl:p-6 flex flex-col border-2 border-white/40 shadow-lg"
                  style={{
                    borderRadius: "16px",
                    border: "2px solid rgba(255,255,255,0.34)",
                    boxShadow:
                      "0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)",
                    background: "rgba(44,27,27,0.92)",
                  }}
                >
                  <div ref={bottomRightContentRef}>
                    <div className="w-full mb-4 xl:mb-6">
                      <AutoSlider
                        images={gigsImages}
                        currentIndex={gigsIndex}
                        className="w-full h-72 xl:h-80 rounded-2xl shadow-lg"
                      />
                    </div>
                    <h3 className="text-white text-xl xl:text-2xl font-extrabold mb-3 xl:mb-4 text-center">
                      Gigs & Star Connects
                    </h3>
                    <p className="text-white/90 text-base xl:text-lg text-center leading-relaxed">
                      Chill gigs, fun open mics, and star connects – vibe,
                      showcase your talent, and learn directly from the pros who
                      inspire.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
