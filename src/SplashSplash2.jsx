import React from "react";
import splash from "../src/assets/splashscreen.png"

const SplashSplash2 = ({ fade }) => (
  <div className={`fixed inset-0 flex flex-col items-center justify-center z-20 bg-gradient-to-br from-[#b8001f] to-[#7a0015] transition-opacity duration-700 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
    <div className="absolute inset-0 w-full h-full">
      <img
        src={splash}
        alt="Splash 2"
        className="w-full h-full object-cover"
        style={{ filter: 'drop-shadow(0 2px 32px #7a0015)' }}
      />
    </div>
  </div>
);

export default SplashSplash2;
