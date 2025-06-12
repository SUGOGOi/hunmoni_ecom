import React, { useState, useEffect } from "react";
import { FaTimes, FaImage, FaPlus, FaSave } from "react-icons/fa";
import "./ProductModal.scss";

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  stock: number;
  sku: string;
  images: string[];
  status: "active" | "inactive" | "discontinued";
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductModalProps {
  isOpen: boolean;
  mode: "add" | "edit" | "view";
  product?: Product | null;
  onClose: () => void;
  onSave: (productData: Partial<Product>) => void;
  onDelete?: (productId: string) => void;
}

interface FormData {
  id: string;
  name: string;
  sku: string;
  category: string;
  subcategory: string;
  brand: string;
  price: string;
  stock: number;
  status: string;
  description: string;
  images: string[];
  dateAdded: string;
}

interface FormErrors {
  name?: string;
  sku?: string;
  price?: string;
  stock?: string;
  description?: string;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  mode,
  product,
  onClose,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    sku: "",
    category: "electronics",
    subcategory: "",
    brand: "",
    price: "",
    stock: 0,
    status: "active",
    description: "",
    images: [],
    dateAdded: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // Initialize form data when modal opens or product changes
  useEffect(() => {
    if (isOpen) {
      if (product && (mode === "edit" || mode === "view")) {
        setFormData({
          id: product.id,
          name: product.name,
          sku: product.sku,
          category: product.category,
          subcategory: product.subcategory || "",
          brand: product.brand,
          price: product.price.toString(),
          stock: product.stock,
          status: product.status,
          description: product.description || "",
          images: product.images || [],
          dateAdded: new Date(product.createdAt).toLocaleDateString(),
        });
      } else {
        // Reset form for add mode
        setFormData({
          id: "",
          name: "",
          sku: "",
          category: "electronics",
          subcategory: "",
          brand: "",
          price: "",
          stock: 0,
          status: "active",
          description: "",
          images: [],
          dateAdded: "",
        });
      }
      setErrors({});
      setMainImageIndex(0);
    }
  }, [isOpen, product, mode]);

  // Get subcategories based on selected category
  const getSubcategories = (category: string) => {
    const subcategories: Record<
      string,
      Array<{ value: string; label: string }>
    > = {
      electronics: [
        { value: "smartphones", label: "Smartphones" },
        { value: "laptops", label: "Laptops" },
        { value: "tablets", label: "Tablets" },
        { value: "audio", label: "Audio" },
      ],
      accessories: [
        { value: "cases", label: "Cases" },
        { value: "chargers", label: "Chargers" },
        { value: "cables", label: "Cables" },
      ],
      office: [
        { value: "furniture", label: "Furniture" },
        { value: "supplies", label: "Supplies" },
        { value: "equipment", label: "Equipment" },
      ],
      clothing: [
        { value: "shirts", label: "Shirts" },
        { value: "pants", label: "Pants" },
        { value: "shoes", label: "Shoes" },
      ],
      home: [
        { value: "kitchen", label: "Kitchen" },
        { value: "bedroom", label: "Bedroom" },
        { value: "garden", label: "Garden" },
      ],
    };
    return subcategories[category] || [];
  };

