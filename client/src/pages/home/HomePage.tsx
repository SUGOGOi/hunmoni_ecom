import { useState, useEffect } from "react";
import "./HomePage.scss";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Sample data for single vendor store
  const heroSlides = [
    {
      id: 1,
      title: "New Collection 2025",
      subtitle: "Premium Quality Products",
      description: "Discover our latest arrivals with exclusive designs",
      image: "/api/placeholder/1200/500",
      cta: "Shop Collection",
    },
    {
      id: 2,
      title: "Limited Time Offer",
      subtitle: "Up to 50% Off",
      description: "Don't miss out on our biggest sale of the year",
      image: "/api/placeholder/1200/500",
      cta: "Shop Sale",
    },
    {
      id: 3,
      title: "Free Shipping",
      subtitle: "On Orders Over $99",
      description: "Fast and reliable delivery to your doorstep",
      image: "/api/placeholder/1200/500",
      cta: "Learn More",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "/api/placeholder/300/200",
      count: "150+",
    },
    {
      id: 2,
      name: "Clothing",
      image: "/api/placeholder/300/200",
      count: "320+",
    },
    {
      id: 3,
      name: "Home & Living",
      image: "/api/placeholder/300/200",
      count: "280+",
    },
    {
      id: 4,
      name: "Sports & Outdoor",
      image: "/api/placeholder/300/200",
      count: "95+",
    },
    {
      id: 5,
      name: "Books & Media",
      image: "/api/placeholder/300/200",
      count: "210+",
    },
    {
      id: 6,
      name: "Health & Beauty",
      image: "/api/placeholder/300/200",
      count: "180+",
    },
  ];

  const featuredProductsData = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 129.99,
      originalPrice: 159.99,
      image: "/api/placeholder/250/250",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 299.99,
      originalPrice: 399.99,
      image: "/api/placeholder/250/250",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      name: "Laptop Stand",
      price: 49.99,
      originalPrice: 69.99,
      image: "/api/placeholder/250/250",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 79.99,
      originalPrice: 99.99,
      image: "/api/placeholder/250/250",
      rating: 4.6,
      reviews: 203,
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      review: "Amazing quality products and fast shipping. Highly recommended!",
      rating: 5,
      avatar: "/api/placeholder/60/60",
    },
    {
      id: 2,
      name: "Mike Chen",
      review: "Great customer service and excellent product selection.",
      rating: 5,
      avatar: "/api/placeholder/60/60",
    },
    {
      id: 3,
      name: "Emily Davis",
      review: "Love shopping here! Always find what I'm looking for.",
      rating: 5,
      avatar: "/api/placeholder/60/60",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header__content">
            <div className="header__logo">
              <h1>ShopEase</h1>
            </div>
            <nav className="header__nav">
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#products">Products</a>
                </li>
                <li>
                  <a href="#categories">Categories</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </nav>
            <div className="header__actions">
              <div className="header__search">
                <input type="text" placeholder="Search products..." />
                <button className="search__btn">🔍</button>
              </div>
              <div className="header__icons">
                <button className="icon__btn">
                  ❤️ <span className="badge">3</span>
                </button>
                <button className="icon__btn">
                  🛒 <span className="badge">2</span>
                </button>
                <button className="btn btn--primary">Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero__slider">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero__slide ${
                index === currentSlide ? "active" : ""
              }`}
            >
              <div className="hero__content">
                <div className="container">
                  <div className="hero__text">
                    <h2 className="hero__title">{slide.title}</h2>
                    <h3 className="hero__subtitle">{slide.subtitle}</h3>
                    <p className="hero__description">{slide.description}</p>
                    <button className="btn btn--primary btn--large">
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </div>
              <div className="hero__image">
                <img src={slide.image} alt={slide.title} />
              </div>
            </div>
          ))}
        </div>
        <div className="hero__indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`hero__indicator ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Features Banner */}
      <section className="features">
        <div className="container">
          <div className="features__grid">
            <div className="feature__item">
              <div className="feature__icon">🚚</div>
              <div className="feature__content">
                <h3>Free Shipping</h3>
                <p>On orders over $99</p>
              </div>
            </div>
            <div className="feature__item">
              <div className="feature__icon">🔄</div>
              <div className="feature__content">
                <h3>Easy Returns</h3>
                <p>30-day return policy</p>
              </div>
            </div>
            <div className="feature__item">
              <div className="feature__icon">🔒</div>
              <div className="feature__content">
                <h3>Secure Payment</h3>
                <p>100% secure checkout</p>
              </div>
            </div>
            <div className="feature__item">
              <div className="feature__icon">📞</div>
              <div className="feature__content">
                <h3>24/7 Support</h3>
                <p>Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <div className="section__header">
            <h2>Shop by Category</h2>
            <p>Explore our wide range of premium products</p>
          </div>
          <div className="categories__grid">
            {categories.map((category) => (
              <div key={category.id} className="category__card">
                <div className="category__image">
                  <img src={category.image} alt={category.name} />
                  <div className="category__overlay">
                    <span className="category__count">
                      {category.count} items
                    </span>
                  </div>
                </div>
                <div className="category__content">
                  <h3 className="category__name">{category.name}</h3>
                  <button className="btn btn--outline btn--small">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section__header">
            <h2>Featured Products</h2>
            <p>Handpicked items just for you</p>
          </div>
          <div className="products__grid">
            {featuredProductsData.map((product) => (
              <div key={product.id} className="product__card">
                <div className="product__image">
                  <img src={product.image} alt={product.name} />
                  <div className="product__actions">
                    <button className="action__btn">❤️</button>
                    <button className="action__btn">👁️</button>
                  </div>
                  <div className="product__badge">Sale</div>
                </div>
                <div className="product__content">
                  <h3 className="product__name">{product.name}</h3>
                  <div className="product__rating">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating__text">({product.reviews})</span>
                  </div>
                  <div className="product__price">
                    <span className="price__current">${product.price}</span>
                    <span className="price__original">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <button className="btn btn--primary btn--full">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section__header">
            <h2>What Our Customers Say</h2>
            <p>Real reviews from real customers</p>
          </div>
          <div className="testimonials__grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial__card">
                <div className="testimonial__rating">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="testimonial__text">"{testimonial.review}"</p>
                <div className="testimonial__author">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                  <span className="author__name">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter__content">
            <h2>Stay Updated</h2>
            <p>
              Subscribe to get special offers, free giveaways, and exclusive
              deals
            </p>
            <div className="newsletter__form">
              <input type="email" placeholder="Enter your email address" />
              <button className="btn btn--primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <div className="footer__section">
              <h3>ShopEase</h3>
              <p>
                Your trusted online store for quality products at great prices.
                We're committed to providing excellent customer service and fast
                delivery.
              </p>
              <div className="social__links">
                <a href="#" className="social__link">
                  📘
                </a>
                <a href="#" className="social__link">
                  🐦
                </a>
                <a href="#" className="social__link">
                  📷
                </a>
                <a href="#" className="social__link">
                  💼
                </a>
              </div>
            </div>
            <div className="footer__section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#shipping">Shipping Info</a>
                </li>
                <li>
                  <a href="#returns">Returns</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="footer__section">
              <h4>Categories</h4>
              <ul>
                <li>
                  <a href="#electronics">Electronics</a>
                </li>
                <li>
                  <a href="#clothing">Clothing</a>
                </li>
                <li>
                  <a href="#home">Home & Living</a>
                </li>
                <li>
                  <a href="#sports">Sports</a>
                </li>
                <li>
                  <a href="#books">Books</a>
                </li>
              </ul>
            </div>
            <div className="footer__section">
              <h4>Customer Service</h4>
              <ul>
                <li>
                  <a href="#help">Help Center</a>
                </li>
                <li>
                  <a href="#track">Track Order</a>
                </li>
                <li>
                  <a href="#size-guide">Size Guide</a>
                </li>
                <li>
                  <a href="#terms">Terms of Service</a>
                </li>
                <li>
                  <a href="#privacy">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p>&copy; 2025 ShopEase. All rights reserved.</p>
            <div className="payment__methods">
              <span>💳 💳 💳 💳</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
