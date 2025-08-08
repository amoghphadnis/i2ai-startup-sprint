// src/components/ValueCalculator/ValueCalculator.jsx
import React, { useState, useEffect } from 'react';
import './ValueCalculator.css';

const stageMultipliers = {
  'pre-seed': 0.7,
  'seed': 1.0,
  'series-a': 1.3,
  'series-b': 1.6,
  'series-c': 2.0
};
const regionalMultipliers = {
  'north-america': 1.0,
  'europe': 0.8,
  'asia-pacific': 0.7,
  'india': 0.3,
  'other': 0.5
};
const baseCosts = {
  assessment: { min: 15000, max: 30000 },
  valuation:  { min: 50000, max: 90000 },
  network:    { min: 30000, max: 60000 },
  recognition:{ min: 20000, max: 30000 },
  education:  { min: 5000,  max: 15000 }
};

function formatCurrency(amount, region) {
  if (region === 'india') {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  }
  return `$${Math.round(amount).toLocaleString()}`;
}

export default function ValueCalculator() {
  // form state
  const [companyStage, setCompanyStage] = useState('seed');
  const [region, setRegion] = useState('north-america');
  const [assessmentComplexity, setAssessmentComplexity] = useState(2);
  const [valuationMethods, setValuationMethods] = useState(3);
  const [networkLevel, setNetworkLevel] = useState(2);
  const [consultingRate, setConsultingRate] = useState(200);
  const [projectDuration, setProjectDuration] = useState(6);
  const [additionalServices, setAdditionalServices] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // result state
  const [tableRows, setTableRows] = useState([]);
  const [summaryCards, setSummaryCards] = useState([]);

  // label arrays
  const assessmentLabels = ['Basic', 'Standard', 'Comprehensive'];
  const networkLabels    = ['Regional', 'National', 'Global'];

  // calculate on input change
  useEffect(() => {
    calculateCosts();
  }, [companyStage, region, assessmentComplexity, valuationMethods, networkLevel, additionalServices, consultingRate, projectDuration]);

  function calculateCosts() {
    const stageMul = stageMultipliers[companyStage];
    const regMul   = regionalMultipliers[region];

    // compute each cost
    const assessmentCost = ((baseCosts.assessment.min + (baseCosts.assessment.max - baseCosts.assessment.min) * ((assessmentComplexity - 1) / 2)) * regMul * stageMul);
    const valuationCost  = ((baseCosts.valuation.min  + (baseCosts.valuation.max  - baseCosts.valuation.min)  * ((valuationMethods - 1) / 4)) * regMul * stageMul);
    const networkCost    = ((baseCosts.network.min    + (baseCosts.network.max    - baseCosts.network.min)    * ((networkLevel - 1) / 2)) * regMul * stageMul);
    const recognitionCost= ((baseCosts.recognition.min+ (baseCosts.recognition.max- baseCosts.recognition.min)*0.5) * regMul * stageMul);
    const educationCost  = ((baseCosts.education.min  + (baseCosts.education.max  - baseCosts.education.min)  *0.5) * regMul * stageMul);

    const totalTraditional = (assessmentCost + valuationCost + networkCost + recognitionCost + educationCost) * additionalServices;
    const ourPrice = region === 'india' ? 4999 : 99;
    const totalSavings = totalTraditional - ourPrice;
    const savingsPct = Math.max(0, ((totalSavings / totalTraditional) * 100)).toFixed(2);
    const multiplier = (totalTraditional / ourPrice).toFixed(0);

    // populate table rows
    setTableRows([
      { label: 'Professional Assessment', cost: assessmentCost, our: '✓', savings: assessmentCost },
      { label: 'Multi-Method Valuation',  cost: valuationCost,  our: '✓', savings: valuationCost },
      { label: 'Global Network Access',   cost: networkCost,    our: '✓', savings: networkCost },
      { label: 'Recognition & Credibility',cost: recognitionCost,our: '✓', savings: recognitionCost },
      { label: 'Educational Resources',    cost: educationCost,  our: '✓', savings: educationCost },
      { label: 'TOTAL',                    cost: totalTraditional, our: `$${ourPrice}`, savings: totalSavings, isTotal: true  }
    ]);

    // summary cards
    setSummaryCards([
      // { title: 'Total Traditional Cost', value: totalTraditional },
      // { title: 'Our Platform Price',    value: ourPrice },
      // { title: 'Total Savings',         value: totalSavings },
      { title: 'Savings Percentage',    value: `${savingsPct}%` },
      { title: 'Value Multiplier',      value: `${multiplier} X` }
    ]);
  }

  function resetCalculator() {
    setCompanyStage('seed');
    setRegion('north-america');
    setAssessmentComplexity(2);
    setValuationMethods(3);
    setNetworkLevel(2);
    setConsultingRate(200);
    setProjectDuration(6);
    setAdditionalServices(1.5);
    setShowAdvanced(false);
  }

  const methodNames = [
    'Comparable Company Analysis (Comps)',
    'Discounted Cash Flow (DCF)',
    'Venture Capital (VC) Method',
    'Scorecard Valuation Method',
    'Berkus Method'
  ];

  const methodLabel = valuationMethods === 1
    ? '1 Method'
    : `${valuationMethods} Methods`;

  const methodHint = valuationMethods > 1
    ? `Includes: ${methodNames.slice(0, valuationMethods).join(', ')}`
    : `Includes: ${methodNames[0]}`;

  return (
    <div className="value-page container">
      <div className="header">
        <h3>🚀 World Startup Sprint Value Calculator</h3>
        <p>
          Compare traditional consulting costs with our comprehensive platform
        </p>
      </div>
      <div className="main-content">
        <div className="calculator-section">
          <h2 className="section-title">📊 Cost Comparison Calculator</h2>
          <div className="input-group">
            <label>Company Stage</label>
            <select
            label="Company Stage"
              value={companyStage}
              onChange={(e) => setCompanyStage(e.target.value)}
            >
              <option value="pre-seed">Pre-Seed</option>
              <option value="seed">Seed</option>
              <option value="series-a">Series A</option>
              <option value="series-b">Series B</option>
              <option value="series-c">Series C+</option>
            </select>
          </div>
          <div className="input-group">
            <label>Geographic Region</label>
            <select label="Geographic Region" value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="north-america">North America</option>
              <option value="europe">Europe</option>
              <option value="asia-pacific">Asia-Pacific</option>
              <option value="india">India</option>
              <option value="other">Other Markets</option>
            </select>
          </div>
          <div className="input-group">
            <label>Assessment Complexity</label>
            <input
              type="range"
              className="slider"
              min="1"
              max="3"
              value={assessmentComplexity}
              onChange={(e) => setAssessmentComplexity(+e.target.value)}
              style={{
                background: `linear-gradient(
                to right,
                var(--princeton-orange) ${((assessmentComplexity - 1) / 2) * 100}%,
                var(--color-secondary) ${((assessmentComplexity - 1) / 2) * 100}%
              )`,
              }}
            />
            <div className="value-display">
              {assessmentLabels[assessmentComplexity - 1]}
            </div>
          </div>
          <div className="input-group">
            <label>Valuation Methods Required</label>
            <input
              type="range"
              className="slider"
              min="1"
              max="5"
              value={valuationMethods}
              onChange={(e) => setValuationMethods(+e.target.value)}
              style={{
                background: `linear-gradient(
                to right,
                var(--princeton-orange) ${((valuationMethods - 1) / 4) * 100}%,
                var(--color-secondary) ${((valuationMethods - 1) / 4) * 100}%
              )`,
              }}
            />
            <div className="value-display">{methodLabel}</div>
            <div className="slider-hint">{methodHint}</div>
          </div>
          <div className="input-group">
            <label>Network Access Level</label>
            <input
              type="range"
              className="slider"
              min="1"
              max="3"
              value={networkLevel}
              onChange={(e) => setNetworkLevel(+e.target.value)}
              style={{
                background: `linear-gradient(
                to right,
                var(--princeton-orange) ${((networkLevel - 1) / 2) * 100}%,
                var(--color-secondary) ${((networkLevel - 1) / 2) * 100}%
              )`,
              }}
            />
            <div className="value-display">
              {networkLabels[networkLevel - 1]}
            </div>
          </div>
          <button
            className="advanced-toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            Advanced Settings
          </button>
          {showAdvanced && (
            <div className="advanced-settings">
              <div className="input-group">
                <label>Consulting Hourly Rate ($)</label>
                <input
                  type="number"
                  value={consultingRate}
                  onChange={(e) => setConsultingRate(+e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Project Duration (months)</label>
                <input
                  type="number"
                  value={projectDuration}
                  onChange={(e) => setProjectDuration(+e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Additional Services Multiplier</label>
                <input
                  type="range"
                  className="slider"
                  min="1"
                  max="3"
                  step="0.1"
                  value={additionalServices}
                  onChange={(e) => setAdditionalServices(+e.target.value)}
                />
                <div className="value-display">{additionalServices}×</div>
              </div>
            </div>
          )}
          <button className="calculate-btn" onClick={calculateCosts}>
            Calculate Savings
          </button>
          <button className="reset-btn" onClick={resetCalculator}>
            Reset
          </button>
        </div>

        <div className="results-section">
          <h2 className="section-title">💰 Cost Breakdown Results</h2>
          <table className="results-table">
            <thead>
              <tr>
                <th>Service Component</th>
                <th>Traditional Cost</th>
                <th>Our Platform</th>
                <th>Savings</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr
                  key={i}
                  style={
                    row.isTotal
                      ? {
                          background: "var(--gradient-accent)",
                          color: "white",
                          fontWeight: "800",
                        }
                      : {}
                  }
                >
                  <td>{row.label}</td>
                  <td className="cost-traditional">
                    ${row.cost.toLocaleString()}
                  </td>
                  <td className="cost-ours">{row.our}</td>
                  <td className="savings">${row.savings.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="summary-cards">
            {summaryCards.map((card, i) => (
              <div key={i} className="summary-card">
                <h6>{card.title}</h6>
                <div className="value">
                  {typeof card.value === "number"
                    ? card.value.toLocaleString()
                    : card.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
