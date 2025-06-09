import React, { useState, useEffect } from "react";
import "./HomePage.scss";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  productCount: number;
}

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");

  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      title: "Summer Collection 2025",
      subtitle: "Discover the latest trends",
      description: "Up to 50% off on selected items",
      image: "/api/placeholder/800/400",
      buttonText: "Shop Now",
      buttonLink: "/products",
    },
    {
      id: 2,
      title: "Electronics Sale",
      subtitle: "Tech deals you can't miss",
      description: "Free shipping on orders over $99",
      image: "/api/placeholder/800/400",
      buttonText: "Explore Deals",
      buttonLink: "/electronics",
    },
    {
      id: 3,
      title: "New Arrivals",
      subtitle: "Fresh styles just landed",
      description: "Be the first to get them",
      image: "/api/placeholder/800/400",
      buttonText: "View Collection",
      buttonLink: "/new-arrivals",
    },
  ];

  // Featured products
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      originalPrice: 149.99,
      image: "/api/placeholder/300/300",
      rating: 4.5,
      reviews: 128,
      badge: "Sale",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      image: "/api/placeholder/300/300",
      rating: 4.8,
      reviews: 89,
      badge: "New",
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: 49.99,
      originalPrice: 79.99,
      image: "/api/placeholder/300/300",
      rating: 4.3,
      reviews: 156,
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 79.99,
      image: "/api/placeholder/300/300",
      rating: 4.6,
      reviews: 203,
      badge: "Popular",
    },
    {
      id: 5,
      name: "Gaming Mouse",
      price: 59.99,
      originalPrice: 89.99,
      image: "/api/placeholder/300/300",
      rating: 4.7,
      reviews: 94,
      badge: "Sale",
    },
    {
      id: 6,
      name: "USB-C Hub",
      price: 39.99,
      image: "/api/placeholder/300/300",
      rating: 4.4,
      reviews: 67,
    },
  ];

  // Categories
  const categories: Category[] = [
    { id: 1, name: "Electronics", icon: "🔌", productCount: 1250 },
    { id: 2, name: "Fashion", icon: "👕", productCount: 890 },
    { id: 3, name: "Home & Garden", icon: "🏠", productCount: 567 },
    { id: 4, name: "Sports", icon: "⚽", productCount: 423 },
    { id: 5, name: "Books", icon: "📚", productCount: 789 },
    { id: 6, name: "Beauty", icon: "💄", productCount: 345 },
    { id: 7, name: "Toys", icon: "🧸", productCount: 234 },
    { id: 8, name: "Automotive", icon: "🚗", productCount: 156 },
  ];

  // Auto-slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Handle search logic here
  };

  return (
    <div className="home-page">
      {/* Navbar */}
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
            <a href="/products" className="nav-link">
              Products
            </a>
            <a href="/categories" className="nav-link">
              Categories
            </a>
            <a href="/about" className="nav-link">
              About
            </a>
            <a href="/contact" className="nav-link">
              Contact
            </a>
          </div>

          {/* User Actions */}
          <div className="navbar__actions">
            <button className="action-btn">
              <span className="icon">👤</span>
              <span className="text">Account</span>
            </button>
            <button className="action-btn">
              <span className="icon">❤️</span>
              <span className="text">Wishlist</span>
              <span className="badge">2</span>
            </button>
            <button className="action-btn cart-btn">
              <span className="icon">🛒</span>
              <span className="text">Cart</span>
              <span className="badge">{cartCount}</span>
            </button>
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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            >
              <div className="hero-content">
                <div className="hero-text">
                  <h1>{slide.title}</h1>
                  <h2>{slide.subtitle}</h2>
                  <p>{slide.description}</p>
                  <button className="hero-btn">{slide.buttonText}</button>
                </div>
                <div className="hero-image">
                  <div className="placeholder-image">
                    <span>Hero Image {index + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button className="hero-nav prev" onClick={prevSlide}>
            ‹
          </button>
          <button className="hero-nav next" onClick={nextSlide}>
            ›
          </button>

          <div className="hero-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>On orders over $99</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure checkout</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.productCount} products</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="flash-sale-section">
        <div className="container">
          <div className="flash-sale-header">
            <h2>⚡ Flash Sale</h2>
            <div className="countdown">
              <div className="countdown-item">
                <span className="number">{timeLeft.days}</span>
                <span className="label">Days</span>
              </div>
              <div className="countdown-item">
                <span className="number">{timeLeft.hours}</span>
                <span className="label">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="number">{timeLeft.minutes}</span>
                <span className="label">Min</span>
              </div>
              <div className="countdown-item">
                <span className="number">{timeLeft.seconds}</span>
                <span className="label">Sec</span>
              </div>
            </div>
          </div>

          <div className="flash-sale-products">
            {featuredProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="flash-product-card">
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}
                <div className="product-image">
                  <div className="placeholder-image">
                    <span>Product Image</span>
                  </div>
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <div className="product-rating">
                    {renderStars(product.rating)}
                    <span>({product.reviews})</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}
                <div className="product-image">
                  <div className="placeholder-image">
                    <span>Product Image</span>
                  </div>
                  <div className="product-overlay">
                    <button className="quick-view-btn">Quick View</button>
                  </div>
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <div className="product-rating">
                    {renderStars(product.rating)}
                    <span>({product.reviews})</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter and get 10% off your first order</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">{renderStars(5)}</div>
              <p>
                "Amazing products and fast delivery! I'm very satisfied with my
                purchase."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <h4>John Doe</h4>
                  <span>Verified Customer</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">{renderStars(5)}</div>
              <p>
                "Great customer service and quality products. Highly
                recommended!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">SM</div>
                <div className="author-info">
                  <h4>Sarah Miller</h4>
                  <span>Verified Customer</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">{renderStars(4)}</div>
              <p>
                "Easy shopping experience and competitive prices. Will shop
                again!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">MB</div>
                <div className="author-info">
                  <h4>Mike Brown</h4>
                  <span>Verified Customer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Products</p>
            </div>
            <div className="stat-item">
              <h3>99%</h3>
              <p>Satisfaction Rate</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          {/* Footer Top */}
          <div className="footer__top">
            <div className="footer__section">
              <div className="footer__logo">
                <h3>
                  Store<span>Hub</span>
                </h3>
                <p>
                  Your trusted online shopping destination for quality products
                  at great prices.
                </p>
                <div className="footer__social">
                  <a href="#" className="social-link">
                    📘
                  </a>
                  <a href="#" className="social-link">
                    🐦
                  </a>
                  <a href="#" className="social-link">
                    📷
                  </a>
                  <a href="#" className="social-link">
                    💼
                  </a>
                </div>
              </div>
            </div>

            <div className="footer__section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/products">Products</a>
                </li>
                <li>
                  <a href="/categories">Categories</a>
                </li>
                <li>
                  <a href="/deals">Special Deals</a>
                </li>
                <li>
                  <a href="/new-arrivals">New Arrivals</a>
                </li>
              </ul>
            </div>

            <div className="footer__section">
              <h4>Customer Service</h4>
              <ul>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/shipping">Shipping Info</a>
                </li>
                <li>
                  <a href="/returns">Returns & Exchanges</a>
                </li>
                <li>
                  <a href="/size-guide">Size Guide</a>
                </li>
              </ul>
            </div>

            <div className="footer__section">
              <h4>My Account</h4>
              <ul>
                <li>
                  <a href="/login">Sign In</a>
                </li>
                <li>
                  <a href="/register">Create Account</a>
                </li>
                <li>
                  <a href="/account">My Account</a>
                </li>
                <li>
                  <a href="/orders">Order History</a>
                </li>
                <li>
                  <a href="/wishlist">Wishlist</a>
                </li>
              </ul>
            </div>

            <div className="footer__section">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/careers">Careers</a>
                </li>
                <li>
                  <a href="/press">Press</a>
                </li>
                <li>
                  <a href="/investors">Investors</a>
                </li>
                <li>
                  <a href="/sustainability">Sustainability</a>
                </li>
              </ul>
            </div>

            <div className="footer__section">
              <h4>Contact Info</h4>
              <div className="footer__contact">
                <div className="contact-item">
                  <span className="icon">📍</span>
                  <p>
                    123 Business St, Suite 100
                    <br />
                    City, State 12345
                  </p>
                </div>
                <div className="contact-item">
                  <span className="icon">📞</span>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="contact-item">
                  <span className="icon">✉️</span>
                  <p>support@storehub.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Middle */}
          <div className="footer__middle">
            <div className="footer__newsletter">
              <h4>Stay Connected</h4>
              <p>
                Subscribe to get special offers, free giveaways, and updates.
              </p>
              <div className="newsletter-signup">
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </div>
            </div>

            <div className="footer__payment">
              <h4>We Accept</h4>
              <div className="payment-methods">
                <span className="payment-icon">💳</span>
                <span className="payment-icon">🏦</span>
                <span className="payment-icon">💰</span>
                <span className="payment-icon">📱</span>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer__bottom">
            <div className="footer__legal">
              <p>&copy; 2025 StoreHub. All rights reserved.</p>
              <div className="legal-links">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/cookies">Cookie Policy</a>
                <a href="/accessibility">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
