import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import apiService from '../services/api';
import { Solution } from '../types/product';
import mediaPreloader from '../services/mediaPreloader';

const SolutionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  
  // Get cached video URL from preloaded media
  const cachedVideoUrl = useMemo(() => {
    const cached = mediaPreloader.getCachedUrl('/video_agv.mp4');
    if (cached) {
      console.log('[SolutionDetail] Using cached video URL');
    } else {
      console.warn('[SolutionDetail] Video not cached - using original URL');
    }
    return cached || '/video_agv.mp4';
  }, []);

  useEffect(() => {
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

    if (id) {
      fetchSolution();
    }
  }, [id]);

  useEffect(() => {
    loadCategories();
  }, []);

  const getDefaultIcon = () => (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );

  const loadCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const data = await apiService.getAllCategories();
      setCategories(data);
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
      setIsLoadingCategories(false);
    }
  };

  const nextCategories = () => {
    setSlideDirection('right');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCategoryIndex(prev => 
        prev + 1 >= categories.length ? 0 : prev + 1
      );
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const prevCategories = () => {
    setSlideDirection('left');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCategoryIndex(prev => 
        prev - 1 < 0 ? categories.length - 1 : prev - 1
      );
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  // Get number of visible categories based on screen size
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg and above
      if (window.innerWidth >= 640) return 2; // sm and above
      return 1; // mobile
    }
    return 3; // default for SSR
  });

  // Update visible count on resize
  useEffect(() => {
    const handleResize = () => {
      const newCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      if (newCount !== visibleCount) {
        setVisibleCount(newCount);
        // Reset to first index when screen size changes to avoid out of bounds
        if (currentCategoryIndex > categories.length - newCount) {
          setCurrentCategoryIndex(0);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Call once on mount to ensure correct initial state
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [visibleCount, currentCategoryIndex, categories.length]);

  const getVisibleCategories = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentCategoryIndex + i) % categories.length;
      visible.push(categories[index]);
    }
    return visible;
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
          <div className="mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 leading-tight max-w-5xl mx-auto text-center mb-4 sm:mb-6 lg:mb-8 px-4">
              {firstKey}
            </h1>
            {firstValue && (
              <div className="w-full px-4 sm:px-6 md:px-8 lg:px-6 xl:px-10 2xl:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8 2xl:gap-10">
                   {/* Left Column - First Key-Value with Image (1/3) */}
                   <div className="md:col-span-1 lg:col-span-1 space-y-3 sm:space-y-3 md:space-y-4 lg:space-y-3 xl:space-y-4">
                     <h3 className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900">
                       {Object.keys(firstValue)[0]}
                     </h3>
                     <div className="text-base sm:text-lg md:text-lg lg:text-base xl:text-lg 2xl:text-xl text-gray-600 leading-relaxed whitespace-pre-wrap text-left overflow-hidden">
                       {firstValue[Object.keys(firstValue)[0]]}
                     </div>
                     
                     {/* Image below content */}
                     <div className="mt-3 sm:mt-4 md:mt-4 lg:mt-3 xl:mt-5">
                       {solution.images?.[1]?.image ? (
                         <div className="h-[180px] sm:h-[220px] md:h-[260px] lg:h-[280px] xl:h-[320px] 2xl:h-[380px]">
                           <img
                             src={apiService.getImageUrl(solution.images[1].image)}
                             alt={Object.keys(firstValue)[0]}
                             className="w-full h-full object-cover rounded-lg shadow-md"
                           />
                         </div>
                       ) : (
                         <div className="h-[180px] sm:h-[220px] md:h-[260px] lg:h-[280px] xl:h-[320px] 2xl:h-[380px] bg-gradient-to-br from-[#36A9A9] to-[#2d8a8a] flex items-center justify-center rounded-lg shadow-md">
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
                  <div className="md:col-span-1 lg:col-span-2 flex flex-col space-y-3 sm:space-y-3 md:space-y-4 lg:space-y-3 xl:space-y-4">
                    {/* Text Content */}
                    <div className="space-y-3 sm:space-y-3 md:space-y-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900">
                        {Object.keys(firstValue)[1]}
                      </h3>
                      <div className="text-base sm:text-lg md:text-lg lg:text-base xl:text-lg 2xl:text-xl text-gray-600 leading-relaxed whitespace-pre-wrap text-left overflow-hidden">
                        {firstValue[Object.keys(firstValue)[1]]}
                      </div>
                    </div>
                    
                    {/* Image below content */}
                    <div className="mt-3 sm:mt-4 md:mt-4 lg:mt-3 xl:mt-5">
                      {solution.images?.[2]?.image ? (
                        <div className="h-[180px] sm:h-[220px] md:h-[260px] lg:h-[280px] xl:h-[320px] 2xl:h-[380px]">
                          <img
                            src={apiService.getImageUrl(solution.images[2].image)}
                            alt={Object.keys(firstValue)[1]}
                            className="w-full h-full object-cover rounded-lg shadow-md"
                          />
                        </div>
                      ) : (
                        <div className="h-[180px] sm:h-[220px] md:h-[260px] lg:h-[280px] xl:h-[320px] 2xl:h-[380px] bg-gradient-to-br from-[#36A9A9] to-[#2d8a8a] flex items-center justify-center rounded-lg shadow-md">
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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 sm:mb-6 lg:mb-6 xl:mb-8">
            <div className="flex flex-col lg:flex-row">
              {/* Left Content */}
              <div className="flex-1 p-4 sm:p-6 md:p-6 lg:p-6 xl:p-8">
                <div className="flex flex-col h-full">
                  {/* Title Field */}
                  <div className="mb-3 sm:mb-4 lg:mb-4 xl:mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-gray-900">
                      {key}
                    </h2>
                  </div>
                  
                  {/* Content Field */}
                  <div className="flex-1">
                    <div className="text-base sm:text-lg md:text-lg lg:text-base xl:text-lg 2xl:text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="w-full lg:w-72 xl:w-80 lg:min-w-[280px] xl:min-w-[320px]">
                {currentImage?.image ? (
                  <div className="h-[200px] sm:h-[250px] md:h-[280px] lg:h-full">
                    <img
                      src={apiService.getImageUrl(currentImage.image)}
                      alt={key}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-[200px] sm:h-[250px] md:h-[280px] lg:h-full bg-gradient-to-br from-[#36A9A9] to-[#2d8a8a] flex items-center justify-center">
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
            onClick={() => navigate('/rfid-solutions')}
            className="bg-[#36A9A9] hover:bg-[#2d8a8a] text-white px-6 py-2 rounded-lg transition-colors duration-300"
          >
            Back to Solutions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background */}
      <AnimatedSection animationType="fadeInUp" delay={0}>
        <div className="relative mt-20 h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] flex items-center justify-center bg-center bg-no-repeat" 
             style={{ 
               backgroundImage: 'url(/RFID_DC_Process_map.webp)',
               backgroundColor: '#f8fafc',
               backgroundSize: '65%'
             }}>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
        </div>
      </AnimatedSection>

      {/* Main Content */}
      <div className="py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 2xl:py-20">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-6 xl:px-8">
          {/* Detail Sections */}
          {renderDetailSections()}

          {/* Related Solutions Section */}
          <AnimatedSection animationType="fadeInUp" delay={400}>
            <div className="py-6 sm:py-8 lg:py-10 bg-gray-50 rounded-lg shadow-lg mt-6 sm:mt-8 lg:mt-10">
              <div className="max-w-6xl mx-auto px-3 sm:px-4">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-2">Related Categories</h2>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">Explore our RFID product categories</p>
                </div>
                
                {/* Navigation and Categories */}
                <div className="relative overflow-visible">
                  {/* Navigation Arrows */}
                  {categories.length > visibleCount && (
                    <>
                      <button
                        onClick={prevCategories}
                        disabled={isTransitioning}
                        className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-600 hover:text-[#36A9A9] w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous category"
                      >
                        <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextCategories}
                        disabled={isTransitioning}
                        className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-600 hover:text-[#36A9A9] w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next category"
                      >
                        <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                  
                  {/* Categories Grid */}
                  <div 
                    className="grid gap-4 sm:gap-6 px-10 sm:px-12 md:px-14"
                    style={{
                      gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
                      opacity: isTransitioning ? 0 : 1,
                      transform: isTransitioning 
                        ? `translateX(${slideDirection === 'right' ? '20px' : '-20px'}) scale(0.98)` 
                        : 'translateX(0) scale(1)',
                      transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: isTransitioning ? 'blur(4px)' : 'blur(0px)'
                    }}
                  >
                    {isLoadingCategories ? (
                      // Loading skeleton
                      Array.from({ length: visibleCount }).map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                          <div className="h-52 sm:h-56 md:h-60 lg:h-56 xl:h-64 2xl:h-72 bg-gray-200 rounded-lg mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      ))
                    ) : (
                       getVisibleCategories().map((category, index) => (
                        <AnimatedSection key={`${category.id}-${currentCategoryIndex}`} animationType="fadeInUp" delay={!isTransitioning ? (500 + index * 100) : (index * 80)}>
                          <div 
                            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden"
                            style={{
                              transform: 'perspective(1000px) rotateX(0deg)',
                              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'perspective(1000px) translateY(-12px) rotateX(2deg) scale(1.03)';
                              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(54, 169, 169, 0.4), 0 0 30px rgba(54, 169, 169, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)';
                              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                            }}
                            onClick={() => navigate(`/rfid-products?category=${category.id}`)}
                          >
                            {/* Shimmer Effect Overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
                              <div 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                style={{
                                  animation: 'shimmer 2s infinite',
                                  transform: 'translateX(-100%)'
                                }}
                              />
                            </div>
                            
                            {/* Image */}
                            <div className="relative h-52 sm:h-56 md:h-60 lg:h-56 xl:h-64 2xl:h-72 overflow-hidden rounded-t-lg">
                              <img
                                src={category.image ? apiService.getImageUrl(category.image) : '/rfid-readers.webp'}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-115 transition-all duration-700 ease-out group-hover:brightness-110"
                                style={{ 
                                  filter: 'contrast(1.05)',
                                  transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease'
                                }}
                                onError={(e) => {
                                  e.currentTarget.src = '/rfid-readers.webp';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                              
                              {/* Glowing Border Effect */}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 border-2 border-[#36A9A9]/50 rounded-t-lg" style={{ boxShadow: '0 0 20px rgba(54, 169, 169, 0.3)' }}></div>
                              </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-4 sm:p-5">
                              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#36A9A9] transition-colors duration-300">
                                {category.name}
                              </h3>
                              <p className="text-sm sm:text-base text-gray-600 mb-3">
                                Explore products
                              </p>
                              
                              {/* Action Button */}
                              <div className="flex items-center text-[#36A9A9] font-medium text-sm sm:text-base group-hover:text-[#2d8a8a] transition-colors duration-300">
                                <span>View Products</span>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </AnimatedSection>
                      ))
                    )}
                  </div>
                </div>
                
                {/* Pagination Dots - Optional indicator */}
                {categories.length > visibleCount && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    {categories.map((_, idx) => {
                      const isActive = currentCategoryIndex === idx;
                      const isVisible = idx >= currentCategoryIndex && idx < currentCategoryIndex + visibleCount;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setSlideDirection(idx > currentCategoryIndex ? 'right' : 'left');
                            setIsTransitioning(true);
                            setTimeout(() => {
                              setCurrentCategoryIndex(idx);
                              setTimeout(() => setIsTransitioning(false), 50);
                            }, 300);
                          }}
                          disabled={isTransitioning}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isActive 
                              ? 'w-8 bg-[#36A9A9]' 
                              : isVisible
                              ? 'w-3 bg-[#36A9A9]/60'
                              : 'w-2 bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to category ${idx + 1}`}
                        />
                      );
                    })}
                  </div>
                )}
                
              </div>
            </div>
          </AnimatedSection>

          {/* Benefits Section */}
          <AnimatedSection animationType="fadeInUp" delay={800}>
            <div className="py-8 sm:py-12 lg:py-16 bg-white rounded-lg shadow-lg mt-8 sm:mt-12 lg:mt-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose Our RFID Solutions?</h2>
                </div>
                
                {/* Video Section */}
                <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-2 sm:px-4">
                    <video 
                      ref={videoRef}
                      className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px] object-cover rounded-lg shadow-lg"
                      loop
                      muted
                      autoPlay
                      playsInline
                      preload="auto"
                      style={{ 
                        filter: 'brightness(1.1) contrast(1.05)',
                        animation: 'none'
                      }}
                      onLoadedData={() => {
                        if (videoRef.current) {
                          videoRef.current.playbackRate = 0.7; // Chạy chậm 30%
                        }
                      }}
                    >
                      <source src={cachedVideoUrl} type="video/mp4" />
                      <p className="text-center text-gray-600 py-8">
                        Your browser does not support the video tag.
                      </p>
                    </video>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { title: "High Accuracy", description: "99.9% reading accuracy" },
                    { title: "Long Range", description: "Up to 15 meters reading distance" },
                    { title: "Fast Processing", description: "Real-time data processing" },
                    { title: "Easy Integration", description: "Seamless system integration" }
                  ].map((benefit, index) => (
                    <AnimatedSection key={index} animationType="fadeInUp" delay={700 + index * 100}>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-[#36A9A9] rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>


          {/* Back Button */}
          <AnimatedSection animationType="fadeInUp" delay={500}>
            <div className="text-center mt-6 sm:mt-8 lg:mt-10">
              <button
                onClick={() => navigate('/rfid-solutions')}
                className="bg-[#36A9A9] hover:bg-[#2d8a8a] text-white text-sm sm:text-base lg:text-sm xl:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Back to Solutions
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetail;
