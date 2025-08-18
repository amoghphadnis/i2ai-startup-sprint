// mentorsSchema.js - JSON-LD Schema for SEO
export const mentorsFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I join the i2u.ai Mentor Program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Join the waitlist for ₹101. We'll verify your profile and match you with startups aligned to your expertise."
      }
    },
    {
      "@type": "Question",
      "name": "What are the mentor rewards?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Early mentor registrants are eligible for complimentary subscription tiers (Beginner to Pro Max Ultra) for the first year, plus i2u.ai Points and event passes."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be full-time to mentor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. We support part-time mentors, cohort leads, and full-time advisors. Choose the subscription that matches your time commitment."
      }
    },
    {
      "@type": "Question",
      "name": "What types of startups will I mentor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We focus on AI startups across various stages, from idea to Series A. You'll be matched based on your expertise in product, GTM, fundraising, or technology."
      }
    },
    {
      "@type": "Question",
      "name": "How are mentor-startup matches made?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI-powered matching system considers your expertise, availability, and startup needs to create optimal mentor-founder pairings."
      }
    },
    {
      "@type": "Question",
      "name": "Can I earn money through the mentor program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Earn i2u.ai Points, referral bonuses, and unlock premium subscription credits. Top mentors also get access to exclusive events and networking opportunities."
      }
    }
  ]
};

export const mentorsOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "i2u.ai",
  "url": "https://i2u.ai",
  "logo": "https://i2u.ai/logo.png",
  "description": "AI startup platform connecting founders with mentors, investors, and resources",
  "foundingDate": "2024",
  "sameAs": [
    "https://linkedin.com/company/i2u-ai",
    "https://twitter.com/i2u_ai",
    "https://facebook.com/i2u.ai"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "mentors@i2u.ai",
    "availableLanguage": ["English", "Hindi"]
  },
  "serviceArea": {
    "@type": "Place",
    "name": "Global",
    "description": "Worldwide mentor network for AI startups"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Mentor Programs",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Free Forever Mentor Plan",
          "description": "Basic mentoring tools and community access"
        },
        "price": "0",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Beginner Mentor Plan",
          "description": "Market intelligence and quarterly cohorts"
        },
        "price": "16000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Basic Mentor Plan",
          "description": "Advanced tools and mentor-only events"
        },
        "price": "24000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Professional Mentor Plan",
          "description": "Priority matching and monthly coaching"
        },
        "price": "60000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pro Max Ultra Mentor Plan",
          "description": "Dedicated dashboard and VIP access"
        },
        "price": "100000",
        "priceCurrency": "INR"
      }
    ]
  }
};

export const mentorsWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Mentors — i2u.ai | Join the AI Startup Mentor Network",
  "description": "Join i2u.ai's Mentor Program — mentor top AI startups, access market intelligence, and claim exclusive mentor benefits and rewards. Register now.",
  "url": "https://i2u.ai/resources/mentors",
  "mainEntity": {
    "@type": "Organization",
    "name": "i2u.ai",
    "description": "AI startup platform connecting founders with mentors, investors, and resources"
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
        "name": "Mentors",
        "item": "https://i2u.ai/resources/mentors"
      }
    ]
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://i2u.ai/resources/mentors?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Usage example:
// Add this to your component's head or use a React Helmet equivalent
export const generateMentorsSchema = () => {
  return [
    mentorsFAQSchema,
    mentorsOrganizationSchema,
    mentorsWebPageSchema
  ];
};
