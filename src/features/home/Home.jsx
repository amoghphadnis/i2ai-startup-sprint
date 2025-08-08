// src/components/HomePage/Home.jsx
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Lottie from "lottie-react";
import Carousel from "react-slick";
import rocketAnimation from "../../assets/rocket.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ValueCalculator from "../../pages/ValueCalculator/ValueCalculator";
import PaymentButton from "../../components/common/PaymentButton/PaymentButton";
import Button from "../../components/Button";
import "./Home.css";
import Story1 from "../../assets/Images/MultV1.png";
import Story2 from "../../assets/Images/byondknown.jpg";
import Story3 from "../../assets/Images/unnamed.png";
import Banner from "../../assets/Banner/Banner.webm";
import Banner_image from "../../assets/Banner/Banner.webp";
import Bg from "../../assets/Banner/Bg.svg";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
// import Marquee from "react-fast-marquee";
import Marquee from "./marquee_animation";


import { FiUsers, FiTarget, FiAward } from "react-icons/fi";

const trustHighlights = [
  {
    icon: FiUsers,
    text: "We know what startups need.",
    // stat: '1.2M+',
    // label: 'Global Members'
  },
  {
    icon: FiTarget,
    text: "We know what startups want.",
    // stat: '100K+',
    // label: 'Active Startups'
  },
  {
    icon: FiAward,
    text: "We know which startups can win.",
    // stat: '50K+',
    // label: 'Mentor Sessions'
  },
];

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        arrows: false,
      },
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

const Unicornrows = [
  {
    Rank: "1",
    Company: "SpaceX",
    Country: "United States",
    Industry: "Indusrials",
    Valuation: "350",
    Revenue: "30 (demo value)",
  },
  {
    Rank: "2",
    Company: "ByteDance",
    Country: "China",
    Industry: "Media & Entertainment",
    Valuation: "300",
    Revenue: "30 (demo value)",
  },
  {
    Rank: "3",
    Company: "OpenAI",
    Country: "United States",
    Industry: "Enterprise Tech",
    Valuation: "300",
    Revenue: "30 (demo value)",
  },
  {
    Rank: "4",
    Company: "Stripe",
    Country: "United States",
    Industry: "Financial Services",
    Valuation: "70",
    Revenue: "30 (demo value)",
  },
  {
    Rank: "5",
    Company: "SHEIN",
    Country: "Singapore",
    Industry: "Consumer and Retail",
    Valuation: "66",
    Revenue: "30 (demo value)",
  },
];

const vcRows = [
  {
    "id": 1,
    "name": "Y Combinator",
    "totalFunds": "$2.5B",
    "portfolioCompanies": 4500,
    "avgInvestment": "$500K",
    "successRate": 95
  },
  {
    "id": 2,
    "name": "500 Startups",
    "totalFunds": "$1.8B",
    "portfolioCompanies": 2800,
    "avgInvestment": "$300K",
    "successRate": 88
  },
  {
    "id": 3,
    "name": "Techstars",
    "totalFunds": "$1.2B",
    "portfolioCompanies": 3200,
    "avgInvestment": "$400K",
    "successRate": 92
  },
  {
    "id": 4,
    "name": "Sequoia Capital",
    "totalFunds": "$85B",
    "portfolioCompanies": 1200,
    "avgInvestment": "$2M",
    "successRate": 98,
  },
  {
    "id": 5,
    "name": "Andreessen Horowitz",
    "totalFunds": "$35B",
    "portfolioCompanies": 800,
    "avgInvestment": "$3M",
    "successRate": 96,
  },
]
// The above rows are commented out as we are using valueRows instead
// to keep the code cleaner and more organized.

const valueRows = [
  {
    service: "Professional Assessment",
    traditional: "$15,000 – $30,000",
    our: "Included",
  },
  {
    service: "Multi-Method Valuation",
    traditional: "$50,000 – $90,000",
    our: "Included",
  },
  {
    service: "Global Network Access",
    traditional: "$30,000 – $60,000",
    our: "Included",
  },
  {
    service: "Recognition & Credibility",
    traditional: "$20,000 – $30,000",
    our: "Included",
  },
  {
    service: "Educational Resources",
    traditional: "$5,000 – $15,000",
    our: "Included",
  },
];

const totalTraditional = "$120,000 – $225,000";
const totalOur = "$99";

