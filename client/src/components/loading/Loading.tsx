import React from "react";
import "./loading.scss";

interface LoadingPageProps {
  message?: string;
  showLogo?: boolean;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingPageProps> = ({
  message = "Loading...",
  showLogo = true,
  fullScreen = true,
}) => {
  return (
    <div className={`loading-page ${fullScreen ? "fullscreen" : ""}`}>
      <div className="loading-container">
        {/* Logo Section */}
        {showLogo && (
          <div className="loading-logo">
            <h1>
              <span>E</span>-Shop
            </h1>
          </div>
        )}

        {/* Main Spinner */}
        <div className="loading-spinner">
          <div className="spinner-ring">
            <div className="spinner-circle"></div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="loading-message">
          <p>{message}</p>
        </div>

        {/* Loading Dots Animation */}
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        {/* Progress Bar (Optional) */}
        <div className="loading-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="loading-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>
    </div>
  );
};

export default Loading;
