import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { useLanguage } from './LanguageContext';

interface CompareContextType {
  compareProducts: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
  isInCompare: (productId: number) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  const [compareProducts, setCompareProducts] = useState<Product[]>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('compareProducts');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever compareProducts changes
  useEffect(() => {
    localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
  }, [compareProducts]);

  const addToCompare = (product: Product) => {
    setCompareProducts((prev) => {
      // Check if product already exists
      if (prev.some((p) => p.id === product.id)) {
        return prev;
      }
      
      // Check if product has same category as existing products
      if (prev.length > 0) {
        const firstProductCategory = prev[0].category.id;
        if (product.category.id !== firstProductCategory) {
          showNotification(`${t('compare.sameCategoryOnly')} "${prev[0].category.name}". ${t('compare.clearToCompareOther')}`);
          return prev;
        }
      }
      
      // Limit to 3 products max
      if (prev.length >= 3) {
        showNotification(t('compare.maxProducts'));
        return prev;
      }
      
      return [...prev, product];
    });
  };

  const showNotification = (message: string) => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl max-w-md text-center animate-slideDown';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span class="text-sm font-medium">${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideUp 0.3s ease-out';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const removeFromCompare = (productId: number) => {
    setCompareProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareProducts([]);
  };

  const isInCompare = (productId: number) => {
    return compareProducts.some((p) => p.id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareProducts,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

