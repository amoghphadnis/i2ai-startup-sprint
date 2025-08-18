import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Pricing() {
    return (
        <>
            <Helmet>
                <title>Pricing Plans — i2u.ai | Flexible Plans for Every Startup</title>
                <meta name="description" content="At i2u.ai, we offer flexible pricing plans to suit your needs. Choose from Basic, Pro, or Enterprise plans designed to scale with your startup's growth." />
                <meta name="keywords" content="i2u.ai pricing, startup pricing plans, AI platform pricing, startup tools pricing, enterprise pricing, startup acceleration cost" />
                <meta property="og:title" content="Pricing Plans — i2u.ai | Flexible Plans for Every Startup" />
                <meta property="og:description" content="At i2u.ai, we offer flexible pricing plans to suit your needs. Choose from Basic, Pro, or Enterprise plans designed to scale with your startup's growth." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://i2u.ai/pricing" />
                <meta property="og:image" content="https://i2u.ai/assets/logo.png" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Pricing Plans — i2u.ai | Flexible Plans for Every Startup" />
                <meta name="twitter:description" content="At i2u.ai, we offer flexible pricing plans to suit your needs. Choose from Basic, Pro, or Enterprise plans designed to scale with your startup's growth." />
                <meta name="twitter:image" content="https://i2u.ai/assets/logo.png" />
                <link rel="canonical" href="https://i2u.ai/pricing" />
                
                {/* JSON-LD Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Pricing Plans — i2u.ai",
                        "description": "Flexible pricing plans for startups at every stage",
                        "url": "https://i2u.ai/pricing",
                        "mainEntity": {
                            "@type": "Organization",
                            "name": "i2u.ai",
                            "description": "AI startup platform offering flexible pricing plans"
                        },
                        "offers": [
                            {
                                "@type": "Offer",
                                "name": "Basic Plan",
                                "price": "29",
                                "priceCurrency": "USD",
                                "description": "Ideal for startups"
                            },
                            {
                                "@type": "Offer",
                                "name": "Pro Plan",
                                "price": "99",
                                "priceCurrency": "USD",
                                "description": "For growing businesses"
                            },
                            {
                                "@type": "Offer",
                                "name": "Enterprise Plan",
                                "description": "Custom pricing - Tailored solutions for large organizations"
                            }
                        ]
                    })}
                </script>
            </Helmet>
            
            <div className="pricing">
                <h1>Pricing Plans</h1>
                <p>
                    At i2u.ai, we offer flexible pricing plans to suit your needs. Whether you're a startup looking for basic features or an enterprise needing advanced capabilities, we have a plan for you.
                </p>
                <h2>Our Plans</h2>
                <ul>
                    <li>Basic Plan: $29/month - Ideal for startups</li>
                    <li>Pro Plan: $99/month - For growing businesses</li>
                    <li>Enterprise Plan: Custom pricing - Tailored solutions for large organizations</li>
                </ul>
                <h2>Get Started Today!</h2>
                <p>
                    Choose the plan that fits your needs and start building your AI-driven startup with i2u.ai.
                </p>
            </div>
        </>
    );
}