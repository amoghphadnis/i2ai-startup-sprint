// src/components/Navbar.jsx
import React from "react";
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
      </div>
    </header>
  );
}
