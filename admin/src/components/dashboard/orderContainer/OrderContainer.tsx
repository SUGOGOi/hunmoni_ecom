import React, { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import AdminFooter from "../../footer/AdminFooter";
import OrderStatusModal from "../../orderStatusModal/OrderStatusModal";
import "./OrderContainer.scss";

interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  quantity: number;
  amount: string;
  status: string;
  date: string;
  paymentMethod: string;
}

const OrdersContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Modal state
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: "John Smith",
      email: "john@example.com",
      product: "Wireless Headphones",
      quantity: 2,
      amount: "$299.98",
      status: "completed",
      date: "2025-06-10",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      product: "Smartphone Case",
      quantity: 1,
      amount: "$24.99",
      status: "pending",
      date: "2025-06-10",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-003",
      customer: "Mike Wilson",
      email: "mike@example.com",
      product: "Laptop Stand",
      quantity: 1,
      amount: "$89.99",
      status: "shipped",
      date: "2025-06-09",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      email: "emily@example.com",
      product: "Bluetooth Speaker",
      quantity: 1,
      amount: "$149.99",
      status: "cancelled",
      date: "2025-06-09",
      paymentMethod: "Debit Card",
    },
    {
      id: "ORD-005",
      customer: "David Brown",
      email: "david@example.com",
      product: "USB Cable",
      quantity: 3,
      amount: "$29.97",
      status: "completed",
      date: "2025-06-08",
      paymentMethod: "Credit Card",
    },
  ]);

  const handleOpenStatusModal = (order: Order) => {
    setSelectedOrder(order);
    setStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setStatusModalOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (
    orderId: string,
    newStatus: string,
    notes?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    // You can also handle notes here if needed
    if (notes) {
      console.log(
        `Order ${orderId} status updated to ${newStatus} with notes: ${notes}`
      );
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "pending":
        return "status-pending";
      case "shipped":
        return "status-shipped";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  return (
    <main className="orders__main">
      <header className="orders__navbar">
        <div className="orders__navbar_left">
          <h2>Orders</h2>
          <p>Manage and track all customer orders</p>
        </div>
        <div className="orders__actions">
          <button className="orders__export-btn">
            <FaDownload size={16} />
            <span>Export</span>
          </button>
        </div>
      </header>

      <section className="orders__filters">
        <div className="orders__search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search orders, customers, or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="orders__filter">
          <FaFilter className="filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </section>

      <section className="orders__content">
        <div className="orders__table-container">
          <table className="orders__table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>
                    <div className="customer-info">
                      <span className="customer-name">{order.customer}</span>
                      <span className="customer-email">{order.email}</span>
                    </div>
                  </td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td className="amount">{order.amount}</td>
                  <td>
                    <span className={`status ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="action-btn view-btn"
                        title="View Details"
                      >
                        <FaEye size={14} />
                      </button>
                      <button
                        className="action-btn edit-btn"
                        title="Edit Status"
                        onClick={() => handleOpenStatusModal(order)}
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        title="Delete Order"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="orders__pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="pagination-info">
              Page {currentPage} of {totalPages}
            </div>
            <button
              className="pagination-btn"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>

      <OrderStatusModal
        isOpen={statusModalOpen}
        order={selectedOrder}
        onClose={handleCloseStatusModal}
        onSave={handleUpdateStatus}
      />

      <AdminFooter />
    </main>
  );
};

export default OrdersContainer;
