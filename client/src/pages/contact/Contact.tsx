import React, { useState } from "react";
import "./contact.scss";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Add your contact form submission logic here
      console.log("Contact form submitted:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.log(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-page__container">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero__content">
            <h1>
              Get In <span>Touch</span>
            </h1>
            <p>
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="contact-main">
          <div className="contact-main__grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>Reach out to us through any of these channels</p>

              <div className="contact-info__items">
                <div className="contact-info__item">
                  <div className="contact-info__icon">📍</div>
                  <div className="contact-info__details">
                    <h4>Address</h4>
                    <p>
                      123 Business Street
                      <br />
                      Suite 100
                      <br />
                      City, State 12345
                    </p>
                  </div>
                </div>

                <div className="contact-info__item">
                  <div className="contact-info__icon">📞</div>
                  <div className="contact-info__details">
                    <h4>Phone</h4>
                    <p>+1 (555) 123-4567</p>
                    <span>Mon-Fri 9AM-6PM</span>
                  </div>
                </div>

                <div className="contact-info__item">
                  <div className="contact-info__icon">✉️</div>
                  <div className="contact-info__details">
                    <h4>Email</h4>
                    <p>support@yourstore.com</p>
                    <span>We'll respond within 24 hours</span>
                  </div>
                </div>

                <div className="contact-info__item">
                  <div className="contact-info__icon">💬</div>
                  <div className="contact-info__details">
                    <h4>Live Chat</h4>
                    <p>Available on our website</p>
                    <span>Mon-Fri 9AM-9PM</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="contact-social">
                <h4>Follow Us</h4>
                <div className="contact-social__links">
                  <a href="#" className="social-link">
                    Facebook
                  </a>
                  <a href="#" className="social-link">
                    Twitter
                  </a>
                  <a href="#" className="social-link">
                    Instagram
                  </a>
                  <a href="#" className="social-link">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h2>Send us a Message</h2>

              {isSubmitted ? (
                <div className="contact-form__success">
                  <div className="success-icon">✓</div>
                  <h3>Message Sent Successfully!</h3>
                  <p>
                    Thank you for contacting us. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    className="btn-secondary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <div className="contact-form__error">{error}</div>}

                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="contact-form__field">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="order">Order Issue</option>
                      <option value="return">Returns & Refunds</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="contact-form__submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending Message..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="contact-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="contact-faq__grid">
            <div className="faq-item">
              <h4>How long does shipping take?</h4>
              <p>
                Standard shipping takes 3-5 business days. Express shipping is
                available for 1-2 day delivery.
              </p>
            </div>
            <div className="faq-item">
              <h4>What's your return policy?</h4>
              <p>
                We offer 30-day returns on most items. Items must be in original
                condition with tags attached.
              </p>
            </div>
            <div className="faq-item">
              <h4>Do you ship internationally?</h4>
              <p>
                Yes, we ship to over 50 countries worldwide. International
                shipping rates vary by location.
              </p>
            </div>
            <div className="faq-item">
              <h4>How can I track my order?</h4>
              <p>
                You'll receive a tracking number via email once your order
                ships. Use it on our tracking page.
              </p>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="contact-hours">
          <div className="contact-hours__content">
            <h2>Business Hours</h2>
            <div className="contact-hours__grid">
              <div className="hours-item">
                <h4>Customer Support</h4>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
              <div className="hours-item">
                <h4>Live Chat</h4>
                <p>Monday - Friday: 9:00 AM - 9:00 PM</p>
                <p>Saturday - Sunday: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
