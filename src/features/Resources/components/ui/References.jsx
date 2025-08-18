import React from 'react';
import './References.css';

const References = ({ references = [] }) => {
  if (!references || references.length === 0) {
    return null;
  }

  return (
    <div className="references-container">
      {references.map((reference, index) => (
        <div key={index} className="reference-item">
          {reference.content && (
            <div className="reference-content">
              {reference.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default References;
