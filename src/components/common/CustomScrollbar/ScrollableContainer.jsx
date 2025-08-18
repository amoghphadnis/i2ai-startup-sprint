import React from 'react';
import './ScrollableContainer.css';

const ScrollableContainer = ({ 
  children, 
  className = '', 
  maxHeight = 'auto',
  maxWidth = 'auto',
  overflowX = 'auto',
  overflowY = 'auto',
  ...props 
}) => {
  const containerStyle = {
    maxHeight,
    maxWidth,
    overflowX,
    overflowY,
  };

  return (
    <div 
      className={`scrollable-container custom-scrollbar ${className}`}
      style={containerStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollableContainer;
