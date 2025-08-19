import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/StBeast/banner.svg";
import stlogo from "../../assets/White logo.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CurvedCarousel = ({ products }) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const autoRotateRef = useRef(null);

  const radius = 1200; // Radius of the cylinder
  const angleStep = (2 * Math.PI) / products.length; // Angle between each image
  const rotationSpeed = 360 / products.length; // Degrees to rotate per step

  // Auto rotation functionality
  const startAutoRotation = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }

    autoRotateRef.current = setInterval(() => {
      setRotation((prevRotation) => prevRotation + rotationSpeed);
    }, 2000); // Rotate every 2 seconds
  };

  const stopAutoRotation = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  };

  // Mouse drag functionality
  const handleMouseDown = (e) => {
    stopAutoRotation(); // Stop auto rotation when user interacts
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRotation(rotation);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.clientX - startX;
    const newRotation = startRotation + deltaX * 0.5; // Adjust sensitivity
    setRotation(newRotation);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Restart auto rotation after a delay
    setTimeout(() => {
      startAutoRotation();
    }, 3000); // Wait 3 seconds before resuming auto rotation
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    // Restart auto rotation after a delay
    setTimeout(() => {
      startAutoRotation();
    }, 3000);
  };

  // Touch support
  const handleTouchStart = (e) => {
    stopAutoRotation(); // Stop auto rotation when user interacts
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartRotation(rotation);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.touches[0].clientX - startX;
    const newRotation = startRotation + deltaX * 0.5;
    setRotation(newRotation);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Restart auto rotation after a delay
    setTimeout(() => {
      startAutoRotation();
    }, 3000);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);

    // Start auto rotation when component mounts
    startAutoRotation();

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
      stopAutoRotation(); // Clean up interval on unmount
    };
  }, []);

  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative"
        style={{
          width: "1400px",
          height: "500px",
          perspective: "1200px",
          perspectiveOrigin: "center center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          {products.map((product, index) => {
            const angle = index * angleStep;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;
            const rotateY = angle * (180 / Math.PI);

            // Calculate visibility based on angle
            const normalizedAngle = (((rotateY - rotation) % 360) + 360) % 360;
            // Hide images when they're in front (between 270 and 90 degrees)
            // Show images only when they're on the back side (between 90 and 270 degrees)
            const isVisible = normalizedAngle >= 0 && normalizedAngle <= 360;
            const opacity = isVisible ? 1 : 0;

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  width: "700px",
                  height: hoveredIndex === index ? "1000px" : "500px",
                  left: "50%",
                  top: "50%",
                  transform: `
                    translateX(-50%) 
                    translateY(-50%) 
                    translateX(${x}px) 
                    translateZ(${z}px) 
                    rotateY(${rotateY}deg)
                  `,
                  transformStyle: "preserve-3d",
                  opacity: opacity,
                  transition: isDragging
                    ? "opacity 0.3s"
                    : "opacity 0.3s, transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
                  zIndex: hoveredIndex === index ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="w-full h-full rounded-lg overflow-hidden bg-gray-800"
                  style={{
                    boxShadow:
                      hoveredIndex === index
                        ? "0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 35px 35px -5px rgba(0, 0, 0, 0.5)"
                        : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    transition:
                      "box-shadow 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
                    transform:
                      hoveredIndex === index ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                    style={{
                      userSelect: "none",
                      backfaceVisibility: "hidden",
                      transition:
                        "transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
                      transform:
                        hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                    }}
                  />

                  {/* Product Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Product Description - Shows on hover */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center z-50"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        backdropFilter: "blur(4px)",
                        transform: "scaleX(-1)",
                      }}
                    >
                      <div
                        className="text-center px-6 py-4 max-w-sm"
                        style={{ transform: "scaleX(-1)" }}
                      >
                        <h3 className="text-4xl font-bold mb-3 text-white">
                          {product.title}
                        </h3>
                        <p className="text-3xl text-white leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Reflection effect */}
                <div
                  className="absolute top-full left-0 w-full h-24 mt-4"
                  style={{
                    transform: "rotateX(0deg)",
                    transformOrigin: "top",
                    opacity: 0.3,
                    maskImage:
                      "linear-gradient(to bottom, white 0%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, white 0%, transparent 100%)",
                  }}
                >
                  <img
                    src={product.image}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{
                      filter: "blur(3px)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
        Auto-rotating carousel • Drag to pause
      </div>
    </div>
  );
};

const StBeast = () => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [hoveredButton, setHoveredButton] = useState('students');
  const hideButtonsTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);

  // Sample product data - replace with your actual images
  const products = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      title: "Oversized Hoodie",
      description:
        "Ultimate comfort meets street style. Perfect for those late-night study sessions or casual hangouts with friends.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      title: "Vintage Tee",
      description:
        "Classic vibes with a modern twist. This vintage-inspired tee brings retro coolness to your everyday wardrobe.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      title: "Royal Blue Sweatshirt",
      description:
        "Bold royal blue with premium puff print detailing. Unisex oversized fit that makes a statement wherever you go.",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop",
      title: "Casual Shirt",
      description:
        "Premium cotton casual wear that transitions from classroom to coffee shop. Effortlessly stylish and comfortable.",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=500&fit=crop",
      title: "Crop Top",
      description:
        "Trendy crop top perfect for layering or wearing solo. Designed for confidence and comfort in equal measure.",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      title: "Beast Mode Hoodie",
      description:
        "Channel your inner beast with this bold hoodie. Premium fabric meets aggressive design for the ultimate power look.",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      title: "Rebel Tee",
      description:
        "Break the rules with style. This rebel-inspired tee features edgy graphics and superior comfort for fearless individuals.",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      title: "Thunder Sweatshirt",
      description:
        "Strike like thunder in this electric design. Bold colors and premium materials create the perfect storm of style and comfort.",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop",
      title: "Alpha Shirt",
      description:
        "Lead the pack with this alpha-inspired shirt. Designed for leaders who aren't afraid to stand out from the crowd.",
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=500&fit=crop",
      title: "Fierce Crop Top",
      description:
        "Unleash your fierce side with this statement crop top. Bold design meets feminine power in this must-have piece.",
    },
  ];

  useEffect(() => {
    if (containerRef.current) {
      // Set initial states
      gsap.set(headerRef.current, { y: -50, opacity: 0 });
      gsap.set(titleRef.current, { y: 50, opacity: 0 });
      gsap.set(carouselRef.current, { scale: 0.8, opacity: 0 });

      // Create scroll-triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          0.2
        )
        .to(
          carouselRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          0.4
        );

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        // Clean up timeout on unmount
        if (hideButtonsTimeoutRef.current) {
          clearTimeout(hideButtonsTimeoutRef.current);
        }
      };
    }
  }, []);

  // Hover handlers for logo/buttons
  const handleLogoOrButtonsMouseEnter = () => {
    // Clear any pending hide timeout
    if (hideButtonsTimeoutRef.current) {
      clearTimeout(hideButtonsTimeoutRef.current);
      hideButtonsTimeoutRef.current = null;
    }
    setShowButtons(true);
  };

  const handleLogoOrButtonsMouseLeave = (e) => {
    // Check if the mouse is leaving to go to a related element within the same container
    const relatedTarget = e.relatedTarget;
    const currentTarget = e.currentTarget;

    // If there's no related target (mouse left the window) or the related target
    // is not within our logo container, hide the buttons with a delay
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      // Add a small delay before hiding to allow smooth movement to buttons
      hideButtonsTimeoutRef.current = setTimeout(() => {
        setShowButtons(false);
      }, 300); // 300ms delay
    }
  };

  // Button hover handlers
  const handleButtonHover = (buttonType) => {
    setHoveredButton(buttonType);
  };

  const handleButtonLeave = () => {
    setHoveredButton('students');
  };

  // MainScreen radial gradient background
  const gradientBg = (
    <div className="mainscreen-gradient-bg" style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      background: 'radial-gradient(circle at center 10%, rgb(195,23,40) 0%, rgb(142,5,27) 20%, rgb(130,6,26) 40%, rgb(100,0,11) 60%, rgb(88,1,11) 85%)',
    }} />
  );
  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      id="beast-section"
    >
      {gradientBg}
      {/* Responsive Banner Image Top Right */}
      <img
        src={banner}
        alt="ST Beast Banner"
        className="absolute top-0 right-4 md:top-0 md:right-8 lg:top-0 lg:right-12 w-[20px] md:w-[30px] lg:w-[56px] h-auto select-none pointer-events-none"
        style={{ minWidth: "20px" }}
        loading="eager"
      />
      {/* Background Pattern and Top Dashed Texts */}
      <div className="absolute inset-0 opacity-10">
        {/* Decorative dashed boxes */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white border-dashed rounded-lg transform rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white border-dashed rounded-lg transform -rotate-12"></div>
        <div className="absolute top-1/2 left-20 text-white text-sm font-bold transform -rotate-90">
          SWEARR..SWEARR..!
        </div>
        <div className="absolute top-1/3 right-10 text-white text-lg font-bold transform rotate-90">
          ST BEAST
        </div>

        {/* Top left dashed/tilted text elements */}
        <div
          className="absolute top-6 left-4 z-20"
          style={{ transform: "rotate(-13deg)" }}
        >
          <div
            className="border-2 border-white border-dashed rounded-2xl px-4 py-2 text-white font-bold text-sm shadow-lg"
            style={{ background: "rgba(0,0,0,1)" }}
          >
            TRY chey mama,
            <br />
            hero la undu!
          </div>
        </div>
        <div
          className="absolute top-24 left-32 z-20"
          style={{ transform: "rotate(-8deg)" }}
        >
          <div
            className="border-2 border-white border-dashed rounded-2xl px-3 py-1 text-white font-semibold text-xs shadow-md"
            style={{ background: "rgba(0,0,0,1)" }}
          >
            SWEARR..SWEARR..!
          </div>
        </div>
      </div>

      {/* Header - Styled like MainScreen */}
      <div ref={headerRef} className="relative z-10 pt-12 pb-8">
        <div className="text-center">
          <div
            className="logo-container group inline-block cursor-pointer relative"
            onMouseEnter={handleLogoOrButtonsMouseEnter}
            onMouseLeave={handleLogoOrButtonsMouseLeave}
          >
            {/* Replace manual logo with image logo */}
            <img
              src={stlogo}
              alt="Student Tribe Logo"
              className="h-8 md:h-12 lg:h-16 w-auto drop-shadow-lg mb-4"
            />
            {/* Buttons appear below logo on hover */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-[400px] h-[50px] max-w-[90vw] flex bg-[#2d000a] rounded-full shadow-2xl font-bold z-20 transition-all duration-300 ${
                showButtons
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{
                top: "calc(100% + 8px)",
              }}
            >
              <button
                className={`flex-1 py-4 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
                  hoveredButton === 'students'
                    ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
                    : 'bg-transparent text-gray-300 hover:text-white'
                }`}
                onClick={() => navigate("/")}
                onMouseEnter={() => handleButtonHover('students')}
                onMouseLeave={handleButtonLeave}
              >
                Students
              </button>
              <button
                className={`flex-1 py-4 text-center rounded-full transition-all duration-300 border-none cursor-pointer text-lg hover:scale-105 ${
                  hoveredButton === 'brands'
                    ? 'bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white'
                    : 'bg-transparent text-gray-300 hover:text-white'
                }`}
                onClick={() => navigate("/brands")}
                onMouseEnter={() => handleButtonHover('brands')}
                onMouseLeave={handleButtonLeave}
              >
                Brands
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with shifting */}
      <div
        className="transition-transform duration-500"
        style={{
          transform: showButtons ? "translateY(80px)" : "translateY(0)",
        }}
      >
        {/* Title Section */}
        <div ref={titleRef} className="text-center text-white mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Beast Mode - Wear What Roars
          </h1>
          <p className="text-lg opacity-80">
            From oversized fits that scream confidence to punchlines that rep
            <br />
            your vibe — this drop is all about you.
          </p>
        </div>

        {/* 3D Curved Carousel */}
        <div
          ref={carouselRef}
          className="relative flex items-center justify-center min-h-[900px] px-8 pb-32"
        >
          <CurvedCarousel products={products} />
        </div>
      </div>
    </div>
  );
};

export default StBeast;
