/// <reference path="../model-viewer.d.ts" />
import React, { useState, useEffect, useMemo } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import mediaPreloader from '../services/mediaPreloader';

const AboutUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('company-profile');
  const [activeSection, setActiveSection] = useState('our-story');

  // Get cached URLs from preloaded models
  const getCachedUrl = useMemo(() => {
    return (url: string) => {
      const cached = mediaPreloader.getCachedUrl(url);
      if (cached) {
        console.log('[AboutUs] Using cached URL for:', url);
      } else {
        console.warn('[AboutUs] Cache miss for:', url, '- using original URL');
      }
      return cached || url;
    };
  }, []);

  // Log cache status on mount
  useEffect(() => {
    console.log('[AboutUs] Component mounted. Cache stats:', mediaPreloader.getCacheStats());
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for sticky header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[id^="our-"], [id^="rd-"], [id^="qa-"]');
      const scrollPosition = window.scrollY + 150; // Offset for sticky header

      // Convert to array and sort by position
      const sectionsArray = Array.from(sections).map(section => ({
        id: section.id,
        offsetTop: (section as HTMLElement).offsetTop,
        offsetBottom: (section as HTMLElement).offsetTop + (section as HTMLElement).offsetHeight
      })).sort((a, b) => a.offsetTop - b.offsetTop);

      // Find the active section - the last section whose top is above scroll position
      let foundSection = '';
      for (let i = sectionsArray.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionsArray[i].offsetTop - 500) {
          foundSection = sectionsArray[i].id;
          break;
        }
      }

      if (foundSection) {
        setActiveSection(foundSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  // Reset active section when tab changes
  useEffect(() => {
    const defaultSections: Record<string, string> = {
      'company-profile': 'our-story',
      'rd-profile': 'rd-philosophy',
      'quality-assurance': 'qa-standards'
    };
    
    setActiveSection(defaultSections[activeTab] || '');
  }, [activeTab]);

  // Add smooth scroll behavior to CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const teamMembers = [
    {
      name: "Nguyễn Văn A",
      position: "CEO & Founder",
      image: "/team-member-1.jpg",
      description: "15+ years experience in RFID technology"
    },
    {
      name: "Trần Thị B",
      position: "CTO",
      image: "/team-member-2.jpg",
      description: "Expert in industrial automation systems"
    },
    {
      name: "Lê Văn C",
      position: "Lead Engineer",
      image: "/team-member-3.jpg",
      description: "Specialized in RFID hardware development"
    }
  ];

  const milestones = [
    { year: "2020", title: "Company Founded", description: "Started with a vision to revolutionize RFID technology", image: "/products_image/time_line1.png" },
    { year: "2023", title: "Establish HCMC Office", description: "The expansion aims to enhance our services and better support clients in the southern region.", image: "/products_image/time_line3.jpg" },
    { year: "2024", title: "Technology Breakthrough", description: "Developed proprietary robot technology", image: "/products_image/time_line5.jpg" },
    { year: "2025", title: "Market Expansion", description: "Expanded services to international markets", image: "/products_image/time_line4.jpg" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <AnimatedSection animationType="fadeInUp" delay={0}>
        <div className="relative bg-cover bg-center bg-no-repeat h-[75vh]" style={{ backgroundImage: 'url(/about_us_background.webp)' }}>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative max-w-7xl mx-auto px-4 text-center flex items-center justify-center h-full">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4">
                About Us
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                Leading provider of RFID technology solutions for industrial automation and smart manufacturing
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Tab Navigation Menu */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <nav className="flex space-x-4 sm:space-x-6 lg:space-x-8 xl:space-x-10">
            <button
              onClick={() => setActiveTab('company-profile')}
              className={`py-4 sm:py-5 lg:py-6 px-2 sm:px-3 lg:px-4 border-b-2 font-medium text-sm sm:text-base lg:text-lg xl:text-xl transition-colors duration-200 ${
                activeTab === 'company-profile'
                  ? 'border-[#36A9A9] text-[#36A9A9]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Company Profile
            </button>
            <button
              onClick={() => setActiveTab('rd-profile')}
              className={`py-4 sm:py-5 lg:py-6 px-2 sm:px-3 lg:px-4 border-b-2 font-medium text-sm sm:text-base lg:text-lg xl:text-xl transition-colors duration-200 ${
                activeTab === 'rd-profile'
                  ? 'border-[#36A9A9] text-[#36A9A9]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              R&D Profile
            </button>
            <button
              onClick={() => setActiveTab('quality-assurance')}
              className={`py-4 sm:py-5 lg:py-6 px-2 sm:px-3 lg:px-4 border-b-2 font-medium text-sm sm:text-base lg:text-lg xl:text-xl transition-colors duration-200 ${
                activeTab === 'quality-assurance'
                  ? 'border-[#36A9A9] text-[#36A9A9]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quality Assurance
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'company-profile' && (
        <div className="bg-gray-50">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8 lg:py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {/* Main Content Frame */}
              <div className="md:col-span-3 lg:col-span-4">
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            {/* Company Story */}
            <AnimatedSection animationType="fadeInUp" delay={200}>
              <div id="our-story" className="text-center max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">Overview</h2>
                <div className="relative w-full max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-10">
                  <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/DcuBu67B1z4?si=YcQGiWnX4AR-Qmvo"
                      title="THADOSOFT Teambuilding"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="max-w-3xl mx-auto">
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                  Founded in 2015, THADOSOFT has been at the forefront of RFID technology innovation. 
                  We specialize in developing cutting-edge RFID solutions that help businesses optimize 
                  their operations and achieve greater efficiency.
                </p>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 leading-relaxed">
                  Our team of experienced engineers and technologists work tirelessly to deliver 
                  reliable, scalable, and cost-effective RFID solutions tailored to meet the unique 
                  needs of each client.
                </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Timeline - Moved up */}
            <AnimatedSection animationType="fadeInUp" delay={600}>
              <div id="our-journey" className="mb-12 sm:mb-16 lg:mb-20">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Our Journey</h2>
                </div>
                <div className="relative max-w-6xl mx-auto">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#36A9A9] hidden lg:block"></div>
                  {milestones.map((milestone, index) => (
                    <AnimatedSection key={index} animationType="fadeInUp" delay={700 + index * 100}>
                      <div className={`relative flex items-center mb-8 lg:mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'}`}>
                          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
                            <div className="text-[#36A9A9] font-bold text-base sm:text-lg lg:text-xl mb-2">{milestone.year}</div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">{milestone.title}</h3>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-4">{milestone.description}</p>
                            {milestone.image && (
                              <div className="mt-4 rounded-lg overflow-hidden">
                                <img 
                                  src={milestone.image} 
                                  alt={milestone.title}
                                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-[#36A9A9] rounded-full border-2 sm:border-4 border-white hidden lg:block"></div>
                        <div className="w-0 lg:w-1/2"></div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Team Section - Moved down */}
            <AnimatedSection animationType="fadeInUp" delay={800}>
              <div id="our-team">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Our Team</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
                  {teamMembers.map((member, index) => (
                    <AnimatedSection key={index} animationType="fadeInUp" delay={900 + index * 100}>
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center">
                        <div className="h-48 sm:h-56 lg:h-64 xl:h-72 bg-gray-200 flex items-center justify-center">
                          <div className="text-gray-400">
                            <svg className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <p className="text-xs sm:text-sm lg:text-base">Team Member Photo</p>
                          </div>
                        </div>
                        <div className="p-4 sm:p-6 lg:p-8">
                          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3">{member.name}</h3>
                          <p className="text-[#36A9A9] font-medium mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg xl:text-xl">{member.position}</p>
                          <p className="text-gray-600 text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed">{member.description}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>
                </div>
              </div>

              {/* Right Sidebar Navigation */}
              <div className="md:col-span-1 lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 sticky top-24">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Company Profile</h3>
                  <nav className="space-y-2 sm:space-y-3">
                    <button 
                      onClick={() => scrollToSection('our-story')} 
                      className={`block w-full text-sm sm:text-base font-medium transition-colors duration-200 text-left ${
                        activeSection === 'our-story' 
                          ? 'text-[#36A9A9]' 
                          : 'text-gray-600 hover:text-[#36A9A9]'
                      }`}
                    >
                      • Overview
                    </button>
                    <button 
                      onClick={() => scrollToSection('our-journey')} 
                      className={`block w-full text-sm sm:text-base font-medium transition-colors duration-200 text-left ${
                        activeSection === 'our-journey' 
                          ? 'text-[#36A9A9]' 
                          : 'text-gray-600 hover:text-[#36A9A9]'
                      }`}
                    >
                      • Our Journey
                    </button>
                    <button 
                      onClick={() => scrollToSection('our-team')} 
                      className={`block w-full text-sm sm:text-base font-medium transition-colors duration-200 text-left ${
                        activeSection === 'our-team' 
                          ? 'text-[#36A9A9]' 
                          : 'text-gray-600 hover:text-[#36A9A9]'
                      }`}
                    >
                      • Our Team
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rd-profile' && (
        <div className="bg-gray-50">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8 lg:py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {/* Main Content Frame */}
              <div className="md:col-span-3 lg:col-span-4">
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
                  <AnimatedSection animationType="fadeInUp" delay={200}>
                
                <div id="rd-philosophy" className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-12 sm:mb-16 lg:mb-20">
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our R&D Philosophy</h3>
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                      At THADOSOFT, research and development is the cornerstone of our innovation. 
                      We invest heavily in cutting-edge technologies to stay ahead of industry trends 
                      and deliver solutions that exceed customer expectations.
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                      Our R&D team consists of experienced engineers and researchers who work 
                      collaboratively to develop proprietary RFID technologies and improve existing solutions.
                    </p>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#36A9A9] mb-1 sm:mb-2">15+</div>
                        <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600">Patents Filed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#36A9A9] mb-1 sm:mb-2">5</div>
                        <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600">Years R&D Experience</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-gray-900">
                    <div className="relative aspect-video">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/FGc_1JwYupE?si=VBb8Jq1gRSkruSOl&amp;start=7"
                        title="R&D Laboratory - THADOSOFT"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>

                {/* 3D Models Showcase */}
                <div id="rd-projects" className="space-y-12 sm:space-y-16 lg:space-y-20">
                  <div className="text-center mb-8 sm:mb-12">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our R&D Projects</h3>
                  </div>

                  {/* Model 1: Image Left, Text Right */}
                  <AnimatedSection animationType="fadeInUp" delay={400}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                      <div className="order-2 lg:order-1">
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg overflow-hidden h-64 sm:h-80 lg:h-96">
                          <model-viewer
                            src={getCachedUrl('/products_image/simulation_laser_cutting_robot_systems.glb')}
                            alt="Laser Cutting Robot System"
                            auto-rotate
                            camera-controls
                            style={{ width: '100%', height: '100%' }}
                          ></model-viewer>
                        </div>
                      </div>
                      <div className="order-1 lg:order-2">
                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Laser Cutting Robot System</h4>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-4">
                          Advanced laser cutting automation system designed for precision manufacturing. This robotic solution integrates 
                          cutting-edge laser technology with intelligent motion control for optimal performance.
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                          Features include real-time monitoring, adaptive path planning, and seamless integration with existing production lines.
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Model 2: Text Left, Image Right */}
                  <AnimatedSection animationType="fadeInUp" delay={500}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                      <div className="order-1">
                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">PCB LED Assembly Machine</h4>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-4">
                          Automated PCB LED assembly solution delivering high-speed, high-precision component placement. 
                          Engineered for electronics manufacturing with advanced vision systems and quality control.
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                          Capable of handling various LED types with consistent accuracy and minimal downtime.
                        </p>
                      </div>
                      <div className="order-2">
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg overflow-hidden h-64 sm:h-80 lg:h-96">
                          <model-viewer
                            src={getCachedUrl('/products_image/pcb_led_machine_part_1.glb')}
                            alt="PCB LED Assembly Machine"
                            auto-rotate
                            camera-controls
                            style={{ width: '100%', height: '100%' }}
                          ></model-viewer>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Model 3: Image Left, Text Right */}
                  <AnimatedSection animationType="fadeInUp" delay={600}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                      <div className="order-2 lg:order-1">
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg overflow-hidden h-64 sm:h-80 lg:h-96">
                          <model-viewer
                            src={getCachedUrl('/products_image/logistic_robot_test__2.glb')}
                            alt="Autonomous Logistic Robot"
                            auto-rotate
                            camera-controls
                            style={{ width: '100%', height: '100%' }}
                          ></model-viewer>
                        </div>
                      </div>
                      <div className="order-1 lg:order-2">
                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Autonomous Logistic Robot</h4>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-4">
                          Intelligent mobile robot for automated material handling and warehouse logistics. Equipped with 
                          advanced navigation systems, obstacle avoidance, and fleet management capabilities.
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                          Optimizes warehouse operations with AI-driven route planning and real-time inventory tracking.
                    </p>
                  </div>
                    </div>
                  </AnimatedSection>

                  {/* Model 4: Text Left, Image Right */}
                  <AnimatedSection animationType="fadeInUp" delay={700}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                      <div className="order-1">
                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Industrial AGV Trolley - OMRON</h4>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-4">
                          OMRON-powered Automated Guided Vehicle for heavy-duty material transport in manufacturing facilities. 
                          Features robust construction, precise positioning, and seamless integration with factory automation systems.
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                          Designed for 24/7 operation with intelligent battery management and predictive maintenance.
                    </p>
                  </div>
                      <div className="order-2">
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg overflow-hidden h-64 sm:h-80 lg:h-96">
                          <model-viewer
                            src={getCachedUrl('/products_image/industrial_-_3d_agv__trolley_-_omrom.glb')}
                            alt="Industrial AGV Trolley"
                            auto-rotate
                            camera-controls
                            style={{ width: '100%', height: '100%' }}
                          ></model-viewer>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Model 5: Image Left, Text Right */}
                  <AnimatedSection animationType="fadeInUp" delay={800}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                      <div className="order-2 lg:order-1">
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg overflow-hidden h-64 sm:h-80 lg:h-96">
                          <model-viewer
                            src={getCachedUrl('/products_image/assembly_solar.glb')}
                            alt="Solar Panel Assembly System"
                            auto-rotate
                            camera-controls
                            style={{ width: '100%', height: '100%' }}
                          ></model-viewer>
                        </div>
                      </div>
                      <div className="order-1 lg:order-2">
                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Solar Panel Assembly System</h4>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-4">
                          Automated assembly line solution for solar panel manufacturing. Combines precision robotics with 
                          quality inspection systems to ensure consistent production of high-efficiency solar modules.
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                          Increases throughput while reducing defects through automated testing and intelligent process control.
                    </p>
                  </div>
                    </div>
                  </AnimatedSection>
                </div>
                  </AnimatedSection>
                </div>
              </div>

              {/* Right Sidebar Navigation */}
              <div className="md:col-span-1 lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 sticky top-24">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">R&D Profile</h3>
                  <nav className="space-y-2 sm:space-y-3">
                    <button 
                      onClick={() => scrollToSection('rd-philosophy')} 
                      className={`block w-full text-sm sm:text-base font-medium transition-colors duration-200 text-left ${
                        activeSection === 'rd-philosophy' 
                          ? 'text-[#36A9A9]' 
                          : 'text-gray-600 hover:text-[#36A9A9]'
                      }`}
                    >
                      • Our R&D Philosophy
                    </button>
                    <button 
                      onClick={() => scrollToSection('rd-projects')} 
                      className={`block w-full text-sm sm:text-base font-medium transition-colors duration-200 text-left ${
                        activeSection === 'rd-projects' 
                          ? 'text-[#36A9A9]' 
                          : 'text-gray-600 hover:text-[#36A9A9]'
                      }`}
                    >
                      • Our R&D Projects
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'quality-assurance' && (
        <div className="bg-gray-50">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8 lg:py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {/* Main Content Frame */}
              <div className="md:col-span-3 lg:col-span-4">
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
                  <AnimatedSection animationType="fadeInUp" delay={200}>
                <div id="qa-standards" className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-12 sm:mb-16 lg:mb-20">
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Quality Standards</h3>
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                      Quality is not just a goal at THADOSOFT—it's our foundation. We maintain 
                      the highest standards throughout our entire product development and 
                      manufacturing process.
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                      Our comprehensive quality assurance system ensures that every RFID solution 
                      meets international standards and exceeds customer expectations for 
                      reliability and performance.
                    </p>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#36A9A9] mb-1 sm:mb-2">99.9%</div>
                        <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600">Quality Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#36A9A9] mb-1 sm:mb-2">ISO</div>
                        <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600">Certified</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg h-96 flex items-center justify-center overflow-hidden shadow-inner p-6 sm:p-8">
                    <img 
                      src="/logo_comp2.png" 
                      alt="Quality Control Center - THADOSOFT"
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Certificates Section */}
                <div id="qa-processes" className="mt-12 sm:mt-16 lg:mt-20">
                  <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Certifications</h3>
                  </div>

                  {/* First Row - 3 Certificates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-8 lg:mb-10">
                    {[
                      { 
                        image: "/logo_partner/certificate1.png", 
                        title: "Authorized Distributor Certificate – Thadosoft Technology Solution JSC",
                        description: "This certification recognizes Thadosoft’s capability and commitment to delivering high-quality robotic automation solutions in the Vietnamese market."
                      },
                      { 
                        image: "/logo_partner/certificate2.png", 
                        title: "Authorized Distributor Certificate – iRAYPLE AMR Products",
                        description: "Thanh Dong Sptech Joint Stock Company is officially recognized as the Authorized Distributor of iRAYPLE AMR Products in Vietnam"
                      },
                      { 
                        image: "/logo_partner/certificate3.png", 
                        title: "Authorization Letter – Atomrobot",
                        description: "Thadosoft Technology Solution Joint Stock Company is officially appointed as the Authorized Distributor of Atomrobot Delta Robots in Vietnam, Chenxing Automation Equipment Co., Ltd"
                      }
                    ].map((cert, index) => (
                      <AnimatedSection key={index} animationType="fadeInUp" delay={300 + index * 100}>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                          <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8 flex items-center justify-center h-72 sm:h-80 lg:h-96 xl:h-[28rem]">
                            <img 
                              src={cert.image} 
                              alt={cert.title}
                              className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-5 sm:p-6 lg:p-8">
                            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                              {cert.title}
                            </h4>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed text-center">
                              {cert.description}
                            </p>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>

                  {/* Second Row - 2 Certificates (Centered) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-4xl mx-auto">
                    {[
                      { 
                        image: "/logo_partner/certificate4.png", 
                        title: "Certificate of Authorized Distributor – Mech-Mind Robotics",
                        description: "Thadosoft Technology Solution Joint Stock Company has been appointed as an Authorized Distributor of Mech-Mind Robotics Technologies Ltd. in Vietnam"
                      },
                      { 
                        image: "/logo_partner/certificate5.png", 
                        title: "TAuthorized Agent Certificate – Rochu Robotics",
                        description: "Thadosoft Technology Solution Joint Stock Company is officially recognized as an Authorized Dealer of Suzhou Rochu Robotics, specializing in flexible gripper products for industrial automation"
                      }
                    ].map((cert, index) => (
                      <AnimatedSection key={index + 3} animationType="fadeInUp" delay={600 + index * 100}>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                          <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8 flex items-center justify-center h-72 sm:h-80 lg:h-96 xl:h-[28rem]">
                            <img 
                              src={cert.image} 
                              alt={cert.title}
                              className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-5 sm:p-6 lg:p-8">
                            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                              {cert.title}
                            </h4>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed text-center">
                              {cert.description}
                            </p>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
                  </AnimatedSection>
                </div>
              </div>

              {/* Right Sidebar Navigation */}
              <div className="md:col-span-1 lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 sticky top-24">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Quality Assurance</h3>
                  <nav className="space-y-2 sm:space-y-3">
                    <button 
                      onClick={() => scrollToSection('qa-standards')} 
                      className={`block w-full text-sm sm:text-base font-medium transition-colors duration-200 text-left ${
                        activeSection === 'qa-standards' 
                          ? 'text-[#36A9A9]' 
                          : 'text-gray-600 hover:text-[#36A9A9]'
                      }`}
                    >
                      • Our Quality Standards
                    </button>
                    <button 
                      onClick={() => scrollToSection('qa-processes')} 
                      className={`block w-full text-sm sm:text-base font-medium transition-colors duration-200 text-left ${
                        activeSection === 'qa-processes' 
                          ? 'text-[#36A9A9]' 
                          : 'text-gray-600 hover:text-[#36A9A9]'
                      }`}
                    >
                      • Our Certifications
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
