import React from 'react';
import ContentPage from '@/components/layout/ContentPage';
import { investorsPlans } from './investorsPlans';
import { investorsFAQ } from './investorsFAQ';

export default function Investors() {
  const meta = {
    title: "Investors — i2u.ai | Connect with High-Potential AI Startups",
    description: "Join i2u.ai's Investors Network — evaluate curated AI startups, access premium market intelligence and exclusive dealflow. Apply to join.",
    canonical: "https://i2u.ai/resources/investors",
    ogTitle: "Investors — i2u.ai | Connect with High-Potential AI Startups",
    ogDescription: "Join i2u.ai's Investors Network — evaluate curated AI startups, access premium market intelligence and exclusive dealflow. Apply to join.",
    keywords: "AI investors, startup investment, venture capital, angel investors, AI startup funding, dealflow, market intelligence, startup evaluation",
    ogImage: "https://i2u.ai/assets/investors-og-image.jpg",
    twitterTitle: "Investors — i2u.ai | Connect with High-Potential AI Startups",
    twitterDescription: "Join i2u.ai's Investors Network — evaluate curated AI startups, access premium market intelligence and exclusive dealflow. Apply to join.",
    twitterImage: "https://i2u.ai/assets/investors-og-image.jpg"
  };

  const hero = {
    title: "Join i2u.ai Investors — Access Curated AI Dealflow & Market Intelligence",
    subtitle: "Connect with vetted AI startups, use AI-native evaluation tools, and join a private network of active angel and institutional investors. Join the waitlist for ₹101.",
    badges: [
      { icon: "🎯", text: "Curated Dealflow" },
      { icon: "📊", text: "Evaluation Tools" },
      { icon: "🤝", text: "Investor-Only Events" }
    ],
    ctas: [
      {
        label: "Join the Investor Waitlist — ₹101",
        onClick: () => {
          const paymentSection = document.getElementById('googlePaySection');
          if (paymentSection) {
            paymentSection.scrollIntoView({ behavior: 'smooth' });
          }
        },
        variant: "default"
      }
    ]
  };

  const sections = [
    {
      title: "Why Investors Join i2u.ai",
      intro: "i2u.ai provides investors with curated AI startup dealflow, real-time analytics, and tools to evaluate teams, product-market fit, and ARR projections. Get early access to investment-ready startups and collaborate with other strategic investors.",
      content: (
        <div className="investor-benefits">
          <ul className="benefits-list">
            <li>Curated introductions to screened startups and founders</li>
            <li>Access to advanced valuation & due-diligence templates</li>
            <li>Private investor rounds, demo days, and pitch clinics</li>
            <li>Dashboard with AI-driven signals and cohort-level benchmarking</li>
            <li>Priority access to investment syndicates and LP reporting tools</li>
          </ul>
        </div>
      )
    },
    {
      title: "How Investor Access Works",
      intro: "Our streamlined process ensures you get access to the best opportunities while maintaining the highest standards of due diligence.",
      content: (
        <div className="investor-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Join Waitlist</h3>
              <p>Join the waitlist for ₹101 and verify your accreditation (if required).</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Review Startups</h3>
              <p>Review curated startup profiles and signal interest in opportunities.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Participate & Invest</h3>
              <p>Participate in private rounds, syndicates, or mentor-investor pairings.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Exclusive Early Adopter Rewards",
      intro: "First 10% of investor registrants receive exclusive benefits and premium access to accelerate their investment strategy.",
      content: (
        <div className="investor-rewards">
          <div className="rewards-notice">
            <p>🎁 <strong>Early Bird Special:</strong> Join now and unlock premium access to the best AI startup dealflow!</p>
          </div>
        </div>
      )
    }
  ];

  const payment = {
    amount: 101,
    displayText: {
      heading: "Join i2u.ai Investors — ₹101 Waitlist for Premium Dealflow & Tools",
      subheading: "Access curated AI startups, advanced evaluation tools, and exclusive investor events. Limited early-adopter benefits."
    }
  };

  return (
    <ContentPage
      hero={hero}
      sections={sections}
      plans={investorsPlans}
      payment={payment}
      faq={investorsFAQ}
      meta={meta}
    />
  );
}
