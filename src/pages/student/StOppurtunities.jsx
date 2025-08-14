import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import stlogo from "../../assets/White logo.png";

const StOpportunities = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const hideButtonsTimeoutRef = useRef(null);

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
    <div className="min-h-screen bg-gradient-to-bl to-[#b8001f] from-[#7a0015] text-white relative overflow-hidden">
      {/* ST Logo at Top */}
      <div className="absolute top-6 md:top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div
          className="logo-container group inline-block cursor-pointer relative mb-8"
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
              className="flex-1 py-3 md:py-4 text-center rounded-full transition-all duration-300 bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white border-none cursor-pointer text-base md:text-lg hover:scale-105"
              onClick={() => navigate("/")}
            >
              Students
            </button>
            <button
              className="flex-1 py-3 md:py-4 text-center rounded-full transition-all duration-300 bg-transparent text-gray-300 border-none cursor-pointer text-base md:text-lg hover:bg-[#b8001f] hover:text-white hover:scale-105"
              onClick={() => navigate("/brands")}
            >
              Brands
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid with shifting */}
      <div
        className="flex items-center justify-center min-h-screen px-4 md:px-8 transition-transform duration-500"
        style={{
          transform: showButtons ? "translateY(80px)" : "translateY(0)",
        }}
      >
        {/* Mobile Layout */}
        <div className="lg:hidden w-full max-w-md mx-auto">
          {/* Title */}

          {/* Mobile Grid - 2x2 */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* INTERNSHIPS Card */}
            <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
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
            <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
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
            <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
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
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6">
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
                <span className="text-3xl text-white/30 absolute -top-1 -left-1">
                  "
                </span>
                <p className="text-white text-sm leading-relaxed ml-3">
                  Find it all here — workshops, internships, and job openings
                  that kick-start your career.
                </p>
                <span className="text-3xl text-white/30 absolute -bottom-3 -right-1">
                  "
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div
          className="hidden lg:grid grid-cols-3 gap-6 max-w-7xl w-full"
          style={{ height: "500px" }}
        >
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Top Left Card - INTERNSHIPS */}
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg">
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

            {/* Bottom Left Card - Description */}
            <div className="flex-1 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center">
              <p className="text-white text-base leading-relaxed text-center">
                Find it all here — workshops, internships, and job openings that
                kick-start your career. Get real-world exposure, build skills,
                and land roles that turn effort into pride and recognition.
              </p>
            </div>
          </div>

          {/* Center Column - Tall Image */}
          <div className="relative">
            <div className="h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
                alt="Center workplace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-bold">JOB OPENINGS</h3>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Top Right Card - Testimonial */}
            <div className="flex-1 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b390?auto=format&fit=crop&w=100&q=80"
                    alt="Dharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-white text-lg font-medium">Dharma</h4>
              </div>
              <div className="relative">
                <span className="text-4xl text-white/30 absolute -top-2 -left-1">
                  "
                </span>
                <p className="text-white text-sm leading-relaxed ml-4">
                  Find it all here — workshops, internships, and job openings
                  that kick-start your career.
                </p>
                <span className="text-4xl text-white/30 absolute -bottom-4 -right-1">
                  "
                </span>
              </div>
            </div>

            {/* Bottom Right Card - VOLUNTEER WORKS */}
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg">
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
