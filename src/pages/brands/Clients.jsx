import React from 'react';

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
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#f8d7dd] to-[#e7bfc7] px-12 py-10 relative">
      {/* Top Logo and Toggle Bar (styled as in Home/OurOfferings) */}
      <div className="flex flex-col items-center mb-0 mt-2">
        <div className="flex flex-col items-center mb-0">
          <span className="text-6xl font-black text-[#b8001f] mb-0">st.</span>
          <span className="text-lg font-semibold text-[#b8001f] tracking-wider">Student Tribe</span>
        </div>
        <div className="bg-black/40 backdrop-blur-sm rounded-full p-1 flex shadow-2xl">
          <button className="px-6 py-3 text-white/70 font-medium transition-all duration-300 rounded-full hover:text-white">
            Students
          </button>
          <button className="px-6 py-3 bg-[#b8001f] text-white font-medium rounded-full shadow-lg">
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
            <style>{`
              .marquee-col {
                will-change: transform;
              }
              @keyframes marquee-up {
                0% { transform: translateY(0); }
                100% { transform: translateY(-50%); }
              }
            `}</style>
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
            <style>{`
              .marquee-col {
                will-change: transform;
              }
              @keyframes marquee-down {
                0% { transform: translateY(-50%); }
                100% { transform: translateY(0); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
