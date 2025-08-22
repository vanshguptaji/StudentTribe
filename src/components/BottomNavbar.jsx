import React, { useState, useEffect, useRef } from 'react';

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [splashActive, setSplashActive] = useState(true);
  const observerRef = useRef(null);
  const sectionsObserverRef = useRef(null);

  // Hide navbar during splash screen animation
  useEffect(() => {
    setSplashActive(true);

    const splashTimer = setTimeout(() => {
      setSplashActive(false);
    }, 6700);

    const handleSplashEnd = () => {
      setSplashActive(false);
    };

    const handleSplashFadeStart = () => {
      setTimeout(() => {
        setSplashActive(false);
      }, 700);
    };

    window.addEventListener('splashScreenEnd', handleSplashEnd);
    window.addEventListener('splashScreenFadeStart', handleSplashFadeStart);

    return () => {
      clearTimeout(splashTimer);
      window.removeEventListener('splashScreenEnd', handleSplashEnd);
      window.removeEventListener('splashScreenFadeStart', handleSplashFadeStart);
    };
  }, []);

  // Hide navbar when footer is visible
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new window.IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    observerRef.current.observe(footer);
    return () => observerRef.current && observerRef.current.disconnect();
  }, []);

  // Navigation items matching your actual page structure
  const navItems = [
    { id: 'ST School', label: 'St. School', sectionId: 'brands-section' },
    { id: 'ST App', label: 'St. App', sectionId: 'app-section' },
    { id: 'ST Opportunities', label: 'St. Opportunities', sectionId: 'opportunities-section' },
    { id: 'ST Events', label: 'St. Events', sectionId: 'events-section' },
    { id: 'ST Beast', label: 'St. Beast', sectionId: 'beast-section' },
    { id: 'ST Care', label: 'St. Care', sectionId: 'care-section' },
    { id: 'Who We Are', label: 'Who We Are', sectionId: 'about-section' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleTabClick = (item) => {
    setActiveTab(item.id);
    scrollToSection(item.sectionId);
    setIsOpen(false);

    // Dispatch custom event to trigger section animations (preserve existing functionality)
    const event = new CustomEvent('navbarClick', { 
      detail: { sectionId: item.sectionId } 
    });
    window.dispatchEvent(event);
  };

  // Use Intersection Observer for more reliable section detection
  useEffect(() => {
    // Disable scroll triggers for small screens
    if (window.innerWidth <= 768) return;
    // Clean up previous observer
    if (sectionsObserverRef.current) {
      sectionsObserverRef.current.disconnect();
    }

    // Create a map to track visibility of each section
    const sectionVisibility = new Map();

    // Create intersection observer
    sectionsObserverRef.current = new IntersectionObserver(
      (entries) => {
        // ...existing code...
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          const navItem = navItems.find(item => item.sectionId === sectionId);

          if (navItem) {
            sectionVisibility.set(navItem.id, {
              ratio: entry.intersectionRatio,
              isIntersecting: entry.isIntersecting,
              boundingRect: entry.boundingClientRect
            });
          }
        });

        // ...existing code...
        let mostVisibleSection = null;
        let highestVisibility = 0;

        sectionVisibility.forEach((visibility, sectionId) => {
          if (visibility.isIntersecting && visibility.ratio > highestVisibility) {
            highestVisibility = visibility.ratio;
            mostVisibleSection = sectionId;
          }
        });

        // ...existing code...
        if (!mostVisibleSection || highestVisibility < 0.1) {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;

          // Check if we're at the very top
          if (scrollY < 200) {
            setActiveTab(null);
            return;
          }

          // Fallback: find section closest to viewport center
          let closestSection = null;
          let minDistance = Infinity;

          navItems.forEach((item) => {
            const element = document.getElementById(item.sectionId);
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;
            const distance = Math.abs(elementCenter - viewportCenter);

            // Only consider if section is at least partially visible
            if (rect.bottom > 0 && rect.top < windowHeight && distance < minDistance) {
              minDistance = distance;
              closestSection = item.id;
            }
          });

          mostVisibleSection = closestSection;
        }

        // ...existing code...
        setActiveTab(prevActive => {
          if (prevActive !== mostVisibleSection) {
            return mostVisibleSection;
          }
          return prevActive;
        });
      },
      {
        root: null,
        rootMargin: '-10% 0px -10% 0px', // Give some margin for better detection
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] // Multiple thresholds for better accuracy
      }
    );

    // ...existing code...
    const elementsToObserve = [];
    navItems.forEach((item) => {
      const element = document.getElementById(item.sectionId);
      if (element) {
        sectionsObserverRef.current.observe(element);
        elementsToObserve.push(element);
      } else {
        console.warn(`Section with ID "${item.sectionId}" not found`);
      }
    });

    // ...existing code...
    return () => {
      if (sectionsObserverRef.current) {
        elementsToObserve.forEach(element => {
          sectionsObserverRef.current.unobserve(element);
        });
        sectionsObserverRef.current.disconnect();
      }
    };
  }, [splashActive]); // Re-run when splash screen ends

  // Additional scroll listener for edge cases
  useEffect(() => {
    // Disable scroll listener for small screens
    if (window.innerWidth <= 768) return;

    // ...existing code...
    let scrollTimeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        // Handle very top of page
        if (scrollY < 100) {
          setActiveTab(null);
          return;
        }

        // Handle bottom of page
        if (scrollY + windowHeight >= documentHeight - 50) {
          // Set to last section
          const lastItem = navItems[navItems.length - 1];
          setActiveTab(lastItem.id);
          return;
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    setTimeout(handleScroll, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [splashActive]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-navbar')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);


  if (footerVisible || splashActive) return null;

  return (
    <>
      {/* Desktop Navbar (hidden on mobile) */}
      <div className="fixed justify-center items-center bottom-0 left-0 right-0 z-50 hidden lg:flex">
        <div className="max-w-7xl bg-black/90 rounded-full mx-4 mb-2 overflow-hidden shadow-2xl p-2" style={{ backdropFilter: 'blur(61.83246994018555px)' }}>
          <div className="flex justify-between gap-2 items-center px-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={`px-4 py-2 rounded-full text-base font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === item.id
                    ? 'text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                style={activeTab === item.id ? {
                  background: 'linear-gradient(90deg, rgba(206, 32, 47, 0.2) 0%, rgba(206, 32, 47, 0.6) 50%, rgba(206, 32, 47, 0.2) 100%)',
                  backdropFilter: 'blur(61.83246994018555px)',
                  boxShadow: '0 0 20px rgba(206, 32, 47, 0.4), 0 0 40px rgba(206, 32, 47, 0.2), inset 0 0 10px rgba(206, 32, 47, 0.1)'
                } : {}}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet Navbar (medium screens) */}
      <div className="fixed justify-center items-center bottom-0 left-0 right-0 z-50 hidden md:flex lg:hidden">
        <div className="max-w-4xl bg-black/90 rounded-full mx-4 mb-2 overflow-hidden shadow-2xl p-2" style={{ backdropFilter: 'blur(61.83246994018555px)' }}>
          <div className="flex justify-between gap-1 items-center px-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === item.id
                    ? 'text-white shadow-lg scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                style={activeTab === item.id ? {
                  background: 'linear-gradient(90deg, rgba(206, 32, 47, 0.2) 0%, rgba(206, 32, 47, 0.6) 50%, rgba(206, 32, 47, 0.2) 100%)',
                  backdropFilter: 'blur(61.83246994018555px)',
                  boxShadow: '0 0 15px rgba(206, 32, 47, 0.4), 0 0 30px rgba(206, 32, 47, 0.2), inset 0 0 8px rgba(206, 32, 47, 0.1)'
                } : {}}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed bottom-0 right-4 z-50 md:hidden mobile-navbar">
        {/* Mobile Menu */}
        <div className={`transition-all duration-300 ease-in-out transform ${
          isOpen 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-full opacity-0 scale-95 pointer-events-none'
        }`}>
          <div className="bg-black/95 rounded-2xl mb-2 overflow-hidden shadow-2xl border border-gray-800" style={{ backdropFilter: 'blur(61.83246994018555px)' }}>
            <div className="p-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 mb-1 last:mb-0 ${
                    activeTab === item.id
                      ? 'text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  style={activeTab === item.id ? {
                    background: 'linear-gradient(90deg, rgba(206, 32, 47, 0.2) 0%, rgba(206, 32, 47, 0.6) 50%, rgba(206, 32, 47, 0.2) 100%)',
                    backdropFilter: 'blur(61.83246994018555px)',
                    boxShadow: '0 0 12px rgba(206, 32, 47, 0.4), 0 0 25px rgba(206, 32, 47, 0.2), inset 0 0 6px rgba(206, 32, 47, 0.1)'
                  } : {}}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
          aria-label="Toggle navigation menu"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-transform duration-300"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm" />
      )}
    </>
  );
};

export default BottomNavbar;