import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { supabase } from '../../lib/supabase';
import './GooglePayPayment.css';

const GooglePayPayment = ({ amount = 99, displayText = {} }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    transactionId: '',
    userCategory: ''
  });
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [referralCode, setReferralCode] = useState(null);
  const [referrerInfo, setReferrerInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState('');
  const [pageUserCategory, setPageUserCategory] = useState('');
  const canvasRef = useRef(null);

  // Google Pay UPI ID
  const upiId = 'girishbh-1@okaxis';
  
  // Page to user category mapping
  const pageCategoryMapping = {
    '/Professional-Zone': 'professional',
    '/Startups': 'startup-founder', // Backend value, UI will show "Startup Leader"
    '/Mentors': 'mentor',
    '/Investors': 'investor',
    '/Enablers': 'enabler',
    '/Influencers': 'influencer',
    '/Facilitators': 'facilitator',
    '/': 'startup-founder' // Homepage defaults to startup-founder (shows as "Startup Leader" in UI)
  };

  // Get current page and set default user category
  useEffect(() => {
    const detectCurrentPage = () => {
      console.log('🔍 Detecting current page...');
      console.log('Current URL:', window.location.href);
      console.log('Hash:', window.location.hash);
      
      let currentPagePath = '';
      
      // Handle hash routing (e.g., #/Mentors, #/Startups)
      if (window.location.hash) {
        currentPagePath = window.location.hash.replace('#', '');
        console.log('Detected page from hash:', currentPagePath);
      }
      
      // Handle regular routing if no hash
      if (!currentPagePath) {
        currentPagePath = window.location.pathname;
        console.log('Detected page from pathname:', currentPagePath);
      }
      
      setCurrentPage(currentPagePath);
      
      // Map page to user category
      const userCategory = pageCategoryMapping[currentPagePath];
      if (userCategory) {
        console.log('🎯 Mapped page to user category:', currentPagePath, '→', userCategory);
        setPageUserCategory(userCategory);
        
        // Set the default user category in form data
        setFormData(prev => ({
          ...prev,
          userCategory: userCategory
        }));
      } else {
        console.log('⚠️ No mapping found for page:', currentPagePath);
        // Default to startup-leader if no mapping found (instead of professional)
        setFormData(prev => ({
          ...prev,
          userCategory: 'startup-founder' // Changed default to startup-founder
        }));
      }
    };

    detectCurrentPage();
  }, []);

  // Get referral code from URL if present
  useEffect(() => {
    console.log('🔍 Checking for referral code in URL...');
    console.log('Current URL:', window.location.href);
    console.log('Hash:', window.location.hash);
    console.log('Search:', window.location.search);
    
    // Handle both hash routing and regular query parameters
    let ref = null;
    
    // Check hash routing first (e.g., #/Professional-Zone?ref=code)
    if (window.location.hash && window.location.hash.includes('?')) {
      const hashParts = window.location.hash.split('?');
      const hashParams = new URLSearchParams(hashParts[1]);
      ref = hashParams.get('ref');
      console.log('Found ref in hash routing:', ref);
    }
    
    // Fallback to regular query parameters
    if (!ref) {
      const urlParams = new URLSearchParams(window.location.search);
      ref = urlParams.get('ref');
      console.log('Found ref in query params:', ref);
    }
    
    // Additional check for hash fragments that might contain ref
    if (!ref && window.location.hash.includes('ref=')) {
      const hashFragment = window.location.hash.split('ref=')[1];
      if (hashFragment) {
        ref = hashFragment.split('&')[0]; // Get the ref value before any & symbols
        console.log('Found ref in hash fragment:', ref);
      }
    }
    
    if (ref) {
      console.log('🎯 Referral code detected in URL:', ref);
      validateReferralCode(ref);
    } else {
      console.log('No referral code found in URL');
      console.log('💡 Try using: http://localhost:5173/#/Professional-Zone?ref=YOUR_CODE');
    }
  }, []);

  // Add this function to validate referral codes
  const validateReferralCode = async (referralCode) => {
    console.log('🔍 Validating referral code:', referralCode);
    try {
      console.log('📡 Querying Supabase for referral code...');
      const { data, error } = await supabase
        .from('referral_links')
        .select('*')
        .eq('referral_code', referralCode)
        .eq('is_active', true)
        .single();

      console.log('📊 Supabase response:', { data, error });
      if (error || !data) {
        console.warn('❌ Invalid or inactive referral code:', referralCode, error);
        return;
      }

      console.log('✅ Valid referral code found:', data);
      setReferralCode(referralCode);
      
      // Store referrer information (using available fields)
      setReferrerInfo({
        referralType: data.referral_type,
        referralCode: data.referral_code
      });
      
      console.log('📈 Updating click count...');
      const { error: updateError } = await supabase
        .from('referral_links')
        .update({ click_count: (data.click_count || 0) + 1 })
        .eq('id', data.id);
      
      if (updateError) {
        console.error('❌ Error updating click count:', updateError);
      } else {
        console.log('✅ Click count updated successfully');
      }
      
    } catch (error) {
      console.error('❌ Error validating referral code:', error);
    }
  };

  // Default display text if not provided
  const defaultDisplayText = {
    heading: `🎯 Register Now – ₹${amount} Today, Value for a Lifetime`,
    subheading: `The registration fee is just ₹${amount}, but it will increase to ₹${amount * 2} after the first 1,000 registrations. Act now to secure your spot and maximize your reward.`
  };

  // Use provided displayText or fall back to defaults
  const finalDisplayText = {
    heading: displayText.heading || defaultDisplayText.heading,
    subheading: displayText.subheading || defaultDisplayText.subheading
  };

  // Generate UPI QR Code data and image
  useEffect(() => {
    const upiData = `upi://pay?pa=${upiId}&am=${amount}&cu=INR&tn=i2u.ai%20Registration`;
    setQrCodeData(upiData);
    generateQRCode(upiData);
  }, [amount, upiId]);

  // Generate QR code using the library
  const generateQRCode = async (text) => {
    try {
      const qrImage = await QRCode.toDataURL(text, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeImage(qrImage);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  // Generate Google Pay deep link
  const generateGooglePayLink = () => {
    const googlePayUrl = `https://pay.google.com/gp/v1/pay?pa=${upiId}&am=${amount}&cu=INR&tn=i2u.ai%20Registration`;
    return googlePayUrl;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // User category options with better labels
  const userCategories = [
    { value: 'startup-founder', label: 'Startup Leader' }, // UI shows "Startup Leader", backend uses "startup-founder"
    { value: 'professional', label: 'Professional' },
    { value: 'mentor', label: 'Mentor' },
    { value: 'investor', label: 'Investor' },
    { value: 'influencer', label: 'Influencer' },
    { value: 'enabler', label: 'Enabler' },
    { value: 'facilitator', label: 'Facilitator' }
  ];

  // Get the display label for the current user category
  const getCurrentCategoryLabel = () => {
    const category = userCategories.find(cat => cat.value === pageUserCategory);
    return category ? category.label : 'Professional';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.transactionId || !formData.userCategory) {
      setError('Please fill in all fields including user category');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Starting registration process...', { formData, amount, referralCode });
      
      // Step 1: Create registration
      const { data: registration, error: regError } = await supabase
        .from('registrations')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          referral_code: referralCode || null,
          referral_used_code: referralCode || null,
          amount: amount,
          user_category: formData.userCategory
        }])
        .select()
        .single();

      if (regError) {
        console.error('Registration insert error:', regError);
        throw regError;
      }

      console.log('Registration created successfully:', registration);

      // Step 2: Create payment transaction
      const { data: payment, error: payError } = await supabase
        .from('payment_transactions')
        .insert([{
          registration_id: registration.id,
          transaction_id: formData.transactionId,
          upi_id: upiId,
          amount: amount
        }])
        .select()
        .single();

      if (payError) {
        console.error('Payment transaction insert error:', payError);
        throw payError;
      }

      console.log('Payment transaction created successfully:', payment);

      // Step 3: Create status history entry
      const { error: statusError } = await supabase
        .from('registration_status_history')
        .insert([{
          registration_id: registration.id,
          old_status: null,
          new_status: 'pending',
          notes: 'Registration created, awaiting admin verification'
        }]);

      if (statusError) {
        console.error('Status history insert error:', statusError);
        throw statusError;
      }

      console.log('Status history created successfully');

      // Step 4: Log admin action
      const { error: adminError } = await supabase
        .from('admin_actions')
        .insert([{
          action_type: 'registration_created',
          target_table: 'registrations',
          target_id: registration.id,
          new_values: { registration_id: registration.id, status: 'pending' },
          notes: 'New registration created via GooglePayPayment component'
        }]);

      if (adminError) {
        console.error('Admin action insert error:', adminError);
        throw adminError;
      }

      console.log('Admin action logged successfully');

      setIsPaymentComplete(true);
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        transactionId: '',
        userCategory: ''
      });

      // Clear referral code from URL
      if (referralCode) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }

    } catch (err) {
      console.error('Registration failed:', err);
      setError(`Registration failed: ${err.message || 'Unknown error occurred'}`);
      setIsPaymentComplete(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google Pay button click
  const handleGooglePayClick = () => {
    const googlePayUrl = generateGooglePayLink();
    window.open(googlePayUrl, '_blank');
    
    alert('Please complete the payment and copy the Transaction ID from your UPI app. Then return here to complete registration.');
  };

  // Handle UPI ID copy
  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    alert('UPI ID copied to clipboard!');
  };

  // Handle QR code download
  const downloadQRCode = () => {
    if (qrCodeImage) {
      const link = document.createElement('a');
      link.download = 'i2u-googlepay-qr.png';
      link.href = qrCodeImage;
      link.click();
    }
  };

  return (
    <div className="google-pay-payment-container">
      <div className="payment-header">
        <h2>{finalDisplayText.heading}</h2>
        <p>{finalDisplayText.subheading}</p>
      </div>

      <div className="payment-section">
        <div className="payment-notice">
          <p>
            👉 <strong>Click to Pay and Register Instantly</strong>
          </p>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="main-content-layout">
          {/* Left Column - Google Pay Integration */}
          <div className="google-pay-container">
            <div className="qr-code-section">
              <div className="qr-code-placeholder">
                {qrCodeImage ? (
                  <img 
                    src={qrCodeImage} 
                    alt="UPI QR Code" 
                    className="qr-code-image"
                    style={{ width: '150px', height: '150px' }}
                  />
                ) : (
                  <div className="google-pay-logo">G</div>
                )}
                <p>UPI QR Code</p>
                <small>Scan with your UPI app</small>
                <div className="qr-actions">
                  <button 
                    className="download-qr-btn"
                    onClick={downloadQRCode}
                    title="Download QR Code"
                    disabled={!qrCodeImage}
                  >
                    📥 Download QR
                  </button>
                </div>
              </div>
              <div className="upi-info">
                <p><strong>UPI ID:</strong> {upiId}</p>
                <p><strong>Amount:</strong> ₹{amount}</p>
                <p><strong>Note:</strong> i2u.ai Registration</p>
              </div>
            </div>

            <div className="payment-options">
              {/* Google Pay Button */}
              {/* <button 
                className="google-pay-button"
                onClick={handleGooglePayClick}
              >
                <div className="google-pay-icon">G</div>
                <div className="button-text">
                  <div className="primary-text">Pay with Google Pay</div>
                  <div className="secondary-text">₹{amount} Only</div>
                </div>
              </button> */}

              {/* UPI ID Section */}
              <div className="upi-section">
                <p>Or pay directly to UPI ID:</p>
                <div className="upi-id-container">
                  <span className="upi-id">{upiId}</span>
                  <button 
                    className="copy-button"
                    onClick={copyUpiId}
                    title="Copy UPI ID"
                  >
                    📋
                  </button>
                </div>
                <small>Click to copy UPI ID</small>
              </div>

              {/* Payment Instructions */}
              <div className="payment-instructions">
                <h4>📱 How to Pay:</h4>
                <ol>
                  <li>Complete payment in UPI Pay app</li>
                  <li>Copy the Transaction ID</li>
                  <li>Fill the form on the right and submit</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="registration-form-section">
            <h3>Complete Your Registration</h3>
            <p className="form-instructions">
              After completing the payment, please fill in your details below along with the Transaction ID from your payment app.
            </p>

            {referralCode && (
              <div className="referral-notice">
                <div className="referral-icon">🎯</div>
                <div className="referral-content">
                  <h4>Referral Code Detected!</h4>
                  <p>
                    You're using a referral link from{' '}
                    <strong>a community member</strong>!
                  </p>
                  <p className="referral-code">
                    Referral Code: <code>{referralCode}</code>
                  </p>
                  {referrerInfo && (
                    <p className="referral-type">
                      Referral Type: <strong>{referrerInfo.referralType}</strong>
                    </p>
                  )}
                  <p className="referral-benefit">
                    {currentPage === '/Professional-Zone' 
                      ? 'This referral code works for the Professional Zone (₹99) page. It helps support our community and may provide benefits to both you and the referrer.'
                      : currentPage === '/Startups'
                      ? 'This referral code works for the Startups (₹999) page. It helps support our community and may provide benefits to both you and the referrer.'
                      : `This referral code works for the ${currentPage.replace('/', '')} (₹101) page. It helps support our community and may provide benefits to both you and the referrer.`
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Debug section - remove in production */}
            {/* <div className="debug-section" style={{ 
              background: '#f0f0f0', 
              padding: '10px', 
              margin: '10px 0', 
              borderRadius: '5px', 
              fontSize: '12px',
              border: '1px solid #ccc'
            }}> */}
              {/* <strong>Debug Info:</strong><br/>
              Referral Code State: {referralCode || 'None'}<br/>
              Current URL: {window.location.href}<br/>
              Hash: {window.location.hash}<br/>
              Search: {window.location.search}
            </div> */}

            <form onSubmit={handleSubmit} className="registration-form">
              {/* Current Page Information */}
              {currentPage && (
                <div className="current-page-info">
                  <div className="page-icon">📍</div>
                  <div className="page-content">
                    <h4>Registering for: {currentPage.replace('/', '')}</h4>
                    <p>You're on the <strong>{getCurrentCategoryLabel()}</strong> page</p>
                    <small>User category automatically set based on your current page</small>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email ID *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="userCategory">
                  User Category * 
                  {pageUserCategory && (
                    <span className="auto-selected-badge">Auto-selected</span>
                  )}
                </label>
                <select
                  id="userCategory"
                  name="userCategory"
                  value={formData.userCategory}
                  onChange={handleInputChange}
                  required
                  className={`form-select ${pageUserCategory ? 'auto-selected' : ''}`}
                >
                  <option value="">Select your category</option>
                  {userCategories.map((category) => (
                    <option 
                      key={category.value} 
                      value={category.value}
                      disabled={category.value === pageUserCategory && pageUserCategory}
                    >
                      {category.label}
                      {category.value === pageUserCategory && pageUserCategory ? ' (Current Page)' : ''}
                    </option>
                  ))}
                </select>
                <small className="help-text">
                  {pageUserCategory 
                    ? `Category automatically set to "${getCurrentCategoryLabel()}" based on the ${currentPage.replace('/', '')} page`
                    : 'Please select the category that best describes your role'
                  }
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="transactionId">Transaction ID *</label>
                <input
                  type="text"
                  id="transactionId"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  placeholder="Enter transaction ID from UPI app"
                  required
                />
                <small className="help-text">
                  Find this in your UPI app after payment completion
                </small>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button 
                type="submit" 
                className="Google-Pay-register-button"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Register Now'}
              </button>
            </form>
          </div>
        </div>

        {/* Success Message */}
        {isPaymentComplete && (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Registration Successful!</h3>
            <p>Thank you {formData.fullName} for registering with i2u.ai. We'll verify your payment and send you a confirmation email shortly.</p>
            <button 
              className="close-button"
              onClick={() => setIsPaymentComplete(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GooglePayPayment;