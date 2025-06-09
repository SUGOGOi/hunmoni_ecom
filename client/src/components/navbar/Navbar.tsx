import React, { useState, useRef, useEffect } from "react";
import "./Navbar.scss";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [isLogin, setIsLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSignInDropdown, setShowSignInDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Categories data
  const categories = [
    { id: 1, name: "Electronics", icon: "🔌", link: "/categories/electronics" },
    { id: 2, name: "Fashion", icon: "👕", link: "/categories/fashion" },
    {
      id: 3,
      name: "Home & Garden",
      icon: "🏠",
      link: "/categories/home-garden",
    },
    { id: 4, name: "Sports", icon: "⚽", link: "/categories/sports" },
    { id: 5, name: "Books", icon: "📚", link: "/categories/books" },
    { id: 6, name: "Beauty", icon: "💄", link: "/categories/beauty" },
    { id: 7, name: "Toys", icon: "🧸", link: "/categories/toys" },
    { id: 8, name: "Automotive", icon: "🚗", link: "/categories/automotive" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
      if (
        signInRef.current &&
        !signInRef.current.contains(event.target as Node)
      ) {
        setShowSignInDropdown(false);
      }
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setShowCategoriesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Handle search logic here
  };

  const handleLogout = () => {
    setIsLogin(false);
    setShowProfileDropdown(false);
    console.log("User logged out");
    // Handle logout logic here
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          <a href="/">
            <span>E</span>-Shop
          </a>
        </div>

        {/* Search Bar */}
        <div className="navbar__search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar__nav">
          <a href="/" className="nav-link active">
            Home
          </a>
          {/* <a href="/search-product" className="nav-link">
            Products
          </a> */}
          {/* Categories with Dropdown */}

          <div
            className="nav-dropdown-container"
            ref={categoriesRef}
            onMouseEnter={() => setShowCategoriesDropdown(true)}
            onMouseLeave={() => setShowCategoriesDropdown(false)}
          >
            <a href="/search-product" className="nav-link">
              Categories
              {/* <span className="dropdown-arrow">▼</span> */}
            </a>
            <div
              className={`categories-dropdown ${
                showCategoriesDropdown ? "show" : ""
              }`}
            >
              <div className="categories-grid">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={category.link}
                    className="category-item"
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </a>
                ))}
              </div>
              <div className="dropdown-footer">
                <a href="/search-product" className="view-all-btn">
                  View All Categories →
                </a>
              </div>
            </div>
          </div>
          <a href="/about-us" className="nav-link">
            About
          </a>
          <a href="/contact-us" className="nav-link">
            Contact
          </a>
        </div>

        {/* User Actions */}
        <div className="navbar__actions">
          <button className="action-btn">
            <span className="icon">❤️</span>
            <span className="badge">2</span>
          </button>
          <button className="action-btn cart-btn">
            <span className="icon">🛒</span>
            <span className="badge">{cartCount}</span>
          </button>

          {/* Profile/Sign In with Dropdown */}
          <div className="profile-dropdown-container" ref={profileRef}>
            {isLogin ? (
              // Profile Dropdown for logged-in users
              <>
                <button
                  className="action-btn profile-btn"
                  onClick={handleProfileClick}
                >
                  <img
                    src="https://avatars.githubusercontent.com/u/104547345?v=4"
                    alt="profile photo"
                  />
                  {/* <span className="dropdown-arrow">▼</span> */}
                </button>
                {showProfileDropdown && (
                  <div className="profile-dropdown">
                    <div className="profile-header">
                      <img
                        src="https://avatars.githubusercontent.com/u/104547345?v=4"
                        alt="profile photo"
                        className="profile-avatar"
                      />
                      <div className="profile-info">
                        <h4>John Doe</h4>
                        <p>john.doe@example.com</p>
                      </div>
                    </div>
                    <div className="profile-menu">
                      <a href="/profile" className="profile-menu-item">
                        <span className="menu-icon">👤</span>
                        My Profile
                      </a>
                      <a href="/orders" className="profile-menu-item">
                        <span className="menu-icon">📦</span>
                        My Orders
                      </a>
                      <a href="/wishlist" className="profile-menu-item">
                        <span className="menu-icon">❤️</span>
                        Wishlist
                      </a>
                      <a href="/settings" className="profile-menu-item">
                        <span className="menu-icon">⚙️</span>
                        Settings
                      </a>
                      <hr className="menu-divider" />
                      <button
                        className="profile-menu-item logout-btn"
                        onClick={handleLogout}
                      >
                        <span className="menu-icon">🚪</span>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Sign In Dropdown for non-logged-in users
              <div
                className="signin-dropdown-container"
                ref={signInRef}
                onMouseEnter={() => setShowSignInDropdown(true)}
                onMouseLeave={() => setShowSignInDropdown(false)}
              >
                <button className="action-btn profile-btn">
                  <span className="text">Sign in</span>
                  {/* <span className="dropdown-arrow">▼</span> */}
                </button>
                {showSignInDropdown && (
                  <div className="signin-dropdown">
                    <div className="signin-header">
                      <h4>Welcome!</h4>
                      <p>Sign in to access your account</p>
                    </div>
                    <div className="signin-actions">
                      <a href="/login" className="signin-btn primary">
                        Sign In
                      </a>
                      <div className="signin-divider">
                        <span>New user?</span>
                      </div>
                      <a href="/signup" className="signin-btn secondary">
                        Create Account
                      </a>
                    </div>
                    <div className="signin-footer">
                      <a href="/forgot-password" className="forgot-link">
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="navbar__toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav">
          <a href="/" className="mobile-nav-link">
            Home
          </a>
          <a href="/products" className="mobile-nav-link">
            Products
          </a>
          <a href="/categories" className="mobile-nav-link">
            Categories
          </a>
          <a href="/about" className="mobile-nav-link">
            About
          </a>
          <a href="/contact" className="mobile-nav-link">
            Contact
          </a>
        </div>
        <div className="mobile-actions">
          <button className="mobile-action-btn">
            <span className="icon">👤</span>
            <span>My Account</span>
          </button>
          <button className="mobile-action-btn">
            <span className="icon">❤️</span>
            <span>Wishlist (2)</span>
          </button>
          <button className="mobile-action-btn">
            <span className="icon">🛒</span>
            <span>Cart ({cartCount})</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
