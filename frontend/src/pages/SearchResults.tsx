import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';
import apiService from '../services/api';

interface SearchProduct {
  id: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  images: Array<{
    id: number;
    image_url: string;
  }>;
}

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Get search query from URL
  const getSearchQuery = useCallback(() => {
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  }, [location.search]);

  // Fetch search results
  const fetchSearchResults = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiService.searchProducts({ q: query });
      
      // Transform data
      const transformedResults = response.map((product: any) => ({
        id: product.id,
        name: product.name || 'Unnamed Product',
        description: product.description || 'No description available',
        category: product.category || { id: 0, name: 'Uncategorized' },
        brand: product.brand || { id: 0, name: 'Unknown Brand' },
        images: product.images || []
      }));
      
      setResults(transformedResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update search query and fetch results when URL changes
  useEffect(() => {
    const query = getSearchQuery();
    setSearchQuery(query);
    if (query) {
      fetchSearchResults(query);
    } else {
      setResults([]);
    }
    setCurrentPage(1);
  }, [location.search, getSearchQuery, fetchSearchResults]);

  // Handle search form submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Pagination
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = results.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <>
      <SEO 
        title={`Search Results${searchQuery ? ` for "${searchQuery}"` : ''} - Thado RFID`}
        description={`Search results for RFID products and solutions. Find the perfect RFID technology for your needs.`}
        keywords="RFID search, product search, RFID solutions"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Search Bar */}
        <AnimatedSection animationType="fadeInUp" delay={0}>
          <div className="relative bg-gradient-to-br from-[#1e5e5e] via-[#36A9A9] to-[#22eef2] pt-24 pb-16 lg:pt-32 lg:pb-20 xl:pt-36 xl:pb-24 3xl:pt-40 3xl:pb-28 overflow-hidden">
            {/* RFID Image - Right Side */}
            <div className="absolute right-0 top-0 bottom-0 w-3/5 lg:w-1/2 xl:w-2/5 flex items-center justify-end pr-0 lg:pr-4 xl:pr-8 pointer-events-none">
              <img 
                src="/RFID_slide2.webp"
                alt="RFID Technology"
                className="w-full h-auto max-h-[70%] lg:max-h-[75%] xl:max-h-[80%] object-contain opacity-70 lg:opacity-80 xl:opacity-90"
              />
            </div>

            <div className="container-responsive relative z-10">
              <div className="text-center mb-8 lg:mb-12 xl:mb-16">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl font-bold text-white mb-4 lg:mb-6">
                  Search Products
                </h1>
                <p className="text-base lg:text-lg xl:text-xl 3xl:text-2xl text-white/90 max-w-2xl mx-auto">
                  Find the perfect RFID solution for your needs
                </p>
              </div>

              {/* Search Form */}
              <div className="max-w-3xl xl:max-w-4xl mx-auto">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products, categories, brands..."
                      className="w-full px-6 py-4 lg:px-8 lg:py-5 xl:px-10 xl:py-6 text-base lg:text-lg xl:text-xl rounded-lg focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#36A9A9] hover:bg-[#2a8a8a] text-white px-4 py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <svg className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Results Section */}
        <AnimatedSection animationType="fadeInUp" delay={200}>
          <div className="py-12 lg:py-16 xl:py-20">
            <div className="container-responsive">
              {/* Results Header */}
              {searchQuery && (
                <div className="mb-6 lg:mb-8">
                  <h2 className="text-xl lg:text-2xl xl:text-3xl text-gray-900">
                    {isLoading ? (
                      'Searching...'
                    ) : (
                      <>
                        Found <span className="font-bold text-[#36A9A9]">{results.length}</span> results for 
                        <span className="font-bold"> "{searchQuery}"</span>
                      </>
                    )}
                  </h2>
                </div>
              )}

              {/* Loading State */}
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#36A9A9] mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Searching products...</p>
                  </div>
                </div>
              ) : results.length === 0 ? (
                /* No Results */
                <div className="text-center py-20">
                  <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {searchQuery ? 'No Results Found' : 'Start Your Search'}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    {searchQuery 
                      ? `We couldn't find any products matching "${searchQuery}". Try different keywords.`
                      : 'Enter keywords to search for RFID products and solutions'
                    }
                  </p>
                  <Link
                    to="/rfid-products"
                    className="inline-flex items-center bg-[#36A9A9] hover:bg-[#2a8a8a] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    Browse All Products
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <>
                  {/* Results Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {currentResults.map((product, index) => (
                      <AnimatedSection key={product.id} animationType="fadeInUp" delay={300 + index * 50}>
                        <div 
                          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full flex flex-col"
                          onClick={() => {
                            navigate(`/product/${product.id}`);
                            window.scrollTo({ top: 0, behavior: 'auto' });
                          }}
                        >
                          {/* Product Image */}
                          <div className="h-48 lg:h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                              <img 
                                src={apiService.getImageUrl(product.images[0].image_url)}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/placeholder-product.jpg';
                                }}
                              />
                            ) : (
                              <div className="text-gray-400">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm mt-2">No Image</p>
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="p-4 lg:p-6 flex-1 flex flex-col">
                            <div className="flex-1">
                              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#36A9A9] transition-colors duration-300 line-clamp-2">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {product.description}
                              </p>
                            </div>

                            {/* Category & Brand */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                              <span className="inline-block bg-[#36A9A9]/10 text-[#36A9A9] px-2 py-1 rounded text-xs font-medium">
                                {product.category.name}
                              </span>
                              <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                                {product.brand.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 lg:mt-16 px-4">
                      <div className="flex items-center gap-2 lg:gap-3 flex-wrap justify-center">
                        {/* Previous Button */}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 rounded-lg font-medium transition-all duration-300 text-sm lg:text-base shadow-sm ${
                            currentPage === 1
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white text-gray-700 hover:bg-[#36A9A9] hover:text-white hover:shadow-md border border-gray-200 hover:border-[#36A9A9]'
                          }`}
                        >
                          <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <span className="hidden sm:inline">Previous</span>
                        </button>

                        {/* Page Numbers */}
                        {getPageNumbers().map((page, index) => (
                          <React.Fragment key={index}>
                            {page === '...' ? (
                              <span className="px-2 lg:px-3 py-2 text-gray-400">...</span>
                            ) : (
                              <button
                                onClick={() => handlePageChange(page as number)}
                                className={`min-w-[40px] lg:min-w-[48px] px-3 py-2 lg:px-4 lg:py-3 rounded-lg font-semibold transition-all duration-300 text-sm lg:text-base shadow-sm ${
                                  currentPage === page
                                    ? 'bg-[#36A9A9] text-white shadow-md transform scale-105 border-2 border-[#36A9A9]'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200 hover:border-[#36A9A9]'
                                }`}
                              >
                                {page}
                              </button>
                            )}
                          </React.Fragment>
                        ))}

                        {/* Next Button */}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 rounded-lg font-medium transition-all duration-300 text-sm lg:text-base shadow-sm ${
                            currentPage === totalPages
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white text-gray-700 hover:bg-[#36A9A9] hover:text-white hover:shadow-md border border-gray-200 hover:border-[#36A9A9]'
                          }`}
                        >
                          <span className="hidden sm:inline">Next</span>
                          <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        {!isLoading && results.length > 0 && (
          <AnimatedSection animationType="fadeInUp" delay={400}>
            <div className="relative py-16 lg:py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/contact.webp)' }}>
              <div className="absolute inset-0 bg-black/60"></div>
              
              <div className="relative z-10 container-responsive text-center">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4">
                  Can't Find What You're Looking For?
                </h2>
                <p className="text-base lg:text-lg text-white/90 mb-6">
                  Contact our experts for personalized recommendations
                </p>
                <button 
                  onClick={() => navigate('/contact-us')}
                  className="bg-white hover:bg-gray-100 text-[#36A9A9] px-8 py-3 lg:px-10 lg:py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </>
  );
};

export default SearchResults;

