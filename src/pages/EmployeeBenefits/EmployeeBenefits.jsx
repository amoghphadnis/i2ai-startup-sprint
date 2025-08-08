import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiTarget, FiAward, FiTrendingUp, FiGlobe, FiZap, 
    FiCpu, FiPlay, FiShield, FiBookOpen, FiUserCheck, FiMail, FiArrowRight, FiArrowLeft,
    FiCheckCircle, FiStar, FiBriefcase } from 'react-icons/fi';
import { FaLinkedinIn, FaRocket, FaRegPlayCircle } from "react-icons/fa";
import { Button } from '../../components/ui/button';
import './EmployeeBenefits.css';

const EmployeeBenefits = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const benefits = [
    {
      icon: FiCpu,
      title: "AI-Powered Career Guidance",
      description: "Discover your ideal career path with personalized AI insights",
      color: "var(--color-primary)"
    },
    {
      icon: FiTrendingUp,
      title: "Skill Gap Analysis",
      description: "Bridge skill gaps before the market demands them",
      color: "#8b5cf6"
    },
    {
      icon: FiBriefcase,
      title: "Premium Job Opportunities",
      description: "Access exclusive startup and enterprise job openings",
      color: "#10b981"
    },
    {
      icon: FiGlobe,
      title: "Professional Networking",
      description: "Build powerful connections with industry leaders",
      color: "#f59e0b"
    },
    {
      icon: FaRocket,
      title: "Future-Proof Your Career",
      description: "Stay ahead in an AI-transformed economy",
      color: "#ef4444"
    },
    {
      icon: FiStar,
      title: "Personal Brand Building",
      description: "Create a compelling professional identity",
      color: "#06b6d4"
    }
  ];

  const subscriptionPlans = [
    {
      name: "Free Forever Plan",
      price: "₹0",
      period: "/ Year",
      description: "Start your journey with zero cost",
      features: [
        "🛠️ Basic AI Skill Assessment (Monthly)",
        "🤖 AI Resume Review (1/month)",
        "📚 Free Training Resources (Webinars, E-books)",
        "🌐 1 Free Networking Event/month",
        "💾 50 MB Cloud Storage"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Beginner Plan",
      price: "₹16,000",
      period: "/ Year",
      description: "Ignite Your Career",
      features: [
        "🤖 AI Career Path Advisor",
        "🎓 AI Skill Recommendations",
        "📝 AI Interview Prep (Basic)",
        "📊 Skill Gap Analysis (Quarterly)",
        "📄 AI Resume & Portfolio Optimization",
        "📚 Access to Learning Repository",
        "🎟️ 1 Participation Credit (Premium Jobs/Gigs)",
        "💾 100 MB Storage"
      ],
      cta: "Choose Beginner Plan",
      popular: false
    },
    {
      name: "Basic Plan",
      price: "₹24,000",
      period: "/ Year",
      description: "Build Your Professional Identity",
      features: [
        "🎓 Quarterly AI Workshops",
        "📚 AI Micro-Courses & Certifications",
        "📊 Skill Evolution Dashboard",
        "🤖 AI Job/Client Recommendations",
        "🌍 Networking Community Access",
        "🎟️ 5 Participation Credits",
        "🌐 Custom Portfolio Website",
        "📊 Contact Management (50 contacts)",
        "💾 1 GB Storage"
      ],
      cta: "Choose Basic Plan",
      popular: true
    },
    {
      name: "Advanced Plan",
      price: "₹36,000",
      period: "/ Year",
      description: "Scale Your Expertise",
      features: [
        "🎓 Cross-Skill AI Learning Tracks",
        "🧑‍💼 AI Negotiation Simulator",
        "🤖 Custom AI Skill Trainer",
        "🎟️ 2 Certification Credits + 10 Participation Credits",
        "📈 Marketing Automation Tools (Gig Promotion)",
        "🌐 Advanced Portfolio Website",
        "📧 10 Professional Email IDs",
        "💾 5 GB Storage"
      ],
      cta: "Choose Advanced Plan",
      popular: false
    },
    {
      name: "Professional Plan",
      price: "₹60,000",
      period: "/ Year",
      description: "Build Your Brand",
      features: [
        "🎯 Exclusive AI Skill Coach",
        "🎓 Monthly Live AI Webinars",
        "🧑‍💼 Team Management Simulator",
        "🏆 Leadership Capability Assessment",
        "🎟️ 20 High-Ranking Opportunity Credits",
        "🌐 AI-Branded Professional Website",
        "📊 Sales & Financial Forecasting",
        "📈 Maximized Marketing Automation",
        "🌍 VIP Networking Events",
        "💾 10 GB Storage"
      ],
      cta: "Choose Professional Plan",
      popular: false
    },
    {
      name: "Pro Max Ultra",
      price: "₹1,00,000",
      period: "/ Year",
      description: "Dominate Your Industry",
      features: [
        "🏫 Your Own Custom AI Academy",
        "📊 AI Future Skills Trends Dashboard",
        "🌍 Global Leadership Simulation",
        "🎓 Dedicated AI Mentor for Mastery",
        "💼 AI Business Automation Lab",
        "🎟️ 50 Participation Credits",
        "🏢 Virtual Reality Office",
        "🌐 Enhanced Personal Brand Network",
        "🌍 Priority Access to Global Events",
        "💾 50 GB Storage"
      ],
      cta: "Choose Pro Max Ultra",
      popular: false
    }
  ];

  const earlyAccessRewards = [
    {
      tier: "Top 1%",
      reward: "Pro Max Ultra Plan (Worth ₹1,00,000/Year) – FREE for 1 Year",
      description: "Ultimate career domination package"
    },
    {
      tier: "Next 2%",
      reward: "Professional Plan (Worth ₹60,000/Year) – FREE for 1 Year",
      description: "Complete brand building solution"
    },
    {
      tier: "Next 3%",
      reward: "Advanced Plan (Worth ₹36,000/Year) – FREE for 1 Year",
      description: "Expert-level skill development"
    },
    {
      tier: "Next 4%",
      reward: "Basic Plan (Worth ₹24,000/Year) – FREE for 1 Year",
      description: "Professional identity building"
    },
    {
      tier: "Next 90%",
      reward: "Beginner Plan (Worth ₹16,000/Year) – FREE for 1 Year",
      description: "Career acceleration starter"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer, TechFlow",
      quote: "i2u.ai helped me transition from a junior developer to a senior role in just 8 months. The AI skill recommendations were spot-on!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Manager, DataVault",
      quote: "The networking opportunities alone are worth the investment. I've connected with startup founders and landed my dream job.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma",
      role: "Product Manager, GreenTech",
      quote: "From employee to entrepreneur! The platform gave me the skills and confidence to start my own company.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="employee-benefits-page">
      {/* Hero Section */}
      <section className="emp-benefits-hero">
        <div className="emp-hero-background">
          <div className="emp-hero-gradient"></div>
          <div className="emp-hero-pattern"></div>
        </div>
        <div className="emp-benefits-hero-content">
          <div className="hero-text-section">
            <h1 className="emp-benefits-hero-title">
              i2u.ai: Empowering Your Career Growth with AI
            </h1>
            <div className="emp-benefits-hero-description">
              <p>
                We are building the world's most dynamic AI-powered ecosystem for 
                <strong> jobseekers, professionals, freelancers, entrepreneurs, and individual service providers</strong>—uniting over 
                <strong> 1.2 million innovators, creators, and career-shapers</strong> from startups to enterprises.
              </p>
              <p>
                Whether you're launching your career, scaling your expertise, or building your personal brand, 
                <strong> i2u.ai</strong> gives you the AI tools, community, and opportunities to thrive in the future of work.
              </p>
            </div>
            <div className="emp-hero-cta-group">
              <Button className="emp-hero-cta-primary">
                <FaRegPlayCircle style={{ marginRight: '8px' }} />
                Watch Our Story
              </Button>
              <Button variant="outline" className="emp-hero-cta-secondary">
                <FiMail style={{ marginRight: '8px' }} />
                Contact Us
              </Button>
            </div>
            <div className="emp-registration-notice">
              <p>
                <strong>Registration fee: ₹99</strong> - May increase anytime without notice. 
                <strong> Act now to secure your spot and maximize your reward.</strong>
              </p>
            </div>
          </div>
          <div className="emp-hero-visual-section">
            <div className="emp-hero-stats">
              <div className="emp-stat-item">
                <span className="stat-number">1.2M+</span>
                <span className="stat-label">Professionals</span>
              </div>
              <div className="emp-stat-item">
                <span className="stat-number">₹16K+</span>
                <span className="stat-label">Value</span>
              </div>
              <div className="emp-stat-item">
                <span className="stat-number">9x</span>
                <span className="stat-label">Faster Growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="emp-benefits-main">
        <div className="emp-benefits-container">
          
          {/* Why i2u.ai Section */}
          <div className="emp-benefits-section emp-why-section">
            <div className="emp-section-header">
              <h2 className="emp-benefits-section-title">
                🔮 Why Choose i2u.ai for Your Career?
              </h2>
              <div className="emp-section-divider"></div>
            </div>
            <div className="emp-benefits-content">
              <p>
                At <strong>i2u.ai</strong>, we believe the future belongs to those who prepare for it today. 
                Our AI-driven platform is designed to help you:
              </p>
            </div>
            
            <div className="emp-benefits-grid">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="benefit-card" style={{ '--accent-color': benefit.color }}>
                    <div className="benefit-icon">
                      <Icon size={32} />
                    </div>
                    <h3 className="benefit-title">{benefit.title}</h3>
                    <p className="benefit-description">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="emp-benefits-summary">
              <p>
                We combine <strong>cutting-edge AI tools</strong>, <strong>personalized learning</strong>, and 
                <strong> exclusive global networking</strong> to fast-track your success—no matter where you are in your journey.
              </p>
            </div>
          </div>

          {/* Early Access Rewards Section */}
          <div className="emp-benefits-section emp-rewards-section">
            <h2 className="emp-benefits-section-title">
              🎁 Exclusive Early Access Rewards
            </h2>
            <div className="emp-benefits-content">
              <p>
                We're opening doors to our revolutionary platform—and the <strong>first 10% of registrants</strong> 
                get their <strong>annual subscription FREE</strong>!
              </p>
              <p>
                The registration fee is at just <strong>₹99</strong>, but may be increased anytime without advance notice. 
                Act now to secure your spot and maximize your reward.
              </p>
            </div>
            
            <div className="emp-rewards-table">
              <div className="emp-rewards-header">
                <div className="emp-header-tier">Registration Tier</div>
                <div className="emp-header-reward">Your Reward</div>
              </div>
              {earlyAccessRewards.map((reward, index) => (
                <div key={index} className="emp-reward-row">
                  <div className="emp-reward-tier">
                    <strong>{reward.tier}</strong> Early Registrants
                  </div>
                  <div className="emp-reward-details">
                    <div className="emp-reward-value">{reward.reward}</div>
                    <div className="emp-reward-description">{reward.description}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="emp-rewards-notice">
              <p>
                ✅ <strong>Even if you miss the top tier, you still get at least ₹16,000 worth of value—for just ₹99!</strong>
              </p>
              <p>
                🚀 <strong>Beat the system</strong>: Pay a little extra to become the highest-paying registrant of the day 
                and jump the queue for top-tier rewards!
              </p>
            </div>
          </div>

          {/* Subscription Plans Section */}
          <div className="emp-benefits-section emp-plans-section">
            <h2 className="emp-benefits-section-title">
              🌟 Subscription Plans at a Glance
            </h2>
            <div className="emp-benefits-content">
              <p>
                Choose the plan that best fits your career goals and budget. All plans include our core AI-powered features 
                with additional benefits as you upgrade.
              </p>
            </div>
            
            <div className="emp-plans-grid">
              {subscriptionPlans.map((plan, index) => (
                <div key={index} className={`emp-plan-card ${plan.popular ? 'popular' : ''}`}>
                  {plan.popular && <div className="popular-badge">Most Popular</div>}
                  <div className="emp-plan-header">
                    <h3 className="emp-plan-name">{plan.name}</h3>
                    <div className="emp-plan-price">
                      <span className="emp-price-amount">{plan.price}</span>
                      <span className="emp-price-period">{plan.period}</span>
                    </div>
                    <p className="emp-plan-description">{plan.description}</p>
                  </div>
                  <div className="emp-plan-features">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="emp-plan-feature">
                        <FiCheckCircle className="emp-feature-icon" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="emp-plan-cta">
                    <Button className={plan.popular ? 'emp-plan-cta-popular' : 'emp-plan-cta-standard'}>
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Global Leaderboard Section */}
          <div className="emp-benefits-section emp-leaderboard-section">
            <h2 className="emp-benefits-section-title">
              🏆 Who Makes It to the Global Leaderboard?
            </h2>
            <div className="emp-benefits-content">
              <p>
                We celebrate <strong>every inspiring contributor</strong> in the startup and innovation ecosystem. 
                Our <strong>Global Leaderboard of Future Leaders</strong> recognizes excellence across all levels, including:
              </p>
            </div>
            
            <div className="emp-leaderboard-categories">
              <div className="emp-category-grid">
                <div className="emp-category-item">
                  <FiCheckCircle className="category-icon" />
                  <span><strong>Founders & Co-Founders</strong></span>
                </div>
                <div className="emp-category-item">
                  <FiCheckCircle className="category-icon" />
                  <span><strong>CTOs, CPOs & Technical Heads</strong></span>
                </div>
                <div className="emp-category-item">
                  <FiCheckCircle className="category-icon" />
                  <span><strong>Startup Managers & Department Leads</strong></span>
                </div>
                <div className="emp-category-item">
                  <FiCheckCircle className="category-icon" />
                  <span><strong>High-Impact Employees & Innovators</strong></span>
                </div>
                <div className="emp-category-item">
                  <FiCheckCircle className="category-icon" />
                  <span><strong>Freelancers & Independent Experts</strong></span>
                </div>
                <div className="emp-category-item">
                  <FiCheckCircle className="category-icon" />
                  <span><strong>Interns & Students</strong> driving real change</span>
                </div>
              </div>
            </div>
            
            <div className="emp-leaderboard-note">
              <p>
                🌟 <strong>Performance, growth, community contribution, and AI-powered milestones</strong> will determine rankings. 
                Whether you're leading a team or learning your first skill, your journey matters.
              </p>
            </div>
          </div>

          {/* Why AI Features Matter Section */}
          <div className="emp-benefits-section emp-features-section">
            <h2 className="emp-benefits-section-title">
              💡 Why These AI-Powered Features Matter
            </h2>
            <div className="emp-features-grid">
              <div className="emp-feature-item">
                <div className="emp-feature-icon">
                  <FiZap />
                </div>
                <h3>Faster Skill Growth</h3>
                <p>AI-driven, personalized learning paths reduce trial and error.</p>
              </div>
              <div className="emp-feature-item">
                <div className="emp-feature-icon">
                  <FiTarget />
                </div>
                <h3>Stay Competitive</h3>
                <p>Master skills before they become industry standards.</p>
              </div>
              <div className="emp-feature-item">
                <div className="emp-feature-icon">
                  <FiUserCheck />
                </div>
                <h3>Take Control</h3>
                <p>Design your career path with intelligent insights and tools.</p>
              </div>
              <div className="emp-feature-item">
                <div className="emp-feature-icon">
                  <FiGlobe />
                </div>
                <h3>Expand Reach</h3>
                <p>Access global opportunities and build a borderless professional identity.</p>
              </div>
            </div>
            
            <div className="emp-features-quote">
              <blockquote>
                By joining i2u.ai, you're not just upgrading your skills—you're future-proofing your career.
              </blockquote>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="emp-benefits-section emp-testimonials-section">
            <h2 className="emp-benefits-section-title">
              What Our Members Say
            </h2>
            <div className="emp-testimonials-carousel">
              <button className="emp-carousel-btn prev" onClick={prevSlide}>
                <FiArrowLeft />
              </button>
              <div className="emp-testimonials-container">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className={`emp-testimonial-card ${index === currentSlide ? 'active' : ''}`}
                  >
                    <div className="emp-testimonial-content">
                      <div className="emp-testimonial-avatar">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                      </div>
                      <blockquote className="emp-testimonial-quote">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="emp-testimonial-author">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="emp-carousel-btn next" onClick={nextSlide}>
                <FiArrowRight />
              </button>
            </div>
            <div className="emp-carousel-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`emp-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Registration CTA Section */}
          <div className="emp-benefits-section emp-registration-section">
            <h2 className="emp-benefits-section-title">
              🚀 Register Now – ₹99 Today, Value for a Lifetime
            </h2>
            <div className="emp-benefits-content">
              <p>
                The registration fee is at just <strong>₹99</strong>, but may be increased anytime without advance notice. 
                Act now to secure your spot and maximize your reward.
              </p>
            </div>
            
            <div className="emp-payment-section">
              <div className="emp-payment-notice">
                <p>👉 <strong>Scan or Click to Pay ₹99 and Register Instantly</strong></p>
              </div>
              
              {/* Cashfree Button */}
              <div className="emp-cashfree-button-container">
                <form>
                  <a href="https://payments.cashfree.com/forms/i2uAIJ" target="_parent">
                    <div className="button-container" style={{ background: '#130eb9' }}>
                      <div>
                        <img 
                          src="https://cashfree-checkoutcartimages-prod.cashfree.com/i2u18May251028 (1)G8mrvcb66o5g_prod.png" 
                          alt="logo" 
                          className="emp-logo-container"
                        />
                      </div>
                      <div className="emp-text-container">
                        <div style={{ fontFamily: 'Arial', color: '#fff', marginBottom: '5px', fontSize: '14px' }}>
                          Pay Now ₹99 Only!
                        </div>
                        <div style={{ fontFamily: 'Arial', color: '#fff', fontSize: '10px' }}>
                          <span>Powered By Cashfree</span>
                          <img 
                            src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg" 
                            alt="logo" 
                            className="emp-seconday-logo-container"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </form>
              </div>
            </div>
          </div>

          {/* Post-Registration Section */}
          <div className="emp-benefits-section emp-post-registration-section">
            <h2 className="emp-benefits-section-title">
              📬 What Happens After Registration?
            </h2>
            <div className="emp-post-registration-steps">
              <div className="emp-step-item">
                <div className="emp-step-icon">
                  <FiCheckCircle />
                </div>
                <div className="emp-step-content">
                  <h3>Confirmation Email</h3>
                  <p>You'll receive a confirmation email with your reward tier and access details.</p>
                </div>
              </div>
              <div className="emp-step-item">
                <div className="emp-step-icon">
                  <FaRocket />
                </div>
                <div className="emp-step-content">
                  <h3>Early Platform Access</h3>
                  <p>Get early access to the platform as it launches in phases.</p>
                </div>
              </div>
              <div className="emp-step-item">
                <div className="emp-step-icon">
                  <FiMail />
                </div>
                <div className="emp-step-content">
                  <h3>Regular Updates</h3>
                  <p>Receive updates on AI tools, webinars, networking events, and leaderboard rankings.</p>
                </div>
              </div>
              <div className="emp-step-item">
                <div className="emp-step-icon">
                  <FiGlobe />
                </div>
                <div className="emp-step-content">
                  <h3>Global Community</h3>
                  <p>Join a global community shaping the future of work.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Section */}
          <div className="emp-benefits-section emp-terms-section">
            <h2 className="emp-benefits-section-title">
              ⚖️ Terms & Conditions
            </h2>
            <div className="emp-terms-content">
              <ul className="emp-terms-list">
                <li>You must be <strong>18 years or older</strong> to register.</li>
                <li>Provide <strong>accurate and complete information</strong>.</li>
                <li>Agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.</li>
                <li>Participate in the registration process <strong>fairly and honestly</strong>.</li>
                <li>i2u.ai reserves the right to <strong>modify or cancel</strong> the program at any time.</li>
              </ul>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="emp-benefits-section emp-final-cta-section">
            <div className="emp-cta-background">
              <div className="emp-cta-gradient"></div>
              <div className="emp-cta-pattern"></div>
            </div>
            <div className="emp-cta-content">
              <h2 className="emp-final-cta-title">
                Welcome to i2u.ai
              </h2>
              <div className="emp-final-cta-subtitle">
                <p><strong>Where AI Meets Ambition. Where Talent Meets Opportunity.</strong></p>
                <p>Your journey to mastery starts now.</p>
              </div>
              <div className="emp-final-cta-links">
                <a href="https://www.i2u.ai" target="_blank" rel="noopener noreferrer">🌐 www.i2u.ai</a>
                <a href="mailto:support@i2u.ai">📧 support@i2u.ai</a>
                <span>📱 Join the Future of Work</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default EmployeeBenefits;
