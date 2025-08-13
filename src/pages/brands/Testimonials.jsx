import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StudentTribeLogo from "../../components/StudentTribeLogo";

const testimonialsData = [
  {
    id: 1,
    name: "Murali Kishore",
    position: "Brand Manager, D2C Apparel Brand",
    quote:
      "Working with Student Tribe felt like having a finger on cultural trends. They knew exactly how to spark conversations that matter.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Vikram Malhothra",
    position: "Assistant Manager, Edtech App",
    quote:
      "Our app downloads surged during the activation week. They drive not just attention, but action.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Divya Sharma",
    position: "Brand Manager",
    quote:
      "The innovative approach and deep understanding of our target market helped us achieve remarkable results.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b390?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    position: "Brand Manager, FMCG",
    quote:
      "Student Tribe's approach to campus marketing is revolutionary. They delivered results beyond our expectations.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    name: "Anita Verma",
    position: "HR Director, IT Company",
    quote:
      "The quality of engagement and the authentic connections they facilitated were remarkable.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonialsData.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsData.length - 3 : prev - 1
    );
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonialsData.length;
      visible.push(testimonialsData[index]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b8001f] to-[#8b0000] text-white relative overflow-hidden">
      {/* Header Section */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-wide">
                TESTIMONIALS
              </h1>
              <div className="max-w-2xl">
                <p className="text-xl md:text-2xl font-medium mb-2">
                  Here's what our partners have to say about working with
                  Student Tribe.
                </p>
                <p className="text-lg md:text-xl font-light opacity-90">
                  Real stories, Real impact.
                </p>
              </div>
            </div>

            {/* Logo positioned in top right */}
            <div className="flex-shrink-0 ml-8">
              <div className="flex flex-col items-center mb-0">
                <span className="text-6xl font-black text-white mb-0">
                  st.
                </span>
                <span className="text-lg font-semibold text-white tracking-wider">
                  Student Tribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Slider */}
      <div className="relative z-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-200 group"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-200 group"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Testimonials Container */}
            <div className="flex justify-center items-start gap-8 px-20 py-12 min-h-[500px] overflow-hidden">
              {getVisibleTestimonials().map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${currentIndex}-${index}`}
                  className={`w-80 relative transition-all duration-500 ease-in-out transform ${
                    index === 1 ? "translate-y-16" : "translate-y-0"
                  }`}
                >
                  {/* Testimonial Card - matches screenshot layout */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-2xl transition-all duration-500">
                    {/* Profile Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                      {/* Overlay for text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 relative">
                      {/* Name and Position - positioned over image like in screenshot */}
                      <div className="absolute -top-16 left-6 right-6">
                        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-white/90 font-medium drop-shadow-md">
                          {testimonial.position}
                        </p>
                      </div>

                      {/* Quote */}
                      <div className="mt-4">
                        <p className="text-white text-sm leading-relaxed">
                          "{testimonial.quote}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 pb-16">
        <div className="flex space-x-3">
          {Array.from({ length: testimonialsData.length - 2 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-white shadow-lg"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            )
          )}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-60 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-white/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default Testimonials;
