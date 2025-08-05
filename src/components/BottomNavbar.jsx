import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'ST School', label: 'ST School', path: '/' },
    { id: 'ST App', label: 'ST App', path: '/app' },
    { id: 'ST Beast', label: 'ST Beast', path: '/beast' },
    { id: 'ST Care', label: 'ST Care', path: '/care' },
    { id: 'Who We Are', label: 'Who We Are', path: '/about' },
    { id: 'ST Events', label: 'ST Events', path: '/st-events' }
  ];

  const handleTabClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  // Determine active tab based on current route
  const getActiveTab = () => {
    switch (location.pathname) {
      case '/':
        return 'ST School';
      case '/app':
        return 'ST App';
      case '/st-events':
        return 'ST Events';
      case '/beast':
        return 'ST Beast';
      case '/care':
        return 'ST Care';
      case '/about':
        return 'Who We Are';
      default:
        return '';
    }
  };
  const activeTab = getActiveTab();

  return (
    <div className="fixed flex justify-center items-center bottom-0 left-0 right-0 z-50">
      <div className="max-w-5xl bg-black/90 backdrop-blur-sm rounded-full mx-4 mb-4 overflow-hidden shadow-2xl p-4">
        <div className="flex justify-between gap-2 items-center px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item)}
              className={`px-4 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white shadow-lg scale-105 backdrop-blur-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BottomNavbar;