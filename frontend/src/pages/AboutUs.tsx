import React, { useState, useEffect } from 'react';
import AnimatedSection from '../components/AnimatedSection';

const AboutUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('company-profile');

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
    { year: "2015", title: "Company Founded", description: "Started with a vision to revolutionize RFID technology" },
    { year: "2018", title: "First Major Project", description: "Successfully implemented RFID system for major manufacturer" },
    { year: "2020", title: "Technology Breakthrough", description: "Developed proprietary RFID reading technology" },
    { year: "2023", title: "Market Expansion", description: "Expanded services to international markets" }
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
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600">Key milestones in our company's growth</p>
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
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">{milestone.description}</p>
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
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600">Meet the experts behind our success</p>
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
                    <button onClick={() => scrollToSection('our-story')} className="block text-sm sm:text-base text-[#36A9A9] font-medium hover:text-[#2a8a8a] transition-colors duration-200 text-left">
                      • Overview
                    </button>
                    <button onClick={() => scrollToSection('our-journey')} className="block text-sm sm:text-base text-gray-600 hover:text-[#36A9A9] transition-colors duration-200 text-left">
                      • Our Journey
                    </button>
                    <button onClick={() => scrollToSection('our-team')} className="block text-sm sm:text-base text-gray-600 hover:text-[#36A9A9] transition-colors duration-200 text-left">
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
                <div id="rd-overview" className="text-center mb-8 sm:mb-12 lg:mb-16">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Research & Development</h2>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600">Innovation at the heart of our technology</p>
                </div>
                
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
                        <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#36A9A9] mb-1 sm:mb-2">8</div>
                        <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600">Years R&D Experience</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <p className="text-lg">R&D Laboratory</p>
                    </div>
                  </div>
                </div>

                <div id="rd-focus-areas" className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-[#36A9A9] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <svg className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Innovation</h3>
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
                      Continuous innovation in RFID technology to meet evolving market demands 
                      and customer requirements.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-[#36A9A9] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <svg className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Quality</h3>
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
                      Rigorous testing and quality assurance processes to ensure reliable 
                      and durable RFID solutions.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-[#36A9A9] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <svg className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Collaboration</h3>
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed">
                      Strong partnerships with academic institutions and industry leaders 
                      to drive technological advancement.
                    </p>
                  </div>
                </div>
                  </AnimatedSection>
                </div>
              </div>

              {/* Right Sidebar Navigation */}
              <div className="md:col-span-1 lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 sticky top-24">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">R&D Profile</h3>
                  <nav className="space-y-2 sm:space-y-3">
                    <button onClick={() => scrollToSection('rd-overview')} className="block text-sm sm:text-base text-[#36A9A9] font-medium hover:text-[#2a8a8a] transition-colors duration-200 text-left">
                      • Overview
                    </button>
                    <button onClick={() => scrollToSection('rd-philosophy')} className="block text-sm sm:text-base text-gray-600 hover:text-[#36A9A9] transition-colors duration-200 text-left">
                      • R&D Philosophy
                    </button>
                    <button onClick={() => scrollToSection('rd-focus-areas')} className="block text-sm sm:text-base text-gray-600 hover:text-[#36A9A9] transition-colors duration-200 text-left">
                      • Focus Areas
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
                <div id="qa-overview" className="text-center mb-8 sm:mb-12 lg:mb-16">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Quality Assurance</h2>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600">Committed to excellence in every product we deliver</p>
                </div>
                
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
                  <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-lg">Quality Control Center</p>
                    </div>
                  </div>
                </div>

                <div id="qa-processes" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Testing & Validation</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-[#36A9A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Environmental stress testing
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-[#36A9A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Performance benchmarking
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-[#36A9A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Compatibility verification
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-[#36A9A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Long-term reliability testing
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Certifications</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-[#36A9A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        ISO 9001:2015 Quality Management
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-[#36A9A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        CE Marking Compliance
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-[#36A9A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        FCC Certification
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-[#36A9A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        RoHS Compliance
                      </li>
                    </ul>
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
                    <button onClick={() => scrollToSection('qa-overview')} className="block text-sm sm:text-base text-[#36A9A9] font-medium hover:text-[#2a8a8a] transition-colors duration-200 text-left">
                      • Overview
                    </button>
                    <button onClick={() => scrollToSection('qa-standards')} className="block text-sm sm:text-base text-gray-600 hover:text-[#36A9A9] transition-colors duration-200 text-left">
                      • Quality Standards
                    </button>
                    <button onClick={() => scrollToSection('qa-processes')} className="block text-sm sm:text-base text-gray-600 hover:text-[#36A9A9] transition-colors duration-200 text-left">
                      • Processes & Certifications
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
