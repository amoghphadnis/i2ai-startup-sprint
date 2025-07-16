import React, { useState } from 'react';
import WebContentFetcher from './WebContentFetcher';
import './TermsAndPrivacy.css';

const TermsAndPrivacy = () => {
  const [activeTab, setActiveTab] = useState('terms');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="terms-and-privacy-container">
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'terms' ? 'active' : ''}`}
          onClick={() => handleTabChange('terms')}
        >
          Terms & Conditions
        </button>
        <button 
          className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => handleTabChange('privacy')}
        >
          Privacy Policy
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'terms' && (
          <WebContentFetcher 
            url="https://i2u.ai/TermsNConditions/"
            title="Terms & Conditions"
          />
        )}
        {activeTab === 'privacy' && (
          <WebContentFetcher 
            url="https://i2u.ai/PrivacyPolicy/"
            title="Privacy Policy"
          />
        )}
      </div>
    </div>
  );
};

export default TermsAndPrivacy;

