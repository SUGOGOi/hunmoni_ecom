import React, { useState, useEffect } from "react";
import { FaTimes, FaSave, FaPercent, FaDollarSign } from "react-icons/fa";
import "./CouponModal.scss";
import type { Coupon, CouponModalProps } from "../../types/types";

const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  mode,
  coupon,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Coupon>({
    id: "",
    code: "",
    description: "",
    type: "percentage",
    value: 0,
    minOrderAmount: 0,
    maxDiscount: undefined,
    usageLimit: 100,
    usedCount: 0,
    status: "active",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    createdDate: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      if (mode === "add") {
        setFormData({
          id: `CPN-${Date.now().toString().slice(-3)}`,
          code: "",
          description: "",
          type: "percentage",
          value: 0,
          minOrderAmount: 0,
          maxDiscount: undefined,
          usageLimit: 100,
          usedCount: 0,
          status: "active",
          startDate: new Date().toISOString().split("T")[0],
          endDate: "",
          createdDate: new Date().toISOString().split("T")[0],
        });
      } else if (coupon) {
        setFormData(coupon);
      }
      setErrors({});
    }
  }, [isOpen, mode, coupon]);

  const handleInputChange = (field: keyof Coupon, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.code.trim()) newErrors.code = "Coupon code is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.value <= 0) newErrors.value = "Value must be greater than 0";
    if (formData.type === "percentage" && formData.value > 100)
      newErrors.value = "Percentage cannot exceed 100%";
    if (formData.minOrderAmount < 0)
      newErrors.minOrderAmount = "Minimum order amount cannot be negative";
    if (formData.usageLimit <= 0)
      newErrors.usageLimit = "Usage limit must be greater than 0";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="coupon-modal__overlay" onClick={onClose}>
      <div
        className="coupon-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="coupon-modal__header">
          <h3>
            {mode === "add"
              ? "Add New Coupon"
              : mode === "edit"
              ? "Edit Coupon"
              : "Coupon Details"}
          </h3>
          <button className="coupon-modal__close" onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>

        <div className="coupon-modal__content">
          <div className="form__section">
            <div className="form__row">
              <div className="form__field">
                <label>Coupon Code *</label>
                {mode === "view" ? (
                  <span className="form__value">{formData.code}</span>
                ) : (
                  <>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) =>
                        handleInputChange("code", e.target.value.toUpperCase())
                      }
                      placeholder="e.g., SAVE20"
                    />
                    {errors.code && (
                      <span className="form__error">{errors.code}</span>
                    )}
                  </>
                )}
              </div>
              <div className="form__field">
                <label>Status</label>
                {mode === "view" ? (
                  <span className="form__value">{formData.status}</span>
                ) : (
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                )}
              </div>
            </div>

            <div className="form__field">
              <label>Description *</label>
              {mode === "view" ? (
                <span className="form__value">{formData.description}</span>
              ) : (
                <>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Enter coupon description"
                    rows={3}
                  />
                  {errors.description && (
                    <span className="form__error">{errors.description}</span>
                  )}
                </>
              )}
            </div>

            <div className="form__row">
              <div className="form__field">
                <label>Discount Type</label>
                {mode === "view" ? (
                  <div className="type-display">
                    {formData.type === "percentage" ? (
                      <FaPercent />
                    ) : (
                      <FaDollarSign />
                    )}
                    <span>{formData.type}</span>
                  </div>
                ) : (
                  <div className="type-selector">
                    <button
                      type="button"
                      className={`type-btn ${
                        formData.type === "percentage" ? "active" : ""
                      }`}
                      onClick={() => handleInputChange("type", "percentage")}
                    >
                      <FaPercent />
                      Percentage
                    </button>
                    <button
                      type="button"
                      className={`type-btn ${
                        formData.type === "fixed" ? "active" : ""
                      }`}
                      onClick={() => handleInputChange("type", "fixed")}
                    >
                      <FaDollarSign />
                      Fixed Amount
                    </button>
                  </div>
                )}
              </div>
              <div className="form__field">
                <label>
                  {formData.type === "percentage"
                    ? "Percentage (%)"
                    : "Amount ($)"}{" "}
                  *
                </label>
                {mode === "view" ? (
                  <span className="form__value">
                    {formData.type === "percentage"
                      ? `${formData.value}%`
                      : `$${formData.value}`}
                  </span>
                ) : (
                  <>
                    <input
                      type="number"
                      value={formData.value}
                      onChange={(e) =>
                        handleInputChange(
                          "value",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      min="0"
                      max={formData.type === "percentage" ? "100" : undefined}
                      step={formData.type === "percentage" ? "1" : "0.01"}
                    />
                    {errors.value && (
                      <span className="form__error">{errors.value}</span>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="form__row">
              <div className="form__field">
                <label>Minimum Order Amount ($)</label>
                {mode === "view" ? (
                  <span className="form__value">
                    ${formData.minOrderAmount}
                  </span>
                ) : (
                  <>
                    <input
                      type="number"
                      value={formData.minOrderAmount}
                      onChange={(e) =>
                        handleInputChange(
                          "minOrderAmount",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      min="0"
                      step="0.01"
                    />
                    {errors.minOrderAmount && (
                      <span className="form__error">
                        {errors.minOrderAmount}
                      </span>
                    )}
                  </>
                )}
              </div>
              {formData.type === "percentage" && (
                <div className="form__field">
                  <label>Maximum Discount ($)</label>
                  {mode === "view" ? (
                    <span className="form__value">
                      {formData.maxDiscount
                        ? `$${formData.maxDiscount}`
                        : "No limit"}
                    </span>
                  ) : (
                    <input
                      type="number"
                      value={formData.maxDiscount || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "maxDiscount",
                          parseFloat(e.target.value)
                        )
                      }
                      min="0"
                      step="0.01"
                      placeholder="Optional"
                    />
                  )}
                </div>
              )}
            </div>

            <div className="form__row">
              <div className="form__field">
                <label>Usage Limit *</label>
                {mode === "view" ? (
                  <span className="form__value">{formData.usageLimit}</span>
                ) : (
                  <>
                    <input
                      type="number"
                      value={formData.usageLimit}
                      onChange={(e) =>
                        handleInputChange(
                          "usageLimit",
                          parseInt(e.target.value) || 0
                        )
                      }
                      min="1"
                    />
                    {errors.usageLimit && (
                      <span className="form__error">{errors.usageLimit}</span>
                    )}
                  </>
                )}
              </div>
              {mode === "view" && (
                <div className="form__field">
                  <label>Used Count</label>
                  <span className="form__value">{formData.usedCount}</span>
                </div>
              )}
            </div>

            <div className="form__row">
              <div className="form__field">
                <label>Start Date</label>
                {mode === "view" ? (
                  <span className="form__value">{formData.startDate}</span>
                ) : (
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                  />
                )}
              </div>
              <div className="form__field">
                <label>End Date *</label>
                {mode === "view" ? (
                  <span className="form__value">{formData.endDate}</span>
                ) : (
                  <>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                    />
                    {errors.endDate && (
                      <span className="form__error">{errors.endDate}</span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="coupon-modal__footer">
          {mode === "view" ? (
            <button
              className="modal-btn modal-btn--secondary"
              onClick={onClose}
            >
              Close
            </button>
          ) : (
            <>
              <button
                className="modal-btn modal-btn--secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="modal-btn modal-btn--primary"
                onClick={handleSave}
              >
                <FaSave size={14} />
                <span>{mode === "add" ? "Create Coupon" : "Save Changes"}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
