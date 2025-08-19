# Production Deployment Guide - Cashfree Payment System

## Overview
This guide will help you deploy the Cashfree payment system to production and switch from mock payments to real payments.

## Prerequisites
1. **Cashfree Production Account**: You need a live Cashfree merchant account
2. **Production API Credentials**: Get your production Client ID and Secret Key from Cashfree
3. **Domain**: Your production domain should be configured in Cashfree dashboard
4. **Webhook Endpoint**: A server endpoint to handle payment confirmations

## Step 1: Environment Configuration

### Create Production Environment File
Create a `.env.production` file in your project root:

```bash
# Production Environment Variables
VITE_NODE_ENV=production
VITE_CASHFREE_CLIENT_ID=your_production_client_id_here
VITE_CASHFREE_CLIENT_SECRET=your_production_secret_key_here
```

### Update Vite Configuration
Ensure your `vite.config.js` handles production builds:

```javascript
export default defineConfig({
  // ... other config
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});
```

## Step 2: Cashfree Dashboard Configuration

### 1. Login to Cashfree Dashboard
- Go to [Cashfree Dashboard](https://merchant.cashfree.com/)
- Switch to Production environment (not Sandbox)

### 2. Configure App Settings
- **App ID**: Copy your production Client ID
- **Secret Key**: Copy your production Secret Key
- **Webhook URL**: Set to `https://yourdomain.com/api/webhooks/cashfree`
- **Return URL**: Set to `https://yourdomain.com/`

### 3. Payment Methods
- Enable: UPI, Cards, Wallets
- Disable: Net Banking, EMI (unless needed)

## Step 3: Build and Deploy

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy to Your Hosting
- Upload the `dist` folder to your web server
- Ensure HTTPS is enabled (required for payments)
- Set up proper domain routing

## Step 4: Test Production Flow

### 1. Test Order Creation
- Fill out the registration form
- Click "Pay Now"
- Should redirect to Cashfree's production checkout page

### 2. Test Payment Flow
- Complete a test payment (use test cards if available)
- Verify return to your site
- Check order status in Cashfree dashboard

### 3. Verify Webhook
- Check if webhook notifications are received
- Verify payment status updates

## Step 5: Monitor and Debug

### Console Logs
Production mode will show:
```
🚀 Production mode - redirecting to Cashfree hosted checkout
🌍 Environment: Production
```

### Common Issues

#### Issue: Still using mock payments
**Solution**: Check environment variables and ensure `VITE_NODE_ENV=production`

#### Issue: Redirect not working
**Solution**: Verify Cashfree dashboard return URL configuration

#### Issue: Payment not completing
**Solution**: Check webhook endpoint and Cashfree dashboard logs

## Step 6: Security Considerations

### 1. Environment Variables
- Never commit `.env.production` to version control
- Use secure environment variable management in production

### 2. HTTPS Required
- Cashfree requires HTTPS for production
- Ensure SSL certificate is properly configured

### 3. Webhook Security
- Implement webhook signature verification
- Use IP whitelisting if possible
- Monitor webhook failures

## Step 7: Production Monitoring

### 1. Payment Analytics
- Monitor success/failure rates
- Track payment method preferences
- Set up alerts for payment failures

### 2. Error Tracking
- Implement proper error logging
- Monitor user payment flow completion
- Track abandoned payments

### 3. Performance
- Monitor page load times
- Track payment form completion rates
- Optimize for mobile users

## Testing Checklist

- [ ] Environment variables set correctly
- [ ] Production build created successfully
- [ ] Deployed to production server
- [ ] HTTPS enabled
- [ ] Cashfree dashboard configured
- [ ] Test payment flow works
- [ ] Webhook receives notifications
- [ ] Return URL works correctly
- [ ] Error handling works in production
- [ ] Mobile responsiveness verified

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify Cashfree dashboard configuration
3. Check webhook endpoint logs
4. Contact Cashfree support for payment issues
5. Review this deployment guide

## Rollback Plan

If production deployment fails:
1. Revert to previous working version
2. Check environment variable configuration
3. Verify Cashfree dashboard settings
4. Test in sandbox environment first

---

**Important**: Always test thoroughly in sandbox before going live with real payments!
