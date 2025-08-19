# CashfreePayment Component

A comprehensive React component for integrating Cashfree payments into your application. This component supports multiple checkout modes including popup, inline, and redirect, with full integration to your existing database system.

## Features

- 🎯 **Multiple Checkout Modes**: Popup, inline, and redirect checkout
- 💳 **Payment Methods**: UPI, Cards, Wallets, Net Banking, EMI
- 🔒 **Secure Integration**: PCI-compliant hosted checkout
- 📱 **Responsive Design**: Mobile-first responsive layout
- 🔄 **Referral System**: Integrated referral code support
- 📊 **Database Integration**: Full Supabase integration
- 🎨 **Customizable UI**: Modern, professional design
- 🌐 **Multi-language Support**: Ready for internationalization

## Prerequisites

1. **Cashfree Merchant Account**: You need an active Cashfree merchant account
2. **API Credentials**: Client ID and Secret Key from Cashfree
3. **Backend API**: Backend endpoints for order creation and payment processing
4. **Environment Variables**: Configure your Cashfree credentials

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in your project root:

```bash
# Cashfree Configuration
VITE_CASHFREE_CLIENT_ID=your_cashfree_client_id
VITE_CASHFREE_CLIENT_SECRET=your_cashfree_secret_key
VITE_API_URL=http://localhost:3000/api

# Environment
VITE_NODE_ENV=development
```

**Note**: This project uses Vite, so environment variables must be prefixed with `VITE_` to be accessible in the frontend.

### 2. Backend API Endpoints

Your backend should implement these endpoints:

#### Create Order
```
POST /api/cashfree/create-order
```

**Request Body:**
```json
{
  "order_amount": 99,
  "order_currency": "INR",
  "customer_details": {
    "customer_id": "CUST_1234567890",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "9876543210"
  },
  "order_meta": {
    "return_url": "https://yourdomain.com/return",
    "notify_url": "https://yourdomain.com/webhook",
    "payment_methods": "upi,card,wallet"
  },
  "order_note": "i2u.ai Registration",
  "order_tags": {
    "user_category": "startup-founder",
    "referral_code": "REF123"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "order_id": "order_1234567890",
    "payment_session_id": "session_1234567890",
    "order_status": "ACTIVE"
  }
}
```

#### Check Order Status
```
GET /api/cashfree/order-status/:orderId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "order_id": "order_1234567890",
    "order_status": "PAID",
    "transaction_id": "txn_1234567890",
    "payment_method": "upi",
    "amount": 99,
    "currency": "INR"
  }
}
```

#### Process Payment Completion
```
POST /api/cashfree/process-payment
```

### 3. Component Usage

#### Basic Usage (Popup Mode)
```jsx
import CashfreePayment from './components/CashfreePayment';

function App() {
  return (
    <CashfreePayment 
      amount={99}
      displayText={{
        heading: "Register Now - ₹99 Only",
        subheading: "Join our community today!"
      }}
      checkoutMode="popup"
    />
  );
}
```

#### Inline Checkout Mode
```jsx
<CashfreePayment 
  amount={999}
  checkoutMode="inline"
  inlineContainerId="payment-container"
  displayText={{
    heading: "Startup Registration - ₹999",
    subheading: "Complete your startup profile"
  }}
/>
```

#### Redirect Mode
```jsx
<CashfreePayment 
  amount={101}
  checkoutMode="redirect"
  displayText={{
    heading: "Mentor Registration - ₹101",
    subheading: "Share your expertise"
  }}
/>
```

### 4. Props Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `amount` | number | 99 | Payment amount in INR |
| `displayText` | object | {} | Custom heading and subheading |
| `checkoutMode` | string | 'popup' | 'popup', 'inline', or 'redirect' |
| `inlineContainerId` | string | null | DOM element ID for inline mode |

### 5. Database Schema Updates

Ensure your database has these tables with the required fields:

#### registrations table
```sql
ALTER TABLE registrations ADD COLUMN order_id VARCHAR(255);
ALTER TABLE registrations ADD COLUMN payment_status VARCHAR(50) DEFAULT 'pending';
```

#### payment_transactions table
```sql
ALTER TABLE payment_transactions ADD COLUMN order_id VARCHAR(255);
ALTER TABLE payment_transactions ADD COLUMN payment_method VARCHAR(50);
```

## Integration Examples

### Replace GooglePayPayment

```jsx
// Before
import GooglePayPayment from './components/GooglePayPayment/GooglePayPayment';

// After
import CashfreePayment from './components/CashfreePayment';

// Replace in your JSX
<CashfreePayment 
  amount={99}
  checkoutMode="popup"
/>
```

### Custom Styling

The component uses CSS classes that can be customized:

```css
/* Custom payment button */
.cashfree-pay-button {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
  border-radius: 25px;
}

/* Custom header */
.payment-header {
  background: linear-gradient(135deg, #your-gradient-1, #your-gradient-2);
}
```

### Referral System Integration

The component automatically detects referral codes from URLs:

```
https://yourdomain.com/#/Startups?ref=REF123
```

## Testing

### Sandbox Mode
- Use Cashfree sandbox credentials
- Test with sandbox payment methods
- Orders expire in 30 minutes

### Test Cards (Sandbox)
- **UPI**: Use any valid UPI ID
- **Cards**: Use Cashfree test card numbers
- **Wallets**: Use test wallet credentials

## Security Considerations

1. **Never expose secret keys in frontend code**
2. **Always verify payment signatures on backend**
3. **Use HTTPS in production**
4. **Implement proper webhook validation**
5. **Store sensitive data securely**

## Troubleshooting

### Common Issues

1. **SDK not loading**: Check internet connection and Cashfree CDN
2. **Order creation failed**: Verify backend API and credentials
3. **Payment not completing**: Check webhook configuration
4. **Styling issues**: Ensure CSS is properly imported

### Debug Mode

Enable console logging for debugging:

```jsx
// The component includes extensive console logging
// Check browser console for detailed information
```

## Support

For issues related to:
- **Cashfree API**: Contact Cashfree support
- **Component Integration**: Check this README and code comments
- **Backend Setup**: Refer to Cashfree backend documentation

## License

This component is part of your startup-sprint project and follows the same licensing terms.

## Changelog

### v1.0.0
- Initial release
- Support for popup, inline, and redirect checkout modes
- Full Supabase integration
- Referral system support
- Responsive design
- Comprehensive error handling
