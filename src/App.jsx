
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SinglePageLayout from './pages/student/SinglePageLayout';
import BottomNavbar from './components/BottomNavbar';
import BrandsBottomNavbar from './components/BrandsBottomNavbar';
import Footer from './components/Footer';
import SplashSplash2 from './pages/student/SplashSplash2';
import Home from './pages/brands/Home';
import OurOfferings from './pages/brands/OurOfferings';
import Clients from './pages/brands/Clients';
import Testimonials from './pages/brands/Testimonials';




function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out animation after 6 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      // Dispatch event when splash starts fading
      window.dispatchEvent(new CustomEvent('splashScreenFadeStart'));
    }, 6000);

    // Hide splash screen completely after fade animation (6.5 seconds total)
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
      // Dispatch event when splash ends
      window.dispatchEvent(new CustomEvent('splashScreenEnd'));
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
    // Dispatch event when user clicks to skip splash
    window.dispatchEvent(new CustomEvent('splashScreenFadeStart'));
    setTimeout(() => {
      setShowSplash(false);
      // Dispatch event when splash ends
      window.dispatchEvent(new CustomEvent('splashScreenEnd'));
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
  const isBrandsHome = location.pathname === '/brands';

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
          isBrandsHome
            ? '' // Home page handles its own gradient
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
            <Route path="/brands/offerings" element={<OurOfferings />} />
              <Route path="/brands/clients" element={<Clients />} />
              <Route path="/brands/testimonials" element={<Testimonials />} />
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

