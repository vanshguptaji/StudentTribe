
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SplashSplash2 from './SplashSplash2';
import MainScreen from './MainScreen';
import BrandsScreen from './BrandsScreen';

function AnimatedRoutes({ fade, setFade, screen, setScreen }) {
  const location = useLocation();
  return (
    <div className={`transition-opacity duration-700 ${fade ? 'opacity-0' : 'opacity-100'}`}>
      <Routes location={location}>
        <Route path="/" element={<MainScreen />} />
        <Route path="/brands" element={<BrandsScreen />} />
      </Routes>
    </div>
  );
}


function App() {
  // 0: splash2, 1: main
  const [screen, setScreen] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    let fadeTimeout, nextTimeout;
    if (screen === 0) {
      fadeTimeout = setTimeout(() => setFade(true), 1400);
      nextTimeout = setTimeout(() => {
        setScreen(1);
        setFade(false);
      }, 2000);
    }
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(nextTimeout);
    };
  }, [screen]);

  return (
    <Router>
      <div className="min-h-screen w-screen bg-gradient-to-br from-[#b8001f] to-[#7a0015] overflow-hidden relative transition-colors duration-500">
        {screen === 0 && <SplashSplash2 fade={fade} />}
        {screen === 1 && <AnimatedRoutes fade={fade} setFade={setFade} screen={screen} setScreen={setScreen} />}
      </div>
    </Router>
  );
}

export default App;

