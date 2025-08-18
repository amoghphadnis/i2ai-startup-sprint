import React from 'react';
import { Button } from '@/components/ui/button';
import './Hero.css';

const Hero = ({ title, subtitle, ctas = [], badges = [], className = '' }) => {
  return (
    <div className={`hero ${className}`}>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        
        {badges && badges.length > 0 && (
          <div className="hero-badges">
            {badges.map((badge, index) => (
              <div key={index} className="hero-badge">
                {badge.icon && <span className="badge-icon">{badge.icon}</span>}
                <span className="badge-text">{badge.text}</span>
              </div>
            ))}
          </div>
        )}
        
        {ctas && ctas.length > 0 && (
          <div className="hero-ctas">
            {ctas.map((cta, index) => (
              <Button
                key={index}
                variant={cta.variant || 'default'}
                onClick={cta.onClick}
                href={cta.href}
                className={`hero-cta ${cta.className || ''}`}
              >
                {cta.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
