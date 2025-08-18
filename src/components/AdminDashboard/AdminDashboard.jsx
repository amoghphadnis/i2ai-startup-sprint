import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ReferralGenerator from '../ReferralSystem/ReferralGenerator';
import UserCategoryAnalytics from '../UserCategoryAnalytics';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Admin user UUID
  const ADMIN_UUID = '33b9adca-edca-4178-8dc4-4f85778909f1';
  
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('registrations');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [verifying, setVerifying] = useState(false);

  // Check if admin is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && (user.email === 'admin@12u.ai' || user.email === 'amoghi2uai@gmail.com')) {
        setIsAuthenticated(true);
        fetchRegistrations();
      }
    };
    checkAuth();
  }, []);

  // Admin authentication
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword
      });

      if (error) throw error;

      if (data.user && (data.user.email === 'admin@12u.ai' || data.user.email === 'amoghi2uai@gmail.com')) {
        setIsAuthenticated(true);
        fetchRegistrations();
      } else {
        setAuthError('Access denied. Admin privileges required.');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  // Admin signup (for first time setup)
  const handleAdminSignup = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
        options: {
          data: {
            role: 'admin'
          }
        }
      });

      if (error) throw error;

      if (data.user && (data.user.email === 'admin@12u.ai' || data.user.email === 'amoghi2uai@gmail.com')) {
        setAuthError('✅ Admin account created! Please check your email to confirm and then sign in.');
      } else {
        setAuthError('Access denied. Only admin@12u.ai or amoghi2uai@gmail.com can be created as admin users.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  // Admin logout
  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setRegistrations([]);
  };

  // Fetch registrations
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          payment_transactions (
            transaction_id,
            upi_id,
            payment_status,
            admin_notes
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
        return;
      }

      // Check for new registrations
      if (registrations.length > 0 && data && data.length > registrations.length) {
        const newCount = data.length - registrations.length;
        setNotification(`🆕 ${newCount} new registration${newCount > 1 ? 's' : ''} detected!`);
        setTimeout(() => setNotification(null), 5000); // Auto-hide after 5 seconds
      }

      setRegistrations(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh registrations every 10 seconds
  useEffect(() => {
    fetchRegistrations();
    
    const interval = setInterval(() => {
      fetchRegistrations();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle verification/rejection
  const handleVerification = async (registrationId, status, adminNotes = '') => {
    try {
      console.log('🔍 Starting verification process for registration:', registrationId);
      console.log('Status:', status, 'Notes:', adminNotes);
      
      setLoading(true);
      
      // Update registration status
      console.log('📝 Updating registration status...');
      const { error: regError } = await supabase
        .from('registrations')
        .update({ 
          registration_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', registrationId);

      if (regError) {
        console.error('❌ Error updating registration status:', regError);
        throw regError;
      }
      console.log('✅ Registration status updated successfully');

      // Update payment transaction status
      console.log('💰 Updating payment transaction status...');
      const { error: payError } = await supabase
        .from('payment_transactions')
        .update({ 
          payment_status: status === 'verified' ? 'verified' : 'rejected',
          admin_notes: adminNotes,
          verified_by: ADMIN_UUID, // Admin UUID
          verified_at: new Date().toISOString()
        })
        .eq('registration_id', registrationId);

      if (payError) {
        console.error('❌ Error updating payment transaction:', payError);
        throw payError;
      }
      console.log('✅ Payment transaction status updated successfully');

      // Create status history entry
      console.log('📚 Creating status history entry...');
      const { error: historyError } = await supabase
        .from('registration_status_history')
        .insert([{
          registration_id: registrationId,
          old_status: 'pending',
          new_status: status,
          changed_by: ADMIN_UUID, // Admin UUID
          notes: adminNotes || `Status changed to ${status} by admin`
        }]);

      if (historyError) {
        console.error('❌ Error creating status history:', historyError);
        throw historyError;
      }
      console.log('✅ Status history created successfully');

      // Log admin action
      console.log('📋 Logging admin action...');
      const { error: actionError } = await supabase
        .from('admin_actions')
        .insert([{
          admin_id: ADMIN_UUID, // Admin UUID
          action_type: `verification_${status}`,
          target_table: 'registrations',
          target_id: registrationId,
          old_values: { status: 'pending' },
          new_values: { status: status, admin_notes: adminNotes },
          notes: `Admin ${status} registration for ${registrationId}`
        }]);

      if (actionError) {
        console.error('❌ Error logging admin action:', actionError);
        throw actionError;
      }
      console.log('✅ Admin action logged successfully');

      // Handle referral tracking if verification is successful
      if (status === 'verified') {
        console.log('🎯 Starting referral tracking...');
        await handleReferralTracking(registrationId, status);
      }

      // Refresh registrations
      console.log('🔄 Refreshing registrations data...');
      await fetchRegistrations();
      
      console.log('🎉 Verification process completed successfully!');
      
    } catch (error) {
      console.error('❌ Error during verification process:', error);
      alert(`Verification failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle referral tracking and commission calculation
  const handleReferralTracking = async (registrationId, status) => {
    console.log('🔍 Starting referral tracking for registration:', registrationId);
    
    try {
      const registration = registrations.find(r => r.id === registrationId);
      console.log('📊 Found registration:', registration);
      
      if (!registration) {
        console.log('❌ No registration found');
        return;
      }
      
      if (!registration.referral_used_code) {
        console.log('❌ No referral code found in registration');
        console.log('Registration referral fields:', {
          referral_code: registration.referral_code,
          referral_used_code: registration.referral_used_code
        });
        return;
      }

      console.log('🎯 Referral code found:', registration.referral_used_code);
      
      const { data: referralLink, error: referralError } = await supabase
        .from('referral_links')
        .select('*')
        .eq('referral_code', registration.referral_used_code)
        .single();

      if (referralError) {
        console.error('❌ Error fetching referral link:', referralError);
        return;
      }
      
      if (!referralLink) {
        console.log('❌ No referral link found for code:', registration.referral_used_code);
        return;
      }

      console.log('✅ Referral link found:', referralLink);

      let commissionPercentage = 0;
      let commissionAmount = 0;
      let referralType = '';

      // Determine referral type and commission based on amount
      if (registration.amount === 99) { // Professional Zone
        referralType = 'Professional Zone';
        console.log('💰 Processing Professional Zone referral (₹99)');
        const { data: referrerStats, error: statsError } = await supabase
          .from('referral_tracking')
          .select('*')
          .eq('referrer_id', referralLink.user_id)
          .eq('referral_type', 'Professional Zone')
          .eq('status', 'completed');
          
        if (statsError) {
          console.error('❌ Error fetching referrer stats:', statsError);
          return;
        }
        
        const totalReferrals = referrerStats?.length || 0;
        console.log('📈 Total completed referrals for this user:', totalReferrals);
        
        if (totalReferrals < 1000) commissionPercentage = 100;
        else if (totalReferrals < 2001) commissionPercentage = 60;
        else commissionPercentage = 40;
        
        console.log(`🎯 Commission tier: ${commissionPercentage}%`);
      } else if (registration.amount === 999) { // Startups (formerly Resources)
        referralType = 'Startups';
        console.log('💰 Processing Startups referral (₹999)');
        const { data: referrerStats, error: statsError } = await supabase
          .from('referral_tracking')
          .select('*')
          .eq('referrer_id', referralLink.user_id)
          .eq('referral_type', 'Startups')
          .eq('status', 'completed');
          
        if (statsError) {
          console.error('❌ Error fetching referrer stats:', statsError);
          return;
        }
        
        const totalReferrals = referrerStats?.length || 0;
        console.log('📈 Total completed referrals for this user:', totalReferrals);
        
        if (totalReferrals < 100) commissionPercentage = 100;
        else if (totalReferrals < 201) commissionPercentage = 60;
        else commissionPercentage = 40;
        
        console.log(`🎯 Commission tier: ${commissionPercentage}%`);
      } else if (registration.amount === 101) { // New pages (Mentors, Investors, Enablers, Influencers, Facilitators)
        // Determine specific type based on referral link type
        referralType = referralLink.referral_type || 'New Page';
        console.log(`💰 Processing ${referralType} referral (₹101)`);
        
        const { data: referrerStats, error: statsError } = await supabase
          .from('referral_tracking')
          .select('*')
          .eq('referrer_id', referralLink.user_id)
          .eq('referral_type', referralType)
          .eq('status', 'completed');
          
        if (statsError) {
          console.error('❌ Error fetching referrer stats:', statsError);
          return;
        }
        
        const totalReferrals = referrerStats?.length || 0;
        console.log(`📈 Total completed ${referralType} referrals for this user:`, totalReferrals);
        
        // Commission structure for new pages (₹101)
        if (totalReferrals < 500) commissionPercentage = 100;
        else if (totalReferrals < 1001) commissionPercentage = 80;
        else if (totalReferrals < 2001) commissionPercentage = 60;
        else commissionPercentage = 40;
        
        console.log(`🎯 Commission tier: ${commissionPercentage}%`);
      }
      
      commissionAmount = (registration.amount * commissionPercentage) / 100;
      console.log(`💵 Commission calculated: ₹${commissionAmount} (${commissionPercentage}%)`);

      console.log('📝 Creating referral tracking entry...');
      const { data: trackingData, error: trackingError } = await supabase
        .from('referral_tracking')
        .insert([{
          referrer_id: referralLink.user_id,
          referee_id: registration.user_profile_id,
          referral_code: registration.referral_used_code,
          referral_type: referralType,
          amount: registration.amount,
          commission_amount: commissionAmount,
          commission_percentage: commissionPercentage,
          status: 'completed',
          completed_at: new Date().toISOString()
        }])
        .select();

      if (trackingError) {
        console.error('❌ Error creating referral tracking:', trackingError);
        return;
      }

      console.log('✅ Referral tracking entry created:', trackingData);

      console.log('📊 Updating referral link statistics...');
      const { error: updateError } = await supabase
        .from('referral_links')
        .update({
          successful_referrals: (referralLink.successful_referrals || 0) + 1,
          total_commission: (referralLink.total_commission || 0) + commissionAmount
        })
        .eq('id', referralLink.id);
      
      if (updateError) {
        console.error('❌ Error updating referral link stats:', updateError);
        return;
      }

      console.log('✅ Referral link statistics updated');
      console.log(`🎉 Referral tracking completed: ${commissionPercentage}% commission (₹${commissionAmount})`);
      
    } catch (error) {
      console.error('❌ Error handling referral tracking:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'verified': return '#27ae60';
      case 'rejected': return '#e74c3c';
      case 'completed': return '#3498db';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="admin-dashboard">
      {!isAuthenticated ? (
        <div className="admin-auth">
          <div className="auth-container">
            <h2>🔐 Admin Authentication</h2>
            <p>Please sign in to access the admin dashboard</p>
            
            <form onSubmit={handleAdminLogin} className="auth-form">
              <div className="form-group">
                <label htmlFor="adminEmail">Admin Email:</label>
                <input
                  type="email"
                  id="adminEmail"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@12u.ai"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="adminPassword">Password:</label>
                <input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              
              {authError && (
                <div className={`message ${authError.includes('✅') ? 'success' : 'error'}`}>
                  {authError}
                </div>
              )}
              
              <div className="auth-buttons">
                <button 
                  type="submit" 
                  className="auth-btn primary"
                  disabled={authLoading}
                >
                  {authLoading ? 'Signing In...' : 'Sign In'}
                </button>
                
                <button 
                  type="button" 
                  className="auth-btn secondary"
                  onClick={handleAdminSignup}
                  disabled={authLoading}
                >
                  {authLoading ? 'Creating Account...' : 'Create Admin Account'}
                </button>
              </div>
              
              <div className="auth-note">
                <p><strong>First time setup?</strong></p>
                <p>Use "Create Admin Account" to set up the admin user, then sign in.</p>
                <p><small>Only admin@12u.ai or amoghi2uai@gmail.com can be created as admin users.</small></p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="dashboard-header">
            <h1>Admin Dashboard</h1>
            <div className="header-actions">
              <button 
                onClick={fetchRegistrations} 
                className="refresh-btn"
                disabled={loading}
              >
                {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
              </button>
              <button onClick={handleAdminLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>

          {notification && (
            <div className="notification success">
              {notification}
            </div>
          )}

          <div className="admin-tabs">
            <button
              className={`tab-button ${activeTab === 'registrations' ? 'active' : ''}`}
              onClick={() => setActiveTab('registrations')}
            >
              📋 Registrations
            </button>
            <button
              className={`tab-button ${activeTab === 'referral-generator' ? 'active' : ''}`}
              onClick={() => setActiveTab('referral-generator')}
            >
              🔑 Referral Generator
            </button>
            <button
              className={`tab-button ${activeTab === 'category-analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('category-analytics')}
            >
              📊 Category Analytics
            </button>
            <button
              className={`tab-button ${activeTab === 'referral-analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('referral-analytics')}
            >
              🎯 Referral Analytics
            </button>
          </div>

          {activeTab === 'registrations' && (
            <div className="registrations-section">
              {/* Statistics Section */}
              <div className="admin-stats">
                <div className="stat-card">
                  <h3>Total Registrations</h3>
                  <span className="stat-number">{registrations.length}</span>
                </div>
                <div className="stat-card">
                  <h3>Pending Verification</h3>
                  <span className="stat-number">
                    {registrations.filter(r => r.registration_status === 'pending').length}
                  </span>
                </div>
                <div className="stat-card">
                  <h3>Verified</h3>
                  <span className="stat-number">
                    {registrations.filter(r => r.registration_status === 'verified').length}
                  </span>
                </div>
                <div className="stat-card">
                  <h3>Rejected</h3>
                  <span className="stat-number">
                    {registrations.filter(r => r.registration_status === 'rejected').length}
                  </span>
                </div>
              </div>

              <h2>📋 All Registrations</h2>
              {loading ? (
                <div className="loading">Loading registrations...</div>
              ) : registrations.length === 0 ? (
                <div className="no-registrations">No pending registrations found.</div>
              ) : (
                <div className="registrations-grid">
                  {registrations.map((registration) => (
                    <div key={registration.id} className="registration-card">
                      <div className="registration-header">
                        <h3>{registration.full_name}</h3>
                        <span className={`status ${registration.registration_status}`}>
                          {registration.registration_status}
                        </span>
                      </div>
                      
                      <div className="registration-details">
                        <p><strong>Email:</strong> {registration.email}</p>
                        <p><strong>Phone:</strong> {registration.phone_number}</p>
                        <p><strong>Amount:</strong> ₹{registration.amount}</p>
                        <p><strong>Date:</strong> {new Date(registration.created_at).toLocaleDateString()}</p>
                        {registration.user_category && (
                          <p><strong>Category:</strong> {registration.user_category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                        )}
                        {registration.referral_used_code && (
                          <p><strong>Referral Code:</strong> {registration.referral_used_code}</p>
                        )}
                      </div>

                      {registration.payment_transactions && registration.payment_transactions.length > 0 && (
                        <div className="payment-details">
                          <h4>Payment Information</h4>
                          <p><strong>Transaction ID:</strong> {registration.payment_transactions[0].transaction_id}</p>
                          <p><strong>UPI ID:</strong> {registration.payment_transactions[0].upi_id}</p>
                          <p><strong>Status:</strong> {registration.payment_transactions[0].payment_status}</p>
                        </div>
                      )}

                      {registration.registration_status === 'pending' && (
                        <div className="verification-actions">
                          <textarea
                            placeholder="Add admin notes (optional)"
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                            className="admin-notes"
                          />
                          <div className="action-buttons">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleVerification(registration.id, 'verified', adminNotes);
                              }}
                              className="verify-btn"
                              disabled={loading}
                            >
                              ✅ Verify Payment
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleVerification(registration.id, 'rejected', adminNotes);
                              }}
                              className="reject-btn"
                              disabled={loading}
                            >
                              ❌ Reject
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'referral-generator' && (
            <ReferralGenerator />
          )}

          {activeTab === 'category-analytics' && (
            <UserCategoryAnalytics />
          )}

          {activeTab === 'referral-analytics' && (
            <div className="referral-analytics-section">
              <h2>🎯 Referral Analytics Dashboard</h2>
              <p>Comprehensive tracking and analytics for all referral types</p>
              
              <div className="referral-overview">
                <h3>📊 Referral Overview</h3>
                <div className="referral-stats-grid">
                  <div className="referral-stat-card">
                    <h4>Total Referral Links</h4>
                    <span className="stat-number">0</span>
                    <p>Active referral codes</p>
                  </div>
                  <div className="referral-stat-card">
                    <h4>Total Clicks</h4>
                    <span className="stat-number">0</span>
                    <p>Across all referral types</p>
                  </div>
                  <div className="referral-stat-card">
                    <h4>Total Referrals</h4>
                    <span className="stat-number">0</span>
                    <p>Successful conversions</p>
                  </div>
                  <div className="referral-stat-card">
                    <h4>Total Commission</h4>
                    <span className="stat-number">₹0</span>
                    <p>Paid to referrers</p>
                  </div>
                </div>
              </div>

              <div className="referral-type-breakdown">
                <h3>📈 Referral Type Breakdown</h3>
                <div className="referral-type-cards">
                  <div className="referral-type-card">
                    <h4>Professional Zone (₹99)</h4>
                    <div className="type-stats">
                      <span>Clicks: 0</span>
                      <span>Referrals: 0</span>
                      <span>Commission: ₹0</span>
                    </div>
                  </div>
                  <div className="referral-type-card">
                    <h4>Startups (₹999)</h4>
                    <div className="type-stats">
                      <span>Clicks: 0</span>
                      <span>Referrals: 0</span>
                      <span>Commission: ₹0</span>
                    </div>
                  </div>
                  <div className="referral-type-card">
                    <h4>Mentors (₹101)</h4>
                    <div className="type-stats">
                      <span>Clicks: 0</span>
                      <span>Referrals: 0</span>
                      <span>Commission: ₹0</span>
                    </div>
                  </div>
                  <div className="referral-type-card">
                    <h4>Investors (₹101)</h4>
                    <div className="type-stats">
                      <span>Clicks: 0</span>
                      <span>Referrals: 0</span>
                      <span>Commission: ₹0</span>
                    </div>
                  </div>
                  <div className="referral-type-card">
                    <h4>Enablers (₹101)</h4>
                    <div className="type-stats">
                      <span>Clicks: 0</span>
                      <span>Referrals: 0</span>
                      <span>Commission: ₹0</span>
                    </div>
                  </div>
                  <div className="referral-type-card">
                    <h4>Influencers (₹101)</h4>
                    <div className="type-stats">
                      <span>Clicks: 0</span>
                      <span>Referrals: 0</span>
                      <span>Commission: ₹0</span>
                    </div>
                  </div>
                  <div className="referral-type-card">
                    <h4>Facilitators (₹101)</h4>
                    <div className="type-stats">
                      <span>Clicks: 0</span>
                      <span>Referrals: 0</span>
                      <span>Commission: ₹0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="referral-performance">
                <h3>🚀 Top Performing Referrers</h3>
                <div className="performance-list">
                  <p className="no-data">No referral data available yet. Start generating referral codes and tracking referrals!</p>
                </div>
              </div>

              <div className="referral-insights">
                <h3>💡 Referral Insights</h3>
                <div className="insights-grid">
                  <div className="insight-card">
                    <h4>Conversion Rate</h4>
                    <p>0%</p>
                    <small>Click to referral conversion</small>
                  </div>
                  <div className="insight-card">
                    <h4>Average Commission</h4>
                    <p>₹0</p>
                    <small>Per successful referral</small>
                  </div>
                  <div className="insight-card">
                    <h4>Most Active Type</h4>
                    <p>None</p>
                    <small>Highest click volume</small>
                  </div>
                  <div className="insight-card">
                    <h4>Revenue Generated</h4>
                    <p>₹0</p>
                    <small>Total from referrals</small>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;