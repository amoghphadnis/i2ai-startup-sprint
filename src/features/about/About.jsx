import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiTarget, FiAward, FiTrendingUp, FiGlobe, FiZap, 
    FiCpu, FiPlay, FiShield, FiBookOpen, FiUserCheck, FiMail, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { FaLinkedinIn, FaRocket, FaRegPlayCircle } from "react-icons/fa";
import { Button } from '../../components/ui/button';
import './About.css';

import Rick from '../../assets/Images/Founders/RP.jpg';
import Girish from '../../assets/Images/Founders/GH.jpg';
import Satish from '../../assets/Images/Founders/SH.jpg';
import Shekhar from '../../assets/Images/Founders/SB.jpg';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  console.log('About component is rendering');

  const highlights = [
    {
      icon: FiCpu,
      title: "AI-Powered Ecosystem",
      description: "First platform built ground-up leveraging AI for unicorn building",
      color: "var(--color-primary)"
    },
    {
      icon: FiPlay,
      title: "Gamified Experience",
      description: "Engaging journey to unicorn status with rewards and collaboration",
      color: "#8b5cf6"
    },
    {
      icon: FiShield,
      title: "Comprehensive Support",
      description: "Benefits worth up to $225,000 for a nominal fee",
      color: "#10b981"
    },
    {
      icon: FiBookOpen,
      title: "Proven Methodology",
      description: "Inspired by best platforms worldwide, enhanced with latest AI developments",
      color: "#f59e0b"
    },
    {
      icon: FiUserCheck,
      title: "98-Point Evaluation",
      description: "Rigorous framework to identify and support potential unicorns",
      color: "#ef4444"
    },
    {
      icon: FaRocket,
      title: "9x Productivity Multiplier",
      description: "Reduce 7-year journey to unicorn status to 3.9 years for AI ventures",
      color: "#06b6d4"
    }
  ];

  const teamMembers = [
    {
      name: "Ranjit (Rick) Paniker",
      role: "Co-Founder",
      description: "Growth-oriented Senior Executive with over 20 years of experience. Executive Vice President at Stele Infotech. Founded and successfully exited Aviation Academy International.",
      experience: "20+ years",
      keyAchievement: "$100MM+ sales in first year at PC Wonders",
      image: Rick
    },
    {
      name: "Pratibha Bhadranavar",
      role: "Co-Founder",
      description: "Strong background in software engineering and project leadership. Experience at Mahindra Satyam and Novell Soft Pvt. Ltd. Expert in Core Java, XML, and project management.",
      experience: "Software Engineering",
      keyAchievement: "Technical backbone of i2u.ai platform",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Girish Hukkeri",
      role: "Founder",
      description: "Over 33 years of experience in enterprise software and leadership roles. Founded embryoFund accelerator and mentored numerous B2B startups. Expert in identifying perfect timing in the market with 78.4% annual growth in AI ventures.",
      experience: "33+ years",
      keyAchievement: "78.4% annual growth in AI ventures",
      image: Girish
    },
    {
      name: "Satish Hukkeri",
      role: "Co-Founder",
      description: "Extensive experience in CXO and Business Head roles. Recent tenure at AdvitiiX Technovate (R&D arm of Volvo). Secured over ten significant orders from global clients.",
      experience: "AI Business Leadership",
      keyAchievement: "Major contracts with Volvo, Schneider Electric",
      image: Satish
    },
    {
      name: "Shekhar Bhusannavar",
      role: "Co-Founder",
      description: "Entrepreneur and strategic advisor with over 33 years of leadership experience. Managing Director of Goodness Health Hub Pharma and Chairman of AadiShek Group.",
      experience: "33+ years",
      keyAchievement: "International business development across 3 continents",
      image: Shekhar
    }
  ];

  const prospectBase = [
    {
      title: "First-Time Early Stage Startup Founders",
      description: "For those embarking on their entrepreneurial journey for the first time. We provide a unified Agentic AI OS that bridges fragmented support, offering comprehensive assistance in financing, mentoring, go-to-market strategies, IP creation, and much more.",
      benefit: "Reduce 7-year journey to unicorn status to 3.9 years",
      icon: FaRocket
    },
    {
      title: "Daily AI Users",
      description: "Over 100 million daily AI users primed to launch their first ventures. These individuals, already familiar with the power of AI, represent a vast untapped potential for innovation.",
      benefit: "Infrastructure to educate, train, coach, and handhold aspiring entrepreneurs",
      icon: FiUsers
    },
    {
      title: "MSME Sector with Unicorn Ambitions",
      description: "450 million+ businesses ready to accelerate toward unicorn valuations. Despite spending over $100 billion annually on growth and funding, many MSMEs struggle due to fragmented support.",
      benefit: "Unified platform for exponential growth and full potential unlock",
      icon: FiGlobe
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder, TechFlow",
      quote: "i2u.ai transformed our startup journey. The AI-powered insights helped us secure funding 3x faster than expected.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO, DataVault",
      quote: "The valuation calculator alone saved us $50,000 in consulting fees. The platform is a game-changer for early-stage founders.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma",
      role: "Co-Founder, GreenTech",
      quote: "From idea to unicorn in record time. The gamified approach kept our team motivated throughout the journey.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-page">
      {/* Enhanced Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="about-hero-content">
          <div className="hero-text-section">
            <h1 className="about-hero-title">
              About Us: Igniting Unicorns, Empowering the Future
            </h1>
            <div className="about-hero-description">
              <p>
                At i2u.ai, we believe that every groundbreaking idea deserves the chance to become a unicorn. 
                We are building the first gamified global Agentic AI Startup Ecosystem Booster, a revolutionary 
                platform designed to transform aspirations into reality for a diverse and dynamic community of innovators.
              </p>
            </div>
            <div className="hero-cta-group">
              <Button className="hero-cta-primary">
                <FaRegPlayCircle style={{ marginRight: '8px' }} />
                Watch Our Story
              </Button>
              <Button variant="outline" className="hero-cta-secondary">
                <FiMail style={{ marginRight: '8px' }} />
                Contact Us
              </Button>
            </div>
          </div>
          <div className="hero-visual-section">
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">1,000+</span>
                <span className="stat-label">Founders</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$225K</span>
                <span className="stat-label">Value</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">9x</span>
                <span className="stat-label">Faster</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-main">
        <div className="about-container">
          
          {/* Our Vision Section */}
          <div className="about-section vision-section">
            <div className="section-header">
              <h2 className="about-section-title">
                Our Vision: A World of Democratized Abundance
              </h2>
              <div className="section-divider"></div>
            </div>
            <div className="about-content">
              <p>
                The technological landscape is evolving at an unprecedented pace, with Artificial Intelligence at its core. 
                We are not just witnessing a technological renaissance; we are experiencing a fundamental re-engineering 
                of human capabilities, a cognitive oxygenation event that demands a radical re-evaluation of our ambitions.
              </p>
              <p>
                i2u.ai is at the forefront of this transformation. We envision a future where the tools of creation and 
                analysis, once confined to the ivory towers of tech giants, are now being placed into the hands of the many.
              </p>
            </div>
          </div>

          {/* Interactive Highlights Carousel */}
          <div className="About-highlights-carousel-section">
            <h2 className="section-title">Our Approach: The i2u.ai Advantage</h2>
            <div className="about-highlights-carousel">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div key={index} className="about-highlight-card" style={{ '--accent-color': highlight.color }}>
                    <div className="highlight-icon">
                      <Icon size={32} />
                    </div>
                    <h3 className="highlight-title">{highlight.title}</h3>
                    <p className="highlight-description">{highlight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Who We Empower Section */}
          <div className="about-section prospect-section">
            <h2 className="about-section-title">
              Who We Empower: Our Diverse Prospect Base
            </h2>
            <div className="about-content">
              <p>
                Our platform is meticulously crafted to serve a unique and rapidly expanding prospect base, 
                united by a common ambition: to achieve unicorn status.
              </p>
            </div>
            
            <div className="about-prospect-grid">
              {prospectBase.map((prospect, index) => {
                const Icon = prospect.icon;
                return (
                  <div key={index} className="about-prospect-card">
                    <div className="about-prospect-icon">
                      <Icon size={24} />
                    </div>
                    <h3 className="about-prospect-title">{prospect.title}</h3>
                    <p className="about-prospect-description">{prospect.description}</p>
                    <div className="about-prospect-benefit">
                      <strong>Key Benefit:</strong> {prospect.benefit}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Testimonials Carousel */}
          <div className="testimonials-section">
            <h2 className="section-title">What Our Founders Say</h2>
            <div className="testimonials-carousel">
              <button className="carousel-btn prev" onClick={prevSlide}>
                <FiArrowLeft />
              </button>
              <div className="testimonials-container">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className={`testimonial-card ${index === currentSlide ? 'active' : ''}`}
                  >
                    <div className="testimonial-content">
                      <div className="testimonial-avatar">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                      </div>
                      <blockquote className="testimonial-quote">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="testimonial-author">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-btn next" onClick={nextSlide}>
                <FiArrowRight />
              </button>
            </div>
            <div className="carousel-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Development Team Section */}
          <div className="about-section team-intro-section">
            <h2 className="about-section-title">
              Our Development Team: The Architects of Innovation
            </h2>
            <div className="about-content">
              <p>
                Behind every groundbreaking feature and seamless experience at i2u.ai stands our exceptional development team. 
                Led by <span><Link to="https://www.linkedin.com/in/amogh-anand-phadnis/" target="_blank" rel="noreferrer"  style={{ color: 'var(--color-primary)'}}>Amogh Phadnis</Link></span>, our team of dedicated engineers and innovators works tirelessly to build and refine 
                the AI-powered ecosystem that empowers our users.
              </p>
            </div>
          </div>

          {/* Leadership Section */}
          <div className="leadership-section">
            <h2 className="about-section-title">
              Our Leadership: Visionaries Driving Innovation
            </h2>
            <div className="about-content">
              <p>
                At i2u.ai, our strength lies in the collective expertise and visionary leadership of our executive team. 
                With over 120 years of combined experience across diverse sectors, our CXOs bring a wealth of knowledge, 
                strategic insight, and a proven track record of success in building and scaling businesses.
              </p>
            </div>
            
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-card-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="team-card-content">
                    <div className="team-header">
                      <h3 className="team-name">{member.name}</h3>
                      <span className="team-role">{member.role}</span>
                    </div>
                    <p className="team-description">{member.description}</p>
                    <div className="team-stats">
                      <div className="team-stat">
                        <strong>Experience:</strong> {member.experience}
                      </div>
                      <div className="team-stat">
                        <strong>Key Achievement:</strong> {member.keyAchievement}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="join-cta">
            <div className="cta-background">
              <div className="cta-gradient"></div>
              <div className="cta-pattern"></div>
            </div>
            <div className="cta-content">
              <h2 className="join-section-title">
                Join the Revolution
              </h2>
              <div className="join-content">
                <p>
                  The future is abundant, and it's being built by innovators like you. Whether you are a first-time founder 
                  with a nascent idea, a daily AI user ready to launch your venture, or an MSME with unicorn ambitions, 
                  i2u.ai is your partner in success.
                </p>
              </div>
              <div className="cta-buttons">
                <Button className="cta-primary">
                  <a href="mailto:fundraise@i2u.ai">
                    <FiMail style={{ marginRight: '8px' }} />
                    Contact Us
                  </a>
                </Button>
                <Button variant="outline" className="cta-secondary">
                  <a href="https://www.linkedin.com/company/i2u-ai/" target="_blank" rel="noreferrer">
                    <FaLinkedinIn style={{ marginRight: '8px' }} />
                    Follow on LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* References Section */}
          <div className="about-section references-section">
            <h2 className="about-section-title">References</h2>
            <div className="references-list">
              <div className="reference-item">
                <strong>[1]</strong> The AI Era: Humanity's Multiverse Bang. Available at: 
                <a href="https://adventuresinbmterrain.blogspot.com/2025/08/the-ai-era-humanitys-multiverse-bang.html" target="_blank" rel="noreferrer">
                  https://adventuresinbmterrain.blogspot.com/2025/08/the-ai-era-humanitys-multiverse-bang.html
                </a>
              </div>
              <div className="reference-item">
                <strong>[2]</strong> Roadmap Ahead for Democratized Abundance! Available at: 
                <a href="https://adventuresinbmterrain.blogspot.com/2025/07/roadmap-ahead-for-democratized-abundance.html" target="_blank" rel="noreferrer">
                  https://adventuresinbmterrain.blogspot.com/2025/07/roadmap-ahead-for-democratized-abundance.html
                </a>
              </div>
              <div className="reference-item">
                <strong>[3]</strong> i2uai25Jul25 - Google Slides. Available at: 
                <a href="https://docs.google.com/presentation/d/1RJicf3U__3F8FOqAe6RIsLPZHGRHHYBTzn8f5qJIR8I/edit?usp=sharing" target="_blank" rel="noreferrer">
                  https://docs.google.com/presentation/d/1RJicf3U__3F8FOqAe6RIsLPZHGRHHYBTzn8f5qJIR8I/edit?usp=sharing
                </a>
              </div>
              <div className="reference-item">
                <strong>[4]</strong> Startup Sprint. Available at: 
                <a href="https://ws.i2u.ai/" target="_blank" rel="noreferrer">
                  https://ws.i2u.ai/
                </a>
              </div>
            </div>
            <div className="copyright-notice">
              <p>
                Manus for Research & Drafting work under the guidance of Girish Hukkeri for i2u.ai Inc., 
                a Delaware C Corp with Copyright 2025
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About; 