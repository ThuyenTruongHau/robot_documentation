import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

interface ProductDetailData {
  id: number;
  name: string;
  description: string;
  parameters: Record<string, any>;
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
    image: string;
    uploaded_at: string;
  }>;
  created_at: string;
  updated_at: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Product ID not found');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000/api'}/products/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Product detail data:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBackToProducts = () => {
    navigate('/rfid-products');
  };

  const handleContactUs = () => {
    navigate('/contact-us');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#36A9A9] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-500 mb-2">Product Not Found</h3>
          <p className="text-gray-400 mb-4">{error || 'The requested product could not be found.'}</p>
          <button
            onClick={handleBackToProducts}
            className="bg-[#36A9A9] hover:bg-[#2a8a8a] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <AnimatedSection animationType="fadeInUp" delay={0}>
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-[#36A9A9]">Home</Link>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link to="/rfid-products" className="text-gray-500 hover:text-[#36A9A9]">RFID Products</Link>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>
      </AnimatedSection>

      {/* Product Detail Section */}
      <AnimatedSection animationType="fadeInUp" delay={200}>
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}${product.images[selectedImageIndex].image}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-product.jpg';
                        }}
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <svg className="w-24 h-24 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg">No Image Available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnail Images */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`aspect-square bg-white rounded-lg shadow-md overflow-hidden border-2 transition-all duration-200 ${
                          selectedImageIndex === index ? 'border-[#36A9A9]' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}${image.image}`}
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
                )}
              </div>

              {/* Right Side - Product Information */}
              <div className="space-y-6">
                {/* Product Title and Category */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-[#36A9A9] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.category.name}
                    </span>
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {product.brand.name}
                    </span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || 'No description available for this product.'}
                  </p>
                </div>

                {/* Parameters/Specifications */}
                {product.parameters && Object.keys(product.parameters).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                      <div className="grid grid-cols-1 gap-3">
                        {Object.entries(product.parameters).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                            <span className="font-medium text-gray-700 capitalize">
                              {key.replace(/_/g, ' ')}
                            </span>
                            <span className="text-gray-900 font-semibold">
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    onClick={handleContactUs}
                    className="bg-[#36A9A9] hover:bg-[#2a8a8a] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Us for Quote
                  </button>
                  <button
                    onClick={handleBackToProducts}
                    className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-all duration-300 border border-gray-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Products
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Related Products Section */}
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
    </div>
  );
};

export default ProductDetail;
