import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apiService from '../services/api';
import { categoryCache } from '../utils/categoryCache';

interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

const CategorySidebar: React.FC = () => {
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get active category from URL
  const getActiveCategoryId = () => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('category');
  };

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      // Check cache first
      const cachedCategories = categoryCache.getCachedCategories();
      if (cachedCategories) {
        setCategories(cachedCategories);
        setIsLoading(false);
        return;
      }

      const data = await apiService.getAllCategories();
      setCategories(data);
      categoryCache.setCachedCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      // Fallback data
      const fallbackData = [
        { id: 1, name: 'RFID Readers', image: '/rfid-readers.webp' },
        { id: 2, name: 'RFID Tags', image: '/tag.png' },
        { id: 3, name: 'RFID Antennas', image: '/rfid-antennas.png' },
        { id: 4, name: 'RFID Accessories', image: '/smart_card.png' },
        { id: 5, name: 'RFID Software', image: '/cc.png' },
        { id: 6, name: 'RFID Services', image: '/camera.jpg' }
      ];
      setCategories(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 10);
    }
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      // Calculate height of 2 category items for better scrolling
      const itemHeight = 140; // Increased for better scrolling with taller sidebar
      scrollContainerRef.current.scrollBy({ top: itemHeight, behavior: 'smooth' });
    }
  };

  const scrollUp = () => {
    if (scrollContainerRef.current) {
      // Calculate height of 2 category items for better scrolling
      const itemHeight = 140; // Increased for better scrolling with taller sidebar
      scrollContainerRef.current.scrollBy({ top: -itemHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      return () => container.removeEventListener('scroll', checkScrollability);
    }
  }, [categories]);

  if (isLoading) {
    return (
      <div className="w-64 bg-white shadow-lg rounded-lg p-4">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#36A9A9]"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-80 lg:w-96 xl:w-[28rem] 3xl:w-[32rem] 4xl:w-[36rem] h-[calc(3*20rem+2*1rem)] lg:h-[calc(3*22rem+2*1.5rem)] xl:h-[calc(3*24rem+2*2rem)] 3xl:h-[calc(3*26rem+2*2rem)] bg-white shadow-lg rounded-lg relative border border-gray-200 flex flex-col"
    >
      {/* Scroll Up Button */}
      <button
        onClick={scrollUp}
        className={`flex-shrink-0 bg-gray-100 border-b border-gray-200 py-2 lg:py-3 xl:py-4 flex items-center justify-center hover:bg-gray-200 transition-all duration-200 rounded-t-lg ${!canScrollUp ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!canScrollUp}
      >
        <svg className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Categories Container */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto scrollbar-hide"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        <div className="p-3 lg:p-4 xl:p-5 py-4 lg:py-5 xl:py-6">
          {categories.slice().reverse().map((category, index) => (
            <Link
              key={category.id}
              to={`/rfid-products?category=${category.id}`}
              className={`flex items-center p-3 lg:p-4 xl:p-5 transition-colors duration-200 group ${
                index < categories.length - 1 ? 'border-b border-gray-200' : ''
              } ${
                getActiveCategoryId() === String(category.id) 
                  ? 'bg-[#36A9A9] border-l-4 border-l-[#36A9A9]' 
                  : 'hover:bg-gray-50'
              }`}
            >
              {/* Category Image */}
              <div className="w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 3xl:w-32 3xl:h-32 mr-4 lg:mr-6 xl:mr-7 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                {category.image ? (
                  <img 
                    src={apiService.getImageUrl(category.image)}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`w-full h-full flex items-center justify-center text-gray-400 ${category.image ? 'hidden' : ''}`}>
                  <svg className="w-8 h-8 lg:w-12 lg:h-12 xl:w-14 xl:h-14 3xl:w-16 3xl:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Category Name */}
              <h3 className={`text-sm lg:text-base xl:text-lg 3xl:text-xl font-medium transition-colors duration-200 ${
                getActiveCategoryId() === String(category.id)
                  ? 'text-white'
                  : 'text-gray-800 group-hover:text-[#36A9A9]'
              }`}>
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={scrollDown}
        className={`flex-shrink-0 bg-gray-100 border-t border-gray-200 py-2 lg:py-3 xl:py-4 flex items-center justify-center hover:bg-gray-200 transition-all duration-200 rounded-b-lg ${!canScrollDown ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!canScrollDown}
      >
        <svg className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default CategorySidebar;
