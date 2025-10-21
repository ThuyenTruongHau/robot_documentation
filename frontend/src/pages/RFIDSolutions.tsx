import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

const RFIDSolutions: React.FC = () => {
  const solutions = [
    {
      title: "Smart Warehouse Management",
      description: "Complete RFID-based warehouse automation system for inventory tracking and management",
      features: ["Real-time Inventory Tracking", "Automated Stock Counting", "Asset Management", "Integration with ERP Systems"],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: "Manufacturing Automation",
      description: "RFID solutions for production line automation and quality control",
      features: ["Production Line Tracking", "Quality Control", "Work-in-Progress Monitoring", "Traceability"],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Asset Tracking System",
      description: "Comprehensive RFID-based asset tracking and management solution",
      features: ["Asset Location Tracking", "Maintenance Scheduling", "Asset History", "Mobile Access"],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Banner */}
      <AnimatedSection animationType="fadeInUp" delay={0}>
        <div className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/solution_image/banner.jpg)' }}>
          
          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4">
              RFID Solutions
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Comprehensive RFID-based solutions for modern industrial automation and smart manufacturing
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Solutions Section */}
      <AnimatedSection animationType="fadeInUp" delay={200}>
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {solutions.map((solution, index) => (
                <AnimatedSection key={index} animationType="fadeInUp" delay={300 + index * 100}>
                  <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                    <div className="text-[#36A9A9] mb-6">
                      {solution.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">{solution.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{solution.description}</p>
                    <ul className="space-y-2 sm:space-y-3">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-gray-600">
                          <svg className="w-4 h-4 text-[#36A9A9] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection animationType="fadeInUp" delay={600}>
        <div className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose Our RFID Solutions?</h2>
              <p className="text-lg sm:text-xl text-gray-600">Advanced technology with proven results</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "High Accuracy", description: "99.9% reading accuracy" },
                { title: "Long Range", description: "Up to 15 meters reading distance" },
                { title: "Fast Processing", description: "Real-time data processing" },
                { title: "Easy Integration", description: "Seamless system integration" }
              ].map((benefit, index) => (
                <AnimatedSection key={index} animationType="fadeInUp" delay={700 + index * 100}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#36A9A9] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animationType="fadeInUp" delay={1000}>
        <div className="py-16 bg-[#36A9A9]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Implement RFID Solutions?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Get expert consultation and customized RFID solutions for your business
            </p>
            <button className="bg-white hover:bg-white/90 text-[#36A9A9] px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg">
              Get Consultation
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default RFIDSolutions;
