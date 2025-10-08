import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import CategorySidebar from '../components/CategorySidebar';
import CategoryInfo from '../components/CategoryInfo';
import apiService from '../services/api';
import { categoryCache } from '../utils/categoryCache';

const RFIDProducts: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const itemsPerPage = 6;

  // Get category from URL - memoized to avoid dependency issues
  const getCategoryFromURL = useCallback(() => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('category');
  }, [location.search]);

  // Load categories from API or cache
  const loadCategories = async () => {
    try {
      // Check cache first
      const cachedCategories = categoryCache.getCachedCategories();
      if (cachedCategories) {
        setCategories(cachedCategories);
        return cachedCategories;
      }

      const data = await apiService.getAllCategories();
      setCategories(data);
      categoryCache.setCachedCategories(data);
      return data;
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
      return fallbackData;
    }
  };

  // Fetch products by category from backend
  const fetchProductsByCategory = async (categoryId: string) => {
    setIsLoading(true);
    // Clear products immediately when starting to fetch new category
    setCategoryProducts([]);
    setCurrentPage(1);
    
    try {
      // Use the unified API service with search endpoint
      const productsData = await apiService.searchProducts({
        category: parseInt(categoryId),
      });
      
      // Transform data to match our expected format
      const transformedProducts = productsData.map((product: any) => ({
        id: product.id,
        name: product.name || 'Unnamed Product',
        description: product.description || 'No description available',
        // Get first image URL from images array, or use placeholder
        image: product.images && product.images.length > 0 && product.images[0].image_url
          ? apiService.getImageUrl(product.images[0].image_url)
          : '/placeholder-product.jpg',
        features: product.parameters ? Object.keys(product.parameters) : ['Standard Features']
      }));
      
      setCategoryProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setCategoryProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to load categories and auto-select first category on initial load
  useEffect(() => {
    const initializePage = async () => {
      const categoryId = getCategoryFromURL();
      
      // Always load categories on initial load, regardless of categoryId
      if (isInitialLoad && categories.length === 0) {
        const categoriesData = await loadCategories();
        
        if (!categoryId && categoriesData && categoriesData.length > 0) {
          // If no category is selected, select the first one
          const firstCategory = categoriesData[categoriesData.length - 1];
          navigate(`/rfid-products?category=${firstCategory.id}`, { replace: true });
        }
        setIsInitialLoad(false);
      } else if (categoryId) {
        setIsInitialLoad(false);
      }
    };

    initializePage();
  }, [isInitialLoad, categories.length, getCategoryFromURL, navigate]);

  // Effect to handle category changes and set selected category
  useEffect(() => {
    const categoryId = getCategoryFromURL();
    
    if (categoryId && categories.length > 0) {
      // Find and set the selected category
      const category = categories.find(cat => cat.id.toString() === categoryId);
      setSelectedCategory(category || null);
      
      // Fetch products for this category
      fetchProductsByCategory(categoryId);
      setCurrentPage(1); // Reset to first page when category changes
    } else if (categoryId && categories.length === 0) {
      // Don't clear anything, wait for categories to load
    } else if (!categoryId) {
      // Only clear when there's no categoryId in URL
      setCategoryProducts([]);
      setSelectedCategory(null);
      setCurrentPage(1);
    }
  }, [location.search, categories, getCategoryFromURL]);

  // Pagination logic
  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = categoryProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <AnimatedSection animationType="fadeInUp" delay={0}>
        <div 
          className="relative h-[75vh] flex items-center justify-start"
          style={{
            backgroundImage: 'url(/products_image/antena-invengo.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Content */}
          <div className="relative z-10 container-responsive w-full pt-16 lg:pt-20 xl:pt-24 3xl:pt-28">
            <div className="max-w-xl xl:max-w-2xl 3xl:max-w-3xl">
              <h1 className="text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-white mb-4 lg:mb-6 xl:mb-8 leading-tight">
                RFID SOLUTIONS FOR SMART BUSINESS
              </h1>
              <p className="text-sm lg:text-base xl:text-lg 3xl:text-xl 4xl:text-2xl text-white/95 mb-6 lg:mb-8 xl:mb-10 leading-relaxed">
                Transform your business operations with our comprehensive RFID technology solutions. From inventory management to asset tracking, our RFID products deliver real-time visibility, improved efficiency, and significant cost savings across industries including manufacturing, retail, healthcare, and logistics.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    navigate('/contact-us');
                    window.scrollTo({ top: 0, behavior: 'auto' });
                  }}
                  className="bg-[#36A9A9] hover:bg-[#2a8a8a] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  CONTACT THADO
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Products Section */}
      <AnimatedSection animationType="fadeInUp" delay={200}>
        <div className="py-12 lg:py-16 xl:py-20 3xl:py-24">
          <div className="container-responsive">
            {/* Title */}
            <div className="text-center mb-6 lg:mb-8 xl:mb-10 3xl:mb-12">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-light text-black mb-4">
                Product Selections
              </h2>
            </div>
            
            {/* Main Content Layout */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10 3xl:gap-12">
              {/* Left Side - Category Sidebar - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:block flex-shrink-0">
                <CategorySidebar />
              </div>
              
              {/* Mobile Category Selector */}
              <div className="lg:hidden mb-6">
                <select 
                  onChange={(e) => {
                    const categoryId = e.target.value;
                    if (categoryId) {
                      window.location.href = `/rfid-products?category=${categoryId}`;
                    } else {
                      window.location.href = '/rfid-products';
                    }
                  }}
                  value={selectedCategory?.id || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Right Side - Product Cards */}
              <div className="flex-1">
                {/* Category Info Section */}
                {selectedCategory && (
                  <div className="mb-4 lg:mb-6">
                    <CategoryInfo category={selectedCategory} />
                  </div>
                )}
                
                
                {isLoading ? (
                  <div className="flex items-center justify-center h-[672px]">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#36A9A9] mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading products...</p>
                    </div>
                  </div>
                ) : currentProducts.length === 0 ? (
                  <div className="flex items-center justify-center h-[672px]">
                    <div className="text-center">
                      <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <h3 className="text-xl font-medium text-gray-500 mb-2">No Products Available</h3>
                      <p className="text-gray-400">
                        {getCategoryFromURL() 
                          ? 'No products found for this category. Please try another category.' 
                          : 'Please select a category to view products.'
                        }
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
                    {currentProducts.map((product, index) => (
                    <AnimatedSection key={product.id} animationType="fadeInUp" delay={300 + index * 100}>
                      <div 
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-48 lg:h-56 xl:h-64 3xl:h-72 flex flex-col cursor-pointer group"
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                          window.scrollTo({ top: 0, behavior: 'auto' });
                        }}
                      >
                        <div className="h-36 lg:h-40 xl:h-44 bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.image && product.image !== '/placeholder-product.jpg' ? (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                // Fallback to placeholder if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-product.jpg';
                              }}
                            />
                          ) : (
                            <div className="text-gray-400 text-center">
                              <svg className="w-12 h-12 lg:w-16 lg:h-16 xl:w-18 xl:h-18 3xl:w-20 3xl:h-20 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-xs lg:text-sm xl:text-base">No Image</p>
                            </div>
                          )}
                        </div>
                        <div className="p-3 lg:p-4 xl:p-5 flex-1 flex flex-col">
                          <h3 className="text-lg lg:text-xl xl:text-2xl 3xl:text-3xl font-semibold text-gray-900 mb-2 group-hover:text-[#36A9A9] transition-colors duration-300">{product.name}</h3>
                          <p className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-gray-600 mb-3 lg:mb-4 line-clamp-1">
                            {product.description}
                          </p>
                          <ul className="space-y-1 flex-1">
                            {product.features.slice(0, 0).map((feature: string, featureIndex: number) => (
                              <li key={featureIndex} className="flex items-center text-xs lg:text-sm xl:text-base text-gray-600">
                                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-[#36A9A9] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AnimatedSection>
                    ))}
                  </div>
                )}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-6 lg:mt-8 xl:mt-10">
                    <div className="flex items-center space-x-1 lg:space-x-2">
                      {/* Previous Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-3 rounded-lg font-medium transition-all duration-200 text-sm lg:text-base xl:text-lg ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <svg className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-3 rounded-lg font-medium transition-all duration-200 text-sm lg:text-base xl:text-lg ${
                            currentPage === page
                              ? 'bg-[#36A9A9] text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* RFID Work Section */}
      <AnimatedSection animationType="fadeInUp" delay={400}>
        <div className="py-16">
          <div className="w-full px-4 lg:px-6 xl:px-8">
            <div className="relative overflow-hidden">
              {/* Background Image */}
              <div 
                className="relative h-[60vh] lg:h-[65vh] xl:h-[70vh] w-[70vw] lg:w-[75vw] xl:w-[80vw] mx-auto flex items-center justify-start overflow-hidden"
                style={{
                  backgroundImage: 'url(/products_image/RFID_work.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Content */}
                <div className="relative z-10 max-w-3xl lg:max-w-4xl xl:max-w-5xl px-6 lg:px-8 xl:px-12">
                  <div className="bg-black/60 p-6 lg:p-8 xl:p-10 3xl:p-12">
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-white mb-4 lg:mb-6 xl:mb-8">
                      HOW DOES RFID WORK?
                    </h2>
                    
                    {/* Horizontal Bar */}
                    <div className="h-1 lg:h-1.5 xl:h-2 bg-white mb-6 lg:mb-8 xl:mb-10 rounded-full"></div>
                    
                    <div className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-white/90 leading-relaxed mb-6 lg:mb-8 xl:mb-10 space-y-4 lg:space-y-6">
                      <div>
                        <span className="font-bold">Components:</span> An RFID system uses three parts: <span className="font-bold">reader</span> (sends signals), <span className="font-bold">antenna</span> (transmits waves), and <span className="font-bold">tag</span> (stores data). Passive tags rely on reader energy, while industrial antennas enable long-range tracking.
                      </div>
                      
                      <div>
                        <span className="font-bold">Working Principle:</span> The reader emits radio waves via the antenna to activate tags. Tags use <span className="font-bold">backscatter modulation</span> to reflect signals with stored data (e.g., ID, location), which the antenna converts into digital information.
                      </div>
                      
                      <div>
                        <span className="font-bold">Workflow:</span> The reader scans tags via antenna, converts signals into data, processes it through software (e.g., <span className="font-bold">WMS</span>), and displays real-time insights like inventory status on dashboards.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animationType="fadeInUp" delay={600}>
        <div className="py-16 bg-[#36A9A9]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-white mb-4">
              Need Custom RFID Solutions?
            </h2>
            <p className="text-white/90 text-base lg:text-lg xl:text-xl 3xl:text-2xl mb-6 lg:mb-8">
              Contact us for tailored RFID products and technical support
            </p>
            <button className="bg-white hover:bg-white/90 text-[#36A9A9] px-6 py-2 lg:px-8 lg:py-3 xl:px-10 xl:py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg text-sm lg:text-base xl:text-lg">
              Contact Us
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default RFIDProducts;