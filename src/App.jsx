import React from "react";
import "./App.css";
import Lottie from "lottie-react";
import rocketAnimation from "./assets/rocket.json";
import { FiZap, FiUsers } from "react-icons/fi";
import logo from './assets/logo.png';
import CountUp from "react-countup";

function App() {
  return (
    <>
    <header className="navbar">
      <div className="navbar-content">
        <img
          src={logo}
          alt="i2u.ai Logo"
          className="navbar-logo" />
        <span className="navbar-title">i2u.ai | Ideas to Unicorns through AI!</span>
      </div>
    </header>
    <div className="main-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="lottie-wrapper">
            <Lottie animationData={rocketAnimation} loop={true} />
          </div>
          <h1 className="hero-title">
            Calling All Startups to World Startup Sprint!
          </h1>
          <p className="hero-subtext">
            This Is Your Moment to Rise — No Matter Where You’re From. <br />
            <span className="highlight">
              Startup Ideas to Unicorns <span className="blue">@</span>{" "}
              HyperSpeed!
            </span>
          </p>
        </section>

        {/* Glassmorphism Card */}
        <div className="glass-card">
          <ul className="bullet-points">
            <li>
              <FiUsers className="icon" /> You’re a founder — maybe even a
              first-time one.
            </li>
            <li>
              <FiZap className="icon" /> You’ve got big dreams but limited
              resources.
            </li>
            <li>
              <FiZap className="icon" /> Competing against thousands of startups.
            </li>
            <li>
              <FiZap className="icon" /> You need visibility and opportunities.
            </li>
          </ul>

          {/* Live Count */}
          {/* <div className="live-count">
            🔥 <CountUp end={87} duration={15} />/100 Early Bird Slots Taken — Don’t Miss Your Shot!
          </div> */}


          {/* Pricing Section */}
          <div className="pricing">
            <span>💰 Pricing That Works For Everyone:🪄</span>
            <div className="price-tier india">
              <span>🇮🇳 Indian Founders</span>
              <span className="bold">₹4999 <sup> (Early Bird)</sup>
              </span>
            </div>
            {/* <div className="price-tier global">
              <span>🌍 Global Founders</span>
              <span className="bold">$99 <sup>(Annual)</sup></span>
            </div> */}
          </div>

          {/* CTA */}
          {/* <button className="cta-button">Register Now for ₹999 Only</button> */}
          <a href="https://payments.cashfree.com/forms/i2uAI"
            target="_blank"
            rel="noopener noreferrer"
            className="cashfree-button">
            <button className="cssbuttons-io-button">
              {" "}Register Now for ₹999 Only
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor" />
                </svg>
              </div>
            </button>    
          </a>
        </div>
        <section className="unicorn-preview">
          <h2 className="unicorn-title">🌍 Know the Giants You're Sprinting With</h2>
          <p className="unicorn-subtext">
            Discover how these startups scaled to billions.
          </p>

          <div className="unicorn-card">
            <div className="company-highlight">
              <span className="company-rank">#1</span>
              <span className="company-name">SpaceX</span>
              <div>
                <span className="company-valuation">$350B</span>
              </div>
            </div>
            <div className="company-highlight">
              <span className="company-rank">#2</span>
              <span className="company-name">ByteDance</span>
              <div>
                <span className="company-valuation">$300B</span>
              </div>
            </div>
            <div className="company-highlight">
              <span className="company-rank">#3</span>
              <span className="company-name">OpenAI</span>
              <div>
                <span className="company-valuation">$300B</span>
              </div>
            </div>
          </div>

          <a
            href="https://i2u.ai/unicorn_club.html"
            target="_blank"
            rel="noopener noreferrer"
            className="view-full-leaderboard"
          >
            View Full Leaderboard →
          </a>
        </section>
      </div>
      </>
  );
}

export default App;
