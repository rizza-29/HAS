import React from "react";
import "./About.css";
function About() {
  return (
    <div>
      <main className="about-us">
        <section className="hero-about">
          <h1>About Lifeline</h1>
          <p>
            Revolutionizing healthcare management with innovative, user-centric
            solutions.
          </p>
        </section>

        <section className="mission-vision">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              To simplify healthcare management and enhance patient care by
              providing state-of-the-art technology solutions for hospitals and
              clinics.
            </p>
          </div>
          <div className="vision">
            <h2>Our Vision</h2>
            <p>
              To be the global leader in healthcare technology, empowering
              hospitals to operate efficiently and improve patient outcomes.
            </p>
          </div>
        </section>

        <section className="values">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Innovation</h3>
              <p>
                Continuously exploring cutting-edge technology to improve
                healthcare management.
              </p>
            </div>
            <div className="value-item">
              <h3>Integrity</h3>
              <p>Building trust through transparency and ethical practices.</p>
            </div>
            <div className="value-item">
              <h3>Excellence</h3>
              <p>
                Delivering high-quality solutions and exceeding expectations.
              </p>
            </div>
            <div className="value-item">
              <h3>Compassion</h3>
              <p>
                Keeping patients and caregivers at the heart of everything we
                do.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;
