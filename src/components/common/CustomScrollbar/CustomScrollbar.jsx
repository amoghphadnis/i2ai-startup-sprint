import React, { useEffect } from 'react';
import './CustomScrollbar.css';

const CustomScrollbar = () => {
  useEffect(() => {
    // Add custom scrollbar styles to the document
    const style = document.createElement('style');
    style.textContent = `
      /* Custom Scrollbar Styles */
      ::-webkit-scrollbar {
        width: var(--scrollbar-width);
        height: var(--scrollbar-height);
      }

      ::-webkit-scrollbar-track {
        background: var(--scrollbar-track-bg);
        border-radius: var(--scrollbar-border-radius);
      }

      ::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb-bg);
        border-radius: var(--scrollbar-border-radius);
        border: var(--scrollbar-thumb-border);
        transition: var(--scrollbar-transition);
      }

      ::-webkit-scrollbar-thumb:hover {
        background: var(--scrollbar-thumb-hover-bg);
        transform: var(--scrollbar-thumb-hover-transform);
      }

      ::-webkit-scrollbar-corner {
        background: var(--scrollbar-track-bg);
      }

      /* Firefox Scrollbar */
      * {
        scrollbar-width: var(--scrollbar-width);
        scrollbar-color: var(--scrollbar-thumb-bg) var(--scrollbar-track-bg);
      }

      /* For elements with custom scrollbars */
      .custom-scrollbar {
        scrollbar-width: var(--scrollbar-width);
        scrollbar-color: var(--scrollbar-thumb-bg) var(--scrollbar-track-bg);
      }

      .custom-scrollbar::-webkit-scrollbar {
        width: var(--scrollbar-width);
        height: var(--scrollbar-height);
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: var(--scrollbar-track-bg);
        border-radius: var(--scrollbar-border-radius);
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb-bg);
        border-radius: var(--scrollbar-border-radius);
        border: var(--scrollbar-thumb-border);
        transition: var(--scrollbar-transition);
      }

      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: var(--scrollbar-thumb-hover-bg);
        transform: var(--scrollbar-thumb-hover-transform);
      }
    `;
    
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default CustomScrollbar;
