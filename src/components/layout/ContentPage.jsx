import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageContainer from '@/features/Resources/components/ui/PageContainer';
import Hero from '@/features/Resources/components/ui/Hero';
import Section from '@/features/Resources/components/ui/Section';
import PlansGrid from '@/features/Resources/components/ui/PlansGrid';
import CTABand from '@/features/Resources/components/ui/CTABand';
import FAQAccordion from '@/features/Resources/components/ui/FAQAccordion';
import References from '@/features/Resources/components/ui/References';
import GooglePayPayment from '@/components/GooglePayPayment/GooglePayPayment';
import './ContentPage.css';

const ContentPage = ({
  hero = {},
  sections = [],
  plans = [],
  payment = {},
  faq = {},
  references = [],
  className = '',
  meta = {} // Add meta prop for SEO customization
}) => {

  const {
    title: heroTitle = '',
    subtitle: heroSubtitle = '',
    ctas: heroCtas = [],
    badges: heroBadges = []
  } = hero;

  const {
    amount = 101,
    displayText = {}
  } = payment;

  const {
    questions = []
  } = faq;

  // Default meta values that can be overridden by parent components
  const defaultMeta = {
    title: heroTitle || 'i2u.ai | AI Startup Platform',
    description: heroSubtitle || 'Transform your startup with AI-powered tools, mentorship, and resources',
    keywords: 'AI startups, startup acceleration, startup resources, startup tools, startup mentorship',
    canonical: 'https://i2u.ai',
    ogTitle: heroTitle || 'i2u.ai | AI Startup Platform',
    ogDescription: heroSubtitle || 'Transform your startup with AI-powered tools, mentorship, and resources',
    ogImage: 'https://i2u.ai/assets/logo.png',
    twitterTitle: heroTitle || 'i2u.ai | AI Startup Platform',
    twitterDescription: heroSubtitle || 'Transform your startup with AI-powered tools, mentorship, and resources',
    twitterImage: 'https://i2u.ai/assets/logo.png'
  };

  // Merge parent meta with defaults
  const finalMeta = { ...defaultMeta, ...meta };

  const handlePlanChoose = (plan) => {
    // Scroll to payment section when a plan is chosen
    const paymentSection = document.getElementById('googlePaySection');
    if (paymentSection) {
      paymentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>{finalMeta.title}</title>
        <meta name="description" content={finalMeta.description} />
        <meta name="keywords" content={finalMeta.keywords} />
        <meta property="og:title" content={finalMeta.ogTitle} />
        <meta property="og:description" content={finalMeta.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={finalMeta.canonical} />
        <meta property="og:image" content={finalMeta.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={finalMeta.twitterTitle} />
        <meta name="twitter:description" content={finalMeta.twitterDescription} />
        <meta name="twitter:image" content={finalMeta.twitterImage} />
        <link rel="canonical" href={finalMeta.canonical} />
        
        {/* Dynamic JSON-LD Schema based on content */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": finalMeta.title,
            "description": finalMeta.description,
            "url": finalMeta.canonical,
            "mainEntity": {
              "@type": "Organization",
              "name": "i2u.ai",
              "description": "AI startup platform connecting founders with mentors, investors, and resources"
            },
            "potentialAction": {
              "@type": "JoinAction",
              "target": finalMeta.canonical,
              "description": "Join i2u.ai and unlock premium startup resources"
            },
            // Add structured data for plans if available
            ...(plans && plans.length > 0 && {
              "offers": plans.map(plan => ({
                "@type": "Offer",
                "name": plan.name || plan.title,
                "description": plan.description || plan.subtitle,
                "price": plan.price || "Contact for pricing",
                "priceCurrency": "INR"
              }))
            }),
            // Add FAQ structured data if available
            ...(questions && questions.length > 0 && {
              "mainEntity": questions.map(q => ({
                "@type": "Question",
                "name": q.question || q.title,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": q.answer || q.content
                }
              }))
            })
          })}
        </script>
      </Helmet>
      
      <PageContainer className={`content-page ${className}`}>
        {/* Hero Section */}
        {heroTitle && (
          <Hero
            title={heroTitle}
            subtitle={heroSubtitle}
            ctas={heroCtas}
            badges={heroBadges}
          />
        )}

        {/* Content Sections */}
        {sections.map((section, index) => (
          <Section
            key={index}
            id={section.id}
            title={section.title}
            intro={section.intro}
            aria-label={section['aria-label']}
          >
            {section.content}
          </Section>
        ))}

        {/* Subscription Plans */}
        {plans && plans.length > 0 && (
          <Section
            title="Choose Your Plan"
            intro="Plans are designed to scale with your needs — each plan unlocks more features, tools, and benefits."
          >
            <PlansGrid plans={plans} onChoose={handlePlanChoose} />
          </Section>
        )}

        {/* Payment Section */}
        {payment && (
          <Section
            id="googlePaySection"
            title="Ready to Get Started?"
            intro="Join the waitlist today and get immediate access to tools that will transform your journey."
            aria-label="Payment and Registration"
          >
            <GooglePayPayment
              amount={amount}
              displayText={displayText}
            />
          </Section>
        )}

        {/* CTA Band */}
        <CTABand
          title="Don't Wait to Transform Your Future"
          subtitle="Join thousands of others who are already building their success with i2u.ai"
          primaryCta={{
            label: "Join Now",
            onClick: () => {
              const paymentSection = document.getElementById('googlePaySection');
              if (paymentSection) {
                paymentSection.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
          secondaryCta={{
            label: "Learn More",
            onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />

        {/* FAQ Section */}
        {questions && questions.length > 0 && (
          <Section
            title="Frequently Asked Questions"
            intro="Find answers to common questions about our platform and services."
          >
            <FAQAccordion questions={questions} />
          </Section>
        )}

        {/* References Section */}
        {references && references.length > 0 && (
          references.map((reference, index) => (
            <Section 
              key={index}
              title={reference.title || "References"} 
              intro={reference.intro || "References for the content"}
            >
              <References references={[reference]} />
            </Section>
          ))
        )}
      </PageContainer>
    </>
  );
};

export default ContentPage;
