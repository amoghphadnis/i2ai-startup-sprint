// src/components/Navbar.jsx
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import ExternalPageModal from "../../ExternalPageModal";
import "./Navbar.css";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Optional: Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      const mobileMenu = document.querySelector('.mobile-menu');
      const hamburger = document.querySelector('.hamburger');
      if (mobileMenu && !mobileMenu.contains(event.target) && !hamburger?.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo-container">
          <img src={logo} alt="i2u.ai Logo" className="navbar-logo" />
          <span className="navbar-title">Ideas to Unicorns, through AI!</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="nav-links desktop-nav">
          <Link to="/Resources" className="ywss">Why WSS?</Link>
          <ExternalPageModal 
            url="https://ecosystem.i2u.ai/" 
            title="Ecosystem"
            className="nav-link-button"
          >
          Ecosystem
          </ExternalPageModal>
          <ExternalPageModal 
            url="https://adventuresinbmterrain.blogspot.com/" 
            title="Blog"
            className="nav-link-button"
          >
            Blog
          </ExternalPageModal>
          <Link to="https://bit.ly/3H4rK5n" target="_blank" rel="noopener noreferrer" className="nav-link-button">Latest Blog</Link>
          <div
            className="dropdown nav-dropdown"
            ref={dropdownRef}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="dropdown-button"
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((open) => !open)}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
              type="button"
            >
              About <span style={{ marginLeft: 4, fontSize: '0.9em' }}>▼</span>
            </button>
            <div
              className="dropdown-content"
              style={{ display: dropdownOpen ? "block" : "none" }}
            >
              <Link to="/About" className="dropdown-link">About Us</Link>
              <Link to="/Employee-Benefits" className="dropdown-link">Professionals Kit</Link>
              <Link to="/Investor-Communication" className="dropdown-link">Investor Communication</Link>
            </div>
          </div>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="auth-buttons desktop-auth">
          <Link to="#" className="login-button">Login</Link>
          <span className="separator">|</span>
          <Link to="https://payments.cashfree.com/forms/i2uAI" target="_blank" rel="noopener noreferrer" className="register-button">Register</Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-nav-links">
            <Link to="/Resources" className="mobile-nav-link" onClick={closeMobileMenu}>
              Why WSS ?
            </Link>
            <ExternalPageModal 
              url="https://ecosystem.i2u.ai/" 
              title="Ecosystem"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              Ecosystem
            </ExternalPageModal>
            <ExternalPageModal 
              url="https://adventuresinbmterrain.blogspot.com/" 
              title="Blog"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              Blog
            </ExternalPageModal>
            <div className={`mobile-dropdown ${mobileDropdownOpen ? 'active' : ''}`}>
              <button className="mobile-dropdown-button" onClick={toggleMobileDropdown}>
                About <span style={{ marginLeft: 4, fontSize: '0.9em' }}>▼</span>
              </button>
              <div className="mobile-dropdown-content">
                <Link to="/About" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                  About Us
                </Link>
                <hr className="mobile-dropdown-divider" />
                <Link to="/Employee-Benefits" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                  Professionals Kit
                </Link>
                <hr className="mobile-dropdown-divider" />
                <Link to="/Investor-Communication" className="mobile-dropdown-link" onClick={closeMobileMenu}>
                  Investor Communication
                </Link>
              </div>
            </div>
          </nav>
          <div className="mobile-auth-buttons">
            <Link to="#" className="mobile-login-button" onClick={closeMobileMenu}>
              Login
            </Link>
            <Link to="https://payments.cashfree.com/forms/i2uAI" target="_blank" rel="noopener noreferrer" className="mobile-register-button" onClick={closeMobileMenu}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
