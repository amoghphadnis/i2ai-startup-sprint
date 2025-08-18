import React from 'react';
import ScrollableContainer from './ScrollableContainer';
import './ScrollbarDemo.css';

const ScrollbarDemo = () => {
  // Generate sample content for demonstration
  const generateContent = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <div key={i} className="demo-item">
        <h3>Item {i + 1}</h3>
        <p>This is sample content to demonstrate the custom scrollbar behavior. 
           The scrollbar will automatically adapt to different screen sizes and 
           maintain consistency with your design system.</p>
        <div className="demo-meta">
          <span className="demo-tag">Tag {i + 1}</span>
          <span className="demo-date">2024-01-{String(i + 1).padStart(2, '0')}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="scrollbar-demo">
      <h2>Custom Scrollbar Demo</h2>
      
      <div className="demo-grid">
        {/* Vertical Scrolling Demo */}
        <div className="demo-section">
          <h3>Vertical Scrolling</h3>
          <ScrollableContainer maxHeight="300px" className="demo-container">
            {generateContent(15)}
          </ScrollableContainer>
        </div>

        {/* Horizontal Scrolling Demo */}
        <div className="demo-section">
          <h3>Horizontal Scrolling</h3>
          <ScrollableContainer 
            maxHeight="200px" 
            overflowX="auto" 
            overflowY="hidden"
            className="demo-container horizontal"
          >
            <div className="horizontal-content">
              {generateContent(8)}
            </div>
          </ScrollableContainer>
        </div>

        {/* Responsive Demo */}
        <div className="demo-section">
          <h3>Responsive Behavior</h3>
          <p className="demo-info">
            Resize your browser window to see how the scrollbar adapts to different screen sizes.
          </p>
          <ScrollableContainer maxHeight="250px" className="demo-container">
            {generateContent(12)}
          </ScrollableContainer>
        </div>

        {/* Custom Styling Demo */}
        <div className="demo-section">
          <h3>Custom Styling</h3>
          <ScrollableContainer 
            maxHeight="200px" 
            className="demo-container custom-style"
          >
            {generateContent(10)}
          </ScrollableContainer>
        </div>
      </div>

      <div className="demo-features">
        <h3>Features Demonstrated</h3>
        <ul>
          <li>✅ Responsive scrollbar sizing</li>
          <li>✅ Design system color integration</li>
          <li>✅ Smooth hover animations</li>
          <li>✅ Cross-browser compatibility</li>
          <li>✅ Touch-friendly mobile design</li>
          <li>✅ Accessibility features</li>
        </ul>
      </div>
    </div>
  );
};

export default ScrollbarDemo;
