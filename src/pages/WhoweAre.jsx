import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bg from "../assets/whoweare/Frame 2147223304.svg"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function WhoweAre() {
  const [activeTab, setActiveTab] = useState('Students');
  const [displayNumber, setDisplayNumber] = useState('0');
  const [typewriterText1, setTypewriterText1] = useState('');
  const [typewriterText2, setTypewriterText2] = useState('');
  const [typewriterText3, setTypewriterText3] = useState('');
  
  // Refs for GSAP animations
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const tabsRef = useRef(null);
  const zeroRef = useRef(null);
  const textContentRef = useRef(null);
  const sideTextRef = useRef(null);
  const numberRef = useRef({ value: 0 });
  const typewriter1Ref = useRef(null);
  const typewriter2Ref = useRef(null);
  const typewriter3Ref = useRef(null);

  // Sample images for the zero shape
  const zeroImages = [
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop',
  ];

  // Typewriter function
  const typeWriter = (text, setter, duration = 1) => {
    return {
      duration: duration,
      onUpdate: function() {
        const progress = this.progress();
        const currentLength = Math.floor(progress * text.length);
        setter(text.substring(0, currentLength));
      }
    };
  };

  // GSAP Animation Timeline with ScrollTrigger
  useEffect(() => {
    const runAnimation = () => {
      // Set initial positions
      gsap.set([logoRef.current, tabsRef.current], { y: -50, opacity: 0 });
      gsap.set(zeroRef.current, { scale: 0, opacity: 0 });
      gsap.set(textContentRef.current, { y: 50, opacity: 0 });
      gsap.set(sideTextRef.current, { opacity: 0 });
      gsap.set([typewriter1Ref.current, typewriter2Ref.current, typewriter3Ref.current], { opacity: 0 });

      // Reset typewriter texts
      setTypewriterText1('');
      setTypewriterText2('');
      setTypewriterText3('');
      setDisplayNumber('0');
      numberRef.current.value = 0;

      const tl = gsap.timeline();

      // Animate all elements in sequence (faster timings)
      tl.to([logoRef.current, tabsRef.current], {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        stagger: 0.05
      }, 0)
        .to(sideTextRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        }, 0.2)
        .to([typewriter1Ref.current, typewriter2Ref.current, typewriter3Ref.current], {
          opacity: 1,
          duration: 0.01
        }, 0.5)
        .to({}, {
          ...typeWriter("We Tuned", setTypewriterText1, 0.7),
          ease: "none"
        }, 0.6)
        .to(zeroRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, 1.3)
        .to(numberRef.current, {
          value: 25000,
          duration: 0.7,
          ease: "power2.out",
          onUpdate: () => {
            const currentValue = Math.floor(numberRef.current.value);
            if (currentValue >= 1000) {
              setDisplayNumber(`${Math.floor(currentValue / 1000)}k`);
            } else {
              setDisplayNumber(currentValue.toString());
            }
          }
        }, 1.5)
        .to({}, {
          ...typeWriter("Students,", setTypewriterText2, 0.4),
          ease: "none"
        }, 2.3)
        .to({}, {
          ...typeWriter("and still counting ...", setTypewriterText3, 0.7),
          ease: "none"
        }, 2.8)
        .to(textContentRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        }, 3.5);
    };

    if (containerRef.current) {
      // Set initial positions
      gsap.set([logoRef.current, tabsRef.current], { y: -50, opacity: 0 });
      gsap.set(zeroRef.current, { scale: 0, opacity: 0 });
      gsap.set(textContentRef.current, { y: 50, opacity: 0 });
      gsap.set(sideTextRef.current, { opacity: 0 });
      gsap.set([typewriter1Ref.current, typewriter2Ref.current, typewriter3Ref.current], { opacity: 0 });
      
      // Typewriter function
      const typeWriter = (text, setter, duration = 1) => {
        return {
          duration: duration,
          onUpdate: function() {
            const progress = this.progress();
            const currentLength = Math.floor(progress * text.length);
            setter(text.substring(0, currentLength));
          }
        };
      };

      // Create scroll trigger for about section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: runAnimation
      });

      // Listen for manual animation triggers
      const handleAnimationTrigger = (event) => {
        if (event.detail?.sectionName === 'about') {
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

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg- relative overflow-hidden"
      id="about-section"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Side Text Elements */}
      <div ref={sideTextRef} className="absolute right-0 top-1/2 transform -translate-y-1/2 rotate-90 text-white font-bold text-lg tracking-widest z-10">
        WHO WE ARE
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-5">
        {/* Header with Logo */}
        <div ref={logoRef} className="text-center mb-8">
          <div className="logo-container">
            <div className="text-white font-black text-6xl leading-none drop-shadow-lg tracking-tight">
              st.
            </div>
            <div className="text-red-200 text-lg font-medium drop-shadow mb-4">
              Student Tribe
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Typewriter Text Above Number */}
          <div ref={typewriter1Ref} className="text-white text-4xl md:text-6xl font-bold tracking-wide">
            {typewriterText1}
            <span className="animate-pulse text-red-400">|</span>
          </div>

          {/* Large Number with Images */}
          <div ref={zeroRef} className="flex justify-center">
            <div className="relative">
              {/* Large Number Background */}
              <div 
                className="text-[25rem] md:text-[20rem] font-black text-transparent bg-clip-text bg-center bg-contain leading-none"
                style={{ 
                  backgroundImage: `url(${zeroImages[0]})`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}
              >
                {displayNumber}
              </div>
              
              {/* Image Grid Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-2 w-48 h-64">
                  {zeroImages.map((image, index) => (
                    <div key={index} className="relative">
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typewriter Text Below Number */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <div ref={typewriter2Ref} className="text-white text-3xl md:text-5xl font-bold">
                {typewriterText2}
                {typewriterText2 && typewriterText2.length > 0 && !typewriterText3 && (
                  <span className="animate-pulse text-red-400">|</span>
                )}
              </div>
              <div ref={typewriter3Ref} className="text-red-300 text-2xl md:text-4xl font-medium">
                {typewriterText3}
                {typewriterText3 && typewriterText3.length > 0 && (
                  <span className="animate-pulse text-red-400">|</span>
                )}
              </div>
            </div>
          </div>

          {/* Text Content Below */}
          <div ref={textContentRef} className="text-white space-y-6 max-w-3xl">
            <div className="text-xl leading-relaxed">
              We are India's largest and fastest growing student community, 
              connecting <span className="text-red-300 font-bold">25,000+</span> students across the nation through 
              innovative platforms and experiences.
            </div>
            <div className="text-lg text-red-200">
              Join thousands of students who are already part of our vibrant ecosystem.
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-black to-transparent"></div>
      </div>
    </div>
  );
}

export default WhoweAre;