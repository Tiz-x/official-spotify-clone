import { useEffect } from 'react';

const SpotifyTooltip = () => {
  useEffect(() => {
    let tooltipElement: HTMLDivElement | null = null;
    let timeoutId: number;

    const getTheme = () => {
      const htmlTheme = document.documentElement.getAttribute('data-theme');
      const bodyTheme = document.body.getAttribute('data-theme');
      const appTheme = document.querySelector('.app')?.getAttribute('data-theme');
      return htmlTheme || bodyTheme || appTheme || 'dark';
    };

    const showTooltip = (content: string, x: number, y: number) => {
      if (tooltipElement) {
        tooltipElement.remove();
      }

      const theme = getTheme();
      const isLight = theme === 'light';

      tooltipElement = document.createElement('div');
      tooltipElement.setAttribute('data-tooltip-theme', isLight ? 'light' : 'dark');
      
      if (isLight) {
        tooltipElement.setAttribute('style', `
          position: fixed !important;
          left: ${x}px !important;
          top: ${y}px !important;
          background: #000000 !important;
          background-color: #000000 !important;
          color: #ffffff !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          padding: 6px 12px !important;
          border-radius: 4px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5) !important;
          z-index: 999999 !important;
          pointer-events: none !important;
          white-space: nowrap !important;
          transform: translateX(-50%) !important;
          opacity: 1 !important;
        `);
      } else {
        tooltipElement.setAttribute('style', `
          position: fixed !important;
          left: ${x}px !important;
          top: ${y}px !important;
          background: #282828 !important;
          background-color: #282828 !important;
          color: #ffffff !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          padding: 6px 12px !important;
          border-radius: 4px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5) !important;
          z-index: 999999 !important;
          pointer-events: none !important;
          white-space: nowrap !important;
          transform: translateX(-50%) !important;
          opacity: 1 !important;
        `);
      }
      
      tooltipElement.textContent = content;
      document.body.appendChild(tooltipElement);
    };

    const hideTooltip = () => {
      if (tooltipElement) {
        tooltipElement.remove();
        tooltipElement = null;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const content = target.getAttribute('data-tooltip-content');
      
      if (!content) return;

      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const rect = target.getBoundingClientRect();
        showTooltip(content, rect.left + rect.width / 2, rect.bottom + 8);
      }, 500);
    };

    const handleMouseLeave = () => {
      clearTimeout(timeoutId);
      hideTooltip();
    };

    const attachListeners = () => {
      const elements = document.querySelectorAll('[data-tooltip-content]');
      elements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mouseenter', handleMouseEnter as EventListener);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    attachListeners();

    const domObserver = new MutationObserver(attachListeners);
    domObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timeoutId);
      hideTooltip();
      domObserver.disconnect();
    };
  }, []);

  return null;
};

export default SpotifyTooltip;