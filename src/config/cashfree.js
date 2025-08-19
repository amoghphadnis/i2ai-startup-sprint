// Cashfree Configuration
// Replace these values with your actual Cashfree credentials

export const CASHFREE_CONFIG = {
  // Environment: Will be automatically detected
  ENVIRONMENT: import.meta.env.DEV ? 'sandbox' : 'production',
  
  // Your Cashfree App ID (Client ID)
  CLIENT_ID: import.meta.env.VITE_CASHFREE_CLIENT_ID || 'TEST1234567890',
  
  // Your Cashfree Secret Key
  CLIENT_SECRET: import.meta.env.VITE_CASHFREE_CLIENT_SECRET || 'test_secret_key_1234567890',
  
  // API Base URLs - automatically set based on environment
  API_URLS: {
    sandbox: 'https://sandbox.cashfree.com/pg',
    production: 'https://api.cashfree.com/pg'
  },
  
  // Webhook URLs (update these with your actual webhook endpoints)
  WEBHOOK_URLS: {
    sandbox: 'https://i2u.ai/api/webhooks/cashfree/sandbox',
    production: 'https://i2u.ai/api/webhooks/cashfree'
  },
  
  // Return URLs (where users are redirected after payment)
  RETURN_URLS: {
    sandbox: 'https://i2u.ai/',
    production: 'https://i2u.ai/'
  },
  
  // Payment Methods Configuration
  PAYMENT_METHODS: {
    // Enable/disable specific payment methods
    UPI: true,
    CARDS: true,
    WALLETS: true,
    NETBANKING: false,
    EMI: false,
    
    // Preferred payment methods order
    PRIORITY: ['upi', 'card', 'wallet', 'netbanking', 'emi']
  },
  
  // Order Configuration
  ORDER_CONFIG: {
    // Default currency
    CURRENCY: 'INR',
    
    // Minimum and maximum order amounts
    MIN_AMOUNT: 1,
    MAX_AMOUNT: 100000,
    
    // Order expiry time in minutes
    EXPIRY_TIME: 30,
    
    // Auto-capture payments
    AUTO_CAPTURE: true
  },
  
  // Customer Configuration
  CUSTOMER_CONFIG: {
    // Required customer fields
    REQUIRED_FIELDS: ['customer_id', 'customer_name', 'customer_email', 'customer_phone'],
    
    // Customer ID prefix
    ID_PREFIX: 'CUST_',
    
    // Phone number validation (India)
    PHONE_REGEX: /^[6-9]\d{9}$/
  },
  
  // UI Configuration
  UI_CONFIG: {
    // Checkout modes
    CHECKOUT_MODES: ['popup', 'inline', 'redirect'],
    
    // Default checkout mode
    DEFAULT_CHECKOUT_MODE: 'popup',
    
    // Theme colors
    THEME: {
      PRIMARY: '#667eea',
      SECONDARY: '#764ba2',
      SUCCESS: '#28a745',
      WARNING: '#ffc107',
      ERROR: '#dc3545'
    },
    
    // Language
    LANGUAGE: 'en',
    
    // Currency symbol
    CURRENCY_SYMBOL: '₹'
  },
  
  // Security Configuration
  SECURITY: {
    // Enable signature verification
    VERIFY_SIGNATURE: true,
    
    // Allowed IPs for webhooks (optional)
    ALLOWED_IPS: [],
    
    // Webhook timeout (seconds)
    WEBHOOK_TIMEOUT: 30
  }
};

// Helper functions - automatically detect environment
export const getCashfreeConfig = () => {
  const env = import.meta.env.DEV ? 'sandbox' : 'production';
  return {
    ...CASHFREE_CONFIG,
    API_BASE_URL: CASHFREE_CONFIG.API_URLS[env],
    WEBHOOK_URL: CASHFREE_CONFIG.WEBHOOK_URLS[env],
    RETURN_URL: CASHFREE_CONFIG.RETURN_URLS[env]
  };
};

export const isProduction = () => !import.meta.env.DEV;
export const isSandbox = () => import.meta.env.DEV;

// Validation functions
export const validateAmount = (amount) => {
  const numAmount = parseFloat(amount);
  return numAmount >= CASHFREE_CONFIG.ORDER_CONFIG.MIN_AMOUNT && 
         numAmount <= CASHFREE_CONFIG.ORDER_CONFIG.MAX_AMOUNT;
};

export const validatePhoneNumber = (phone) => {
  return CASHFREE_CONFIG.CUSTOMER_CONFIG.PHONE_REGEX.test(phone);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get payment methods string for API
export const getPaymentMethodsString = () => {
  const methods = [];
  
  if (CASHFREE_CONFIG.PAYMENT_METHODS.UPI) methods.push('upi');
  if (CASHFREE_CONFIG.PAYMENT_METHODS.CARDS) methods.push('card');
  if (CASHFREE_CONFIG.PAYMENT_METHODS.WALLETS) methods.push('wallet');
  if (CASHFREE_CONFIG.PAYMENT_METHODS.NETBANKING) methods.push('netbanking');
  if (CASHFREE_CONFIG.PAYMENT_METHODS.EMI) methods.push('emi');
  
  return methods.join(',');
};

// Environment-specific configurations - simplified
export const getEnvironmentConfig = () => {
  const config = getCashfreeConfig();
  
  // Always return sandbox config for now
  return {
    ...config,
    // Sandbox-specific overrides
    ORDER_CONFIG: {
      ...config.ORDER_CONFIG,
      MAX_AMOUNT: 1000 // Lower limit for testing
    }
  };
};