  const handleInputChange = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Reset subcategory when category changes
    if (field === "category") {
      setFormData((prev) => ({ ...prev, subcategory: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 5 - formData.images.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, event.target!.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    // Adjust main image index if necessary
    if (index === mainImageIndex && formData.images.length > 1) {
      setMainImageIndex(0);
    } else if (index < mainImageIndex) {
      setMainImageIndex((prev) => prev - 1);
    }
  };

  const handleSetMainImage = (index: number) => {
    setMainImageIndex(index);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (
      isNaN(parseFloat(formData.price)) ||
      parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "Please enter a valid price";
    }

    if (formData.stock < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const productData: Partial<Product> = {
      name: formData.name.trim(),
      sku: formData.sku.trim(),
      category: formData.category,
      subcategory: formData.subcategory,
      brand: formData.brand,
      price: parseFloat(formData.price),
      stock: formData.stock,
      status: formData.status as "active" | "inactive" | "discontinued",
      description: formData.description.trim(),
      images: formData.images,
    };

    onSave(productData);
  };

  const handleDelete = () => {
    if (product && onDelete) {
      if (
        window.confirm(
          "Are you sure you want to delete this product? This action cannot be undone."
        )
      ) {
        onDelete(product.id);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3>
            {mode === "add"
              ? "Add New Product"
              : mode === "edit"
              ? "Edit Product"
              : "Product Details"}
          </h3>
          <button className="modal__close" onClick={onClose}>
            <FaTimes size={16} />
          </button>
        </div>

        <div className="modal__content">
          <div className="modal__form">
            <div className="form__section">
              <div className="form__image-section">
                <div className="form__main-image-container">
                  {formData.images.length > 0 ? (
                    <img
                      src={formData.images[mainImageIndex]}
                      alt="Main product"
                      className="form__main-image"
                    />
                  ) : (
                    <div className="form__image-placeholder">
                      <FaImage size={40} />
                      <span>No Images</span>
                    </div>
                  )}
                </div>

                {formData.images.length > 0 && (
                  <div className="form__image-thumbnails">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className={`form__thumbnail ${
                          index === mainImageIndex ? "active" : ""
                        }`}
                        onClick={() => handleSetMainImage(index)}
                      >
                        <img src={image} alt={`Product ${index + 1}`} />
                        {mode !== "view" && (
                          <button
                            className="form__remove-image"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(index);
                            }}
                          >
                            <FaTimes size={10} />
                          </button>
                        )}
                        {index === mainImageIndex && (
                          <div className="form__main-indicator">Main</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {mode !== "view" && formData.images.length < 5 && (
                  <label className="form__image-upload-btn">
                    <FaPlus size={14} />
                    <span>Add Images ({formData.images.length}/5)</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                )}
              </div>

              <div className="form__fields">
                <div className="form__row">
                  <div className="form__field">
                    <label>Product Name *</label>
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
                          placeholder="Enter product name"
                        />
                        {errors.name && (
                          <span className="form__error">{errors.name}</span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="form__field">
                    <label>SKU *</label>
                    {mode === "view" ? (
                      <span className="form__value">{formData.sku}</span>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={formData.sku}
                          onChange={(e) =>
                            handleInputChange("sku", e.target.value)
                          }
                          placeholder="Enter SKU"
                        />
                        {errors.sku && (
                          <span className="form__error">{errors.sku}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="form__row">
                  <div className="form__field">
                    <label>Category *</label>
                    {mode === "view" ? (
                      <span className="form__value">{formData.category}</span>
                    ) : (
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                      >
                        <option value="electronics">Electronics</option>
                        <option value="accessories">Accessories</option>
                        <option value="office">Office</option>
                        <option value="clothing">Clothing</option>
                        <option value="home">Home & Garden</option>
                      </select>
                    )}
                  </div>
                  <div className="form__field">
                    <label>Subcategory</label>
                    {mode === "view" ? (
                      <span className="form__value">
                        {formData.subcategory}
                      </span>
                    ) : (
                      <select
                        value={formData.subcategory}
                        onChange={(e) =>
                          handleInputChange("subcategory", e.target.value)
                        }
                      >
                        <option value="">Select subcategory</option>
                        {getSubcategories(formData.category).map((sub) => (
                          <option key={sub.value} value={sub.value}>
                            {sub.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <div className="form__row">
                  <div className="form__field">
                    <label>Brand</label>
                    {mode === "view" ? (
                      <span className="form__value">{formData.brand}</span>
                    ) : (
                      <select
                        value={formData.brand}
                        onChange={(e) =>
                          handleInputChange("brand", e.target.value)
                        }
                      >
                        <option value="">Select brand</option>
                        <option value="apple">Apple</option>
                        <option value="samsung">Samsung</option>
                        <option value="sony">Sony</option>
                        <option value="nike">Nike</option>
                        <option value="adidas">Adidas</option>
                        <option value="generic">Generic</option>
                      </select>
                    )}
                  </div>
                  <div className="form__field">
                    <label>Price *</label>
                    {mode === "view" ? (
                      <span className="form__value">${formData.price}</span>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) =>
                            handleInputChange("price", e.target.value)
                          }
                          placeholder="99.99"
                        />
                        {errors.price && (
                          <span className="form__error">{errors.price}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="form__row">
                  <div className="form__field">
                    <label>Stock Quantity *</label>
                    {mode === "view" ? (
                      <span className="form__value">{formData.stock}</span>
                    ) : (
                      <>
                        <input
                          type="number"
                          value={formData.stock}
                          onChange={(e) =>
                            handleInputChange(
                              "stock",
                              parseInt(e.target.value) || 0
                            )
                          }
                          min="0"
                        />
                        {errors.stock && (
                          <span className="form__error">{errors.stock}</span>
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
                        <option value="discontinued">Discontinued</option>
                      </select>
                    )}
                  </div>
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
                        placeholder="Enter product description"
                        rows={4}
                      />
                      {errors.description && (
                        <span className="form__error">
                          {errors.description}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {mode === "view" && (
                  <div className="form__row">
                    <div className="form__field">
                      <label>Product ID</label>
                      <span className="form__value">{formData.id}</span>
                    </div>
                    <div className="form__field">
                      <label>Date Added</label>
                      <span className="form__value">{formData.dateAdded}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal__footer">
          {mode === "view" ? (
            <>
              {onDelete && (
                <button
                  className="modal__btn modal__btn--danger"
                  onClick={handleDelete}
                >
                  Delete Product
                </button>
              )}
              <button
                className="modal__btn modal__btn--secondary"
                onClick={onClose}
              >
                Close
              </button>
            </>
          ) : (
            <>
              <button
                className="modal__btn modal__btn--secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="modal__btn modal__btn--primary"
                onClick={handleSave}
              >
                <FaSave size={14} />
                <span>{mode === "add" ? "Add Product" : "Save Changes"}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
