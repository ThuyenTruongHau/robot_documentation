import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';

const ThadoNews: React.FC = () => {
  // Placeholder news data
  const newsItems = [
    {
      id: 1,
      title: "Latest RFID Technology Trends in 2025",
      excerpt: "Discover the newest innovations in RFID technology and how they're transforming industries worldwide.",
      image: "/contact.webp",
      date: "January 15, 2025",
      category: "Technology"
    },
    {
      id: 2,
      title: "Thado RFID Solutions for Smart Manufacturing",
      excerpt: "Learn how our RFID solutions are revolutionizing manufacturing processes and improving efficiency.",
      image: "/warehousing.png",
      date: "January 10, 2025",
      category: "Solutions"
    },
    {
      id: 3,
      title: "Success Story: RFID Implementation in Logistics",
      excerpt: "Read about how our client achieved 70% improvement in inventory tracking with our RFID system.",
      image: "/logistic.png",
      date: "January 5, 2025",
      category: "Case Study"
    },
    {
      id: 4,
      title: "RFID Security: Best Practices for 2025",
      excerpt: "Essential security considerations when implementing RFID systems in your business.",
      image: "/security.webp",
      date: "December 28, 2024",
      category: "Security"
    },
    {
      id: 5,
      title: "IoT and RFID: The Perfect Combination",
      excerpt: "Explore how RFID technology integrates with IoT to create smart, connected systems.",
      image: "/manufacturing.jpg",
      date: "December 20, 2024",
      category: "Technology"
    },
    {
      id: 6,
      title: "Thado Expands RFID Product Line",
      excerpt: "We're excited to announce new additions to our comprehensive RFID product portfolio.",
      image: "/tool_tracking.jpg",
      date: "December 15, 2024",
      category: "Company News"
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
          <div className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/contact.webp)' }}>
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
                  </AnimatedSection>
                ))}
              </div>

              {/* Pagination Placeholder */}
              <div className="flex justify-center items-center mt-12 lg:mt-16 xl:mt-20">
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-[#36A9A9] hover:text-white hover:border-[#36A9A9] transition-all duration-300">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-[#36A9A9] text-white rounded-lg">1</button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-[#36A9A9] hover:text-white hover:border-[#36A9A9] transition-all duration-300">2</button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-[#36A9A9] hover:text-white hover:border-[#36A9A9] transition-all duration-300">3</button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-[#36A9A9] hover:text-white hover:border-[#36A9A9] transition-all duration-300">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Newsletter Section */}
        <AnimatedSection animationType="fadeInUp" delay={400}>
          <div className="relative py-16 lg:py-20 xl:py-24 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/wave.jpg)' }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#36A9A9]/90"></div>
            
            {/* Content */}
            <div className="relative z-10 container-responsive">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl font-bold text-white mb-4 lg:mb-6">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-base lg:text-lg xl:text-xl text-white/90 mb-6 lg:mb-8">
                  Get the latest RFID news, technology updates, and exclusive insights delivered to your inbox
                </p>

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

