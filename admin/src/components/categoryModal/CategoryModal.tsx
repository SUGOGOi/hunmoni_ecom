import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaSave,
  FaFolder,
  FaTags,
  FaCertificate,
} from "react-icons/fa";
import "./CategoryModal.scss";

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
  associatedBrands?: string[]; // For subcategories
  associatedSubcategories?: string[]; // For brands
}

interface CategoryModalProps {
  isOpen: boolean;
  mode: "add" | "edit" | "view";
  category: Category | null;
  parentCategories: Category[];
  allCategories: Category[]; // All categories including subcategories and brands
  onClose: () => void;
  onSave: (category: Category) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  mode,
  category,
  parentCategories,
  allCategories,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Category>({
    id: "",
    name: "",
    description: "",
    type: "category",
    status: "active",
    createdDate: new Date().toISOString().split("T")[0],
    productCount: 0,
    associatedBrands: [],
    associatedSubcategories: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      if (mode === "add") {
        const typePrefix = {
          category: "CAT",
          subcategory: "SUB",
          brand: "BRD",
        };
        setFormData({
          id: `${typePrefix.category}-${Date.now().toString().slice(-3)}`,
          name: "",
          description: "",
          type: "category",
          status: "active",
          createdDate: new Date().toISOString().split("T")[0],
          productCount: 0,
          associatedBrands: [],
          associatedSubcategories: [],
        });
      } else if (category) {
        setFormData({
          ...category,
          associatedBrands: category.associatedBrands || [],
          associatedSubcategories: category.associatedSubcategories || [],
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, category]);

  const handleInputChange = (
    field: keyof Category,
    value: string | string[]
  ) => {
    if (field === "type") {
      const typePrefix = {
        category: "CAT",
        subcategory: "SUB",
        brand: "BRD",
      };
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        id:
          mode === "add"
            ? `${typePrefix[value as keyof typeof typePrefix]}-${Date.now()
                .toString()
                .slice(-3)}`
            : prev.id,
        parentId: value === "category" ? undefined : prev.parentId,
        parentName: value === "category" ? undefined : prev.parentName,
        associatedBrands: value === "subcategory" ? prev.associatedBrands : [],
        associatedSubcategories:
          value === "brand" ? prev.associatedSubcategories : [],
      }));
    } else if (field === "parentId") {
      const parent = parentCategories.find((p) => p.id === value);
      setFormData((prev) => ({
        ...prev,
        parentId: value || undefined,
        parentName: parent?.name || undefined,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleMultiSelectChange = (
    field: "associatedBrands" | "associatedSubcategories",
    selectedIds: string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedIds,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.type === "subcategory" && !formData.parentId) {
      newErrors.parentId = "Parent category is required for subcategories";
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "category":
        return <FaFolder />;
      case "subcategory":
        return <FaTags />;
      case "brand":
        return <FaCertificate />;
      default:
        return null;
    }
  };

  // Get available brands for subcategory selection
  const getAvailableBrands = () => {
    return allCategories.filter(
      (cat) => cat.type === "brand" && cat.status === "active"
    );
  };

  // Get available subcategories for brand selection
  const getAvailableSubcategories = () => {
    return allCategories.filter(
      (cat) => cat.type === "subcategory" && cat.status === "active"
    );
  };

  if (!isOpen) return null;

  return (
    <div className="category-modal__overlay" onClick={onClose}>
      <div
        className="category-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="category-modal__header">
          <h3>
            {mode === "add"
              ? "Add New Item"
              : mode === "edit"
              ? "Edit Item"
              : "Item Details"}
          </h3>
          <button className="category-modal__close" onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>

        <div className="category-modal__content">
          <div className="form__section">
            <div className="form__row">
              <div className="form__field">
                <label>Type *</label>
                {mode === "view" ? (
                  <div className="type-display">
                    {getTypeIcon(formData.type)}
                    <span>{formData.type}</span>
                  </div>
                ) : (
                  <div className="type-selector">
                    <button
                      type="button"
                      className={`type-btn ${
                        formData.type === "category" ? "active" : ""
                      }`}
                      onClick={() => handleInputChange("type", "category")}
                    >
                      <FaFolder />
                      Category
                    </button>
                    <button
                      type="button"
                      className={`type-btn ${
                        formData.type === "subcategory" ? "active" : ""
                      }`}
                      onClick={() => handleInputChange("type", "subcategory")}
                    >
                      <FaTags />
                      Subcategory
                    </button>
                    <button
                      type="button"
                      className={`type-btn ${
                        formData.type === "brand" ? "active" : ""
                      }`}
                      onClick={() => handleInputChange("type", "brand")}
                    >
                      <FaCertificate />
                      Brand
                    </button>
                  </div>
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

            <div className="form__row">
              <div className="form__field">
                <label>Name *</label>
                {mode === "view" ? (
                  <span className="form__value">{formData.name}</span>
                ) : (
                  <>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter name"
                    />
                    {errors.name && (
                      <span className="form__error">{errors.name}</span>
                    )}
                  </>
                )}
              </div>
              {formData.type === "subcategory" && (
                <div className="form__field">
                  <label>Parent Category *</label>
                  {mode === "view" ? (
                    <span className="form__value">
                      {formData.parentName || "-"}
                    </span>
                  ) : (
                    <>
                      <select
                        value={formData.parentId || ""}
                        onChange={(e) =>
                          handleInputChange("parentId", e.target.value)
                        }
                      >
                        <option value="">Select parent category</option>
                        {parentCategories.map((parent) => (
                          <option key={parent.id} value={parent.id}>
                            {parent.name}
                          </option>
                        ))}
                      </select>
                      {errors.parentId && (
                        <span className="form__error">{errors.parentId}</span>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="form__field">
              <label>Description *</label>
              {mode === "view" ? (
                <p className="form__value">{formData.description}</p>
              ) : (
                <>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Enter description"
                    rows={3}
                  />
                  {errors.description && (
                    <span className="form__error">{errors.description}</span>
                  )}
                </>
              )}
            </div>

            {/* Associated Brands for Subcategories */}
            {formData.type === "subcategory" && (
              <div className="form__field">
                <label>Associated Brands</label>
                {mode === "view" ? (
                  <div className="associated-items">
                    {formData.associatedBrands &&
                    formData.associatedBrands.length > 0 ? (
                      formData.associatedBrands.map((brandId) => {
                        const brand = allCategories.find(
                          (cat) => cat.id === brandId
                        );
                        return brand ? (
                          <span key={brandId} className="associated-tag">
                            <FaCertificate /> {brand.name}
                          </span>
                        ) : null;
                      })
                    ) : (
                      <span className="form__value">No brands associated</span>
                    )}
                  </div>
                ) : (
                  <div className="multi-select">
                    {getAvailableBrands().map((brand) => (
                      <label key={brand.id} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={
                            formData.associatedBrands?.includes(brand.id) ||
                            false
                          }
                          onChange={(e) => {
                            const currentBrands =
                              formData.associatedBrands || [];
                            if (e.target.checked) {
                              handleMultiSelectChange("associatedBrands", [
                                ...currentBrands,
                                brand.id,
                              ]);
                            } else {
                              handleMultiSelectChange(
                                "associatedBrands",
                                currentBrands.filter((id) => id !== brand.id)
                              );
                            }
                          }}
                        />
                        <span className="checkbox-label">
                          <FaCertificate /> {brand.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Associated Subcategories for Brands */}
            {formData.type === "brand" && (
              <div className="form__field">
                <label>Associated Subcategories</label>
                {mode === "view" ? (
                  <div className="associated-items">
                    {formData.associatedSubcategories &&
                    formData.associatedSubcategories.length > 0 ? (
                      formData.associatedSubcategories.map((subId) => {
                        const subcategory = allCategories.find(
                          (cat) => cat.id === subId
                        );
                        return subcategory ? (
                          <span key={subId} className="associated-tag">
                            <FaTags /> {subcategory.name}
                          </span>
                        ) : null;
                      })
                    ) : (
                      <span className="form__value">
                        No subcategories associated
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="multi-select">
                    {getAvailableSubcategories().map((subcategory) => (
                      <label key={subcategory.id} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={
                            formData.associatedSubcategories?.includes(
                              subcategory.id
                            ) || false
                          }
                          onChange={(e) => {
                            const currentSubs =
                              formData.associatedSubcategories || [];
                            if (e.target.checked) {
                              handleMultiSelectChange(
                                "associatedSubcategories",
                                [...currentSubs, subcategory.id]
                              );
                            } else {
                              handleMultiSelectChange(
                                "associatedSubcategories",
                                currentSubs.filter(
                                  (id) => id !== subcategory.id
                                )
                              );
                            }
                          }}
                        />
                        <span className="checkbox-label">
                          <FaTags /> {subcategory.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {mode === "view" && (
              <div className="form__row">
                <div className="form__field">
                  <label>ID</label>
                  <span className="form__value">{formData.id}</span>
                </div>
                <div className="form__field">
                  <label>Product Count</label>
                  <span className="form__value">{formData.productCount}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="category-modal__footer">
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
                <span>{mode === "add" ? "Create" : "Save Changes"}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
