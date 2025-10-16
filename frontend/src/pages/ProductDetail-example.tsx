// Example: ProductDetail.tsx với SEO optimization
// Cập nhật frontend/src/pages/ProductDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
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
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Generate SEO-friendly title and description
  const seoTitle = `${product.name} - RFID Product | ThadoSoft`;
  const seoDescription = `${product.description || product.name}. High-quality RFID ${product.category?.name || 'product'} from ThadoSoft. Contact us for pricing and technical support.`;
  const seoKeywords = `${product.name}, RFID ${product.category?.name || 'product'}, ${product.code || ''}, ThadoSoft, Vietnam RFID`;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url={`/product/${id}`}
        type="product"
        product={{
          name: product.name,
          description: product.description,
          price: product.price?.toString(),
          currency: "VND",
          availability: "https://schema.org/InStock",
          condition: "https://schema.org/NewCondition",
          brand: "ThadoSoft",
          category: product.category?.name,
          sku: product.code,
          image: product.image
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img 
              src={product.image || '/placeholder-product.jpg'} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            {product.code && (
              <div className="mb-4">
                <span className="font-semibold">Product Code:</span> {product.code}
              </div>
            )}
            
            {product.category && (
              <div className="mb-4">
                <span className="font-semibold">Category:</span> {product.category.name}
              </div>
            )}
            
            {product.price && (
              <div className="text-2xl font-bold text-primary-600 mb-6">
                {product.price.toLocaleString('vi-VN')} VND
              </div>
            )}
            
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
              Contact for Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
