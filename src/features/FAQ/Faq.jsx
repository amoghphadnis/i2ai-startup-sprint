import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Faq() {
    return (
        <>
            <Helmet>
                <title>FAQ — i2u.ai | Frequently Asked Questions</title>
                <meta name="description" content="Find answers to common questions about i2u.ai platform, services, and how to get started with your startup journey." />
                <meta name="keywords" content="i2u.ai FAQ, frequently asked questions, startup platform, AI tools, startup resources, how to get started" />
                <meta property="og:title" content="FAQ — i2u.ai | Frequently Asked Questions" />
                <meta property="og:description" content="Find answers to common questions about i2u.ai platform, services, and how to get started with your startup journey." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://i2u.ai/faq" />
                <meta property="og:image" content="https://i2u.ai/assets/logo.png" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="FAQ — i2u.ai | Frequently Asked Questions" />
                <meta name="twitter:description" content="Find answers to common questions about i2u.ai platform, services, and how to get started with your startup journey." />
                <meta name="twitter:image" content="https://i2u.ai/assets/logo.png" />
                <link rel="canonical" href="https://i2u.ai/faq" />
                
                {/* JSON-LD Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "name": "i2u.ai FAQ",
                        "description": "Frequently asked questions about i2u.ai platform and services",
                        "url": "https://i2u.ai/faq",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What is i2u.ai?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "i2u.ai is an AI-driven platform designed to help entrepreneurs turn their startup ideas into successful businesses."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How does the Startup in Action program work?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Our program provides AI-powered tools, resources, and community support to assist you in developing your startup."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How can I get started?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "You can sign up on our website to access our resources and start your journey with i2u.ai."
                                }
                            }
                        ]
                    })}
                </script>
            </Helmet>
            
            <div className="faq">
                <h1>Frequently Asked Questions (FAQ)</h1>
                <p>
                    Welcome to the i2u.ai FAQ section! Here, we address some of the most common questions about our platform and services.
                </p>
                <h2>What is i2u.ai?</h2>
                <p>
                    i2u.ai is an AI-driven platform designed to help entrepreneurs turn their startup ideas into successful businesses.
                </p>
                <h2>How does the Startup in Action program work?</h2>
                <p>
                    Our program provides AI-powered tools, resources, and community support to assist you in developing your startup.
                </p>
                <h2>How can I get started?</h2>
                <p>
                    You can sign up on our website to access our resources and start your journey with i2u.ai.
                </p>
            </div>
        </>
    );
}