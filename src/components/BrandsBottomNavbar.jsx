import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BrandsBottomNavbar = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const navigate = useNavigate();

  const navItems = [
    { id: 'Home', label: 'Home' },
    { id: 'Our Offerings', label: 'Our Offerings' },
    { id: 'Clients', label: 'Clients' },
    { id: 'Testimonials', label: 'Testimonials' }
  ];

  const handleTabClick = (item) => {
    setActiveTab(item.id);
    // Add specific navigation logic for different tabs
    if (item.id === 'Home') {
      // Stay on brands home page
    } else if (item.id === 'Our Offerings') {
      // Navigate to offerings page (to be implemented)
    } else if (item.id === 'Clients') {
      // Navigate to clients page (to be implemented)
    } else if (item.id === 'Testimonials') {
      // Navigate to testimonials page (to be implemented)
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/60 backdrop-blur-md rounded-full px-6 py-2 shadow-2xl">
        <div className="flex space-x-6 text-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item)}
              className={`transition-all duration-300 pb-1 ${
                activeTab === item.id
                  ? 'text-[#b8001f] font-semibold border-b-2 border-[#b8001f]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsBottomNavbar;
