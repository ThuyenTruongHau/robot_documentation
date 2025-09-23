import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface StaggeredAnimationProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn';
}

const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  className = '',
  staggerDelay = 500,
  animationType = 'fadeInUp'
}) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true
  });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-1200 ease-out';
    
    if (!isVisible) {
      switch (animationType) {
        case 'fadeInUp':
          return `${baseClasses} opacity-0 translate-y-12`;
        case 'fadeInLeft':
          return `${baseClasses} opacity-0 -translate-x-12`;
        case 'fadeInRight':
          return `${baseClasses} opacity-0 translate-x-12`;
        case 'fadeIn':
          return `${baseClasses} opacity-0`;
        default:
          return `${baseClasses} opacity-0 translate-y-12`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-y-0 translate-x-0`;
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${staggerDelay}ms` }}
    >
      {children}
    </div>
  );
};

export default StaggeredAnimation;
