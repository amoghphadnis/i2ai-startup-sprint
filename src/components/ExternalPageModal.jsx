import React, { useState, useEffect } from "react";
import { XIcon } from "lucide-react";

const ExternalPageModal = ({ url, title, children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIframeLoaded(true);
  };

  // Add timeout to handle cases where iframe never loads
  useEffect(() => {
    if (isOpen && !iframeLoaded) {
      const timeout = setTimeout(() => {
        if (!iframeLoaded) {
          setIframeError(true);
          setIframeLoaded(true);
        }
      }, 15000); // 15 second timeout

      return () => clearTimeout(timeout);
    }
  }, [isOpen, iframeLoaded]);

  const closeModal = () => {
    setIsOpen(false);
    setIframeLoaded(false);
    setIframeError(false);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button className={className} onClick={() => setIsOpen(true)}>
        {children}
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm"
        onClick={closeModal}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 sm:pt-16 md:pt-12 lg:pt-8 p-4">
        <div className="w-full max-w-[95vw] h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[70vh] bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white flex justify-between items-center">
            <h2 className="text-white text-lg font-semibold">{title}</h2>
            <button 
              onClick={closeModal}
              style={{color: 'white', backgroundColor:'var(--princeton-orange)'}}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 text-white border border-white/30 hover:border-white/50"
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          
          {/* Content */}
          <div className="h-[calc(100%-80px)] p-2 sm:p-4 bg-gray-50 relative">
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading {title}...</p>
                </div>
              </div>
            )}
            
            {iframeError ? (
              <div className="w-full h-full flex items-center justify-center bg-white rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center p-6">
                  <div className="text-4xl mb-2">🌐</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Unable to Load Content</h3>
                  <p className="text-gray-600 mb-4">
                    The external page couldn't be loaded in the modal. This might be due to:
                  </p>
                  <ul className="text-sm text-gray-500 mb-4 text-left max-w-md mx-auto">
                    <li>• The website doesn't allow iframe embedding</li>
                    <li>• Mixed content (HTTP/HTTPS) restrictions</li>
                    <li>• CORS policy restrictions</li>
                  </ul>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Open in New Tab
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                src={url}
                title={title}
                className="w-full h-full border-0 rounded-lg shadow-lg bg-white"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{borderRadius: '12px'}}
                loading="lazy"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExternalPageModal;