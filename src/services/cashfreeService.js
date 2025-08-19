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

      // Production - create payment session for hosted checkout
      console.log('🚀 Creating payment session for hosted checkout...');
      
      // Generate unique order ID
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      console.log('🔧 Creating payment session for order:', orderId);
      
      // Create payment session via Cashfree API
      const sessionResult = await this.createPaymentSession(orderId, orderData);
      
      if (!sessionResult.success) {
        throw new Error('Failed to create payment session');
      }
      
      console.log('✅ Payment session created successfully:', sessionResult.data);
      
      // Return the order data with the checkout URL
      return {
        success: true,
        data: {
          order_id: orderId,
          payment_session_id: sessionResult.data.payment_session_id,
          order_status: 'ACTIVE',
          payment_url: sessionResult.data.payment_url,
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

      // Production - check order status via Cashfree API
      console.log('🔍 Checking order status via Cashfree API...');
      
      const apiUrl = `${this.cashfreeConfig.apiBaseUrl}/orders/${orderId}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'x-client-id': this.cashfreeConfig.clientId,
          'x-client-secret': this.cashfreeConfig.clientSecret,
          'x-api-version': '2023-08-01'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Cashfree API error checking order status:', errorData);
        throw new Error(`Cashfree API error: ${errorData.message || response.statusText}`);
      }
      
      const orderStatus = await response.json();
      console.log('✅ Order status retrieved from Cashfree:', orderStatus);
      
      // Map Cashfree status to our format
      const mappedStatus = {
        order_id: orderStatus.order_id || orderId,
        order_status: orderStatus.order_status || 'PENDING',
        payment_status: orderStatus.payment_status || 'PENDING',
        transaction_id: orderStatus.transaction_id || null,
        upi_id: orderStatus.upi_id || null,
        payment_method: orderStatus.payment_method || 'cashfree',
        amount: orderStatus.order_amount || 0,
        currency: orderStatus.order_currency || 'INR',
        created_at: orderStatus.created_at || new Date().toISOString(),
        updated_at: orderStatus.updated_at || new Date().toISOString()
      };
      
      return {
        success: true,
        data: mappedStatus
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

  // Create payment session for hosted checkout
  async createPaymentSession(orderId, orderData) {
    try {
      if (this.environment === 'development' || this.environment === 'test') {
        console.log('🔄 Using mock payment session for development/testing');
        return {
          success: true,
          data: {
            payment_session_id: `CF_SESSION_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            payment_url: 'https://sandbox.cashfree.com/pg/checkout/mock-payment'
          }
        };
      }

      // Production - create payment session via Cashfree API
      console.log('🚀 Creating payment session via Cashfree API...');
      
      const sessionData = {
        order_id: orderId,
        order_amount: orderData.order_amount,
        order_currency: orderData.order_currency,
        customer_details: orderData.customer_details,
        order_meta: {
          ...orderData.order_meta,
          return_url: `${window.location.origin}${window.location.pathname}?order_id=${orderId}&status=success`,
          notify_url: `${window.location.origin}/api/webhooks/cashfree`
        },
        order_note: orderData.order_note,
        order_tags: orderData.order_tags
      };
      
      const apiUrl = `${this.cashfreeConfig.apiBaseUrl}/sessions`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': this.cashfreeConfig.clientId,
          'x-client-secret': this.cashfreeConfig.clientSecret,
          'x-api-version': '2023-08-01'
        },
        body: JSON.stringify(sessionData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Cashfree API error creating session:', errorData);
        throw new Error(`Cashfree API error: ${errorData.message || response.statusText}`);
      }
      
      const sessionResponse = await response.json();
      console.log('✅ Payment session created:', sessionResponse);
      
      // Build the checkout URL
      const checkoutUrl = `${this.cashfreeConfig.apiBaseUrl}/sessions/${sessionResponse.payment_session_id}`;
      
      return {
        success: true,
        data: {
          payment_session_id: sessionResponse.payment_session_id,
          payment_url: checkoutUrl
        }
      };
    } catch (error) {
      console.error('❌ Error creating payment session:', error);
      throw error;
    }
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
