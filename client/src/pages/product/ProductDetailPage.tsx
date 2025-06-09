import React, { useState, useEffect } from "react";
import "./ProductDetailPage.scss";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  colors: string[];
  sizes: string[];
  category: string;
  inStock: boolean;
  stockCount: number;
  sku: string;
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const ProductDetailPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Sample product data
  const product: Product = {
    id: 1,
    name: "Premium Wireless Bluetooth Headphones",
    brand: "TechSound Pro",
    price: 99.99,
    originalPrice: 149.99,
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
    ],
    rating: 4.5,
    reviews: 128,
    description:
      "Experience premium audio quality with our latest wireless Bluetooth headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and crystal-clear sound reproduction. Perfect for music lovers, professionals, and travelers.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge: 15 min = 3 hours",
      "Premium leather ear cushions",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone",
      "Foldable design",
      "Touch controls",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohm",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
      "Bluetooth Version": "5.0",
      Range: "10 meters",
    },
    colors: ["Black", "White", "Silver", "Blue"],
    sizes: ["One Size"],
    category: "Electronics",
    inStock: true,
    stockCount: 15,
    sku: "TSP-WH-001",
  };

  // Sample reviews
  const reviews: Review[] = [
    {
      id: 1,
      userName: "John D.",
      rating: 5,
      date: "2025-06-01",
      comment:
        "Amazing sound quality and comfort. The noise cancellation works perfectly during flights.",
      verified: true,
    },
    {
      id: 2,
      userName: "Sarah M.",
      rating: 4,
      date: "2025-05-28",
      comment:
        "Great headphones overall. Battery life is impressive. Only minor issue is the touch controls can be sensitive.",
      verified: true,
    },
    {
      id: 3,
      userName: "Mike R.",
      rating: 5,
      date: "2025-05-25",
      comment: "Best headphones I've owned. Worth every penny!",
      verified: false,
    },
  ];

  // Related products
  const relatedProducts = [
    {
      id: 2,
      name: "Wireless Earbuds Pro",
      price: 79.99,
      image: "/api/placeholder/200/200",
      rating: 4.3,
    },
    {
      id: 3,
      name: "Gaming Headset",
      price: 129.99,
      image: "/api/placeholder/200/200",
      rating: 4.6,
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 59.99,
      image: "/api/placeholder/200/200",
      rating: 4.4,
    },
    {
      id: 5,
      name: "USB-C Adapter",
      price: 19.99,
      image: "/api/placeholder/200/200",
      rating: 4.2,
    },
  ];

  useEffect(() => {
    if (product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    if (product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`star ${i < Math.floor(rating) ? "filled" : ""}`}
      >
        ⭐
      </span>
    ));
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      product: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    // Add to cart logic here
  };

  const handleBuyNow = () => {
    console.log("Buy now:", {
      product: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    // Buy now logic here
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const getDiscountPercentage = () => {
    if (product.originalPrice) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }
    return 0;
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/products">Products</a>
          <span>/</span>
          <a href={`/categories/${product.category.toLowerCase()}`}>
            {product.category}
          </a>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-layout">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <div
                className="image-container"
                onClick={() => setShowImageModal(true)}
              >
                <div className="placeholder-image">
                  <span>Product Image {selectedImage + 1}</span>
                </div>
                {product.originalPrice && (
                  <div className="discount-badge">
                    -{getDiscountPercentage()}%
                  </div>
                )}
              </div>
            </div>

            <div className="image-thumbnails">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="placeholder-image">
                    <span>{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="brand">{product.brand}</div>
              <h1 className="product-title">{product.name}</h1>

              <div className="product-rating">
                <div className="stars">{renderStars(product.rating)}</div>
                <span className="rating-text">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="product-pricing">
                <span className="current-price">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="original-price">
                      ${product.originalPrice}
                    </span>
                    <span className="discount">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <div className="stock-info">
                {product.inStock ? (
                  <span className="in-stock">
                    ✓ In Stock ({product.stockCount} available)
                  </span>
                ) : (
                  <span className="out-of-stock">✗ Out of Stock</span>
                )}
              </div>
            </div>

            {/* Product Options */}
            <div className="product-options">
              {/* Color Selection */}
              {product.colors.length > 1 && (
                <div className="option-group">
                  <label>
                    Color: <strong>{selectedColor}</strong>
                  </label>
                  <div className="color-options">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`color-option ${
                          selectedColor === color ? "selected" : ""
                        }`}
                        onClick={() => setSelectedColor(color)}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      >
                        <span className="color-name">{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes.length > 1 && (
                <div className="option-group">
                  <label>
                    Size: <strong>{selectedSize}</strong>
                  </label>
                  <div className="size-options">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-option ${
                          selectedSize === size ? "selected" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="option-group">
                <label>Quantity:</label>
                <div className="quantity-selector">
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      setQuantity(Math.min(product.stockCount, quantity + 1))
                    }
                    disabled={quantity >= product.stockCount}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button
                className="btn-primary add-to-cart"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                🛒 Add to Cart
              </button>
              <button
                className="btn-secondary buy-now"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                ⚡ Buy Now
              </button>
              <button
                className={`btn-wishlist ${isWishlisted ? "wishlisted" : ""}`}
                onClick={toggleWishlist}
              >
                {isWishlisted ? "❤️" : "🤍"}
              </button>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.features.slice(0, 4).map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>

            {/* Additional Info */}
            <div className="additional-info">
              <div className="info-item">
                <span className="icon">🚚</span>
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over $99</p>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">🔄</span>
                <div>
                  <strong>30-Day Returns</strong>
                  <p>Easy return policy</p>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">🛡️</span>
                <div>
                  <strong>2-Year Warranty</strong>
                  <p>Manufacturer warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button
              className={`tab-header ${
                activeTab === "description" ? "active" : ""
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`tab-header ${
                activeTab === "specifications" ? "active" : ""
              }`}
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </button>
            <button
              className={`tab-header ${
                activeTab === "reviews" ? "active" : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews ({product.reviews})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && (
              <div className="description-content">
                <p>{product.description}</p>
                <h4>Features:</h4>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="specifications-content">
                <div className="spec-grid">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="spec-item">
                        <span className="spec-label">{key}:</span>
                        <span className="spec-value">{value}</span>
                      </div>
                    )
                  )}
                </div>
                <div className="additional-specs">
                  <p>
                    <strong>SKU:</strong> {product.sku}
                  </p>
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews-content">
                <div className="reviews-summary">
                  <div className="rating-overview">
                    <div className="average-rating">
                      <span className="rating-number">{product.rating}</span>
                      <div className="rating-stars">
                        {renderStars(product.rating)}
                      </div>
                      <span className="total-reviews">
                        Based on {product.reviews} reviews
                      </span>
                    </div>
                  </div>
                </div>

                <div className="reviews-list">
                  {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <span className="reviewer-name">
                            {review.userName}
                          </span>
                          {review.verified && (
                            <span className="verified-badge">
                              ✓ Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="review-date">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                      <div className="review-comment">{review.comment}</div>
                    </div>
                  ))}
                </div>

                <button className="btn-secondary load-more-reviews">
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2>Related Products</h2>
          <div className="products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="related-product-card">
                <div className="product-image">
                  <div className="placeholder-image">
                    <span>Product</span>
                  </div>
                </div>
                <div className="product-info">
                  <h4>{relatedProduct.name}</h4>
                  <div className="rating">
                    {renderStars(relatedProduct.rating)}
                  </div>
                  <div className="price">${relatedProduct.price}</div>
                  <button className="btn-primary">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="image-modal" onClick={() => setShowImageModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setShowImageModal(false)}
            >
              ×
            </button>
            <div className="modal-image">
              <div className="placeholder-image">
                <span>Large Product Image {selectedImage + 1}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
