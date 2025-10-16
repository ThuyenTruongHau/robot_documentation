const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || 'https://thadosoft.com';
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'https://api.thadosoft.com';

// Function to fetch products from backend
async function fetchProducts() {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/api/products/`);
    return response.data;
  } catch (error) {
    console.warn('Could not fetch products from backend:', error.message);
    return [];
  }
}

// Function to fetch categories from backend
async function fetchCategories() {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/api/categories/`);
    return response.data;
  } catch (error) {
    console.warn('Could not fetch categories from backend:', error.message);
    return [];
  }
}

// Function to generate sitemap
async function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages = [
    {
      url: '/',
      priority: '1.0',
      changefreq: 'weekly'
    },
    {
      url: '/rfid-products',
      priority: '0.9',
      changefreq: 'weekly'
    },
    {
      url: '/rfid-solutions',
      priority: '0.9',
      changefreq: 'weekly'
    },
    {
      url: '/about-us',
      priority: '0.8',
      changefreq: 'monthly'
    },
    {
      url: '/contact-us',
      priority: '0.8',
      changefreq: 'monthly'
    }
  ];

  // Fetch dynamic content
  const products = await fetchProducts();
  const categories = await fetchCategories();

  // Generate XML content
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

`;

  // Add static pages
  staticPages.forEach(page => {
    xml += `  <url>
    <loc>${FRONTEND_DOMAIN}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>

`;
  });

  // Add category pages
  categories.forEach(category => {
    xml += `  <url>
    <loc>${FRONTEND_DOMAIN}/rfid-products?category=${category.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

`;
  });

  // Add product pages
  products.forEach(product => {
    xml += `  <url>
    <loc>${FRONTEND_DOMAIN}/product/${product.id}</loc>
    <lastmod>${product.updated_at ? product.updated_at.split('T')[0] : currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

`;
  });

  xml += `</urlset>`;

  // Write to file
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  
  console.log('Sitemap generated successfully!');
  console.log(`Generated ${staticPages.length} static URLs`);
  console.log(`Generated ${categories.length} category URLs`);
  console.log(`Generated ${products.length} product URLs`);
  console.log(`Total: ${staticPages.length + categories.length + products.length} URLs`);
}

// Run if called directly
if (require.main === module) {
  generateSitemap().catch(console.error);
}

module.exports = { generateSitemap };
