import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import robot from "../assets/BrandsSection/image 269.svg";
import iphone from "../assets/BrandsSection/iPhone.svg";
import quizImg from "../assets/BrandsSection/center.svg";

export default function StudentApp() {
  const [isVisible, setIsVisible] = useState(false);
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
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Create GSAP timeline for simultaneous animations
      const tl = gsap.timeline();
      
      // Set initial states
      gsap.set([phoneRef.current], { opacity: 0, y: 200 });
      gsap.set([topLeftCardRef.current, topRightCardRef.current, bottomLeftCardRef.current, bottomRightCardRef.current], { opacity: 0 });
      
      // Set initial scale for card backgrounds
      gsap.set([topLeftBgRef.current, topRightBgRef.current, bottomLeftBgRef.current, bottomRightBgRef.current], { 
        scale: 0,
        transformOrigin: "center center"
      });
      
      // Set initial positions for card content
      gsap.set(topLeftContentRef.current, { x: -200, y: -100, opacity: 0 });
      gsap.set(topRightContentRef.current, { x: 200, y: -100, opacity: 0 });
      gsap.set(bottomLeftContentRef.current, { x: -200, y: 100, opacity: 0 });
      gsap.set(bottomRightContentRef.current, { x: 200, y: 100, opacity: 0 });
      
      // Start animations simultaneously
      tl.to([topLeftCardRef.current, topRightCardRef.current, bottomLeftCardRef.current, bottomRightCardRef.current], {
        opacity: 1,
        duration: 0.1
      })
      .to([topLeftBgRef.current, topRightBgRef.current, bottomLeftBgRef.current, bottomRightBgRef.current], {
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1
      }, 0)
      .to(phoneRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }, 0.2)
      .to([topLeftContentRef.current, topRightContentRef.current, bottomLeftContentRef.current, bottomRightContentRef.current], {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.1
      }, 0.3);
      
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#b8001f] to-[#7a0015] overflow-hidden relative">
      {/* Header */}
      <div className="relative z-20 pt-16 text-center">
        <div className="text-white font-black text-6xl leading-none drop-shadow-lg tracking-tight">st.</div>
        <div className="text-white text-lg font-medium drop-shadow mb-8">Student Tribe</div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            Where Fun Meets Learning and New<br/>Connections
          </h1>
        </div>

      {/* Main Grid Layout - 2 rows, 3 columns, phone spans 2 rows */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-8 mb-16">
        {/* Communities & Daily Quizzes */}
        <div
          ref={topLeftCardRef}
          className="opacity-0"
          style={{ gridRow: '1', gridColumn: '1' }}
        >
          <div
            ref={topLeftBgRef}
            className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col border-2 border-white/40 shadow-lg"
            style={{
              borderRadius: '16px',
              border: '2px solid rgba(255,255,255,0.34)',
              boxShadow:
                '0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)',
              background: 'rgba(44,27,27,0.92)',
            }}
          >
            <div ref={topLeftContentRef}>
              <h3 className="text-white text-2xl font-extrabold mb-4 text-center">Communities & Daily Quizzes</h3>
              <div className="w-full mb-6">
                <img src={quizImg} alt="Quiz" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
              </div>
              <p className="text-white/90 text-lg text-center leading-relaxed">
                Be part of active student communities across India. Learn, laugh, and level up together.
              </p>
            </div>
          </div>
        </div>

        {/* Phone Mockup - spans 2 rows */}
        <div ref={phoneRef} className="opacity-0"
          style={{ gridRow: '1 / span 2', gridColumn: '2' }}>
          <div className="relative flex flex-col items-center justify-center h-full">
            <img src={iphone} alt="iPhone Mockup" className="w-[320px] md:w-[370px] lg:w-[420px] h-auto drop-shadow-2xl z-10" />
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
            </div>
          </div>
        </div>

        {/* ST PRO Membership */}
        <div ref={topRightCardRef} className="opacity-0"
          style={{ gridRow: '1', gridColumn: '3' }}>
          <div ref={topRightBgRef} className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col border-2 border-white/40 shadow-lg items-center justify-center"
            style={{
              borderRadius: '16px',
              border: '2px solid rgba(255,255,255,0.34)',
              boxShadow:
                '0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)',
              background: 'rgba(44,27,27,0.92)',
            }}
          >
            <div ref={topRightContentRef}>
              <h3 className="text-white text-2xl font-extrabold mb-6 text-center">ST PRO Membership</h3>
              <p className="text-white/90 text-lg text-center leading-relaxed mb-2">
                Exclusive opportunities, career events, expert sessions<br />
                &amp; priority invites – all for just <span className="font-extrabold">₹299/month</span>.<br />
                Totally worth it, 1000% yes!
              </p>
            </div>
          </div>
        </div>

        {/* Your Dost AI */}
        <div ref={bottomLeftCardRef} className="opacity-0"
          style={{ gridRow: '2', gridColumn: '1' }}>
          <div ref={bottomLeftBgRef} className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col border-2 border-white/40 shadow-lg"
            style={{
              borderRadius: '16px',
              border: '2px solid rgba(255,255,255,0.34)',
              boxShadow:
                '0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)',
              background: 'rgba(44,27,27,0.92)',
            }}
          >
            <div ref={bottomLeftContentRef} className="flex flex-row items-center h-full gap-6">
              <div className="flex-shrink-0 flex items-center justify-center h-full">
                <img src={robot} alt="Your Dost AI" className="w-40 h-40 object-contain" />
              </div>
              <div className="flex flex-col justify-center h-full">
                <h3 className="text-white text-2xl font-extrabold mb-4">Your Dost AI</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  Your <span className="font-bold">AI buddy</span> for everything – from silly questions to serious career advice, smarter than your group chat
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gigs & Star Connects */}
        <div ref={bottomRightCardRef} className="opacity-0"
          style={{ gridRow: '2', gridColumn: '3' }}
        >
          <div
            ref={bottomRightBgRef}
            className="bg-[#2C1B1B]/80 backdrop-blur-lg rounded-2xl p-6 h-full flex flex-col border-2 border-white/40 shadow-lg"
            style={{
              borderRadius: '16px',
              border: '2px solid rgba(255,255,255,0.34)',
              boxShadow:
                '0 2px 16px 2px rgba(255,255,255,0.45), 0 4px 24px 0 rgba(0,0,0,0.2)',
              background: 'rgba(44,27,27,0.92)',
            }}
          >
            <div ref={bottomRightContentRef}>
              <h3 className="text-white text-2xl font-extrabold mb-4 text-center">Gigs & Star Connects</h3>
              <div className="w-full mb-6">
                <img src={quizImg} alt="Gigs" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
              </div>
              <p className="text-white/90 text-lg text-center leading-relaxed">
                Chill gigs, fun open mics, and star connects – vibe, showcase your talent, and learn directly from the pros who inspire.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Right Side Label */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#2d1c1c] text-white font-bold text-xl px-4 py-8 rounded-l-xl tracking-widest flex items-center justify-center shadow-lg z-30" 
           style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
        ST APP
      </div>
    </div>
  );
}
