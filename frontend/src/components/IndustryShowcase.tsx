import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const IndustryShowcase: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredColumn, setHoveredColumn] = useState<number>(1); // Default to first image
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  // Memoize industries to avoid dependency issues
  const industries = useMemo(() => [
    {
      id: 1,
      title: "Warehousing",
      description: "Optimize warehouse management with advanced RFID technology.",
      image: "/warehousing.png",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
          <path d="M8 12h8v6H8z" fill="white"/>
          <path d="M10 14h4v2h-4z" fill="white"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Tool Tracking",
      description: "Precise tool tracking, reducing search time by 53%.",
      image: "/tool_tracking.jpg",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Logistics",
      description: "Smart supply chain management with real-time tracking.",
      image: "/logistic.png",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 10c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Manufacturing",
      description: "Integrate RFID into smart manufacturing and quality control.",
      image: "/manufacturing.jpg",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      id: 5,
      title: "Security",
      description: "Advanced security systems with RFID for critical assets.",
      image: "/security.webp",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
        </svg>
      )
    }
  ], []);

  // Preload all images
  useEffect(() => {
    const imagePromises = industries.map((industry) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          console.log(`✅ Loaded: ${industry.image}`);
          resolve();
        };
        img.onerror = () => {
          console.warn(`⚠️ Failed to load: ${industry.image}`);
          resolve(); // Resolve anyway to not block other images
        };
        img.src = industry.image;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        console.log('All images processed');
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error('Error in image loading:', error);
        setImagesLoaded(true); // Show component anyway
      });
  }, [industries]);

  // Optimized hover handlers
  const handleMouseEnter = useCallback((id: number) => {
    setHoveredColumn(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredColumn(1); // Return to default image
  }, []);

  const handleIndustryClick = useCallback(() => {
    navigate('/rfid-solutions');
  }, [navigate]);

  // Memoize background images to avoid re-renders
  const backgroundImages = useMemo(() => 
    industries.map((industry) => (
      <div
        key={industry.id}
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-200 ${
          hoveredColumn === industry.id ? 'opacity-80' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${industry.image}), linear-gradient(135deg, #36A9A9 0%, #2a8a8a 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      />
    )), [industries, hoveredColumn]
  );


  // Memoized loading component
  const loadingComponent = useMemo(() => (
    <div className="relative bg-gray-50 py-12 overflow-hidden">
      <div className="w-full px-0">
        <div className="relative h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#36A9A9] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  ), []);

  if (!imagesLoaded) {
    return loadingComponent;
  }

  return (
    <div className="relative bg-gray-50 py-12 lg:py-16 xl:py-20 3xl:py-24 overflow-hidden">
      <div className="w-full">

        {/* Industry Columns */}
        <div className="relative h-[80vh]">
          {/* Memoized background images */}
          {backgroundImages}
          
          {/* No overlay - just natural image opacity */}
          
          <div className="relative grid grid-cols-5 gap-0 h-full">
            {industries.map((industry, index) => (
              <div
                key={industry.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => handleMouseEnter(industry.id)}
                onMouseLeave={handleMouseLeave}
                onClick={handleIndustryClick}
              >
                {/* Column Background - No individual background */}
                <div className="relative h-full">

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                    {/* Gradient overlay for better text readability */}
                    <div className={`
                      absolute bottom-0 left-0 right-0 h-full transition-opacity duration-200
                      ${hoveredColumn === industry.id 
                        ? 'bg-gradient-to-t from-[#36A9A9]/70 via-transparent to-transparent opacity-100' 
                        : 'opacity-0'
                      }
                    `}></div>
                    {/* Icon */}
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-150 relative z-20 shadow-lg
                      ${hoveredColumn === industry.id 
                        ? 'bg-black' 
                        : 'bg-white'
                      }
                    `}>
                      <div className={`
                        transition-colors duration-150
                        ${hoveredColumn === industry.id 
                          ? 'text-white' 
                          : 'text-[#36A9A9]'
                        }
                      `}>
                        {industry.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`
                      text-xl font-bold mb-4 transition-colors duration-150 relative z-20 drop-shadow-lg
                      ${hoveredColumn === industry.id 
                        ? 'text-black font-black text-2xl' 
                        : 'text-white'
                      }
                    `}>
                      {industry.title}
                    </h3>

                    {/* Description - Only show when this column is hovered */}
                    <div className={`
                      transition-all duration-150 ease-out overflow-hidden relative z-20
                      ${hoveredColumn === industry.id 
                        ? 'max-h-40 opacity-100' 
                        : 'max-h-0 opacity-0'
                      }
                    `}>
                      <p className={`
                        text-base leading-relaxed drop-shadow-lg font-semibold transition-colors duration-150
                        ${hoveredColumn === industry.id 
                          ? 'text-black font-black text-lg' 
                          : 'text-white'
                        }
                      `}>
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Light Effect Lines */}
                {index < industries.length - 1 && (
                  <div className="absolute top-0 right-0 w-px h-full bg-white z-20">
                    {/* Simple animated light beam */}
                    <div className="absolute inset-0 bg-white opacity-0 animate-pulse" 
                         style={{
                           animationDelay: `${index * 0.3}s`,
                           animationDuration: '2s'
                         }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 mb-8 lg:mb-12 xl:mb-16 px-4 lg:px-6 xl:px-8">
          <button 
            onClick={handleIndustryClick}
            className="bg-[#36A9A9] hover:bg-[#36A9A9]/90 text-white px-6 py-2 lg:px-8 lg:py-3 xl:px-10 xl:py-4 3xl:px-12 3xl:py-5 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg text-sm lg:text-base xl:text-lg 3xl:text-xl"
          >
            Explore Solutions
          </button>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-[#36A9A9]/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-[#36A9A9]/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-[#36A9A9]/15 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-[#36A9A9]/25 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
    </div>
  );
};

export default IndustryShowcase;
