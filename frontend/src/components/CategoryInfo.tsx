import React from 'react';
import AnimatedSection from './AnimatedSection';
import apiService from '../services/api';

interface CategoryInfoProps {
  category: {
    id: number;
    name: string;
    description?: string;
    image?: string;
  } | null;
}

const CategoryInfo: React.FC<CategoryInfoProps> = ({ category }) => {
  if (!category) return null;

  return (
    <AnimatedSection animationType="fadeInUp" delay={100}>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row h-48 lg:h-56 xl:h-64 3xl:h-72">
          {/* Left side - Text content */}
          <div className="flex-1 p-4 lg:p-6 xl:p-8">
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-xl lg:text-2xl xl:text-3xl 3xl:text-4xl font-light text-[#36A9A9] mb-2 lg:mb-3 xl:mb-4">
                {category.name}
              </h2>
              <p className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-gray-600 leading-relaxed line-clamp-2 lg:line-clamp-3 xl:line-clamp-4">
                {category.description || `Explore our comprehensive collection of ${category.name.toLowerCase()}. Our high-quality products are designed to meet your specific needs with advanced technology and reliable performance.`}
              </p>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="w-full lg:w-56 xl:w-64 3xl:w-72 flex-shrink-0">
            <div className="h-full bg-gray-100 flex items-center justify-center overflow-hidden">
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
                <svg className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 3xl:w-24 3xl:h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default CategoryInfo;
