import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

function Landing({ isAuthenticated }) {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1>Welcome to the Auction System</h1>
        <p>Buy and sell items through live auctions</p>
        
        {!isAuthenticated ? (
          <div className="landing-auth">
            <p className="auth-message">Please sign in to access all features:</p>
            <div className="landing-buttons">
              <Link to="/signin" className="landing-button primary">Sign In</Link>
              <Link to="/signup" className="landing-button secondary">Sign Up</Link>
            </div>
            <div className="feature-list">
              <h3>Available Features After Sign In:</h3>
              <ul>
                <li>✓ Browse Live Auctions</li>
                <li>✓ Place Bids on Items</li>
                <li>✓ Create Your Own Auctions</li>
                <li>✓ Track Your Bids</li>
                <li>✓ Manage Your Profile</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="landing-welcome">
            <p>You're signed in!</p>
            <div className="landing-buttons">
              <Link to="/dashboard" className="landing-button primary">Go to Dashboard</Link>
              <Link to="/live-auctions" className="landing-button secondary">View Live Auctions</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;