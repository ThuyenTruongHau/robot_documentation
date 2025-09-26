import React, { useState } from 'react';

const FloatingButtons: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttons = [
    {
      id: 1,
      icon: (
        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      ),
      label: "Chat",
      action: () => {
        // Navigate to contact or open chat
        window.location.href = '/contact-us';
      }
    },
    {
      id: 2,
      icon: (
        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      label: "Location",
      action: () => {
        // Open location or show address
        window.open('https://maps.google.com/search/Ho+Chi+Minh+City+Vietnam', '_blank');
      }
    },
    {
      id: 3,
      icon: (
        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/>
        </svg>
      ),
      label: "Top",
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  ];

  return (
    <>
      {/* Desktop Version - Always visible */}
      <div className="hidden lg:flex fixed bottom-6 right-6 xl:bottom-8 xl:right-8 flex-col space-y-2 xl:space-y-3 z-50">
        {buttons.map((button) => (
          <div key={button.id} className="group relative flex items-center">
            {/* Label on hover */}
            <div className="absolute right-full mr-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {button.label}
            </div>
            {/* Button */}
            <button
              onClick={button.action}
              className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-[#36A9A9] hover:bg-[#2a8a8a] rounded-lg flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              title={button.label}
            >
              {button.icon}
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Version - Expandable menu */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        {/* Expanded buttons */}
        <div className={`flex flex-col space-y-2 mb-2 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => {
                button.action();
                setIsExpanded(false);
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 bg-[#36A9A9] hover:bg-[#2a8a8a] rounded-lg flex items-center justify-center text-white shadow-lg transition-all duration-300"
            >
              {button.icon}
            </button>
          ))}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-12 h-12 sm:w-14 sm:h-14 bg-[#36A9A9] hover:bg-[#2a8a8a] rounded-lg flex items-center justify-center text-white shadow-xl transition-all duration-300 ${isExpanded ? 'rotate-45' : ''}`}
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;
