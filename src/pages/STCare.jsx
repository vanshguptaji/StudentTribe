import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import stcareBanner from "../assets/StCare/Frame 2147223325.svg"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const STCare = () => {
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
    const tl = gsap.timeline();

    // Set initial states
    gsap.set([leftImageRef.current, rightContentRef.current, rightImage1Ref.current, rightImage2Ref.current, buttonRef.current, bottomTextRef.current, overwhelmedParaRef.current], {
      opacity: 0
    });
    
    gsap.set(headingRef.current, {
      x: 0,
      y: 0,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 50
    });
    
    gsap.set(subheadingRef.current, {
      x: 0,
      y: 0,
      position: 'absolute',
      top: '55%',
      left: '50%',
      transform: 'translate(-50%, -40%)',
      zIndex: 50
    });

    gsap.set(leftImageRef.current, { x: -400 });
    gsap.set(rightContentRef.current, { x: 400 });
    gsap.set(rightImage1Ref.current, { scale: 0 });
    gsap.set(rightImage2Ref.current, { x: 300 });
    gsap.set(buttonRef.current, { y: -500 }); // Button starts from top of screen
    gsap.set(bottomTextRef.current, { y: -500 }); // Bottom text starts from top of screen
    gsap.set(overwhelmedParaRef.current, { y: -500 }); // Overwhelmed para starts from top of screen

    // Animation sequence
    tl.to([headingRef.current, subheadingRef.current], {
      delay: 2,
      duration: 1.5,
      position: 'relative',
      top: '10',
      left: 'auto',
      transform: 'none',
      ease: "power2.out"
    })
    .to(leftImageRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power3.out"
    }, 2) // Start at same time as headings
    .to(rightContentRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power3.out"
    }, 2) // Start at same time as headings
    .to(rightImage1Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "back.out(1.7)"
    }, 2) // Start at same time as headings
    .to(rightImage2Ref.current, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power3.out"
    }, 2) // Start at same time as headings
    .to([buttonRef.current, bottomTextRef.current, overwhelmedParaRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1
    }, "+=0.1"); // Start 0.1 seconds after other animations complete

  }, []);
  return (
    <div className="min-h-screen bg-rose-100 relative overflow-hidden">
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

      {/* ST CARE vertical text */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center z-20">
        <h2 className="text-gray-800 font-bold text-2xl tracking-wider">ST CARE</h2>
      </div>

      {/* Main content container */}
      <div className="relative z-10 px-8 py-12 max-w-6xl mx-auto">
        
        {/* Header section */}
        <div className="text-center mb-12">
          {/* ST logo */}
          <div className="mb-8">
            <span className="text-5xl font-bold text-red-700 px-4 py-2">st.</span>
            <p className="text-red-700 text-lg mt-2 font-medium">Student Tribe</p>
          </div>
        </div>

        {/* Main content section - Two main flex sections */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-12">
          {/* Left side - Assembly image */}
          <div className="flex-1">
            <h1 ref={headingRef} className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 text-center">
                Feeling Stuck?
            </h1>
            <h2 ref={subheadingRef} className="text-2xl lg:text-3xl font-semibold text-center text-gray-700 mb-6">
              You're Not Alone — We're Here.
            </h2>
            <div ref={leftImageRef} className="relative overflow-hidden shadow-2xl opacity-0">
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
                <p ref={overwhelmedParaRef} className="opacity-0">Overwhelmed? Anxious? Confused? You're safe here. We provide supportive conversations, judgment-free care, and guidance to help you build emotional strength.</p>
                
                <div className="flex items-center gap-3 mt-6">
                  <span className="text-xl font-medium text-gray-800">Because mental health matters.</span>
                </div>
              </div>
            </div>

            {/* Right side divided into two columns for images */}
            <div className="flex gap-6">
              {/* Left column in right section */}
              <div className="flex-1">
                {/* Community image 1 */}
                <div ref={rightImage1Ref} className="relative rounded-2xl overflow-hidden shadow-2xl mb-6 opacity-0">
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop"
                    alt="Community gathering"
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                {/* Call to action button below left image */}
                <button
                  ref={buttonRef}
                  className="bg-red-800 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-red-700 transition-colors text-sm shadow-lg w-full justify-center opacity-0"
                >
                  Feel Heard. Find Strength.
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Right column in right section */}
              <div className="flex-1">
                {/* Community image 2 */}
                <div ref={rightImage2Ref} className="relative rounded-2xl overflow-hidden shadow-2xl opacity-0">
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
        <div ref={bottomTextRef} className="text-center mt-8 opacity-0">
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            From oversized fits that scream confidence to punchlines that rep your vibe — this drop is all about you.
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
  );
};

export default STCare;
