# Backend API Implementation Guide for Cashfree Integration

This guide provides the backend implementation for the Cashfree payment integration. You'll need to implement these endpoints in your backend server (Node.js, Python, PHP, etc.).

## Prerequisites

1. **Cashfree SDK**: Install the appropriate Cashfree SDK for your backend language
2. **Environment Variables**: Configure your Cashfree credentials
3. **Database**: Ensure your database schema supports the required fields
4. **Webhook Handling**: Set up webhook endpoints for payment notifications

## Environment Variables

```bash
# Cashfree Configuration
CASHFREE_CLIENT_ID=your_cashfree_client_id
CASHFREE_CLIENT_SECRET=your_cashfree_secret_key
CASHFREE_ENVIRONMENT=sandbox  # or production

# Database
DATABASE_URL=your_database_connection_string

# Server
PORT=3000
NODE_ENV=development
```

## Node.js Implementation

### 1. Install Dependencies

```bash
npm install cashfree-sdk express cors helmet dotenv
```

### 2. Server Setup

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cashfree', require('./routes/cashfree'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3. Cashfree Routes

```javascript
// routes/cashfree.js
const express = require('express');
const router = express.Router();
const CashfreeService = require('../services/cashfreeService');

// Create Order
router.post('/create-order', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Validate order data
    const validation = CashfreeService.validateOrderData(orderData);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.errors.join(', ')
      });
    }

    // Create order in Cashfree
    const order = await CashfreeService.createOrder(orderData);
    
    res.json({
      success: true,
      data: {
        order_id: order.order_id,
        payment_session_id: order.payment_session_id,
        order_status: order.order_status
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get Order Status
router.get('/order-status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const orderStatus = await CashfreeService.getOrderStatus(orderId);
    
    res.json({
      success: true,
      data: orderStatus
    });
  } catch (error) {
    console.error('Error getting order status:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Process Payment Completion
router.post('/process-payment', async (req, res) => {
  try {
    const { orderId, paymentData } = req.body;
    
    // Process the payment completion
    const result = await CashfreeService.processPaymentCompletion(orderId, paymentData);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Webhook Handler
router.post('/webhook', async (req, res) => {
  try {
    const webhookData = req.body;
    
    // Verify webhook signature
    const isValid = CashfreeService.verifyWebhookSignature(req);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
    
    // Process webhook data
    await CashfreeService.processWebhook(webhookData);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### 4. Cashfree Service

```javascript
// services/cashfreeService.js
const { Cashfree } = require('cashfree-sdk');

class CashfreeService {
  constructor() {
    this.cashfree = new Cashfree({
      clientId: process.env.CASHFREE_CLIENT_ID,
      clientSecret: process.env.CASHFREE_CLIENT_SECRET,
      environment: process.env.CASHFREE_ENVIRONMENT
    });
  }

