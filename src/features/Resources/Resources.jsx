import React from 'react';
import './Resources.css';
import { FaCashRegister } from "react-icons/fa6";
import { MdOutlineReadMore } from "react-icons/md";
import { Button } from '@/components/ui/button';

export default function Resources() {
    return (
        <div className="resources">
            <div className="resources-header">
                <h1>Why Early-Stage Startup Founders Should Register for the World Startup Sprint ?</h1>
                <p>
                    Equip your founding team with pragmatic valuation tools, real-time interactive calculators, and tactical negotiation insights—so you can secure the funding you deserve and accelerate from idea to unicorn while defending your position against investor skepticism.
                </p>
            </div>

            <div className="resources-content">
                <div className="resources-section">
                    <h2>1. Master Real-World Valuation Methods with Interactive Calculator</h2>
                    <p>
                        World Startup Sprint provides access to an interactive valuation calculator using five industry-standard methodologies that reflect current market conditions:
                    </p>
                    <ul>
                        <li><strong>Comparable Company Analysis (Comps):</strong> Benchmark against peers at 5–10× next year's projected revenue</li>
                        <li><strong>Discounted Cash Flow (DCF):</strong> Apply realistic discount rates reflecting early-stage risk and market conditions</li>
                        <li><strong>Venture Capital (VC) Method:</strong> Model exit value and investors' expected 7–8× ROI</li>
                        <li><strong>Scorecard Valuation Method:</strong> Account for market potential, AI-driven innovation, and team strength premium</li>
                        <li><strong>Berkus Method:</strong> Value key components including technology, opportunity, and team execution</li>
                    </ul>
                    <p>
                        Unlike static estimates, this hands-on tool lets you input your own revenue projections, risk parameters, and market comparables, adjusting key variables on the fly to see funding scenarios in real time. Generate polished charts and summary slides instantly for investor conversations, ensuring you understand the true economics of your venture.
                    </p>
                </div>

                <div className="resources-section">
                    <h2>2. Navigate Market Realities with Current Data</h2>
                    <div className="resources-highlight">
                        <h4>AI Startup Funding Surge</h4>
                        <p>AI startups raised <strong>$104.3 billion</strong> in the U.S. in the first half of 2025, nearly matching all of 2024, with almost two-thirds of all U.S. venture funding going to AI. Current revenue multiples for tech startups range from 10×–25×, while AI startups can command even higher premiums due to scalability and innovation potential.</p>
                    </div>
                    
                    <h3>Real Examples from 2025:</h3>
                    <ul>
                        <li><strong>OpenAI</strong> raised a record $40 billion in March 2025</li>
                        <li><strong>Thinking Machines Lab</strong> (led by Mira Murati) raised $2 billion at a $10 billion valuation</li>
                        <li><strong>Glean</strong> raised $150 million at a $7.2 billion valuation</li>
                        <li><strong>Anysphere</strong> (maker of Cursor) reached a $9.9 billion valuation with explosive ARR growth</li>
                    </ul>
                    <p>These examples demonstrate that well-prepared founders who know their numbers can secure extraordinary valuations when they present compelling, data-driven cases.</p>
                </div>

                <div className="resources-section">
                    <h2>3. Tactical Negotiation Insights from Market Pioneers</h2>
                    <h3>Historical Precedent:</h3>
                    <p>Steve Jobs faced over 300 VC rejections for Apple, including dismissals from Kleiner Perkins and Tim Draper, yet persisted to secure funding by demonstrating clear value propositions. Similarly, Pandora's co-founder Tim Westergren held only 2.39% before IPO after extensive dilution, but the company ultimately succeeded.</p>
                    
                    <h3>Current Market Dynamics:</h3>
                    <p>While investors may initially scoff at early-stage valuations, founders who command clear, defensible valuations secure better terms. Recent examples show that:</p>
                    <ul>
                        <li>Startups with high revenue multiples and fast growth attract top talent and premium valuations</li>
                        <li>Y Combinator companies have raised $85 billion from the best investors globally, demonstrating the power of preparation and community</li>
                        <li>Successful negotiation involves understanding that investors want to mitigate risk while maximizing returns</li>
                    </ul>
                </div>

                <div className="resources-section">
                    <h2>4. Comprehensive Support Framework</h2>
                    
                    <h3>Dynamic Leaderboard System</h3>
                    <p>Your startup joins a real-time leaderboard across seven growth phases (Idea → Pre-Seed → Seed → Series A/B/C → Unicorn), allowing you to benchmark against peers and track your progress as you pivot and iterate.</p>
                    
                    <h3>AI-Powered Business Intelligence</h3>
                    <p>Access Business Native Agentic AI framework providing strategic prompts for product pivots, go-to-market plans, and operational roadmaps tailored for the AI era.</p>
                    
                    <h3>Negotiation Playbooks</h3>
                    <p>Step-by-step scripts and pitch-deck templates to defend your valuation subtly and confidently, based on proven frameworks from successful unicorn founders.</p>
                </div>

                <div className="resources-section">
                    <h2>5. Why This Matters More Than Ever</h2>
                    
                    <h3>Democratized AI Era</h3>
                    <p>The cost of building ventures has decreased while the bar for differentiation has risen. Unlike generic accelerators or mentors who lack repeatable success formulas, World Startup Sprint delivers AI-first growth playbooks proven for data-driven product development and scalable monetization.</p>
                    
                    <h3>Market Context</h3>
                    <p>With startup funding becoming more selective yet reaching record highs for AI companies, founders need every advantage. Current market data shows:</p>
                    <ul>
                        <li>Tech startup revenue multiples averaging 9.20× compared to 1.52× for IT services</li>
                        <li>Early-stage funding rounds becoming larger but more competitive</li>
                        <li>Successful founders increasingly using sophisticated valuation models and negotiation tactics</li>
                    </ul>
                </div>

                <div className="resources-section">
                    <h2>6. Next Steps to Secure Your Competitive Advantage</h2>
                    <ol>
                        <li><strong>Register Today</strong> for immediate access to the interactive valuation calculator</li>
                        <li><strong>Schedule Your Valuation Workshop</strong> with personalized analysis</li>
                        <li><strong>Join Your Cohort</strong> and start implementing proven negotiation strategies</li>
                        <li><strong>Access AI Insights</strong> to optimize your funding approach</li>
                    </ol>
                    <p>Don't let undervaluation or poor negotiation dilute your vision. In an era where AI unicorns are minted regularly but competition is fierce, arm yourself with real-time analytics, tactical negotiation savvy, and community support to secure the funding your startup truly deserves.</p>
                </div>
            </div>

            <div className="resources-cta">
                <h3>Ready to Transform Your Startup's Valuation?</h3>
                <p>Join the World Startup Sprint and gain access to the tools, insights, and community that will help you secure the funding your startup deserves.</p>
                
            <div className="cta-buttons">
              <Button className="cta-primary">
                <a href="mailto:fundraise@i2u.ai">
                  <FaCashRegister  style={{ marginRight: '8px' }} />
                  Register Now
                </a>
              </Button>
              <Button variant="outline" className="cta-secondary">
                <a href="https://www.linkedin.com/company/i2u-ai/" target="_blank" rel="noreferrer">
                  <MdOutlineReadMore style={{ marginRight: '8px' }} />
                  Learn More
                </a>
              </Button>
            </div>
            </div>

            <div className="resources-sources">
                <h3>Sources & References</h3>
                <ol>
                    <li><a href="https://techpoint.africa/guide/startup-valuation-multiples-across-industries-explained/" target="_blank" rel="noopener noreferrer">AI Startup Funding Surge 2025 - Reuters Analysis</a></li>
                    <li><a href="https://nextplayso.substack.com/p/valuations-and-revenue-multiples" target="_blank" rel="noopener noreferrer">Latest VC Investment Deals in AI Startups - Crescendo AI News</a></li>
                    <li><a href="https://www.cnbc.com/2025/07/22/ai-startups-raised-104-billion-in-first-half-exits-different-story.html" target="_blank" rel="noopener noreferrer">Startup Valuation Multiples Across Industries - Techpoint Africa</a></li>
                    <li><a href="https://www.crescendo.ai/news/latest-vc-investment-deals-in-ai-startups" target="_blank" rel="noopener noreferrer">Understanding the 37 Most Valuable Private Startups - Nextplay</a></li>
                    <li><a href="https://www.investopedia.com/terms/d/dilutedfounders.asp" target="_blank" rel="noopener noreferrer">Diluted Founders: Examples and Negotiation Insights - Investopedia</a></li>
                    <li><a href="https://xartup.substack.com/p/lessons-from-steve-jobs-fundraising" target="_blank" rel="noopener noreferrer">Steve Jobs' Fundraising Journey and Negotiation Lessons - Xartup</a></li>
                    <li><a href="https://www.linkedin.com/pulse/steve-jobs-journey-from-rejection-revolution-how-relentless-giri-dorac" target="_blank" rel="noopener noreferrer">Steve Jobs' Journey from Rejection to Revolution - LinkedIn</a></li>
                    <li><a href="https://europe.republic.com/insights/blog/how-to-justify-your-startups-valuation-and-negotiate-with-investors" target="_blank" rel="noopener noreferrer">How to Justify Your Startup's Valuation - Republic Europe</a></li>
                    <li><a href="https://www.ycombinator.com" target="_blank" rel="noopener noreferrer">Y Combinator Success Stories and Network Benefits</a></li>
                    <li><a href="https://www.indeed.com/career-advice/career-development/startup-funding-stages" target="_blank" rel="noopener noreferrer">The Stages of Startup Funding: From Pre-Seed to IPO - OpenVC</a></li>
                    <li><a href="https://carta.com/learn/startups/fundraising/pre-seed-funding/" target="_blank" rel="noopener noreferrer">Pre-Seed Funding Guide for Early-Stage Founders - Carta</a></li>
                    <li><a href="https://www.accountingdepartment.com/blog/how-to-negotiate-startup-funding" target="_blank" rel="noopener noreferrer">How to Negotiate Startup Funding - Accounting Department</a></li>
                    <li><a href="https://www.reuters.com/business/us-ai-startups-see-funding-surge-while-more-vc-funds-struggle-raise-data-shows-2025-07-15/" target="_blank" rel="noopener noreferrer">US AI Startups See Funding Surge - Reuters</a></li>
                    <li><a href="https://www.brex.com/spend-trends/startup/pre-seed-vs-seed-funding-round" target="_blank" rel="noopener noreferrer">Pre-Seed vs Seed Funding Round - Brex</a></li>
                    <li><a href="https://www.linkedin.com/pulse/founders-guide-winning-negotiations-fueling-growth-mark-donnigan-zgzlc" target="_blank" rel="noopener noreferrer">Founder's Guide to Winning Negotiations - LinkedIn</a></li>
                    <li><a href="https://www.linkedin.com/pulse/5-startup-negotiation-mistakes-how-avoid-them-keiretsu-forum-9mkxc" target="_blank" rel="noopener noreferrer">5 Startup Negotiation Mistakes and How to Avoid Them - LinkedIn</a></li>
                </ol>
            </div>
        </div>
    );
}