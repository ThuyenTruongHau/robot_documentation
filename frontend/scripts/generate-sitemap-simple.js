// Simple sitemap generator - Version đơn giản để test
const fs = require('fs');
const path = require('path');

// Configuration
const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || 'https://rfid.thadorobot.com';
const SITE_NAME = 'Thado RFID';

// Function to generate simple sitemap
function generateSimpleSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages only
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

  xml += `</urlset>`;

  // Write to file
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  
  try {
    // Ensure directory exists
    const publicDir = path.dirname(sitemapPath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(sitemapPath, xml);
    
    console.log('✅ Simple sitemap generated successfully!');
    console.log(`📄 Generated ${staticPages.length} static URLs`);
    console.log(`💾 Sitemap saved to: ${sitemapPath}`);
  } catch (error) {
    console.error('❌ Error writing sitemap file:', error.message);
    console.log('📝 Sitemap content generated but could not be saved to file');
  }
}

// Run if called directly
if (require.main === module) {
  generateSimpleSitemap();
}

module.exports = { generateSimpleSitemap };
