import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip = ({ 
  content, 
  children, 
  position = 'bottom',
  delay = 500 
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Detect theme
  const getTheme = () => {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  };

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      calculatePosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const calculatePosition = () => {
    if (!wrapperRef.current || !tooltipRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = wrapperRect.top - tooltipRect.height - 8;
        left = wrapperRect.left + (wrapperRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = wrapperRect.bottom + 8;
        left = wrapperRect.left + (wrapperRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = wrapperRect.top + (wrapperRect.height - tooltipRect.height) / 2;
        left = wrapperRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = wrapperRect.top + (wrapperRect.height - tooltipRect.height) / 2;
        left = wrapperRect.right + 8;
        break;
    }

    // Keep tooltip within viewport
    const padding = 8;
    if (left < padding) left = padding;
    if (left + tooltipRect.width > window.innerWidth - padding) {
      left = window.innerWidth - tooltipRect.width - padding;
    }
    if (top < padding) top = padding;
    if (top + tooltipRect.height > window.innerHeight - padding) {
      top = window.innerHeight - tooltipRect.height - padding;
    }

    setTooltipPosition({ top, left });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible]);

  // Get theme-specific colors
  const theme = getTheme();
  const isLight = theme === 'light';
  
  // Force correct colors based on theme
  const tooltipStyles: React.CSSProperties = {
    position: 'fixed',
    top: `${tooltipPosition.top}px`,
    left: `${tooltipPosition.left}px`,
    zIndex: 999999,
    backgroundColor: isLight ? '#000000' : '#282828',
    color: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: '13px',
    fontWeight: 600,
    padding: '6px 12px',
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.15s ease',
  };

  return (
    <>
      <div
        ref={wrapperRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          style={tooltipStyles}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default Tooltip;
