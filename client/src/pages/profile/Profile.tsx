import React, { useState } from "react";
import "./ProfilePage.scss";

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
}

interface Address {
  id: number;
  type: "home" | "work" | "other";
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    gender: "male",
  });

  const [orders] = useState<Order[]>([
    {
      id: "ORD-2025-001",
      date: "2025-06-05",
      status: "delivered",
      total: 299.97,
      items: [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 99.99,
          quantity: 1,
          image: "/api/placeholder/80/80",
        },
        {
          id: 2,
          name: "Smart Watch",
          price: 199.99,
          quantity: 1,
          image: "/api/placeholder/80/80",
        },
      ],
    },
    {
      id: "ORD-2025-002",
      date: "2025-06-08",
      status: "shipped",
      total: 149.99,
      items: [
        {
          id: 3,
          name: "Laptop Backpack",
          price: 49.99,
          quantity: 1,
          image: "/api/placeholder/80/80",
        },
        {
          id: 4,
          name: "USB-C Hub",
          price: 39.99,
          quantity: 1,
          image: "/api/placeholder/80/80",
        },
        {
          id: 5,
          name: "Gaming Mouse",
          price: 59.99,
          quantity: 1,
          image: "/api/placeholder/80/80",
        },
      ],
    },
  ]);

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: "Bluetooth Speaker",
      price: 79.99,
      originalPrice: 99.99,
      image: "/api/placeholder/200/200",
      inStock: true,
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 129.99,
      image: "/api/placeholder/200/200",
      inStock: false,
    },
    {
      id: 3,
      name: "Wireless Mouse",
      price: 49.99,
      originalPrice: 69.99,
      image: "/api/placeholder/200/200",
      inStock: true,
    },
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Cotton T-Shirt",
      price: 24.99,
      quantity: 2,
      image: "/api/placeholder/80/80",
      size: "M",
      color: "Blue",
    },
    {
      id: 2,
      name: "Running Shoes",
      price: 89.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      size: "10",
      color: "Black",
    },
  ]);

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "home",
      name: "Home Address",
      street: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: 2,
      type: "work",
      name: "Office Address",
      street: "456 Business Ave, Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      isDefault: false,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#f39c12";
      case "processing":
        return "#3498db";
      case "shipped":
        return "#9b59b6";
      case "delivered":
        return "#27ae60";
      case "cancelled":
        return "#e74c3c";
      default:
        return "#7e7e7e";
    }
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToCart = (item: WishlistItem) => {
    if (item.inStock) {
      const cartItem: CartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
      };
      setCartItems((prev) => [...prev, cartItem]);
      removeFromWishlist(item.id);
    }
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic
    console.log("Profile updated:", userProfile);
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "orders", label: "My Orders", icon: "📦" },
    { id: "wishlist", label: "Wishlist", icon: "❤️" },
    { id: "cart", label: "Shopping Cart", icon: "🛒" },
    { id: "addresses", label: "Addresses", icon: "📍" },
    { id: "profile", label: "Profile Settings", icon: "👤" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  const renderDashboard = () => (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h2>Welcome back, {userProfile.firstName}!</h2>
        <p>Manage your account and track your orders from your dashboard.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">❤️</div>
          <div className="stat-info">
            <h3>{wishlistItems.length}</h3>
            <p>Wishlist Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>{cartItems.length}</h3>
            <p>Cart Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📍</div>
          <div className="stat-info">
            <h3>{addresses.length}</h3>
            <p>Saved Addresses</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Orders</h3>
        <div className="recent-orders">
          {orders.slice(0, 3).map((order) => (
            <div key={order.id} className="recent-order-item">
              <div className="order-info">
                <h4>Order #{order.id}</h4>
                <p>{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="order-status">
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="order-total">
                <strong>${order.total.toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="orders-content">
      <div className="section-header">
        <h2>My Orders</h2>
        <p>Track and manage your orders</p>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-details">
                <h3>Order #{order.id}</h3>
                <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="order-status">
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-image">
                    <div className="placeholder-image">
                      <span>Item</span>
                    </div>
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <strong>Total: ${order.total.toFixed(2)}</strong>
              </div>
              <div className="order-actions">
                <button className="btn-secondary">Track Order</button>
                {order.status === "delivered" && (
                  <button className="btn-primary">Reorder</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="wishlist-content">
      <div className="section-header">
        <h2>My Wishlist</h2>
        <p>Save items for later</p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <div className="item-image">
                <div className="placeholder-image">
                  <span>Product</span>
                </div>
                {!item.inStock && (
                  <div className="out-of-stock-overlay">
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="item-info">
                <h4>{item.name}</h4>
                <div className="item-price">
                  <span className="current-price">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.originalPrice && (
                    <span className="original-price">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="item-actions">
                  <button
                    className="btn-primary"
                    onClick={() => moveToCart(item)}
                    disabled={!item.inStock}
                  >
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button
                    className="btn-remove"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">❤️</div>
          <h3>Your wishlist is empty</h3>
          <p>Save items you love for later</p>
          <button className="btn-primary">Continue Shopping</button>
        </div>
      )}
    </div>
  );

  const renderCart = () => (
    <div className="cart-content">
      <div className="section-header">
        <h2>Shopping Cart</h2>
        <p>Review your items before checkout</p>
      </div>

      {cartItems.length > 0 ? (
        <div className="cart-layout">
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
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity - 1)
                    }
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity + 1)
                    }
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-line">
              <span>Tax:</span>
              <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
            </div>
            <button className="btn-checkout">Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some items to get started</p>
          <button className="btn-primary">Continue Shopping</button>
        </div>
      )}
    </div>
  );

  const renderAddresses = () => (
    <div className="addresses-content">
      <div className="section-header">
        <h2>My Addresses</h2>
        <p>Manage your shipping addresses</p>
        <button className="btn-primary">Add New Address</button>
      </div>

      <div className="addresses-grid">
        {addresses.map((address) => (
          <div key={address.id} className="address-card">
            {address.isDefault && <div className="default-badge">Default</div>}
            <div className="address-type">
              <span className="type-icon">
                {address.type === "home"
                  ? "🏠"
                  : address.type === "work"
                  ? "🏢"
                  : "📍"}
              </span>
              <span className="type-label">{address.name}</span>
            </div>
            <div className="address-details">
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zipCode}
              </p>
              <p>{address.country}</p>
            </div>
            <div className="address-actions">
              <button className="btn-secondary">Edit</button>
              <button className="btn-remove">Delete</button>
              {!address.isDefault && (
                <button className="btn-link">Set as Default</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-content">
      <div className="section-header">
        <h2>Profile Settings</h2>
        <p>Update your personal information</p>
      </div>

      <form onSubmit={handleProfileUpdate} className="profile-form">
        <div className="form-row">
          <div className="form-field">
            <label>First Name</label>
            <input
              type="text"
              value={userProfile.firstName}
              onChange={(e) =>
                setUserProfile((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-field">
            <label>Last Name</label>
            <input
              type="text"
              value={userProfile.lastName}
              onChange={(e) =>
                setUserProfile((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="form-field">
          <label>Email Address</label>
          <input
            type="email"
            value={userProfile.email}
            onChange={(e) =>
              setUserProfile((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>

        <div className="form-field">
          <label>Phone Number</label>
          <input
            type="tel"
            value={userProfile.phone}
            onChange={(e) =>
              setUserProfile((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Date of Birth</label>
            <input
              type="date"
              value={userProfile.dateOfBirth}
              onChange={(e) =>
                setUserProfile((prev) => ({
                  ...prev,
                  dateOfBirth: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-field">
            <label>Gender</label>
            <select
              value={userProfile.gender}
              onChange={(e) =>
                setUserProfile((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Update Profile
          </button>
          <button type="button" className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  const renderSecurity = () => (
    <div className="security-content">
      <div className="section-header">
        <h2>Security Settings</h2>
        <p>Manage your account security</p>
      </div>

      <div className="security-sections">
        <div className="security-section">
          <h3>Change Password</h3>
          <form className="password-form">
            <div className="form-field">
              <label>Current Password</label>
              <input type="password" placeholder="Enter current password" />
            </div>
            <div className="form-field">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" />
            </div>
            <div className="form-field">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" />
            </div>
            <button type="submit" className="btn-primary">
              Update Password
            </button>
          </form>
        </div>

        <div className="security-section">
          <h3>Two-Factor Authentication</h3>
          <div className="security-option">
            <div className="option-info">
              <h4>SMS Authentication</h4>
              <p>Receive verification codes via SMS</p>
            </div>
            <button className="btn-secondary">Enable</button>
          </div>
          <div className="security-option">
            <div className="option-info">
              <h4>Email Authentication</h4>
              <p>Receive verification codes via email</p>
            </div>
            <button className="btn-secondary">Enable</button>
          </div>
        </div>

        <div className="security-section">
          <h3>Login Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-info">
                <h4>Chrome on Windows</h4>
                <p>New York, NY • June 9, 2025 at 7:35 AM</p>
              </div>
              <span className="activity-status current">Current Session</span>
            </div>
            <div className="activity-item">
              <div className="activity-info">
                <h4>Safari on iPhone</h4>
                <p>New York, NY • June 8, 2025 at 3:22 PM</p>
              </div>
              <button className="btn-remove">Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "orders":
        return renderOrders();
      case "wishlist":
        return renderWishlist();
      case "cart":
        return renderCart();
      case "addresses":
        return renderAddresses();
      case "profile":
        return renderProfile();
      case "security":
        return renderSecurity();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-layout">
          {/* Sidebar */}
          <aside
            className={`profile-sidebar ${isMobileMenuOpen ? "open" : ""}`}
          >
            <div className="sidebar-header">
              <div className="user-avatar">
                <span>
                  {userProfile.firstName[0]}
                  {userProfile.lastName[0]}
                </span>
              </div>
              <div className="user-info">
                <h3>
                  {userProfile.firstName} {userProfile.lastName}
                </h3>
                <p>{userProfile.email}</p>
              </div>
            </div>

            <nav className="sidebar-nav">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${
                    activeTab === item.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="sidebar-footer">
              <button className="logout-btn">
                <span className="nav-icon">🚪</span>
                <span className="nav-label">Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="profile-main">
            <div className="mobile-header">
              <button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <h1>My Account</h1>
            </div>

            <div className="content-area">{renderContent()}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