  // Validate order data
  validateOrderData(orderData) {
    const errors = [];
    
    if (!orderData.order_amount || orderData.order_amount <= 0) {
      errors.push('Invalid order amount');
    }
    
    if (!orderData.order_currency || orderData.order_currency !== 'INR') {
      errors.push('Only INR currency is supported');
    }
    
    if (!orderData.customer_details) {
      errors.push('Customer details are required');
    } else {
      const { customer_details } = orderData;
      if (!customer_details.customer_id || !customer_details.customer_name || 
          !customer_details.customer_email || !customer_details.customer_phone) {
        errors.push('All customer fields are required');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Create order in Cashfree
  async createOrder(orderData) {
    try {
      const orderPayload = {
        order_amount: orderData.order_amount,
        order_currency: orderData.order_currency,
        customer_details: orderData.customer_details,
        order_meta: {
          return_url: orderData.order_meta?.return_url || '',
          notify_url: orderData.order_meta?.notify_url || '',
          payment_methods: orderData.order_meta?.payment_methods || 'upi,card,wallet'
        },
        order_note: orderData.order_note || '',
        order_tags: orderData.order_tags || {}
      };

      const order = await this.cashfree.orders.create(orderPayload);
      
      // Store order in your database
      await this.storeOrderInDatabase(order, orderData);
      
      return order;
    } catch (error) {
      console.error('Error creating Cashfree order:', error);
      throw error;
    }
  }

  // Get order status
  async getOrderStatus(orderId) {
    try {
      const order = await this.cashfree.orders.get(orderId);
      return order;
    } catch (error) {
      console.error('Error getting order status:', error);
      throw error;
    }
  }

  // Process payment completion
  async processPaymentCompletion(orderId, paymentData) {
    try {
      // Update your database with payment completion
      await this.updatePaymentStatus(orderId, paymentData);
      
      // Send confirmation email/SMS
      await this.sendConfirmationNotification(paymentData);
      
      return { success: true };
    } catch (error) {
      console.error('Error processing payment completion:', error);
      throw error;
    }
  }

  // Verify webhook signature
  verifyWebhookSignature(req) {
    try {
      const signature = req.headers['x-webhook-signature'];
      const payload = JSON.stringify(req.body);
      
      // Implement signature verification logic
      // This is crucial for security
      return this.cashfree.webhooks.verifySignature(payload, signature);
    } catch (error) {
      console.error('Error verifying webhook signature:', error);
      return false;
    }
  }

  // Process webhook data
  async processWebhook(webhookData) {
    try {
      const { order_id, order_amount, reference_id, tx_msg, tx_status, payment_mode, tx_time } = webhookData;
      
      if (tx_status === 'SUCCESS') {
        // Payment successful
        await this.handleSuccessfulPayment(webhookData);
      } else if (tx_status === 'FAILED') {
        // Payment failed
        await this.handleFailedPayment(webhookData);
      }
      
      // Log webhook data
      await this.logWebhookData(webhookData);
      
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw error;
    }
  }

  // Database operations
  async storeOrderInDatabase(order, orderData) {
    // Implement your database logic here
    // Store order details, customer info, etc.
  }

  async updatePaymentStatus(orderId, paymentData) {
    // Update payment status in your database
  }

  async sendConfirmationNotification(paymentData) {
    // Send confirmation email/SMS
  }

  async handleSuccessfulPayment(webhookData) {
    // Handle successful payment
  }

  async handleFailedPayment(webhookData) {
    // Handle failed payment
  }

  async logWebhookData(webhookData) {
    // Log webhook data for debugging
  }
}

module.exports = new CashfreeService();
```

## Python Implementation

### 1. Install Dependencies

```bash
pip install fastapi uvicorn python-dotenv cashfree-sdk
```

### 2. FastAPI Implementation

```python
# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
from cashfree_sdk import Cashfree

load_dotenv()

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Cashfree
cashfree = Cashfree(
    client_id=os.getenv("CASHFREE_CLIENT_ID"),
    client_secret=os.getenv("CASHFREE_CLIENT_SECRET"),
    environment=os.getenv("CASHFREE_ENVIRONMENT", "sandbox")
)

# Models
class CustomerDetails(BaseModel):
    customer_id: str
    customer_name: str
    customer_email: str
    customer_phone: str

class OrderMeta(BaseModel):
    return_url: Optional[str] = ""
    notify_url: Optional[str] = ""
    payment_methods: Optional[str] = "upi,card,wallet"

class OrderData(BaseModel):
    order_amount: float
    order_currency: str
    customer_details: CustomerDetails
    order_meta: OrderMeta
    order_note: Optional[str] = ""
    order_tags: Optional[dict] = {}

# Routes
@app.post("/api/cashfree/create-order")
async def create_order(order_data: OrderData):
    try:
        # Validate order data
        if order_data.order_currency != "INR":
            raise HTTPException(status_code=400, detail="Only INR currency is supported")
        
        if order_data.order_amount <= 0:
            raise HTTPException(status_code=400, detail="Invalid order amount")
        
        # Create order in Cashfree
        order = cashfree.orders.create({
            "order_amount": order_data.order_amount,
            "order_currency": order_data.order_currency,
            "customer_details": order_data.customer_details.dict(),
            "order_meta": order_data.order_meta.dict(),
            "order_note": order_data.order_note,
            "order_tags": order_data.order_tags
        })
        
        return {
            "success": True,
            "data": {
                "order_id": order["order_id"],
                "payment_session_id": order["payment_session_id"],
                "order_status": order["order_status"]
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/cashfree/order-status/{order_id}")
async def get_order_status(order_id: str):
    try:
        order = cashfree.orders.get(order_id)
        return {
            "success": True,
            "data": order
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/cashfree/webhook")
async def webhook_handler(webhook_data: dict):
    try:
        # Verify webhook signature
        # Implement signature verification logic
        
        # Process webhook data
        if webhook_data.get("tx_status") == "SUCCESS":
            # Handle successful payment
            pass
        elif webhook_data.get("tx_status") == "FAILED":
            # Handle failed payment
            pass
        
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## PHP Implementation

### 1. Install Dependencies

```bash
composer require cashfree/cashfree-php guzzlehttp/guzzle
```

### 2. PHP Implementation

```php
<?php
// index.php
require_once 'vendor/autoload.php';

use Cashfree\Cashfree;
use GuzzleHttp\Client;

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Initialize Cashfree
$cashfree = new Cashfree([
    'client_id' => $_ENV['CASHFREE_CLIENT_ID'],
    'client_secret' => $_ENV['CASHFREE_CLIENT_SECRET'],
    'environment' => $_ENV['CASHFREE_ENVIRONMENT']
]);

// Handle CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Route handling
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

switch ($path) {
    case '/api/cashfree/create-order':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            createOrder();
        }
        break;
        
    case (preg_match('/^\/api\/cashfree\/order-status\/(.+)$/', $path, $matches) ? true : false):
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            getOrderStatus($matches[1]);
        }
        break;
        
    case '/api/cashfree/webhook':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            handleWebhook();
        }
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}

function createOrder() {
    global $cashfree;
    
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate input
        if (!validateOrderData($input)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid order data']);
            return;
        }
        
        // Create order
        $order = $cashfree->orders->create($input);
        
        echo json_encode([
            'success' => true,
            'data' => [
                'order_id' => $order['order_id'],
                'payment_session_id' => $order['payment_session_id'],
                'order_status' => $order['order_status']
            ]
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

function getOrderStatus($orderId) {
    global $cashfree;
    
    try {
        $order = $cashfree->orders->get($orderId);
        
        echo json_encode([
            'success' => true,
            'data' => $order
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

function handleWebhook() {
    try {
        $webhookData = json_decode(file_get_contents('php://input'), true);
        
        // Verify webhook signature
        // Implement signature verification logic
        
        // Process webhook data
        if ($webhookData['tx_status'] === 'SUCCESS') {
            // Handle successful payment
        } elseif ($webhookData['tx_status'] === 'FAILED') {
            // Handle failed payment
        }
        
        echo json_encode(['success' => true]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}

function validateOrderData($data) {
    if (!isset($data['order_amount']) || $data['order_amount'] <= 0) {
        return false;
    }
    
    if (!isset($data['order_currency']) || $data['order_currency'] !== 'INR') {
        return false;
    }
    
    if (!isset($data['customer_details'])) {
        return false;
    }
    
    $required = ['customer_id', 'customer_name', 'customer_email', 'customer_phone'];
    foreach ($required as $field) {
        if (!isset($data['customer_details'][$field])) {
            return false;
        }
    }
    
    return true;
}
?>
```

## Testing Your Backend

### 1. Test Order Creation

```bash
curl -X POST http://localhost:3000/api/cashfree/create-order \
  -H "Content-Type: application/json" \
  -d '{
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
    "order_note": "Test order",
    "order_tags": {
      "user_category": "startup-founder"
    }
  }'
```

### 2. Test Order Status

```bash
curl http://localhost:3000/api/cashfree/order-status/order_1234567890
```

## Security Considerations

1. **Environment Variables**: Never commit credentials to version control
2. **Webhook Verification**: Always verify webhook signatures
3. **Input Validation**: Validate all incoming data
4. **HTTPS**: Use HTTPS in production
5. **Rate Limiting**: Implement rate limiting for API endpoints
6. **Logging**: Log all payment-related activities
7. **Error Handling**: Don't expose sensitive information in error messages

## Deployment

1. **Environment**: Set production environment variables
2. **HTTPS**: Enable SSL/TLS certificates
3. **Monitoring**: Set up application monitoring
4. **Backup**: Regular database backups
5. **Updates**: Keep dependencies updated

## Support

For backend implementation issues:
- Check the Cashfree SDK documentation for your language
- Verify environment variables and credentials
- Test with sandbox environment first
- Check server logs for detailed error messages
