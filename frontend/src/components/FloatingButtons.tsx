import React from 'react';

const FloatingButtons: React.FC = () => {
  const buttons = [
    {
      id: 1,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      ),
      label: "Contact",
      action: () => {
        // Scroll to contact section or open contact modal
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    {
      id: 2,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      label: "Location",
      action: () => {
        // Open location or show address
        window.open('https://maps.google.com', '_blank');
      }
    },
    {
      id: 3,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/>
        </svg>
      ),
      label: "Scroll Up",
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-2 z-50">
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={button.action}
          className="w-12 h-12 bg-[#36A9A9] hover:bg-[#36A9A9]/90 rounded-lg flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-105 group"
          title={button.label}
        >
          {button.icon}
        </button>
      ))}
    </div>
  );
};

export default FloatingButtons;
