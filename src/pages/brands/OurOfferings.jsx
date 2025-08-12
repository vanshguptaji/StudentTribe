import React, { useEffect, useRef } from 'react';

function OurOfferings() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const leftNavRef = useRef(null);

  const cardsData = [
    {
      id: 'colleges',
      title: 'COLLEGES',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      alt: 'College audience',
      points: [
        'Industry-led campaign partnerships',
        'Live projects & internship collaboration frameworks',
        'Creator ecosystem for promotional support',
        'Upskilling modules, bootcamps, and learning workshops and many more..'
      ]
    },
    {
      id: 'corporates',
      title: 'CORPORATES',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
      alt: 'Corporate event',
      points: [
        'Talent acquisition and recruitment campaign support',
        'Employer branding and engagement visibility',
        'Innovation challenges and idea-think tanks',
        'Case competitions and hiring pipelines'
      ]
    },
    {
      id: 'entertainment',
      title: 'ENTERTAINMENT',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80',
      alt: 'Entertainment event',
      points: [
        'Screenings, review groups, and engagement clubs',
        'Community-driven PR & fandom campaigns',
        'Fan-based content & interactive social engagement',
        'Digital premieres, watch parties, and activations'
      ]
    },
    {
      id: 'brands',
      title: 'BRANDS',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
      alt: 'Brand event',
      points: [
        'Full-funnel marketing & engagement strategies',
        'Nano & micro influencer program management',
        'Custom content marketing — memes, reels, short videos',
        'Brand advocacy & ambassador programs'
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || cardsRef.current.length === 0) return;

      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Calculate which card should be active based on scroll position
        const cardStart = index * windowHeight;
        const cardEnd = (index + 1) * windowHeight;
        
        // Calculate progress for this card (0 to 1)
        const progress = Math.max(0, Math.min(1, (scrollTop - cardStart) / windowHeight));

        if (index === 0) {
          // First card is always visible initially
          card.style.transform = `scale(1)`;
          card.style.opacity = '1';
        } else {
          // Subsequent cards zoom in from small to large
          const scale = 0.3 + (progress * 0.7); // Scale from 0.3 to 1
          const opacity = Math.min(1, progress * 2); // Fade in faster
          
          card.style.transform = `scale(${scale})`;
          card.style.opacity = opacity.toString();
        }

        // Update navigation
        updateNavigation(index, progress);
      });
    };

    // Initial setup
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      if (index === 0) {
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
      } else {
        card.style.transform = 'scale(0.3)';
        card.style.opacity = '0';
      }
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const updateNavigation = (activeIndex, progress) => {
    if (!leftNavRef.current) return;
    
    const navItems = leftNavRef.current.querySelectorAll('span');
    navItems.forEach((item, index) => {
      // Remove all active classes first
      item.classList.remove('text-white', 'font-bold', 'text-lg', 'scale-110');
      item.classList.add('text-white/60', 'font-medium', 'text-sm');
      
      // Determine which item should be active
      let isActive = false;
      
      if (index === 0 && activeIndex === 0) {
        // First item (COLLEGES) is active when we're on the first card
        isActive = true;
      } else if (index === activeIndex && progress > 0.3) {
        // Other items become active when their card starts appearing
        isActive = true;
      }
      
      if (isActive) {
        item.classList.remove('text-white/60', 'font-medium', 'text-sm');
        item.classList.add('text-white', 'font-bold', 'text-lg', 'scale-110');
      }
    });
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed Header */}
      <div className="fixed top-8 left-8 z-50">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">OUR OFFERINGS</h1>
      </div>

      {/* Fixed Center Logo */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex flex-col items-center">
          <span className="text-6xl font-black text-white mb-1">st.</span>
          <span className="text-lg font-semibold text-white tracking-wider">Student Tribe</span>
        </div>
      </div>

      {/* Fixed Toggle Buttons */}
      <div className="fixed top-32 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/40 backdrop-blur-sm rounded-full p-1 flex shadow-2xl">
          <button className="px-6 py-3 text-white/70 font-medium transition-all duration-300 rounded-full hover:text-white">
            Students
          </button>
          <button className="px-6 py-3 bg-[#b8001f] text-white font-medium rounded-full shadow-lg">
            Brands
          </button>
        </div>
      </div>

      {/* Left Side Navigation */}
      <div ref={leftNavRef} className="fixed left-8 top-1/2 transform -translate-y-1/2 rotate-90 z-40">
        <div className="flex items-center gap-8 font-medium tracking-wider text-sm transition-all duration-300">
          <span className="text-white font-bold text-lg scale-110 transition-all duration-300">COLLEGES</span>
          <div className="w-8 h-px bg-white/30"></div>
          <span className="text-white/60 font-medium text-sm transition-all duration-300">CORPORATES</span>
          <div className="w-8 h-px bg-white/30"></div>
          <span className="text-white/60 font-medium text-sm transition-all duration-300">ENTERTAINMENT</span>
          <div className="w-8 h-px bg-white/30"></div>
          <span className="text-white/60 font-medium text-sm transition-all duration-300">BRANDS</span>
        </div>
      </div>

      {/* Fixed Cards Container - All cards overlay each other */}
      <div className="fixed inset-0 flex items-center justify-center">
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            ref={el => cardsRef.current[index] = el}
            className="absolute inset-0 flex items-center justify-center p-8 transition-all duration-300 ease-out"
            style={{ 
              zIndex: 20 + index,
              transformOrigin: 'center center'
            }}
          >
            <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-8 max-w-5xl w-full shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                
                {/* Left Side - Image */}
                <div className="flex-1">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">{card.title}</h2>
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 text-white">
                  <div className="space-y-6">
                    {card.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                        <p className="text-lg lg:text-xl leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Arrow Button */}
                  <div className="flex justify-end mt-8">
                    <button className="bg-[#b8001f] hover:bg-[#9a0019] p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Areas - Invisible divs to create scroll space */}
      <div className="relative z-10">
        {cardsData.map((_, index) => (
          <div key={index} className="h-screen w-full"></div>
        ))}
      </div>
    </div>
  );
}

export default OurOfferings;