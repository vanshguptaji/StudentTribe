import React from 'react';
import { motion } from 'framer-motion';

const STCare = () => {
  return (
    <div className="min-h-screen bg-rose-100 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full opacity-10"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0,0 C300,200 600,100 1200,300 L1200,800 L0,800 Z"
            fill="rgba(200,200,200,0.2)"
          />
        </svg>
      </div>

      {/* ST CARE vertical text */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center z-20">
        <h2 className="text-gray-800 font-bold text-2xl tracking-wider">ST CARE</h2>
      </div>

      {/* Main content container */}
      <div className="relative z-10 px-8 py-12 max-w-6xl mx-auto">
        
        {/* Header section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* ST logo */}
          <div className="mb-8">
            <span className="text-5xl font-bold text-white bg-red-600 px-4 py-2 rounded-lg shadow-lg">st.</span>
            <p className="text-gray-800 text-lg mt-2 font-medium">Student Tribe</p>
          </div>
        </motion.div>

        {/* Main content section - Two main flex sections */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-8 items-start mb-12"
        >
          {/* Left side - Assembly image */}
          <div className="flex-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop"
                alt="Assembly gathering"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Right side - Text and images */}
          <div className="flex-1">
            {/* Text content */}
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Feeling Stuck?
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">
                You're Not Alone — We're Here.
              </h2>

              <div className="text-gray-700 space-y-4 mb-6 text-lg">
                <p>Overwhelmed? Anxious? Confused? You're safe here. We provide supportive conversations, judgment-free care, and guidance to help you build emotional strength.</p>
                
                <div className="flex items-center gap-3 mt-6">
                  <span className="text-5xl font-bold text-red-600">st</span>
                  <span className="text-xl font-medium text-gray-800">Because mental health matters.</span>
                </div>
              </div>
            </div>

            {/* Right side divided into two columns for images */}
            <div className="flex gap-6">
              {/* Left column in right section */}
              <div className="flex-1">
                {/* Community image 1 */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop"
                    alt="Community gathering"
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                {/* Call to action button below left image */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-red-700 transition-colors text-sm shadow-lg w-full justify-center"
                >
                  Feel Heard. Find Strength.
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>

              {/* Right column in right section */}
              <div className="flex-1">
                {/* Community image 2 */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
                    alt="Support group"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            From oversized fits that scream confidence to punchlines that rep your vibe — this drop is all about you.
          </p>
        </motion.div>
      </div>

      {/* Bottom curved element */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 200"
          className="w-full h-32"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 C400,0 800,0 1200,200 L1200,200 L0,200 Z"
            fill="rgba(200,200,200,0.1)"
          />
        </svg>
      </div>
    </div>
  );
};

export default STCare;
