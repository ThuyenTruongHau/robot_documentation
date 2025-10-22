import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translations object - expand this as needed
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.products': 'RFID Products',
    'nav.solutions': 'RFID Solutions',
    'nav.news': 'RFID News',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    
    // Compare
    'compare.title': 'Compare Products',
    'compare.comparing': 'Comparing',
    'compare.product': 'product',
    'compare.products': 'products',
    'compare.clearAll': 'Clear All',
    'compare.addMore': 'Add More',
    'compare.noProducts': 'No Products to Compare',
    'compare.noProductsDesc': 'Start adding products to compare their features and specifications.',
    'compare.browseProducts': 'Browse Products',
    'compare.viewDetails': 'View Details',
    'compare.description': 'Description',
    'compare.technicalSpecs': 'Technical Specifications',
    'compare.overallComparison': 'Overall Comparison',
    'compare.quality': 'Quality',
    'compare.performance': 'Performance',
    'compare.integration': 'Integration',
    'compare.recommendation': 'Recommendation',
    'compare.analyzingWithAI': 'Analyzing with AI...',
    'compare.aiPowered': 'AI Powered',
    'compare.loadError': 'Unable to load comparison information. Please try again later.',
    
    // Compare Notifications
    'compare.maxProducts': 'You can only compare up to 3 products at a time. Please remove some products to add another one.',
    'compare.sameCategoryOnly': 'You can only compare products of the same category',
    'compare.clearToCompareOther': 'Please clear the current list to compare products of a different category.',
    
    // Compare Fallback
    'compare.fallback.overall': 'Comparing high-quality RFID products for enterprise solutions.',
    'compare.fallback.quality': 'All products meet high quality standards, suitable for enterprises',
    'compare.fallback.performance': 'Stable performance, high durability, continuous long-term operation',
    'compare.fallback.integration': 'Easy to integrate with existing systems, multi-platform support',
    'compare.fallback.recommendation': 'Suitable for various industries from logistics, manufacturing to healthcare',
  },
  vi: {
    // Navbar
    'nav.products': 'Sản phẩm RFID',
    'nav.solutions': 'Giải pháp RFID',
    'nav.news': 'Tin tức RFID',
    'nav.about': 'Về chúng tôi',
    'nav.contact': 'Liên hệ',
    
    // Compare
    'compare.title': 'So sánh sản phẩm',
    'compare.comparing': 'Đang so sánh',
    'compare.product': 'sản phẩm',
    'compare.products': 'sản phẩm',
    'compare.clearAll': 'Xóa tất cả',
    'compare.addMore': 'Thêm sản phẩm',
    'compare.noProducts': 'Chưa có sản phẩm để so sánh',
    'compare.noProductsDesc': 'Bắt đầu thêm sản phẩm để so sánh tính năng và thông số kỹ thuật.',
    'compare.browseProducts': 'Xem sản phẩm',
    'compare.viewDetails': 'Xem chi tiết',
    'compare.description': 'Mô tả',
    'compare.technicalSpecs': 'Thông số kỹ thuật',
    'compare.overallComparison': 'Tổng quan so sánh',
    'compare.quality': 'Chất lượng',
    'compare.performance': 'Hiệu suất',
    'compare.integration': 'Tích hợp',
    'compare.recommendation': 'Khuyến nghị',
    'compare.analyzingWithAI': 'Đang phân tích với AI...',
    'compare.aiPowered': 'AI Powered',
    'compare.loadError': 'Không thể tải thông tin so sánh. Vui lòng thử lại sau.',
    
    // Compare Notifications
    'compare.maxProducts': 'Bạn chỉ có thể so sánh tối đa 3 sản phẩm cùng lúc. Vui lòng xóa bớt để thêm sản phẩm khác.',
    'compare.sameCategoryOnly': 'Chỉ có thể so sánh các sản phẩm cùng loại',
    'compare.clearToCompareOther': 'Vui lòng xóa danh sách hiện tại để so sánh sản phẩm loại khác.',
    
    // Compare Fallback
    'compare.fallback.overall': 'Đang so sánh các sản phẩm RFID chất lượng cao cho doanh nghiệp.',
    'compare.fallback.quality': 'Các sản phẩm đều đạt tiêu chuẩn chất lượng cao, phù hợp cho doanh nghiệp',
    'compare.fallback.performance': 'Hiệu suất ổn định, độ bền cao, hoạt động liên tục lâu dài',
    'compare.fallback.integration': 'Dễ dàng tích hợp với hệ thống hiện có, hỗ trợ đa nền tảng',
    'compare.fallback.recommendation': 'Phù hợp cho nhiều ngành nghề từ logistics, manufacturing đến healthcare',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load from localStorage or default to 'en'
    const saved = localStorage.getItem('language');
    return (saved === 'vi' || saved === 'en') ? saved : 'en';
  });

  // Save to localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

