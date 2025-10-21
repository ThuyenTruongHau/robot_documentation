import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import apiService from '../services/api';
import { Solution } from '../types/product';

const SolutionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchSolution();
    }
  }, [id]);

  const fetchSolution = async () => {
    try {
      setLoading(true);
      const data = await apiService.getSolution(parseInt(id!));
      setSolution(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching solution:', err);
      setError('Không thể tải dữ liệu solution. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const getDefaultIcon = () => (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );

  const getMainTitle = () => {
    if (!solution?.detail || typeof solution.detail !== 'object') {
      return solution?.solution_name || '';
    }
    const details = solution.detail as Record<string, any>;
    const firstKey = Object.keys(details)[0];
    console.log('Main title:', firstKey);
    console.log('All detail keys:', Object.keys(details));
    return firstKey || solution?.solution_name || '';
  };

  const renderDetailSections = () => {
    if (!solution?.detail || typeof solution.detail !== 'object') {
      console.log('No detail data available');
      return null;
    }

    const details = solution.detail as Record<string, any>;
    console.log('Rendering sections for:', Object.keys(details));
    const sections = [];

    // Lấy ảnh thứ 2 và 3
    const secondImage = solution.images?.[1];
    const thirdImage = solution.images?.[2];

    let imageIndex = 0;
    const availableImages = [secondImage, thirdImage].filter(Boolean);

    // Render field đầu tiên làm main title
    const firstEntry = Object.entries(details)[0];
    if (firstEntry) {
      const [firstKey, firstValue] = firstEntry;
      sections.push(
        <AnimatedSection key="main-title" animationType="fadeInUp" delay={100}>
          <div className="mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto text-center mb-6 lg:mb-8">
              {firstKey}
            </h1>
            {firstValue && (
              <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                   {/* Left Column - First Key-Value with Image (1/3) */}
                   <div className="md:col-span-1 lg:col-span-1 space-y-3 sm:space-y-4 md:space-y-5">
                     <h3 className="text-base sm:text-lg md:text-xl lg:text-xl font-semibold text-gray-900">
                       {Object.keys(firstValue)[0]}
                     </h3>
                     <div className="text-xs sm:text-sm md:text-base lg:text-base text-gray-600 leading-relaxed whitespace-pre-wrap text-left overflow-hidden">
                       {firstValue[Object.keys(firstValue)[0]]}
                     </div>
                     
                     {/* Image below content */}
                     <div className="mt-4 sm:mt-5 md:mt-6">
                       {solution.images?.[1]?.image ? (
                         <div className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
                           <img
                             src={apiService.getImageUrl(solution.images[1].image)}
                             alt={Object.keys(firstValue)[0]}
                             className="w-full h-full object-cover rounded-lg"
                           />
                         </div>
                       ) : (
                         <div className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] bg-gradient-to-br from-[#36A9A9] to-[#2d8a8a] flex items-center justify-center rounded-lg">
                           <div className="text-white opacity-50 text-center">
                             <div className="mb-2">
                               {getDefaultIcon()}
                             </div>
                             <p className="text-xs sm:text-sm">No Image Available</p>
                           </div>
                         </div>
                       )}
                     </div>
                   </div>
                  
                  {/* Right Column - Second Key-Value with Image (2/3) */}
                  <div className="md:col-span-1 lg:col-span-2 flex flex-col md:flex-row lg:flex-row md:items-start lg:items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    {/* Text Content */}
                    <div className="w-full md:w-1/2 lg:w-1/2 space-y-3 sm:space-y-4">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-xl font-semibold text-gray-900">
                        {Object.keys(firstValue)[1]}
                      </h3>
                      <div className="text-xs sm:text-sm md:text-base lg:text-base text-gray-600 leading-relaxed whitespace-pre-wrap text-left overflow-hidden">
                        {firstValue[Object.keys(firstValue)[1]]}
                      </div>
                    </div>
                    
                    {/* Image */}
                    <div className="w-full md:w-1/2 lg:w-1/2">
                      {solution.images?.[2]?.image ? (
                        <div className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
                          <img
                            src={apiService.getImageUrl(solution.images[2].image)}
                            alt={Object.keys(firstValue)[1]}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] bg-gradient-to-br from-[#36A9A9] to-[#2d8a8a] flex items-center justify-center rounded-lg">
                          <div className="text-white opacity-50 text-center">
                            <div className="mb-2">
                              {getDefaultIcon()}
                            </div>
                            <p className="text-xs sm:text-sm">No Image Available</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </AnimatedSection>
      );
    }

    // Render các fields còn lại làm sections
    const remainingEntries = Object.entries(details).slice(1);
    for (const [key, value] of remainingEntries) {
      const currentImage = availableImages[imageIndex % availableImages.length];
      imageIndex++;

      sections.push(
        <AnimatedSection key={key} animationType="fadeInUp" delay={200 + imageIndex * 100}>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 lg:mb-8">
            <div className="flex flex-col lg:flex-row">
              {/* Left Content */}
              <div className="flex-1 p-6 lg:p-8">
                <div className="flex flex-col h-full">
                  {/* Title Field */}
                  <div className="mb-4 lg:mb-6">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                      {key}
                    </h2>
                  </div>
                  
                  {/* Content Field */}
                  <div className="flex-1">
                    <div className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="w-full lg:w-80 lg:min-w-[320px]">
                {currentImage?.image ? (
                  <div className="h-[250px] sm:h-[300px] lg:h-full">
                    <img
                      src={apiService.getImageUrl(currentImage.image)}
                      alt={key}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-[250px] sm:h-[300px] lg:h-full bg-gradient-to-br from-[#36A9A9] to-[#2d8a8a] flex items-center justify-center">
                    <div className="text-white opacity-50 text-center">
                      <div className="mb-2">
                        {getDefaultIcon()}
                      </div>
                      <p className="text-sm">No Image Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      );
    }

    return sections;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#36A9A9]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center max-w-md">
          {error}
        </div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg mb-4">Solution không tồn tại</p>
          <button
            onClick={() => navigate('/solutions')}
            className="bg-[#36A9A9] hover:bg-[#2d8a8a] text-white px-6 py-2 rounded-lg transition-colors duration-300"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background */}
      <AnimatedSection animationType="fadeInUp" delay={0}>
        <div className="relative h-[50vh] lg:h-[60vh] flex items-center justify-center bg-center bg-no-repeat" 
             style={{ 
               backgroundImage: 'url(/RFID_DC_Process_map.webp)',
               backgroundColor: '#f8fafc',
               backgroundSize: '68%'
             }}>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
        </div>
      </AnimatedSection>

      {/* Main Content */}
      <div className="py-8 sm:py-12 lg:py-16 xl:py-20 3xl:py-24">
        <div className="w-full px-2 sm:px-4 lg:px-6">
          {/* Detail Sections */}
          {renderDetailSections()}

          {/* Back Button */}
          <AnimatedSection animationType="fadeInUp" delay={500}>
            <div className="text-center mt-8">
              <button
                onClick={() => navigate('/solutions')}
                className="bg-[#36A9A9] hover:bg-[#2d8a8a] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Quay lại danh sách Solutions
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetail;
