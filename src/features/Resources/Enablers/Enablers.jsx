import React from 'react';
import ContentPage from '@/components/layout/ContentPage';
import { enablersPlans } from './enablersPlans';
import { enablersFAQ } from './enablersFAQ';

export default function Enablers() {
  const meta = {
    title: "Enablers — i2u.ai | Build Startup Ecosystems & Accelerate Growth",
    description: "Join i2u.ai Enablers — support startups, run programs, access AI tools & exclusive rewards. Join the waitlist for ₹101.",
    canonical: "https://i2u.ai/resources/enablers",
    ogTitle: "Enablers — i2u.ai | Build Startup Ecosystems & Accelerate Growth",
    ogDescription: "Join i2u.ai Enablers — support startups, run programs, access AI tools & exclusive rewards. Join the waitlist for ₹101.",
    keywords: "startup enablers, incubators, accelerators, ecosystem builders, program management, portfolio insights, startup support, cohort management",
    ogImage: "https://i2u.ai/assets/enablers-og-image.jpg",
    twitterTitle: "Enablers — i2u.ai | Build Startup Ecosystems & Accelerate Growth",
    twitterDescription: "Join i2u.ai Enablers — support startups, run programs, access AI tools & exclusive rewards. Join the waitlist for ₹101.",
    twitterImage: "https://i2u.ai/assets/enablers-og-image.jpg"
  };

  const hero = {
    title: "Become an Enabler at i2u.ai — Empower Startups at Scale",
    subtitle: "Join incubators, accelerators, and ecosystem builders to access portfolio tools, program management features, and early-adopter rewards — waitlist ₹101.",
    badges: [
      { icon: "🏗️", text: "Program Management" },
      { icon: "📊", text: "Portfolio Insights" },
      { icon: "🎁", text: "Early-Adopter Rewards" }
    ],
    ctas: [
      {
        label: "Join the Enabler Waitlist — ₹101",
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
      title: "Why Enablers Join i2u.ai",
      intro: "i2u.ai helps incubators, accelerators, and ecosystem enablers scale startup outcomes. Manage cohorts, measure portfolio progress with AI insights, run enablement programs, and surface high-potential startups to mentors and investors.",
      content: (
        <div className="enabler-benefits">
          <ul className="benefits-list">
            <li>Centralized portfolio dashboard with cohort and startup KPIs</li>
            <li>AI-powered startup scoring for prioritization and follow-up</li>
            <li>Program templates, curriculum modules, and cohort scheduling</li>
            <li>Private networking channels for alumni and corporate partners</li>
            <li>i2u.ai Points, referral incentives, and early-access subscription rewards</li>
          </ul>
        </div>
      )
    },
    {
      title: "How Enabler Access Works",
      intro: "Our streamlined process makes it easy to start enabling startups and scaling your impact.",
      content: (
        <div className="enabler-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Join Waitlist</h3>
              <p>Join the waitlist for ₹101 and create your enabler profile.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Get Matched</h3>
              <p>Get lead introductions and program invites based on your expertise.</p>
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
      intro: "First 10% of enabler signups get a complimentary subscription (Beginner → Pro Max Ultra) for the first year. Daily 'upgrade' opportunities let active programs win premium tiers.",
      content: (
        <div className="enabler-rewards">
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
      heading: "Join i2u.ai Enablers — ₹101 Waitlist for Program Tools & Rewards",
      subheading: "Manage cohorts, access AI portfolio insights, and claim early-adopter subscription upgrades."
    }
  };

  return (
    <ContentPage
      hero={hero}
      sections={sections}
      plans={enablersPlans}
      payment={payment}
      faq={enablersFAQ}
      meta={meta}
    />
  );
}
