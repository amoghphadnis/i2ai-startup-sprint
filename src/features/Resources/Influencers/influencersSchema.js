// influencersSchema.js - JSON-LD Schema for SEO
export const influencersFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How can influencers collaborate with startups on i2u.ai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Influencers join the waitlist, set up a creator profile, get matched to startup campaigns, and then publish sponsored or organic content using our creator toolkit."
      }
    },
    {
      "@type": "Question",
      "name": "Do influencers get paid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — paid collaboration credits and affiliate/commission programs are available on paid plans and for high-performing creators."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use i2u.ai content for multiple channels?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — content created with the creator toolkit can be exported and optimized for social platforms, blogs, and video channels."
      }
    },
    {
      "@type": "Question",
      "name": "What types of content can I create?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can create various content types including social media posts, blog articles, video content, podcast episodes, and live streams about AI startups and their innovations."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get matched with startup campaigns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI-powered matching system analyzes your content style, audience demographics, and startup requirements to suggest the best collaborations for both parties."
      }
    },
    {
      "@type": "Question",
      "name": "What analytics and insights are provided?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Access to engagement metrics, audience insights, campaign performance data, and referral tracking to optimize your content strategy and maximize impact."
      }
    }
  ]
};

export const influencersOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "i2u.ai",
  "url": "https://i2u.ai",
  "logo": "https://i2u.ai/logo.png",
  "description": "AI startup platform connecting founders with influencers, mentors, and investors",
  "foundingDate": "2024",
  "sameAs": [
    "https://linkedin.com/company/i2u-ai",
    "https://twitter.com/i2u_ai",
    "https://facebook.com/i2u.ai"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "influencers@i2u.ai",
    "availableLanguage": ["English", "Hindi"]
  },
  "serviceArea": {
    "@type": "Place",
    "name": "Global",
    "description": "Worldwide influencer network for AI startups"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Influencer Programs",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Free Forever Influencer Plan",
          "description": "Starter creator tools and basic content credits"
        },
        "price": "0",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Beginner Influencer Plan",
          "description": "Content templates and sponsored campaigns"
        },
        "price": "16000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Basic Influencer Plan",
          "description": "Advanced creator toolkit and brand collaborations"
        },
        "price": "24000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Professional Influencer Plan",
          "description": "Priority collaboration and campaign access"
        },
        "price": "60000",
        "priceCurrency": "INR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pro Max Ultra Influencer Plan",
          "description": "Full creator-suite and exclusive brand deals"
        },
        "price": "100000",
        "priceCurrency": "INR"
      }
    ]
  }
};

export const influencersWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Influencers — i2u.ai | Create & Amplify AI Stories",
  "description": "Join i2u.ai Influencers — amplify AI startups, create content, access creator tools and rewards. Join the waitlist for ₹101.",
  "url": "https://i2u.ai/resources/influencers",
  "mainEntity": {
    "@type": "Organization",
    "name": "i2u.ai",
    "description": "AI startup platform connecting founders with influencers, mentors, and investors"
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
        "name": "Influencers",
        "item": "https://i2u.ai/resources/influencers"
      }
    ]
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://i2u.ai/resources/influencers?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Usage example:
// Add this to your component's head or use a React Helmet equivalent
export const generateInfluencersSchema = () => {
  return [
    influencersFAQSchema,
    influencersOrganizationSchema,
    influencersWebPageSchema
  ];
};
