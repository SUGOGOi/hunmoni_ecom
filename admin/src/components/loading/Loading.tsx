import React from "react";
import "./Loading.scss";

interface LoadingPageProps {
  message?: string;
  showLogo?: boolean;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingPageProps> = ({ fullScreen = true }) => {
  return (
    <div className={`loading-page ${fullScreen ? "fullscreen" : ""}`}>
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-ring">
            <div className="spinner-circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
