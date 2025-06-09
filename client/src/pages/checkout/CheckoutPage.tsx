import React, { useState } from "react";
import "./CheckoutPage.scss";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  type: "card" | "paypal" | "apple" | "google";
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}

interface Coupon {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minOrder?: number;
}

const CheckoutPage: React.FC = () => {
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      color: "Black",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      size: "42mm",
    },
    {
      id: 3,
      name: "Cotton T-Shirt",
      price: 24.99,
      quantity: 2,
      image: "/api/placeholder/80/80",
      size: "M",
      color: "Blue",
    },
  ]);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  // Sample coupons
  const availableCoupons: Coupon[] = [
    { code: "SAVE10", discount: 10, type: "percentage", minOrder: 50 },
    { code: "WELCOME20", discount: 20, type: "fixed", minOrder: 100 },
    { code: "FREESHIP", discount: 100, type: "percentage", minOrder: 0 },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;

  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? subtotal * (appliedCoupon.discount / 100)
      : appliedCoupon.discount
    : 0;

  const total = subtotal + shippingCost + tax - couponDiscount;

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePaymentChange = (field: keyof PaymentMethod, value: string) => {
    setPaymentMethod((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const applyCoupon = () => {
    setCouponError("");

    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    const coupon = availableCoupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (!coupon) {
      setCouponError("Invalid coupon code");
      return;
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
      setCouponError(
        `Minimum order of $${coupon.minOrder} required for this coupon`
      );
      return;
    }

    setAppliedCoupon(coupon);
    setCouponCode("");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Shipping validation
    if (!shippingAddress.firstName)
      newErrors.firstName = "First name is required";
    if (!shippingAddress.lastName) newErrors.lastName = "Last name is required";
    if (!shippingAddress.email) newErrors.email = "Email is required";
    if (!shippingAddress.phone) newErrors.phone = "Phone is required";
    if (!shippingAddress.address) newErrors.address = "Address is required";
    if (!shippingAddress.city) newErrors.city = "City is required";
    if (!shippingAddress.state) newErrors.state = "State is required";
    if (!shippingAddress.zipCode) newErrors.zipCode = "ZIP code is required";

    // Payment validation
    if (paymentMethod.type === "card") {
      if (!paymentMethod.cardNumber)
        newErrors.cardNumber = "Card number is required";
      if (!paymentMethod.expiryDate)
        newErrors.expiryDate = "Expiry date is required";
      if (!paymentMethod.cvv) newErrors.cvv = "CVV is required";
      if (!paymentMethod.cardholderName)
        newErrors.cardholderName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Order placed:", {
        shippingAddress,
        paymentMethod,
        cartItems,
        total,
      });
      // Redirect to success page
      window.location.href = "/order-success";
    } catch (error) {
      setErrors({ general: "Failed to place order. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Progress Steps */}
        <div className="checkout-progress">
          <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
            <span className="step-number">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
            <span className="step-number">3</span>
            <span className="step-label">Review</span>
          </div>
        </div>

        <div className="checkout-layout">
          {/* Main Content */}
          <div className="checkout-main">
            {/* Shipping Information */}
            <div className="checkout-section">
              <h2>Shipping Information</h2>
              <div className="form-grid">
                <div className="form-row">
                  <div className="form-field">
                    <label>First Name *</label>
                    <input
                      type="text"
                      value={shippingAddress.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={errors.firstName ? "error" : ""}
                    />
                    {errors.firstName && (
                      <span className="field-error">{errors.firstName}</span>
                    )}
                  </div>
                  <div className="form-field">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      value={shippingAddress.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={errors.lastName ? "error" : ""}
                    />
                    {errors.lastName && (
                      <span className="field-error">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={shippingAddress.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                      <span className="field-error">{errors.email}</span>
                    )}
                  </div>
                  <div className="form-field">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && (
                      <span className="field-error">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="form-field">
                  <label>Address *</label>
                  <input
                    type="text"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className={errors.address ? "error" : ""}
                  />
                  {errors.address && (
                    <span className="field-error">{errors.address}</span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>City *</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className={errors.city ? "error" : ""}
                    />
                    {errors.city && (
                      <span className="field-error">{errors.city}</span>
                    )}
                  </div>
                  <div className="form-field">
                    <label>State *</label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className={errors.state ? "error" : ""}
                    />
                    {errors.state && (
                      <span className="field-error">{errors.state}</span>
                    )}
                  </div>
                  <div className="form-field">
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                      className={errors.zipCode ? "error" : ""}
                    />
                    {errors.zipCode && (
                      <span className="field-error">{errors.zipCode}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="checkout-section">
              <h2>Payment Method</h2>

              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentType"
                    value="card"
                    checked={paymentMethod.type === "card"}
                    onChange={(e) =>
                      handlePaymentChange("type", e.target.value)
                    }
                  />
                  <span className="payment-icon">💳</span>
                  <span>Credit/Debit Card</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentType"
                    value="paypal"
                    checked={paymentMethod.type === "paypal"}
                    onChange={(e) =>
                      handlePaymentChange("type", e.target.value)
                    }
                  />
                  <span className="payment-icon">🅿️</span>
                  <span>PayPal</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentType"
                    value="apple"
                    checked={paymentMethod.type === "apple"}
                    onChange={(e) =>
                      handlePaymentChange("type", e.target.value)
                    }
                  />
                  <span className="payment-icon">🍎</span>
                  <span>Apple Pay</span>
                </label>
              </div>

              {paymentMethod.type === "card" && (
                <div className="card-details">
                  <div className="form-field">
                    <label>Cardholder Name *</label>
                    <input
                      type="text"
                      value={paymentMethod.cardholderName}
                      onChange={(e) =>
                        handlePaymentChange("cardholderName", e.target.value)
                      }
                      className={errors.cardholderName ? "error" : ""}
                    />
                    {errors.cardholderName && (
                      <span className="field-error">
                        {errors.cardholderName}
                      </span>
                    )}
                  </div>

                  <div className="form-field">
                    <label>Card Number *</label>
                    <input
                      type="text"
                      value={paymentMethod.cardNumber}
                      onChange={(e) =>
                        handlePaymentChange(
                          "cardNumber",
                          formatCardNumber(e.target.value)
                        )
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={errors.cardNumber ? "error" : ""}
                    />
                    {errors.cardNumber && (
                      <span className="field-error">{errors.cardNumber}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Expiry Date *</label>
                      <input
                        type="text"
                        value={paymentMethod.expiryDate}
                        onChange={(e) =>
                          handlePaymentChange("expiryDate", e.target.value)
                        }
                        placeholder="MM/YY"
                        maxLength={5}
                        className={errors.expiryDate ? "error" : ""}
                      />
                      {errors.expiryDate && (
                        <span className="field-error">{errors.expiryDate}</span>
                      )}
                    </div>
                    <div className="form-field">
                      <label>CVV *</label>
                      <input
                        type="text"
                        value={paymentMethod.cvv}
                        onChange={(e) =>
                          handlePaymentChange("cvv", e.target.value)
                        }
                        placeholder="123"
                        maxLength={4}
                        className={errors.cvv ? "error" : ""}
                      />
                      {errors.cvv && (
                        <span className="field-error">{errors.cvv}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-sidebar">
            <div className="order-summary">
              <h3>Order Summary</h3>

              {/* Cart Items */}
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <div className="placeholder-image">
                        <span>Item</span>
                      </div>
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      {item.size && <p>Size: {item.size}</p>}
                      {item.color && <p>Color: {item.color}</p>}
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="coupon-section">
                <h4>Coupon Code</h4>
                {appliedCoupon ? (
                  <div className="applied-coupon">
                    <span className="coupon-code">{appliedCoupon.code}</span>
                    <span className="coupon-discount">
                      -
                      {appliedCoupon.type === "percentage"
                        ? `${appliedCoupon.discount}%`
                        : `$${appliedCoupon.discount}`}
                    </span>
                    <button onClick={removeCoupon} className="remove-coupon">
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="coupon-input">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                    />
                    <button onClick={applyCoupon}>Apply</button>
                  </div>
                )}
                {couponError && (
                  <span className="coupon-error">{couponError}</span>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="price-breakdown">
                <div className="price-line">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="price-line">
                  <span>Shipping:</span>
                  <span>
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="price-line">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="price-line discount">
                    <span>Discount ({appliedCoupon.code}):</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="price-line total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                className={`place-order-btn ${isLoading ? "loading" : ""}`}
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing..."
                  : `Place Order - $${total.toFixed(2)}`}
              </button>

              {/* Security Info */}
              <div className="security-info">
                <p>🔒 Your payment information is secure and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
