import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import apiService from '../../services/apiService';
import { categoryCache } from '../../utils/categoryCache';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [rfidProductsOpen, setRfidProductsOpen] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isNavbarHovered, setIsNavbarHovered] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeAllDropdowns = useCallback(() => {
    setRfidProductsOpen(false);
  }, []);

  const loadCategories = useCallback(async () => {
    if (categoriesLoaded || isLoadingCategories) return;
    
    // Check cache first
    const cachedCategories = categoryCache.getCachedCategories();
    if (cachedCategories) {
      console.log('Using cached categories:', cachedCategories.length);
      setCategories(cachedCategories);
      setCategoriesLoaded(true);
      return;
    }
    
    setIsLoadingCategories(true);
    try {
      const data = await apiService.getAllCategories();
      setCategories(data);
      setCategoriesLoaded(true);
      categoryCache.setCachedCategories(data);
      console.log('Categories loaded successfully:', data.length, 'categories');
    } catch (error) {
      console.error('Error loading categories:', error);
      // Fallback data if API fails
      const fallbackData = [
        { id: 'rfid-readers', name: 'RFID Readers' },
        { id: 'rfid-tags', name: 'RFID Tags' },
        { id: 'rfid-antennas', name: 'RFID Antennas' },
        { id: 'rfid-accessories', name: 'RFID Accessories' }
      ];
      setCategories(fallbackData);
      setCategoriesLoaded(true);
      categoryCache.setCachedCategories(fallbackData);
      console.log('Categories loaded via fallback:', fallbackData.length, 'categories');
    } finally {
      setIsLoadingCategories(false);
    }
  }, [categoriesLoaded, isLoadingCategories]);

  // Load categories immediately when component mounts
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    const handleScroll = () => {
          const currentScrollY = window.scrollY;
          
      // Check if scrolled past 100px
      setIsScrolled(currentScrollY > 100);
          
      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
            setIsNavbarVisible(false);
      } else {
            setIsNavbarVisible(true);
          }
          
          setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  const searchModal = isSearchOpen && createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ margin: 0, padding: 0 }}>
      <div 
        className="absolute inset-0 bg-black/50" 
        style={{ margin: 0, padding: 0 }}
        onClick={() => setIsSearchOpen(false)}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4" style={{ margin: 0, padding: 0 }}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-gray-900">What are you looking for?</h2>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Input product name, product code..."
                className="w-full px-6 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent transition-all duration-200"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#36A9A9] transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );

  return (
    <>
    <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
          isScrolled || isNavbarHovered 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      onMouseEnter={() => setIsNavbarHovered(true)}
      onMouseLeave={() => setIsNavbarHovered(false)}
    >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
          {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                onClick={handleLogoClick}
                className="flex items-center space-x-3"
              >
                <img 
                  src="/logo_noback.png" 
                  alt="THADOSOFT" 
                  className="h-12 w-auto"
                />
            </Link>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center space-x-12">
                {/* RFID Products Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={() => {
                    closeAllDropdowns(); 
                    setRfidProductsOpen(true);
                  }}
                  onMouseLeave={() => setRfidProductsOpen(false)}
                >
                <Link
                    to="/rfid-products"
                    className={`${isActive('/rfid-products') ? ((isScrolled || isNavbarHovered) ? 'text-gray-800' : 'text-white') : (isScrolled || isNavbarHovered) ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-300'} font-light text-base tracking-wide transition-colors duration-300 relative flex items-center`}
                >
                    RFID Products
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${isActive('/rfid-products') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
                
                  {/* RFID Products Dropdown Menu */}
                <div className={`fixed top-20 left-0 w-full bg-white border-t border-gray-200 shadow-xl z-50 transition-all duration-300 ease-out ${
                    rfidProductsOpen 
                    ? 'opacity-100 translate-y-0 visible' 
                    : 'opacity-0 -translate-y-4 invisible'
                }`}>
                  <div className="max-w-7xl mx-auto px-8 py-8">
                    {isLoadingCategories ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="flex items-center space-x-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                          <span className="text-gray-600 font-light">Loading categories...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-6 gap-4">
                        {/* Display all categories dynamically */}
                        {categories.slice().reverse().map((category, index) => (
                          <div 
                            key={category.id} 
                            className="text-center"
                            style={{ 
                              animationDelay: `${index * 30}ms`,
                              animation: rfidProductsOpen ? 'fadeInUp 300ms ease-out forwards' : 'none'
                            }}
                          >
                            <Link
                              to={`/rfid-products?category=${category.id}`}
                              className="text-sm font-medium text-gray-900 hover:text-gray-700 mb-2 border-b border-primary-600 pb-1 block transition-colors duration-200"
                              onClick={closeAllDropdowns}
                            >
                              {category.name}
                            </Link>
                            <div className="space-y-1 text-xs text-gray-500 min-h-[40px]">
                              {/* Empty space for future subcategories */}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

                {/* RFID Solutions */}
                <Link
                  to="/rfid-solutions"
                  className={`${isActive('/rfid-solutions') ? 'text-primary-600' : (isScrolled || isNavbarHovered) ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-300'} font-light text-base tracking-wide transition-colors duration-300 relative group`}
                >
                  RFID Solutions
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${isActive('/rfid-solutions') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
                
                {/* About Us */}
                <Link
                  to="/about-us"
                  className={`${isActive('/about-us') ? 'text-primary-600' : (isScrolled || isNavbarHovered) ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-300'} font-light text-base tracking-wide transition-colors duration-300 relative group`}
                >
                  About Us
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${isActive('/about-us') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
                
                {/* Contact Us */}
                          <Link
                  to="/contact-us"
                  className={`${isActive('/contact-us') ? 'text-primary-600' : (isScrolled || isNavbarHovered) ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-300'} font-light text-base tracking-wide transition-colors duration-300 relative group`}
                >
                  Contact Us
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${isActive('/contact-us') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
            </div>
          </div>

          {/* Right Side Items */}
          <div className="hidden lg:flex items-center space-x-6">
              {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
                className={`${(isScrolled || isNavbarHovered) ? 'text-gray-600 hover:text-primary-600' : 'text-white hover:text-primary-300'} transition-colors duration-300`}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

              {/* Language Selector */}
              <div className="flex items-center space-x-1 text-sm">
                <button className={`px-2 py-1 rounded transition-colors duration-200 ${
                  (isScrolled || isNavbarHovered) 
                    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}>
                  VI
                </button>
                <span className={`${(isScrolled || isNavbarHovered) ? 'text-gray-400' : 'text-white/60'}`}>/</span>
                <button className={`px-2 py-1 rounded transition-colors duration-200 ${
                  (isScrolled || isNavbarHovered) 
                    ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}>
                  EN
                </button>
              </div>
          </div>

          {/* Mobile menu button */}
            <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${(isScrolled || isNavbarHovered) ? 'text-gray-600' : 'text-white'} transition-colors duration-300`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
            </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-6 pt-4 pb-6 space-y-1">
              {/* Mobile Navigation Links */}
              <Link
                to="/rfid-products"
                className={`${isActive('/rfid-products') ? 'text-primary-600 border-primary-200' : 'text-gray-800 hover:text-primary-600 border-gray-100'} block px-0 py-3 text-base font-medium border-b transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                RFID Products
              </Link>
              <Link
                to="/rfid-solutions"
                className={`${isActive('/rfid-solutions') ? 'text-primary-600 border-primary-200' : 'text-gray-800 hover:text-primary-600 border-gray-100'} block px-0 py-3 text-base font-medium border-b transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                RFID Solutions
              </Link>
                <Link
                to="/about-us"
                className={`${isActive('/about-us') ? 'text-primary-600 border-primary-200' : 'text-gray-800 hover:text-primary-600 border-gray-100'} block px-0 py-3 text-base font-medium border-b transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
                >
                About Us
                </Link>
                <Link
                to="/contact-us"
                className={`${isActive('/contact-us') ? 'text-primary-600 border-primary-200' : 'text-gray-800 hover:text-primary-600 border-gray-100'} block px-0 py-3 text-base font-medium border-b transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
                >
                Contact Us
                </Link>
              
              {/* Mobile Language Selector */}
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Language</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="px-3 py-1 bg-[#36A9A9] text-white rounded-md text-sm font-medium">
                    VI
                  </button>
                  <button className="px-3 py-1 text-gray-600 hover:text-[#36A9A9] rounded-md text-sm font-medium transition-colors">
                    EN
                  </button>
                </div>
              </div>
        </div>
      </div>
        )}
      </nav>

      {/* Search Modal */}
      {searchModal}
    </>
  );
};

export default Navbar;