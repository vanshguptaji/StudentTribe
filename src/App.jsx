
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './MainScreen';
import BrandsScreen from './BrandsScreen';
import StudentApp from './StudentApp';
import BottomNavbar from './components/BottomNavbar';
import Footer from './components/Footer';
import STEvents from './STEvents';




function App() {
  return (
    <Router>
      <div className="min-h-screen w-screen bg-gradient-to-br from-[#b8001f] to-[#7a0015] overflow-hidden relative transition-colors duration-500 flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/brands" element={<BrandsScreen />} />
            <Route path="/app" element={<StudentApp />} />
            <Route path="/st-events" element={<STEvents />} />
          </Routes>
        </div>
        <Footer />
        <BottomNavbar />
      </div>
    </Router>
  );
}

export default App;

