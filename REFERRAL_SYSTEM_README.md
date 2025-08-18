# 🎯 i2u.ai Affiliate Referral System

This document explains how the affiliate referral system works in the i2u.ai payment platform.

## 🌟 Overview

The referral system allows affiliate users to share referral links (e.g., `https://i2u.ai/s_reg.html?ref=pc87ace4cd2`) and track when new users register through these links. The system automatically captures referral data and links it with payment transactions for reward calculations.

## 🔄 User Flow

1. **Affiliate User** shares a referral link: `https://i2u.ai/s_reg.html?ref=pc87ace4cd2`
2. **New User** visits the website via the referral link
3. **New User** completes payment and registration on the Professionals Zone page
4. **System** automatically captures the `ref` parameter and links it to the transaction
5. **Referral Record** is created linking the affiliate to the new user's payment
6. **Rewards Backend** can use this data to calculate and distribute affiliate rewards

## 🗄️ Database Schema

### Users Table
- `referral_id`: The user's own referral code (if they are an affiliate)
- `referred_by`: The referral code that was used when they registered

### Registrations Table
- `referral_code`: The referral code used during registration
- `affiliate_user_id`: The affiliate user who referred this registration

### Referrals Table (New)
- `affiliate_code`: The referral code used
- `affiliate_user_id`: The affiliate user's identifier
- `referred_user_id`: Reference to the new user
- `payment_id`: Reference to the payment transaction
- `transaction_id`: The payment transaction ID
- `referral_amount`: Amount earned by the affiliate
- `referral_status`: Status of the referral (pending, active, paid, expired)
- `reward_claimed`: Whether the reward has been claimed
- `reward_claimed_at`: When the reward was claimed

## 🚀 Frontend Implementation

### URL Parameter Capture
The `GooglePayPayment` component automatically captures the `ref` parameter from the URL:

```javascript
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const refParam = urlParams.get('ref');
  if (refParam) {
    setReferralCode(refParam);
    console.log('Referral code captured:', refParam);
  }
}, []);
```

### Referral Display
When a referral code is present, it's displayed prominently to the user:

```jsx
{referralCode && (
  <div className="referral-info">
    <div className="referral-badge">
      🎯 Referred by: <strong>{referralCode}</strong>
    </div>
    <p className="referral-note">You're registering through an affiliate link!</p>
  </div>
)}
```

### Data Submission
The referral code is automatically included when submitting the registration form:

```javascript
const registrationData = {
  ...formData,
  referralCode: referralCode
};
const registrationResult = await paymentService.registerUser(registrationData, verificationResult);
```

## 🔧 Backend Implementation

### Payment Verification Endpoint
The `/api/payments/verify` endpoint now accepts and processes referral codes:

```javascript
// Validation includes referral code
body('referralCode')
  .optional()
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage('Referral code must be between 1 and 100 characters')
```

### Referral Record Creation
When a payment is verified with a referral code, the system:

1. **Creates User** with referral information
2. **Creates Payment** record
3. **Creates Registration** with referral details
4. **Creates Referral** record linking everything together

```javascript
// If referral code exists, create referral record
if (referralCode) {
  await executeQuery(`
    INSERT INTO referrals (affiliate_code, affiliate_user_id, referred_user_id, payment_id, transaction_id, referral_amount, referral_status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `, [
    referralCode,
    referralCode, // affiliate_user_id
    result[0].rows[0].id, // user_id
    result[1].rows[0].id, // payment_id
    transactionId,
    0, // referral_amount (to be calculated by rewards system)
    'active'
  ]);
}
```

## 📡 API Endpoints

### Referral Statistics
```
GET /api/referrals/stats/:affiliateCode
```
Returns statistics for a specific affiliate including:
- Total referrals
- Active referrals
- Claimed rewards
- Total earnings

### Admin Referral Management
```
GET /api/referrals/admin/all?page=1&limit=20&status=active&affiliateCode=ABC123
```
Returns all referrals with pagination and filtering.

### Update Referral Status
```
PUT /api/referrals/admin/:referralId/status
```
Allows admins to update referral status and amounts.

### Claim Referral Reward
```
PUT /api/referrals/:referralId/claim
```
Marks a referral reward as claimed.

## 🧪 Testing

Run the referral system test to verify everything is working:

```bash
cd backend
node test-referral.js
```

This will test:
- Database table existence
- Column structure
- Referral record creation
- Index verification

## 🔗 Integration with Rewards Backend

The referral system provides the data structure needed for your existing rewards backend:

1. **Referral Tracking**: Every new registration with a referral code creates a referral record
2. **Payment Linking**: Referrals are linked to specific payment transactions
3. **Status Management**: Referral status can be updated as rewards are processed
4. **Claim Tracking**: Tracks which rewards have been claimed

### Example Query for Rewards Calculation
```sql
SELECT 
  r.affiliate_code,
  COUNT(*) as total_referrals,
  SUM(r.referral_amount) as total_earnings,
  COUNT(CASE WHEN r.reward_claimed = true THEN 1 END) as claimed_rewards
FROM referrals r
WHERE r.referral_status = 'active'
GROUP BY r.affiliate_code;
```

## 🚀 Deployment

### Database Migration
Run the updated migration script to create the new referral tables:

```bash
cd backend
node scripts/migrate.js
```

### Environment Variables
No additional environment variables are required for the referral system.

### Frontend Build
The frontend changes are automatically included in the build process.

## 🔍 Monitoring and Logging

The system logs all referral-related activities:

- Referral code capture
- Referral record creation
- Status updates
- Reward claims

Check the logs for referral system activity:
```bash
tail -f backend/logs/combined.log | grep -i referral
```

## 🎯 Future Enhancements

1. **Referral Code Generation**: Automatic generation of unique referral codes
2. **Referral Analytics**: Dashboard for affiliates to track performance
3. **Multi-level Referrals**: Support for referral chains
4. **Referral Validation**: Additional validation for referral codes
5. **Referral Expiration**: Time-based expiration of referral codes

## 🆘 Troubleshooting

### Common Issues

1. **Referral code not captured**: Check browser console for JavaScript errors
2. **Referral record not created**: Verify database migration completed successfully
3. **API errors**: Check backend logs for validation or database errors

### Debug Commands

```bash
# Check referral tables exist
psql -d i2u_payments -c "\dt referrals"

# Check referral columns
psql -d i2u_payments -c "\d users" | grep referral
psql -d i2u_payments -c "\d registrations" | grep referral

# Test referral API
curl -X GET "http://localhost:3001/api/v1/referrals/stats/TEST123"
```

## 📞 Support

For issues with the referral system:
1. Check the logs in `backend/logs/`
2. Run the test script: `node test-referral.js`
3. Verify database schema matches the migration
4. Check API endpoint responses

---

**Note**: This referral system is designed to work alongside your existing rewards backend. It provides the data structure and tracking needed for affiliate reward calculations and distribution.