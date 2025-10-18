import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn';
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animationType = 'fadeInUp',
  delay = 0
}) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.05,
    rootMargin: '0px 0px 100px 0px',
    triggerOnce: true
  });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (!isVisible) {
      switch (animationType) {
        case 'fadeInUp':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'fadeInLeft':
          return `${baseClasses} opacity-0 -translate-x-8`;
        case 'fadeInRight':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'fadeIn':
          return `${baseClasses} opacity-0`;
        default:
          return `${baseClasses} opacity-0 translate-y-8`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-y-0 translate-x-0`;
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
