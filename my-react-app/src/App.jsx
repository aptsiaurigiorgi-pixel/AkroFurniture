import { motion, AnimatePresence } from "motion/react";
import { Routes, Route } from "react-router-dom";
import "./i18n";
import { useState, useEffect, useCallback } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useShopping } from "./contexts/ShoppingContext.jsx";
import LoginPage from "./components/LoginPage.jsx";
import CartPage from "./components/CartPage.jsx";
import WishlistPage from "./components/WishlistPage.jsx";
import ToastContainer from "./components/ToastContainer.jsx";
import ProductsPage from "./components/ProductsPage.jsx";
import ProductDetailPage from "./components/ProductDetailPage.jsx";
import LightRays from "./LightRays.jsx";
import CategoryGrid from "./CategoryGrid.jsx";
import Carousel from "./Carousel.jsx";
import MagicBento from "./MagicBento.jsx";
import ScrollReveal from "./ScrollReveal.jsx";
import HeroSection from "./components/HeroSection.jsx";
import TiltCard from "./components/TiltCard.jsx";
import MagneticButton from "./components/MagneticButton.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { useTranslation } from "react-i18next";
import { products } from "./contexts/ShoppingContext.jsx";

function App() {
  const { addToCart, addToWishlist, toasts, removeToast } = useShopping();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Category items for the grid
  const categoryItems = [
    { text: "Living Room", image: "/images/photo1.jpg", itemCount: "24 items" },
    { text: "Bedroom", image: "/images/photo2.jpg", itemCount: "18 items" },
    { text: "Dining", image: "/images/photo3.jpg", itemCount: "12 items" },
    { text: "Office", image: "/images/image1.jpg", itemCount: "15 items" },
    { text: "Outdoor", image: "/images/image2.jpg", itemCount: "10 items" },
    { text: "Decor", image: "/images/image3.jpg", itemCount: "32 items" },
  ];

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Global LightRays Background - Reduced on mobile */}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#d4af37"
            raysSpeed={0.5}
            lightSpread={0.8}
            rayLength={1.5}
            followMouse={true}
            mouseInfluence={0.15}
          />
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Premium Hero Section */}
                <HeroSection scrollToProducts={scrollToProducts} />

                {/* Features Section */}
                <section id="features" className="features">
                  <div className="container">
                    <ScrollReveal animationType="blur-reveal">
                      {t("features.title")}
                    </ScrollReveal>
                    <div className="features-grid">
                      <motion.div
                        className="feature-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                      >
                        <div className="feature-icon">✦</div>
                        <h3>{t("features.quality")}</h3>
                        <p>
                          Crafted from the finest materials with attention to
                          every detail.
                        </p>
                      </motion.div>
                      <motion.div
                        className="feature-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                      >
                        <div className="feature-icon">◈</div>
                        <h3>{t("features.design")}</h3>
                        <p>
                          Contemporary designs that blend aesthetics with
                          functionality.
                        </p>
                      </motion.div>
                      <motion.div
                        className="feature-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                      >
                        <div className="feature-icon">◉</div>
                        <h3>{t("features.comfort")}</h3>
                        <p>
                          Ergonomic designs that prioritize your comfort and
                          well-being.
                        </p>
                      </motion.div>
                      <motion.div
                        className="feature-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                      >
                        <div className="feature-icon">✹</div>
                        <h3>{t("features.service")}</h3>
                        <p>
                          Dedicated support team to assist you every step of the
                          way.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </section>

                {/* Collection Section */}
                <section id="collection" className="collection">
                  <div className="container">
                    <ScrollReveal animationType="blur-reveal">
                      {t("collection.title")}
                    </ScrollReveal>
                    <p
                      style={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "60px",
                      }}
                    >
                      {t("collection.subtitle")}
                    </p>
                    <Carousel />
                  </div>
                </section>

                {/* Products Section */}
                <section id="products" className="products">
                  <div className="container">
                    <ScrollReveal animationType="blur-reveal">
                      {t("products.title")}
                    </ScrollReveal>
                    <p
                      style={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "60px",
                      }}
                    >
                      {t("products.subtitle")}
                    </p>
                    <div className="products-grid">
                      {products.slice(0, 6).map((product, index) => (
                        <TiltCard
                          key={product.id}
                          className="product-card-wrapper"
                          tiltAmount={8}
                          glareOpacity={0.15}
                        >
                          <motion.div
                            className="product-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            viewport={{ once: true }}
                          >
                            <div className="product-image cursor-view">
                              <img src={product.image} alt={product.title} />
                              <div className="product-image-overlay">
                                <MagneticButton
                                  className="quick-view-btn"
                                  strength={0.2}
                                  onClick={() => addToCart(product)}
                                >
                                  {t("cart.addToCart")}
                                </MagneticButton>
                              </div>
                            </div>
                            <div className="product-info">
                              <h3>{product.title}</h3>
                              <p>{product.description}</p>
                              <div className="product-price">
                                ${product.price}
                              </div>
                              <div className="product-actions">
                                <MagneticButton
                                  className="add-to-cart"
                                  strength={0.15}
                                  onClick={() => addToCart(product)}
                                >
                                  {t("cart.addToCart")}
                                </MagneticButton>
                                <motion.button
                                  className="add-to-wishlist"
                                  onClick={() => addToWishlist(product)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  ♡
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        </TiltCard>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Browse Categories Section */}
                <section className="flowing-section">
                  <ScrollReveal animationType="blur-reveal">
                    Browse Categories
                  </ScrollReveal>
                  <p className="section-subtitle">
                    Discover furniture for every space in your home
                  </p>
                  <CategoryGrid
                    items={[
                      {
                        text: "Living Room",
                        image: "/images/photo1.jpg",
                        itemCount: "48 items",
                      },
                      {
                        text: "Bedroom",
                        image: "/images/photo2.jpg",
                        itemCount: "36 items",
                      },
                      {
                        text: "Dining",
                        image: "/images/photo3.jpg",
                        itemCount: "24 items",
                      },
                      {
                        text: "Office",
                        image: "/images/image1.jpg",
                        itemCount: "32 items",
                      },
                      {
                        text: "Outdoor",
                        image: "/images/image2.jpg",
                        itemCount: "18 items",
                      },
                    ]}
                  />
                </section>

                {/* Magic Bento Section */}
                <section className="bento-section">
                  <MagicBento>
                    {products.slice(0, 8).map((product, index) => (
                      <motion.div
                        key={product.id}
                        className="bento-item"
                        style={{
                          gridColumn: index < 2 ? "span 2" : "span 1",
                          gridRow: index < 2 ? "span 2" : "span 1",
                          borderRadius: "12px",
                          overflow: "hidden",
                          position: "relative",
                          backgroundImage: `url(${product.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: "20px",
                            background:
                              "linear-gradient(transparent, rgba(0,0,0,0.7))",
                            color: "white",
                          }}
                        >
                          <h4 style={{ margin: 0, fontSize: "18px" }}>
                            {product.title}
                          </h4>
                          <p
                            style={{
                              margin: "5px 0 0",
                              fontSize: "14px",
                              opacity: 0.9,
                            }}
                          >
                            ${product.price}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </MagicBento>
                </section>

                {/* Contact Section */}
                <section id="contact" className="contact">
                  <div className="container">
                    <ScrollReveal animationType="blur-reveal">
                      {t("contact.title")}
                    </ScrollReveal>
                    <div className="contact-content">
                      <motion.form
                        className="contact-form"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        onSubmit={(e) => {
                          e.preventDefault();
                          alert("Message sent! We will get back to you soon.");
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="name">{t("contact.name")}</label>
                          <input
                            type="text"
                            id="name"
                            placeholder={t("contact.namePlaceholder")}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">{t("contact.email")}</label>
                          <input
                            type="email"
                            id="email"
                            placeholder={t("contact.emailPlaceholder")}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="message">
                            {t("contact.message")}
                          </label>
                          <textarea
                            id="message"
                            rows="5"
                            placeholder={t("contact.messagePlaceholder")}
                            required
                          ></textarea>
                        </div>
                        <button type="submit" className="submit-button">
                          {t("contact.send")}
                        </button>
                      </motion.form>
                      <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <div className="contact-item">
                          <div className="contact-icon">📍</div>
                          <div className="contact-details">
                            <h4>{t("contact.visitUs")}</h4>
                            <p>
                              123 Luxury Lane, Design District
                              <br />
                              New York, NY 10001
                            </p>
                          </div>
                        </div>
                        <div className="contact-item">
                          <div className="contact-icon">📞</div>
                          <div className="contact-details">
                            <h4>{t("contact.callUs")}</h4>
                            <p>
                              +1 (555) 123-4567
                              <br />
                              Mon-Fri 9am-6pm
                            </p>
                          </div>
                        </div>
                        <div className="contact-item">
                          <div className="contact-icon">✉️</div>
                          <div className="contact-details">
                            <h4>{t("contact.emailUs")}</h4>
                            <p>
                              hello@luxe.com
                              <br />
                              support@luxe.com
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </section>

                <Footer />
              </>
            }
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}

export default App;
