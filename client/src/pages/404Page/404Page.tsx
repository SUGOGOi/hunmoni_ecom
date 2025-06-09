import React from "react";
import "./404Page.scss";

const NotFoundPage: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          {/* 404 Animation */}
          <div className="error-animation">
            <div className="error-number">
              <span className="digit">4</span>
              <span className="digit zero">0</span>
              <span className="digit">4</span>
            </div>
          </div>

          {/* Error Message */}
          <div className="error-message">
            <h1>Page Not Found</h1>
            <p>The page you're looking for doesn't exist or has been moved.</p>
          </div>

          {/* Action Buttons */}
          <div className="error-actions">
            <button className="btn-primary" onClick={handleGoHome}>
              🏠 Go Home
            </button>
            <button className="btn-secondary" onClick={handleGoBack}>
              ← Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="quick-links">
            <a href="/products">Products</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
