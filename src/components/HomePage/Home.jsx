// src/components/HomePage/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Carousel from "react-slick";
import rocketAnimation from "../../assets/rocket.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

export default function Home() {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Transform Your Startup’s Future <br/>@ HyperSpeed</h1>
          <p className="hero-sub">
            90% of startups fail—but most failures are preventable.
          </p>
          {/* Highlight Rewards */}
          <div className="reward-banner">
            <strong>$250,000+</strong> of rewards up for grabs!
          </div>
          <div className="cta-group">
            <a
              href="https://payments.cashfree.com/forms/i2uAI"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
            >
              Register Now (₹999/$15)
            </a>
            <Link to="/how-it-works" className="btn-secondary">
              Learn How It Works
            </Link>
          </div>
        </div>
        <div className="hero-lottie">
          <Lottie animationData={rocketAnimation} loop />
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="metrics-section">
        {[
          { n: "35%+", l: "Improvement in assessments" },
          { n: "60%+", l: "Higher funding success" },
          { n: "98",   l: "Point multi-layered evaluation" },
          { n: "$250K+", l: "Worth of rewards" }
        ].map((m,i) => (
          <div key={i} className="metric-card">
            <div className="metric-num">{m.n}</div>
            <div className="metric-label">{m.l}</div>
          </div>
        ))}
      </section>

      {/* How It Works Teaser */}
      <section className="teaser-section">
        <h2>How It Works</h2>
        <div className="teaser-grid">
          {[
            { step: "Assess", desc: "98-point evaluation" },
            { step: "Valuate", desc: "5 professional methods" },
            { step: "Connect", desc: "Intelligent matching engine" }
          ].map((t,i) => (
            <div key={i} className="teaser-card">
              <h3>{t.step}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Showcase */}
      <section className="features-section">
        {[
          { title: "Ideas → Unicorns", desc: "Instantly generate & refine 10 winning ideas" },
          { title: "AI-Powered Guidance", desc: "Personalized growth prompts" },
          { title: "Global Connections", desc: "Network with 1,000+ founders & investors" }
        ].map((f,i) => (
          <div key={i} className="feature-card">
            <h4>{f.title}</h4>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Startup in Action Preview */}
      <section className="news-section">
        <h2>Startup in Action</h2>
        <Carousel {...carouselSettings} className="news-carousel">
          {[
            { img: "/images/story1.jpg", title: "GreenEnergy Innovations raises Series A", excerpt: "After 300% pipeline growth..." },
            { img: "/images/story2.jpg", title: "TechFlow Solutions secures new funding",   excerpt: "60% valuation boost..." },
            { img: "/images/story3.jpg", title: "HealthTech Dynamics expands into new markets", excerpt: "200% engagement improvement..." }
          ].map((s,i) => (
            <div key={i} className="slide">
              <img src={s.img} alt={s.title} className="slide-img"/>
              <div className="slide-text">
                <h3>{s.title}</h3>
                <p>{s.excerpt}</p>
              </div>
            </div>
          ))}
        </Carousel>
        <Link to="/startup-in-action" className="btn-link">
          See All News →
        </Link>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <h3>Ready to see your startup take off?</h3>
        <Link to="/register" className="btn-banner">
          Get Started Today
        </Link>
      </section>
    </div>
  );
}