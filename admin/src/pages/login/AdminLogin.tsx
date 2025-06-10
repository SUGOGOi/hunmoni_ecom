import React, { useState } from "react";
import "./adminLogin.scss";
import axios from "axios";
import { SERVER_URL } from "../../store/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "../../types/types";

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${SERVER_URL}/api/admin/admin-login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success === true) {
        toast(`${response.data.message}`, {
          // icon: "✔",
          style: {
            borderRadius: "13px",
            background: "#123623",
            color: "#16c864",
          },
        });
      }
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

        <form className="admin-login__form" onSubmit={handleSubmit}>
          {error && <div className="admin-login__error">{error}</div>}

          <div className="admin-login__field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
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
              value={formData.password}
              onChange={handleInputChange}
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
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
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
