// Simple ProductDetail.tsx - Version đơn giản không cần SEO component
// Cập nhật frontend/src/pages/ProductDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/api';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Convert string id to number if needed
        const productId = parseInt(id!, 10);
        const data = await apiService.getProduct(productId);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Basic SEO Meta Tags */}
      <head>
        <title>{product.name} | ThadoSoft</title>
        <meta name="description" content={product.description || `${product.name} - High-quality RFID product from ThadoSoft`} />
        <meta name="keywords" content={`${product.name}, RFID, ${product.category?.name || 'product'}, ThadoSoft`} />
      </head>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img 
              src={product.image || '/placeholder-product.jpg'} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>
            
            <div className="space-y-3">
              {product.code && (
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-32">Product Code:</span>
                  <span className="text-gray-900">{product.code}</span>
                </div>
              )}
              
              {product.category && (
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-32">Category:</span>
                  <span className="text-gray-900">{product.category.name}</span>
                </div>
              )}
              
              {product.brand && (
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-32">Brand:</span>
                  <span className="text-gray-900">{product.brand}</span>
                </div>
              )}
            </div>
            
            {product.price && (
              <div className="text-3xl font-bold text-primary-600">
                {product.price.toLocaleString('vi-VN')} VND
              </div>
            )}
            
            <div className="flex space-x-4">
              <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Contact for Quote
              </button>
              <button className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium">
                Add to Inquiry
              </button>
            </div>
          </div>
        </div>

        {/* Additional Product Details */}
        {product.specifications && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <pre className="whitespace-pre-wrap text-gray-700">{product.specifications}</pre>
            </div>
          </div>
        )}

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder for related products */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-semibold text-gray-900">Related Product 1</h3>
              <p className="text-gray-600 text-sm mt-2">Description of related product</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-semibold text-gray-900">Related Product 2</h3>
              <p className="text-gray-600 text-sm mt-2">Description of related product</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-semibold text-gray-900">Related Product 3</h3>
              <p className="text-gray-600 text-sm mt-2">Description of related product</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
