import React from 'react';
import { Button } from '@/components/ui/button';
import './CTABand.css';

const CTABand = ({ 
  title, 
  subtitle, 
  primaryCta, 
  secondaryCta, 
  className = '' 
}) => {
  return (
    <div className={`cta-band ${className}`}>
      <div className="cta-content">
        {title && <h2 className="cta-title">{title}</h2>}
        {subtitle && <p className="cta-subtitle">{subtitle}</p>}
        
        <div className="cta-buttons">
          {primaryCta && (
            <Button
              onClick={primaryCta.onClick}
              href={primaryCta.href}
              className="cta-primary"
              variant="default"
            >
              {primaryCta.label}
            </Button>
          )}
          
          {secondaryCta && (
            <Button
              onClick={secondaryCta.onClick}
              href={secondaryCta.href}
              className="cta-secondary"
              variant="outline"
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CTABand;
