import React from 'react';
import './PageContainer.css';

const PageContainer = ({ children, className = '', ...props }) => {
  return (
    <div className={`page-container ${className}`} {...props}>
      {children}
    </div>
  );
};

export default PageContainer;
