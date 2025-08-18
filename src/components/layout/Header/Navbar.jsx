// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import ExternalPageModal from "../../ExternalPageModal";
import "./Navbar.css";

export default function Navbar() {
  const [whyWssDropdownOpen, setWhyWssDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileWhyWssDropdownOpen, setMobileWhyWssDropdownOpen] = useState(false);
  const [mobileAboutDropdownOpen, setMobileAboutDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const whyWssDropdownRef = useRef(null);
  const aboutDropdownRef = useRef(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optional: Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (whyWssDropdownRef.current && !whyWssDropdownRef.current.contains(event.target)) {
        handleWhyWssDropdownClose();
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        handleAboutDropdownClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const mobileMenu = document.querySelector('.custom-mobile-menu');
      const hamburger = document.querySelector('.custom-hamburger');
      if (mobileMenu && !mobileMenu.contains(event.target) && !hamburger?.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileWhyWssDropdownOpen(false);
    setMobileAboutDropdownOpen(false);
  }, [location.pathname]);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileWhyWssDropdownOpen(false);
    setMobileAboutDropdownOpen(false);
  };

  const toggleMobileWhyWssDropdown = () => {
    setMobileWhyWssDropdownOpen(!mobileWhyWssDropdownOpen);
  };

  const toggleMobileAboutDropdown = () => {
    setMobileAboutDropdownOpen(!mobileAboutDropdownOpen);
  };

  // Handle Why WSS dropdown state changes
  const handleWhyWssDropdownOpen = () => {
    setWhyWssDropdownOpen(true);
  };

  const handleWhyWssDropdownClose = () => {
    // Add a small delay to prevent immediate closing
    setTimeout(() => {
      setWhyWssDropdownOpen(false);
    }, 200); // Increased delay for smoother experience
  };

  // Handle About dropdown state changes
  const handleAboutDropdownOpen = () => {
    setAboutDropdownOpen(true);
  };

  const handleAboutDropdownClose = () => {
    // Add a small delay to prevent immediate closing
    setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 200); // Increased delay for smoother experience
  };

  // Handle Why WSS dropdown interaction to prevent premature closing
  const handleWhyWssDropdownInteraction = () => {
    // Clear any pending close timers
    if (whyWssDropdownOpen) {
      setWhyWssDropdownOpen(true);
    }
  };

  // Handle About dropdown interaction to prevent premature closing
  const handleAboutDropdownInteraction = () => {
    // Clear any pending close timers
    if (aboutDropdownOpen) {
      setAboutDropdownOpen(true);
    }
  };

  // Helper function to check if a link is active
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Helper function to scroll to top smoothly
  const scrollToTop = () => {
    // Only scroll if not already at the top
    if (window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  // Handle navigation with scroll to top
  const handleNavigation = () => {
    // Add a small delay to ensure the route change happens first
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  return (
    <header className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="custom-navbar-content">
        {/* Logo Section - Left Aligned */}
        <Link to="/" className="custom-logo-container">
          <img src={logo} alt="i2u.ai Logo" className="custom-navbar-logo" />
          {/* <span className="custom-navbar-title">Ideas to Unicorns, through AI!</span> */}
        </Link>
        
        {/* Desktop Navigation - Center Aligned */}
        <nav className="custom-nav-links custom-desktop-nav">
          <Link 
            to="/" 
            className={`custom-nav-link ${isActiveLink('/') ? 'active' : ''}`}
            onClick={handleNavigation}
          >
            Home
          </Link>
          <span className="custom-separator">|</span>
          <Link
          to="/Startups"
          className={`custom-nav-link ${isActiveLink('/Startups') ? 'active' : ''}`}
          onClick={handleNavigation}
          >
            Startup Leaders
          </Link>
          <span className="custom-separator">|</span>
          {/* <div
            className="custom-dropdown custom-nav-dropdown"
            ref={whyWssDropdownRef}
            onMouseEnter={handleWhyWssDropdownOpen}
          >
            <button
              className={`custom-dropdown-button ${isActiveLink('/Startups') || isActiveLink('/Mentors') || isActiveLink('/Facilitators') || isActiveLink('/Influencers') || isActiveLink('/Enablers') || isActiveLink('/Investors') ? 'active' : ''}`}
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={whyWssDropdownOpen}
              onClick={() => setWhyWssDropdownOpen((open) => !open)}
              onFocus={handleWhyWssDropdownOpen}
              onBlur={handleWhyWssDropdownClose}
              type="button"
            >
              Why WSS? <span style={{ marginLeft: 4, fontSize: '0.9em' }}>▼</span>
            </button>
            <div
              className={`custom-dropdown-content ${whyWssDropdownOpen ? 'show' : ''}`}
              onMouseEnter={handleWhyWssDropdownInteraction}
              onMouseLeave={handleWhyWssDropdownClose}
            >
              <Link 
                to="/Startups" 
                className={`custom-dropdown-link ${isActiveLink('/Startups') ? 'active' : ''}`}
                onClick={handleNavigation}
              >
                Startup Founders
              </Link>
              <Link 
                to="/Mentors" 
                className={`custom-dropdown-link ${isActiveLink('/Mentors') ? 'active' : ''}`}
                onClick={handleNavigation}
              >
              Mentors
              </Link>
              <Link 
                to="/Facilitators" 
                className={`custom-dropdown-link ${isActiveLink('/Facilitators') ? 'active' : ''}`}
                onClick={handleNavigation}
              >
                Facilitators
              </Link>
              <Link 
                to="/Influencers" 
                className={`custom-dropdown-link ${isActiveLink('/Influencers') ? 'active' : ''}`}
                onClick={handleNavigation}
              >
                Influencers
              </Link>
              <Link 
                to="/Enablers" 
                className={`custom-dropdown-link ${isActiveLink('/Enablers') ? 'active' : ''}`}
                onClick={handleNavigation}
              >
                Enablers
              </Link>
              <Link 
                to="/Investors" 
                className={`custom-dropdown-link ${isActiveLink('/Investors') ? 'active' : ''}`}
                onClick={handleNavigation}
              >
                Investors
              </Link>
            </div>
          </div> */}
          {/* <span className="custom-separator">|</span> */}
          <Link 
            to="/Professional-Zone" 
            className={`custom-nav-link ${isActiveLink('/Professional-Zone') ? 'active' : ''}`}
            onClick={handleNavigation}
          >
            Professionals' Zone
          </Link>
          <span className="custom-separator">|</span>
          <Link 
            to="/Honorary-Pioneers" 
            className={`custom-nav-link ${isActiveLink('/Honorary-Pioneers') ? 'active' : ''}`}
            onClick={handleNavigation}
          >
            Honorary Pioneers
          </Link>
          <span className="custom-separator">|</span>
          <Link 
            to="https://bit.ly/3J9lQk1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="custom-nav-link"
          >
            Blog
          </Link>
          <span className="custom-separator">|</span>
          <div
            className="custom-dropdown custom-nav-dropdown"
            ref={aboutDropdownRef}
            onMouseEnter={handleAboutDropdownOpen}
          >
            <button
              className={`custom-dropdown-button ${isActiveLink('/About') || isActiveLink('/Investor-Communication') ? 'active' : ''}`}
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={aboutDropdownOpen}
              onClick={() => setAboutDropdownOpen((open) => !open)}
              onFocus={handleAboutDropdownOpen}
              onBlur={handleAboutDropdownClose}
              type="button"
            >
              About <span style={{ marginLeft: 4, fontSize: '0.9em' }}>▼</span>
            </button>
            <div
              className={`custom-dropdown-content ${aboutDropdownOpen ? 'show' : ''}`}
              onMouseEnter={handleAboutDropdownInteraction}
              onMouseLeave={handleAboutDropdownClose}
            >
              <Link 
                to="/About" 
                className={`custom-dropdown-link ${isActiveLink('/About') ? 'active' : ''}`}
                onClick={handleNavigation}
              >
                About Us
              </Link>
              <Link 
                to="/Investor-Communication" 
                className={`custom-dropdown-link ${isActiveLink('/Investor-Communication') ? 'active' : ''}`}
                onClick={handleNavigation}
              >
                Investor Communication
              </Link>
            </div>
          </div>
        </nav>

        {/* Desktop Auth Buttons - Right Aligned */}
        <div className="custom-auth-buttons custom-desktop-auth">
          <Link to="#" className="custom-login-button">Login</Link>
          <span className="custom-separator">|</span>
          <Link 
            to="/#googlePaySection" 
            onClick={() => {
              // Navigate to home page first, then scroll to section
              window.location.href = '/#googlePaySection';
            }}
            rel="noopener noreferrer" 
            className="custom-register-button"
          >
            Register
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          className={`custom-hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <div className={`custom-mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <nav className="custom-mobile-nav-links">
            <Link 
              to="/" 
              className={`custom-mobile-nav-link ${isActiveLink('/') ? 'active' : ''}`} 
              onClick={() => {
                closeMobileMenu();
                handleNavigation();
              }}
            >
              Home
            </Link>
            <Link
            to="/Startups"
            className={`custom-mobile-nav-link ${isActiveLink('/Startups') ? 'active' : ''}`}
            onClick={() => {
              closeMobileMenu();
              handleNavigation();
            }}
            >
              Startup Leaders
            </Link>

            {/* Why WSS? Mobile Dropdown */}
            {/* <div className={`custom-mobile-dropdown ${mobileWhyWssDropdownOpen ? 'active' : ''}`}>
              <button className="custom-mobile-dropdown-button" onClick={toggleMobileWhyWssDropdown}>
                Why WSS? <span style={{ marginLeft: 4, fontSize: '0.9em' }}>▼</span>
              </button>
              <div className="custom-mobile-dropdown-content">
                <Link 
                  to="/Startups" 
                  className={`custom-mobile-dropdown-link ${isActiveLink('/Startups') ? 'active' : ''}`} 
                  onClick={() => {
                    closeMobileMenu();
                    handleNavigation();
                  }}
                >
                  Startup Founders
                </Link>
                <hr className="custom-mobile-dropdown-divider" />
                <Link 
                  to="/Mentors" 
                  className={`custom-mobile-dropdown-link ${isActiveLink('/Mentors') ? 'active' : ''}`} 
                  onClick={() => {
                    closeMobileMenu();
                    handleNavigation();
                  }}
                >
                  Mentors
                </Link>
                <hr className="custom-mobile-dropdown-divider" />
                <Link 
                  to="/Facilitators" 
                  className={`custom-mobile-dropdown-link ${isActiveLink('/Facilitators') ? 'active' : ''}`} 
                  onClick={() => {
                    closeMobileMenu();
                    handleNavigation();
                  }}
                >
                  Facilitators
                </Link>
                <hr className="custom-mobile-dropdown-divider" />
                <Link 
                  to="/Influencers" 
                  className={`custom-mobile-dropdown-link ${isActiveLink('/Influencers') ? 'active' : ''}`} 
                  onClick={() => {
                    closeMobileMenu();
                    handleNavigation();
                  }}
                >
                  Influencers
                </Link>
                <hr className="custom-mobile-dropdown-divider" />
                <Link 
                  to="/Enablers" 
                  className={`custom-mobile-dropdown-link ${isActiveLink('/Enablers') ? 'active' : ''}`} 
                  onClick={() => {
                    closeMobileMenu();
                    handleNavigation();
                  }}
                >
                  Enablers
                </Link>
                <hr className="custom-mobile-dropdown-divider" />
                <Link 
                  to="/Investors" 
                  className={`custom-mobile-dropdown-link ${isActiveLink('/Investors') ? 'active' : ''}`} 
                  onClick={() => {
                    closeMobileMenu();
                    handleNavigation();
                  }}
                >
                  Investors
                </Link>
              </div>
            </div> */}

            <Link 
              to="/Professional-Zone" 
              className={`custom-mobile-nav-link ${isActiveLink('/Professional-Zone') ? 'active' : ''}`} 
              onClick={() => {
                closeMobileMenu();
                handleNavigation();
              }}
            >
              Professionals' Zone
            </Link>
            <Link 
              to="/Honorary-Pioneers" 
              className={`custom-mobile-nav-link ${isActiveLink('/Honorary-Pioneers') ? 'active' : ''}`} 
              onClick={() => {
                closeMobileMenu();
                handleNavigation();
              }}
            >
              Honorary Pioneers
            </Link>
            
            <Link 
              to="https://bit.ly/3J9lQk1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="custom-mobile-nav-link" 
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            
            {/* About Mobile Dropdown */}
            <div className={`custom-mobile-dropdown ${mobileAboutDropdownOpen ? 'active' : ''}`}>
              <button className="custom-mobile-dropdown-button" onClick={toggleMobileAboutDropdown}>
                About <span style={{ marginLeft: 4, fontSize: '0.9em' }}>▼</span>
              </button>
              <div className="custom-mobile-dropdown-content">
                <Link 
                  to="/About" 
                  className={`custom-mobile-dropdown-link ${isActiveLink('/About') ? 'active' : ''}`} 
                  onClick={() => {
                    closeMobileMenu();
                    handleNavigation();
                  }}
                >
                  About Us
                </Link>
                <hr className="custom-mobile-dropdown-divider" />
                <Link 
                  to="/Investor-Communication" 
                  className={`custom-mobile-dropdown-link ${isActiveLink('/Investor-Communication') ? 'active' : ''}`} 
                  onClick={() => {
                    closeMobileMenu();
                    handleNavigation();
                  }}
                >
                  Investor Communication
                </Link>
              </div>
            </div>
          </nav>
          <div className="custom-mobile-auth-buttons">
            <Link to="#" className="custom-mobile-login-button" onClick={closeMobileMenu}>
              Login
            </Link>
            <Link 
              to="/#googlePaySection" 
              rel="noopener noreferrer" 
              className="custom-mobile-register-button" 
              onClick={() => {
                // Navigate to home page first, then scroll to section
                window.location.href = '/#googlePaySection';
                closeMobileMenu();
                window.scrollTo({
                  behavior: 'smooth'
                });
              }}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
