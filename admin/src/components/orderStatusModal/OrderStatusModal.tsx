import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaSave,
  FaShippingFast,
  FaCheckCircle,
  FaClock,
  FaBan,
} from "react-icons/fa";
import "./OrderStatusModal.scss";

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

interface OrderStatusModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onSave: (orderId: string, newStatus: string, notes?: string) => void;
}

const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  isOpen,
  order,
  onClose,
  onSave,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const statusOptions = [
    { value: "pending", label: "Pending", icon: FaClock, color: "#ffc107" },
    {
      value: "shipped",
      label: "Shipped",
      icon: FaShippingFast,
      color: "#17a2b8",
    },
    {
      value: "completed",
      label: "Completed",
      icon: FaCheckCircle,
      color: "#28a745",
    },
    { value: "cancelled", label: "Cancelled", icon: FaBan, color: "#dc3545" },
  ];

  useEffect(() => {
    if (isOpen && order) {
      setSelectedStatus(order.status);
      setNotes("");
      setTrackingNumber("");
    }
  }, [isOpen, order]);

  const handleSave = () => {
    if (order && selectedStatus) {
      const updateNotes = notes.trim() || undefined;
      onSave(order.id, selectedStatus, updateNotes);
      onClose();
    }
  };

  const getStatusIcon = (status: string) => {
    const statusOption = statusOptions.find((opt) => opt.value === status);
    return statusOption ? statusOption.icon : FaClock;
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find((opt) => opt.value === status);
    return statusOption ? statusOption.color : "#6c757d";
  };

  if (!isOpen || !order) return null;

  return (
    <div className="status-modal__overlay" onClick={onClose}>
      <div
        className="status-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="status-modal__header">
          <h3>Update Order Status</h3>
          <button className="status-modal__close" onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>

        <div className="status-modal__content">
          {/* Order Info */}
          <div className="order-info">
            <div className="order-info__row">
              <span className="order-info__label">Order ID:</span>
              <span className="order-info__value">{order.id}</span>
            </div>
            <div className="order-info__row">
              <span className="order-info__label">Customer:</span>
              <span className="order-info__value">{order.customer}</span>
            </div>
            <div className="order-info__row">
              <span className="order-info__label">Product:</span>
              <span className="order-info__value">{order.product}</span>
            </div>
            <div className="order-info__row">
              <span className="order-info__label">Amount:</span>
              <span className="order-info__value">{order.amount}</span>
            </div>
            <div className="order-info__row">
              <span className="order-info__label">Current Status:</span>
              <span
                className="order-info__status"
                style={{ color: getStatusColor(order.status) }}
              >
                {React.createElement(getStatusIcon(order.status), { size: 14 })}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Status Selection */}
          <div className="status-selection">
            <h4>Select New Status</h4>
            <div className="status-options">
              {statusOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <div
                    key={option.value}
                    className={`status-option ${
                      selectedStatus === option.value ? "selected" : ""
                    }`}
                    onClick={() => setSelectedStatus(option.value)}
                  >
                    <div
                      className="status-option__icon"
                      style={{ color: option.color }}
                    >
                      <IconComponent size={20} />
                    </div>
                    <span className="status-option__label">{option.label}</span>
                    {selectedStatus === option.value && (
                      <div className="status-option__check">✓</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tracking Number (only for shipped status) */}
          {selectedStatus === "shipped" && (
            <div className="form-field">
              <label>Tracking Number (Optional)</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
              />
            </div>
          )}

          {/* Notes */}
          <div className="form-field">
            <label>Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this status change..."
              rows={3}
            />
          </div>

          {/* Status Change Preview */}
          {selectedStatus !== order.status && (
            <div className="status-preview">
              <div className="status-preview__item">
                <span className="status-preview__label">From:</span>
                <span
                  className="status-preview__status"
                  style={{ color: getStatusColor(order.status) }}
                >
                  {React.createElement(getStatusIcon(order.status), {
                    size: 12,
                  })}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="status-preview__arrow">→</div>
              <div className="status-preview__item">
                <span className="status-preview__label">To:</span>
                <span
                  className="status-preview__status"
                  style={{ color: getStatusColor(selectedStatus) }}
                >
                  {React.createElement(getStatusIcon(selectedStatus), {
                    size: 12,
                  })}
                  {selectedStatus.charAt(0).toUpperCase() +
                    selectedStatus.slice(1)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="status-modal__footer">
          <button
            className="status-modal__btn status-modal__btn--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="status-modal__btn status-modal__btn--primary"
            onClick={handleSave}
            disabled={selectedStatus === order.status}
          >
            <FaSave size={14} />
            <span>Update Status</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusModal;
