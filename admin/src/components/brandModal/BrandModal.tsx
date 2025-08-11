import React, { useState, useEffect } from "react";
import { FaTimes, FaSave, FaUpload } from "react-icons/fa";
import "./BrandModal.scss";
import type { Brand, BrandInput } from "../../types/types";

interface BrandModalProps {
  isOpen: boolean;
  mode: "view" | "edit" | "add";
  brand: object | null;
  onClose: () => void;
  onSave: (brand: Brand) => void;
}

const BrandModal: React.FC<BrandModalProps> = ({
  isOpen,
  mode,
  brand,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<BrandInput>({
    name: "",
    description: "",
    status: "",
    file: null,
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === "add") {
        setFormData({
          name: "",
          description: "",
          status: "",
          file: null,
        });
        setLogoPreview(null);
      } else if (brand) {
        setFormData(brand);
        setLogoPreview(brand.logoUrl);
      }
    }
  }, [isOpen, mode, brand]);

  const handleInputChange = (field: keyof Brand, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData((prev) => ({
          ...prev,
          file: ev.target?.result as string,
        }));
        setLogoPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  const readOnly = mode === "view";

  return (
    <div className="brand-modal__overlay" onClick={onClose}>
      <div
        className="brand-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="brand-modal__header">
          <h3>
            {mode === "add"
              ? "Add Brand"
              : mode === "edit"
              ? "Edit Brand"
              : "Brand Details"}
          </h3>
          <button className="brand-modal__close" onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>
        <div className="brand-modal__content">
          <div className="brand-modal__logo-section">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Brand logo"
                className="brand-modal__logo-preview"
              />
            ) : (
              <div className="brand-modal__logo-placeholder">No Logo</div>
            )}
            {!readOnly && (
              <label className="brand-modal__logo-upload">
                <FaUpload size={14} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  style={{ display: "none" }}
                />
                <span>Upload Logo</span>
              </label>
            )}
          </div>
          <div className="brand-modal__fields">
            <div className="brand-modal__field">
              <label>Name</label>
              {readOnly ? (
                <span>{formData.name}</span>
              ) : (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Brand name"
                />
              )}
            </div>
            <div className="brand-modal__field">
              <label>Description</label>
              {readOnly ? (
                <span>{formData.description}</span>
              ) : (
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Brand description"
                  rows={3}
                />
              )}
            </div>
            <div className="brand-modal__field">
              <label>Status</label>
              {readOnly ? (
                <span>{formData.status.toLocaleLowerCase()}</span>
              ) : (
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              )}
            </div>
            <div className="brand-modal__field">
              <label>Created Date</label>
              <span>{formData.createdAt.toString().split("T")[0]}</span>
            </div>
          </div>
        </div>
        <div className="brand-modal__footer">
          {!readOnly && (
            <button
              className="brand-modal__btn brand-modal__btn--primary"
              onClick={handleSave}
            >
              <FaSave size={14} />
              <span>{mode === "add" ? "Add Brand" : "Save Changes"}</span>
            </button>
          )}
          <button
            className="brand-modal__btn brand-modal__btn--secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
