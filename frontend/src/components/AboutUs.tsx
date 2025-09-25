import React from 'react';

const AboutUs: React.FC = () => {
  const aboutSections = [
    {
      id: 1,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          <path d="M8,12H16V14H8V12M8,16H13V18H8V16Z" />
        </svg>
      ),
      title: "History",
      description: "Founded in 2020, pioneering automation innovation."
    },
    {
      id: 2,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
        </svg>
      ),
      title: "Products",
      description: "Top-tier automation solutions in Vietnam."
    },
    {
      id: 3,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.5,8L11,13.5L7.5,10L6,11.5L11,16.5Z" />
        </svg>
      ),
      title: "Services",
      description: "Machine vision & AI automation services."
    },
    {
      id: 4,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
        </svg>
      ),
      title: "Values",
      description: "Dedicated, Innovative, Direct & Cooperative."
    }
  ];

  return (
    <div className="relative bg-white py-12">
      <div className="max-w-full lg:max-w-[95%] xl:max-w-[90%] 3xl:max-w-[85%] mx-auto px-4 lg:px-6 xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 3xl:gap-20 items-center">
          {/* Left Side - Logo Image */}
          <div className="relative text-center lg:text-left">
            <img
              src="/Office_aboutus.png"
              alt="Company Logo"
              className="w-full h-auto max-w-xl lg:max-w-2xl xl:max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mx-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Main Title */}
            <div>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-bold text-[#36A9A9] mb-3 lg:mb-4 xl:mb-6">
                ABOUT US
              </h2>
              <p className="text-base lg:text-lg xl:text-xl 3xl:text-2xl text-gray-800 font-medium">
                Quality - Prestige - Professionalism.
              </p>
            </div>

            {/* About Sections */}
            <div className="space-y-4">
              {aboutSections.map((section) => (
                <div key={section.id} className="flex items-center space-x-3 group">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 bg-[#36A9A9] rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300">
                    {section.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base lg:text-lg xl:text-xl 3xl:text-2xl font-semibold text-gray-900 mb-1">
                      {section.title}
                    </h3>
                    <p className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-gray-600">
                      {section.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button className="bg-[#36A9A9] hover:bg-[#36A9A9]/90 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg">
                Learn More +
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
