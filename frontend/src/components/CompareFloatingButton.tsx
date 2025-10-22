import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../contexts/CompareContext';

const CompareFloatingButton: React.FC = () => {
  const { compareProducts } = useCompare();
  const [isXl, setIsXl] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsXl(window.innerWidth >= 1280);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (compareProducts.length === 0) {
    return null;
  }

  // Calculate position above 3 floating buttons
  // Desktop lg: 3 buttons (56px) + 2 spacings (8px) + bottom (24px) + extra (16px) = 224px
  // Desktop xl: 3 buttons (64px) + 2 spacings (12px) + bottom (32px) + extra (16px) = 272px
  // Mobile: Menu button (56px) + bottom (16px) + extra (16px) = 88px
  const bottomPosition = isXl ? '272px' : '224px';
  
  return (
    <>
      {/* Desktop Version - Above the 3 floating buttons */}
      <Link
        to="/compare"
        className="hidden lg:flex fixed right-6 xl:right-8 z-50 bg-[#36A9A9] hover:bg-[#2d8a8a] text-white rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 group items-center justify-center w-14 h-14 xl:w-16 xl:h-16"
        style={{ bottom: bottomPosition }}
        title="View Compare"
      >
        <div className="relative">
          {/* Icon */}
          <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          
          {/* Badge */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {compareProducts.length}
          </span>
        </div>

        {/* Tooltip - Desktop */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Compare Products ({compareProducts.length})
        </div>
      </Link>

      {/* Mobile Version - Above the expandable menu */}
      <Link
        to="/compare"
        className="lg:hidden fixed bottom-[88px] sm:bottom-[100px] right-4 z-50 bg-[#36A9A9] hover:bg-[#2d8a8a] text-white rounded-lg shadow-2xl transition-all duration-300 active:scale-95 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14"
        title="View Compare"
      >
        <div className="relative">
          {/* Icon */}
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          
          {/* Badge */}
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center animate-pulse">
            {compareProducts.length}
          </span>
        </div>
      </Link>
    </>
  );
};

export default CompareFloatingButton;

