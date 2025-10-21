import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';

const ThadoNews: React.FC = () => {
  // Placeholder news data
  const newsItems = [
    {
      id: 1,
      title: "Data Center RFID Global Strategic Business Report 2025-2030",
      excerpt: "Competitive Analysis of Alien Technology, Avery Dennison, GAO, HP, IBM, Impinj, Invengo, Omni-ID, RF COde, Zebra Technologies.",
      image: "products_image/news11.webp",
      date: "October 16, 2025",
      category: "Market"
    },
    {
      id: 2,
      title: "Simplify access control with RXQR RFID and QR scanners",
      excerpt: "Innovative Integration of RFID and QR Technology, collaborating with A&E Technology to provide a comprehensive solution for access control.",
      image: "products_image/news1.webp",
      date: "October 17, 2025",
      category: "Innovation"
    },
    {
      id: 3,
      title: "Toll collection RFID system",
      excerpt: "Benefits of RFID technology in non-stop toll collection. Making fee collection automatically.",
      image: "products_image/news2.webp",
      date: "August 3, 2025",
      category: "Traffic Infrastructure"
    },
    {
      id: 4,
      title: "Leading AI Powered Anti-Counterfeit Software",
      excerpt: "Take back your revenue and soar above your competitors. RFID Anti-Counterfeiting Solutions: How to Secure Your RFID Tags",
      image: "/products_image/news3.webp",
      date: "December 28, 2024",
      category: "Security"
    },
    {
      id: 5,
      title: "RFID in Healthcare: Enhancing Security and Privacy in Healthcare Systems",
      excerpt: "Enhancing Security and Privacy in Healthcare Systems Using a Lightweight RFID Protocol.",
      image: "/products_image/news4.jpg",
      date: "December 20, 2025",
      category: "Technology"
    },
    {
      id: 6,
      title: "RFID closes the gap between retail, logistics",
      excerpt: "Investment feasibility and optimization strategies of RFID technology in logistics field.",
      image: "/products_image/news5.jpg",
      date: "December 15, 2025",
      category: "Logistics"
    }
  ];

  return (
    <>
      <SEO 
        title="Thado News - Latest RFID Technology Updates & Insights"
        description="Stay updated with the latest news, trends, and innovations in RFID technology from Thado. Industry insights, case studies, and company announcements."
        keywords="RFID news, technology updates, industry trends, case studies, innovations, Thado news"
        image="https://rfid.thadorobot.com/logo_noback2.png"
        url="/thado-news"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <AnimatedSection animationType="fadeInUp" delay={0}>
          <div className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/products_image/news.webp)' }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* Content */}
            <div className="relative z-10 container-responsive text-center pt-16 lg:pt-20 xl:pt-24">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold text-white mb-4 lg:mb-6">
                Thado News & Insights
              </h1>
              <p className="text-base lg:text-lg xl:text-xl 3xl:text-2xl text-white/90 max-w-3xl mx-auto">
                Stay informed with the latest RFID technology trends, industry insights, and company updates
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* News Grid Section */}
        <AnimatedSection animationType="fadeInUp" delay={200}>
          <div className="py-12 lg:py-16 xl:py-20 3xl:py-24">
            <div className="container-responsive">
              {/* Section Title */}
              <div className="text-center mb-8 lg:mb-12 xl:mb-16">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl font-bold text-gray-900 mb-4">
                  Latest News & Articles
                </h2>
                <div className="w-20 h-1 bg-[#36A9A9] mx-auto rounded-full"></div>
              </div>

              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
                {newsItems.map((news, index) => (
                  <AnimatedSection key={news.id} animationType="fadeInUp" delay={300 + index * 100}>
                    <Link to={`/thado-news/${news.id}`} className="block h-full">
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 lg:h-56 xl:h-64 overflow-hidden flex-shrink-0">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-block bg-[#36A9A9] text-white px-3 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium">
                            {news.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 lg:p-6 xl:p-8 flex flex-col flex-grow">
                        {/* Date */}
                        <p className="text-xs lg:text-sm text-gray-500 mb-2 lg:mb-3">
                          {news.date}
                        </p>

                        {/* Title */}
                        <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-[#36A9A9] transition-colors duration-300 line-clamp-2">
                          {news.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6 line-clamp-3 flex-grow">
                          {news.excerpt}
                        </p>

                        {/* Read More Link */}
                        <div className="flex items-center text-[#36A9A9] font-medium text-sm lg:text-base group-hover:gap-2 transition-all duration-300 mt-auto">
                          <span>Read More</span>
                          <svg className="w-4 h-4 lg:w-5 lg:h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Newsletter Section */}
        <AnimatedSection animationType="fadeInUp" delay={400}>
          <div className="relative py-16 lg:py-20 xl:py-24 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/news_image/footer_background.webp)' }}>
            
            {/* Content */}
            <div className="relative z-10 container-responsive">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl font-bold mb-4 lg:mb-6">
                  <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                    Subscribe to Our Newsletter
                  </span>
                </h2>

                {/* Newsletter Form */}
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 lg:px-6 lg:py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-white text-[#36A9A9] px-6 py-3 lg:px-8 lg:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
};

export default ThadoNews;

