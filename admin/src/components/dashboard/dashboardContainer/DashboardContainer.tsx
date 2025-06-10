import React from "react";
import StatCard from "../stateCard/StatCard";
import { FaRegBell, FaArrowUp, FaArrowDown } from "react-icons/fa";
import AdminFooter from "../../footer/AdminFooter";
import DashboardChart from "../dashboardChart/DashboardChart";
import TopProducts from "../topProducts/TopProducts";
import "./DashboardContainer.scss";

const DashboardContainer = () => {
  return (
    <main className="dashboard__main">
      <header className="dashboard__navbar">
        <div className="dashboard__navbar_left">
          <h2>Dashboard</h2>
          <p>Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="dashboard__notice">
          <FaRegBell size={21} />
          <p>View notice board</p>
        </div>
      </header>

      <section className="dashboard__stats">
        <StatCard
          title="Total Revenue"
          value="$45,231"
          delta="+12.5%"
          icon={<FaArrowUp />}
          trend="up"
        />
        <StatCard
          title="Orders"
          value="1,245"
          delta="+8.2%"
          icon={<FaArrowUp />}
          trend="up"
        />
        <StatCard
          title="Customers"
          value="892"
          delta="+3.1%"
          icon={<FaArrowUp />}
          trend="up"
        />
        <StatCard
          title="Conversion Rate"
          value="3.24%"
          delta="-0.4%"
          icon={<FaArrowDown />}
          trend="down"
        />
      </section>

      <section className="dashboard__charts">
        <div className="chart-container">
          <DashboardChart />
        </div>
        <div className="dashboard__side-panels">
          <TopProducts />
        </div>
      </section>

      <section className="dashboard__bottom-charts">
        <div className="circle-chart-container"></div>
      </section>

      <AdminFooter />
    </main>
  );
};

export default DashboardContainer;
