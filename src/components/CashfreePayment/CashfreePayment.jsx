import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import cashfreeService from '../../services/cashfreeService';
import ErrorBoundary from './ErrorBoundary';
import './CashfreePayment.css';

const CashfreePayment = ({ 
  amount = 99, 
  displayText = {}, 
  checkoutMode = 'popup', // 'popup', 'inline', 'redirect'
  inlineContainerId = null // For inline mode
}) => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    userCategory: ''
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  
  // SDK state
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [sdkError, setSdkError] = useState(null);
  
  // Payment state
  const [orderId, setOrderId] = useState(null);
  const [paymentSessionId, setPaymentSessionId] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);
  
  // App state
  const [referralCode, setReferralCode] = useState(null);
  const [referrerInfo, setReferrerInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState('');
  const [pageUserCategory, setPageUserCategory] = useState('');
  
  // Refs for SDK management
  const sdkRef = useRef(null);
  const sdkReadyRef = useRef(false);
  
  // Page to user category mapping
  const pageCategoryMapping = {
    '/Professional-Zone': 'professional',
    '/Startups': 'startup-founder',
    '/Mentors': 'mentor',
    '/Investors': 'investor',
    '/Enablers': 'enabler',
    '/Influencers': 'influencer',
    '/Facilitators': 'facilitator',
    '/': 'startup-founder'
  };

  // User category options
  const userCategories = [
    { value: 'startup-founder', label: 'Startup Leader' },
    { value: 'professional', label: 'Professional' },
    { value: 'mentor', label: 'Mentor' },
    { value: 'investor', label: 'Investor' },
    { value: 'influencer', label: 'Influencer' },
    { value: 'enabler', label: 'Enabler' },
    { value: 'facilitator', label: 'Facilitator' }
  ];

  // Default display text
  const defaultDisplayText = {
    heading: `🎯 Register Now – ₹${amount} Today, Value for a Lifetime`,
    subheading: `The registration fee is just ₹${amount}, but it will increase to ₹${amount * 2} after the first 1,000 registrations. Act now to secure your spot and maximize your reward.`
  };

  const finalDisplayText = {
    heading: displayText.heading || defaultDisplayText.heading,
    subheading: displayText.subheading || defaultDisplayText.subheading
  };

  // Load Cashfree SDK
  useEffect(() => {
    const loadSDK = async () => {
      try {
        // Check if already loaded
        if (window.Cashfree && typeof window.Cashfree === 'function') {
          console.log('✅ Cashfree SDK already available');
          sdkRef.current = window.Cashfree;
          setSdkLoaded(true);
          sdkReadyRef.current = true;
          return;
        }

        // Load the SDK
        console.log('📥 Loading Cashfree SDK...');
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.async = true;
        
        script.onload = () => {
          console.log('✅ Cashfree SDK script loaded');
          
          // Wait for SDK to be available
          const checkSDK = () => {
            if (window.Cashfree && typeof window.Cashfree === 'function') {
              console.log('✅ Cashfree SDK ready');
              sdkRef.current = window.Cashfree;
              setSdkLoaded(true);
              sdkReadyRef.current = true;
            } else {
              setTimeout(checkSDK, 100);
            }
          };
          
          checkSDK();
        };
        
        script.onerror = () => {
          console.error('❌ Failed to load Cashfree SDK');
          setSdkError('Failed to load payment system');
        };
        
        document.head.appendChild(script);
        
        // Timeout after 10 seconds
        setTimeout(() => {
          if (!sdkReadyRef.current) {
            setSdkError('Payment system is taking too long to load');
          }
        }, 10000);
        
      } catch (error) {
        console.error('❌ Error loading SDK:', error);
        setSdkError('Failed to load payment system');
      }
    };

    loadSDK();
  }, []);

  // Detect current page and set user category
  useEffect(() => {
    const detectPage = () => {
      let pagePath = '';
      
      if (window.location.hash) {
        pagePath = window.location.hash.replace('#', '');
      } else {
        pagePath = window.location.pathname;
      }
      
      setCurrentPage(pagePath);
      
      const category = pageCategoryMapping[pagePath];
      if (category) {
        setPageUserCategory(category);
        setFormData(prev => ({ ...prev, userCategory: category }));
      } else {
        setFormData(prev => ({ ...prev, userCategory: 'startup-founder' }));
      }
    };

    detectPage();
  }, []);

  // Check for referral code
  useEffect(() => {
    const checkReferral = () => {
      let ref = null;
      
      // Check query params
      const urlParams = new URLSearchParams(window.location.search);
      ref = urlParams.get('ref');
      
      // Check hash params
      if (!ref && window.location.hash.includes('ref=')) {
        const hashFragment = window.location.hash.split('ref=')[1];
        if (hashFragment) {
          ref = hashFragment.split('&')[0];
        }
      }
      
      if (ref) {
        validateReferralCode(ref);
      }
    };

    checkReferral();
  }, []);

  // Check for payment completion
  useEffect(() => {
    const checkPayment = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('order_id');
      const status = urlParams.get('status');

      if (orderId && status === 'success') {
        handlePaymentCompletion(orderId);
      }
    };

    checkPayment();
  }, []);

  // Validate referral code
  const validateReferralCode = async (code) => {
    try {
      const { data, error } = await supabase
        .from('referral_links')
        .select('*')
        .eq('referral_code', code)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        console.warn('Invalid referral code:', code);
        return;
      }

      setReferralCode(code);
      setReferrerInfo({
        referralType: data.referral_type,
        referralCode: data.referral_code
      });

      // Update click count
      await supabase
        .from('referral_links')
        .update({ click_count: (data.click_count || 0) + 1 })
        .eq('id', data.id);

    } catch (error) {
      console.error('Error validating referral code:', error);
    }
  };

  // Create order
  const createOrder = async () => {
    try {
      console.log('🔧 Starting order creation...');
      
      const orderData = {
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: `CUST_${Date.now()}`,
          customer_name: formData.fullName,
          customer_email: formData.email,
          customer_phone: formData.phoneNumber
        },
        order_meta: {
          return_url: `${window.location.origin}${window.location.pathname}?order_id={order_id}&status=success`,
          notify_url: `${window.location.origin}/api/webhooks/cashfree`,
          payment_methods: 'upi,card,wallet'
        },
        order_note: `i2u.ai Registration - ${formData.userCategory}`,
        order_tags: {
          user_category: formData.userCategory,
          referral_code: referralCode || 'none',
          page: currentPage
        }
      };

      console.log('🔧 Order data prepared:', orderData);
      console.log('🔧 Calling cashfreeService.createOrder...');
      
      const result = await cashfreeService.createOrder(orderData);
      console.log('🔧 Service response:', result);
      
      if (result.success) {
        setOrderId(result.data.order_id);
        setPaymentSessionId(result.data.payment_session_id);
        console.log('✅ Order created successfully:', result.data);
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to create order');
      }
    } catch (error) {
      console.error('❌ Error creating order:', error);
      throw error;
    }
  };

  // Handle payment
  const handlePayment = async () => {
    if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.userCategory) {
      setError('Please fill in all required fields');
      return;
    }

    if (!sdkReadyRef.current || !sdkRef.current) {
      setError('Payment system not ready. Please wait a moment.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      console.log('🚀 Starting payment process...');
      console.log('📝 Form data:', formData);
      console.log('🔧 SDK ready:', sdkReadyRef.current);
      console.log('🔧 SDK ref:', sdkRef.current);
      console.log('🌍 Environment:', import.meta.env.DEV ? 'Development' : 'Production');

      // Create order
      const orderData = await createOrder();
      console.log('✅ Order created, proceeding to payment...');
      
      // Check if we're in development mode and should use mock payment
      if (import.meta.env.DEV) {
        console.log('🧪 Development mode - simulating payment flow');
        
        // Simulate payment processing
        setPaymentStatus('processing');
        
        // Simulate payment completion after 3 seconds
        setTimeout(async () => {
          try {
            console.log('🧪 Simulating payment completion...');
            await handlePaymentCompletion(orderData.order_id);
          } catch (error) {
            console.error('❌ Mock payment completion failed:', error);
            setError('Mock payment simulation failed');
          }
        }, 3000);
        
        return;
      }
      
      // Production mode - redirect to Cashfree hosted checkout
      console.log('🚀 Production mode - redirecting to Cashfree hosted checkout');
      
      // Store order details for when user returns
      localStorage.setItem('cashfree_order', JSON.stringify({
        orderId: orderData.order_id,
        paymentSessionId: orderData.payment_session_id,
        formData: formData,
        referralCode: referralCode,
        amount: amount
      }));
      
      // Redirect to Cashfree's hosted checkout
      window.location.href = orderData.payment_url;

    } catch (error) {
      console.error('❌ Payment error:', error);
      
      setError(`Payment failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlePayment();
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Get current category label
  const getCurrentCategoryLabel = () => {
    const category = userCategories.find(cat => cat.value === pageUserCategory);
    return category ? category.label : 'Professional';
  };

  // Check payment status
  const checkPaymentStatus = async (orderId) => {
    try {
      console.log('🔧 Checking payment status for order:', orderId);
      
      const result = await cashfreeService.checkOrderStatus(orderId);
      
      if (result.success) {
        console.log('✅ Payment status retrieved:', result.data);
        return result.data;
      } else {
        console.error('❌ Failed to get payment status:', result.error);
        return null;
      }
    } catch (error) {
      console.error('❌ Error checking payment status:', error);
      return null;
    }
  };

  // Handle payment completion
  const handlePaymentCompletion = async (orderId) => {
    try {
      setIsLoading(true);
      
      const paymentStatus = await checkPaymentStatus(orderId);
      
      if (paymentStatus && paymentStatus.order_status === 'PAID') {
        await completeRegistration(orderId, paymentStatus);
      } else {
        setError('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Error completing payment:', error);
      setError('Failed to complete registration. Please contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  // Complete registration
  const completeRegistration = async (orderId, paymentStatus) => {
    try {
      // Create registration record
      const { data: registration, error: regError } = await supabase
        .from('registrations')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          referral_code: referralCode || null,
          referral_used_code: referralCode || null,
          amount: amount,
          user_category: formData.userCategory,
          order_id: orderId,
          payment_status: 'completed'
        }])
        .select()
        .single();

      if (regError) throw regError;

      // Create payment transaction record
      const { data: payment, error: payError } = await supabase
        .from('payment_transactions')
        .insert([{
          registration_id: registration.id,
          transaction_id: paymentStatus.transaction_id || orderId,
          upi_id: paymentStatus.upi_id || `UPI_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          order_id: orderId,
          amount: amount,
          payment_method: paymentStatus.payment_method || 'cashfree',
          payment_status: 'verified'
        }])
        .select()
        .single();

      if (payError) throw payError;

      // Create status history
      await supabase
        .from('registration_status_history')
        .insert([{
          registration_id: registration.id,
          old_status: null,
          new_status: 'completed',
          notes: 'Registration completed via Cashfree payment'
        }]);

      // Log admin action
      await supabase
        .from('admin_actions')
        .insert([{
          action_type: 'registration_completed',
          target_table: 'registrations',
          target_id: registration.id,
          new_values: { 
            registration_id: registration.id, 
            status: 'completed',
            payment_method: 'cashfree'
          },
          notes: 'Registration completed via Cashfree payment'
        }]);

      setTransactionDetails({
        orderId,
        transactionId: paymentStatus.transaction_id || orderId,
        amount,
        paymentMethod: paymentStatus.payment_method || 'cashfree'
      });

      setIsPaymentComplete(true);
      setPaymentStatus('completed');

      // Clear referral code from URL
      if (referralCode) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }

    } catch (error) {
      console.error('Registration completion failed:', error);
      setError(`Registration failed: ${error.message}`);
    }
  };

  // Show loading state while SDK is loading
  if (!sdkLoaded && !sdkError) {
    return (
      <div className="sdk-loading">
        <div className="loading-spinner"></div>
        <span>Loading payment system...</span>
      </div>
    );
  }

  // Show error state if SDK failed to load
  if (sdkError) {
    return (
      <div className="critical-error">
        <div className="error-content">
          <div className="error-icon">❌</div>
          <h3>Payment System Unavailable</h3>
          <p>{sdkError}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Show loading state while SDK is initializing
  if (!sdkReadyRef.current) {
    return (
      <div className="sdk-loading">
        <div className="loading-spinner"></div>
        <span>Initializing payment system...</span>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="cashfree-payment-container">
        <div className="payment-header">
          <h2>{finalDisplayText.heading}</h2>
          <p>{finalDisplayText.subheading}</p>
        </div>

        <div className="payment-section">
          {/* {import.meta.env.DEV && (
            <div className="dev-notice">
              <p>
                🧪 <strong>Development Mode</strong> - Using mock payment system for testing
              </p>
              <p style={{ fontSize: '0.9rem', marginTop: '8px', opacity: 0.8 }}>
                Click "Pay Now" to simulate the complete payment flow. The mock system will always return successful payment for testing.
              </p>
              <p style={{ fontSize: '0.85rem', marginTop: '8px', opacity: 0.7 }}>
                💡 To test hosted checkout in dev mode, uncomment the test option in the code.
              </p>
            </div>
          )} */}
          
          {!import.meta.env.DEV && (
            <div className="prod-notice">
              <p>
                🚀 <strong>Production Mode</strong> - Real payments via Cashfree hosted checkout
              </p>
              <p style={{ fontSize: '0.9rem', marginTop: '8px', opacity: 0.8 }}>
                Click "Pay Now" to be redirected to Cashfree's secure payment page for real transactions.
              </p>
            </div>
          )}
          <div className="payment-notice">
            <p>
              👉 <strong>Secure Payment via Cashfree - UPI, Cards & Wallets</strong>
            </p>
          </div>

          {/* Main Content - 2 Column Layout */}
          <div className="main-content-layout">
            {/* Left Column - Payment Integration */}
            <div className="cashfree-container">
              <div className="payment-methods-section">
                <div className="payment-methods-header">
                  <h3>💳 Payment Methods</h3>
                  <p>Choose your preferred payment method</p>
                </div>
                
                <div className="payment-methods-grid">
                  <div className="payment-method">
                    <div className="method-icon">📱</div>
                    <div className="method-info">
                      <h4>UPI</h4>
                      <p>Pay with any UPI app</p>
                    </div>
                  </div>
                  
                  <div className="payment-method">
                    <div className="method-icon">💳</div>
                    <div className="method-info">
                      <h4>Cards</h4>
                      <p>Credit & Debit cards</p>
                    </div>
                  </div>
                  
                  <div className="payment-method">
                    <div className="method-icon">👛</div>
                    <div className="method-info">
                      <h4>Wallets</h4>
                      <p>Paytm, PhonePe, etc.</p>
                    </div>
                  </div>
                </div>

                <div className="payment-amount">
                  <div className="amount-display">
                    <span className="currency">₹</span>
                    <span className="amount">{amount}</span>
                  </div>
                  <p className="amount-note">Registration Fee</p>
                </div>

                {checkoutMode === 'inline' ? (
                  <div className="inline-payment-container">
                    <p>Payment form will appear below after filling details</p>
                  </div>
                ) : (
                  <div className="payment-button-container">
                    <button 
                      className="cashfree-pay-button"
                      onClick={handlePayment}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing...' : 'Pay Now ₹' + amount}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="registration-form-section">
              <h3>Complete Your Registration</h3>
              <p className="form-instructions">
                Fill in your details below to proceed with payment.
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
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="registration-form">
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

                {error && <div className="error-message">{error}</div>}

                {checkoutMode === 'inline' && (
                  <button 
                    type="submit" 
                    className="cashfree-register-button"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Inline Payment Container */}
          {checkoutMode === 'inline' && inlineContainerId && (
            <div id={inlineContainerId} className="inline-payment-embed">
              <p>Payment form will be embedded here</p>
            </div>
          )}

          {/* Payment Status */}
          {paymentStatus === 'processing' && (
            <div className="payment-status processing">
              <div className="status-icon">⏳</div>
              <h3>Payment in Progress</h3>
              <p>Please complete your payment in the popup window.</p>
            </div>
          )}

          {/* Success Message */}
          {isPaymentComplete && (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h3>Registration Successful!</h3>
              <p>Thank you {formData.fullName} for registering with i2u.ai.</p>
              
              {transactionDetails && (
                <div className="transaction-details">
                  <h4>Transaction Details:</h4>
                  <div className="detail-row">
                    <span>Order ID:</span>
                    <span>{transactionDetails.orderId}</span>
                  </div>
                  <div className="detail-row">
                    <span>Transaction ID:</span>
                    <span>{transactionDetails.transactionId}</span>
                  </div>
                  <div className="detail-row">
                    <span>Amount:</span>
                    <span>₹{transactionDetails.amount}</span>
                  </div>
                  <div className="detail-row">
                    <span>Payment Method:</span>
                    <span>{transactionDetails.paymentMethod}</span>
                  </div>
                </div>
              )}
              
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
    </ErrorBoundary>
  );
};

export default CashfreePayment;
