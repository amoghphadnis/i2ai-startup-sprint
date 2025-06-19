// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <img src={logo} alt="i2u.ai Logo" className="navbar-logo" />
        <span className="navbar-title">
          i2u.ai | Ideas to Unicorns through AI!
        </span>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/startup-in-action">Startup in Action</Link>
          <Link to="/register">Register</Link>
        </nav>
      </div>
    </header>
  );
}
