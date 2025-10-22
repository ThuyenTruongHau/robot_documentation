import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Top Section - Navigation Links */}
      <div className="container-responsive py-4 lg:py-6 xl:py-8">
        <div className="grid grid-cols-2 gap-6 lg:gap-8 xl:gap-10">
          {/* Left Column */}
          <div className="space-y-2 lg:space-y-3">
            <h3 className="text-sm lg:text-base xl:text-lg 3xl:text-xl font-bold text-orange-500 uppercase tracking-wide">
              Products
            </h3>
            <ul className="space-y-1 lg:space-y-2">
              <li><Link to="/rfid-products" className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-white hover:text-gray-300">RFID Products</Link></li>
              <li><Link to="/rfid-solutions" className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-white hover:text-gray-300">RFID Solutions</Link></li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="space-y-2 lg:space-y-3">
            <h3 className="text-sm lg:text-base xl:text-lg 3xl:text-xl font-bold text-orange-500 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-1 lg:space-y-2">
              <li><Link to="/about-us" className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-white hover:text-gray-300">About Us</Link></li>
              <li><Link to="/contact-us" className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-white hover:text-gray-300">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-700"></div>

      {/* Middle Section - Branding and Subscription */}
      <div className="container-responsive py-4 lg:py-6 xl:py-8">
        <div className="grid grid-cols-2 gap-6 lg:gap-8 xl:gap-10">
          {/* Left Side - Logo and Subscribe */}
          <div className="space-y-3 lg:space-y-4 xl:space-y-5">
            {/* Logo */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              <img
                src="/logo_noback.png"
                alt="Thado Robot"
                className="h-8 lg:h-10 xl:h-12 3xl:h-14 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="text-sm lg:text-base xl:text-lg 3xl:text-xl font-bold text-white uppercase tracking-wide mb-3">
                GET IN TOUCH
              </h4>
              <div className="space-y-2 text-sm lg:text-base xl:text-lg 3xl:text-xl text-gray-300">
                <p>📧 info@thadosoft.vn</p>
                <p>📞 +84 986 249 212</p>
                <p>📍 C25-C26, ngách 28/5 P.Dương Khuê, Mai Dịch, Cầu Giấy, Hà Nội</p>
              </div>
            </div>
          </div>

          {/* Right Side - RFID Technology Info */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm lg:text-base xl:text-lg 3xl:text-xl font-bold text-white uppercase tracking-wide mb-3">
                RFID TECHNOLOGY
              </h4>
              <div className="space-y-2 text-sm lg:text-base xl:text-lg 3xl:text-xl text-gray-300">
                <p>• Advanced RFID Readers</p>
                <p>• Smart RFID Tags</p>
                <p>• Industrial Automation</p>
                <p>• Real-time Tracking</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm lg:text-base xl:text-lg 3xl:text-xl font-bold text-white uppercase tracking-wide mb-3">
                CERTIFICATIONS
              </h4>
              <div className="flex items-center space-x-2">
                <img
                  src="/cc.png"
                  alt="Security Certificate"
                  className="h-12 lg:h-14 xl:h-16 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <span className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-gray-300">ISO 9001 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-700"></div>

      {/* Bottom Section - Social Media and Copyright */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left Side - Social Media & Quick Links */}
          <div className="flex items-center space-x-6">
            <div className="flex space-x-2">
              <a href="https://linkedin.com" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-white hover:bg-gray-700 transition-colors text-sm font-bold">
                in
              </a>
              <a href="https://twitter.com" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://facebook.com" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
            
            <div className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-gray-400">
              <span className="text-orange-500 font-semibold">RFID Solutions</span> for Industrial Automation
            </div>
          </div>

          {/* Right Side - Copyright */}
          <div className="text-sm lg:text-base xl:text-lg 3xl:text-xl text-gray-400">
            Copyright 2025 Thadosoft Technology Solution JSC
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
