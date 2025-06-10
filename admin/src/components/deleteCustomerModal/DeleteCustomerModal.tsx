import React from "react";
import { FaTimes, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import "./DeleteCustomerModal.scss";

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

interface DeleteCustomerModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
  onConfirm: (customerId: string) => void;
}

const DeleteCustomerModal: React.FC<DeleteCustomerModalProps> = ({
  isOpen,
  customer,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    if (customer) {
      onConfirm(customer.id);
      onClose();
    }
  };

  if (!isOpen || !customer) return null;

  return (
    <div className="delete-customer-modal__overlay" onClick={onClose}>
      <div
        className="delete-customer-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-customer-modal__header">
          <div className="header-content">
            <div className="warning-icon">
              <FaExclamationTriangle />
            </div>
            <h3>Delete Customer</h3>
          </div>
          <button className="delete-customer-modal__close" onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>

        <div className="delete-customer-modal__content">
          <div className="warning-message">
            <p>
              Are you sure you want to delete this customer? This action cannot
              be undone.
            </p>
          </div>

          <div className="customer-details">
            <div className="detail-row">
              <span className="label">Customer ID:</span>
              <span className="value">{customer.id}</span>
            </div>
            <div className="detail-row">
              <span className="label">Name:</span>
              <span className="value">{customer.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{customer.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Total Orders:</span>
              <span className="value">{customer.totalOrders}</span>
            </div>
            <div className="detail-row">
              <span className="label">Total Spent:</span>
              <span className="value">{customer.totalSpent}</span>
            </div>
          </div>

          <div className="consequences">
            <h4>This will also:</h4>
            <ul>
              <li>Remove all customer data permanently</li>
              <li>Keep order history for record-keeping</li>
              <li>Mark orders as "Customer Deleted"</li>
              <li>Remove customer from mailing lists</li>
            </ul>
          </div>
        </div>

        <div className="delete-customer-modal__footer">
          <button className="modal-btn modal-btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-btn modal-btn--danger"
            onClick={handleConfirm}
          >
            <FaTrash size={14} />
            <span>Delete Customer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerModal;
