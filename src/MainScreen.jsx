
import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const randomPhotos = [
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80',
];

function getRandomStyle() {
  const top = Math.random() * 80 + 5;
  const left = Math.random() * 80 + 5;
  const size = Math.random() * 60 + 60;
  return {
    position: 'absolute',
    top: `${top}%`,
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    opacity: 0.18,
    borderRadius: '0.5rem',
    objectFit: 'cover',
    pointerEvents: 'none',
    zIndex: 1,
    transform: 'translate(-50%, -50%)',
  };
}


const MainScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isBrands = location.pathname === '/brands';
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center">
      {randomPhotos.map((src, i) => (
        <img key={i} src={src} alt="bg" style={getRandomStyle()} className="select-none" />
      ))}
      <div className="mb-8 mt-6 text-center z-10">
        <div className="text-white font-black text-6xl leading-none drop-shadow-lg tracking-tight">st.</div>
        <div className="text-white text-lg font-medium drop-shadow mb-4">Student Tribe</div>
        <div className="mx-auto mt-8 w-[400px] max-w-[90vw] bg-[#2d000a] rounded-full flex overflow-hidden shadow-lg text-xl font-bold">
          <button
            className={`flex-1 py-4 text-center rounded-l-full transition-colors duration-300 ${!isBrands ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white' : 'text-gray-300 bg-transparent'}`}
            onClick={() => navigate('/')}
          >
            Students
          </button>
          <button
            className={`flex-1 py-4 text-center rounded-r-full transition-colors duration-300 ${isBrands ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white' : 'text-gray-300 bg-transparent'}`}
            onClick={() => navigate('/brands')}
          >
            Brands
          </button>
        </div>
      </div>
      <div className="text-white text-4xl md:text-5xl font-extrabold text-center mt-8 z-10 drop-shadow-lg">
        Be a part of India’s largest<br />and fastest growing student<br />community.
      </div>
    </div>
  );
};

export default MainScreen;
