import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StudentTribeLogo from '../../components/StudentTribeLogo';

const testimonialsData = [
  {
    id: 1,
    name: "Sowmya Shankar",
    position: "Marketing Head, Beverage Brand",
    quote: "Student Tribe helped us engage with over 100 touchpoints in one month. The engagement felt organic, energetic, and outcome-driven.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b390?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    name: "Prasad Sharma",
    position: "Talent Partner, Tech Firm",
    quote: "Our internship drive received maximum traction through them. It was real talent, real engagement, and a seamless execution.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    name: "Prajan Singh",
    position: "Plant Operations Head",
    quote: "The activation was brilliant and had insights we could use to understand our target demographic.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    position: "Brand Manager, FMCG",
    quote: "Student Tribe's approach to campus marketing is revolutionary. They delivered results beyond our expectations.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 5,
    name: "Anita Verma",
    position: "HR Director, IT Company",
    quote: "The quality of engagement and the authentic connections they facilitated were remarkable.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 3 >= testimonialsData.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, testimonialsData.length - 3) : prevIndex - 1
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
                  Here's what our partners have to say about working with Student Tribe.
                </p>
                <p className="text-lg md:text-xl font-light opacity-90">
                  Real stories, Real impact.
                </p>
              </div>
            </div>
            
            {/* Logo positioned in top right */}
            <div className="flex-shrink-0 ml-8">
              <StudentTribeLogo size="medium" className="shadow-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Slider */}
      <div className="relative z-10 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-white" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-white" />
            </button>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-3 gap-6 px-16">
              {getVisibleTestimonials().map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${currentIndex}`}
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 ${
                    index === 0 ? 'md:mt-8' : index === 2 ? 'md:mt-16' : ''
                  }`}
                >
                  {/* Profile Image */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Name and Position */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-white/80 font-medium">
                      {testimonial.position}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="text-center">
                    <p className="text-white/90 text-sm leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-12 pb-16">
        <div className="flex space-x-2">
          {Array.from({ length: Math.ceil(testimonialsData.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / 3) === index
                  ? 'bg-white'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
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