import React from 'react';
import ContentPage from '@/components/layout/ContentPage';
import { facilitatorsPlans } from './facilitatorsPlans';
import { facilitatorsFAQ } from './facilitatorsFAQ';

export default function Facilitators() {
  const meta = {
    title: "Facilitators — i2u.ai | Service Providers & Startup Consultants",
    description: "Join i2u.ai Facilitators — provide services to startups, run workshops, get leads, and access AI tools. Join the ₹101 waitlist for early rewards.",
    canonical: "https://i2u.ai/resources/facilitators",
    ogTitle: "Facilitators — i2u.ai | Service Providers & Startup Consultants",
    ogDescription: "Join i2u.ai Facilitators — provide services to startups, run workshops, get leads, and access AI tools. Join the ₹101 waitlist for early rewards.",
    keywords: "startup facilitators, service providers, consultants, workshops, startup services, product discovery, GTM strategy, growth sprints, startup consulting",
    ogImage: "https://i2u.ai/assets/facilitators-og-image.jpg",
    twitterTitle: "Facilitators — i2u.ai | Service Providers & Startup Consultants",
    twitterDescription: "Join i2u.ai Facilitators — provide services to startups, run workshops, get leads, and access AI tools. Join the ₹101 waitlist for early rewards.",
    twitterImage: "https://i2u.ai/assets/facilitators-og-image.jpg"
  };

  const hero = {
    title: "Become a Facilitator at i2u.ai — Serve Startups, Grow Your Practice",
    subtitle: "Help founders ship products, run workshops, and provide services — get lead generation, collaboration tools, and early-adopter rewards. Join the waitlist for ₹101.",
    badges: [
      { icon: "🛠️", text: "Workshop Tools" },
      { icon: "🤝", text: "Service Marketplace" },
      { icon: "🎁", text: "Early-Adopter Rewards" }
    ],
    ctas: [
      {
        label: "Join the Facilitator Waitlist — ₹101",
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
      title: "Why Facilitators Join i2u.ai",
      intro: "i2u.ai connects product teams, consultants, agencies and service providers with early-stage startups. As a Facilitator you can run workshops, offer paid services, showcase case studies, and access AI-powered tools to diagnose product-market fit and scale your offerings.",
      content: (
        <div className="facilitator-benefits">
          <ul className="benefits-list">
            <li>Marketplace exposure and lead routing to vetted startups</li>
            <li>Workshop & template library (product discovery, GTM, growth sprints)</li>
            <li>AI-powered diagnostic tools to assess product fit and gap analysis</li>
            <li>Collaboration workspaces and private sessions with founder teams</li>
            <li>i2u.ai Points, referral credits, and early-adopter subscription upgrades</li>
            <li>Billing & scheduling integrations to manage client bookings</li>
          </ul>
        </div>
      )
    },
    {
      title: "How Facilitator Access Works",
      intro: "Our streamlined process makes it easy to start facilitating and earning rewards.",
      content: (
        <div className="facilitator-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Join Waitlist</h3>
              <p>Register for ₹101 and create your facilitator profile.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Get Matched</h3>
              <p>Get lead introductions and workshop invites based on your expertise.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Deliver & Earn</h3>
              <p>Run sessions, publish case studies, and earn points, referrals, and paid engagements.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Early-Adopter Rewards",
      intro: "First 10% of facilitator registrants receive complimentary subscription upgrades (Beginner → Pro Max Ultra) for the first year. We also run a daily 'upgrade opportunity' where top contributors or highest early-paying registrants may receive premium rewards.",
      content: (
        <div className="facilitator-rewards">
          <div className="rewards-notice">
            <p>🎁 <strong>Early Bird Special:</strong> Join now and unlock premium subscription upgrades for your first year!</p>
          </div>
        </div>
      )
    }
  ];

  const payment = {
    amount: 101,
    displayText: {
      heading: "Join i2u.ai Facilitators — ₹101 Waitlist for Service Tools & Rewards",
      subheading: "Provide services to startups, run workshops, and access AI tools. Limited early-adopter benefits."
    }
  };

  return (
    <ContentPage
      hero={hero}
      sections={sections}
      plans={facilitatorsPlans}
      payment={payment}
      faq={facilitatorsFAQ}
      meta={meta}
    />
  );
}
