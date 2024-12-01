import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Lifeline</h3>
          <p>
            Lifeline is dedicated to providing innovative and efficient
            solutions for hospital and healthcare management.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/features">Features</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>
            <strong>Email:</strong> support@lifeline.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (800) 555-1234
          </p>
          <p>
            <strong>Address:</strong> 123 Health Avenue, Wellness City, USA
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Lifeline. All rights reserved.</p>
        <div className="social-icons">
          <a href="/" aria-label="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="/" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="/" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
