import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StBeast = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with middle item active

  // Sample product data - replace with your actual images
  const products = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      title: "Oversized Hoodie",
      description: "Comfortable cotton blend hoodie",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      title: "Vintage Tee",
      description: "Classic vintage style t-shirt",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      title: "Royal Blue Sweatshirt",
      description:
        "Unisex oversized t-shirt in bold royal blue with puff print detailing.",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop",
      title: "Casual Shirt",
      description: "Premium cotton casual wear",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=500&fit=crop",
      title: "Crop Top",
      description: "Stylish casual crop top",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleProducts = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + products.length) % products.length;
      visible.push({
        ...products[index],
        position: i,
        originalIndex: index,
      });
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-[#b8001f] relative overflow-hidden">
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
      <div className="relative z-10 pt-12 pb-8">
        <div className="text-center">
          <div
            className="text-white font-black text-6xl leading-none drop-shadow-lg tracking-tight"
            style={{
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            st.
          </div>
          <div className="text-white text-lg font-medium drop-shadow mb-4">
            Student Tribe
          </div>
          <div className="mx-auto mt-8 w-[400px] max-w-[90vw] bg-[#2d000a] rounded-full flex overflow-hidden shadow-lg text-xl font-bold">
            <button
              className={`flex-1 py-4 text-center rounded-l-full transition-colors duration-300 bg-gradient-to-r from-[#b8001f] to-[#7a0015] text-white`}
              style={{ pointerEvents: "none" }}
            >
              Students
            </button>
            <button
              className={`flex-1 py-4 text-center rounded-r-full transition-colors duration-300 text-gray-300 bg-transparent`}
              style={{ pointerEvents: "none" }}
            >
              Brands
            </button>
          </div>
        </div>
      </div>

      {/* Main Slider Container */}
      <div className="relative z-10 flex items-center justify-center min-h-[600px]">
        <button
          onClick={prevSlide}
          className="absolute left-8 z-20 p-3 bg-black bg-opacity-20 rounded-full backdrop-blur-sm border border-black border-opacity-30 hover:bg-opacity-30 transition-all flex items-center justify-center cursor-pointer"
        >
          {/* Kotha Saruku SVG badge */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M8.5 24.5L3 18L12 16L10 7L19 10L24 3L29 10L38 7L36 16L45 18L39.5 24.5L45 31L36 33L38 42L29 39L24 45L19 39L10 42L12 33L3 31L8.5 24.5Z"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <text
              x="50%"
              y="40%"
              textAnchor="middle"
              fill="white"
              fontSize="7"
              fontWeight="bold"
              fontFamily="Inter, sans-serif"
              dominantBaseline="middle"
            >
              Kotha
            </text>
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fill="white"
              fontSize="7"
              fontWeight="bold"
              fontFamily="Inter, sans-serif"
              dominantBaseline="middle"
            >
              Saruku
            </text>
          </svg>
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-center justify-center space-x-4 w-full max-w-6xl px-16">
          {getVisibleProducts().map((product, index) => {
            const isCenter = product.position === 0;
            const isAdjacent = Math.abs(product.position) === 1;
            const isEdge = Math.abs(product.position) === 2;

            return (
              <div
                key={`${product.id}-${product.position}`}
                className={`
                  relative cursor-pointer
                  ${isCenter ? "z-30" : ""}
                  ${isAdjacent ? "z-20" : ""}
                  ${isEdge ? "z-10" : ""}
                  ${!isCenter && !isAdjacent && !isEdge ? "hidden" : ""}
                `}
                style={{
                  transform: isCenter 
                    ? "scale(0.9)" 
                    : isAdjacent 
                    ? "scale(1.0)" 
                    : isEdge 
                    ? "scale(1.45)" 
                    : "scale(1.0)",
                  opacity: isEdge ? 0.6 : 1,
                  transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                onClick={() => goToSlide(product.originalIndex)}
              >
                <div
                  className={`overflow-hidden
                  ${isCenter ? "w-64 h-80" : "w-80 h-96"}
                `}
                  style={{
                    transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  <div className="relative h-auto overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105"
                      style={{
                        transform:
                          isCenter
                            ? "perspective(1000px) rotateY(0deg) scale(1)"
                            : product.position === -2
                            ? "perspective(1000px) rotateY(35deg) scale(1)"
                            : product.position === -1
                            ? "perspective(1000px) rotateY(28deg) scale(0.98)"
                            : product.position === 1
                            ? "perspective(1000px) rotateY(-18deg) scale(0.98)"
                            : product.position === 2
                            ? "perspective(1000px) rotateY(-35deg) scale(0.92)"
                            : "perspective(1000px) rotateY(0deg) scale(1)",
                        transformOrigin: "center center",
                        transition: "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), clip-path 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        clipPath:
                          isCenter
                            ? "polygon(0 0, 100% 0, 99% 92%, 1% 90%)"
                            : product.position === -2
                            ? "polygon(0 7%, 100% 14%, 100% 88%, 0 93%)"
                            : product.position === -1
                            ? "polygon(0 7%, 100% 14%, 100% 88%, 0 93%)"
                            : product.position === 1
                            ? "polygon(0 19%, 100% 5%, 100% 94%, 0 80%)"
                            : product.position === 2
                            ? "polygon(0 19%, 100% 5%, 100% 94%, 0 80%)"
                            : "polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)",
                      }}
                    />
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
                    )}
                  </div>
                </div>

                {/* Decorative elements for center item */}
                {isCenter && (
                  <>
                    <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-white border-dashed rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-6 -left-6 text-white text-xs font-bold bg-[#b8001f] px-3 py-1 rounded-full transform rotate-12">
                      rang sarku
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-8 z-20 p-3 bg-black bg-opacity-20 rounded-full backdrop-blur-sm border border-black border-opacity-30 hover:bg-opacity-30 transition-all flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 text-white" />
          {/* Kotha Saruku SVG badge */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <path
              d="M8.5 24.5L3 18L12 16L10 7L19 10L24 3L29 10L38 7L36 16L45 18L39.5 24.5L45 31L36 33L38 42L29 39L24 45L19 39L10 42L12 33L3 31L8.5 24.5Z"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <text
              x="50%"
              y="40%"
              textAnchor="middle"
              fill="white"
              fontSize="7"
              fontWeight="bold"
              fontFamily="Inter, sans-serif"
              dominantBaseline="middle"
            >
              Kotha
            </text>
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fill="white"
              fontSize="7"
              fontWeight="bold"
              fontFamily="Inter, sans-serif"
              dominantBaseline="middle"
            >
              Saruku
            </text>
          </svg>
        </button>
      </div>

      {/* Bottom Navigation Dots */}
      <div className="relative z-10 flex justify-center space-x-3 pb-12">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }
            `}
          />
        ))}
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-sm opacity-70 p-8">
          Swipe or click to explore more styles
        </p>
      </div>
    </div>
  );
};

export default StBeast;
