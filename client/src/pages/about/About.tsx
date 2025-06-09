import React from "react";
import "./about.scss";

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-page__container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero__content">
            <h1>
              About <span>Our Store</span>
            </h1>
            <p>
              Delivering quality products and exceptional service since our
              founding
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story">
          <div className="about-story__content">
            <div className="about-story__text">
              <h2>Our Story</h2>
              <p>
                Founded with a passion for bringing the best products to our
                customers, we've grown from a small startup to a trusted
                e-commerce destination. Our journey began with a simple mission:
                to make quality products accessible to everyone, everywhere.
              </p>
              <p>
                Today, we serve thousands of satisfied customers worldwide,
                offering an extensive range of products backed by exceptional
                customer service and fast, reliable shipping.
              </p>
            </div>
            <div className="about-story__image">
              <div className="placeholder-image">
                <span>Our Journey</span>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-values">
          <h2>Our Values</h2>
          <div className="about-values__grid">
            <div className="value-card">
              <div className="value-card__icon">🎯</div>
              <h3>Quality First</h3>
              <p>
                We carefully curate every product to ensure it meets our high
                standards of quality and reliability.
              </p>
            </div>
            <div className="value-card">
              <div className="value-card__icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>
                Quick and secure shipping to get your orders to you as fast as
                possible, wherever you are.
              </p>
            </div>
            <div className="value-card">
              <div className="value-card__icon">💎</div>
              <h3>Customer Focus</h3>
              <p>
                Your satisfaction is our priority. We're here to help with any
                questions or concerns you may have.
              </p>
            </div>
            <div className="value-card">
              <div className="value-card__icon">🔒</div>
              <h3>Secure Shopping</h3>
              <p>
                Shop with confidence knowing your personal and payment
                information is always protected.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="about-stats">
          <div className="about-stats__grid">
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Products Available</p>
            </div>
            <div className="stat-item">
              <h3>99%</h3>
              <p>Customer Satisfaction</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="about-team">
          <h2>Meet Our Team</h2>
          <div className="about-team__grid">
            <div className="team-member">
              <div className="team-member__avatar">
                <span>JD</span>
              </div>
              <h4>John Doe</h4>
              <p>Founder & CEO</p>
              <span>Leading our vision and strategy</span>
            </div>
            <div className="team-member">
              <div className="team-member__avatar">
                <span>JS</span>
              </div>
              <h4>Jane Smith</h4>
              <p>Head of Operations</p>
              <span>Ensuring smooth daily operations</span>
            </div>
            <div className="team-member">
              <div className="team-member__avatar">
                <span>MB</span>
              </div>
              <h4>Mike Brown</h4>
              <p>Customer Success Manager</p>
              <span>Dedicated to customer satisfaction</span>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="about-mission">
          <div className="about-mission__content">
            <h2>Our Mission</h2>
            <p>
              To revolutionize online shopping by providing an exceptional
              customer experience, offering high-quality products at competitive
              prices, and building lasting relationships with our customers
              through trust, reliability, and innovation.
            </p>
            <div className="about-mission__features">
              <div className="feature-item">
                <span>✓</span>
                <p>Curated product selection</p>
              </div>
              <div className="feature-item">
                <span>✓</span>
                <p>Competitive pricing</p>
              </div>
              <div className="feature-item">
                <span>✓</span>
                <p>Exceptional customer service</p>
              </div>
              <div className="feature-item">
                <span>✓</span>
                <p>Sustainable business practices</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="about-cta">
          <div className="about-cta__content">
            <h2>Ready to Shop?</h2>
            <p>
              Discover our amazing collection of products and join thousands of
              satisfied customers.
            </p>
            <div className="about-cta__buttons">
              <button className="btn-primary">Shop Now</button>
              <button className="btn-secondary">Contact Us</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