export default function HomePage() {
  // On mount, initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1500, // animation duration in ms
      once: true, // whether animation should happen only once
    });
  }, []);

  const animations = [
    "fade-up",
    "fade-right",
    "fade-left",
    "zoom-in",
    "flip-up",
    "flip-left",
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="heroSection">
        {/* Video Background */}
        <video
          className="heroBgVideo"
          autoPlay
          muted
          loop
          playsInline
          poster={Banner}
          aria-hidden="true"
          preload="auto"
          aria-label="i2u.ai Banner Video"
          src={Banner}
        />
        <div
          data-aos="fade-right"
          data-aos-delay="150"
          data-aos-duration="1500"
          // data-aos-easing="ease-in-out"
          className="heroContent"
        >
          <div className="heroText">
            <h1 className="heroHeadline">
              Transform Your Startup’s Future @ HyperSpeed
            </h1>
            <p className="heroSub">
              90% of startups fail—but most failures are preventable.
            </p>
            <div className="rewardBanner">
              <strong>Upto $225,000</strong> worth of benefits for just{" "}
              <strong>₹999</strong> (<strong> ~ $12</strong>)
            </div>
            <div className="ctaGroup">
              <Link to="/Register" className="btnLink">
                <Button text="Get Started Now &#x2192;" />
              </Link>
              {/* <Link to="/how-it-works" className="btnSecondary">
                Learn How It Works
              </Link> */}
            </div>
          </div>
          {/* <div className="heroLottie">
            <Lottie animationData={rocketAnimation} loop />
          </div> */}
        </div>
      </section>

      {/* Metrics Grid */}
      <Marquee />

      {/* … somewhere below your hero/banner … */}

      {/* Unicorn Club List */}
      <section className="leaderboard-list">
          <section className="VC-Section">
            <div className="VC-Content">
              <h2 className="VC-Title">
                Top VCs of 2025 <br />
                <span className="VC-Subtitle">
                  {/* This is a placeholder subtitle, you can change it as needed */}
                  Discover top venture capital firms across different funding stages
                </span>
              </h2>
              <div className="vc-table-card">
                <div className="vc-table-header">
                  <span>ID</span>
                  <span>Name</span>
                  <span>Total Funds</span>
                  <span>Portfolio Companies</span>
                  <span>Avg Investment</span>
                  <span>Success Rate</span>
                </div>
                {vcRows.map((vc, index) => (
                  <div key={index} className="vc-table-row">
                    <span>{vc.id}</span>
                    <span>{vc.name}</span>
                    <span>{vc.totalFunds}</span>
                    <span>{vc.portfolioCompanies}</span>
                    <span>{vc.avgInvestment}</span>
                    <span>{vc.successRate}</span>
                  </div>
                ))}
              </div>
              <span className="unicornMore">
                <Link to="/VC-Leaderboard" className="btnLink">
                  <Button text="VC List &#x21e2;" />
                </Link>
              </span>
            </div>
          </section>
        <section className="UnicornSection">
          <div className="UnicornContent">
            <h2 className="UnicornTitle">
              Top Unicorns of 2025 <br />
              <span className="UnicornSubtitle">
                {/* This is a placeholder subtitle, you can change it as needed */}
                Discover the world’s most valuable startups
              </span>
            </h2>
            <div className="unicorn-table-card">
              <div className="unicorn-table-header">
                <span>Rank</span>
                <span>Company</span>
                <span>Country</span>
                <span>Industry</span>
                <span>Valuation ($B)</span>
                {/* <span>Revenue</span> */}
              </div>
              {Unicornrows.map((Unicorn, index) => (
                <div key={index} className="unicorn-table-row">
                  <span>{Unicorn.Rank}</span>
                  <span>{Unicorn.Company}</span>
                  <span>{Unicorn.Country}</span>
                  <span>{Unicorn.Industry}</span>
                  <span>{Unicorn.Valuation}</span>
                  {/* <span>{Unicorn.Revenue}</span> */}
                </div>
              ))}
            </div>
            <span className="unicornMore">
              <Link to="/leaderboard" className="btnLink">
                <Button text="See Leaderboard &#x21e2;" />
              </Link>
            </span>
          </div>
        </section>
      </section>

      <section className="trustSection">
        <div className="trustContent">
          <h3>Why Trust Us?</h3>
          {/* <p className="trustSubtitle">
                  We, in collaboration with our board advisor <a
                    href="https://www.linkedin.com/in/ravikikan/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mr. Ravi Kikan
                  </a>, run the
                  largest community of startups globally, with over 1.2 Million
                  members— founders, investors, mentors, coaches, hustlers, and
                  aspiring entrepreneurs.
                </p> */}

          {/* NEW unified highlight cards */}
          <div
            data-aos="zoom-in-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            className="trustHighlightGrid"
          >
            {trustHighlights.map(({ icon: Icon, text, stat, label }, i) => (
              <div key={i} className="highlightCard">
                <Icon className="highlightIcon" />
                <p className="highlightText">{text}</p>
                <p className="highlightStat">{stat}</p>
                <p className="highlightLabel">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="ctaGroup2">
        <Link
          to="https://payments.cashfree.com/forms/i2uAI"
          target="_blank"
          rel="noopener noreferrer"
          className="btnLink"
        >
          <Button text="Register Now &#x2192;" />
        </Link>
      </div>

      {/* Value That we Provide */}
      <div className="value-page">
        <h3>Comprehensive Value Justification</h3>
        <p>
          We’ve bundled five premium services—normally totaling{" "}
          {totalTraditional}—all for just {totalOur}.
        </p>
      </div>

      {/* Value Cards Section */}
      <div className="value-cards">
        {valueRows.map(({ service, traditional, our }, i) => (
          <div
            key={i}
            className="value-card"
            data-aos={animations[i % animations.length]}
            data-aos-delay={i * 100} // stagger each card by 100ms
          >
            {/* Front = the “cover” */}
            <div className="value-card-front cover">
              <h4>{service}</h4>
              <p className="traditional">{traditional}</p>
              <p className="our">✅ {our}</p>
            </div>
            {/* Back = the content underneath */}
            <div className="value-card-back">
              <h4>Why this matters</h4>
              <ul>
                <li>
                  <strong>{service}</strong> normally costs <br />
                  {traditional}.
                </li>
                <li>
                  With us, it’s <strong>{our}</strong>—no extra fee.
                </li>
              </ul>
            </div>
          </div>
        ))}

        {/* TOTAL card */}
        <div
          className="value-card total"
          data-aos="flip-up"
          data-aos-delay={valueRows.length * 100}
        >
          <div className="value-card-front cover">
            <h4>TOTAL VALUE</h4>
            <p className="traditional">{totalTraditional}</p>
            <p className="our">{totalOur}</p>
          </div>
          <div className="value-card-back">
            <h4>Unbeatable Offer</h4>
            <p>
              All services worth <br /> {totalTraditional} <br />
              for only {totalOur}!
            </p>
          </div>
        </div>
      </div>
      <div className="ctaGroup2">
        <Link
          to="https://payments.cashfree.com/forms/i2uAI"
          target="_blank"
          rel="noopener noreferrer"
          className="btnLink"
        >
          <Button text="Register Now @ ₹999 only &#x2192;" />
        </Link>
      </div>

      {/* How It Works Teaser */}
      <section
        data-aos="fade-up"
        data-aos-duration="2500"
        className="teaserSection"
      >
        <h2 className="teaserTitle">How It Works</h2>
        <div className="teaserGrid">
          <div className="teaserCard">
            <h3>Assess</h3>
            <p>98-point evaluation</p>
          </div>
          <div className="teaserCard">
            <h3>Valuate</h3>
            <p>5 professional methods</p>
          </div>
          <div className="teaserCard">
            <h3>Connect</h3>
            <p>Intelligent matching engine</p>
          </div>
        </div>
      </section>

      <ValueCalculator />
      <PaymentButton />

      {/* Features Showcase */}
      <section className="featuresSection">
        <h2 className="teaserTitle">What you get?</h2>
        <div className="featuresGrid">
          <div className="featureCard">
            <h4>Ideas → Unicorns</h4>
            <p>Instantly generate &amp; refine 10 winning ideas</p>
          </div>
          <div className="featureCard">
            <h4>AI-Powered Guidance</h4>
            <p>Personalized growth prompts</p>
          </div>
          <div className="featureCard">
            <h4>Global Connections</h4>
            <p>Network with 1,000+ founders &amp; investors</p>
          </div>
        </div>
      </section>

      {/* Startup in Action Preview */}
      <section className="newsSection">
        <h2 className="newsTitle">Startup in Action</h2>
        <Carousel {...carouselSettings} className="newsCarousel">
          {[
            {
              img: Story1,
              title: "The AI Era: Humanity's Multiverse Bang",
              excerpt:
                "The Great Oxidation Event: A Precedent for Profound Change",
            },
            {
              img: Story2,
              title:
                "TBeyond the Known: Humanity’s Quest for Holistic Intelligence",
              excerpt: " The Evolution of Knowledge Capture: A Historical Lens",
            },
            {
              img: Story3,
              title: "Perplexity, the AI Era David?",
              excerpt: "The Inevitable March of Democratization",
            },
          ].map((s, i) => (
            <div key={i} className="slide">
              <img src={s.img} alt={s.title} className="slideImg" />
              <div className="slideText">
                <Link
                  to="http://adventuresinbmterrain.blogspot.com/2025/08/the-ai-era-humanitys-multiverse-bang.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btnLink"
                >
                  <h3>{s.title}</h3>
                  <p>{s.excerpt}</p>
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
        <Link
          to="http://adventuresinbmterrain.blogspot.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btnLink"
        >
          See All News &rarr;
        </Link>
      </section>

      {/* Enhanced Bottom CTA Banner */}
      <section className="enhancedCta">
        <div className="enhancedCtaContent">
          <div className="ctaTextContent">
            <h3>Ready to Transform Your Startup into a Unicorn?</h3>
            <p>
              Join founders who've already discovered the secret to securing
              premium valuations. Get instant access to our AI-powered valuation
              calculator, real-time market insights, and proven negotiation
              strategies that help you defend your worth against investor
              pushback.
            </p>
          </div>
          <div className="ctaButtonGroup">
            <Link
              to="https://payments.cashfree.com/forms/i2uAI"
              className="btnPrimaryCta"
            >
              Register Now
            </Link>
            <Link to="/resources" className="btnSecondaryCta">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
