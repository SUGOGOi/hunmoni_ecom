import React, { useState, useEffect } from "react";
import { FaTimes, FaSave, FaImage, FaPlus } from "react-icons/fa";
import "./ProductModal.scss";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  images: string[];
  description: string;
  sku: string;
  dateAdded: string;
}

interface ProductModalProps {
  isOpen: boolean;
  mode: "view" | "edit" | "add";
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  mode,
  product,
  onClose,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    category: "Electronics",
    price: "",
    stock: 0,
    status: "active",
    images: [],
    description: "",
    sku: "",
    dateAdded: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      if (mode === "add") {
        setFormData({
          id: `PRD-${Date.now().toString().slice(-3)}`,
          name: "",
          category: "Electronics",
          price: "",
          stock: 0,
          status: "active",
          images: [],
          description: "",
          sku: "",
          dateAdded: new Date().toISOString().split("T")[0],
        });
        setMainImageIndex(0);
      } else if (product) {
        setFormData(product);
        setMainImageIndex(0);
      }
      setErrors({});
    }
  }, [isOpen, mode, product]);

  const handleInputChange = (
    field: keyof Product,
    value: string | number | string[]
  ) => {
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

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative";

    const priceRegex = /^\$?\d+(\.\d{2})?$/;
    if (formData.price && !priceRegex.test(formData.price)) {
      newErrors.price = "Invalid price format (e.g., $99.99 or 99.99)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const processedData = {
        ...formData,
        price: formData.price.startsWith("$")
          ? formData.price
          : `$${formData.price}`,
      };
      onSave(processedData);
      onClose();
    }
  };

  const handleDelete = () => {
    if (onDelete && product) {
      if (window.confirm("Are you sure you want to delete this product?")) {
        onDelete(product.id);
        onClose();
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const remainingSlots = 5 - formData.images.length;
      const filesToProcess = fileArray.slice(0, remainingSlots);

      if (fileArray.length > remainingSlots) {
        alert(
          `You can only add ${remainingSlots} more image(s). Maximum 5 images allowed.`
        );
      }

      const newImages: string[] = [];
      let processedCount = 0;

      filesToProcess.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            processedCount++;

            if (processedCount === filesToProcess.length) {
              setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...newImages],
              }));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }

    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));

    if (index === mainImageIndex) {
      setMainImageIndex(0);
    } else if (index < mainImageIndex) {
      setMainImageIndex((prev) => prev - 1);
    }
  };

  const handleSetMainImage = (index: number) => {
    setMainImageIndex(index);
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
                    <label>Category</label>
                    {mode === "view" ? (
                      <span className="form__value">{formData.category}</span>
                    ) : (
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                      >
                        <option value="Electronics">Electronics</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Office">Office</option>
                        <option value="Home">Home</option>
                        <option value="Sports">Sports</option>
                      </select>
                    )}
                  </div>
                  <div className="form__field">
                    <label>Price *</label>
                    {mode === "view" ? (
                      <span className="form__value">{formData.price}</span>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) =>
                            handleInputChange("price", e.target.value)
                          }
                          placeholder="$99.99"
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
                    <label>Stock Quantity</label>
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
