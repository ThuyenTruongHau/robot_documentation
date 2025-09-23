import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

const AboutUs: React.FC = () => {
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
        <div className="bg-gradient-to-br from-[#36A9A9] to-[#2a8a8a] py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-light text-white mb-4">
              About Us
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Leading provider of RFID technology solutions for industrial automation and smart manufacturing
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Company Story */}
      <AnimatedSection animationType="fadeInUp" delay={200}>
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded in 2015, THADOSOFT has been at the forefront of RFID technology innovation. 
                  We specialize in developing cutting-edge RFID solutions that help businesses optimize 
                  their operations and achieve greater efficiency.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our team of experienced engineers and technologists work tirelessly to deliver 
                  reliable, scalable, and cost-effective RFID solutions tailored to meet the unique 
                  needs of each client.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#36A9A9] mb-2">500+</div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#36A9A9] mb-2">50+</div>
                    <div className="text-gray-600">Happy Clients</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-lg">Company Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Mission & Vision */}
      <AnimatedSection animationType="fadeInUp" delay={400}>
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#36A9A9] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-600">
                  To provide innovative RFID technology solutions that empower businesses to achieve 
                  operational excellence through automation and real-time data insights.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#36A9A9] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-lg text-gray-600">
                  To be the leading provider of RFID technology solutions globally, recognized for 
                  our innovation, reliability, and commitment to customer success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection animationType="fadeInUp" delay={600}>
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-xl text-gray-600">Meet the experts behind our success</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <AnimatedSection key={index} animationType="fadeInUp" delay={700 + index * 100}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center">
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                      <div className="text-gray-400">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-sm">Team Member Photo</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-[#36A9A9] font-medium mb-2">{member.position}</p>
                      <p className="text-gray-600 text-sm">{member.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Timeline */}
      <AnimatedSection animationType="fadeInUp" delay={800}>
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600">Key milestones in our company's growth</p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#36A9A9]"></div>
              {milestones.map((milestone, index) => (
                <AnimatedSection key={index} animationType="fadeInUp" delay={900 + index * 100}>
                  <div className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="text-[#36A9A9] font-bold text-lg mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#36A9A9] rounded-full border-4 border-white"></div>
                    <div className="w-1/2"></div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default AboutUs;
