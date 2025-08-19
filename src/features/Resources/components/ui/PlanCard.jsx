import React from 'react';
import Button from '../../../../components/Button';
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
      
      {/* Plan Header - Plan Name Only */}
      <div className="plan-header">
        <h3 className="plan-name">{name}</h3>
      </div>
      
      {/* Price Section with Gradient Background */}
      <div className={`plan-price-section plan-price-${gradient}`}>
        <div className="plan-price">
          <span className="price-amount">{price}</span>
          <span className="price-period">{period}</span>
        </div>
        <p className="plan-description">{description}</p>
      </div>
      
      {/* Features Section */}
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
      
      {/* Special Offer Section */}
      {specialOffer && (
        <div className={`plan-offer plan-offer-${gradient}`}>
          <span>{specialOffer}</span>
        </div>
      )}
      
      {/* Call to Action */}
      <div className="plan-cta">
        <Button
          onClick={handleChoose}
          className="cta-button"
          variant="outline"
        >
          {cta}
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;
