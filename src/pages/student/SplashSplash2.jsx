import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import person1 from "../../assets/splashscreen/Rectangle 3463928.svg";
import person2 from "../../assets/splashscreen/Rectangle 3463931.svg";
import person3 from "../../assets/splashscreen/Rectangle 3463948.svg";
import person4 from "../../assets/splashscreen/Rectangle 3463957.svg";
import person5 from "../../assets/splashscreen/Rectangle 3463958.svg";
import person8 from "../../assets/splashscreen/Rectangle 3463964.svg";
import fist from "../../assets/splashscreen/Rectangle 3463918.svg"; 

const SplashSplash2 = ({ fade }) => {
  const peopleRef = useRef([]);
  const wordsRef = useRef([]);

  useEffect(() => {
    if (!fade) {
      // Animate people moving upwards behind the fist
      peopleRef.current.forEach((person, index) => {
        if (person) {
          gsap.fromTo(person, 
            {
              y: 100,
              opacity: 0.6,
              scale: 0.8
            },
            {
              y: -150,
              opacity: 0.3,
              scale: 0.6,
              duration: 4 + (index * 0.3),
              delay: index * 0.2,
              ease: "power2.out",
              repeat: -1,
              repeatDelay: 2,
              yoyo: false
            }
          );
        }
      });

      // Animate motivational words
      wordsRef.current.forEach((word, index) => {
        if (word) {
          const wordData = [
            { type: 'vertical', direction: 1 }, // transform - up/down
            { type: 'horizontal', direction: 1 }, // connect - left/right
            { type: 'horizontal', direction: -1 }, // trust - left/right
            { type: 'horizontal', direction: 1 }, // create - left/right
            { type: 'vertical', direction: -1 }, // dreams - up/down
            { type: 'vertical', direction: 1 }, // achieve - up/down
            { type: 'vertical', direction: -1 }, // grow - up/down
            { type: 'vertical', direction: 1 } // community - up/down
          ];

          const config = wordData[index];
          if (config.type === 'vertical') {
            // Up/down animation for top and bottom words
            gsap.to(word, {
              y: config.direction * 20,
              duration: 3 + (index * 0.2),
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true
            });
          } else {
            // Left/right animation for middle words
            gsap.to(word, {
              x: config.direction * 30,
              duration: 4 + (index * 0.3),
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true
            });
          }
        }
      });
    }
  }, [fade]);

  // Preload the fist image
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = fist;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
  <div className={`fixed inset-0 flex flex-col items-center justify-center z-20 bg-gradient-to-br from-[#b8001f] to-[#7a0015] transition-opacity duration-700 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
    
    {/* Motivational Words Scattered Around - matching Figma design exactly */}
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Transform - Top Left */}
      <div ref={el => wordsRef.current[0] = el} className="absolute top-16 left-40 animate-pulse" 
           style={{
             fontFamily: 'Figtree, system-ui, -apple-system, sans-serif', 
             fontWeight: '900',
             fontStyle: 'normal',
             fontSize: '64px',
             lineHeight: '71%',
             letterSpacing: '-5.6px',
             color: 'transparent',
             WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)',
             textStroke: '2px rgba(255, 255, 255, 0.2)'
           }}>
        transform
      </div>
      
      {/* Connect - Top Right */}
      <div ref={el => wordsRef.current[1] = el} className="absolute top-42 right-36 animate-pulse" 
           style={{
             fontFamily: 'Figtree, system-ui, -apple-system, sans-serif', 
             fontWeight: '900',
             fontStyle: 'normal',
             fontSize: '64px',
             lineHeight: '71%',
             letterSpacing: '-5.6px',
             color: 'transparent',
             WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)',
             textStroke: '2px rgba(255, 255, 255, 0.2)',
             animationDelay: '1s'
           }}>
        Connect
      </div>
      
      {/* Trust - Middle Left */}
      <div ref={el => wordsRef.current[2] = el} className="absolute top-4/12 left-45 transform -translate-y-1/2 animate-pulse" 
           style={{
             fontFamily: 'Figtree, system-ui, -apple-system, sans-serif', 
             fontWeight: '900',
             fontStyle: 'normal',
             fontSize: '64px',
             lineHeight: '71%',
             letterSpacing: '-5.6px',
             color: 'transparent',
             WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)',
             textStroke: '2px rgba(255, 255, 255, 0.2)',
             animationDelay: '2s'
           }}>
        trust
      </div>
      
      {/* Create - Middle Right */}
      <div ref={el => wordsRef.current[3] = el} className="absolute top-1/2 right-12 transform -translate-y-1/2 animate-pulse" 
           style={{
             fontFamily: 'Figtree, system-ui, -apple-system, sans-serif', 
             fontWeight: '900',
             fontStyle: 'normal',
             fontSize: '64px',
             lineHeight: '71%',
             letterSpacing: '-5.6px',
             color: 'transparent',
             WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)',
             textStroke: '2px rgba(255, 255, 255, 0.2)',
             animationDelay: '0.5s'
           }}>
        create
      </div>
      
      {/* Dreams - Top Right Lower */}
      <div ref={el => wordsRef.current[4] = el} className="absolute bottom-2/5 right-88 animate-pulse" 
           style={{
             fontFamily: 'Figtree, system-ui, -apple-system, sans-serif', 
             fontWeight: '900',
             fontStyle: 'normal',
             fontSize: '64px',
             lineHeight: '71%',
             letterSpacing: '-5.6px',
             color: 'transparent',
             WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)',
             textStroke: '2px rgba(255, 255, 255, 0.2)',
             animationDelay: '1.5s'
           }}>
        dreams
      </div>
      
      {/* Achieve - Bottom Left */}
      <div ref={el => wordsRef.current[5] = el} className="absolute bottom-1/3 left-75 animate-pulse" 
           style={{
             fontFamily: 'Figtree, system-ui, -apple-system, sans-serif', 
             fontWeight: '900',
             fontStyle: 'normal',
             fontSize: '64px',
             lineHeight: '71%',
             letterSpacing: '-5.6px',
             color: 'transparent',
             WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)',
             textStroke: '2px rgba(255, 255, 255, 0.2)',
             animationDelay: '2.5s'
           }}>
        Achieve
      </div>
      
      {/* Grow - Bottom Left Lower */}
      <div ref={el => wordsRef.current[6] = el} className="absolute bottom-1/8 left-12 animate-pulse" 
           style={{
             fontFamily: 'Figtree, system-ui, -apple-system, sans-serif', 
             fontWeight: '900',
             fontStyle: 'normal',
             fontSize: '64px',
             lineHeight: '71%',
             letterSpacing: '-5.6px',
             color: 'transparent',
             WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)',
             textStroke: '2px rgba(255, 255, 255, 0.2)',
             animationDelay: '3s'
           }}>
        grow
      </div>
      
      {/* Community - Bottom Right */}
      <div ref={el => wordsRef.current[7] = el} className="absolute bottom-1/8 right-8 animate-pulse" 
           style={{
             fontFamily: 'Figtree, system-ui, -apple-system, sans-serif', 
             fontWeight: '900',
             fontStyle: 'normal',
             fontSize: '64px',
             lineHeight: '71%',
             letterSpacing: '-5.6px',
             color: 'transparent',
             WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)',
             textStroke: '2px rgba(255, 255, 255, 0.2)',
             animationDelay: '0.8s'
           }}>
        community
      </div>
    </div>

    {/* Central Fist Logo with ST Text */}
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center justify-center">
      {/* Fist Icon - Preloaded and rendered first */}
      <div className="relative mb-4 w-3xl h-auto">
        <img src={fist} alt="Fist Icon" className="w-full h-full object-contain" loading="eager" />

        {/* ST Text Overlay on Fist */}
        <div className="absolute inset-0 mt-24 flex flex-col items-center justify-center">
          <div className="text-white text-9xl font-bold" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
            st.
          </div>
          <div className="text-white text-xl font-normal tracking-widest mt-1" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
            Student Tribe
          </div>
        </div>
      </div>

      {/* Group of people entering the fist - funnel formation with gaps */}
      <div className="relative w-96 h-96 flex items-center justify-center" style={{ marginTop: '-40px' }}>
        {/* Front row - closest to fist */}
        <img ref={el => peopleRef.current[0] = el} src={person1} alt="Person 1" className="absolute left-1/2 top-0 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        
        {/* Second row */}
        <img ref={el => peopleRef.current[1] = el} src={person2} alt="Person 2" className="absolute left-32 top-18 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[2] = el} src={person3} alt="Person 3" className="absolute left-64 top-18 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />

        {/* Third row */}
        <img ref={el => peopleRef.current[3] = el} src={person4} alt="Person 4" className="absolute left-20 top-36 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[4] = el} src={person5} alt="Person 5" className="absolute left-48 top-36 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[5] = el} src={person8} alt="Person 8" className="absolute left-76 top-36 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />

        {/* Fourth row */}
        <img ref={el => peopleRef.current[6] = el} src={person1} alt="Person 1" className="absolute left-12 top-54 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[7] = el} src={person3} alt="Person 3" className="absolute left-32 top-54 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[8] = el} src={person4} alt="Person 4" className="absolute left-52 top-54 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[9] = el} src={person2} alt="Person 2" className="absolute left-72 top-54 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[10] = el} src={person5} alt="Person 5" className="absolute left-92 top-54 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />

        {/* Fifth row */}
        <img ref={el => peopleRef.current[11] = el} src={person8} alt="Person 8" className="absolute left-6 top-72 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[12] = el} src={person3} alt="Person 3" className="absolute left-24 top-72 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[13] = el} src={person4} alt="Person 4" className="absolute left-42 top-72 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[14] = el} src={person1} alt="Person 1" className="absolute left-60 top-72 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[15] = el} src={person2} alt="Person 2" className="absolute left-78 top-72 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[16] = el} src={person5} alt="Person 5" className="absolute left-96 top-72 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />

        {/* Sixth row - back crowd */}
        <img ref={el => peopleRef.current[17] = el} src={person8} alt="Person 8" className="absolute left-3 top-90 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[18] = el} src={person3} alt="Person 3" className="absolute left-18 top-90 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[19] = el} src={person4} alt="Person 4" className="absolute left-33 top-90 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[20] = el} src={person1} alt="Person 1" className="absolute left-48 top-90 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[21] = el} src={person2} alt="Person 2" className="absolute left-63 top-90 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[22] = el} src={person5} alt="Person 5" className="absolute left-78 top-90 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />
        <img ref={el => peopleRef.current[23] = el} src={person8} alt="Person 8" className="absolute left-93 top-90 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)'}} loading="lazy" />

        {/* Seventh row - deepest crowd */}
        <img ref={el => peopleRef.current[24] = el} src={person3} alt="Person 3" className="absolute left-9 top-108 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
        <img ref={el => peopleRef.current[25] = el} src={person4} alt="Person 4" className="absolute left-22 top-108 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
        <img ref={el => peopleRef.current[26] = el} src={person1} alt="Person 1" className="absolute left-35 top-108 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
        <img ref={el => peopleRef.current[27] = el} src={person2} alt="Person 2" className="absolute left-48 top-108 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
        <img ref={el => peopleRef.current[28] = el} src={person5} alt="Person 5" className="absolute left-61 top-108 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
        <img ref={el => peopleRef.current[29] = el} src={person8} alt="Person 8" className="absolute left-74 top-108 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
        <img ref={el => peopleRef.current[30] = el} src={person3} alt="Person 3" className="absolute left-87 top-108 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />

        {/* Eighth row - final back row */}
        <img ref={el => peopleRef.current[31] = el} src={person4} alt="Person 4" className="absolute left-6 top-126 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)',}} loading="lazy" />
        <img ref={el => peopleRef.current[32] = el} src={person1} alt="Person 1" className="absolute left-18 top-126 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
        <img ref={el => peopleRef.current[33] = el} src={person2} alt="Person 2" className="absolute left-30 top-126 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
        <img ref={el => peopleRef.current[34] = el} src={person5} alt="Person 5" className="absolute left-42 top-126 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
        <img ref={el => peopleRef.current[35] = el} src={person8} alt="Person 8" className="absolute left-54 top-126 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
        <img ref={el => peopleRef.current[36] = el} src={person3} alt="Person 3" className="absolute left-66 top-126 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
        <img ref={el => peopleRef.current[37] = el} src={person4} alt="Person 4" className="absolute left-78 top-126 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
        <img ref={el => peopleRef.current[38] = el} src={person1} alt="Person 1" className="absolute left-90 top-126 h-40 w-auto object-contain z-5" style={{ transform: 'translate(-50%, 0)' }} loading="lazy" />
      </div>
      
      {/* Subtle loading indicator */}
      <div className="flex space-x-1 mt-6">
        <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
        <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
        <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
        <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
      </div>
    </div>

    {/* Additional decorative elements */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
  </div>
  );
};

export default SplashSplash2;
