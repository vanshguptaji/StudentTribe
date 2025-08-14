import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import person1 from "../../assets/splashscreen/Rectangle 3463928.svg";
import person2 from "../../assets/splashscreen/Rectangle 3463931.svg";
import person3 from "../../assets/splashscreen/Rectangle 3463948.svg";
import person4 from "../../assets/splashscreen/Rectangle 3463957.svg";
import person5 from "../../assets/splashscreen/Rectangle 3463958.svg";
import person8 from "../../assets/splashscreen/Rectangle 3463964.svg";
import fist from "../../assets/splashscreen/Rectangle 3463918.svg";
import stlogo from "../../assets/White logo.png";

const SplashSplash2 = ({ fade, onTransitionComplete }) => {
  const peopleRef = useRef([]);
  const wordsRef = useRef([]);
  const logoRef = useRef(null);
  const fistRef = useRef(null);

  // Add transition animation when fade is true
  useEffect(() => {
    if (fade && logoRef.current && fistRef.current) {
      // Create timeline for transition animation
      const tl = gsap.timeline({
        onComplete: () => {
          // Call the completion callback after animation
          if (onTransitionComplete) {
            onTransitionComplete();
          }
        }
      });

      // Fade out fist and people simultaneously
      tl.to([fistRef.current, ...peopleRef.current.filter(Boolean)], {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(wordsRef.current.filter(Boolean), {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "power2.inOut",
        stagger: 0.05,
      });
    }
  }, [fade, onTransitionComplete]);

  useEffect(() => {
    if (!fade) {
      // Animate people moving upwards behind the fist
      peopleRef.current.forEach((person, index) => {
        if (person) {
          gsap.fromTo(
            person,
            {
              y: 100,
              opacity: 0.6,
              scale: 0.8,
            },
            {
              y: -150,
              opacity: 0.3,
              scale: 0.6,
              duration: 4 + index * 0.3,
              delay: index * 0.2,
              ease: "power2.out",
              repeat: -1,
              repeatDelay: 2,
              yoyo: false,
            }
          );
        }
      });

      // Animate motivational words
      wordsRef.current.forEach((word, index) => {
        if (word) {
          const wordData = [
            { type: "vertical", direction: 1 }, // transform - up/down
            { type: "horizontal", direction: 1 }, // connect - left/right
            { type: "horizontal", direction: -1 }, // trust - left/right
            { type: "horizontal", direction: 1 }, // create - left/right
            { type: "vertical", direction: -1 }, // dreams - up/down
            { type: "vertical", direction: 1 }, // achieve - up/down
            { type: "vertical", direction: -1 }, // grow - up/down
            { type: "vertical", direction: 1 }, // community - up/down
          ];

          const config = wordData[index];
          if (config.type === "vertical") {
            // Up/down animation for top and bottom words
            gsap.to(word, {
              y: config.direction * 20,
              duration: 3 + index * 0.2,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
            });
          } else {
            // Left/right animation for middle words
            gsap.to(word, {
              x: config.direction * 30,
              duration: 4 + index * 0.3,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
            });
          }
        }
      });
    }
  }, [fade]);

  // Preload the fist image
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = fist;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center z-20 bg-gradient-to-br from-[#b8001f] to-[#7a0015] transition-opacity duration-700 ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Motivational Words Scattered Around - matching Figma design exactly */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Transform - Top Left */}
        <div
          ref={(el) => (wordsRef.current[0] = el)}
          className="absolute top-16 left-40 animate-pulse"
          style={{
            fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
            fontWeight: "900",
            fontStyle: "normal",
            fontSize: "64px",
            lineHeight: "71%",
            letterSpacing: "-5.6px",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.2)",
            textStroke: "2px rgba(255, 255, 255, 0.2)",
          }}
        >
          transform
        </div>

        {/* Connect - Top Right */}
        <div
          ref={(el) => (wordsRef.current[1] = el)}
          className="absolute top-42 right-36 animate-pulse"
          style={{
            fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
            fontWeight: "900",
            fontStyle: "normal",
            fontSize: "64px",
            lineHeight: "71%",
            letterSpacing: "-5.6px",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.2)",
            textStroke: "2px rgba(255, 255, 255, 0.2)",
            animationDelay: "1s",
          }}
        >
          Connect
        </div>

        {/* Trust - Middle Left */}
        <div
          ref={(el) => (wordsRef.current[2] = el)}
          className="absolute top-4/12 left-45 transform -translate-y-1/2 animate-pulse"
          style={{
            fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
            fontWeight: "900",
            fontStyle: "normal",
            fontSize: "64px",
            lineHeight: "71%",
            letterSpacing: "-5.6px",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.2)",
            textStroke: "2px rgba(255, 255, 255, 0.2)",
            animationDelay: "2s",
          }}
        >
          trust
        </div>

        {/* Create - Middle Right */}
        <div
          ref={(el) => (wordsRef.current[3] = el)}
          className="absolute top-1/2 right-12 transform -translate-y-1/2 animate-pulse"
          style={{
            fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
            fontWeight: "900",
            fontStyle: "normal",
            fontSize: "64px",
            lineHeight: "71%",
            letterSpacing: "-5.6px",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.2)",
            textStroke: "2px rgba(255, 255, 255, 0.2)",
            animationDelay: "0.5s",
          }}
        >
          create
        </div>

        {/* Dreams - Top Right Lower */}
        <div
          ref={(el) => (wordsRef.current[4] = el)}
          className="absolute bottom-2/5 right-88 animate-pulse"
          style={{
            fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
            fontWeight: "900",
            fontStyle: "normal",
            fontSize: "64px",
            lineHeight: "71%",
            letterSpacing: "-5.6px",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.2)",
            textStroke: "2px rgba(255, 255, 255, 0.2)",
            animationDelay: "1.5s",
          }}
        >
          dreams
        </div>

        {/* Achieve - Bottom Left */}
        <div
          ref={(el) => (wordsRef.current[5] = el)}
          className="absolute bottom-1/3 left-75 animate-pulse"
          style={{
            fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
            fontWeight: "900",
            fontStyle: "normal",
            fontSize: "64px",
            lineHeight: "71%",
            letterSpacing: "-5.6px",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.2)",
            textStroke: "2px rgba(255, 255, 255, 0.2)",
            animationDelay: "2.5s",
          }}
        >
          Achieve
        </div>

        {/* Grow - Bottom Left Lower */}
        <div
          ref={(el) => (wordsRef.current[6] = el)}
          className="absolute bottom-1/8 left-12 animate-pulse"
          style={{
            fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
            fontWeight: "900",
            fontStyle: "normal",
            fontSize: "64px",
            lineHeight: "71%",
            letterSpacing: "-5.6px",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.2)",
            textStroke: "2px rgba(255, 255, 255, 0.2)",
            animationDelay: "3s",
          }}
        >
          grow
        </div>

        {/* Community - Bottom Right */}
        <div
          ref={(el) => (wordsRef.current[7] = el)}
          className="absolute bottom-1/8 right-8 animate-pulse"
          style={{
            fontFamily: "Figtree, system-ui, -apple-system, sans-serif",
            fontWeight: "900",
            fontStyle: "normal",
            fontSize: "64px",
            lineHeight: "71%",
            letterSpacing: "-5.6px",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255, 255, 255, 0.2)",
            textStroke: "2px rgba(255, 255, 255, 0.2)",
            animationDelay: "0.8s",
          }}
        >
          community
        </div>
      </div>

      {/* Central Fist Logo with ST Text */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center justify-center">
        {/* Fist Icon - Preloaded and rendered first */}
        <div className="relative mb-4 w-3xl h-auto">
          <img
            ref={fistRef}
            src={fist}
            alt="Fist Icon"
            className="w-full h-full object-contain"
            loading="eager"
          />

          {/* ST Text Overlay on Fist */}
          <div className="absolute inset-0 mt-24 flex flex-col items-center justify-center">
            <img
              ref={logoRef}
              src={stlogo}
              alt="Student Tribe Logo"
              className="h-16 md:h-20 lg:h-32 w-auto drop-shadow-lg mb-4 mt-20"
            />
          </div>
        </div>

        {/* Group of people entering the fist - funnel formation with gaps */}
        <div
          className="relative w-96 h-96 flex items-center justify-center"
          style={{ marginTop: "-40px" }}
        >
          {/* Front row - closest to fist */}
          <img
            ref={(el) => (peopleRef.current[0] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-1/2 top-0 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />

          {/* Second row */}
          <img
            ref={(el) => (peopleRef.current[1] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left-20 top-18 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[2] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left-40 top-18 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[3] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-56 top-18 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[4] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-76 top-18 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />

          {/* Third row */}
          <img
            ref={(el) => (peopleRef.current[5] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-8 top-36 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[6] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left-24 top-36 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[7] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left-40 top-36 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[8] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-56 top-36 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[9] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-72 top-36 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[10] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left-88 top-36 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />

          {/* Fourth row */}
          <img
            ref={(el) => (peopleRef.current[11] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-2 top-54 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[12] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-16 top-54 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[13] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left-30 top-54 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[14] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left-44 top-54 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[15] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-58 top-54 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[16] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left-72 top-54 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[17] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-86 top-54 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[18] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-100 top-54 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />

          {/* Fifth row */}
          <img
            ref={(el) => (peopleRef.current[19] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left--2 top-72 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[20] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-10 top-72 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[21] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-22 top-72 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[22] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left-34 top-72 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[23] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-46 top-72 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[24] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left-58 top-72 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[25] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left-70 top-72 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[26] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-82 top-72 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[27] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-94 top-72 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[28] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left-106 top-72 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />

          {/* Sixth row - back crowd */}
          <img
            ref={(el) => (peopleRef.current[29] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left--6 top-90 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[30] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-5 top-90 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[31] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-16 top-90 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[32] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left-27 top-90 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[33] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-38 top-90 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[34] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left-49 top-90 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[35] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left-60 top-90 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[36] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-71 top-90 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[37] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-82 top-90 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[38] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left-93 top-90 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[39] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-104 top-90 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[40] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left-115 top-90 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />

          {/* Seventh row - deepest crowd */}
          <img
            ref={(el) => (peopleRef.current[41] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left--10 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[42] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-1 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[43] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left-12 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[44] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-23 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[45] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left-34 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[46] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left-45 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[47] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-56 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[48] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-67 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[49] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left-78 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[50] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-89 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[51] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left-100 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[52] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left-111 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[53] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-122 top-108 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />

          {/* Eighth row - final back row */}
          <img
            ref={(el) => (peopleRef.current[54] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left--14 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[55] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left--3 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[56] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-8 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[57] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left-19 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[58] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left-30 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[59] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-41 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[60] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-52 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[61] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left-63 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[62] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-74 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[63] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left-85 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[64] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left-96 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[65] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-107 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[66] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-118 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[67] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left-129 top-126 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />

          {/* Ninth row - additional back crowd for more density */}
          <img
            ref={(el) => (peopleRef.current[68] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left--18 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[69] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left--7 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[70] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left-4 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[71] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-15 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[72] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-26 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[73] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left-37 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[74] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-48 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[75] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left-59 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[76] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left-70 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[77] = el)}
            src={person8}
            alt="Person 8"
            className="absolute left-81 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[78] = el)}
            src={person3}
            alt="Person 3"
            className="absolute left-92 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[79] = el)}
            src={person4}
            alt="Person 4"
            className="absolute left-103 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[80] = el)}
            src={person1}
            alt="Person 1"
            className="absolute left-114 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[81] = el)}
            src={person2}
            alt="Person 2"
            className="absolute left-125 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
          <img
            ref={(el) => (peopleRef.current[82] = el)}
            src={person5}
            alt="Person 5"
            className="absolute left-136 top-144 h-40 w-auto object-contain z-5"
            style={{ transform: "translate(-50%, 0)" }}
            loading="lazy"
          />
        </div>

        {/* Subtle loading indicator */}
        <div className="flex space-x-1 mt-6">
          <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
          <div
            className="w-1 h-1 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-1 h-1 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <div
            className="w-1 h-1 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0.6s" }}
          ></div>
          <div
            className="w-1 h-1 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: "0.8s" }}
          ></div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default SplashSplash2;
