import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import './ReferralTracker.css';

const ReferralTracker = () => {
  const [referralStats, setReferralStats] = useState(null);
  const [referralHistory, setReferralHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      setLoading(true);
      
      // Get user's referral data
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) return;

      // Fetch referral statistics
      const { data: stats } = await supabase
        .from('referral_tracking')
        .select(`
          *,
          referee:referee_id(full_name, email, created_at)
        `)
        .eq('referrer_id', userData.user.id);

      // Fetch referral links
      const { data: links } = await supabase
        .from('referral_links')
        .select('*')
        .eq('user_id', userData.user.id);

      setReferralStats({
        totalReferrals: stats?.length || 0,
        successfulReferrals: stats?.filter(s => s.status === 'completed').length || 0,
        totalCommission: stats?.reduce((sum, s) => sum + parseFloat(s.commission_amount || 0), 0) || 0,
        referralLinks: links || []
      });

      setReferralHistory(stats || []);
      
    } catch (error) {
      console.error('Error fetching referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReferralLink = (type) => {
    const baseUrl = type === 'Professional Zone' 
      ? 'https://ws.i2u.ai/#/Professional-Zone'
      : type === 'Startups'
      ? 'https://ws.i2u.ai/#/Startups'
      : type === 'Mentors'
      ? 'https://ws.i2u.ai/#/Mentors'
      : type === 'Investors'
      ? 'https://ws.i2u.ai/#/Investors'
      : type === 'Enablers'
      ? 'https://ws.i2u.ai/#/Enablers'
      : type === 'Influencers'
      ? 'https://ws.i2u.ai/#/Influencers'
      : type === 'Facilitators'
      ? 'https://ws.i2u.ai/#/Facilitators'
      : 'https://ws.i2u.ai/#/Startups';
    
    return `${baseUrl}?ref=${referralStats?.referralLinks?.find(l => l.referral_type === type)?.referral_code || 'NEW_CODE'}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Referral link copied to clipboard!');
  };

  if (loading) {
    return <div className="referral-loading">Loading referral data...</div>;
  }

  return (
    <div className="referral-tracker">
      <div className="referral-header">
        <h2>🎯 Referral Dashboard</h2>
        <p>Track your referrals and earn commissions</p>
      </div>

      <div className="referral-stats">
        <div className="stat-card">
          <h3>Total Referrals</h3>
          <span className="stat-number">{referralStats?.totalReferrals || 0}</span>
        </div>
        <div className="stat-card">
          <h3>Successful Referrals</h3>
          <span className="stat-number">{referralStats?.successfulReferrals || 0}</span>
        </div>
        <div className="stat-card">
          <h3>Total Commission</h3>
          <span className="stat-number">₹{referralStats?.totalCommission || 0}</span>
        </div>
      </div>

      <div className="referral-links">
        <h3>🔗 Your Referral Links</h3>
        
        <div className="link-cards">
          <div className="link-card">
            <h4>Professional Zone (₹99)</h4>
            <p>Perfect for job seekers and professionals</p>
            <div className="link-display">
              <input 
                type="text" 
                value={generateReferralLink('Professional Zone')} 
                readOnly 
              />
              <button onClick={() => copyToClipboard(generateReferralLink('Professional Zone'))}>
                📋 Copy
              </button>
            </div>
            <div className="link-stats">
              <span>Clicks: {referralStats?.referralLinks?.find(l => l.referral_type === 'Professional Zone')?.click_count || 0}</span>
              <span>Referrals: {referralStats?.referralLinks?.find(l => l.referral_type === 'Professional Zone')?.successful_referrals || 0}</span>
            </div>
          </div>

          <div className="link-card">
            <h4>Startups (₹999)</h4>
            <p>For startup founders and entrepreneurs</p>
            <div className="link-display">
              <input 
                type="text" 
                value={generateReferralLink('Startups')} 
                readOnly 
              />
              <button onClick={() => copyToClipboard(generateReferralLink('Startups'))}>
                📋 Copy
              </button>
            </div>
            <div className="link-stats">
              <span>Clicks: {referralStats?.referralLinks?.find(l => l.referral_type === 'Startups')?.click_count || 0}</span>
              <span>Referrals: {referralStats?.referralLinks?.find(l => l.referral_type === 'Startups')?.successful_referrals || 0}</span>
            </div>
          </div>

          <div className="link-card">
            <h4>Mentors (₹101)</h4>
            <p>For startup mentors and advisors</p>
            <div className="link-display">
              <input 
                type="text" 
                value={generateReferralLink('Mentors')} 
                readOnly 
              />
              <button onClick={() => copyToClipboard(generateReferralLink('Mentors'))}>
                📋 Copy
              </button>
            </div>
            <div className="link-stats">
              <span>Clicks: {referralStats?.referralLinks?.find(l => l.referral_type === 'Mentors')?.click_count || 0}</span>
              <span>Referrals: {referralStats?.referralLinks?.find(l => l.referral_type === 'Mentors')?.successful_referrals || 0}</span>
            </div>
          </div>

          <div className="link-card">
            <h4>Investors (₹101)</h4>
            <p>For angel investors and VCs</p>
            <div className="link-display">
              <input 
                type="text" 
                value={generateReferralLink('Investors')} 
                readOnly 
              />
              <button onClick={() => copyToClipboard(generateReferralLink('Investors'))}>
                📋 Copy
              </button>
            </div>
            <div className="link-stats">
              <span>Clicks: {referralStats?.referralLinks?.find(l => l.referral_type === 'Investors')?.click_count || 0}</span>
              <span>Referrals: {referralStats?.referralLinks?.find(l => l.referral_type === 'Investors')?.successful_referrals || 0}</span>
            </div>
          </div>

          <div className="link-card">
            <h4>Enablers (₹101)</h4>
            <p>For incubators and accelerators</p>
            <div className="link-display">
              <input 
                type="text" 
                value={generateReferralLink('Enablers')} 
                readOnly 
              />
              <button onClick={() => copyToClipboard(generateReferralLink('Enablers'))}>
                📋 Copy
              </button>
            </div>
            <div className="link-stats">
              <span>Clicks: {referralStats?.referralLinks?.find(l => l.referral_type === 'Enablers')?.click_count || 0}</span>
              <span>Referrals: {referralStats?.referralLinks?.find(l => l.referral_type === 'Enablers')?.successful_referrals || 0}</span>
            </div>
          </div>

          <div className="link-card">
            <h4>Influencers (₹101)</h4>
            <p>For content creators and influencers</p>
            <div className="link-display">
              <input 
                type="text" 
                value={generateReferralLink('Influencers')} 
                readOnly 
              />
              <button onClick={() => copyToClipboard(generateReferralLink('Influencers'))}>
                📋 Copy
              </button>
            </div>
            <div className="link-stats">
              <span>Clicks: {referralStats?.referralLinks?.find(l => l.referral_type === 'Influencers')?.click_count || 0}</span>
              <span>Referrals: {referralStats?.referralLinks?.find(l => l.referral_type === 'Influencers')?.successful_referrals || 0}</span>
            </div>
          </div>

          <div className="link-card">
            <h4>Facilitators (₹101)</h4>
            <p>For workshop facilitators and consultants</p>
            <div className="link-display">
              <input 
                type="text" 
                value={generateReferralLink('Facilitators')} 
                readOnly 
              />
              <button onClick={() => copyToClipboard(generateReferralLink('Facilitators'))}>
                📋 Copy
              </button>
            </div>
            <div className="link-stats">
              <span>Clicks: {referralStats?.referralLinks?.find(l => l.referral_type === 'Facilitators')?.click_count || 0}</span>
              <span>Referrals: {referralStats?.referralLinks?.find(l => l.referral_type === 'Facilitators')?.successful_referrals || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="referral-history">
        <h3>📊 Referral History</h3>
        {referralHistory.length === 0 ? (
          <p className="no-referrals">No referrals yet. Start sharing your links!</p>
        ) : (
          <div className="history-list">
            {referralHistory.map((referral) => (
              <div key={referral.id} className="history-item">
                <div className="referral-info">
                  <h4>{referral.referee?.full_name || 'Unknown User'}</h4>
                  <p>{referral.referee?.email}</p>
                  <p>Type: {referral.referral_type}</p>
                  <p>Amount: ₹{referral.amount}</p>
                </div>
                <div className="referral-status">
                  <span className={`status-badge ${referral.status}`}>
                    {referral.status}
                  </span>
                  <p>Commission: ₹{referral.commission_amount}</p>
                  <p>{referral.commission_percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralTracker;
