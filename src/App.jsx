
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SinglePageLayout from './pages/student/SinglePageLayout';
import BottomNavbar from './components/BottomNavbar';
import BrandsBottomNavbar from './components/BrandsBottomNavbar';
import Footer from './components/Footer';
import SplashSplash2 from './pages/student/SplashSplash2';
import Home from './pages/brands/Home';




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

  return (
    <Router>
      <AppContent 
        showSplash={showSplash}
        fadeOut={fadeOut}
        handleSplashClick={handleSplashClick}
      />
    </Router>
  );
}

function AppContent({ showSplash, fadeOut, handleSplashClick }) {
  const location = useLocation();
  const isBrandsRoute = location.pathname.startsWith('/brands');

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
      
      {/* Main content with red background - always present */}
      <div
        className={`min-h-screen w-full overflow-x-hidden relative transition-colors duration-500 flex flex-col ${
          isBrandsRoute 
            ? 'bg-gradient-to-r from-[#4a1a1a] via-[#8B4B6B] to-[#E8B4CD]' 
            : 'bg-gradient-to-br from-[#b8001f] to-[#7a0015]'
        }`}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      >
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<SinglePageLayout />} />
            <Route path="/brands" element={<Home />} />
          </Routes>
        </div>
        {!isBrandsRoute && <Footer />}
        {isBrandsRoute ? <BrandsBottomNavbar /> : <BottomNavbar />}
      </div>

      {/* Splash screen overlay - only when showSplash is true */}
      {showSplash && (
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
      )}
    </>
  );
}

export default App;

