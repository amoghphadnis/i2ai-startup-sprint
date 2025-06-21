// src/components/HomePage/Home.jsx
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Carousel from "react-slick";
import rocketAnimation from "../../assets/rocket.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

const rows = [
    { service: 'Professional Assessment', traditional: '$15,000 – $30,000', our: '✅ Included' },
    { service: 'Multi‐Method Valuation',    traditional: '$50,000 – $90,000', our: '✅ Included' },
    { service: 'Global Network Access',     traditional: '$30,000 – $60,000', our: '✅ Included' },
    { service: 'Recognition & Credibility',traditional: '$20,000 – $30,000', our: '✅ Included' },
    { service: 'Educational Resources',     traditional: '$5,000 – $15,000',  our: '✅ Included' },
];

const totalTraditional = '$120,000 – $225,000';
const totalOur         = '$99';


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
              <strong>$250,000</strong> worth of benefits for just <strong>₹999/- only</strong> (or <strong>$15 only</strong>)!
            </div>
            <div className="ctaGroup">
              <a
                href="https://payments.cashfree.com/forms/i2uAI"
                target="_blank"
                rel="noopener noreferrer"
                className="btnPrimary"
              >
                Register Now (₹999/$15)
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
            <div className="metricNum">$250K+</div>
            <div className="metricLabel">Worth of benefits</div>
          </div>
        </div>
      </section>

      {/* Value That we Provide */}
      <div className="value-page">
      <h1>Comprehensive Value Justification</h1>
      <p>
        We’ve bundled five premium services—normally totaling {totalTraditional}—all for just {totalOur}.
      </p>
      <table className="value-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Traditional Cost</th>
            <th>Our Price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i) => (
            <tr key={i}>
              <td>{r.service}</td>
              <td>{r.traditional}</td>
              <td>{r.our}</td>
            </tr>
          ))}
          <tr className="total-row">
            <td><strong>TOTAL VALUE</strong></td>
            <td><strong>{totalTraditional}</strong></td>
            <td><strong>{totalOur}</strong></td>
          </tr>
        </tbody>
      </table>
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

      {/* Features Showcase */}
      <section className="featuresSection">
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
        <Link to="/startup-in-action" className="btnLink">
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