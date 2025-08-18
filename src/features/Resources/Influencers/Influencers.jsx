import React from 'react';
import ContentPage from '@/components/layout/ContentPage';
import { influencersPlans } from './influencersPlans';
import { influencersFAQ } from './influencersFAQ';

export default function Influencers() {
  const meta = {
    title: "Influencers — i2u.ai | Create & Amplify AI Stories",
    description: "Join i2u.ai Influencers — amplify AI startups, create content, access creator tools and rewards. Join the waitlist for ₹101.",
    canonical: "https://i2u.ai/resources/influencers",
    ogTitle: "Influencers — i2u.ai | Create & Amplify AI Stories",
    ogDescription: "Join i2u.ai Influencers — amplify AI startups, create content, access creator tools and rewards. Join the waitlist for ₹101.",
    keywords: "AI influencers, content creators, AI startups, creator tools, brand collaborations, sponsored content, affiliate marketing",
    ogImage: "https://i2u.ai/assets/influencers-og-image.jpg",
    twitterTitle: "Influencers — i2u.ai | Create & Amplify AI Stories",
    twitterDescription: "Join i2u.ai Influencers — amplify AI startups, create content, access creator tools and rewards. Join the waitlist for ₹101.",
    twitterImage: "https://i2u.ai/assets/influencers-og-image.jpg"
  };

  const hero = {
    title: "Become an Influencer at i2u.ai — Amplify AI Startups",
    subtitle: "Create content, run creator-campaigns, and unlock creator tools & rewards. Join the waitlist for ₹101.",
    badges: [
      { icon: "🎨", text: "Creator Toolkit" },
      { icon: "🤝", text: "Brand Collabs" },
      { icon: "💎", text: "Content Credits" }
    ],
    ctas: [
      {
        label: "Join the Influencer Waitlist — ₹101",
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
      title: "Why Influencers Join i2u.ai",
      intro: "i2u.ai helps creators and influencers discover high-quality AI startups to spotlight, provides creator tooling for content publishing, and connects influencers to exclusive events and sponsored campaigns.",
      content: (
        <div className="influencer-benefits">
          <ul className="benefits-list">
            <li>Creator toolkit: templates, AI-assisted content drafts, and distribution tips</li>
            <li>Early access to startup stories, product demos, and interview opportunities</li>
            <li>Paid collaboration credits, sponsored content opportunities, and affiliate rewards</li>
            <li>Analytics dashboard for tracking engagement and referral performance</li>
            <li>i2u.ai Points and VIP passes to pitch days and demo events</li>
          </ul>
        </div>
      )
    },
    {
      title: "How Influencer Access Works",
      intro: "Our streamlined process makes it easy to start creating content and earning rewards.",
      content: (
        <div className="influencer-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Join Waitlist</h3>
              <p>Join waitlist (₹101) and set up creator profile.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Get Matched</h3>
              <p>Get matched with startups & campaigns.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Publish & Earn</h3>
              <p>Publish content, track impact, and earn rewards.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Rewards & Early-Access",
      intro: "Top early influencers can win free subscription upgrades (Beginner → Pro Max Ultra) for a year. High referrers and top-performing creators are eligible for sponsored campaigns and bonus points.",
      content: (
        <div className="influencer-rewards">
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
      heading: "Join i2u.ai Influencers — ₹101 Waitlist for Creator Tools & Campaigns",
      subheading: "Amplify AI startups, access creator tooling, and monetize collaborations."
    }
  };

  return (
    <ContentPage
      hero={hero}
      sections={sections}
      plans={influencersPlans}
      payment={payment}
      faq={influencersFAQ}
      meta={meta}
    />
  );
}
