import React from 'react';
import { Button } from '@/components/ui/button';
import './PlanCard.css';

const PlanCard = ({ plan, onChoose, className = '' }) => {
  const {
    name,
    price,
    period,
    description,
    features,
    cta,
    popular = false,
    gradient = 'blue',
    specialOffer
  } = plan;

  const handleChoose = () => {
    if (onChoose) {
      onChoose(plan);
    }
  };

  return (
    <div className={`plan-card ${popular ? 'popular' : ''} ${className}`}>
      {popular && (
        <div className="popular-badge">Most Popular</div>
      )}
      
      {specialOffer && (
        <div className="special-offer-badge">{specialOffer}</div>
      )}
      
      <div className="plan-header">
        <h3 className="plan-name">{name}</h3>
        <div className="plan-price">
          <span className="price-amount">{price}</span>
          <span className="price-period">{period}</span>
        </div>
        <p className="plan-description">{description}</p>
      </div>
      
      <div className="plan-features">
        <ul className="features-list">
          {features.map((feature, index) => (
            <li key={index} className="feature-item">
              <span className="feature-icon">✓</span>
              <span className="feature-text">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="plan-cta">
        <Button
          onClick={handleChoose}
          className={`cta-button ${gradient}`}
          variant="default"
        >
          {cta}
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;
