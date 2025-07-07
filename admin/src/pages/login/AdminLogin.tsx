import React, { useState } from "react";
import "./adminLogin.scss";
import axios from "axios";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import {
  loginWithEmail,
  loginWithGoogle,
} from "../../services/firebaseAuthServices";
import { FcGoogle } from "react-icons/fc";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  //========================================================LOGIN WITH EMAIL/PASSWORD=============================================
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await loginWithEmail(email, password);
      // if (response.data.success === true) {
      //   toast(`${response.data.message}`, {
      //     // icon: "✔",
      //     style: {
      //       borderRadius: "13px",
      //       background: "#123623",
      //       color: "#16c864",
      //     },
      //   });
      // }

      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast(`${error.response.data.error}`, {
            // icon: "✔",
            style: {
              borderRadius: "13px",
              background: "#3e1220",
              color: "#ca2d44",
            },
          });
        } else {
          toast(`Server Error!`, {
            // icon: "✔",
            style: {
              borderRadius: "13px",
              background: "#3e1220",
              color: "#ca2d44",
            },
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  //================================================LOGIN WITH GOOGLE=============================
  const handleGoogleLogin = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      const { user, message } = await loginWithGoogle();

      // if (response.data.success === true) {
      toast(`${message}`, {
        // icon: "✔",
        style: {
          borderRadius: "13px",
          background: "#123623",
          color: "#16c864",
        },
      });
      // }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // console.log(message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast(`${error.response.data.error}`, {
            style: {
              borderRadius: "13px",
              background: "#3e1220",
              color: "#ca2d44",
            },
          });
        } else {
          toast(`Server Error!`, {
            style: {
              borderRadius: "13px",
              background: "#3e1220",
              color: "#ca2d44",
            },
          });
        }
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <div className="admin-login__header">
          <div className="admin-login__logo">
            <span>E</span>-Shop
          </div>
          {/* <h2>Admin Panel</h2> */}
          <p>Admin Panel</p>
        </div>

        <form className="admin-login__form" onSubmit={handleEmailLogin}>
          <div className="admin-login__field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="admin-login__field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="admin-login__options">
            <a href="#" className="admin-login__forgot">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="admin-login__submit"
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <div className="admin-login__divider">
            <span>OR</span>
          </div>

          <button
            className="admin-login__google-btn"
            onClick={handleGoogleLogin}
            type="button"
          >
            <FcGoogle className="google-icon" />
            Google
          </button>
        </form>

        <div className="admin-login__footer">
          <p>© 2025 Admin Panel. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
