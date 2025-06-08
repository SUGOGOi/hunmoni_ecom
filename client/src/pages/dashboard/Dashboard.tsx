import React, { useState } from "react";
import "./dashboard.scss";
import StatCard from "../../components/dashboard/stateCard/StatCard";
import OrdersTable from "../../components/dashboard/orderTable/OrderTable";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <h2 className="dashboard__logo">E-Shop Admin</h2>
          <nav>
            <ul>
              <li>Dashboard</li>
              <li>Products</li>
              <li>Orders</li>
              <li>Customers</li>
              <li>Settings</li>
            </ul>
          </nav>
        </div>

        <div className="profile-area">
          <p>Sumsum</p>
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
          <h1>Dashboard</h1>
          <div className="dashboard__profile">👤 Admin</div>
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
