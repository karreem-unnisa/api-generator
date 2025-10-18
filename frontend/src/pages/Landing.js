import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-page">
     

      <section className="hero">
        <div className="hero-text">
          <h2>Instant Mock APIs</h2>
          <p>Create, manage, and test mock APIs effortlessly. Save time, simplify testing, and streamline development.</p>
          <Link to="/dashboard" className="cta-btn">Go to Dashboard</Link>
        </div>
        <img
          src="https://itsocial.fr/wp-content/uploads/2022/04/61515c11b355f92bbb1505fcc6054b62.jpg"
          alt="API mock dashboard"
          className="hero-img"
        />
      </section>

      <section id="features" className="features">
        <div className="feature">
          <h3>Quick API Setup</h3>
          <p>Generate mock endpoints in seconds for testing and development.</p>
        </div>
        <div className="feature">
          <h3>Real-time API Responses</h3>
          <p>Test and validate APIs instantly with live responses.</p>
        </div>
        <div className="feature">
          <h3>Organized Endpoint Management</h3>
          <p>Manage, update, or delete endpoints easily through a simple dashboard.</p>
        </div>
      </section>

      <footer>
        © 2025 APIHub — Powered by Mock API Generator
      </footer>
    </div>
  );
};

export default Landing;
