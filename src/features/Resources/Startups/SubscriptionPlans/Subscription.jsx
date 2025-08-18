import React from "react";
import "./Subscription.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Subscription() {

    // Subscription Plans Data
    const subscriptionPlans = [
        {
            name: "Beginner",
            price: "₹16000",
            period: "/Year",
            description: "Ignite Your Idea!",
            features: [
                "🏢Basic Virtual Space",
                "🎟️1 Participation Credit",
                "🤖1 Basic AI Assistant",
                "🌐Basic Template Website",
                "📧1 Email ID",
                "📊Basic Contact Management",
                "💾100 MB Data Storage",
                "🛡️Basic Firewall",
                "📚Online Resources Support",
                "Customer Support: Online Resources",
                "📚Training and Onboarding: Online Resources"
            ],
            includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // All features included
            specialOffer: "STARTUP STARTER",
            cta: "Choose Beginner Plan",
            popular: false,
            gradient: "green",
        },
        {
            name: "Basic",
            price: "₹24000",
            period: "/Year",
            description: "Nurture Your Vision!",
            features: [
                "🏢Customizable Virtual Office",
                "🎟️5 Participation Credits",
                "🤖1 Advanced AI Assistant",
                "🌐Customizable Template Website",
                "📧5 Email IDs",
                "📊Lead Management, Sales Pipeline",
                "💾1 GB Data Storage",
                "🛡️Advanced Firewall, Encryption",
                "📚Email Support",
                "📧Email Support",
                "👩‍🏫Personalized Onboarding, Online Resources",
                "🌐Access to Online Community",
                "🎁I2u.ai Points: 100",
                "🤖AI-powered Chatbot"
            ],
            includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], // All features included
            specialOffer: "VISION BUILDER",
            cta: "Choose Basic Plan",
            popular: true,
            gradient: "blue",
        },
        {
            name: "Advanced",
            price: "₹36000",
            period: "/Year",
            description: "Accelerate Your Growth!",
            features: [
                "🏢Advanced Virtual Office with AI Assistant",
                "🎟️10 Participation Credits",
                "🤖2 Advanced AI Assistants",
                "🌐Custom Design with E-commerce",
                "📧10 Email IDs",
                "📊Marketing Automation, Customer Support",
                "💾5 GB Data Storage",
                "🛡️AI-powered Threat Detection",
                "📚AI Agent Phone Support",
                "📞AI Agent Phone Support, Email Support",
                "📅Quarterly AI Powered Training Sessions, Personalized Onboarding",
                "🌐Access to Exclusive Online Events, Community",
                "🎁I2u.ai Points:500",
                "📝AI-powered Content Generation, AI-powered Marketing Automation"
            ],
            includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], // All features included
            specialOffer: "GROWTH ACCELERATOR",
            cta: "Choose Advanced Plan",
            popular: false,
            gradient: "pink",
        },
        {
            name: "Professional",
            price: "₹60000",
            period: "/Year",
            description: "Connect with Unicorns!",
            features: [
                "🏢Premium Virtual Office with Virtual Reality",
                "🎟️20 Participation Credits",
                "🤖3 High-end AI Assistants",
                "🌐Custom Design with AI-powered Content Generation",
                "📧20 Email IDs",
                "📊AI-powered Sales Forecasting",
                "💾10 GB Data Storage",
                "🛡️AI-powered Incident Response",
                "📚Priority AI Agent Phone Support",
                "📞Priority AI Agent Phone Support, Email Support",
                "📊Monthly AI Powered Progress Review, Priority Support",
                "🌐Access to Online VIP Events, Community",
                "🦄Dedicated Unicorn Coach, Accelerated Growth Plan",
                "🎁I2u.ai Points: 1,000",
                "🔮AI-powered Predictive Analytics, AI-powered Customer Segmentation"
            ],
            includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], // All features included
            specialOffer: "UNICORN CONNECTOR",
            cta: "Choose Professional Plan",
            popular: false,
            gradient: "blue",
        },
        {
            name: "Pro Max Ultra",
            price: "₹100000",
            period: "/Year",
            description: "Create Your Legacy!",
            features: [
                "🏢Ultra-Premium Virtual Office with AI-powered Decor",
                "🎟️50 Participation Credits",
                "🤖5 Top-notch AI Assistants",
                "🌐Custom Design with AI-powered Content Generation and Virtual Reality",
                "📧50 Email IDs",
                "📊AI-powered Predictive Maintenance",
                "💾50 GB Data Storage",
                "🛡️Top Notch AI-powered Security",
                "📚Dedicated 24/7 AI Support",
                "🤖Dedicated AI Agent 24/7 Support",
                "🎓Comprehensive AI Powered Onboarding, Ongoing Training, and Coaching",
                "🌐Access to Online Ultra-Exclusive Events, AI Powered Networking",
                "🦄AI Powered Unicorn Mentorship, Legacy Creation",
                "🎁I2u.ai Points:5,000",
                "📊AI-powered Business Intelligence, AI-powered Predictive Maintenance"
            ],
            includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], // All features included
            specialOffer: "LEGACY CREATOR",
            cta: "Choose Pro Max Ultra",
            popular: false,
            gradient: "pink",
        },
        
        {
          name: "Free Forever Plan",
            price: "₹0",
            period: "/Year",
            description: "Ignite Your Idea!",
            features: [
                "🏢Basic AI expertise resources",
                "🎟️Basic Template website",
                "📧1 Email ID",
                "💾50 MB Data Storage",
                "🛡️Basic Firewall",
                "📚Online Resources Support",
            ],
            includedFeatures: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // All features included
            specialOffer: "FREE FOREVER",
            cta: "Choose Free Forever Plan",
            popular: false,
            gradient: "green",
        },
    ];

  return (
    <div className="SubscriptionPlans">
      {/* Subscription Plans Section */}
      <div className="resources-section resources-plans-section">
        <h2 className="resources-section-title">
          🌟 Subscription Plans for Startups
        </h2>
        <div className="resources-content">
          <p>
            Choose from our comprehensive range of plans designed to accelerate
            your startup growth. From basic access to premium features, find the
            perfect plan that matches your goals and budget.
          </p>
        </div>
        

        <div className="resources-plans-grid">
          {subscriptionPlans.map((plan, index) => (
            <div
              key={index}
              className={`resources-plan-card ${plan.popular ? "popular" : ""}`}
            >
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}

              {/* Plan Header */}
              <div className="resources-plan-header">
                <h3 className="resources-plan-name">{plan.name}</h3>
              </div>

              {/* Price Section with Gradient */}
              <div
                className={`resources-plan-price-section resources-price-${plan.gradient}`}
              >
                <div className="resources-plan-price">
                  <span className="resources-price-amount">{plan.price}</span>
                  <span className="resources-price-period">{plan.period}</span>
                </div>
                <p className="resources-plan-description">{plan.description}</p>
              </div>

              {/* Features Section */}
              <div className="resources-plan-features">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="resources-plan-feature">
                    <ul className="resources-plan-feature-list">
                      {plan.includedFeatures.includes(featureIndex) ? (
                        <span className="resources-feature-icon included">
                          ✓
                        </span>
                      ) : (
                        <span className="resources-feature-icon excluded">
                          ✗
                        </span>
                      )}
                      <li>{feature}</li>
                    </ul>
                  </div>
                ))}
              </div>

              {/* Special Offer Section */}
              <div
                className={`resources-plan-offer resources-offer-${plan.gradient}`}
              >
                <span>{plan.specialOffer}</span>
              </div>

              {/* Call to Action */}
              <div
                className="resources-plan-cta"
                style={{ justifyContent: "center" }}
              >
                <Link
                  to="#googlePaySection"
                  rel="noopener noreferrer"
                  className="btnLink"
                  onClick={() => {
                    // Navigate to home page first, then scroll to section
                    window.location.href = "#googlePaySection";
                  }}
                >
                  <Button variant="outline">{plan.cta}</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="resources-plans-notice">
          <p>
            🌟 <strong>Your journey with us doesn't stop here!</strong> Discover
            even more features tailored to elevate your experience.
          </p>
        </div>
      </div>
    </div>
  );
}
