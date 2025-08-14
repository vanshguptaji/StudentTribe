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

  useEffect(() => {
    const runAnimation = () => {
      setIsVisible(true);

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
      className="min-h-screen w-full bg-gradient-to-br from-[#b8001f] to-[#7a0015] overflow-hidden relative"
    >
      {/* Banner image top-right */}
      <img
        src={banner}
        alt="ST Beast Banner"
        className="absolute top-0 right-4 md:top-0 md:right-8 lg:top-0 lg:right-12 w-[20px] md:w-[30px] lg:w-[56px] h-auto z-30 select-none pointer-events-none"
        style={{ minWidth: "20px" }}
        loading="eager"
      />
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
              className="flex-1 py-4 text-center rounded-full transition-all duration-300 bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white border-none cursor-pointer text-lg hover:scale-105"
              onClick={() => navigate("/")}
            >
              Students
            </button>
            <button
              className="flex-1 py-4 text-center rounded-full transition-all duration-300 bg-transparent text-gray-300 border-none cursor-pointer text-lg hover:bg-[#b8001f] hover:text-white hover:scale-105"
              onClick={() => navigate("/brands")}
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
              className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 h-full flex flex-col border-2 border-white/40 shadow-lg min-h-[280px]"
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
                  <img
                    src={quizImg}
                    alt="Quiz"
                    className="w-full h-20 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <p className="text-white/90 text-xs text-center leading-relaxed">
                  Be part of active student communities across India.
                </p>
              </div>
            </div>
          </div>

          {/* ST PRO Membership */}
          <div className="">
            <div
              className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 h-full flex flex-col border-2 border-white/40 shadow-lg items-center justify-center min-h-[280px]"
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
              className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 h-full flex flex-col border-2 border-white/40 shadow-lg min-h-[280px]"
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
              className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-4 h-full flex flex-col border-2 border-white/40 shadow-lg min-h-[280px]"
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
                  <img
                    src={quizImg}
                    alt="Gigs"
                    className="w-full h-20 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <p className="text-white/90 text-xs text-center leading-relaxed">
                  Chill gigs, fun open mics, and star connects – vibe, showcase
                  your talent.
                </p>
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
                  <img
                    src={quizImg}
                    alt="Quiz"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <p className="text-white/90 text-lg text-center leading-relaxed">
                  Be part of active student communities across India. Learn,
                  laugh, and level up together.
                </p>
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
                  <img
                    src={quizImg}
                    alt="Gigs"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <p className="text-white/90 text-lg text-center leading-relaxed">
                  Chill gigs, fun open mics, and star connects – vibe, showcase
                  your talent, and learn directly from the pros who inspire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
