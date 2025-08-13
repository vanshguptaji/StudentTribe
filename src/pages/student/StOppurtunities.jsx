import React, { useState } from "react";

const StOpportunities = () => {
  const [activeTab, setActiveTab] = useState("Students");

  const handleBrandsClick = () => {
    setActiveTab("Brands");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 text-white relative overflow-hidden">
      {/* Navigation Toggle at Top */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-gray-800/90 rounded-full flex overflow-hidden">
          <button
            className={`px-8 py-3 text-white font-medium transition-colors ${
              activeTab === "Students" ? "bg-red-500" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("Students")}
          >
            Students
          </button>
          <button
            className={`px-8 py-3 text-white font-medium transition-colors ${
              activeTab === "Brands" ? "bg-red-500" : "hover:bg-gray-700"
            }`}
            onClick={handleBrandsClick}
          >
            Brands
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex items-center justify-center min-h-screen px-8">
        <div className="grid grid-cols-3 gap-6 max-w-7xl w-full" style={{ height: '500px' }}>
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Top Left Card - INTERNSHIPS */}
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                alt="Internships"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-bold">
                  INTERNSHIPS
                </h3>
              </div>
            </div>

            {/* Bottom Left Card - Description */}
            <div className="flex-1 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center">
              <p className="text-white text-base leading-relaxed text-center">
                Find it all here — workshops, internships, and job openings that kick-start your career. Get real-world exposure, build skills, and land roles that turn effort into pride and recognition.
              </p>
            </div>
          </div>

          {/* Center Column - Tall Image */}
          <div className="relative">
            <div className="h-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
                alt="Center workplace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-bold">
                  JOB OPENINGS
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Top Right Card - Testimonial */}
            <div className="flex-1 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b390?auto=format&fit=crop&w=100&q=80"
                    alt="Dharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-white text-lg font-medium">Dharma</h4>
              </div>
              <div className="relative">
                <span className="text-4xl text-white/30 absolute -top-2 -left-1">"</span>
                <p className="text-white text-sm leading-relaxed ml-4">
                  Find it all here — workshops, internships, and job openings that kick-start your career.
                </p>
                <span className="text-4xl text-white/30 absolute -bottom-4 -right-1">"</span>
              </div>
            </div>

            {/* Bottom Right Card - VOLUNTEER WORKS */}
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80"
                alt="Volunteer Works"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-bold">
                  VOLUNTEER WORKS
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side vertical text */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-10">
        <div className="bg-black/80 backdrop-blur-sm px-3 py-6 transform rotate-90 origin-center">
          <span className="text-white text-lg font-bold tracking-widest">
            ST APP
          </span>
        </div>
      </div>
    </div>
  );
};

export default StOpportunities;
