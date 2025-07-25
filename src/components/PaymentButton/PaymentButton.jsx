import React from 'react';
import './PaymentButton.css';
import logo from '../../assets/i2u_new(White).png'; // your i2u.ai logo

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
            src={logo}
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
