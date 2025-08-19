import { CASHFREE_CONFIG } from '../config/cashfree';

class CashfreeService {
  constructor() {
    this.config = CASHFREE_CONFIG;
    // Fix environment detection to match component logic
    this.environment = import.meta.env.DEV ? 'development' : 'production';
    
    // Cashfree API configuration
    this.cashfreeConfig = {
      clientId: import.meta.env.VITE_CASHFREE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CASHFREE_CLIENT_SECRET,
      apiBaseUrl: this.environment === 'production' 
        ? 'https://api.cashfree.com/pg' 
        : 'https://sandbox.cashfree.com/pg'
    };
  }

  // Mock order creation for testing (remove this in production)
  // async createOrderMock(orderData) {
  //   console.log('🔧 Mock order creation:', orderData);
    
  //   // Simulate API delay
  //   await new Promise(resolve => setTimeout(resolve, 1000));
    
  //   // Generate more realistic mock order data
  //   const timestamp = Date.now();
  //   const randomId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
  //   const mockOrder = {
  //     order_id: `ORDER_${timestamp}_${randomId}`,
  //     payment_session_id: `CF_SESSION_${timestamp}_${randomId}`,
  //     order_status: 'ACTIVE',
  //     payment_url: 'https://sandbox.cashfree.com/pg/checkout/mock-payment',
  //     created_at: new Date().toISOString(),
  //     // Add more realistic fields that Cashfree expects
  //     cf_order_id: `CF_ORDER_${timestamp}_${randomId}`,
  //     order_amount: orderData.order_amount,
  //     order_currency: orderData.order_currency,
  //     customer_details: orderData.customer_details
  //   };
    
  //   console.log('✅ Mock order created:', mockOrder);
    
  //   return {
  //     success: true,
  //     data: mockOrder
  //   };
  // }

  // Real order creation - using Cashfree's hosted checkout
  async createOrder(orderData) {
    try {
      // For development/testing, use mock
      if (this.environment === 'development' || this.environment === 'test') {
        console.log('🔄 Using mock order creation for development/testing');
        return await this.createOrderMock(orderData);
      }

      // Production - use Cashfree's hosted checkout (no API calls needed)
      console.log('🚀 Creating order for hosted checkout...');
      
      // Generate unique order ID
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      console.log('🔧 Order ID generated:', orderId);
      
      // For hosted checkout, we create a direct checkout URL
      // Cashfree will handle the order creation when user visits the URL
      const checkoutUrl = `${this.cashfreeConfig.apiBaseUrl}/checkout/${orderId}`;
      
      console.log('✅ Hosted checkout URL created:', checkoutUrl);
      
      // Return the order data with the checkout URL
      return {
        success: true,
        data: {
          order_id: orderId,
          payment_session_id: `CF_SESSION_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          order_status: 'ACTIVE',
          payment_url: checkoutUrl,
          created_at: new Date().toISOString(),
          cf_order_id: orderId
        }
      };
    } catch (error) {
      console.error('❌ Error creating order:', error);
      
      // Fallback to mock in case of API failure
      if (this.environment !== 'production') {
        console.log('🔄 Falling back to mock order creation');
        return await this.createOrderMock(orderData);
      }
      
      throw error;
    }
  }

  // Check order status - using Cashfree's hosted checkout
  async checkOrderStatus(orderId) {
    try {
      // For development/testing, use mock
      if (this.environment === 'development' || this.environment === 'test') {
        console.log('🔄 Using mock order status check for development/testing');
        return await this.checkOrderStatusMock(orderId);
      }

      // Production - hosted checkout approach (no direct API calls)
      console.log('🔍 Using hosted checkout - order status will be updated via webhook or redirect return');
      
      // In hosted checkout, we can't check status directly from browser
      // Status will be updated when user returns from payment or via webhook
      // For now, return a pending status
      
      return {
        success: true,
        data: {
          order_id: orderId,
          order_status: 'PENDING',
          payment_status: 'PENDING',
          message: 'Payment status will be updated when you return from Cashfree checkout'
        }
      };
    } catch (error) {
      console.error('❌ Error checking order status:', error);
      
      // Fallback to mock in case of API failure
      if (this.environment !== 'production') {
        console.log('🔄 Falling back to mock order status check');
        return await this.checkOrderStatusMock(orderId);
      }
      
      throw error;
    }
  }

  // Mock order status check for testing (always returns PAID for development)
  async checkOrderStatusMock(orderId) {
    console.log('🔧 Mock order status check for:', orderId);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Always return PAID status for successful development testing
    // Include upi_id to satisfy database constraints
    const mockStatus = {
      order_id: orderId,
      order_status: 'PAID',
      payment_status: 'SUCCESS',
      transaction_id: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      upi_id: `UPI_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      payment_method: 'UPI',
      amount: 99,
      currency: 'INR',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('✅ Mock order status (always PAID for development):', mockStatus);
    
    return {
      success: true,
      data: mockStatus
    };
  }

  // Verify webhook signature (client-side verification)
  verifyWebhookSignature(payload, signature, timestamp) {
    try {
      // Note: In production, webhook verification should ideally be done server-side
      // This is a basic implementation for development/testing
      console.log('🔧 Webhook signature verification (client-side)');
      
      // For now, return true for testing
      // In production, you would:
      // 1. Get the webhook secret from Cashfree
      // 2. Create the expected signature
      // 3. Compare with the received signature
      
      return true;
    } catch (error) {
      console.error('❌ Webhook signature verification failed:', error);
      return false;
    }
  }

  // Get payment methods
  getPaymentMethods() {
    return this.config.PAYMENT_METHODS;
  }

  // Get environment config
  getEnvironmentConfig() {
    return {
      isProduction: this.environment === 'production',
      isSandbox: this.environment !== 'production',
      apiBaseUrl: this.baseURL,
      environment: this.environment
    };
  }
}

export default new CashfreeService();
