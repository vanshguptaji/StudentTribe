import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainScreen from "./MainScreen";
import BrandsScreen from "./BrandsScreen";
import StudentApp from "./StudentApp";
import STEvents from "./STEvents";
import STbeast from "./STbeast";
import STCare from "./STCare";
import WhoweAre from "./WhoweAre";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SinglePageLayout = () => {
  const containerRef = useRef(null);
  const mainRef = useRef(null);
  const brandsRef = useRef(null);
  const appRef = useRef(null);
  const eventsRef = useRef(null);
  const beastRef = useRef(null);
  const careRef = useRef(null);
  const aboutRef = useRef(null);

  // Function to trigger section animation
  const triggerSectionAnimation = (sectionRef, sectionName) => {
    if (sectionRef.current) {
      // Reset and trigger animation based on section type
      gsap.set(sectionRef.current, { opacity: 0, y: 50 });
      gsap.to(sectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      });

      // Trigger specific animations for each section
      const event = new CustomEvent('triggerSectionAnimation', { 
        detail: { sectionName } 
      });
      window.dispatchEvent(event);
    }
  };

  useEffect(() => {
    // Listen for navbar clicks to restart animations
    const handleNavbarClick = (event) => {
      const sectionId = event.detail?.sectionId;
      if (sectionId) {
        setTimeout(() => {
          switch (sectionId) {
            case 'main-section':
              triggerSectionAnimation(mainRef, 'main');
              break;
            case 'brands-section':
              triggerSectionAnimation(brandsRef, 'brands');
              break;
            case 'app-section':
              triggerSectionAnimation(appRef, 'app');
              break;
            case 'events-section':
              triggerSectionAnimation(eventsRef, 'events');
              break;
            case 'beast-section':
              triggerSectionAnimation(beastRef, 'beast');
              break;
            case 'care-section':
              triggerSectionAnimation(careRef, 'care');
              break;
            case 'about-section':
              triggerSectionAnimation(aboutRef, 'about');
              break;
          }
        }, 500); // Small delay to ensure scroll is complete
      }
    };

    window.addEventListener('navbarClick', handleNavbarClick);

    return () => {
      window.removeEventListener('navbarClick', handleNavbarClick);
    };
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger on component mount
    ScrollTrigger.refresh();

    // Create scroll-triggered animations for each section
    const sections = [
      { ref: mainRef, component: "MainScreen" },
      { ref: brandsRef, component: "BrandsScreen" },
      { ref: appRef, component: "StudentApp" },
      { ref: eventsRef, component: "STEvents" },
      { ref: beastRef, component: "STbeast" },
      { ref: careRef, component: "STCare" },
      { ref: aboutRef, component: "WhoweAre" }
    ];

    sections.forEach((section, index) => {
      if (section.ref.current) {
        // Set initial state for each section
        gsap.set(section.ref.current, {
          opacity: 0,
          y: 100
        });

        // Create scroll trigger for each section
        ScrollTrigger.create({
          trigger: section.ref.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            gsap.to(section.ref.current, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out"
            });
          },
          onLeave: () => {
            gsap.to(section.ref.current, {
              opacity: 0.3,
              duration: 0.5
            });
          },
          onEnterBack: () => {
            gsap.to(section.ref.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(section.ref.current, {
              opacity: 0.3,
              duration: 0.5
            });
          }
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {/* Main/Landing Section */}
      <section ref={mainRef} className="min-h-screen w-full" id="main-section">
        <MainScreen />
      </section>

      {/* Brands Section */}
      <section ref={brandsRef} className="min-h-screen w-full" id="brands-section">
        <BrandsScreen />
      </section>

      {/* Student App Section */}
      <section ref={appRef} className="min-h-screen w-full" id="app-section">
        <StudentApp />
      </section>

      {/* Events Section */}
      <section ref={eventsRef} className="min-h-screen w-full" id="events-section">
        <STEvents />
      </section>

      {/* Beast Section */}
      <section ref={beastRef} className="min-h-screen w-full" id="beast-section">
        <STbeast />
      </section>

      {/* Care Section */}
      <section ref={careRef} className="min-h-screen w-full" id="care-section">
        <STCare />
      </section>

      {/* About/Who We Are Section */}
      <section ref={aboutRef} className="min-h-screen w-full" id="about-section">
        <WhoweAre />
      </section>
    </div>
  );
};

export default SinglePageLayout;
