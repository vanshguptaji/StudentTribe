
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './pages/MainScreen';
import BrandsScreen from './pages/BrandsScreen';
import StudentApp from './pages/StudentApp';
import BottomNavbar from './components/BottomNavbar';
import Footer from './components/Footer';
import STEvents from './pages/STEvents';
import StBeast from './pages/STbeast';
import STCare from './pages/STCare';
import SplashSplash2 from './pages/SplashSplash2';
import CurvedCarousel from './pages/ImageSlider';
import WhoweAre from './pages/WhoweAre';




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
      <div onClick={handleSplashClick} style={{ cursor: 'pointer', width: '100vw', height: '100vh' }}>
        <SplashSplash2 fade={fadeOut} />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen w-screen bg-gradient-to-br from-[#b8001f] to-[#7a0015] overflow-hidden relative transition-colors duration-500 flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/brands" element={<BrandsScreen />} />
            <Route path="/app" element={<StudentApp />} />
            <Route path="/st-events" element={<STEvents />} />
            <Route path="/beast" element={<StBeast />} />
            <Route path="/care" element={<STCare />} />
            <Route path="/about" element={<WhoweAre />} />
          </Routes>
        </div>
        <Footer />
        <BottomNavbar />
      </div>
    </Router>
  );
}

export default App;

