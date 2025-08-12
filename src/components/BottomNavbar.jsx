// import React, { useState, useEffect, useRef } from 'react';

// const BottomNavbar = () => {
//   const [activeTab, setActiveTab] = useState('ST School');
//   const [footerVisible, setFooterVisible] = useState(false);
//   const observerRef = useRef(null);
//   // Hide navbar when footer is visible
//   useEffect(() => {
//     const footer = document.querySelector('footer');
//     if (!footer) return;
//     if (observerRef.current) observerRef.current.disconnect();
//     observerRef.current = new window.IntersectionObserver(
//       ([entry]) => {
//         setFooterVisible(entry.isIntersecting);
//       },
//       {
//         root: null,
//         threshold: 0.1,
//       }
//     );
//     observerRef.current.observe(footer);
//     return () => observerRef.current && observerRef.current.disconnect();
//   }, []);

//   const navItems = [
//     { id: 'ST School', label: 'ST School', sectionId: 'main-section' },
//     { id: 'ST App', label: 'ST App', sectionId: 'app-section' },
//     { id: 'ST Events', label: 'ST Events', sectionId: 'events-section' },
//     { id: 'ST Beast', label: 'ST Beast', sectionId: 'beast-section' },
//     { id: 'ST Care', label: 'ST Care', sectionId: 'care-section' },
//     { id: 'Who We Are', label: 'Who We Are', sectionId: 'about-section' }
//   ];

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ 
//         behavior: 'smooth',
//         block: 'start'
//       });
//     }
//   };

//   const handleTabClick = (item) => {
//     setActiveTab(item.id);
//     scrollToSection(item.sectionId);
    
//     // Dispatch custom event to trigger section animations
//     const event = new CustomEvent('navbarClick', { 
//       detail: { sectionId: item.sectionId } 
//     });
//     window.dispatchEvent(event);
//   };

//   // Track scroll position to update active tab
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = navItems.map(item => ({
//         id: item.id,
//         element: document.getElementById(item.sectionId)
//       }));

//       const scrollPosition = window.scrollY + 100; // Add offset for better detection

//       let currentActiveTab = 'ST School'; // Default to first section

//       sections.forEach((section) => {
//         if (section.element) {
//           const sectionTop = section.element.offsetTop;
//           const sectionBottom = sectionTop + section.element.offsetHeight;
          
//           if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
//             currentActiveTab = section.id;
//           }
//         }
//       });

//       setActiveTab(currentActiveTab);
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // Call once to set initial state

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [navItems]);

//   if (footerVisible) return null;

//   return (
//     <div className="fixed flex justify-center items-center bottom-0 left-0 right-0 z-50">
//       <div className="max-w-5xl bg-black/90 backdrop-blur-sm rounded-full mx-4 mb-4 overflow-hidden shadow-2xl p-4">
//         <div className="flex justify-between gap-2 items-center px-2">
//           {navItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => handleTabClick(item)}
//               className={`px-4 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
//                 activeTab === item.id
//                   ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white shadow-lg scale-105 backdrop-blur-md'
//                   : 'text-gray-300 hover:text-white hover:bg-white/10'
//               }`}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BottomNavbar;




import React, { useState, useEffect, useRef } from 'react';

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState('ST School');
  const [footerVisible, setFooterVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef(null);

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
    setIsOpen(false); // Close mobile menu after selection
    
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

  if (footerVisible) return null;

  return (
    <>
      {/* Desktop Navbar (hidden on mobile) */}
      <div className="fixed justify-center items-center bottom-0 left-0 right-0 z-50 hidden lg:flex">
        <div className="max-w-7xl bg-black/90 backdrop-blur-sm rounded-full mx-4 mb-2 overflow-hidden shadow-2xl p-2">
          <div className="flex justify-between gap-2 items-center px-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={`px-4 py-2 rounded-full text-base font-medium transition-all duration-300 whitespace-nowrap ${
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

      {/* Tablet Navbar (medium screens) */}
      <div className="fixed justify-center items-center bottom-0 left-0 right-0 z-50 hidden md:flex lg:hidden">
        <div className="max-w-4xl bg-black/90 backdrop-blur-sm rounded-full mx-4 mb-2 overflow-hidden shadow-2xl p-2">
          <div className="flex justify-between gap-1 items-center px-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
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

      {/* Mobile Navbar */}
      <div className="fixed bottom-0 right-4 z-50 md:hidden mobile-navbar">
        {/* Mobile Menu */}
        <div className={`transition-all duration-300 ease-in-out transform ${
          isOpen 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-full opacity-0 scale-95 pointer-events-none'
        }`}>
          <div className="bg-black/95 backdrop-blur-md rounded-2xl mb-2 overflow-hidden shadow-2xl border border-gray-800">
            <div className="p-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 mb-1 last:mb-0 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
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