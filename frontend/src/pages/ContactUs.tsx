import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will contact you soon.');
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Address",
      details: ["123 Industrial Zone", "Ho Chi Minh City, Vietnam", "700000"]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      details: ["+84 28 1234 5678", "+84 28 8765 4321"]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      details: ["info@thadosoft.com", "support@thadosoft.com"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <AnimatedSection animationType="fadeInUp" delay={0}>
        <div className="bg-gradient-to-br from-[#36A9A9] to-[#2a8a8a] py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Get in touch with our RFID technology experts for consultation and support
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Form & Info */}
      <AnimatedSection animationType="fadeInUp" delay={200}>
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent transition-colors duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent transition-colors duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent transition-colors duration-200"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent transition-colors duration-200"
                        placeholder="+84 123 456 789"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="rfid-products">RFID Products Inquiry</option>
                      <option value="rfid-solutions">RFID Solutions Consultation</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent transition-colors duration-200"
                      placeholder="Tell us about your project or requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#36A9A9] hover:bg-[#2a8a8a] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <AnimatedSection key={index} animationType="fadeInUp" delay={300 + index * 100}>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#36A9A9] rounded-lg flex items-center justify-center text-white">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-600">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>

                {/* Map Placeholder */}
                <AnimatedSection animationType="fadeInUp" delay={600}>
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Location</h3>
                    <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm">Interactive Map</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Business Hours */}
      <AnimatedSection animationType="fadeInUp" delay={800}>
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Business Hours</h2>
              <p className="text-xl text-gray-600">We're here to help you during business hours</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
                { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
                { day: "Sunday", hours: "Closed" }
              ].map((schedule, index) => (
                <AnimatedSection key={index} animationType="fadeInUp" delay={900 + index * 100}>
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{schedule.day}</h3>
                    <p className="text-[#36A9A9] font-medium">{schedule.hours}</p>
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

export default ContactUs;
