import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCompare } from '../contexts/CompareContext';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSection from '../components/AnimatedSection';
import apiService from '../services/api';

interface AIComparison {
  overall: string;
  quality: string;
  performance: string;
  integration: string;
  recommendation: string;
}

const Compare: React.FC = () => {
  const { compareProducts, removeFromCompare, clearCompare } = useCompare();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [aiComparison, setAiComparison] = useState<AIComparison | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiPowered, setAiPowered] = useState(false);
  
  // Track danh sách product IDs đã fetch để tránh gọi API trùng lặp
  const lastFetchedIdsRef = useRef<string>('');

  const fetchAIComparison = useCallback(async () => {
    const productIds = compareProducts.map(p => p.id);
    const idsKey = productIds.sort().join('-'); // Sort để đảm bảo thứ tự không ảnh hưởng
    
    // Kiểm tra xem đã fetch combo này chưa
    if (lastFetchedIdsRef.current === idsKey) {
      console.log('Skipping API call - same products already fetched');
      return;
    }
    
    console.log('Fetching AI comparison for:', idsKey);
    lastFetchedIdsRef.current = idsKey;
    setIsLoadingAI(true);
    
    try {
      const response = await apiService.compareProductsWithAI(productIds, language);
      
      if (response.success && response.comparison) {
        setAiComparison(response.comparison);
        setAiPowered(response.ai_powered || false);
      }
    } catch (error) {
      console.error('Error fetching AI comparison:', error);
      // Set fallback comparison based on current language
      setAiComparison({
        overall: t('compare.fallback.overall'),
        quality: t('compare.fallback.quality'),
        performance: t('compare.fallback.performance'),
        integration: t('compare.fallback.integration'),
        recommendation: t('compare.fallback.recommendation')
      });
      setAiPowered(false);
    } finally {
      setIsLoadingAI(false);
    }
  }, [compareProducts, language, t]);

  // Gọi API Gemini khi có sản phẩm để so sánh
  useEffect(() => {
    if (compareProducts.length >= 2) {
      fetchAIComparison();
    } else if (compareProducts.length === 0) {
      // Reset khi clear all
      lastFetchedIdsRef.current = '';
      setAiComparison(null);
    }
  }, [compareProducts, fetchAIComparison]);

  if (compareProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 lg:pt-28 xl:pt-32 px-4">
        <AnimatedSection animationType="fadeInUp" delay={100}>
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6 sm:mb-8">
              <svg className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">No Products to Compare</h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8">Start adding products to compare their features and specifications.</p>
            <Link
              to="/rfid-products"
              className="inline-flex items-center bg-[#36A9A9] hover:bg-[#2d8a8a] text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-lg text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Browse Products
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  // Get all unique parameter keys from all products
  const getAllParameterKeys = () => {
    const keys = new Set<string>();
    compareProducts.forEach((product) => {
      if (product.parameters) {
        Object.entries(product.parameters).forEach(([category, specs]) => {
          if (typeof specs === 'object' && specs !== null) {
            Object.keys(specs).forEach((key) => keys.add(`${category}::${key}`));
          }
        });
      }
    });
    return Array.from(keys);
  };

  const parameterKeys = getAllParameterKeys();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 lg:pt-28 xl:pt-32 pb-8 lg:pb-12 xl:pb-16">
      <div className="w-full max-w-full lg:max-w-[95%] xl:max-w-[90%] 3xl:max-w-[85%] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Header */}
        <AnimatedSection animationType="fadeInUp" delay={100}>
          <div className="mb-6 lg:mb-8 xl:mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 lg:mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2">Compare Products</h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                  Comparing {compareProducts.length} product{compareProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={clearCompare}
                  className="px-3 py-2 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  Clear All
                </button>
                <button
                  onClick={() => {
                    // Navigate to products page with the same category filter
                    const categoryId = compareProducts[0]?.category?.id;
                    if (categoryId) {
                      navigate(`/rfid-products?category=${categoryId}`);
                    } else {
                      navigate('/rfid-products');
                    }
                  }}
                  className="px-3 py-2 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 text-sm sm:text-base bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  Add More
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Comparison Table - Horizontal Scroll */}
        <AnimatedSection animationType="fadeInUp" delay={200}>
          {/* Scroll Hint - Mobile */}
          <div className="lg:hidden mb-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Scroll horizontally to see all products</span>
            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Table wrapper với scroll indicator */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" 
                 style={{ 
                   WebkitOverflowScrolling: 'touch',
                   scrollBehavior: 'smooth'
                 }}>
              <table className="w-full border-collapse">
                {/* Product Images and Names */}
                <thead className="bg-gray-50">
                  <tr>
                    <th className="sticky left-0 bg-gray-50 z-10 px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-4 text-left text-sm sm:text-base lg:text-lg font-semibold text-gray-900 min-w-[150px] sm:min-w-[180px] lg:min-w-[200px]">
                      Product
                    </th>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-4 min-w-[200px] sm:min-w-[230px] lg:min-w-[250px]">
                        <div className="space-y-2 sm:space-y-3">
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="ml-auto block text-red-600 hover:text-red-700 transition-colors duration-200"
                            title="Remove from compare"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          
                          {/* Product Image */}
                          <Link to={`/product/${product.id}`} className="block">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 sm:mb-3">
                              {product.images && product.images.length > 0 ? (
                                <img
                                  src={apiService.getImageUrl(product.images[0].image)}
                                  alt={product.name}
                                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </Link>

                          {/* Product Name */}
                          <Link to={`/product/${product.id}`}>
                            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 hover:text-[#36A9A9] transition-colors duration-200 line-clamp-2 mb-1 sm:mb-2">
                              {product.name}
                            </h3>
                          </Link>

                          {/* Category */}
                          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2 sm:mb-3">{product.category.name}</p>

                          {/* Action Button */}
                          <Link
                            to={`/product/${product.id}`}
                            className="block w-full bg-[#36A9A9] hover:bg-[#2d8a8a] text-white text-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base font-medium transition-all duration-300"
                          >
                            View Details
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>

                {/* Basic Information */}
                <tbody>
                  {/* Description */}
                  <tr className="border-t border-gray-200 hover:bg-gray-50">
                    <th className="sticky left-0 bg-white hover:bg-gray-50 z-10 px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-4 text-left text-xs sm:text-sm lg:text-base font-medium text-gray-700">
                      Description
                    </th>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-4 text-xs sm:text-sm lg:text-base text-gray-600">
                        <div className="line-clamp-3 leading-relaxed">{product.description || 'N/A'}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Parameters Comparison */}
                  {parameterKeys.length > 0 && (
                    <>
                      <tr className="bg-gray-100">
                        <th colSpan={compareProducts.length + 1} className="px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-3 text-left text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
                          Technical Specifications
                        </th>
                      </tr>
                      {parameterKeys.map((key) => {
                        const [category, paramName] = key.split('::');
                        return (
                          <tr key={key} className="border-t border-gray-200 hover:bg-gray-50">
                            <th className="sticky left-0 bg-white hover:bg-gray-50 z-10 px-3 py-3 sm:px-4 sm:py-3.5 lg:px-6 lg:py-4 text-left font-medium text-gray-700 text-xs sm:text-sm lg:text-base">
                              <div className="text-[10px] sm:text-xs lg:text-sm text-gray-500 mb-0.5 sm:mb-1">{category}</div>
                              <div className="leading-tight">{paramName.replace(/_/g, ' ')}</div>
                            </th>
                            {compareProducts.map((product) => {
                              let value = 'N/A';
                              if (product.parameters && product.parameters[category]) {
                                const specs = product.parameters[category];
                                if (typeof specs === 'object' && specs !== null) {
                                  value = specs[paramName] || 'N/A';
                                }
                              }
                              return (
                                <td key={product.id} className="px-3 py-3 sm:px-4 sm:py-3.5 lg:px-6 lg:py-4 text-xs sm:text-sm lg:text-base text-gray-900">
                                  <div className="leading-relaxed">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </>
                  )}

                  {/* Overall Summary with AI */}
                  <tr className="bg-gradient-to-r from-[#36A9A9]/10 to-[#36A9A9]/5 border-t-2 border-[#36A9A9]">
                    <td colSpan={compareProducts.length + 1} className="px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6">
                      <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {isLoadingAI ? (
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#36A9A9] animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#36A9A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
                            Overall Comparison
                            {aiPowered && !isLoadingAI && (
                              <span className="ml-2 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">AI Powered</span>
                            )}
                          </h3>
                        </div>
                        {isLoadingAI && (
                          <span className="text-xs sm:text-sm text-gray-500 italic">AI Analyzing...</span>
                        )}
                      </div>
                      
                      {isLoadingAI ? (
                        // Loading State
                        <div className="space-y-3 sm:space-y-4 animate-pulse">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="flex items-start gap-2 sm:gap-3">
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-300 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                <div className="flex-1 space-y-2">
                                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="bg-white/50 rounded-lg p-3 sm:p-4 border border-gray-200">
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                            <div className="space-y-2">
                              <div className="h-3 bg-gray-200 rounded w-full"></div>
                              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      ) : aiComparison ? (
                        // AI Comparison Results
                        <div className="space-y-3 sm:space-y-4">
                          {/* Overall Description */}
                          <div className="bg-white/70 rounded-lg p-3 sm:p-4 border border-[#36A9A9]/30">
                            <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                              {aiComparison.overall}
                            </p>
                          </div>

                          {/* Summary Points */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#36A9A9] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                                <span className="font-semibold text-gray-900">Quality:</span> {aiComparison.quality}
                              </p>
                            </div>
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#36A9A9] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                                <span className="font-semibold text-gray-900">Performance:</span> {aiComparison.performance}
                              </p>
                            </div>
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#36A9A9] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                                <span className="font-semibold text-gray-900">Integration:</span> {aiComparison.integration}
                              </p>
                            </div>
                          </div>
                          
                          {/* Recommendation */}
                          <div className="bg-white/50 rounded-lg p-3 sm:p-4 border border-[#36A9A9]/20">
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#36A9A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-700">Recommendation</span>
                            </div>
                            <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                              {aiComparison.recommendation}
                            </p>
                          </div>
                        </div>
                      ) : (
                        // Fallback - No AI data
                        <div className="text-center py-4 text-gray-500">
                          <p className="text-sm">Không thể tải thông tin so sánh. Vui lòng thử lại sau.</p>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Compare;

