// src/components/HomePage/Home.jsx
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Carousel from "react-slick";
import rocketAnimation from "../../assets/rocket.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ValueCalculator from "../../pages/ValueCalculator/ValueCalculator";
import PaymentButton from '../../components/PaymentButton/PaymentButton';
import "./Home.css";
import Story1 from "../../assets/Images/Story1.png";
import Story2 from "../../assets/Images/Story2.jpg";
import Story3 from "../../assets/Images/Story3.jpg";

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        arrows: false,
      },
    },
  ],
};

{
  /*const rows = [
  {
    service: "Professional Assessment",
    traditional: "$15,000 – $30,000",
    our: "✅ Included",
  },
  {
    service: "Multi‐Method Valuation",
    traditional: "$50,000 – $90,000",
    our: "✅ Included",
  },
  {
    service: "Global Network Access",
    traditional: "$30,000 – $60,000",
    our: "✅ Included",
  },
  {
    service: "Recognition & Credibility",
    traditional: "$20,000 – $30,000",
    our: "✅ Included",
  },
  {
    service: "Educational Resources",
    traditional: "$5,000 – $15,000",
    our: "✅ Included",
  },
];*/
}
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
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="heroSection">
        <div className="heroContent">
          <div className="heroText">
            <h1 className="heroHeadline">
              Transform Your Startup’s Future <br />@ HyperSpeed
            </h1>
            <p className="heroSub">
              90% of startups fail—but most failures are preventable.
            </p>
            <div className="rewardBanner">
              <strong>$225,000</strong> worth of benefits for just{" "}
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
              <Link to="/how-it-works" className="btnSecondary">
                Learn How It Works
              </Link>
            </div>
          </div>
          <div className="heroLottie">
            <Lottie animationData={rocketAnimation} loop />
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="metricsSection">
        <div className="metricsGrid">
          <div className="metricCard">
            <div className="metricNum">35%+</div>
            <div className="metricLabel">Improvement in assessments</div>
          </div>
          <div className="metricCard">
            <div className="metricNum">60%+</div>
            <div className="metricLabel">Higher funding success</div>
          </div>
          <div className="metricCard">
            <div className="metricNum">98</div>
            <div className="metricLabel">Point multi-layered evaluation</div>
          </div>
          <div className="metricCard">
            <div className="metricNum">Upto $225K</div>
            <div className="metricLabel">Worth of benefits</div>
          </div>
        </div>
      </section>

      {/* Value That we Provide */}
      <div className="value-page">
        <h1>Comprehensive Value Justification</h1>
        <p>
          We’ve bundled five premium services—normally totaling{" "}
          {totalTraditional}—all for just {totalOur}.
        </p>
        {/* <table className="value-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Traditional Cost</th>
              <th>Our Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.service}</td>
                <td>{r.traditional}</td>
                <td>{r.our}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td>
                <strong>TOTAL VALUE</strong>
              </td>
              <td>
                <strong>{totalTraditional}</strong>
              </td>
              <td>
                <strong>{totalOur}</strong>
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>

      {/* Value Cards Section */}
      <div className="value-cards">
        {valueRows.map(({ service, traditional, our }, i) => (
          <div key={i} className="value-card">
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
                <li>Instant setup & ongoing support included.</li>
              </ul>
            </div>
          </div>
        ))}

        {/* TOTAL card */}
        <div className="value-card total">
          <div className="value-card-front cover">
            <h4>TOTAL VALUE</h4>
            <p className="traditional">{totalTraditional}</p>
            <p className="our">{totalOur}</p>
          </div>
          <div className="value-card-back">
            <h4>Unbeatable Offer</h4>
            <p>
              All services worth {totalTraditional} for only {totalOur}!
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
          Register Now ₹999 only &#x2192;
        </a>
      </div>

      {/* How It Works Teaser */}
      <section className="teaserSection">
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
          <Link to="/register" className="btnBanner">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
