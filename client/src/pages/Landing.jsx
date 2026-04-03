import React, { useEffect } from 'react';
import '../styles/landing.css';

import { useNavigate } from 'react-router-dom';
import logo from '../images/srmcem_head_logo-BN0LEybD.png'; // ✅ Import logo image

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('usertype') === 'freelancer') {
      navigate('/freelancer');
    } else if (localStorage.getItem('usertype') === 'client') {
      navigate('/client');
    } else if (localStorage.getItem('usertype') === 'admin') {
      navigate('/admin');
    }
  });

  return (
    <div className="landing-page">
      {/* Navbar */}
      <div className="landing-nav">
      <div className="logo-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h3 class="navbar-title">FreeFlow-freelancing platform</h3>
        </div>
        <div className="auth-buttons">
          {/*<button onClick={() => navigate('/authenticate')}>Sign Up</button>*/}
          <button onClick={() => navigate('/authenticate')}>Login</button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="landing-hero">
        <div className="landing-hero-card">
          <div className="landing-hero-text">
            <h1>Find the perfect freelance services</h1>
            <p>
              Connect with top talent from around the world. Post a job or find
              work that matches your skills. Start your freelancing journey today.
            </p>
            <button onClick={() => navigate('/authenticate')}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
