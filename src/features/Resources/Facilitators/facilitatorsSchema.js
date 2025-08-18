// facilitatorsSchema.js - JSON-LD Schema for SEO
export const facilitatorsFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Who should register as a Facilitator on i2u.ai?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Product consultants, agencies, trainers, accelerator staff, and service providers who run workshops, offer product services, or support early-stage startups."
            }
        },
        {
            "@type": "Question",
            "name": "What does the ₹101 waitlist include?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Access to the waitlist, early-adopter rewards eligibility, onboarding instructions, and priority visibility for new facilitator leads."
            }
        },
        {
            "@type": "Question",
            "name": "How do I get leads from i2u.ai?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Paid plans and active facilitator profiles receive prioritized lead routing. We match facilitator expertise to startup needs and surface suitable matches for outreach."
            }
        },
        {
            "@type": "Question",
            "name": "What types of workshops can I run?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can run various workshops including product discovery, growth sprints, GTM strategy, fundraising preparation, and technical architecture sessions."
            }
        },
        {
            "@type": "Question",
            "name": "Can I offer paid services beyond workshops?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes — paid plans allow you to offer consulting services, product audits, and ongoing advisory relationships with startups."
            }
        },
        {
            "@type": "Question",
            "name": "How do I track my performance and earnings?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Premium subscribers get access to analytics dashboards showing lead conversion, workshop performance, and revenue tracking from i2u.ai referrals."
            }
        }
    ]
};

export const facilitatorsOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "i2u.ai",
    "url": "https://i2u.ai",
    "logo": "https://i2u.ai/logo.png",
    "description": "AI-powered startup ecosystem platform connecting mentors, investors, enablers, influencers, and facilitators with promising startups.",
    "foundingDate": "2024",
    "sameAs": [
        "https://linkedin.com/company/i2u-ai",
        "https://twitter.com/i2u_ai",
        "https://github.com/i2u-ai"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@i2u.ai"
    }
};

export const facilitatorsWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Facilitators — i2u.ai | Service Providers & Startup Consultants",
    "description": "Join i2u.ai Facilitators — provide services to startups, run workshops, get leads, and access AI tools. Join the waitlist for ₹101.",
    "url": "https://i2u.ai/resources/facilitators",
    "mainEntity": {
        "@type": "Service",
        "name": "Facilitator Services for Startups",
        "description": "Workshop facilitation, consulting services, and lead generation for startup service providers",
        "provider": {
            "@type": "Organization",
            "name": "i2u.ai"
        },
        "offers": {
            "@type": "Offer",
            "price": "101",
            "priceCurrency": "INR",
            "description": "Waitlist registration for facilitator services"
        }
    },
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://i2u.ai"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Resources",
                "item": "https://i2u.ai/resources"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Facilitators",
                "item": "https://i2u.ai/resources/facilitators"
            }
        ]
    }
};

// Function to generate complete schema
export const generateFacilitatorsSchema = () => {
    return {
        facilitatorsFAQSchema,
        facilitatorsOrganizationSchema,
        facilitatorsWebPageSchema
    };
};
