import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-transparent mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-[#2C1B1B]/90 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-start md:justify-between relative overflow-hidden">
          {/* Left: Join Community */}
          <div className="mb-10 md:mb-0 md:w-1/3 flex flex-col justify-center">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Want to join our<br />community?</h2>
            <button className="bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 text-lg w-fit mb-2">
              Contact US <span className="ml-2">→</span>
            </button>
          </div>
          {/* Center: Explore & Socials */}
          <div className="flex-1 flex flex-col md:flex-row md:justify-between gap-10 md:gap-20">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Explore</h4>
              <ul className="text-white/80 space-y-2 text-base">
                <li><Link to="/">ST SCHOOL</Link></li>
                <li><Link to="/app">ST APP</Link></li>
                <li><Link to="/brands">ST EVENTS</Link></li>
                <li><Link to="/beast">ST BEAST</Link></li>
                <li><Link to="/care">ST CARE</Link></li>
                <li><Link to="/about">WHO WE ARE</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Socials</h4>
              <div className="flex gap-4 text-white/80 text-2xl">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Contact Info</h4>
              <ul className="text-white/80 space-y-2 text-base">
                <li><span className="mr-2">📧</span>hello@stschool.com</li>
                <li><span className="mr-2">📞</span>+91 9876543210</li>
                <li><span className="mr-2">📍</span>Hyderabad, Telangana, India</li>
              </ul>
            </div>
          </div>
          {/* Large Student Tribe watermark */}
          <div className="absolute bottom-0 left-0 text-[7vw] md:text-[5vw] font-black text-[#b8001f] opacity-20 select-none pointer-events-none leading-none" style={{zIndex:0}}>
            Student Tribe
          </div>
        </div>
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-[#2d1c1c] text-xs md:text-sm gap-2">
          <div className="flex gap-4">
            <Link to="/privacy">PRIVACY POLICY</Link>
            <Link to="/terms">TERMS & CONDITIONS</Link>
          </div>
          <div className="opacity-80">© 2025 Student Tribe. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
