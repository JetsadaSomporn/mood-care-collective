
import { type ReactElement, useEffect, useState } from 'react';

// Animation utility to handle fade-in elements when they appear in viewport
export const useFadeIn = (options = { threshold: 0.2, rootMargin: '0px' }) => {
  return (element: HTMLElement | null) => {
    if (!element) return;
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  };
};

// Animation utility for staggered entrance effects
export const StaggeredFade = ({ 
  children, 
  staggerMs = 100, 
  initialDelay = 0 
}: { 
  children: ReactElement[] | ReactElement,
  staggerMs?: number,
  initialDelay?: number
}) => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, []);
  
  if (!show) return null;
  
  if (!Array.isArray(children)) {
    return children;
  }
  
  return (
    <>
      {children.map((child, i) => (
        <div 
          key={i} 
          className="opacity-0 animate-fade-in" 
          style={{ 
            animationDelay: `${initialDelay + (i * staggerMs)}ms`,
            animationFillMode: 'forwards'
          }}
        >
          {child}
        </div>
      ))}
    </>
  );
};

// Simple lazy load image component with blur effect
export const LazyImage = ({ 
  src, 
  alt, 
  className = '' 
}: { 
  src: string, 
  alt: string, 
  className?: string 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`absolute inset-0 bg-muted ${isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`} />
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
