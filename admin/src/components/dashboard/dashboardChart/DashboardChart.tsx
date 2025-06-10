import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./DashboardChart.scss";

const DashboardChart = () => {
  const data = [
    { name: "Jan", revenue: 4000, orders: 240 },
    { name: "Feb", revenue: 3000, orders: 198 },
    { name: "Mar", revenue: 5000, orders: 320 },
    { name: "Apr", revenue: 4500, orders: 290 },
    { name: "May", revenue: 6000, orders: 380 },
    { name: "Jun", revenue: 5500, orders: 350 },
  ];

  return (
    <div className="dashboard-chart">
      <div className="chart-header">
        <h3>Revenue & Orders Overview</h3>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color revenue"></div>
            <span>Revenue</span>
          </div>
          <div className="legend-item">
            <div className="legend-color orders"></div>
            <span>Orders</span>
          </div>
        </div>
      </div>
      <div className="chart-content">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d87f37" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#d87f37" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#17a2b8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#17a2b8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2b2a2a" />
            <XAxis
              dataKey="name"
              stroke="#bababa"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#bababa"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18191a",
                border: "1px solid rgb(50, 50, 50)",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#d87f37"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#17a2b8"
              strokeWidth={2}
              fill="url(#ordersGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
