import React from "react";
import "./Subscription.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Subscription() {
    // Investor-specific Subscription Plans Data
    const subscriptionPlans = [
        {
            name: "Free Forever Plan",
            price: "₹0",
            period: "/Year",
            description: "Get started with basic deal discovery",
            features: [
                "Limited dealflow access",
                "1 demo per quarter",
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
            description: "For angel investors starting with curated deals",
            features: [
                "Dealflow access",
                "Basic valuation tools",
                "1 meeting/month with founders"
            ],
            includedFeatures: [0, 1, 2], // All features included
            specialOffer: "INVESTOR STARTER",
            cta: "Choose Beginner",
            popular: false,
            gradient: "blue"
        },
        {
            name: "Basic",
            price: "₹24000",
            period: "/Year",
            description: "Access deeper diligence tools",
            features: [
                "Advanced valuation templates",
                "Quarterly exclusive investor events",
                "5 meeting credits"
            ],
            includedFeatures: [0, 1, 2], // All features included
            specialOffer: "INVESTOR BUILDER",
            cta: "Choose Basic",
            popular: true,
            gradient: "pink"
        },
        {
            name: "Professional",
            price: "₹60000",
            period: "/Year",
            description: "Priority deal access and syndicate features",
            features: [
                "Priority introductions",
                "Monthly curated lists",
                "LP reporting templates"
            ],
            includedFeatures: [0, 1, 2], // All features included
            specialOffer: "INVESTOR LEADER",
            cta: "Choose Professional",
            popular: false,
            gradient: "blue"
        },
        {
            name: "Pro Max Ultra",
            price: "₹100000",
            period: "/Year",
            description: "Full-stack investor capabilities",
            features: [
                "Dedicated deal analyst",
                "Private round access",
                "Unlimited seats at investor events"
            ],
            includedFeatures: [0, 1, 2], // All features included
            specialOffer: "INVESTOR MASTER",
            cta: "Choose Pro Max Ultra",
            popular: false,
            gradient: "pink"
        }
    ];

    return (
        <div className="SubscriptionPlans">
            {/* Subscription Plans Section */}
            <div className="investors-section investors-plans-section">
                <h2 className="investors-section-title">
                    🌟 Subscription Plans for Investors
                </h2>
                <div className="investors-content">
                    <p>
                        Plans are designed for occasional angel investors through to institutional partners — each plan unlocks more data, seats at exclusive investor rounds, and more credits for deal access.
                    </p>
                </div>

                <div className="investors-plans-grid">
                    {subscriptionPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`investors-plan-card ${plan.popular ? "popular" : ""}`}
                        >
                            {plan.popular && (
                                <div className="popular-badge">Most Popular</div>
                            )}

                            {/* Plan Header */}
                            <div className="investors-plan-header">
                                <h3 className="investors-plan-name">{plan.name}</h3>
                            </div>

                            {/* Price Section with Gradient */}
                            <div
                                className={`investors-plan-price-section investors-price-${plan.gradient}`}
                            >
                                <div className="investors-plan-price">
                                    <span className="investors-price-amount">{plan.price}</span>
                                    <span className="investors-price-period">{plan.period}</span>
                                </div>
                                <p className="investors-plan-description">{plan.description}</p>
                            </div>

                            {/* Features Section */}
                            <div className="investors-plan-features">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="investors-plan-feature">
                                        <ul className="investors-plan-feature-list">
                                            {plan.includedFeatures.includes(featureIndex) ? (
                                                <span className="investors-feature-icon included">
                                                    ✓
                                                </span>
                                            ) : (
                                                <span className="investors-feature-icon excluded">
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
                                className={`investors-plan-offer investors-offer-${plan.gradient}`}
                            >
                                <span>{plan.specialOffer}</span>
                            </div>

                            {/* Call to Action */}
                            <div
                                className="investors-plan-cta"
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

                <div className="investors-plans-notice">
                    <p>
                        🌟 <strong>Your investment journey with us doesn't stop here!</strong> Discover
                        even more features tailored to elevate your investment decision-making.
                    </p>
                </div>
            </div>
        </div>
    );
}
