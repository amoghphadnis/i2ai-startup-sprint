import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import './ReferralGenerator.css';

const ReferralGenerator = () => {
  const [referralType, setReferralType] = useState('Professional Zone');
  const [quantity, setQuantity] = useState(10);
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && (user.email === 'admin@12u.ai' || user.email === 'amoghi2uai@gmail.com')) {
        setIsAuthenticated(true);
      } else {
        setMessage('❌ Access denied. Admin authentication required.');
      }
    };
    checkAuth();
  }, []);

  const generateReferralCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    // Add prefix based on type
    if (referralType === 'Professional Zone') {
      result += 'p';
    } else if (referralType === 'Startups') {
      result += 's';
    } else if (referralType === 'Mentors') {
      result += 'm';
    } else if (referralType === 'Investors') {
      result += 'i';
    } else if (referralType === 'Enablers') {
      result += 'e';
    } else if (referralType === 'Influencers') {
      result += 'n';
    } else if (referralType === 'Facilitators') {
      result += 'f';
    } else {
      result += 'r';
    }
    
    // Generate random string
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
  };

  const generateReferralCodes = async () => {
    if (!isAuthenticated) {
      setMessage('❌ Admin authentication required');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Generate referral codes
      const codes = [];
      for (let i = 0; i < quantity; i++) {
        const referralCode = generateReferralCode();
        codes.push({
          referral_code: referralCode,
          referral_type: referralType,
          is_active: true
        });
      }

      console.log('Attempting to insert codes:', codes);

      // Insert codes into database
      const { data, error } = await supabase
        .from('referral_links')
        .insert(codes)
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      // Generate display URLs for the UI
      const displayCodes = data.map((code, index) => ({
        id: index + 1,
        ...code,
        url_professional: `https://ws.i2u.ai/#/Professional-Zone?ref=${code.referral_code}`,
        url_startups: `https://ws.i2u.ai/#/Startups?ref=${code.referral_code}`,
        url_mentors: `https://ws.i2u.ai/#/Mentors?ref=${code.referral_code}`,
        url_investors: `https://ws.i2u.ai/#/Investors?ref=${code.referral_code}`,
        url_enablers: `https://ws.i2u.ai/#/Enablers?ref=${code.referral_code}`,
        url_influencers: `https://ws.i2u.ai/#/Influencers?ref=${code.referral_code}`,
        url_facilitators: `https://ws.i2u.ai/#/Facilitators?ref=${code.referral_code}`
      }));

      setGeneratedCodes(displayCodes);
      setMessage(`✅ Successfully generated ${quantity} referral code${quantity > 1 ? 's' : ''} for ${referralType}`);
      setTimeout(() => setMessage(null), 5000);
      
    } catch (error) {
      console.error('Error generating codes:', error);
      setMessage(`❌ Error: ${error.message}`);
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Referral code copied to clipboard!');
  };

  const copyAllCodes = () => {
    const allCodes = generatedCodes.map(code => code.referral_code).join('\n');
    navigator.clipboard.writeText(allCodes);
    alert('All referral codes copied to clipboard!');
  };

  return (
    <div className="referral-generator">
      <h2>🎯 Generate Referral Codes</h2>
      <p>Create referral codes for different pages and track user referrals</p>
      
      <div className="generator-form">
        <div className="form-group">
          <label htmlFor="referralType">Referral Type:</label>
          <select 
            id="referralType" 
            value={referralType} 
            onChange={(e) => setReferralType(e.target.value)}
            disabled={!isAuthenticated}
          >
            <option value="Professional Zone">Professional Zone (₹99)</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="100"
            disabled={!isAuthenticated}
          />
        </div>

        <button
          className="generate-btn"
          onClick={generateReferralCodes}
          disabled={loading || !isAuthenticated}
        >
          {loading ? 'Generating...' : 'Generate Codes'}
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {generatedCodes.length > 0 && (
        <div className="generated-codes">
          <div className="codes-header">
            <h3>🎯 Generated Referral Codes</h3>
            <button className="copy-all-btn" onClick={copyAllCodes}>
              📋 Copy All
            </button>
          </div>
          
          <div className="codes-grid">
            {generatedCodes.map((code) => (
              <div key={code.id} className="code-card">
                <div className="code-display">
                  <span className="code-text">{code.referral_code}</span>
                  <button
                    className="copy-btn"
                    onClick={() => copyToClipboard(code.referral_code)}
                    title="Copy code"
                  >
                    📋
                  </button>
                </div>
                <div className="code-info">
                  <span className="code-type">{code.referral_type}</span>
                  <span className="code-status active">Active</span>
                </div>
                <div className="code-url">
                  <div className="url-section">
                    <strong>Professional Zone (₹99):</strong>
                    <small>{code.url_professional}</small>
                  </div>
                  <div className="url-section">
                    <strong>Startups (₹999):</strong>
                    <small>{code.url_startups}</small>
                  </div>
                  <div className="url-section">
                    <strong>Mentors (₹101):</strong>
                    <small>{code.url_mentors}</small>
                  </div>
                  <div className="url-section">
                    <strong>Investors (₹101):</strong>
                    <small>{code.url_investors}</small>
                  </div>
                  <div className="url-section">
                    <strong>Enablers (₹101):</strong>
                    <small>{code.url_enablers}</small>
                  </div>
                  <div className="url-section">
                    <strong>Influencers (₹101):</strong>
                    <small>{code.url_influencers}</small>
                  </div>
                  <div className="url-section">
                    <strong>Facilitators (₹101):</strong>
                    <small>{code.url_facilitators}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralGenerator;
