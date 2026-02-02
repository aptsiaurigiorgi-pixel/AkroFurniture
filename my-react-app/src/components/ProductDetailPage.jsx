import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { useShopping } from "../contexts/ShoppingContext.jsx";
import MagneticButton from "./MagneticButton.jsx";
import TiltCard from "./TiltCard.jsx";
import { useTranslation } from "react-i18next";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, addToWishlist } = useShopping();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div
        style={{ paddingTop: "120px", minHeight: "100vh", textAlign: "center" }}
      >
        <h2>Product not found</h2>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  // Get related products (same category or random)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh" }}>
      <div className="container">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
            padding: "12px 20px",
            border: "2px solid #e0e0e0",
            borderRadius: "12px",
            background: "white",
            cursor: "pointer",
            fontSize: "15px",
            color: "#333",
          }}
          whileHover={{ scale: 1.05, borderColor: "#d4af37" }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </motion.button>

        {/* Product Details */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "48px",
            marginBottom: "80px",
          }}
        >
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard tiltAmount={5} glareOpacity={0.1}>
              <div
                style={{
                  background: "white",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ height: "500px", overflow: "hidden" }}>
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </TiltCard>

            {/* Thumbnail Images */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
                justifyContent: "center",
              }}
            >
              {[0, 1, 2, 3].map((index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border:
                      selectedImage === index
                        ? "3px solid #d4af37"
                        : "3px solid transparent",
                    cursor: "pointer",
                    padding: 0,
                    opacity: selectedImage === index ? 1 : 0.6,
                  }}
                >
                  <img
                    src={product.image}
                    alt={`${product.title} ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "#f5f5f5",
                  borderRadius: "20px",
                  fontSize: "13px",
                  color: "#666",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "16px",
                }}
              >
                Premium Collection
              </span>
              <h1
                style={{
                  fontSize: "42px",
                  marginBottom: "16px",
                  color: "#333",
                  lineHeight: 1.2,
                }}
              >
                {product.title}
              </h1>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 700,
                  color: "#d4af37",
                  marginBottom: "24px",
                }}
              >
                ${product.price}
              </div>
              <p
                style={{
                  fontSize: "17px",
                  lineHeight: 1.8,
                  color: "#666",
                  marginBottom: "32px",
                }}
              >
                {product.description} Experience the perfect blend of luxury and
                comfort with our meticulously crafted design. Made from premium
                materials with attention to every detail, this piece will
                transform your living space into a sanctuary of elegance.
              </p>

              {/* Features */}
              <div style={{ marginBottom: "32px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    marginBottom: "16px",
                    color: "#333",
                  }}
                >
                  Key Features
                </h3>
                <div style={{ display: "grid", gap: "12px" }}>
                  {[
                    "Premium quality materials",
                    "Handcrafted with attention to detail",
                    "Ergonomic design for maximum comfort",
                    "5-year warranty included",
                    "Free delivery and assembly",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#27ae60"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ color: "#555", fontSize: "15px" }}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <MagneticButton
                  className="add-to-cart"
                  strength={0.2}
                  onClick={() => addToCart(product)}
                  style={{
                    flex: 1,
                    minWidth: "200px",
                    padding: "18px 32px",
                    fontSize: "16px",
                    background: "#d4af37",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    {t("cart.addToCart")}
                  </span>
                </MagneticButton>
                <motion.button
                  className="add-to-wishlist"
                  onClick={() => addToWishlist(product)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "18px 32px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "12px",
                    background: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "16px",
                    color: "#333",
                    fontWeight: 500,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  Add to Wishlist
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginTop: "80px", marginBottom: "60px" }}
        >
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "40px",
              textAlign: "center",
              color: "#333",
            }}
          >
            You May Also Like
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/product/${relatedProduct.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <TiltCard tiltAmount={6} glareOpacity={0.1}>
                    <div
                      style={{
                        background: "white",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      }}
                    >
                      <div style={{ height: "200px", overflow: "hidden" }}>
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div style={{ padding: "20px" }}>
                        <h3
                          style={{
                            fontSize: "16px",
                            marginBottom: "8px",
                            color: "#333",
                          }}
                        >
                          {relatedProduct.title}
                        </h3>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#d4af37",
                          }}
                        >
                          ${relatedProduct.price}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
