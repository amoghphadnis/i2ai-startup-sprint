// investorsSchema.js - JSON-LD Schema for SEO
export const investorsFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I join the i2u.ai Investors Network?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Join the waitlist for ₹101. We'll verify your investor credentials and provide access to our curated dealflow and evaluation tools."
      }
    },
    {
      "@type": "Question",
      "name": "What types of startups are available for investment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We focus on AI startups across various stages, from pre-seed to Series A, that have been vetted and screened for investment readiness."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be an accredited investor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Requirements vary by jurisdiction. We'll guide you through the verification process based on your location and investment type."
      }
    },
    {
      "@type": "Question",
      "name": "What evaluation tools are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Access to advanced valuation templates, due diligence checklists, market analysis tools, and AI-powered startup evaluation frameworks."
      }
    },
    {
      "@type": "Question",
      "name": "Can I participate in investment syndicates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Premium subscribers get priority access to investment syndicates, private rounds, and co-investment opportunities."
      }
    },
    {
      "@type": "Question",
      "name": "How often do you add new startups to the platform?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We add new vetted startups weekly, with priority access for premium subscribers and early adopters."
      }
    }
  ]
};

export const investorsOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "i2u.ai",
  "url": "https://i2u.ai",
  "logo": "https://i2u.ai/logo.png",
  "description": "AI startup platform connecting founders with investors, mentors, and resources",
  "foundingDate": "2024",
  "sameAs": [
    "https://linkedin.com/company/i2u-ai",
    "https://twitter.com/i2u_ai",
    "https://facebook.com/i2u.ai"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "investors@i2u.ai",
    "availableLanguage": ["English", "Hindi"]
  },
  "serviceArea": {
    "@type": "Place",
    "name": "Global",
    "description": "Worldwide investor network for AI startups"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Investor Programs",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Free Forever Investor Plan",
          "description": "Basic deal discovery and community access"
        },
        "price": "0",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Beginner Investor Plan",
          "description": "Dealflow access and basic valuation tools"
        },
        "price": "16000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Basic Investor Plan",
          "description": "Advanced diligence tools and exclusive events"
        },
        "price": "24000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Professional Investor Plan",
          "description": "Priority deal access and syndicate features"
        },
        "price": "60000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pro Max Ultra Investor Plan",
          "description": "Full-stack investor capabilities and dedicated support"
        },
        "price": "100000",
        "priceCurrency": "INR"
      }
    ]
  }
};

export const investorsWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Investors — i2u.ai | Connect with High-Potential AI Startups",
  "description": "Join i2u.ai's Investors Network — evaluate curated AI startups, access premium market intelligence and exclusive dealflow. Apply to join.",
  "url": "https://i2u.ai/resources/investors",
  "mainEntity": {
    "@type": "Organization",
    "name": "i2u.ai",
    "description": "AI startup platform connecting founders with investors, mentors, and resources"
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
        "name": "Investors",
        "item": "https://i2u.ai/resources/investors"
      }
    ]
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://i2u.ai/resources/investors?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Usage example:
// Add this to your component's head or use a React Helmet equivalent
export const generateInvestorsSchema = () => {
  return [
    investorsFAQSchema,
    investorsOrganizationSchema,
    investorsWebPageSchema
  ];
};
