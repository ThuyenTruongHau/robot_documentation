const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || 'https://rfid.thadorobot.com';
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'https://robot-documentation-2003.onrender.com';

// Function to fetch sitemap data from backend
async function fetchSitemapData() {
  try {
    // Try the dedicated sitemap endpoint first
    const response = await axios.get(`${BACKEND_API_URL}/api/sitemap-data/`, {
      timeout: 10000 // 10 second timeout
    });
    return response.data;
  } catch (error) {
    console.warn('Could not fetch sitemap data from backend:', error.message);
    
    // Try to fetch products and categories separately as fallback
    try {
      console.log('Trying to fetch products and categories separately...');
      const [productsResponse, categoriesResponse] = await Promise.all([
        axios.get(`${BACKEND_API_URL}/api/products/`, { timeout: 5000 }),
        axios.get(`${BACKEND_API_URL}/api/categories/`, { timeout: 5000 })
      ]);
      
      return {
        static_pages: null, // Will use fallback
        products: productsResponse.data,
        categories: categoriesResponse.data
      };
    } catch (fallbackError) {
      console.warn('Fallback API calls also failed:', fallbackError.message);
      console.log('Falling back to static sitemap...');
      return null;
    }
  }
}

// Function to generate sitemap
async function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Try to fetch data from backend
  const sitemapData = await fetchSitemapData();
  
  let staticPages, categories = [], products = [];
  
  if (sitemapData) {
    // Use data from backend
    staticPages = sitemapData.static_pages || [
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
    categories = sitemapData.categories || [];
    products = sitemapData.products || [];
  } else {
    // Fallback to static pages
    staticPages = [
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
  }

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
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>

`;
  });

  // Add category pages
  categories.forEach(category => {
    const url = category.url || `/rfid-products?category=${category.id}`;
    const lastmod = category.lastmod || category.updated_at || currentDate;
    const changefreq = category.changefreq || 'weekly';
    const priority = category.priority || '0.8';
    
    xml += `  <url>
    <loc>${FRONTEND_DOMAIN}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>

`;
    
    // Add category-specific product listing page
    xml += `  <url>
    <loc>${FRONTEND_DOMAIN}/rfid-products/category/${category.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

`;
  });

  // Add product pages
  products.forEach(product => {
    const url = product.url || `/product/${product.id}`;
    const lastmod = product.lastmod || product.updated_at || currentDate;
    const changefreq = product.changefreq || 'weekly';
    const priority = product.priority || '0.7';
    
    // Main product page
    xml += `  <url>
    <loc>${FRONTEND_DOMAIN}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>

`;
    
    // Add product by code/sku if available
    if (product.code || product.sku) {
      const productCode = product.code || product.sku;
      xml += `  <url>
    <loc>${FRONTEND_DOMAIN}/product/code/${productCode}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

`;
    }
    
    // Add product by name slug if available
    if (product.name) {
      const nameSlug = product.name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
      
      xml += `  <url>
    <loc>${FRONTEND_DOMAIN}/product/${nameSlug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

`;
    }
  });

  xml += `</urlset>`;

  // Write to file
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  
  // Ensure directory exists
  const publicDir = path.dirname(sitemapPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  try {
    fs.writeFileSync(sitemapPath, xml);
    
    console.log('Sitemap generated successfully!');
    console.log(`Generated ${staticPages.length} static URLs`);
    console.log(`Generated ${categories.length} category URLs`);
    console.log(`Generated ${products.length} product URLs`);
    console.log(`Total: ${staticPages.length + categories.length + products.length} URLs`);
    console.log(`Sitemap saved to: ${sitemapPath}`);
  } catch (error) {
    console.error('Error writing sitemap file:', error.message);
    console.log('Sitemap content generated but could not be saved to file');
  }
}

// Run if called directly
if (require.main === module) {
  generateSitemap().catch(console.error);
}

module.exports = { generateSitemap };
