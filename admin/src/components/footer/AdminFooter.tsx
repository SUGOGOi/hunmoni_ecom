import React from "react";
import "./AdminFooter.scss";
import toast from "react-hot-toast";

const AdminFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleContactDeveloper = () => {
    toast("call 7002022342", {
      // icon: "✔",
      style: {
        borderRadius: "13px",
        background: "#123623",
        color: "#16c864",
      },
    });
  };

  return (
    <footer className="admin-footer">
      <div className="admin-footer__container">
        <div className="admin-footer__left">
          <p>
            &copy; {currentYear} <span>E</span>-Shop Admin. All rights reserved.
          </p>
        </div>

        <div className="admin-footer__center">
          <span className="version">v1.0.0</span>
        </div>

        <div className="admin-footer__right">
          <div className="footer-links">
            <div className="footer-link" onClick={handleContactDeveloper}>
              Contact developer
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
