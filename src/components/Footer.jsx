import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const navItems = [
    { id: "ST School", label: "ST SCHOOL", sectionId: "main-section" },
    { id: "ST App", label: "ST APP", sectionId: "app-section" },
    { id: "ST Events", label: "ST EVENTS", sectionId: "events-section" },
    { id: "ST Beast", label: "ST BEAST", sectionId: "beast-section" },
    { id: "ST Care", label: "ST CARE", sectionId: "care-section" },
    { id: "Who We Are", label: "WHO WE ARE", sectionId: "about-section" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer className="w-full bg-[#efd1d6]">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8 md:py-12 relative">
        {/* Footer navigation buttons */}
        <div
          className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-4 sm:mb-6 md:mb-8"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.sectionId)}
              className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold bg-[#2C1B1B] text-white hover:bg-[#b8001f] hover:text-white transition-all duration-200 shadow whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className=" rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-24 flex flex-col lg:flex-row lg:items-start lg:justify-between relative overflow-hidden min-h-[500px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[490px]"
        style={{
            background: 'radial-gradient(circle at center center, rgb(95,23,40) 0%, rgb(82,5,27) 20%, rgb(70,6,26) 40%, rgb(50,0,11) 60%, rgb(40,1,11) 85%)'
          }}>
          {/* Left: Join Community */}
          <div className="mb-6 sm:mb-8 lg:mb-0 lg:w-1/3 flex flex-col justify-center">
            <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold mb-3 sm:mb-4 md:mb-6 leading-tight">
              <span className="whitespace-nowrap">Want to join our</span>
              <br />
              <span className="whitespace-nowrap">community?</span>
            </h2>
            <button className="bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white font-bold px-4 sm:px-5 md:px-7 py-2 sm:py-3 rounded-full flex items-center gap-2 text-sm sm:text-base md:text-lg w-fit mb-2">
              <span className="whitespace-nowrap">Contact US</span>
              <span className="ml-2">→</span>
            </button>
          </div>

          {/* Center: Explore & Socials */}
          <div className="flex-1 flex flex-col sm:flex-row lg:justify-between gap-4 sm:gap-6 lg:gap-20">
            <div className="min-w-0">
              <h4 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4 whitespace-nowrap">
                Explore
              </h4>
              <ul className="text-white/80 space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
                <li className="whitespace-nowrap">
                  <Link to="/" className="hover:text-white transition-colors">
                    ST SCHOOL
                  </Link>
                </li>
                <li className="whitespace-nowrap">
                  <Link
                    to="/app"
                    className="hover:text-white transition-colors"
                  >
                    ST APP
                  </Link>
                </li>
                <li className="whitespace-nowrap">
                  <Link
                    to="/brands"
                    className="hover:text-white transition-colors"
                  >
                    ST EVENTS
                  </Link>
                </li>
                <li className="whitespace-nowrap">
                  <Link
                    to="/beast"
                    className="hover:text-white transition-colors"
                  >
                    ST BEAST
                  </Link>
                </li>
                <li className="whitespace-nowrap">
                  <Link
                    to="/care"
                    className="hover:text-white transition-colors"
                  >
                    ST CARE
                  </Link>
                </li>
                <li className="whitespace-nowrap">
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    WHO WE ARE
                  </Link>
                </li>
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4 whitespace-nowrap">
                Socials
              </h4>
              <div className="flex gap-3 sm:gap-4 text-white/80 text-xl sm:text-2xl">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-white transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-white transition-colors"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="hover:text-white transition-colors"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            <div className="min-w-0">
              <h4 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4 whitespace-nowrap">
                Contact Info
              </h4>
              <ul className="text-white/80 space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
                <li className="whitespace-nowrap">
                  <span className="mr-2">📧</span>hello@stschool.com
                </li>
                <li className="whitespace-nowrap">
                  <span className="mr-2">📞</span>+91 9876543210
                </li>
                <li className="flex items-start">
                  <span className="mr-2 flex-shrink-0">📍</span>
                  <span className="whitespace-nowrap">
                    Hyderabad, Telangana, India
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Large Student Tribe watermark - responsive sizing */}
          <div className="absolute inset-0 w-full h-full flex items-end justify-center pointer-events-none select-none z-0">
            <span className="absolute -bottom-2 sm:-bottom-2 md:-bottom-2 lg:-bottom-6 w-full text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-[#840000] leading-none whitespace-nowrap tracking-[0.05em] sm:tracking-[0.08em] md:tracking-[0.12em]">
              Student Tribe
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col xs:flex-row justify-between items-center mt-4 sm:mt-6 md:mt-8 text-[#2d1c1c] text-[10px] xs:text-xs sm:text-sm gap-2">
          <div className="flex gap-2 xs:gap-4">
            <Link
              to="/privacy"
              className="whitespace-nowrap hover:text-[#b8001f] transition-colors"
            >
              PRIVACY POLICY
            </Link>
            <Link
              to="/terms"
              className="whitespace-nowrap hover:text-[#b8001f] transition-colors"
            >
              TERMS & CONDITIONS
            </Link>
          </div>
          <div className="opacity-80 whitespace-nowrap text-center xs:text-right">
            © 2025 Student Tribe. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
