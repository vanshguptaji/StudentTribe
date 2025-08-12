import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BrandsBottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    if (location.pathname === '/brands') return 'Home';
    if (location.pathname === '/brands/offerings') return 'Our Offerings';
    if (location.pathname === '/brands/clients') return 'Clients';
    if (location.pathname === '/brands/testimonials') return 'Testimonials';
    return 'Home';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);

  const navItems = [
    { id: 'Home', label: 'Home', route: '/brands' },
    { id: 'Our Offerings', label: 'Our Offerings', route: '/brands/offerings' },
    { id: 'Clients', label: 'Clients', route: '/brands/clients' },
    { id: 'Testimonials', label: 'Testimonials', route: '/brands/testimonials' }
  ];

  const handleTabClick = (item) => {
    setActiveTab(item.id);
    navigate(item.route);
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
