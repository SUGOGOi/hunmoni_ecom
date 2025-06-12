import React, { useState } from "react";
import { FaSearch, FaCheck, FaTimes, FaEye } from "react-icons/fa";
import ReviewModerationModal from "../reviewModerationModal/ReviewModerationModal";
import "./ReviewContainer.scss";

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

const initialReviews: Review[] = [
  {
    id: "REV-001",
    product: "Wireless Headphones",
    customer: "John Smith",
    email: "john@example.com",
    rating: 5,
    comment: "Fantastic sound quality and battery life!",
    date: "2025-06-10",
    status: "pending",
  },
  {
    id: "REV-002",
    product: "Bluetooth Speaker",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    rating: 4,
    comment: "Great speaker, but a bit heavy.",
    date: "2025-06-09",
    status: "approved",
  },
  {
    id: "REV-003",
    product: "Gaming Mouse",
    customer: "Mike Wilson",
    email: "mike@example.com",
    rating: 2,
    comment: "Stopped working after a month.",
    date: "2025-06-08",
    status: "disapproved",
  },
];

const ReviewContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const handleOpenModal = (review: Review) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReview(null);
  };

  const handleModerate = (
    id: string,
    newStatus: "approved" | "disapproved"
  ) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    handleCloseModal();
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="reviews__main">
      <header className="reviews__navbar">
        <div className="reviews__navbar_left">
          <h2>Product Reviews</h2>
          <p>Moderate customer feedback and ratings</p>
        </div>
      </header>

      <section className="reviews__filters">
        <div className="reviews__search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by product, customer, or comment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="reviews__filter">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="disapproved">Disapproved</option>
          </select>
        </div>
      </section>

      <section className="reviews__content">
        <div className="reviews__table-container">
          <table className="reviews__table">
            <thead>
              <tr>
                <th>Review ID</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Moderate</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.product}</td>
                  <td>
                    <div className="review-customer">
                      <span>{review.customer}</span>
                      <span className="review-email">{review.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`review-rating rating-${review.rating}`}>
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </td>
                  <td className="review-comment">{review.comment}</td>
                  <td>
                    <span className={`status status-${review.status}`}>
                      {review.status}
                    </span>
                  </td>
                  <td>{review.date}</td>
                  <td>
                    <button
                      className="review-action-btn"
                      onClick={() => handleOpenModal(review)}
                      title="Moderate Review"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ReviewModerationModal
        isOpen={modalOpen}
        review={selectedReview}
        onClose={handleCloseModal}
        onModerate={handleModerate}
      />
    </main>
  );
};

export default ReviewContainer;
