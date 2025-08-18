// investorsPlans.js
export const investorsPlans = [
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
    gradient: "green"
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
