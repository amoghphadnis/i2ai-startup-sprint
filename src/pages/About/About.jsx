import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiTarget, FiAward, FiTrendingUp, FiGlobe, FiZap } from 'react-icons/fi';
import { Button } from '../../components/ui/button';
import './About.css';

const About = () => {
  console.log('About component is rendering'); // Debug log

  const highlights = [
    {
      icon: FiUsers,
      title: "1.2M+ Global Community",
      description: "LinkedIn community members connecting founders with investors"
    },
    {
      icon: FiTarget,
      title: "98-Point Evaluation",
      description: "Multi-layered system for rigorous startup assessment"
    },
    {
      icon: FiTrendingUp,
      title: "78.4% Growth Velocity",
      description: "AI unicorns demonstrating exceptional annual growth rates"
    },
    {
      icon: FiGlobe,
      title: "Delaware C Corp",
      description: "EIN: 36-5143244 - Investor-friendly legal structure"
    },
    {
      icon: FiZap,
      title: "Perfect Timing (9/10)",
      description: "Positioned at the cusp of the AI RenAIssance"
    },
    {
      icon: FiAward,
      title: "Strategic Intervention",
      description: "Surgical strike against preventable startup failures"
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            The RenAIssance is Here
          </h1>
          <p className="about-hero-subtitle">
            Why i2u.ai Inc. is Your Next Unicorn Investment
          </p>
          <div className="about-hero-description">
            <p>
              In a world awash with AI hype, where every startup claims to be the next big thing, 
              it's easy to get lost in the noise. But what if I told you there's a quiet revolution 
              brewing, spearheaded by a visionary who understands the true essence of the 'RenAIssance' 
              – not just as a technological shift, but as a profound intellectual evolution?
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-main">
        <div className="about-container">
          
          {/* Why i2u.ai Section */}
          <div className="about-section">
            <h2 className="about-section-title">
              Why i2u.ai Inc. is Not Just Another AI Startup
            </h2>
            <div className="about-content">
              <p>
                i2u.ai isn't peddling vaporware or another rehashed algorithm. It's a platform designed 
                to transform the startup ecosystem, taking ideas to unicorns through AI. In an era where 
                90% of startups fail, i2u.ai offers a lifeline, it's a strategic intervention, a surgical 
                strike against the epidemic of preventable startup failures.
              </p>
              <p>
                Their 98-point multi-layered evaluation system isn't just a fancy metric; it's a testament 
                to their rigorous approach. With an association with 1.2 million+ global community members 
                group on LinkedIn, i2u.ai isn't just talking the talk; they're walking the walk, building 
                a formidable network that connects founders with investors, mentors, and resources. This 
                isn't just a platform; it's an ecosystem, a vibrant marketplace where innovation meets opportunity.
              </p>
            </div>
          </div>

          {/* Delaware C Corp Advantage */}
          <div className="about-section">
            <h2 className="about-section-title">
              The Delaware C Corp Advantage: Speaking the Language of US Investors
            </h2>
            <div className="about-content">
              <p>
                For our discerning US investors, it's crucial to highlight that i2u.ai Inc. is a Delaware 
                C Corp (EIN: 36-5143244). Delaware's corporate laws are renowned for their flexibility and 
                predictability, making it the preferred jurisdiction for venture capitalists and angel investors. 
                It signals stability, investor-friendliness, and a clear path for future funding rounds. We 
                speak your language, and we've set up our legal structure to facilitate seamless investment 
                and growth within the US market and beyond.
              </p>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="about-highlights">
            <h2 className="about-section-title">Key Differentiators</h2>
            <div className="highlights-grid">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div key={index} className="highlight-card">
                    <div className="highlight-icon">
                      <Icon size={24} />
                    </div>
                    <h3 className="highlight-title">{highlight.title}</h3>
                    <p className="highlight-description">{highlight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Perfect Timing Section */}
          <div className="about-section">
            <h2 className="about-section-title">
              Why Now? The Perfect Timing of the RenAIssance
            </h2>
            <div className="about-content">
              <p>
                The 'Perfect Timing' as our strongest asset (9/10). We are at the cusp of the AI RenAIssance, 
                a period where human intelligence is not being replaced, but redefined and expanded through 
                symbiotic co-navigation with AI. Breaking the Intelligence Singularity: From Steve Jobs' 
                Leadership Paradox to Consciousness-Enabled AI Systems, Beyond Computation: Humanity's 
                Intellectual Evolution in the Age of Artificial Intelligence and From Florence to Silicon 
                Valley: The Renaissance and the RenAIssance are not just academic musings; they are a 
                roadmap to the future, a future that i2u.ai is actively building.
              </p>
              <p>
                This isn't just about investing in a company; it's about investing in a movement. It's about 
                being part of the next wave of innovation, where AI unicorns are demonstrating growth velocities 
                up to 78.4% annually – nearly four times the average of traditional unicorns. i2u.ai is 
                positioned to identify, nurture, and scale these future giants, offering investors an 
                unparalleled opportunity to participate in this exponential growth.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="about-cta">
            <h2 className="about-section-title">
              The Call to Action: Connect, Collaborate, Conquer
            </h2>
            <div className="about-content">
              <p>
                We are actively seeking visionary investors who understand the transformative power of AI 
                and the immense potential of a globally connected startup ecosystem. If you are an investor 
                in the US or anywhere across the globe, and you are looking for an opportunity to be at 
                the forefront of the AI RenAIssance, we invite you to connect with us.
              </p>
              <p>
                Let's discuss how your investment can fuel the next generation of AI-powered unicorns. 
                The future of innovation is here, and it's spelled i2u.ai.
              </p>
            </div>
            <div className="cta-buttons">
              <Button className="cta-primary">
                <Link to="/Register">Connect With Us</Link>
              </Button>
              <Button variant="outline" className="cta-secondary">
                <a href="https://www.linkedin.com/company/i2u-ai/" target="_blank" rel="noreferrer">
                  Learn More on LinkedIn
                </a>
              </Button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About; 