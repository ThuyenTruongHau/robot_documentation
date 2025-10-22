import React, { useState, useEffect, useRef } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import apiService from '../services/api';

// Counter Animation Component
const CounterAnimation: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(progress) * end);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted.current) {
            hasStarted.current = true;
            animationFrame = requestAnimationFrame(animate);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [end, duration]);

  return (
    <span ref={counterRef}>
      {count}{suffix}
    </span>
  );
};

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await apiService.submitContact({
        full_name: formData.name,
        email: formData.email,
        company: formData.company,
        phone_number: formData.phone,
        message: formData.message
      });

      if (response.success) {
        setSubmitMessage({ type: 'success', text: response.message });
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitMessage({ type: 'error', text: 'Có lỗi xảy ra. Vui lòng thử lại.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Không thể kết nối đến server. Vui lòng thử lại sau.' });
    } finally {
      setIsSubmitting(false);
    }
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
      details: ["C25-C26, ngách 28/5 P.Dương Khuê, Mai Dịch, Cầu Giấy, Hà Nội"]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      details: ["+84 986 249 212"]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      details: ["info@thadosoft.vn"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <AnimatedSection animationType="fadeInUp" delay={0}>
        <div className="relative bg-cover bg-center bg-no-repeat h-[70vh]" style={{ backgroundImage: 'url(/contact1_image.webp)' }}>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative max-w-7xl mx-auto px-4 text-center flex items-center justify-center h-full">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4">
                Contact Us
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                Get in touch with our RFID technology experts for consultation and support
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Form & Info */}
      <AnimatedSection animationType="fadeInUp" delay={200}>
        <div className="py-12 sm:py-16 lg:py-20 xl:py-24">
          <div className="max-w-none mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
              {/* Contact Form */}
              <div className="lg:order-1">
                <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 lg:p-12 xl:p-14">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 sm:mb-10 lg:mb-12 text-center">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 lg:space-y-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                    <div>
                      <label htmlFor="name" className="block text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-5 py-4 sm:py-5 lg:py-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent transition-colors duration-200 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-5 py-4 sm:py-5 lg:py-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent transition-colors duration-200 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                    <div>
                      <label htmlFor="company" className="block text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-5 py-4 sm:py-5 lg:py-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent transition-colors duration-200 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-5 py-4 sm:py-5 lg:py-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent transition-colors duration-200 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="+84 123 456 789"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={8}
                      disabled={isSubmitting}
                      className="w-full px-5 py-4 sm:py-5 lg:py-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#36A9A9] focus:border-transparent transition-colors duration-200 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tell us about your project or requirements..."
                    />
                  </div>
                  {submitMessage && (
                    <div className={`p-4 rounded-lg text-center ${
                      submitMessage.type === 'success' 
                        ? 'bg-green-100 text-green-800 border border-green-300' 
                        : 'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                      {submitMessage.text}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#36A9A9] hover:bg-[#2a8a8a] text-white px-10 py-5 sm:py-6 lg:py-7 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg text-lg sm:text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="lg:order-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 sm:mb-10 lg:mb-12 text-center">Get in Touch</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10 xl:gap-12">
                   {contactInfo.map((info, index) => (
                     <AnimatedSection key={index} animationType="fadeInUp" delay={300 + index * 100}>
                       <div className="flex items-start space-x-6">
                         <div className="flex-shrink-0 w-16 h-16 lg:w-18 lg:h-18 bg-[#36A9A9] rounded-lg flex items-center justify-center text-white">
                           {info.icon}
                         </div>
                         <div>
                           <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">{info.title}</h3>
                           {info.details.map((detail, detailIndex) => (
                             <p key={detailIndex} className="text-base sm:text-lg text-gray-600">{detail}</p>
                           ))}
                         </div>
                       </div>
                     </AnimatedSection>
                   ))}
                 </div>

                 {/* Google Map */}
                 <AnimatedSection animationType="fadeInUp" delay={600}>
                   <div className="mt-10 lg:mt-12">
                     <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">Our Location</h3>
                     <div className="rounded-lg overflow-hidden shadow-lg">
                       <iframe
                         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9383536499295!2d105.77007297430636!3d21.035152487560847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345537593bdc4f%3A0x27d693f129afce58!2sSPTECH%20-%20THADOSOFT%20CORP!5e0!3m2!1svi!2s!4v1760541710967!5m2!1svi!2s"
                         width="100%"
                         height="400"
                         style={{ border: 0 }}
                         allowFullScreen
                         loading="lazy"
                         referrerPolicy="no-referrer-when-downgrade"
                         className="w-full h-80 sm:h-90 lg:h-[450px] xl:h-[470px] 2xl:h-[570px]"
                         title="ThadoSoft Company Location - C25-C26, ngách 28/5 P.Dương Khuê, Mai Dịch, Cầu Giấy, Hà Nội"
                       ></iframe>
                     </div>
                   </div>
                 </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

       {/* What Makes Thado RFID Different */}
       <div className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/world_map.jpg)' }}>
         {/* Overlay for better text readability */}
         <div className="absolute inset-0 bg-black/50"></div>
         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12 sm:mb-16 lg:mb-20">
             <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">What Makes Thado RFID Different?</h2>
             <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white/90">Our commitment to excellence and innovation</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
             {[
               { title: "Customers", value: 110, suffix: "+", description: "Trusted Cross Regions" },
               { title: "Years of Innovation", value: 10, suffix: "+", description: "Industry Experience" },
               { title: "Productivity Gains", value: 70, suffix: "%", description: "Productivity Gains" }
             ].map((stat, index) => (
               <div key={index} className="flex items-stretch justify-center">
                 <div className="text-center px-6 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-7 xl:px-12 xl:py-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl w-full max-w-md min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px] flex items-center justify-center">
                   <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 w-full">
                     {/* Number */}
                     <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#36A9A9] flex-shrink-0">
                       <CounterAnimation end={stat.value} duration={2000} suffix={stat.suffix} />
                     </div>
                     {/* Text */}
                     <div className="text-center sm:text-left flex-1">
                       <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 leading-tight">{stat.title}</h3>
                       <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">{stat.description}</p>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>
    </div>
  );
};

export default ContactUs;
