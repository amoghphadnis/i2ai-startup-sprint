// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/i2u_new.png";
import "./Navbar.css";

export default function Navbar() {
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
          {/* <Link to="/How-It-Works">How It Works</Link>
          <Link to="/Startup-In-Action">Startup in Action</Link>
          <Link to="/Register">Register</Link>
          <Link to="/Pricing">Pricing</Link>
          <Link to="/Resources">Resources</Link>
          <Link to="/Faq">FAQ</Link> */}
        </nav>
      </div>
    </header>
  );
}
