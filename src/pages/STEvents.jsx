import React, { useState, useEffect, useRef } from 'react';
import banner from '../assets/StEvent/banner.svg';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function STEvents() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('Students');
  
  // Refs for GSAP animations
  const containerRef = useRef(null);
  const mainSliderRef = useRef(null);
  const bottomSliderRef = useRef(null);
  const textContentRef = useRef(null);
  const buttonsRef = useRef(null);

  // Sample images for the slider - using placeholder images that represent the content
  const sliderImages = [
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop'
  ];

  // Create infinite loop by duplicating images
  const infiniteImages = [...sliderImages, ...sliderImages, ...sliderImages];

  // Auto-slide functionality for endless movement
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Reset position seamlessly when reaching the end
  useEffect(() => {
    if (currentSlide >= sliderImages.length * 2) {
      setTimeout(() => {
        setCurrentSlide(sliderImages.length);
      }, 500);
    }
  }, [currentSlide, sliderImages.length]);

  // GSAP Animation Timeline with ScrollTrigger
  useEffect(() => {
    if (containerRef.current) {
      // Set initial positions
      gsap.set(mainSliderRef.current, { x: -window.innerWidth, opacity: 0 });
      gsap.set(bottomSliderRef.current, { x: window.innerWidth, opacity: 0 });
      gsap.set(textContentRef.current, { y: -100, opacity: 0 });
      gsap.set(buttonsRef.current, { y: -50, opacity: 0 });
      
      // Create scroll-triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      tl.to(mainSliderRef.current, { 
        x: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "power3.out" 
      }, 0)
      .to(bottomSliderRef.current, { 
        x: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "power3.out" 
      }, 0)
      .to(textContentRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out" 
      }, 0)
      .to(buttonsRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out" 
      }, 0.2);

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-rose-100 relative overflow-hidden" id="events-section">
      {/* Banner image top-right */}
      <img
        src={banner}
        alt="ST Beast Banner"
        className="absolute top-0 right-4 md:top-0 md:right-8 lg:top-0 lg:right-12 w-[20px] md:w-[30px] lg:w-[56px] h-auto z-30 select-none pointer-events-none"
        style={{ minWidth: '20px' }}
        loading="eager"
      />

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="logo-container">
            <div className="text-red-600 font-black text-6xl leading-none drop-shadow-lg tracking-tight">
              st.
            </div>
            <div className="text-gray-800 text-lg font-medium drop-shadow mb-4">
              Student Tribe
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <div ref={textContentRef} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Say Goodbye to FOMO. Step Into the Action.
          </h1>
          {/* Description Text */}
          <p className="text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
            Vibrant cultural fests, insightful workshops, creative jams — discover
            experiences that are unforgettable and student-powered.
          </p>
        </div>

        {/* Image Slider */}
        <div ref={mainSliderRef} className="relative mb-8">
          <div className="flex justify-center space-x-4 overflow-hidden">
            <div 
              className="flex space-x-4 transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${(currentSlide % sliderImages.length) * 280}px)`,
                width: `${infiniteImages.length * 280}px`
              }}
            >
              {infiniteImages.map((image, index) => {
                const relativeIndex = index - currentSlide;
                let className = "w-64 h-40 rounded-lg object-cover transition-all duration-500 ease-in-out flex-shrink-0 ";
                
                if (relativeIndex === 0) {
                  className += "scale-100 opacity-100 z-10";
                } else if (Math.abs(relativeIndex) === 1) {
                  className += "scale-90 opacity-80 z-5";
                } else if (Math.abs(relativeIndex) === 2) {
                  className += "scale-75 opacity-60 z-0";
                } else {
                  className += "scale-50 opacity-30 z-0";
                }

                return (
                  <div key={`infinite-${index}`} className="relative flex-shrink-0">
                    <img
                      src={image}
                      alt={`Event ${(index % sliderImages.length) + 1}`}
                      className={className}
                    />
                    {/* Red overlay for some images to match the design */}
                    <div className="absolute inset-0 bg-red-600 bg-opacity-20 rounded-lg"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Action Buttons */}
        <div ref={buttonsRef} className="flex justify-center space-x-4 sm:space-x-6">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-8 sm:py-4 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base">
            <span>Register now</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-8 sm:py-4 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base">
            <span>Host an Event</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Image Row */}
        <div ref={bottomSliderRef} className="mt-16 flex justify-center space-x-4 overflow-hidden">
          {sliderImages.slice(0, 5).map((image, index) => (
            <div key={`bottom-${index}`} className="relative">
              <img
                src={image}
                alt={`Bottom event ${index + 1}`}
                className="w-48 h-32 rounded-lg object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index + sliderImages.length)}
            className={`w-4 h-4 sm:w-3 sm:h-3 rounded-full border-2 border-white focus:outline-none transition-all duration-300 shadow-md ${
              (currentSlide % sliderImages.length) === index ? 'bg-red-600 scale-110' : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
}