import React from "react";
import "./Subscription.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Subscription() {
    // Mentor-specific Subscription Plans Data
    const subscriptionPlans = [
        {
            name: "Free Forever Plan",
            price: "₹0",
            period: "/Year",
            description: "Start mentoring with zero commitment",
            features: [
                "Limited access to mentor tools",
                "1 office hour session/month",
                "Community access",
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
            description: "For occasional mentors and advisors",
            features: [
                "Market intelligence access",
                "Quarterly mentor cohorts",
                "5 participation credits",
                "1 AI assistant slot"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "MENTOR STARTER",
            cta: "Choose Beginner",
            popular: false,
            gradient: "blue"
        },
        {
            name: "Basic",
            price: "₹24000",
            period: "/Year",
            description: "For recurring mentors who host sessions",
            features: [
                "Advanced market tools",
                "Quarterly invites to mentor-only events",
                "10 participation credits",
                "2 AI assistant slots"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "MENTOR BUILDER",
            cta: "Choose Basic",
            popular: true,
            gradient: "pink"
        },
        {
            name: "Professional",
            price: "₹60000",
            period: "/Year",
            description: "For lead mentors and cohort leads",
            features: [
                "Priority matching with startups",
                "Monthly mentor coaching sessions",
                "50 participation credits",
                "Priority event passes"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "MENTOR LEADER",
            cta: "Choose Professional",
            popular: false,
            gradient: "blue"
        },
        {
            name: "Pro Max Ultra",
            price: "₹100000",
            period: "/Year",
            description: "For mentors who lead high-touch programs",
            features: [
                "Dedicated mentor dashboard",
                "Private introductions to founders",
                "Unlimited participation credits",
                "VIP event access"
            ],
            includedFeatures: [0, 1, 2, 3], // All features included
            specialOffer: "MENTOR MASTER",
            cta: "Choose Pro Max Ultra",
            popular: false,
            gradient: "pink"
        }
    ];

    return (
        <div className="SubscriptionPlans">
            {/* Subscription Plans Section */}
            <div className="mentors-section mentors-plans-section">
                <h2 className="mentors-section-title">
                    🌟 Subscription Plans for Mentors
                </h2>
                <div className="mentors-content">
                    <p>
                        Choose from our comprehensive range of plans designed to accelerate
                        your mentoring impact. From basic access to premium features, find the
                        perfect plan that matches your goals and time commitment.
                    </p>
                </div>

                <div className="mentors-plans-grid">
                    {subscriptionPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`mentors-plan-card ${plan.popular ? "popular" : ""}`}
                        >
                            {plan.popular && (
                                <div className="popular-badge">Most Popular</div>
                            )}

                            {/* Plan Header */}
                            <div className="mentors-plan-header">
                                <h3 className="mentors-plan-name">{plan.name}</h3>
                            </div>

                            {/* Price Section with Gradient */}
                            <div
                                className={`mentors-plan-price-section mentors-price-${plan.gradient}`}
                            >
                                <div className="mentors-plan-price">
                                    <span className="mentors-price-amount">{plan.price}</span>
                                    <span className="mentors-price-period">{plan.period}</span>
                                </div>
                                <p className="mentors-plan-description">{plan.description}</p>
                            </div>

                            {/* Features Section */}
                            <div className="mentors-plan-features">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="mentors-plan-feature">
                                        <ul className="mentors-plan-feature-list">
                                            {plan.includedFeatures.includes(featureIndex) ? (
                                                <span className="mentors-feature-icon included">
                                                    ✓
                                                </span>
                                            ) : (
                                                <span className="mentors-feature-icon excluded">
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
                                className={`mentors-plan-offer mentors-offer-${plan.gradient}`}
                            >
                                <span>{plan.specialOffer}</span>
                            </div>

                            {/* Call to Action */}
                            <div
                                className="mentors-plan-cta"
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

                <div className="mentors-plans-notice">
                    <p>
                        🌟 <strong>Your mentoring journey with us doesn't stop here!</strong> Discover
                        even more features tailored to elevate your mentoring experience.
                    </p>
                </div>
            </div>
        </div>
    );
}
