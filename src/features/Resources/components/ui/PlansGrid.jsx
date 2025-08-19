import React from 'react';
import PlanCard from './PlanCard';
import './PlansGrid.css';

const PlansGrid = ({ plans = [], onChoose, className = '', title = "Subscription Plans", description = "Choose from our comprehensive range of plans designed to accelerate your growth." }) => {
  const handleChoose = (plan) => {
    if (onChoose) {
      onChoose(plan);
    }
  };

  return (
    <div className={`plans-section ${className}`}>
      {/* Section Header */}
      <div className="plans-header">
        <h2 className="plans-title">
          🌟 {title}
        </h2>
        <div className="plans-description">
          <p>{description}</p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="plans-grid">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan}
            onChoose={handleChoose}
          />
        ))}
      </div>

      {/* Plans Notice */}
      <div className="plans-notice">
        <p>
          🌟 <strong>Your journey with us doesn't stop here!</strong> Discover
          even more features tailored to elevate your experience.
        </p>
      </div>
    </div>
  );
};

export default PlansGrid;
