// Payment Service for handling Google Pay transactions and registrations

class PaymentService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  }

  // Verify transaction ID (this would typically call your backend)
  async verifyTransaction(transactionId, amount, upiId) {
    try {
      // In a real implementation, this would call your backend API
      // to verify the transaction with the payment gateway
      
      // For demo purposes, we'll simulate verification
      const isValid = await this.simulateTransactionVerification(transactionId);
      
      return {
        success: isValid,
        transactionId,
        amount,
        upiId,
        verifiedAt: new Date().toISOString(),
        status: isValid ? 'verified' : 'failed'
      };
    } catch (error) {
      console.error('Transaction verification failed:', error);
      throw new Error('Failed to verify transaction');
    }
  }

  // Simulate transaction verification (replace with real API call)
  async simulateTransactionVerification(transactionId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Basic validation - in real implementation, this would be done by your backend
    // checking against the payment gateway's API
    return transactionId && transactionId.length >= 8;
  }

  // Register user after payment verification
  async registerUser(userData, paymentData) {
    try {
      // In a real implementation, this would call your backend API
      // to create the user account and link it with the payment
      
      const registrationData = {
        ...userData,
        ...paymentData,
        referralCode: userData.referralCode || null,
        registeredAt: new Date().toISOString(),
        status: 'active'
      };

      // Try to call backend API first
      try {
        const response = await fetch(`${this.baseUrl}/payments/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transactionId: userData.transactionId,
            amount: paymentData.amount,
            upiId: paymentData.upiId,
            fullName: userData.fullName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            referralCode: userData.referralCode || null
          })
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            // Store in localStorage for demo purposes
            const registrations = JSON.parse(localStorage.getItem('i2uRegistrations') || '[]');
            registrations.push(registrationData);
            localStorage.setItem('i2uRegistrations', JSON.stringify(registrations));
            
            return {
              success: true,
              registrationId: result.data.registration.uuid,
              data: result.data
            };
          } else {
            throw new Error(result.error || 'Registration failed');
          }
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (apiError) {
        console.warn('Backend API call failed, falling back to localStorage:', apiError);
        
        // Fallback to localStorage for demo purposes
        const registrations = JSON.parse(localStorage.getItem('i2uRegistrations') || '[]');
        registrations.push(registrationData);
        localStorage.setItem('i2uRegistrations', JSON.stringify(registrations));

        return {
          success: true,
          registrationId: `REG-${Date.now()}`,
          data: registrationData
        };
      }
    } catch (error) {
      console.error('User registration failed:', error);
      throw new Error('Failed to register user');
    }
  }

  // Get registration history (for admin purposes)
  getRegistrations() {
    try {
      return JSON.parse(localStorage.getItem('i2uRegistrations') || '[]');
    } catch (error) {
      console.error('Failed to get registrations:', error);
      return [];
    }
  }

  // Check if email is already registered
  isEmailRegistered(email) {
    const registrations = this.getRegistrations();
    return registrations.some(reg => reg.email === email);
  }

  // Get registration statistics
  getRegistrationStats() {
    const registrations = this.getRegistrations();
    const total = registrations.length;
    const verified = registrations.filter(reg => reg.status === 'active').length;
    const pending = registrations.filter(reg => reg.status === 'pending_verification').length;

    return {
      total,
      verified,
      pending,
      revenue: total * 99 // Assuming ₹99 per registration
    };
  }
}

export default new PaymentService();
