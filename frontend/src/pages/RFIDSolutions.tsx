import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import apiService from '../services/api';
import { Solution } from '../types/product';

const RFIDSolutions: React.FC = () => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllSolutions();
      setSolutions(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching solutions:', err);
      setError('Không thể tải dữ liệu solutions. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const getDefaultIcon = () => (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );

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
          <div className="max-w-full lg:max-w-[95%] xl:max-w-[90%] 3xl:max-w-[85%] mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#36A9A9]"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            ) : solutions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Chưa có solutions nào được thêm vào hệ thống.
              </div>
            ) : (
              <div className="space-y-8 lg:space-y-10">
                {solutions.map((solution, index) => (
                  <AnimatedSection key={solution.id} animationType="fadeInUp" delay={300 + index * 100}>
                    <div className="bg-white shadow-lg overflow-hidden">
                      <div className="flex flex-col lg:flex-row h-[450px] lg:h-[500px]">
                        {/* Left Content */}
                        <div className="flex-1 lg:w-1/2 lg:max-w-[50%] p-6 lg:p-8 flex flex-col">
                          <h2 className="text-2xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-4 line-clamp-2">
                            {solution.solution_name}
                          </h2>
                          
                          {solution.description && (
                            <div className="text-sm lg:text-sm xl:text-base text-gray-600 leading-relaxed flex-1 whitespace-pre-wrap overflow-hidden">
                              {solution.description}
                            </div>
                          )}

                          {/* Learn More Button */}
                          <div className="mt-4 lg:mt-6 flex-shrink-0">
                            <button 
                              onClick={() => navigate(`/solution/${solution.id}`)}
                              className="text-[#36A9A9] hover:text-[#2d8a8a] font-medium text-sm lg:text-sm xl:text-base transition-colors duration-300 flex items-center"
                            >
                              Learn More
                              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Right Image */}
                        <div className="flex-1 lg:w-1/2 lg:max-w-[50%]">
                          {solution.first_image?.image ? (
                            <div className="h-[300px] sm:h-[350px] lg:h-full">
                              <img
                                src={apiService.getImageUrl(solution.first_image.image)}
                                alt={solution.solution_name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-[300px] sm:h-[350px] lg:h-full bg-gradient-to-br from-[#36A9A9] to-[#2d8a8a] flex items-center justify-center">
                              <div className="text-white opacity-50 text-center">
                                <div className="mb-2">
                                  {getDefaultIcon()}
                                </div>
                                <p className="text-sm">No Image Available</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animationType="fadeInUp" delay={1000}>
        <div 
          className="relative py-16 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/solution_banner.png)' }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Implement RFID Solutions?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Get expert consultation and customized RFID solutions for your business
            </p>
            <button 
              onClick={() => navigate('/contact-us')}
              className="bg-white hover:bg-white/90 text-[#36A9A9] px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Consultation
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default RFIDSolutions;
