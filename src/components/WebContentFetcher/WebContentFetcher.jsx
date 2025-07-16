import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import './WebContentFetcher.css';

const WebContentFetcher = ({ url, title }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using a CORS proxy to fetch content from external websites
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        
        const response = await fetch(proxyUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        
        // Remove script tags and other potentially harmful elements
        const scripts = doc.querySelectorAll('script');
        scripts.forEach(script => script.remove());
        
        const styles = doc.querySelectorAll('style');
        styles.forEach(style => style.remove());
        
        const links = doc.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(link => link.remove());
        
        // Get the main content (you might need to adjust this selector based on the website structure)
        const mainContent = doc.body || doc.documentElement;
        
        // Clean up the content and convert to string
        let cleanContent = mainContent.innerHTML;
        
        // Remove any remaining inline styles that might conflict
        cleanContent = cleanContent.replace(/style="[^"]*"/gi, '');
        
        // Replace external links to make them absolute
        cleanContent = cleanContent.replace(/href="\/([^"]*)"/g, `href="${new URL(url).origin}/$1"`);
        cleanContent = cleanContent.replace(/src="\/([^"]*)"/g, `src="${new URL(url).origin}/$1"`);
        
        setContent(cleanContent);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(`Failed to fetch content: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchContent();
    }
  }, [url]);

  if (loading) {
    return (
      <div className="web-content-fetcher">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading {title}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="web-content-fetcher">
        <div className="error-container">
          <h3>Error Loading Content</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="web-content-fetcher">
      <div className="content-header">
        <h2>{title}</h2>
        <p className="source-url">Source: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
      </div>
      <div className="content-body">
        {parse(content)}
      </div>
    </div>
  );
};

export default WebContentFetcher;
