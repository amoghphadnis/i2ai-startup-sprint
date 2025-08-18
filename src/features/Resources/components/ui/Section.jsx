import React from 'react';
import './Section.css';

const Section = ({ 
  id, 
  title, 
  intro, 
  children, 
  className = '', 
  'aria-label': ariaLabel,
  ...props 
}) => {
  return (
    <section 
      id={id} 
      className={`content-section ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {title && (
        <h2 className="section-title">{title}</h2>
      )}
      
      {intro && (
        <p className="section-intro">{intro}</p>
      )}
      
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

export default Section;
