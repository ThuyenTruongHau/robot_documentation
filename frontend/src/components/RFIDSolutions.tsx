import React from 'react';

const RFIDSolutions: React.FC = () => {
  return (
    <div className="relative bg-white py-12">
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Main Title */}
        <div className="text-center mb-4">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 leading-tight">
            RFID Technology Solutions
          </h2>
          <div className="w-16 h-0.5 bg-[#36A9A9] mx-auto rounded-full"></div>
        </div>

        {/* Description */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
            Our RFID solutions empower cross-industry operations, delivering precision tracking for 
            supply chain optimization, industrial IoT deployments, and critical asset management across 
            logistics, healthcare, aviation, smart manufacturing, energy infrastructure, and security systems.
          </p>
        </div>

      </div>


      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle dots pattern */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-[#36A9A9]/20 rounded-full"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-[#36A9A9]/30 rounded-full"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-[#36A9A9]/15 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-[#36A9A9]/25 rounded-full"></div>
        
        {/* Very subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#36A9A9" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RFIDSolutions;
