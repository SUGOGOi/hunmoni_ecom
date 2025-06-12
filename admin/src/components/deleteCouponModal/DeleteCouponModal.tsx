import React from "react";
import { FaTimes, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import "./DeleteCouponModal.scss";

interface Coupon {
  id: string;
  code: string;
  description: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  status: "active" | "inactive" | "expired";
  startDate: string;
  endDate: string;
  createdDate: string;
}

interface DeleteCouponModalProps {
  isOpen: boolean;
  coupon: Coupon | null;
  onClose: () => void;
  onConfirm: (couponId: string) => void;
}

const DeleteCouponModal: React.FC<DeleteCouponModalProps> = ({
  isOpen,
  coupon,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    if (coupon) {
      onConfirm(coupon.id);
      onClose();
    }
  };

  if (!isOpen || !coupon) return null;

  return (
    <div className="delete-coupon-modal__overlay" onClick={onClose}>
      <div
        className="delete-coupon-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-coupon-modal__header">
          <div className="header-content">
            <div className="warning-icon">
              <FaExclamationTriangle />
            </div>
            <h3>Delete Coupon</h3>
          </div>
          <button className="delete-coupon-modal__close" onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>

        <div className="delete-coupon-modal__content">
          <div className="warning-message">
            <p>
              Are you sure you want to delete this coupon? This action cannot be
              undone.
            </p>
          </div>

          <div className="coupon-details">
            <div className="detail-row">
              <span className="label">Coupon Code:</span>
              <span className="value">{coupon.code}</span>
            </div>
            <div className="detail-row">
              <span className="label">Description:</span>
              <span className="value">{coupon.description}</span>
            </div>
            <div className="detail-row">
              <span className="label">Value:</span>
              <span className="value">
                {coupon.type === "percentage"
                  ? `${coupon.value}%`
                  : `$${coupon.value}`}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Usage:</span>
              <span className="value">
                {coupon.usedCount}/{coupon.usageLimit}
              </span>
            </div>
          </div>

          <div className="consequences">
            <h4>This will:</h4>
            <ul>
              <li>Permanently remove the coupon from the system</li>
              <li>Prevent any future use of this coupon code</li>
              <li>Keep historical usage data for reporting</li>
            </ul>
          </div>
        </div>

        <div className="delete-coupon-modal__footer">
          <button className="modal-btn modal-btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-btn modal-btn--danger"
            onClick={handleConfirm}
          >
            <FaTrash size={14} />
            <span>Delete Coupon</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCouponModal;
