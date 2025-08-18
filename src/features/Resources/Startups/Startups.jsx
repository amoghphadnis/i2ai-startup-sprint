import React from 'react';
import ContentPage from '@/components/layout/ContentPage';
import { startupsPlans } from './startupsPlans';
import { startupsFAQ } from './startupsFAQ';
import './Startups.css';

export default function Startups() {

  const hero = {
    title: "Why Early-Stage Startup Leaders Should Register for the World Startup Sprint?",
    subtitle: "Equip your founding team with pragmatic valuation tools, real-time interactive calculators, and tactical negotiation insights—so you can secure the funding you deserve and accelerate from idea to unicorn while defending your position against investor skepticism.",
    badges: [
      { icon: "🚀", text: "AI-Powered Tools" },
      { icon: "💡", text: "Expert Mentorship" },
      { icon: "💰", text: "Funding Access" }
    ],
    ctas: [
      {
        label: "Join the Startup Waitlist — ₹999",
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
      title: "Master Real-World Valuation Methods with Interactive Calculator",
      intro: "World Startup Sprint provides access to an interactive valuation calculator using five industry-standard methodologies that reflect current market conditions:",
      content: (
        <div className="startup-benefits">
          <ul className="benefits-list">
            <li><strong>Comparable Company Analysis (Comps):</strong> Benchmark against peers at 5–10× next year's projected revenue</li>
            <li><strong>Discounted Cash Flow (DCF):</strong> Apply realistic discount rates reflecting early-stage risk and market conditions</li>
            <li><strong>Venture Capital (VC) Method:</strong> Model exit value and investors' expected 7–8× ROI</li>
            <li><strong>Scorecard Valuation Method:</strong> Account for market potential, AI-driven innovation, and team strength premium</li>
            <li><strong>Berkus Method:</strong> Value key components including technology, opportunity, and team execution</li>
          </ul>
          <p className="benefits-description">
            Unlike static estimates, this hands-on tool lets you input your own revenue projections, risk parameters, and market comparables, adjusting key variables on the fly to see funding scenarios in real time. Generate polished charts and summary slides instantly for investor conversations, ensuring you understand the true economics of your venture.
          </p>
        </div>
      )
    },
    {
      title: "Navigate Market Realities with Current Data",
      intro: "Stay ahead of the curve with real-time market insights and current funding data.",
      content: (
        <div className="market-data">
          <div className="market-section">
            <h4>AI Startup Funding Surge</h4>
            <p>
              AI startups raised $104.3 billion in the U.S. in the first half of 2025, nearly matching all of 2024, with almost two-thirds of all U.S. venture funding going to AI. Current revenue multiples for tech startups range from 10×–25×, while AI startups can command even higher premiums due to scalability and innovation potential.
            </p>
          </div>
          <div className="market-examples">
            <h4>Real Examples from 2025:</h4>
            <ul>
              <li><strong>OpenAI</strong> raised a record $40 billion in March 2025</li>
              <li><strong>Thinking Machines Lab</strong> (led by Mira Murati) raised $2 billion at a $10 billion valuation</li>
              <li><strong>Glean</strong> raised $150 million at a $7.2 billion valuation</li>
              <li><strong>Anysphere</strong> (maker of Cursor) reached a $9.9 billion valuation with explosive ARR growth</li>
            </ul>
            <p>
              These examples demonstrate that well-prepared founders who know their numbers can secure extraordinary valuations when they present compelling, data-driven cases.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Tactical Negotiation Insights from Market Pioneers",
      intro: "Learn from the best and understand the art of negotiation in startup funding.",
      content: (
        <div className="negotiation-insights">
          <div className="historical-precedent">
            <h4>Historical Precedent:</h4>
            <p>
              Steve Jobs faced over 300 VC rejections for Apple, including dismissals from Kleiner Perkins and Tim Draper, yet persisted to secure funding by demonstrating clear value propositions. Similarly, Pandora's co-founder Tim Westergren held only 2.39% before IPO after extensive dilution, but the company ultimately succeeded.
            </p>
          </div>
          <div className="current-dynamics">
            <h4>Current Market Dynamics:</h4>
            <p>
              While investors may initially scoff at early-stage valuations, founders who command clear, defensible valuations secure better terms. Recent examples show that:
            </p>
            <ul>
              <li>Startups with high revenue multiples and fast growth attract top talent and premium valuations</li>
              <li>Y Combinator companies have raised $85 billion from the best investors globally, demonstrating the power of preparation and community</li>
              <li>Successful negotiation involves understanding that investors want to mitigate risk while maximizing returns</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Comprehensive Support Framework",
      intro: "Get access to a complete ecosystem designed to accelerate your startup's growth.",
      content: (
        <div className="support-framework">
          <div className="framework-item">
            <h4>Dynamic Leaderboard System</h4>
            <p>
              Your startup joins a real-time leaderboard across seven growth phases (Idea → Pre-Seed → Seed → Series A/B/C → Unicorn), allowing you to benchmark against peers and track your progress as you pivot and iterate.
            </p>
          </div>
          <div className="framework-item">
            <h4>AI-Powered Business Intelligence</h4>
            <p>
              Access Business Native Agentic AI framework providing strategic prompts for product pivots, go-to-market plans, and operational roadmaps tailored for the AI era.
            </p>
          </div>
          <div className="framework-item">
            <h4>Negotiation Playbooks</h4>
            <p>
              Step-by-step scripts and pitch-deck templates to defend your valuation subtly and confidently, based on proven frameworks from successful unicorn founders.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Why This Matters More Than Ever",
      intro: "Understand the critical importance of proper preparation in today's competitive landscape.",
      content: (
        <div className="why-matters">
          <div className="democratized-ai">
            <h4>Democratized AI Era</h4>
            <p>
              The cost of building ventures has decreased while the bar for differentiation has risen. Unlike generic accelerators or mentors who lack repeatable success formulas, World Startup Sprint delivers AI-first growth playbooks proven for data-driven product development and scalable monetization.
            </p>
          </div>
          <div className="market-context">
            <h4>Market Context</h4>
            <p>
              With startup funding becoming more selective yet reaching record highs for AI companies, founders need every advantage. Current market data shows:
            </p>
            <ul>
              <li>Tech startup revenue multiples averaging 9.20× compared to 1.52× for IT services</li>
              <li>Early-stage funding rounds becoming larger but more competitive</li>
              <li>Successful founders increasingly using sophisticated valuation models and negotiation tactics</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Next Steps to Secure Your Competitive Advantage",
      intro: "Take action now to position your startup for success.",
      content: (
        <div className="next-steps">
          <ul className="steps-list">
            <li><strong>Register Today</strong> for immediate access to the interactive valuation calculator</li>
            <li><strong>Schedule Your Valuation Workshop</strong> with personalized analysis</li>
            <li><strong>Join Your Cohort</strong> and start implementing proven negotiation strategies</li>
            <li><strong>Access AI Insights</strong> to optimize your funding approach</li>
          </ul>
          <p className="steps-conclusion">
            Don't let undervaluation or poor negotiation dilute your vision. In an era where AI unicorns are minted regularly but competition is fierce, arm yourself with real-time analytics, tactical negotiation savvy, and community support to secure the funding your startup truly deserves.
          </p>
        </div>
      )
    },
    {
      title: "🎁 Exclusive Rewards for Early Adopters",
      intro: "As a token of appreciation for being one of our early adopters, we are offering exclusive rewards to the first 10% of registrants.",
      content: (
        <div className="exclusive-rewards">
          <div className="rewards-table">
            <div className="reward-tier">
              <div className="tier-header">The Earliest 1% Registrants*</div>
              <div className="tier-reward">Pro Max Ultra Subscription worth ₹100000/Year FREE for the first year</div>
              <div className="tier-description">Ultimate startup domination package</div>
            </div>
            <div className="reward-tier">
              <div className="tier-header">The Next 2% Registrants*</div>
              <div className="tier-reward">Professional Subscription worth ₹60000/Year FREE for the first year</div>
              <div className="tier-description">Complete startup building solution</div>
            </div>
            <div className="reward-tier">
              <div className="tier-header">The Next 3% Registrants*</div>
              <div className="tier-reward">Advanced Subscription worth ₹36000/Year FREE for the first year</div>
              <div className="tier-description">Expert-level startup development</div>
            </div>
            <div className="reward-tier">
              <div className="tier-header">The Next 4% Registrants*</div>
              <div className="tier-reward">Basic Subscription worth ₹24000/Year FREE for the first year</div>
              <div className="tier-description">Professional startup identity building</div>
            </div>
            <div className="reward-tier">
              <div className="tier-header">The Next 90% Registrants*</div>
              <div className="tier-reward">Beginner Subscription worth ₹16000/Year FREE for the first year</div>
              <div className="tier-description">Startup acceleration starter</div>
            </div>
          </div>
          <div className="rewards-notice">
            <p>✅ <strong>Even if you miss the top tier, you still get at least ₹16,000 worth of value—for just ₹999!</strong></p>
            <p>🚀 <strong>Beat the system:</strong> Pay a little extra to become the highest-paying registrant of the day and jump the queue for top-tier rewards!</p>
          </div>
        </div>
      )
    }
  ];

  const payment = {
    amount: 999,
    displayText: {
      heading: "🚀 Join i2u.ai Startups — ₹999 Waitlist for Premium Tools & Rewards",
      subheading: "Access interactive valuation calculators, market intelligence, and negotiation frameworks. Limited early-adopter benefits."
    }
  };

  // Meta information for SEO
  const meta = {
    title: "World Startup Sprint — i2u.ai | Master Valuation & Negotiation for AI Startups",
    description: "Join World Startup Sprint to master real-world valuation methods, navigate market realities, and secure tactical negotiation insights. Get interactive calculators and proven frameworks for ₹999.",
    keywords: "World Startup Sprint, startup valuation, AI startup funding, negotiation tactics, startup acceleration, valuation calculator, startup funding, AI startups",
    canonical: "https://i2u.ai/resources/startups",
    ogTitle: "World Startup Sprint — i2u.ai | Master Valuation & Negotiation for AI Startups",
    ogDescription: "Join World Startup Sprint to master real-world valuation methods, navigate market realities, and secure tactical negotiation insights.",
    ogImage: "https://i2u.ai/assets/startups-og-image.jpg",
    twitterTitle: "World Startup Sprint — i2u.ai | Master Valuation & Negotiation for AI Startups",
    twitterDescription: "Join World Startup Sprint to master real-world valuation methods, navigate market realities, and secure tactical negotiation insights.",
    twitterImage: "https://i2u.ai/assets/startups-og-image.jpg"
  };

  const references = [
    {
      title: "Sources & References",
      intro: "All data and insights are backed by credible sources and industry research.",
      content: (
        <div className="sources-references">
          <div className="sources-grid">
            <div className="source-category">
              <h4>AI Startup Funding & Market Data</h4>
              <ul>
                <li>AI Startup Funding Surge 2025 - Reuters Analysis</li>
                <li>Latest VC Investment Deals in AI Startups - Crescendo AI News</li>
                <li>Startup Valuation Multiples Across Industries - Techpoint Africa</li>
                <li>Understanding the 37 Most Valuable Private Startups - Nextplay</li>
                <li>US AI Startups See Funding Surge - Reuters</li>
              </ul>
            </div>
            <div className="source-category">
              <h4>Negotiation & Valuation Insights</h4>
              <ul>
                <li>Diluted Founders: Examples and Negotiation Insights - Investopedia</li>
                <li>Steve Jobs' Fundraising Journey and Negotiation Lessons - Xartup</li>
                <li>Steve Jobs' Journey from Rejection to Revolution - LinkedIn</li>
                <li>How to Justify Your Startup's Valuation - Republic Europe</li>
                <li>Founder's Guide to Winning Negotiations - LinkedIn</li>
                <li>5 Startup Negotiation Mistakes and How to Avoid Them - LinkedIn</li>
              </ul>
            </div>
            <div className="source-category">
              <h4>Startup Funding & Development</h4>
              <ul>
                <li>Y Combinator Success Stories and Network Benefits</li>
                <li>The Stages of Startup Funding: From Pre-Seed to IPO - OpenVC</li>
                <li>Pre-Seed Funding Guide for Early-Stage Founders - Carta</li>
                <li>How to Negotiate Startup Funding - Accounting Department</li>
                <li>Pre-Seed vs Seed Funding Round - Brex</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <ContentPage
      hero={hero}
      sections={sections}
      plans={startupsPlans}
      payment={payment}
      faq={startupsFAQ}
      meta={meta}
      references={references}
    />
  );
}