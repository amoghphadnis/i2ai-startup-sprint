import React from 'react';
import './footer.css';
import logo from '../../assets/i2u_new(White).png';               // your i2u.ai logo
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <img src={logo} alt="i2u.ai Logo" className="footer-logo" />
          <span className="footer-title"></span>
        </div>

        {/* Links Columns */}
        <div className="footer-links">
          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li><a href="/about">Our Story</a></li>
              <li><a href="/team">Team</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="https://github.com/i2u-ai" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://twitter.com/i2u_ai" target="_blank" rel="noreferrer">Twitter</a></li>
              <li><a href="https://instagram.com/i2u.ai" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms &amp; Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="footer-social">
          <a href="https://facebook.com/i2u.ai" target="_blank" rel="noreferrer"><FaFacebookF /></a>
          <a href="https://instagram.com/i2u.ai" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://twitter.com/i2u_ai" target="_blank" rel="noreferrer"><FaTwitter /></a>
          <a href="https://github.com/i2u-ai" target="_blank" rel="noreferrer"><FaGithub /></a>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} i2u.ai. All rights reserved.</span>
      </div>
    </footer>
  );
}
