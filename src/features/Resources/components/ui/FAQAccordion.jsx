import React, { useState } from 'react';
import './FAQAccordion.css';

const FAQAccordion = ({ questions = [], className = '' }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleAccordion(index);
    }
  };

  return (
    <div className={`faq-accordion ${className}`} role="region" aria-label="Frequently Asked Questions">
      {questions.map((faq, index) => {
        const isOpen = openIndex === index;
        const questionId = `faq-question-${index}`;
        const answerId = `faq-answer-${index}`;

        return (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${isOpen ? 'open' : ''}`}
              onClick={() => toggleAccordion(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isOpen}
              aria-controls={answerId}
              id={questionId}
              type="button"
            >
              <span className="faq-question-text">{faq.q}</span>
              <span className="faq-toggle" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            
            <div
              id={answerId}
              className={`faq-answer ${isOpen ? 'open' : ''}`}
              aria-labelledby={questionId}
              role="region"
              aria-hidden={!isOpen}
            >
              <div className="faq-answer-content">
                {faq.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
