// SEO Meta Tags Component
// Thêm vào frontend/src/components/SEO.tsx

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  product?: {
    name: string;
    description: string;
    price?: string;
    currency?: string;
    availability?: string;
    condition?: string;
    brand?: string;
    category?: string;
    sku?: string;
    image?: string;
  };
  category?: {
    name: string;
    description: string;
  };
}

const SEO: React.FC<SEOProps> = ({
  title = "ThadoSoft - RFID Solutions & Products",
  description = "Leading provider of RFID technology solutions, products, and services in Vietnam",
  keywords = "RFID, RFID products, RFID solutions, RFID tags, RFID readers, RFID antennas, Vietnam RFID, Thado RFID",
  image = "https://rfid.thadorobot.com/logo_noback.png",
  url,
  type = "website",
  product,
  category
}) => {
  const fullTitle = title.includes("ThadoSoft") ? title : `${title} | ThadoSoft`;
  const fullUrl = url ? `https://rfid.thadorobot.com${url}` : "https://rfid.thadorobot.com";

  // Generate structured data
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ThadoSoft",
      "url": "https://rfid.thadorobot.com",
      "logo": "https://rfid.thadorobot.com/logo_noback.png",
      "description": "Leading provider of RFID technology solutions, products, and services in Vietnam",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "VN",
        "addressLocality": "Hanoi",
        "addressRegion": "Cầu Giấy",
        "streetAddress": "C25-C26, ngách 28/5 P.Dương Khuê, Mai Dịch"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+84 28 1234 5678",
        "contactType": "customer service",
        "email": "info@thadosoft.com"
      }
    };

    if (product) {
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image || image,
        "brand": {
          "@type": "Brand",
          "name": product.brand || "ThadoSoft"
        },
        "category": product.category,
        "sku": product.sku,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": product.currency || "VND",
          "availability": product.availability || "https://schema.org/InStock",
          "condition": product.condition || "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": "ThadoSoft"
          }
        }
      };
    }

    if (category) {
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": category.name,
        "description": category.description,
        "mainEntity": {
          "@type": "ItemList",
          "name": category.name
        }
      };
    }

    return baseData;
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="ThadoSoft" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
    </Helmet>
  );
};

export default SEO;
