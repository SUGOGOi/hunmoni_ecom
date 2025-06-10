import React, { useState } from "react";
import {
  FaTimes,
  FaCopy,
  FaEye,
  FaShoppingCart,
  FaCalendarAlt,
  FaDollarSign,
} from "react-icons/fa";
import "./CustomerOrderHistoryModal.scss";

interface Order {
  id: string;
  product: string;
  quantity: number;
  amount: string;
  status: string;
  date: string;
  paymentMethod: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: string;
  lastOrderDate: string;
}

interface CustomerOrderHistoryModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
}

const CustomerOrderHistoryModal: React.FC<CustomerOrderHistoryModalProps> = ({
  isOpen,
  customer,
  onClose,
}) => {
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  // Mock order data - in real app, this would come from props or API
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      product: "Wireless Headphones",
      quantity: 2,
      amount: "$299.98",
      status: "completed",
      date: "2025-06-08",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-015",
      product: "Smartphone Case",
      quantity: 1,
      amount: "$24.99",
      status: "completed",
      date: "2025-05-22",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-032",
      product: "Bluetooth Speaker",
      quantity: 1,
      amount: "$149.99",
      status: "shipped",
      date: "2025-05-10",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-045",
      product: "USB Cable",
      quantity: 3,
      amount: "$29.97",
      status: "completed",
      date: "2025-04-18",
      paymentMethod: "Debit Card",
    },
    {
      id: "ORD-067",
      product: "Gaming Mouse",
      quantity: 1,
      amount: "$79.99",
      status: "completed",
      date: "2025-03-25",
      paymentMethod: "Credit Card",
    },
  ]);

  const copyOrderId = async (orderId: string) => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopiedOrderId(orderId);
      setTimeout(() => setCopiedOrderId(null), 2000);
    } catch (err) {
      console.error("Failed to copy order ID:", err);
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

  if (!isOpen || !customer) return null;

  return (
    <div className="order-history-modal__overlay" onClick={onClose}>
      <div
        className="order-history-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="order-history-modal__header">
          <div className="header-content">
            <h3>Order History</h3>
            <div className="customer-summary">
              <span className="customer-name">{customer.name}</span>
              <span className="customer-email">{customer.email}</span>
            </div>
          </div>
          <button className="order-history-modal__close" onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>

        <div className="order-history-modal__content">
          {/* Customer Stats */}
          <div className="customer-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <FaShoppingCart />
              </div>
              <div className="stat-info">
                <span className="stat-value">{customer.totalOrders}</span>
                <span className="stat-label">Total Orders</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaDollarSign />
              </div>
              <div className="stat-info">
                <span className="stat-value">{customer.totalSpent}</span>
                <span className="stat-label">Total Spent</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FaCalendarAlt />
              </div>
              <div className="stat-info">
                <span className="stat-value">{customer.lastOrderDate}</span>
                <span className="stat-label">Last Order</span>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="orders-section">
            <h4>Recent Orders</h4>
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <div className="order-id-section">
                      <span className="order-id">{order.id}</span>
                      <button
                        className={`copy-btn ${
                          copiedOrderId === order.id ? "copied" : ""
                        }`}
                        onClick={() => copyOrderId(order.id)}
                        title="Copy Order ID"
                      >
                        <FaCopy size={12} />
                        {copiedOrderId === order.id ? "Copied!" : ""}
                      </button>
                    </div>
                    <span
                      className={`order-status ${getStatusClass(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <div className="order-product">
                      <span className="product-name">{order.product}</span>
                      <span className="product-quantity">
                        Qty: {order.quantity}
                      </span>
                    </div>
                    <div className="order-meta">
                      <span className="order-amount">{order.amount}</span>
                      <span className="order-date">{order.date}</span>
                      <span className="payment-method">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-history-modal__footer">
          <button className="modal-btn modal-btn--secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderHistoryModal;
