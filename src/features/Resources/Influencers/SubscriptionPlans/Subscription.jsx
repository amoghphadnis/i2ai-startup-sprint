import React from "react";
import "./Subscription.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Subscription() {
    // Influencer-specific Subscription Plans Data
    const subscriptionPlans = [
        {
            name: "Free Forever Plan",
            price: "₹0",
            period: "/Year",
            description: "Starter creator tools and basic content credits",
            features: [
                "Basic creator toolkit",
                "1 campaign per quarter",
                "Community access"
            ],
            includedFeatures: [0, 1, 2], // All features included
            specialOffer: "FREE FOREVER",
            cta: "Join Free",
            popular: false,
            gradient: "green",
        },
        {
            name: "Beginner",
            price: "₹16000",
            period: "/Year",
            description: "For part-time creators & micro-influencers",
            features: [
                "Content templates & AI drafts",
                "1 sponsored campaign/month",
                "5 content credits"
            ],
            includedFeatures: [0, 1, 2], // All features included
            specialOffer: "INFLUENCER STARTER",
            cta: "Choose Beginner",
            popular: false,
            gradient: "blue"
        },
        {
            name: "Basic",
            price: "₹24000",
            period: "/Year",
            description: "For creators growing audience & collaborations",
            features: [
                "Advanced creator toolkit",
                "Quarterly brand collaborations",
                "10 content credits"
            ],
            includedFeatures: [0, 1, 2], // All features included
            specialOffer: "INFLUENCER BUILDER",
            cta: "Choose Basic",
            popular: true,
            gradient: "pink"
        },
        {
            name: "Professional",
            price: "₹60000",
            period: "/Year",
            description: "Priority collaboration & campaign access",
            features: [
                "Dedicated campaign manager",
                "Priority invites to demo days",
                "50 content credits"
            ],
            includedFeatures: [0, 1, 2], // All features included
            specialOffer: "INFLUENCER LEADER",
            cta: "Choose Professional",
            popular: false,
            gradient: "blue"
        },
        {
            name: "Pro Max Ultra",
            price: "₹100000",
            period: "/Year",
            description: "Full creator-suite & exclusive brand deals",
            features: [
                "Personalized content strategy",
                "Sponsored fees & VIP event access",
                "Unlimited content credits"
            ],
            includedFeatures: [0, 1, 2], // All features included
            specialOffer: "INFLUENCER MASTER",
            cta: "Choose Pro Max Ultra",
            popular: false,
            gradient: "pink"
        }
    ];

    return (
        <div className="SubscriptionPlans">
            {/* Subscription Plans Section */}
            <div className="influencers-section influencers-plans-section">
                <h2 className="influencers-section-title">
                    🌟 Subscription Plans for Influencers
                </h2>
                <div className="influencers-content">
                    <p>
                        Plans are designed for part-time creators through to professional influencers — each plan unlocks more creator tools, campaign opportunities, and content credits.
                    </p>
                </div>

                <div className="influencers-plans-grid">
                    {subscriptionPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`influencers-plan-card ${plan.popular ? "popular" : ""}`}
                        >
                            {plan.popular && (
                                <div className="popular-badge">Most Popular</div>
                            )}

                            {/* Plan Header */}
                            <div className="influencers-plan-header">
                                <h3 className="influencers-plan-name">{plan.name}</h3>
                            </div>

                            {/* Price Section with Gradient */}
                            <div
                                className={`influencers-plan-price-section influencers-price-${plan.gradient}`}
                            >
                                <div className="influencers-plan-price">
                                    <span className="influencers-price-amount">{plan.price}</span>
                                    <span className="influencers-price-period">{plan.period}</span>
                                </div>
                                <p className="influencers-plan-description">{plan.description}</p>
                            </div>

                            {/* Features Section */}
                            <div className="influencers-plan-features">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="influencers-plan-feature">
                                        <ul className="influencers-plan-feature-list">
                                            {plan.includedFeatures.includes(featureIndex) ? (
                                                <span className="influencers-feature-icon included">
                                                    ✓
                                                </span>
                                            ) : (
                                                <span className="influencers-feature-icon excluded">
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
                                className={`influencers-plan-offer influencers-offer-${plan.gradient}`}
                            >
                                <span>{plan.specialOffer}</span>
                            </div>

                            {/* Call to Action */}
                            <div
                                className="influencers-plan-cta"
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

                <div className="influencers-plans-notice">
                    <p>
                        🌟 <strong>Your creator journey with us doesn't stop here!</strong> Discover
                        even more features tailored to elevate your content and maximize your impact.
                    </p>
                </div>
            </div>
        </div>
    );
}
