import React from 'react';
import PlanCard from './PlanCard';
import './PlansGrid.css';

const PlansGrid = ({ plans = [], onChoose, className = '' }) => {
  const handleChoose = (plan) => {
    if (onChoose) {
      onChoose(plan);
    }
  };

  return (
    <div className={`plans-grid ${className}`}>
      {plans.map((plan, index) => (
        <PlanCard
          key={index}
          plan={plan}
          onChoose={handleChoose}
        />
      ))}
    </div>
  );
};

export default PlansGrid;
