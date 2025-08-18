import React from "react";
import "./Subscription.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Subscription() {
    // Facilitator-specific Subscription Plans Data
    const subscriptionPlans = [
        {
            name: "Free Forever Plan",
            price: "₹0",
            period: "/Year",
            description: "Starter listing & limited tools for facilitators",
            features: [
                "Basic facilitator profile",
                "1 workshop/month",
                "Community exposure",
                "Basic AI diagnostic tools"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "FREE FOREVER",
            cta: "Join Free",
            popular: false,
            gradient: "green",
        },
        {
            name: "Beginner",
            price: "₹16000",
            period: "/Year",
            description: "For independent consultants & small agencies",
            features: [
                "Lead routing to startups",
                "Workshop templates",
                "5 meeting credits",
                "1 AI assistant slot"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "EARLY ACCESS",
            cta: "Choose Beginner",
            popular: false,
            gradient: "blue"
        },
        {
            name: "Basic",
            price: "₹24000",
            period: "/Year",
            description: "Scale workshops & client engagements",
            features: [
                "Advanced diagnostic tools",
                "Quarterly featured listing",
                "10 meeting credits",
                "2 AI assistant slots"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "MOST POPULAR",
            cta: "Choose Basic",
            popular: true,
            gradient: "pink"
        },
        {
            name: "Professional",
            price: "₹60000",
            period: "/Year",
            description: "For boutique agencies & high-volume facilitators",
            features: [
                "Priority lead routing",
                "Custom workshop co-branding",
                "50 meeting credits",
                "Priority event invites"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "PROFESSIONAL",
            cta: "Choose Professional",
            popular: false,
            gradient: "blue"
        },
        {
            name: "Pro Max Ultra",
            price: "₹100000",
            period: "/Year",
            description: "Enterprise facilitator toolkit & dedicated growth ops",
            features: [
                "Dedicated success manager",
                "Unlimited workshops & cohorts",
                "Custom integrations & analytics",
                "VIP event & sponsor access"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "ENTERPRISE",
            cta: "Choose Pro Max Ultra",
            popular: false,
            gradient: "pink"
        }
    ];

    return (
        <div className="SubscriptionPlans">
            {/* Subscription Plans Section */}
            <div className="facilitators-section facilitators-plans-section">
                <h2 className="facilitators-section-title">
                    🌟 Subscription Plans for Facilitators
                </h2>
                <div className="facilitators-content">
                    <p>
                        Plans are designed for independent consultants through to enterprise facilitators — each plan unlocks more lead routing, workshop tools, and AI-powered diagnostic features.
                    </p>
                </div>

                <div className="facilitators-plans-grid">
                    {subscriptionPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`facilitators-plan-card ${plan.popular ? "popular" : ""}`}
                        >
                            {plan.popular && (
                                <div className="popular-badge">Most Popular</div>
                            )}

                            {/* Plan Header */}
                            <div className="facilitators-plan-header">
                                <h3 className="facilitators-plan-name">{plan.name}</h3>
                            </div>

                            {/* Price Section with Gradient */}
                            <div
                                className={`facilitators-plan-price-section facilitators-price-${plan.gradient}`}
                            >
                                <div className="facilitators-plan-price">
                                    <span className="facilitators-price-amount">{plan.price}</span>
                                    <span className="facilitators-price-period">{plan.period}</span>
                                </div>
                                <p className="facilitators-plan-description">{plan.description}</p>
                            </div>

                            {/* Features Section */}
                            <div className="facilitators-plan-features">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="facilitators-plan-feature">
                                        <ul className="facilitators-plan-feature-list">
                                            {plan.includedFeatures.includes(featureIndex) ? (
                                                <span className="facilitators-feature-icon included">
                                                    ✓
                                                </span>
                                            ) : (
                                                <span className="facilitators-feature-icon excluded">
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
                                className={`facilitators-plan-offer facilitators-offer-${plan.gradient}`}
                            >
                                <span>{plan.specialOffer}</span>
                            </div>

                            {/* Call to Action */}
                            <div
                                className="facilitators-plan-cta"
                                style={{ justifyContent: "center" }}
                            >
                                <Link
                                    to="#googlePaySection"
                                    rel="noopener noreferrer"
                                    className="btnLink"
                                    onClick={() => {
                                        // Navigate to section
                                        const el = document.getElementById('googlePaySection');
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    <Button variant="outline">{plan.cta}</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="facilitators-plans-notice">
                    <p>
                        🌟 <strong>Your facilitator journey with us doesn't stop here!</strong> Discover
                        even more features tailored to elevate your workshops and maximize your impact.
                    </p>
                </div>
            </div>
        </div>
    );
}
