
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './MainScreen';
import BrandsScreen from './BrandsScreen';
import StudentApp from './StudentApp';
import BottomNavbar from './components/BottomNavbar';
import Footer from './components/Footer';
import STEvents from './STEvents';
import StBeast from './STbeast';
import STCare from './STCare';
import SplashSplash2 from './SplashSplash2';
import CurvedCarousel from './ImageSlider';




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

  // If splash screen should be shown, render only the splash screen
  if (showSplash) {
    return <SplashSplash2 fade={fadeOut} />;
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
          </Routes>
        </div>
        <Footer />
        <BottomNavbar />
      </div>
    </Router>
  );
}

export default App;

