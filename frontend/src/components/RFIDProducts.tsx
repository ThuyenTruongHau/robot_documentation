import React, { useState, useCallback } from 'react';

const RFIDProducts: React.FC = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const handleMouseEnter = useCallback((id: number) => {
    setHoveredProduct(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredProduct(null);
  }, []);

  const products = [
    {
      id: 1,
      title: "Fixed Readers",
      description: "Professional fixed RFID reading solutions",
      categories: ["Fixed UHF", "Industrial Grade", "High Performance"],
      image: "/rfid-readers.webp",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      linkColor: "text-[#36A9A9]"
    },
    {
      id: 2,
      title: "RFID Antennas",
      description: "High-performance antennas for optimal signal transmission",
      categories: ["UHF Antennas", "HF Antennas", "Custom Solutions"],
      image: "/rfid-antennas.png",
      bgColor: "bg-[#36A9A9]",
      textColor: "text-white",
      linkColor: "text-white"
    },
    {
      id: 3,
      title: "RFID Tags",
      description: "Durable and reliable RFID tags for asset tracking",
      categories: ["UHF Tags", "HF Tags", "NFC Tags"],
      image: "/tag.png",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      linkColor: "text-[#36A9A9]"
    },
    {
      id: 4,
      title: "Smart Cards",
      description: "Advanced smart card solutions",
      categories: ["Contact Cards", "Contactless Cards", "Dual Interface"],
      image: "/smart_card.png",
      bgColor: "bg-[#36A9A9]",
      textColor: "text-white",
      linkColor: "text-white"
    },
    {
      id: 5,
      title: "Lomboard",
      description: "Innovative lomboard technology solutions",
      categories: ["Standard Lomboard", "Custom Solutions", "Integration"],
      image: "/Lomboard.jpg",
      bgColor: "bg-white",
      textColor: "text-gray-900",
      linkColor: "text-[#36A9A9]"
    },
    {
      id: 6,
      title: "Tag",
      description: "Comprehensive tag solutions for various applications",
      categories: ["Metal Tags", "Glass Tags", "Specialty Tags"],
      image: "/tag2.png",
      bgColor: "bg-[#36A9A9]",
      textColor: "text-white",
      linkColor: "text-white"
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
                {/* Title */}
                <div className="text-center mb-8">
                  <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                    Thado RFID Catalogue
                  </h2>
                </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 relative z-10">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative aspect-square"
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={`
                relative ${product.bgColor} p-6 h-full transition-all duration-200 ease-out cursor-pointer flex flex-col overflow-hidden
                ${hoveredProduct === product.id 
                  ? 'shadow-2xl z-20' 
                  : 'shadow-lg hover:shadow-xl'
                }
              `}>
                {/* Background Wave Pattern */}
                <div className="absolute inset-0 overflow-hidden">
                  {product.bgColor === 'bg-white' && (
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#36A9A9]/10 to-transparent"></div>
                  )}
                  {product.bgColor === 'bg-[#36A9A9]' && (
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
                  )}
                </div>

                {/* Hover Overlay - Background overlay */}
                <div className={`
                  absolute inset-0 transition-all duration-200 z-20
                  ${hoveredProduct === product.id 
                    ? 'bg-gray-600/90 backdrop-blur-sm' 
                    : 'bg-transparent'
                  }
                `}></div>

                {/* Content */}
                <div className={`
                  relative z-30 h-full flex flex-col justify-between transition-all duration-200
                  ${hoveredProduct === product.id ? 'opacity-60' : 'opacity-100'}
                `}>
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className={`text-2xl font-bold mb-4 ${product.textColor}`}>
                      {product.title}
                    </h3>
                    
                    {/* View More Link */}
                    <div className={`flex items-center ${product.linkColor} hover:opacity-80 transition-opacity`}>
                      <span className="text-lg font-medium mr-2">View More</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Product Image - Much Larger */}
                  <div className="relative flex-1 flex items-end justify-center pb-2">
                    <div className="transition-all duration-300">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className={`w-auto max-w-full object-contain transition-all duration-300 ${
                          product.id === 4 || product.id === 5 ? 'h-60' : 'h-80'
                        }`} 
                      />
                    </div>
                  </div>
                </div>

                {/* Hover Overlay - Full gray card with spectacular animation */}
                <div className={`
                  absolute inset-0 z-40 overflow-hidden
                  ${hoveredProduct === product.id 
                    ? 'opacity-100 scale-100 rotate-0 translate-y-0' 
                    : 'opacity-0 scale-75 rotate-45 translate-y-10'
                  }
                  transition-all duration-1000 ease-out
                  transform-gpu
                `}>
                  {/* Animated background with gradient - Semi-transparent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/80 via-gray-600/80 to-gray-800/80">
                    {/* Animated light effect */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                      ${hoveredProduct === product.id 
                        ? 'animate-pulse' 
                        : ''
                      }
                    `}></div>
                    
                    {/* Floating particles effect */}
                    <div className="absolute inset-0">
                      <div className={`
                        absolute top-4 right-4 w-2 h-2 bg-[#36A9A9] rounded-full
                        ${hoveredProduct === product.id 
                          ? 'animate-ping' 
                          : ''
                        }
                      `}></div>
                      <div className={`
                        absolute bottom-8 left-6 w-1 h-1 bg-white/60 rounded-full
                        ${hoveredProduct === product.id 
                          ? 'animate-bounce' 
                          : ''
                        }
                      `}></div>
                      <div className={`
                        absolute top-1/2 left-4 w-1.5 h-1.5 bg-[#36A9A9]/80 rounded-full
                        ${hoveredProduct === product.id 
                          ? 'animate-pulse' 
                          : ''
                        }
                      `}></div>
                    </div>
                  </div>
                  
                  {/* Content with staggered animation */}
                  <div className="relative h-full flex flex-col p-6">
                    {/* Header matching original position */}
                    <div className={`
                      mb-4 transition-all duration-500 delay-200
                      ${hoveredProduct === product.id 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                      }
                    `}>
                      <h3 className="text-2xl font-bold mb-4 text-[#36A9A9]">
                        {product.title}
                      </h3>
                      
                      {/* View More Link matching original position */}
                      <div className="flex items-center text-white hover:opacity-80 transition-all duration-300 group">
                        <span className="text-lg font-medium mr-2">View More</span>
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>

                      {/* Description right below View More */}
                      <div className={`
                        mt-4 transition-all duration-500 delay-300
                        ${hoveredProduct === product.id 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-2'
                        }
                      `}>
                        <p className="text-white text-base leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RFIDProducts;
