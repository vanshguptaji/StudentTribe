import React, { useState } from 'react';

// Example client logos (replace with actual imports/assets as needed)
const clients = [
  { name: 'Max Fashions', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Max_Fashion_logo.png' },
  { name: 'Newton School', img: 'https://newtonschool.co/newton-logo.svg' },
  { name: 'Sony Music', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Sony_Music_logo.png' },
  { name: 'Swiggy', img: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Swiggy_logo.png' },
  { name: 'TAO Digital', img: 'https://taodigital.org/wp-content/uploads/2021/03/TAO-Digital-Logo.png' },
  { name: 'SBI', img: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/SBI-logo.svg' },
  { name: 'Abhibus', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Abhibus_logo.png' },
  { name: 'Duolingo', img: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Duolingo_logo.png' },
];



const stLogo = 'https://studenttribe.in/assets/logo.png'; // Replace with actual logo asset if available

const Clients = () => {
  const [hoveredButton, setHoveredButton] = useState('brands');

  // Button hover handlers
  const handleButtonHover = (buttonType) => {
    setHoveredButton(buttonType);
  };

  const handleButtonLeave = () => {
    setHoveredButton('brands');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#f8d7dd] to-[#e7bfc7] relative">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col px-6 py-8">
        {/* Header with Logo and Toggle */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex flex-col items-center mb-4">
            <span className="text-4xl font-black text-[#b8001f] mb-0">st.</span>
            <span className="text-sm font-semibold text-[#b8001f] tracking-wider">Student Tribe</span>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-full p-1 flex shadow-2xl">
            <button 
              className={`px-4 py-2 font-medium transition-all duration-300 rounded-full text-sm ${
                hoveredButton === 'students'
                  ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
                  : 'text-white/70 hover:text-white'
              }`}
              onMouseEnter={() => handleButtonHover('students')}
              onMouseLeave={handleButtonLeave}
            >
              Students
            </button>
            <button 
              className={`px-4 py-2 font-medium rounded-full shadow-lg text-sm ${
                hoveredButton === 'brands'
                  ? 'bg-[#b8001f] text-white'
                  : 'bg-transparent text-white/70 hover:text-white'
              }`}
              onMouseEnter={() => handleButtonHover('brands')}
              onMouseLeave={handleButtonLeave}
            >
              Brands
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[#b8001f] text-xl font-bold mb-4 text-center tracking-tight">CLIENTS</h1>

        {/* Main Heading and Description */}
        <div className="text-center mb-8">
          <h2 className="text-[#3a2327] text-3xl font-bold leading-tight mb-4" style={{ letterSpacing: '-1px' }}>
            We don't just promote your brand, We build it.
          </h2>
          <p className="text-[#3a2327] text-base mb-8 px-4 leading-relaxed">
            At Student Tribe, we turn your goals into youth-driven campaigns that connect, inspire, and deliver results. From concept to execution, every project becomes a measurable success story.
          </p>
        </div>

        {/* Horizontal Marquee for Mobile */}
        <div className="w-full mb-8">
          {/* First row - left to right */}
          <div className="relative w-full overflow-hidden mb-4">
            <div
              className="marquee-row flex gap-4"
              style={{
                animation: 'marquee-left 20s linear infinite',
                width: 'calc(200% + 1rem)',
              }}
            >
              {[...clients.slice(0, 4), ...clients.slice(0, 4)].map((client, idx) => (
                <div key={client.name + idx} className="bg-white rounded-lg shadow-lg p-3 flex items-center justify-center min-w-[120px] h-[120px]">
                  <img
                    src={client.img}
                    alt={client.name}
                    className="max-h-[80px] max-w-[100px] object-contain"
                    draggable="false"
                    style={{ userSelect: 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second row - right to left */}
          <div className="relative w-full overflow-hidden">
            <div
              className="marquee-row flex gap-4"
              style={{
                animation: 'marquee-right 20s linear infinite',
                width: 'calc(200% + 1rem)',
              }}
            >
              {[...clients.slice(4, 8), ...clients.slice(4, 8)].map((client, idx) => (
                <div key={client.name + idx} className="bg-white rounded-lg shadow-lg p-3 flex items-center justify-center min-w-[120px] h-[120px]">
                  <img
                    src={client.img}
                    alt={client.name}
                    className="max-h-[80px] max-w-[100px] object-contain"
                    draggable="false"
                    style={{ userSelect: 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="bg-[#b8001f] text-white font-semibold rounded-full px-8 py-3 shadow-xl flex items-center gap-2 text-base hover:bg-[#a0001a] transition-all mx-auto">
            Be Our Client
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col px-12 py-10">
        {/* Top Logo and Toggle Bar (styled as in Home/OurOfferings) */}
        <div className="flex flex-col items-center mb-0 mt-2">
          <div className="flex flex-col items-center mb-0">
            <span className="text-6xl font-black text-[#b8001f] mb-0">st.</span>
            <span className="text-lg font-semibold text-[#b8001f] tracking-wider">Student Tribe</span>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-full p-1 flex shadow-2xl">
            <button 
              className={`px-6 py-3 font-medium transition-all duration-300 rounded-full ${
                hoveredButton === 'students'
                  ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
                  : 'text-white/70 hover:text-white'
              }`}
              onMouseEnter={() => handleButtonHover('students')}
              onMouseLeave={handleButtonLeave}
            >
              Students
            </button>
            <button 
              className={`px-6 py-3 font-medium rounded-full shadow-lg ${
                hoveredButton === 'brands'
                  ? 'bg-[#b8001f] text-white'
                  : 'bg-transparent text-white/70 hover:text-white'
              }`}
              onMouseEnter={() => handleButtonHover('brands')}
              onMouseLeave={handleButtonLeave}
            >
              Brands
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-8 w-full">
          {/* Left Section */}
          <div className="flex-1 flex flex-col justify-center pl-2 pr-8 items-start">
            <h1 className="absolute top-0 text-[#b8001f] text-3xl font-bold mb-4 tracking-tight">CLIENTS</h1>
            <h2 className="text-[#3a2327] text-7xl font-bold leading-tight mb-6 text-left" style={{ letterSpacing: '-2px', lineHeight: '1.1' }}>
              We turn Client<br />Goals&nbsp; into Success<br />Stories
            </h2>
            <p className="text-[#3a2327] text-2xl mb-10 max-w-xl text-left">
              At Student Tribe, we turn your goals into youth-driven campaigns that connect, inspire, and deliver results. From concept to execution, every project becomes a measurable success story.
            </p>
            <button className="bg-[#b8001f] text-white font-semibold rounded-full px-8 py-3 shadow-xl flex items-center gap-2 text-lg hover:bg-[#a0001a] transition-all" style={{ marginLeft: '0' }}>
              Be Our Client
              <span className="ml-2">→</span>
            </button>
          </div>
          {/* Right Section: 2-column vertical scrolling marquee for client logos */}
          <div className="absolute top-0 right-20 w-[420px] h-screen flex flex-row gap-x-6">
            {/* Left column: bottom to top (seamless infinite loop) */}
            <div className="relative h-full w-[180px] overflow-hidden">
              <div
                className="marquee-col absolute left-0 top-0 w-full"
                style={{
                  animation: 'marquee-up 16s linear infinite',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                }}
              >
                {/* Duplicate for seamless infinite scroll */}
                {(() => {
                  const logos = clients.filter((_, idx) => idx % 2 === 0);
                  return [...logos, ...logos].map((client, idx) => (
                    <div key={client.name + idx} className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-center w-[180px] h-[180px] mb-2">
                      <img
                        src={client.img}
                        alt={client.name}
                        className="max-h-[110px] max-w-[140px] object-contain"
                        draggable="false"
                        style={{ userSelect: 'none' }}
                      />
                    </div>
                  ));
                })()}
              </div>
            </div>
            {/* Right column: top to bottom (seamless infinite loop) */}
            <div className="relative h-full w-[180px] overflow-hidden">
              <div
                className="marquee-col absolute left-0 top-0 w-full"
                style={{
                  animation: 'marquee-down 16s linear infinite',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                }}
              >
                {(() => {
                  const logos = clients.filter((_, idx) => idx % 2 === 1);
                  return [...logos, ...logos].map((client, idx) => (
                    <div key={client.name + idx} className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-center w-[180px] h-[180px] mb-2">
                      <img
                        src={client.img}
                        alt={client.name}
                        className="max-h-[110px] max-w-[140px] object-contain"
                        draggable="false"
                        style={{ userSelect: 'none' }}
                      />
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .marquee-col {
          will-change: transform;
        }
        .marquee-row {
          will-change: transform;
        }
        @keyframes marquee-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Clients;
