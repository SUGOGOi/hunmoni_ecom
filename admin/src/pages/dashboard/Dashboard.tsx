import React, { useEffect, useState } from "react";
import "./dashboard.scss";

import { useStore } from "../../store/store";
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { AiOutlineProduct } from "react-icons/ai";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { BsPeople } from "react-icons/bs";
// import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_URL } from "../../store/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DashboardContainer from "../../components/dashboard/dashboardContainer/DashboardContainer";
import ProfileContainer from "../../components/dashboard/profileContainer/ProfileContainer";
import OrderContainer from "../../components/dashboard/orderContainer/OrderContainer";
import ProductContainer from "../../components/dashboard/productContainer/ProductContainer";
import { RiCoupon3Line } from "react-icons/ri";
import CustomerContainer from "../../components/dashboard/customerContainer/CustomerContainer";
import CouponContainer from "../../components/couponContainer/CouponContainer";
import { MdCategory, MdOutlineReviews } from "react-icons/md";
import ReviewContainer from "../../components/reviewContainer/ReviewContainer";
import CategoryContainer from "../../components/dashboard/categoryContainer/CategoryContainer";

function deleteCookie(name: string) {
  const expires = new Date(Date.now() - 1000).toUTCString(); // 1 second in the past
  document.cookie = `${name}=; expires=${expires}; path=/;`;
}

const Dashboard: React.FC = () => {
  const navigateTo = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setActiveMenuItem, activeMenuItem, setIsLogin, admin, setAdmin } =
    useStore();
  const [activeProfileArea, setActiveProfileArea] = useState(false);

  const handleProfile = () => {
    setActiveProfileArea(!activeProfileArea);
    // toast("Hello", {
    //   icon: "✔",
    //   style: {
    //     borderRadius: "13px",
    //     background: "#123623",
    //     color: "#16c864",
    //   },
    // });
  };
  const handleMyProfile = async () => {
    setActiveProfileArea(!activeProfileArea);
    setActiveMenuItem("Profile");
    setAdmin(null);

    setTimeout(async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/admin/profile/get`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success === true) {
          console.log(response.data.admin);
          setAdmin(response.data.admin);
          // toast(`${response.data.message}`, {
          //   // icon: "✔",
          //   style: {
          //     borderRadius: "13px",
          //     background: "#123623",
          //     color: "#16c864",
          //   },
          // });
        }
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            toast(
              `${error.response.data.error || error.response.data.message}`,
              {
                // icon: "✔",
                style: {
                  borderRadius: "13px",
                  background: "#3e1220",
                  color: "#ca2d44",
                },
              }
            );
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
      }
    }, 3000);

    if (admin !== null) {
      return;
    }
  };

  useEffect(() => {
    setActiveMenuItem("Dashboard");
  }, []);

  //<========================================================LOG OUT==============================================================>
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/api/admin/auth/logout`, {
        withCredentials: true,
      });

      if (response.data.success === true) {
        toast(`${response.data.message}`, {
          // icon: "✔",
          style: {
            borderRadius: "13px",
            background: "#123623",
            color: "#16c864",
          },
        });
        setIsLogin(false);
        deleteCookie("token");
      }

      navigateTo("/");
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
    }
  };

  return (
    <div className="dashboard">
      <div className={`dashboard__sidebar${sidebarOpen ? " open" : ""}`}>
        <button
          className="dashboard__sidebar-toggle"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
          style={{ display: sidebarOpen ? "block" : "none" }}
        >
          ×
        </button>
        <div className="upper-section">
          <h2 className="dashboard__logo">
            <span>E</span>-Shop Admin
          </h2>
          <nav>
            <ul className="sidebar-menu">
              <li
                className={`menu-item ${
                  activeMenuItem === "Dashboard" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenuItem("Dashboard");
                }}
              >
                <AiOutlineDashboard size={24} />
                Dashboard
              </li>
              <li
                className={`menu-item ${
                  activeMenuItem === "Products" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenuItem("Products");
                }}
              >
                <AiOutlineProduct size={24} />
                Products
              </li>
              <li
                className={`menu-item ${
                  activeMenuItem === "Orders" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenuItem("Orders");
                }}
              >
                <LiaShoppingCartSolid size={25} />
                Orders
              </li>
              <li
                className={`menu-item ${
                  activeMenuItem === "Customers" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenuItem("Customers");
                }}
              >
                <BsPeople size={24} />
                Customers
              </li>
              <li
                className={`menu-item ${
                  activeMenuItem === "Coupons" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenuItem("Coupons");
                }}
              >
                <RiCoupon3Line size={24} />
                Coupons
              </li>
              <li
                className={`menu-item ${
                  activeMenuItem === "HomePage" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenuItem("HomePage");
                }}
              >
                <AiOutlineHome size={24} />
                Home Page
              </li>
              <li
                className={`menu-item ${
                  activeMenuItem === "Reviews" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenuItem("Reviews");
                }}
              >
                <MdOutlineReviews size={24} />
                Reviews
              </li>

              <li
                className={`menu-item ${
                  activeMenuItem === "Categories" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenuItem("Categories");
                }}
              >
                <MdCategory size={24} />
                Categories
              </li>
            </ul>
          </nav>
        </div>

        <div className="profile-main">
          <div
            className={
              activeProfileArea
                ? `profile-detail-area`
                : `profile-detail-area-none`
            }
          >
            <div className="sign-in-details">
              <p>Signed in as</p>
              <p>sumsumgogoi@gmail.com</p>
            </div>
            <div className="my-profile" onClick={handleMyProfile}>
              <p>My Profile</p>
            </div>
            <div className="log-out" onClick={handleLogout}>
              <p>Log Out</p>
            </div>
          </div>
          <div className="profile-area" onClick={handleProfile}>
            <img
              src="https://avatars.githubusercontent.com/u/104547345?v=4"
              alt="profile photo"
            />
            <p>Sumsum Gogoi</p>
          </div>
        </div>
      </div>
      {!sidebarOpen && (
        <button
          className="dashboard__sidebar-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}
      {activeMenuItem === "Dashboard" && <DashboardContainer />}
      {activeMenuItem === "Profile" && <ProfileContainer />}
      {activeMenuItem === "Orders" && <OrderContainer />}
      {activeMenuItem === "Products" && <ProductContainer />}
      {activeMenuItem === "Customers" && <CustomerContainer />}
      {activeMenuItem === "Coupons" && <CouponContainer />}
      {activeMenuItem === "Reviews" && <ReviewContainer />}
      {activeMenuItem === "Categories" && <CategoryContainer />}
    </div>
  );
};

export default Dashboard;
