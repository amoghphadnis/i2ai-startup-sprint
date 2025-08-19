import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error('CashfreePayment Error Boundary caught an error:', error, errorInfo);
    
    // Check if this is an SDK-related error
    if (error.message && (
      error.message.includes('mode') || 
      error.message.includes('Cannot read properties of null')
    )) {
      console.error('�� This appears to be a Cashfree SDK initialization error');
      console.error('🔍 Error details:', {
        message: error.message,
        stack: error.stack,
        errorInfo: errorInfo
      });
      
      // Additional debugging for mode errors
      if (error.message.includes('mode')) {
        console.error('🔍 Mode error detected - checking SDK status...');
        console.error('🔍 window.Cashfree available:', !!window.Cashfree);
        console.error('🔍 window.Cashfree type:', typeof window.Cashfree);
        if (window.Cashfree) {
          console.error('🔍 window.Cashfree keys:', Object.keys(window.Cashfree));
        }
      }
    }
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h3>Something went wrong with the payment system</h3>
            <p>We're experiencing technical difficulties. Please try refreshing the page.</p>
            
            <div className="error-actions">
              <button 
                className="retry-button"
                onClick={() => {
                  this.setState({ hasError: false, error: null, errorInfo: null });
                  window.location.reload();
                }}
              >
                Refresh Page
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error Details (Development)</summary>
                <pre>{this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
