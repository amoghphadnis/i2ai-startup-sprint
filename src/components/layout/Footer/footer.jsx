import React from 'react';
import { Link } from "react-router-dom";
import './footer.css';
import logo from '../../../assets/logo.png';               // your i2u.ai logo
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter  } from "react-icons/fa6";
// import { FaLinkedIn } from 'react-icons/li';

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
              <li><Link to="/" className="footer-link footer-link-home">Home</Link></li>
              <li><Link to="/About" className="footer-link footer-link-about">About Us</Link></li>
              {/* <li><a href="/team" className="footer-link footer-link-team">Team</a></li>
              <li><a href="/careers" className="footer-link footer-link-careers">Careers</a></li> */}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="https://ecosystem.i2u.ai/" target="_blank" rel="noreferrer" className="footer-link footer-link-ecosystem">Startup Ecosystem</a></li>
              <li><a href="http://adventuresinbmterrain.blogspot.com/" target="_blank" rel="noreferrer" className="footer-link footer-link-blogs">Blogs</a></li>
              <li><a href="https://www.linkedin.com/company/i2u-ai/" target="_blank" rel="noreferrer" className="footer-link footer-link-linkedin">Linkedin</a></li>
              {/* <li><a href="#" target="_blank" rel="noreferrer" className="footer-link footer-link-twitter">Twitter</a></li>
              <li><a href="#" target="_blank" rel="noreferrer" className="footer-link footer-link-instagram">Instagram</a></li> */}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/terms-and-privacy">Terms & Privacy</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="footer-social">
          <a href="#" target="_blank" rel="noreferrer" className="footer-social-link footer-social-facebook"><FaFacebookF /></a>
          <a href="#" target="_blank" rel="noreferrer" className="footer-social-link footer-social-instagram"><FaInstagram /></a>
          <a href="#" target="_blank" rel="noreferrer" className="footer-social-link footer-social-twitter"><FaXTwitter  /></a>
          <a href="https://www.linkedin.com/company/i2u-ai/" target="_blank" rel="noreferrer noopener" className="footer-social-link footer-social-linkedin"><FaLinkedinIn /></a>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} i2u.ai. All rights reserved.</span>
      </div>
    </footer>
  );
}
