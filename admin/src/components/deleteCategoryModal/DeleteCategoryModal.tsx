import React from "react";
import { FaTimes, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import "./DeleteCategoryModal.scss";

interface Category {
  id: string;
  name: string;
  description: string;
  type: "category" | "subcategory" | "brand";
  parentId?: string;
  parentName?: string;
  status: "active" | "inactive";
  createdDate: string;
  productCount: number;
}

interface DeleteCategoryModalProps {
  isOpen: boolean;
  category: Category | null;
  onClose: () => void;
  onConfirm: (categoryId: string) => void;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  isOpen,
  category,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    if (category) {
      onConfirm(category.id);
      onClose();
    }
  };

  if (!isOpen || !category) return null;

  return (
    <div className="delete-category-modal__overlay" onClick={onClose}>
      <div
        className="delete-category-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-category-modal__header">
          <div className="header-content">
            <div className="warning-icon">
              <FaExclamationTriangle />
            </div>
            <h3>Delete {category.type}</h3>
          </div>
          <button className="delete-category-modal__close" onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>

        <div className="delete-category-modal__content">
          <div className="warning-message">
            <p>
              Are you sure you want to delete this {category.type}? This action
              cannot be undone.
            </p>
          </div>

          <div className="category-details">
            <div className="detail-row">
              <span className="label">Name:</span>
              <span className="value">{category.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Type:</span>
              <span className="value">{category.type}</span>
            </div>
            <div className="detail-row">
              <span className="label">Products:</span>
              <span className="value">{category.productCount}</span>
            </div>
            {category.parentName && (
              <div className="detail-row">
                <span className="label">Parent:</span>
                <span className="value">{category.parentName}</span>
              </div>
            )}
          </div>

          <div className="consequences">
            <h4>This will also:</h4>
            <ul>
              <li>Remove all associated products from this {category.type}</li>
              <li>Update product categorization</li>
              <li>Affect filtering and search functionality</li>
              {category.type === "category" && (
                <li>Delete all subcategories under this category</li>
              )}
            </ul>
          </div>
        </div>

        <div className="delete-category-modal__footer">
          <button className="modal-btn modal-btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-btn modal-btn--danger"
            onClick={handleConfirm}
          >
            <FaTrash size={14} />
            <span>Delete {category.type}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
