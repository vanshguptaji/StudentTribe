
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SinglePageLayout from './pages/student/SinglePageLayout';
import BottomNavbar from './components/BottomNavbar';
import Footer from './components/Footer';
import SplashSplash2 from './pages/student/SplashSplash2';




function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out animation after 6 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 6000);

    // Hide splash screen completely after fade animation (6.5 seconds total)
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 6700);

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Handler to immediately end splash on click
  const handleSplashClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowSplash(false);
    }, 700); // match fade duration
  };

  // If splash screen should be shown, render only the splash screen
  if (showSplash) {
    return (
      <>
        {/* Disable image selection and dragging globally */}
        <style>{`
          img, svg {
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            pointer-events: auto;
          }
          img, svg {
            -webkit-user-drag: none !important;
            user-drag: none !important;
          }
        `}</style>
        <div
          onClick={handleSplashClick}
          style={{
            cursor: 'pointer',
            width: '100vw',
            height: '100vh',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
        >
          <SplashSplash2 fade={fadeOut} />
        </div>
      </>
    );
  }

  return (
    <Router>
      {/* Disable image selection and dragging globally */}
      <style>{`
        img, svg {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          pointer-events: auto;
        }
        img, svg {
          -webkit-user-drag: none !important;
          user-drag: none !important;
        }
      `}</style>
      <div
        className="min-h-screen w-full bg-gradient-to-br from-[#b8001f] to-[#7a0015] overflow-x-hidden relative transition-colors duration-500 flex flex-col"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      >
        <div className="flex-1">
          <SinglePageLayout />
        </div>
        <Footer />
        <BottomNavbar />
      </div>
    </Router>
  );
}

export default App;

