import React from 'react';
import ContentPage from '@/components/layout/ContentPage';
import { mentorsPlans } from './mentorsPlans';
import { mentorsFAQ } from './mentorsFAQ';

export default function Mentors() {
  const meta = {
    title: "Mentors — i2u.ai | Join the AI Startup Mentor Network",
    description: "Join i2u.ai's Mentor Program — mentor top AI startups, access market intelligence, and claim exclusive mentor benefits and rewards. Register now.",
    canonical: "https://i2u.ai/resources/mentors",
    ogTitle: "Mentors — i2u.ai | Join the AI Startup Mentor Network",
    ogDescription: "Join i2u.ai's Mentor Program — mentor top AI startups, access market intelligence, and claim exclusive mentor benefits and rewards. Register now.",
    keywords: "AI mentors, startup mentoring, mentor network, AI startup guidance, mentor rewards, startup coaching, business mentorship",
    ogImage: "https://i2u.ai/assets/mentors-og-image.jpg",
    twitterTitle: "Mentors — i2u.ai | Join the AI Startup Mentor Network",
    twitterDescription: "Join i2u.ai's Mentor Program — mentor top AI startups, access market intelligence, and claim exclusive mentor benefits and rewards. Register now.",
    twitterImage: "https://i2u.ai/assets/mentors-og-image.jpg"
  };

  const hero = {
    title: "Become a Mentor at i2u.ai — Shape the Next Generation of AI Startups",
    subtitle: "Join a curated mentor network, access top-tier market intelligence, host office hours, and earn rewards — register on the waitlist for just ₹101.",
    badges: [
      { icon: "🎯", text: "Curated Mentor Network" },
      { icon: "🛠️", text: "Exclusive Market Tools" },
      { icon: "🎁", text: "Mentor Rewards & Early Access" }
    ],
    ctas: [
      {
        label: "Join the Mentor Waitlist — ₹101",
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
      title: "Why Mentors Join i2u.ai",
      intro: "At i2u.ai we match experienced mentors with promising AI startups. Mentor founders across product, GTM, fundraising, and technology — while getting access to premium tools, curated deal flow, and mentorship rewards. Whether you coach part-time or lead cohorts, i2u.ai helps you scale your influence and impact.",
      content: (
        <div className="mentor-benefits">
          <ul className="benefits-list">
            <li>Get early access to high-potential AI startups and founder dashboards.</li>
            <li>Advanced market intelligence and valuation tools for better guidance.</li>
            <li>Host video office hours and private mentoring cohorts.</li>
            <li>Earn i2u.ai Points, referral bonuses, and exclusive event passes.</li>
            <li>Contribute to the mentor leaderboard and unlock premium subscription credits.</li>
          </ul>
        </div>
      )
    },
    {
      title: "How Mentoring on i2u.ai Works",
      intro: "Our streamlined process makes it easy to start mentoring and earning rewards.",
      content: (
        <div className="mentor-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Apply & Verify</h3>
              <p>Join the mentor waitlist (₹101). We'll verify your profile and match you with startups aligned to your expertise.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Match & Schedule</h3>
              <p>We surface startups matching your expertise and help you schedule mentoring sessions.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Mentor & Earn</h3>
              <p>Host sessions, provide feedback, earn points and rewards.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Exclusive Early Adopter Rewards",
      intro: "First 10% of mentor registrants are eligible for complimentary subscriptions (Beginner → Pro Max Ultra) for the first year. Daily 'beat the process' upgrades let active contributors win higher tiers.",
      content: (
        <div className="mentor-rewards">
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
      heading: "Join i2u.ai Mentors — ₹101 Waitlist for Premium Rewards",
      subheading: "Mentor promising AI startups, access premium tools, and earn rewards. Limited early-adopter benefits."
    }
  };

  return (
    <ContentPage
      hero={hero}
      sections={sections}
      plans={mentorsPlans}
      payment={payment}
      faq={mentorsFAQ}
      meta={meta}
    />
  );
}
