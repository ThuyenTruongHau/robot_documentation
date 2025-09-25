import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

interface ProductImage {
  id: number;
  image: string;
}

interface ProductCategory {
  id: number;
  name: string;
}

interface ProductBrand {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  images: ProductImage[];
  category: ProductCategory;
  brand: ProductBrand;
  parameters: Record<string, any>;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:9000/api'}/products/${id}/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleContactUs = () => {
    // Navigate to contact page or open contact modal
    navigate('/contact');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#36A9A9] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error</div>
          <p className="text-gray-600 mb-4">{error || 'Product not found'}</p>
          <Link
            to="/rfid-products"
            className="inline-flex items-center bg-[#36A9A9] hover:bg-[#2a8a8a] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">

      {/* Product Detail Section */}
      <AnimatedSection animationType="fadeInUp" delay={200}>
        <div className="py-6 lg:py-8 xl:py-10 mt-16 lg:mt-20 xl:mt-24 3xl:mt-28">
          {/* Breadcrumb - ngay trên container và căn giữa */}
          <div className="mb-4 lg:mb-6 xl:mb-8">
              <nav className="flex items-center justify-center space-x-2 text-xs lg:text-sm xl:text-base text-gray-500">
                <Link to="/" className="hover:text-[#36A9A9]">Home</Link>
                <span className="text-gray-400">&gt;</span>
                <Link to="/rfid-products" className="hover:text-[#36A9A9]">RFID Products</Link>
                <span className="text-gray-400">&gt;</span>
                <span className="text-gray-500">{product.category.name}</span>
                <span className="text-gray-400">&gt;</span>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </nav>
            </div>

          <div className="container-responsive">
            {/* Product Container - chung cho cả ảnh và content */}
            <div className="bg-white shadow-2xl border border-gray-100 p-4 lg:p-6 xl:p-8 3xl:p-10 relative overflow-hidden">
              {/* Decorative Pattern - Inside Container */}
              <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 20%, rgba(54, 169, 169, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(54, 169, 169, 0.06) 0%, transparent 50%),
                    linear-gradient(45deg, transparent 40%, rgba(54, 169, 169, 0.04) 40%, rgba(54, 169, 169, 0.04) 60%, transparent 60%),
                    linear-gradient(-45deg, transparent 40%, rgba(54, 169, 169, 0.03) 40%, rgba(54, 169, 169, 0.03) 60%, transparent 60%)
                  `,
                  backgroundSize: '120px 120px, 180px 180px, 40px 40px, 40px 40px'
                }}></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 3xl:gap-12">
                {/* Left Side - Product Images */}
                <div className="space-y-3 lg:space-y-4 xl:space-y-5">
                  {/* Main Image */}
                  <div className="aspect-[3/2] bg-gray-50 flex items-center justify-center p-2 lg:p-3 xl:p-4">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[selectedImageIndex].image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-product.jpg';
                        }}
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <svg className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 3xl:w-28 3xl:h-28 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-base lg:text-lg xl:text-xl">No Image Available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side - Product Information */}
                <div className="space-y-4 lg:space-y-6 xl:space-y-8">
                  {/* Product Title and Category */}
                  <div>
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-gray-900 mb-2 lg:mb-3 xl:mb-4">
                      {product.name}
                    </h1>
                    <p className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-gray-600 mb-4 lg:mb-6">
                      {product.category.name}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 xl:gap-4 pt-3 lg:pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 rounded-lg text-sm lg:text-base xl:text-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Add to Compare
                    </button>
                    <button
                      onClick={handleContactUs}
                      className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-4 py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 rounded-lg text-sm lg:text-base xl:text-lg font-medium transition-all duration-300 flex items-center justify-center"
                    >
                      Get a quote
                    </button>
                  </div>

                  {/* Thumbnail Images */}
                  {product.images && product.images.length > 1 && (
                    <div className="pt-4 lg:pt-6 xl:pt-8">
                      <div className="flex flex-wrap gap-3 lg:gap-4 xl:gap-5">
                        {product.images.map((image, index) => (
                          <button
                            key={image.id}
                            onClick={() => setSelectedImageIndex(index)}
                            onMouseEnter={() => setSelectedImageIndex(index)}
                            className={`w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 3xl:w-32 3xl:h-32 bg-white shadow-sm overflow-hidden border-2 transition-all duration-200 ${
                              selectedImageIndex === index ? 'border-blue-600 shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                            }`}
                          >
                            <img
                              src={image.image}
                              alt={`${product.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-product.jpg';
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabbed Navigation Section */}
            <AnimatedSection animationType="fadeInUp" delay={300}>
              <div className="mt-16">
                {/* Tab Container - giống container sản phẩm */}
                <div className="bg-white shadow-2xl border border-gray-100 p-6 relative overflow-hidden">

                  {/* Tab Navigation */}
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8">
                      {[
                        { id: 'details', label: 'Product details' },
                        { id: 'parameters', label: 'Product parameter' },
                        { id: 'dimensions', label: 'Dimensions' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                            activeTab === tab.id
                              ? 'border-blue-600 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="py-8">
                  {activeTab === 'details' && (
                    <div>
                      <h3 className="text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-6">Product Details</h3>
                      <div className="prose max-w-none">
                        <p className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-gray-600 leading-relaxed whitespace-pre-line">
                          {product.description || 'No detailed description available for this product.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'parameters' && (
                    <div>
                      <h3 className="text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-6">Product Parameters</h3>
                      {product.parameters && Object.keys(product.parameters).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.entries(product.parameters).map(([category, specs]) => (
                            <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                              <h4 className="text-sm lg:text-base xl:text-lg 3xl:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">{category}</h4>
                              <div className="space-y-3">
                                {typeof specs === 'object' && specs !== null ? (
                                  Object.entries(specs).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                      <span className="font-medium text-gray-700">
                                        {key.replace(/_/g, ' ')}
                                      </span>
                                      <span className="text-gray-900 font-semibold">
                                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                      </span>
                                    </div>
                                  ))
                                ) : (
                                  <div className="flex justify-between items-center py-2">
                                    <span className="font-medium text-gray-700">{category}</span>
                                    <span className="text-gray-900 font-semibold">{String(specs)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No parameters available for this product.</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'dimensions' && (
                    <div>
                      <h3 className="text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-6">Dimensions</h3>
                      {product.images && product.images.length > 0 ? (
                        <div className="flex justify-center">
                          <div className="max-w-lg lg:max-w-xl xl:max-w-2xl">
                            <img
                              src={product.images[product.images.length - 1].image}
                              alt={`${product.name} Dimensions`}
                              className="w-full h-auto object-contain rounded-lg shadow-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-product.jpg';
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <svg className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-gray-500">No dimension image available for this product.</p>
                        </div>
                      )}
                    </div>
                  )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Related Products Section */}
      {product && (
        <AnimatedSection animationType="fadeInUp" delay={400}>
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Explore More Products
                </h2>
                <p className="text-gray-600">
                  Discover other RFID solutions in the same category
                </p>
              </div>
              
              <div className="text-center">
                <Link
                  to={`/rfid-products?category=${product.category.id}`}
                  className="inline-flex items-center bg-[#36A9A9] hover:bg-[#2a8a8a] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  View All {product.category.name}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
};

export default ProductDetail;