import React from "react";
import { FaTimes, FaCheckCircle, FaBan, FaStar } from "react-icons/fa";
import "./ReviewModerationModal.scss";

interface Review {
  id: string;
  product: string;
  customer: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
  status: "pending" | "approved" | "disapproved";
}

interface ReviewModerationModalProps {
  isOpen: boolean;
  review: Review | null;
  onClose: () => void;
  onModerate: (id: string, newStatus: "approved" | "disapproved") => void;
}

const ReviewModerationModal: React.FC<ReviewModerationModalProps> = ({
  isOpen,
  review,
  onClose,
  onModerate,
}) => {
  if (!isOpen || !review) return null;

  return (
    <div className="review-modal__overlay" onClick={onClose}>
      <div
        className="review-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="review-modal__header">
          <h3>Moderate Review</h3>
          <button className="review-modal__close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="review-modal__content">
          <div className="review-details">
            <div>
              <strong>Product:</strong> {review.product}
            </div>
            <div>
              <strong>Customer:</strong> {review.customer} ({review.email})
            </div>
            <div>
              <strong>Date:</strong> {review.date}
            </div>
            <div className="review-rating">
              <strong>Rating:</strong>{" "}
              {[...Array(5)].map((_, i) =>
                i < review.rating ? (
                  <FaStar key={i} color="#d87f37" />
                ) : (
                  <FaStar key={i} color="#444" />
                )
              )}
            </div>
            <div className="review-comment">
              <strong>Comment:</strong>
              <div>{review.comment}</div>
            </div>
          </div>
          <div className="review-moderation-actions">
            <button
              className="modal-btn modal-btn--approve"
              onClick={() => onModerate(review.id, "approved")}
              disabled={review.status === "approved"}
            >
              <FaCheckCircle /> Approve
            </button>
            <button
              className="modal-btn modal-btn--disapprove"
              onClick={() => onModerate(review.id, "disapproved")}
              disabled={review.status === "disapproved"}
            >
              <FaBan /> Disapprove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModerationModal;
