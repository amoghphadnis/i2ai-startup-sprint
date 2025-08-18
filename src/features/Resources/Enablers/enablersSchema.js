// enablersSchema.js - JSON-LD Schema for SEO
export const enablersFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who should register as an Enabler on i2u.ai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Incubators, accelerators, university programs, corporate innovation teams, and platform enablers looking to manage cohorts and scale startup outcomes."
      }
    },
    {
      "@type": "Question",
      "name": "What does the ₹101 waitlist give me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Access to the waitlist with eligibility for early-adopter subscription rewards, onboarding instructions, and priority matching to partners and mentors."
      }
    },
    {
      "@type": "Question",
      "name": "Can I run private cohorts for my portfolio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — paid plans include cohort management tools, private channels, and analytics for tracking startup progress."
      }
    },
    {
      "@type": "Question",
      "name": "What program management tools are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Access to cohort scheduling, curriculum templates, progress tracking, KPI dashboards, and AI-powered startup scoring for portfolio management."
      }
    },
    {
      "@type": "Question",
      "name": "How do I integrate with existing programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our platform provides flexible integration options, allowing you to import existing startup data and customize workflows to match your current processes."
      }
    },
    {
      "@type": "Question",
      "name": "What support is available for program setup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Premium subscribers get dedicated onboarding support, custom KPI dashboards, and priority access to our enablement team for program optimization."
      }
    }
  ]
};

export const enablersOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "i2u.ai",
  "url": "https://i2u.ai",
  "logo": "https://i2u.ai/logo.png",
  "description": "AI startup platform connecting founders with enablers, mentors, and investors",
  "foundingDate": "2024",
  "sameAs": [
    "https://linkedin.com/company/i2u-ai",
    "https://twitter.com/i2u_ai",
    "https://facebook.com/i2u.ai"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "enablers@i2u.ai",
    "availableLanguage": ["English", "Hindi"]
  },
  "serviceArea": {
    "@type": "Place",
    "name": "Global",
    "description": "Worldwide enabler network for AI startups"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Enabler Programs",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Free Forever Enabler Plan",
          "description": "Basic tools for small programs and alumni networks"
        },
        "price": "0",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Beginner Enabler Plan",
          "description": "Portfolio insights and cohort management templates"
        },
        "price": "16000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Basic Enabler Plan",
          "description": "Advanced portfolio analytics and program review templates"
        },
        "price": "24000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Professional Enabler Plan",
          "description": "Priority onboarding and custom KPI dashboards"
        },
        "price": "60000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pro Max Ultra Enabler Plan",
          "description": "Enterprise enablement with dedicated manager and unlimited cohorts"
        },
        "price": "100000",
        "priceCurrency": "INR"
      }
    ]
  }
};

export const enablersWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Enablers — i2u.ai | Build Startup Ecosystems & Accelerate Growth",
  "description": "Join i2u.ai Enablers — support startups, run programs, access AI tools & exclusive rewards. Join the waitlist for ₹101.",
  "url": "https://i2u.ai/resources/enablers",
  "mainEntity": {
    "@type": "Organization",
    "name": "i2u.ai",
    "description": "AI startup platform connecting founders with enablers, mentors, and investors"
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
        "name": "Enablers",
        "item": "https://i2u.ai/resources/enablers"
      }
    ]
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://i2u.ai/resources/enablers?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Usage example:
// Add this to your component's head or use a React Helmet equivalent
export const generateEnablersSchema = () => {
  return [
    enablersFAQSchema,
    enablersOrganizationSchema,
    enablersWebPageSchema
  ];
};
