// src/components/HomePage/Home.jsx
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Lottie from "lottie-react";
import Carousel from "react-slick";
import rocketAnimation from "../../assets/rocket.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ValueCalculator from "../../pages/ValueCalculator/ValueCalculator";
// import ValueCalculator2 from "../../pages/ValueCalculator/ValueCalculator2";
import PaymentButton from "../../components/PaymentButton/PaymentButton";
import Button from "../Button";
import "./Home.css";
import Footer from "../Footer/footer";
import Story1 from "../../assets/Images/Story1.png";
import Story2 from "../../assets/Images/Story2.jpg";
import Story3 from "../../assets/Images/Story3.jpg";
import Banner from "../../assets/Banner/Banner.webm";
import Banner_image from "../../assets/Banner/Banner.webp";
import Bg from "../../assets/Banner/Bg.svg";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import { FiUsers, FiTarget, FiAward } from "react-icons/fi";

const trustHighlights = [
  {
    icon: FiUsers,
    text: 'We know what startups need.',
    stat: '1.2M+',
    label: 'Global Members'
  },
  {
    icon: FiTarget,
    text: 'We know what startups want.',
    stat: '100K+',
    label: 'Active Startups'
  },
  {
    icon: FiAward,
    text: 'We know which startups can win.',
    stat: '50K+',
    label: 'Mentor Sessions'
  },
];

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
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
  }
  ],
};

  const Unicornrows = [
  {
    Rank: "1",
    Company: "SpaceX",
    Valuation: "350",
    Country: "United States",
    Industry: "Indusrials",
  },
  {
    Rank: "2",
    Company: "ByteDance",
    Valuation: "300",
    Country: "China",
    Industry: "Media & Entertainment",
  },
  {
    Rank: "3",
    Company: "OpenAI",
    Valuation: "300",
    Country: "United States",
    Industry: "Enterprise Tech",
  },
  {
    Rank: "4",
    Company: "Stripe",
    Valuation: "70",
    Country: "United States",
    Industry: "Financial Services",
  },
  {
    Rank: "5",
    Company: "SHEIN",
    Valuation: "66",
    Country: "Singapore",
    Industry: "Consumer and Retail",
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
      duration: 1500,    // animation duration in ms
      once: true,       // whether animation should happen only once
    })
  }, [])

  const animations = [
    'fade-up',
    'fade-right',
    'fade-left',
    'zoom-in',
    'flip-up',
    'flip-left',
  ]

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
              <strong>₹999</strong> (<strong> ~ $15</strong>)
            </div>
            <div className="ctaGroup">
              <a
                href="https://payments.cashfree.com/forms/i2uAI"
                target="_blank"
                rel="noopener noreferrer"
                className="btnPrimary"
              >
                Register Now &#x2192;
              </a>
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
      <section className="metricsSection">
        <div className="metricsGrid">
          <div className="metricCard">
            <div className="metricNum">Upto $225K</div>
            <div className="metricLabel">Worth of benefits</div>
          </div>
          <div className="metricCard">
            <div className="metricNum">98</div>
            <div className="metricLabel">Point multi-layered evaluation</div>
          </div>
          <div className="metricCard">
            <div className="metricNum">35%+</div>
            <div className="metricLabel">Improvement in assessments</div>
          </div>
          <div className="metricCard">
            <div className="metricNum">60%+</div>
            <div className="metricLabel">Higher funding success</div>
          </div>
        </div>
      </section>

      {/* … somewhere below your hero/banner … */}

      {/* Unicorn Club List */}
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
              <span>Valuation ($B)</span>
              <span>Country</span>
              <span>Industry</span>
            </div>
              {Unicornrows.map((Unicorn, index) => (
                <div key={index} className="unicorn-table-row">
                  <span>{Unicorn.Rank}</span>
                  <span>{Unicorn.Company}</span>
                  <span>{Unicorn.Valuation}</span>
                  <span>{Unicorn.Country}</span>
                  <span>{Unicorn.Industry}</span>
                </div>
              ))}
          </div>
          <span className="unicornMore">
            <Link to="/Unicorns" className="btnLink">
              <Button />
            </Link>
          </span>
        </div>
      </section>

      <section className="trustSection">
        <div className="trustContent">
          <h3>Why Trust Us?</h3>
          <p className="trustSubtitle">
            We, in collaboration with our board advisor <a
              href="https://www.linkedin.com/in/ravikikan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mr. Ravi Kikan
            </a>, Run the
            largest community of startups globally, with over 1.2 Million
            members— founders, investors, mentors, coaches, hustlers, and
            aspiring entrepreneurs.
          </p>

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

          <div className="ctaGroup2">
            <a
              href="https://payments.cashfree.com/forms/i2uAI"
              target="_blank"
              rel="noopener noreferrer"
              className="btnPrimary"
            >
              Register Now &#x2192;
            </a>
          </div>
        </div>
      </section>

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
        <a
          href="https://payments.cashfree.com/forms/i2uAI"
          target="_blank"
          rel="noopener noreferrer"
          className="btnPrimary"
        >
          Register Now @ ₹999 only &#x2192;
        </a>
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
              title: "GreenEnergy Innovations raises Series A",
              excerpt: "After 300% pipeline growth...",
            },
            {
              img: Story2,
              title: "TechFlow Solutions secures new funding",
              excerpt: "60% valuation boost...",
            },
            {
              img: Story3,
              title: "HealthTech Dynamics expands into new markets",
              excerpt: "200% engagement improvement...",
            },
          ].map((s, i) => (
            <div key={i} className="slide">
              <img src={s.img} alt={s.title} className="slideImg" />
              <div className="slideText">
                <h3>{s.title}</h3>
                <p>{s.excerpt}</p>
              </div>
            </div>
          ))}
        </Carousel>
        <Link to="#" className="btnLink">
          See All News &rarr;
        </Link>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bottomCta">
        <div className="bottomCtaContent">
          <h3>Ready to see your startup take off?</h3>
          <Link
            to="https://payments.cashfree.com/forms/i2uAI"
            className="btnBanner"
          >
            Get Started Today
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
