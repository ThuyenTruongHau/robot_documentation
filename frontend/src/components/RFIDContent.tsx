import React, { useState, useCallback } from 'react';

const RFIDContent: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseEnter = useCallback((id: number) => {
    setHoveredCard(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  const features = [
    {
      id: 1,
      title: "Instant Bulk Audits",
      description: "Slash inventory time by 70% with 800+ tags/sec scanning. Perfect for retail stockrooms bursting with seasonal merch or warehouses handling peak-hour shipments.",
              icon: (
                <svg className="w-20 h-20" viewBox="0 0 64 64" fill="none">
                  <rect x="8" y="12" width="48" height="40" rx="4" fill="#36A9A9" opacity="0.2"/>
                  <rect x="16" y="20" width="12" height="8" fill="#36A9A9"/>
                  <rect x="32" y="20" width="12" height="8" fill="#36A9A9"/>
                  <rect x="16" y="32" width="12" height="8" fill="#36A9A9"/>
                  <rect x="32" y="32" width="12" height="8" fill="#36A9A9"/>
                  <text x="20" y="10" fontSize="10" fill="#36A9A9" fontWeight="bold">RFID</text>
                  <circle cx="44" cy="24" r="3" fill="#36A9A9"/>
                  <path d="M44 18 Q48 14 52 18" stroke="#36A9A9" strokeWidth="2" fill="none"/>
                </svg>
              )
    },
    {
      id: 2,
      title: "Through-the-Wall Tracking",
      description: "Pinpoint assets through 30cm concrete walls & metal shelves with 15m UHF signals. Critical for automotive parts warehouses and hospital PPE stockrooms.",
              icon: (
                <svg className="w-20 h-20" viewBox="0 0 64 64" fill="none">
                  <rect x="16" y="20" width="32" height="20" rx="3" fill="#36A9A9" opacity="0.2"/>
                  <circle cx="32" cy="30" r="4" fill="#36A9A9"/>
                  <path d="M32 16 Q44 8 56 16" stroke="#36A9A9" strokeWidth="3" fill="none" opacity="0.9"/>
                  <path d="M32 16 Q40 6 48 10" stroke="#36A9A9" strokeWidth="2" fill="none" opacity="0.7"/>
                  <path d="M32 16 Q24 6 16 10" stroke="#36A9A9" strokeWidth="2" fill="none" opacity="0.7"/>
                  <path d="M32 44 Q44 52 56 44" stroke="#36A9A9" strokeWidth="2" fill="none" opacity="0.6"/>
                  <path d="M32 44 Q24 52 16 44" stroke="#36A9A9" strokeWidth="2" fill="none" opacity="0.6"/>
                  <circle cx="8" cy="30" r="2" fill="#36A9A9" opacity="0.4"/>
                  <circle cx="56" cy="30" r="2" fill="#36A9A9" opacity="0.4"/>
                </svg>
              )
    },
    {
      id: 3,
      title: "Polar-Grade Reliability",
      description: "Conquer -40°C freezers to 55°C desert heat with military-grade anti-corrosion tech. Ensure non-stop operation in Arctic logistics and chemical plant critical facilities.",
              icon: (
                <svg className="w-20 h-20" viewBox="0 0 64 64" fill="none">
                  <ellipse cx="32" cy="32" rx="16" ry="20" fill="#36A9A9" opacity="0.2"/>
                  <circle cx="28" cy="28" r="3" fill="#36A9A9"/>
                  <circle cx="36" cy="28" r="3" fill="#36A9A9"/>
                  <path d="M32 16 Q40 10 48 16" stroke="#36A9A9" strokeWidth="2" fill="none" opacity="0.8"/>
                  <path d="M32 16 Q24 10 16 16" stroke="#36A9A9" strokeWidth="2" fill="none" opacity="0.8"/>
                  <path d="M32 48 Q40 54 48 48" stroke="#36A9A9" strokeWidth="2" fill="none" opacity="0.6"/>
                  <path d="M32 48 Q24 54 16 48" stroke="#36A9A9" strokeWidth="2" fill="none" opacity="0.6"/>
                  <rect x="30" y="52" width="4" height="6" fill="#36A9A9" opacity="0.5"/>
                  <circle cx="12" cy="32" r="1.5" fill="#36A9A9" opacity="0.6"/>
                  <circle cx="52" cy="32" r="1.5" fill="#36A9A9" opacity="0.6"/>
                </svg>
              )
    }
  ];


  return (
    <div className="relative bg-white py-12">
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 leading-tight">
            How Can UHF RFID Reader Help Your Business?
          </h2>
          <div className="w-16 h-0.5 bg-[#36A9A9] mx-auto rounded-full"></div>
        </div>

        {/* Features Grid - Sát nhau hơn */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative"
              onMouseEnter={() => handleMouseEnter(feature.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Card với border radius khác nhau */}
              <div className={`
                relative bg-white p-8 h-full transition-all duration-300 ease-out
                ${index === 0 ? 'rounded-l-2xl' : ''}
                ${index === 1 ? '' : ''}
                ${index === 2 ? 'rounded-r-2xl' : ''}
                ${index === 1 ? 'border-l border-r border-gray-100' : ''}
                ${hoveredCard === feature.id 
                  ? 'transform -translate-y-2 shadow-xl bg-white z-10' 
                  : 'shadow-sm hover:shadow-md'
                }
              `}>
                {/* Subtle overlay khi hover */}
                <div className={`
                  absolute inset-0 transition-all duration-300 ease-out
                  ${index === 0 ? 'rounded-l-2xl' : ''}
                  ${index === 1 ? '' : ''}
                  ${index === 2 ? 'rounded-r-2xl' : ''}
                  ${hoveredCard === feature.id 
                    ? 'bg-[#36A9A9]/5 opacity-100' 
                    : 'opacity-0'
                  }
                `}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon với animation nhẹ nhàng */}
                  <div className={`
                    mb-6 transition-all duration-300 ease-out
                    ${hoveredCard === feature.id ? 'transform scale-105' : ''}
                  `}>
                    <div className={`
                      w-20 h-20 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300
                      ${hoveredCard === feature.id 
                        ? 'bg-[#36A9A9] shadow-md' 
                        : 'bg-[#36A9A9]/10'
                      }
                    `}>
                      <div className={`
                        transition-all duration-300
                        ${hoveredCard === feature.id ? 'filter brightness-0 invert' : ''}
                      `}>
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`
                    text-xl font-semibold mb-4 text-center transition-all duration-300
                    ${hoveredCard === feature.id 
                      ? 'text-[#36A9A9]' 
                      : 'text-gray-800'
                    }
                  `}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-center text-sm">
                    {feature.description}
                  </p>

                  {/* Simple Accent Line */}
                  <div className={`
                    absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300
                    ${hoveredCard === feature.id 
                      ? 'w-16 bg-[#36A9A9] rounded-full' 
                      : 'w-0 bg-[#36A9A9] rounded-full'
                    }
                  `}></div>
                </div>

                {/* Subtle corner accent */}
                <div className={`
                  absolute top-3 right-3 w-2 h-2 bg-[#36A9A9] rounded-full transition-all duration-300 ease-out
                  ${hoveredCard === feature.id 
                    ? 'opacity-60' 
                    : 'opacity-0'
                  }
                `}></div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Background Decoration - Nhẹ nhàng hơn */}
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

export default RFIDContent;
