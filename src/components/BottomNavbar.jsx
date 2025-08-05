import React, { useState, useEffect } from 'react';

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState('ST School');

  const navItems = [
    { id: 'ST School', label: 'ST School', sectionId: 'main-section' },
    { id: 'ST App', label: 'ST App', sectionId: 'app-section' },
    { id: 'ST Events', label: 'ST Events', sectionId: 'events-section' },
    { id: 'ST Beast', label: 'ST Beast', sectionId: 'beast-section' },
    { id: 'ST Care', label: 'ST Care', sectionId: 'care-section' },
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
    
    // Dispatch custom event to trigger section animations
    const event = new CustomEvent('navbarClick', { 
      detail: { sectionId: item.sectionId } 
    });
    window.dispatchEvent(event);
  };

  // Track scroll position to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.sectionId)
      }));

      const scrollPosition = window.scrollY + 100; // Add offset for better detection

      let currentActiveTab = 'ST School'; // Default to first section

      sections.forEach((section) => {
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          const sectionBottom = sectionTop + section.element.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentActiveTab = section.id;
          }
        }
      });

      setActiveTab(currentActiveTab);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <div className="fixed flex justify-center items-center bottom-0 left-0 right-0 z-50">
      <div className="max-w-5xl bg-black/90 backdrop-blur-sm rounded-full mx-4 mb-4 overflow-hidden shadow-2xl p-4">
        <div className="flex justify-between gap-2 items-center px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item)}
              className={`px-4 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white shadow-lg scale-105 backdrop-blur-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BottomNavbar;