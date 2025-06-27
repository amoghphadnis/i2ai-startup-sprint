import React from 'react';
import './PaymentButton.css';

const PaymentButton = () => {
  return (
    <div className="payment-options">
      <a
        href="https://payments.cashfree.com/forms/i2uAI"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="button-container">
          <img
            src="https://cashfree-checkoutcartimages-prod.cashfree.com/i2u18May251028%20(1)o8lilubgjcm0_prod.png"
            alt="Cashfree Logo"
            className="logo-container"
          />
          <div className="text-container">
            <div className="primary-text">
              Pay Now ₹ 999 Only!
            </div>
            <div className="secondary-text">
              Powered By Cashfree{' '}
              <img
                src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg"
                alt="Cashfree Icon"
              />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PaymentButton;
