import React, { useState, useEffect, useCallback, useRef } from 'react';
import RFIDContent from '../components/RFIDContent';
import RFIDProducts from '../components/RFIDProducts';
import RFIDSolutions from '../components/RFIDSolutions';
import IndustryShowcase from '../components/IndustryShowcase';
import AboutUs from '../components/AboutUs';
import Partners from '../components/Partners';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';
import apiService from '../services/api';
import '../styles/hideScrollbar.css';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [contactForm, setContactForm] = useState({
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const slides = [
    {
      title: "COMPREHENSIVE SOLUTIONS",
      subtitle: "AUTOMATION TECHNOLOGY",
      features: ["Complete Product Range", "Professional Support"],
      buttonText: "Learn More"
    },
    {
      title: "POWERING PRECISION WITH",
      subtitle: "AI ENABLED CODE READERS",
      features: ["AI Enabled Algorithm", "Accurate Positioning"],
      buttonText: "Learn More"
    },
    {
      title: "INTELLIGENT AUTOMATION",
      subtitle: "RFID SOLUTIONS",
      features: ["Advanced RFID Technology", "Real-time Tracking"],
      buttonText: "Learn More"
    },
    {
      title: "PRECISION IMAGING",
      subtitle: "CAMERA SYSTEMS",
      features: ["High Resolution Imaging", "Industrial Grade Quality"],
      buttonText: "Learn More"
    }
  ];

  const startTimer = useCallback(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Start new timer
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    // Reset timer when user manually changes slide
    startTimer();
  }, [startTimer]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    // Reset timer when user manually changes slide
    startTimer();
  }, [slides.length, startTimer]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    // Reset timer when user manually changes slide
    startTimer();
  }, [slides.length, startTimer]);

  useEffect(() => {
    startTimer();
    
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  return (
    <>
      <SEO 
        title="Thado RFID - Leading RFID Solutions Provider in Vietnam"
        description="Leading provider of RFID technology solutions, products, and services in Vietnam. Comprehensive RFID products, automation technology, and professional support."
        keywords="RFID, RFID solutions, RFID products, RFID tags, RFID readers, RFID antennas, Vietnam RFID, Thado RFID, automation technology"
        image="https://rfid.thadorobot.com/logo_noback2.png"
        url="/"
      />
      <div className="overflow-hidden hide-scrollbar">
      {/* Hero Slider Section */}
      <div className="relative full-vh overflow-hidden w-screen -ml-[calc(50vw-50%)]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background - different for each slide */}
            {index === 0 ? (
              /* Slide 1: all.webp as background */
              <div className="absolute inset-0">
                <img
                  src="/all.webp"
                  alt="All Products"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            ) : index === 1 ? (
              /* Slide 2: Knewbots with enhanced wave pattern on dark background */
              <div className="absolute inset-0 bg-gray-900">
                {/* More visible wave pattern */}
                <div className="absolute inset-0 opacity-3">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="waves-dense" width="300" height="200" patternUnits="userSpaceOnUse">
                        {/* More waves with higher opacity */}
                        <path d="M30,40 Q80,25 130,45 T230,35" fill="none" stroke="#36A9A9" strokeWidth="1.2" opacity="0.25"/>
                        <path d="M0,80 Q50,65 100,85 T200,75" fill="none" stroke="#36A9A9" strokeWidth="1" opacity="0.2"/>
                        <path d="M60,120 Q110,105 160,125 T260,115" fill="none" stroke="#36A9A9" strokeWidth="1.4" opacity="0.18"/>
                        <path d="M20,160 Q70,145 120,165 T220,155" fill="none" stroke="#36A9A9" strokeWidth="0.8" opacity="0.22"/>
                        <path d="M80,20 Q130,5 180,25 T280,15" fill="none" stroke="#36A9A9" strokeWidth="1.1" opacity="0.2"/>
                        <path d="M40,180 Q90,165 140,185 T240,175" fill="none" stroke="#36A9A9" strokeWidth="1.3" opacity="0.16"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#waves-dense)" />
                  </svg>
                </div>
                
                {/* Additional layer of accent waves */}
                <div className="absolute inset-0 opacity-2">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="accent-waves-dense" width="450" height="300" patternUnits="userSpaceOnUse">
                        {/* Longer accent waves */}
                        <path d="M0,60 Q150,40 300,65 T600,55" fill="none" stroke="#36A9A9" strokeWidth="1.8" opacity="0.15"/>
                        <path d="M50,150 Q200,130 350,155 T650,145" fill="none" stroke="#36A9A9" strokeWidth="2.2" opacity="0.12"/>
                        <path d="M100,240 Q250,220 400,245 T700,235" fill="none" stroke="#36A9A9" strokeWidth="1.6" opacity="0.14"/>
                        <path d="M25,100 Q175,80 325,105 T625,95" fill="none" stroke="#36A9A9" strokeWidth="1.4" opacity="0.16"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#accent-waves-dense)" />
                  </svg>
                </div>
              </div>
            ) : index === 2 ? (
              /* Slide 3: RFID image background */
              <div className="absolute inset-0">
                <img
                  src="/rfid.png"
                  alt="RFID Technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
            ) : (
              /* Slide 4: Camera image background */
              <div className="absolute inset-0">
                <img
                  src="/camera.jpg"
                  alt="Camera Systems"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-45"></div>
              </div>
            )}
            
            {/* Content */}
            <div className="relative h-full flex items-center pt-16 lg:pt-20 xl:pt-24 3xl:pt-28">
              <div className="container-responsive w-full">
                {index === 0 ? (
                  /* Slide 1: all.jpg background - text centered */
                  <div className="text-center text-white">
                    <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl font-light mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-normal mb-8 text-primary-300">
                      {slide.subtitle}
                    </h2>
                    
                    {/* Features List - centered */}
                    <div className="space-y-4 lg:space-y-6 xl:space-y-8 mb-8 max-w-2xl xl:max-w-3xl 3xl:max-w-4xl mx-auto">
                      {slide.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center justify-center">
                          <div className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 rounded-full bg-primary-500 flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 3xl:w-6 3xl:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-base lg:text-lg xl:text-xl 3xl:text-2xl 4xl:text-3xl font-light">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 lg:px-8 lg:py-3 xl:px-10 xl:py-4 3xl:px-12 3xl:py-5 4xl:px-16 4xl:py-6 rounded-lg text-sm lg:text-base xl:text-lg 3xl:text-xl 4xl:text-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg">
                      {slide.buttonText}
                    </button>
                  </div>
                ) : index === 1 ? (
                  /* Slide 2: Knewbots - layout with image on right */
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 3xl:gap-24 items-center">
                    {/* Left Content with margin */}
                    <div className="text-white ml-8 lg:ml-16 xl:ml-20 3xl:ml-24">
                      <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl font-light mb-4 leading-tight text-white">
                        {slide.title}
                      </h1>
                      <h2 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-normal mb-8 text-primary-300">
                        {slide.subtitle}
                      </h2>
                      
                      {/* Features List */}
                      <div className="space-y-4 lg:space-y-6 xl:space-y-8 mb-8">
                        {slide.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <div className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 rounded-full bg-primary-500 flex items-center justify-center mr-4 flex-shrink-0">
                              <svg className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 3xl:w-6 3xl:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-base lg:text-lg xl:text-xl 3xl:text-2xl 4xl:text-3xl font-light text-white">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 lg:px-8 lg:py-3 xl:px-10 xl:py-4 3xl:px-12 3xl:py-5 4xl:px-16 4xl:py-6 rounded-lg text-sm lg:text-base xl:text-lg 3xl:text-xl 4xl:text-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg">
                        {slide.buttonText}
                      </button>
                    </div>
                    
                    {/* Right Content - Knewbots Image */}
                    <div className="hidden lg:block">
                      <div className="relative">
                        <img
                          src="/Knewbots-all.png"
                          alt="Knewbots Robots"
                          className="w-full h-auto max-h-[20rem] lg:max-h-[28rem] xl:max-h-[32rem] 3xl:max-h-[40rem] 4xl:max-h-[48rem] object-contain scale-110"
                          style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))' }}
                        />
                      </div>
                    </div>
                  </div>
                ) : index === 2 ? (
                  /* Slide 3: RFID - text on left with margin */
                  <div className="max-w-2xl xl:max-w-3xl 3xl:max-w-4xl ml-8 lg:ml-16 xl:ml-20 3xl:ml-24">
                    <div className="text-white">
                      <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl font-light mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-normal mb-8 text-primary-300">
                        {slide.subtitle}
                      </h2>
                      
                      {/* Features List */}
                      <div className="space-y-4 lg:space-y-6 xl:space-y-8 mb-8">
                        {slide.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <div className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 rounded-full bg-primary-500 flex items-center justify-center mr-4 flex-shrink-0">
                              <svg className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 3xl:w-6 3xl:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-base lg:text-lg xl:text-xl 3xl:text-2xl 4xl:text-3xl font-light">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 lg:px-8 lg:py-3 xl:px-10 xl:py-4 3xl:px-12 3xl:py-5 4xl:px-16 4xl:py-6 rounded-lg text-sm lg:text-base xl:text-lg 3xl:text-xl 4xl:text-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg">
                        {slide.buttonText}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Slide 4: Camera - text on left with margin */
                  <div className="max-w-2xl xl:max-w-3xl 3xl:max-w-4xl ml-8 lg:ml-16 xl:ml-20 3xl:ml-24">
                    <div className="text-white">
                      <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl font-light mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-normal mb-8 text-primary-300">
                        {slide.subtitle}
                      </h2>
                      
                      {/* Features List */}
                      <div className="space-y-4 lg:space-y-6 xl:space-y-8 mb-8">
                        {slide.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <div className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 rounded-full bg-primary-500 flex items-center justify-center mr-4 flex-shrink-0">
                              <svg className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 3xl:w-6 3xl:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-base lg:text-lg xl:text-xl 3xl:text-2xl 4xl:text-3xl font-light">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 lg:px-8 lg:py-3 xl:px-10 xl:py-4 3xl:px-12 3xl:py-5 4xl:px-16 4xl:py-6 rounded-lg text-sm lg:text-base xl:text-lg 3xl:text-xl 4xl:text-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg">
                        {slide.buttonText}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevSlide}
          className="absolute left-4 lg:left-6 xl:left-8 3xl:left-12 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 p-2 lg:p-3 xl:p-4 3xl:p-5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <svg className="w-4 h-4 lg:w-6 lg:h-6 xl:w-7 xl:h-7 3xl:w-8 3xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute right-4 lg:right-6 xl:right-8 3xl:right-12 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 p-2 lg:p-3 xl:p-4 3xl:p-5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <svg className="w-4 h-4 lg:w-6 lg:h-6 xl:w-7 xl:h-7 3xl:w-8 3xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-6 lg:bottom-8 xl:bottom-10 3xl:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 lg:space-x-3 xl:space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 3xl:w-5 3xl:h-5 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide 
                  ? 'bg-[#36A9A9] scale-125' 
                  : 'bg-gray-400 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* RFID Content Section */}
      <AnimatedSection animationType="fadeInUp" delay={0}>
        <RFIDContent />
      </AnimatedSection>

      {/* RFID Products Section */}
      <AnimatedSection animationType="fadeInLeft" delay={100}>
        <RFIDProducts />
      </AnimatedSection>

      {/* RFID Solutions Section */}
      <AnimatedSection animationType="fadeInRight" delay={200}>
        <RFIDSolutions />
      </AnimatedSection>

      {/* Industry Showcase Section */}
      <AnimatedSection animationType="fadeInUp" delay={300}>
        <IndustryShowcase />
      </AnimatedSection>

      {/* About Us Section */}
      <AnimatedSection animationType="fadeInLeft" delay={400}>
        <AboutUs />
      </AnimatedSection>

      {/* Partners Section */}
      <AnimatedSection animationType="fadeInUp" delay={500}>
        <Partners />
      </AnimatedSection>

        
      {/* CTA Section */}
      <AnimatedSection animationType="fadeInUp" delay={600}>
        <div className="relative min-h-[300px] lg:min-h-[400px] xl:min-h-[500px] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
               style={{ backgroundImage: 'url(/contact.jpg)' }}>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 xl:px-8">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
                {/* Content - Left Side */}
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl font-bold text-white mb-4 lg:mb-6">
                    Ready to explore advanced technology?
                  </h2>
                  <p className="text-white/90 text-lg lg:text-xl xl:text-2xl mb-6 lg:mb-8">
                    Contact us for the best advice and support
                  </p>
                </div>

                {/* Form - Right Side */}
                <div className="p-6 lg:p-8">
                  <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setSubmitMessage(null);

                    try {
                      const response = await apiService.submitContact({
                        email: contactForm.email,
                        phone_number: '0000000000', // Placeholder since Home form doesn't have phone field
                        message: contactForm.message
                      });

                      if (response.success) {
                        setSubmitMessage({ type: 'success', text: response.message });
                        setContactForm({ email: '', message: '' });
                      } else {
                        setSubmitMessage({ type: 'error', text: 'Có lỗi xảy ra. Vui lòng thử lại.' });
                      }
                    } catch (error) {
                      setSubmitMessage({ type: 'error', text: 'Không thể kết nối đến server. Vui lòng thử lại sau.' });
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent text-gray-900 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Your Message"
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent text-gray-900 placeholder-gray-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    {submitMessage && (
                      <div className={`p-3 rounded-lg text-center ${
                        submitMessage.type === 'success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {submitMessage.text}
                      </div>
                    )}
                    <div className="flex justify-center">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-1/5 bg-[#36A9A9] hover:bg-[#2d8a87] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? 'Sending...' : 'Submit'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      </div>
    </>
  );
};

export default Home;
