import React from "react";
import "./Subscription.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Subscription() {
    // Enabler-specific Subscription Plans Data
    const subscriptionPlans = [
        {
            name: "Free Forever Plan",
            price: "₹0",
            period: "/Year",
            description: "Basic tools for small programs and alumni networks",
            features: [
                "Limited portfolio dashboard",
                "1 cohort per year",
                "1 Video session/month",
                "Basic AI resources"
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
            description: "For small incubators and pilot programs",
            features: [
                "Portfolio insights",
                "Cohort management templates",
                "5 participation credits",
                "1 AI assistant slot"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "ENABLER STARTER",
            cta: "Choose Beginner",
            popular: false,
            gradient: "blue"
        },
        {
            name: "Basic",
            price: "₹24000",
            period: "/Year",
            description: "Scale multiple cohorts with reporting",
            features: [
                "Advanced portfolio analytics",
                "Quarterly program review templates",
                "10 participation credits",
                "2 AI assistant slots"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "ENABLER BUILDER",
            cta: "Choose Basic",
            popular: true,
            gradient: "pink"
        },
        {
            name: "Professional",
            price: "₹60000",
            period: "/Year",
            description: "For established accelerators & corporate programs",
            features: [
                "Priority onboarding support",
                "Custom KPI dashboards",
                "50 participation credits",
                "Priority matchmaking with investors"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "ENABLER LEADER",
            cta: "Choose Professional",
            popular: false,
            gradient: "blue"
        },
        {
            name: "Pro Max Ultra",
            price: "₹100000",
            period: "/Year",
            description: "Enterprise enablement & high-touch program ops",
            features: [
                "Dedicated enablement manager",
                "Unlimited cohorts",
                "Custom integrations & analytics",
                "VIP event access"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "ENABLER MASTER",
            cta: "Choose Pro Max Ultra",
            popular: false,
            gradient: "pink"
        }
    ];

    return (
        <div className="SubscriptionPlans">
            {/* Subscription Plans Section */}
            <div className="enablers-section enablers-plans-section">
                <h2 className="enablers-section-title">
                    🌟 Subscription Plans for Enablers
                </h2>
                <div className="enablers-content">
                    <p>
                        Plans are designed for small incubators through to enterprise enablement programs — each plan unlocks more portfolio tools, cohort management features, and AI-powered insights.
                    </p>
                </div>

                <div className="enablers-plans-grid">
                    {subscriptionPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`enablers-plan-card ${plan.popular ? "popular" : ""}`}
                        >
                            {plan.popular && (
                                <div className="popular-badge">Most Popular</div>
                            )}

                            {/* Plan Header */}
                            <div className="enablers-plan-header">
                                <h3 className="enablers-plan-name">{plan.name}</h3>
                            </div>

                            {/* Price Section with Gradient */}
                            <div
                                className={`enablers-plan-price-section enablers-price-${plan.gradient}`}
                            >
                                <div className="enablers-plan-price">
                                    <span className="enablers-price-amount">{plan.price}</span>
                                    <span className="enablers-price-period">{plan.period}</span>
                                </div>
                                <p className="enablers-plan-description">{plan.description}</p>
                            </div>

                            {/* Features Section */}
                            <div className="enablers-plan-features">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="enablers-plan-feature">
                                        <ul className="enablers-plan-feature-list">
                                            {plan.includedFeatures.includes(featureIndex) ? (
                                                <span className="enablers-feature-icon included">
                                                    ✓
                                                </span>
                                            ) : (
                                                <span className="enablers-feature-icon excluded">
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
                                className={`enablers-plan-offer enablers-offer-${plan.gradient}`}
                            >
                                <span>{plan.specialOffer}</span>
                            </div>

                            {/* Call to Action */}
                            <div
                                className="enablers-plan-cta"
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

                <div className="enablers-plans-notice">
                    <p>
                        🌟 <strong>Your enablement journey with us doesn't stop here!</strong> Discover
                        even more features tailored to elevate your program outcomes and startup success rates.
                    </p>
                </div>
            </div>
        </div>
    );
}
