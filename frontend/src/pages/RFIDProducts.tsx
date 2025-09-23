import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import CategorySidebar from '../components/CategorySidebar';
import apiService from '../services/apiService';
import { categoryCache } from '../utils/categoryCache';

const RFIDProducts: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setCategories] = useState<any[]>([]);
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
      console.log('Fetching products for category:', categoryId);
      
      // Use the correct search endpoint with category parameter
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000/api'}/products/search/?category=${categoryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Products data from backend:', data);
      
      // Handle the search endpoint response format
      let productsData = [];
      if (data.results && Array.isArray(data.results)) {
        productsData = data.results;
      } else if (Array.isArray(data)) {
        productsData = data;
      } else {
        console.warn('Unexpected data format:', data);
        productsData = [];
      }
      
      // Transform data to match our expected format
      const transformedProducts = productsData.map((product: any) => ({
        id: product.id,
        name: product.name || 'Unnamed Product',
        description: product.description || 'No description available',
        // Get first image URL from images array, or use placeholder
        image: product.images && product.images.length > 0 && product.images[0].image_url
          ? `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}${product.images[0].image_url}`
          : '/placeholder-product.jpg',
        features: product.parameters ? Object.keys(product.parameters) : ['Standard Features']
      }));
      
      console.log('Transformed products:', transformedProducts);
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
      
      // If no category is selected, load categories and select the first one
      if (!categoryId && isInitialLoad) {
        const categoriesData = await loadCategories();
        if (categoriesData && categoriesData.length > 0) {
          // Select the first category (reverse order to match CategorySidebar)
          const firstCategory = categoriesData[categoriesData.length - 1];
          navigate(`/rfid-products?category=${firstCategory.id}`, { replace: true });
          setIsInitialLoad(false);
        }
      } else if (categoryId) {
        setIsInitialLoad(false);
      }
    };

    initializePage();
  }, [isInitialLoad, getCategoryFromURL, navigate]); // Add missing dependencies

  // Effect to handle category changes - only fetch when category is selected
  useEffect(() => {
    const categoryId = getCategoryFromURL();
    
    if (categoryId) {
      fetchProductsByCategory(categoryId);
      setCurrentPage(1); // Reset to first page when category changes
    } else {
      // Clear products when no category is selected
      setCategoryProducts([]);
      setCurrentPage(1);
    }
  }, [location.search, getCategoryFromURL]);

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
          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full pt-20">
            <div className="max-w-xl">
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                RFID SOLUTIONS FOR SMART BUSINESS
              </h1>
              <p className="text-base lg:text-lg text-white/95 mb-6 leading-relaxed">
                Transform your business operations with our comprehensive RFID technology solutions. From inventory management to asset tracking, our RFID products deliver real-time visibility, improved efficiency, and significant cost savings across industries including manufacturing, retail, healthcare, and logistics.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/contact-us')}
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
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-4xl lg:text-5xl font-light text-black mb-4">
                Product Selections
              </h2>
            </div>
            
            {/* Main Content Layout */}
            <div className="flex gap-8">
              {/* Left Side - Category Sidebar */}
              <div className="flex-shrink-0">
                <CategorySidebar />
              </div>
              
              {/* Right Side - Product Cards */}
              <div className="flex-1">
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
                      <p className="text-gray-400">Please select a category to view products.</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 grid-rows-2 gap-6 h-[672px]">
                    {currentProducts.map((product, index) => (
                    <AnimatedSection key={product.id} animationType="fadeInUp" delay={300 + index * 100}>
                      <div 
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-pointer group"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <div className="h-48 bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
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
                              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-sm">No Image</p>
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#36A9A9] transition-colors duration-300">{product.name}</h3>
                          <p className="text-gray-600 mb-4">{product.description}</p>
                          <ul className="space-y-2 flex-1">
                            {product.features.map((feature: string, featureIndex: number) => (
                              <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                <svg className="w-4 h-4 text-[#36A9A9] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">Click to view details</span>
                              <svg className="w-4 h-4 text-[#36A9A9] group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                    ))}
                  </div>
                )}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2">
                      {/* Previous Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
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

      {/* CTA Section */}
      <AnimatedSection animationType="fadeInUp" delay={600}>
        <div className="py-16 bg-[#36A9A9]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Custom RFID Solutions?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Contact us for tailored RFID products and technical support
            </p>
            <button className="bg-white hover:bg-white/90 text-[#36A9A9] px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg">
              Contact Us
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default RFIDProducts;