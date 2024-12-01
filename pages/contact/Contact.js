import React from 'react'
import './Contact.css'
function Contact() {
  return (
    <div className="contact-container">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’re here to help. Reach out to us for any inquiries or support.</p>
      </section>

      <section className="contact-form-section">
        <h2>Get in Touch</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Write your message"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </section>

      <section className="contact-info">
        <h2>Our Contact Information</h2>
        <p><strong>Email:</strong> support@lifeline.com</p>
        <p><strong>Phone:</strong> +1 (800) 555-1234</p>
        <p><strong>Address:</strong> 123 Health Avenue, Wellness City, USA</p>
      </section>
    </div>
  )
}

export default Contact
