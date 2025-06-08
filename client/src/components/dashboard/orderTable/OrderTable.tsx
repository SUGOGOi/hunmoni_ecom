import React from "react";
import "./orderstable.scss";

const orders = [
  {
    id: 1,
    customer: "Alice",
    total: "$120",
    status: "Completed",
    date: "2025-06-07",
  },
  {
    id: 2,
    customer: "Bob",
    total: "$75",
    status: "Pending",
    date: "2025-06-07",
  },
  {
    id: 3,
    customer: "Charlie",
    total: "$210",
    status: "Completed",
    date: "2025-06-06",
  },
  {
    id: 4,
    customer: "Diana",
    total: "$60",
    status: "Refunded",
    date: "2025-06-06",
  },
];

const OrdersTable: React.FC = () => (
  <table className="orders-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Customer</th>
        <th>Total</th>
        <th>Status</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.customer}</td>
          <td>{order.total}</td>
          <td>{order.status}</td>
          <td>{order.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default OrdersTable;
