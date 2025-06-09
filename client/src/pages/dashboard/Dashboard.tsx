import React, { useState } from "react";
import "./dashboard.scss";
import StatCard from "../../components/dashboard/stateCard/StatCard";
import OrdersTable from "../../components/dashboard/orderTable/OrderTable";
import { useStore } from "../../store/store";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineProduct } from "react-icons/ai";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { BsPeople } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
// import toast from "react-hot-toast";
import { FaRegBell } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setActiveMenuItem, activeMenuItem } = useStore();
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

  return (
    <div className="dashboard">
      <div className={`dashboard__sidebar${sidebarOpen ? " open" : ""}`}>
        {/* <button
          className="dashboard__sidebar-toggle"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
          style={{ display: sidebarOpen ? "block" : "none" }}
        >
          ×
        </button> */}
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
                <AiOutlineHome size={24} />
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
                  activeMenuItem === "Settings" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenuItem("Settings");
                }}
              >
                <IoSettingsOutline size={24} />
                Settings
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
              <p>sumsumgogoi51@gmail.com</p>
            </div>
            <div className="my-profile">
              <p>My Profile</p>
            </div>
            <div className="log-out">
              <p>Log Out</p>
            </div>
          </div>
          <div className="profile-area" onClick={handleProfile}>
            <img
              src="https://avatars.githubusercontent.com/u/104547345?v=4"
              alt=""
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
      <main className="dashboard__main">
        <header className="dashboard__navbar">
          <div className="dashboard__navbar_left">
            <h2>Dashboard</h2>
            <p>Manage your products, orders, etc</p>
          </div>
          <div className="dashboard__notice">
            <FaRegBell size={22} />
            <p>View notice board</p>
          </div>
        </header>
        <section className="dashboard__stats">
          <StatCard title="Total Sales" value="$12,340" delta="+5%" />
          <StatCard title="Orders" value="1,245" delta="+2%" />
          <StatCard title="Customers" value="820" delta="+1.2%" />
          <StatCard title="Refunds" value="12" delta="-0.5%" />
        </section>
        <section className="dashboard__orders">
          <h2>Recent Orders</h2>
          <OrdersTable />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
