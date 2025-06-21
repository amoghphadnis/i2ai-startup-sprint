// src/components/ValueCalculator/ValueCalculator.jsx
import React from 'react';
import './ValueCalculator.css';

export default function ValueCalculator() {
  const rows = [
    { service: 'Professional Assessment', traditional: '$15,000 – $30,000', our: '✅ Included' },
    { service: 'Multi‐Method Valuation',    traditional: '$50,000 – $90,000', our: '✅ Included' },
    { service: 'Global Network Access',     traditional: '$30,000 – $60,000', our: '✅ Included' },
    { service: 'Recognition & Credibility',traditional: '$20,000 – $30,000', our: '✅ Included' },
    { service: 'Educational Resources',     traditional: '$5,000 – $15,000',  our: '✅ Included' },
  ];
  const totalTraditional = '$120,000 – $225,000';
  const totalOur         = '$99';

  return (
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
  );
}
