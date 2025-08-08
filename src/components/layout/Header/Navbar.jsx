// src/components/Navbar.jsx
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import ExternalPageModal from "../../ExternalPageModal";
import "./Navbar.css";

export default function Navbar() {
const [dropdownOpen, setDropdownOpen] = useState(false);
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
  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/">
          <img src={logo} alt="i2u.ai Logo" className="navbar-logo" />
          <br />
          {/* <span className="navbar-title">
            Ideas to Unicorns through AI!
          </span> */}
        </Link>
        <nav className="nav-links">
          <Link to="/Resources" className="ywss">Why WSS ?</Link>
          <ExternalPageModal 
            url="https://ecosystem.i2u.ai/" 
            title="i2u.ai Ecosystem"
            className="nav-link-button"
          >
            i2u.ai Ecosystem
          </ExternalPageModal>
          <ExternalPageModal 
            url="http://adventuresinbmterrain.blogspot.com/" 
            title="Blog"
            className="nav-link-button"
          >
            Blog
          </ExternalPageModal>
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
              <Link to="/Investor-Communication" className="dropdown-link">Investor Communication</Link>
            </div>
          </div>
          {/* <Link to="/Pricing">Pricing</Link> */}
          {/* <Link to="/Faq">FAQ</Link> */}
        </nav>
        <div className="auth-buttons">
          <Link to="#" className="login-button">Login</Link>
          <span className="separator">|</span>
          <Link to="https://payments.cashfree.com/forms/i2uAI" target="_blank" rel="noopener noreferrer" className="register-button">Register</Link>
        </div>
      </div>
    </header>
  );
}
