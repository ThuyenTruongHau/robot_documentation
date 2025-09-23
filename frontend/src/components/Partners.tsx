import React, { useEffect, useRef } from 'react';

const Partners: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const partners = [
    { id: 1, name: 'Rochu', logo: '/logo_partner/logo1.png' },
    { id: 2, name: 'RICOH', logo: '/logo_partner/logo2.png' },
    { id: 3, name: 'MECH MIND', logo: '/logo_partner/logo3.png' },
    { id: 4, name: 'atomrobot', logo: '/logo_partner/logo4.png' },
    { id: 5, name: 'NACHI', logo: '/logo_partner/logo5.png' },
    { id: 6, name: 'HIK', logo: '/logo_partner/logo6.png' },
    { id: 7, name: 'Partner 7', logo: '/logo_partner/logo7.png' }
  ];

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let animationId: number;
    let position = 0;
    const speed = 0.8; // pixels per frame - optimized speed
    
    const animate = () => {
      position -= speed;
      const maxScroll = scrollElement.scrollWidth / 2;
      
      if (position <= -maxScroll) {
        position = 0;
      }
      
      scrollElement.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="relative bg-white py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#36A9A9] mb-4">
            PARTNERS
          </h2>
          <p className="text-lg text-gray-800 font-medium">
            Always serve with a high sense of responsibility and utmost dedication.
          </p>
        </div>

        {/* Logo Carousel */}
        <div className="relative">
          {/* Left fade overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          
          {/* Right fade overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Scrolling container */}
          <div className="overflow-hidden">
            <div 
              ref={scrollRef}
              className="flex"
              style={{
                width: 'calc(200% + 16rem)'
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                  style={{ width: '200px', height: '120px' }}
                >
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain transition-all duration-200 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Partners;
