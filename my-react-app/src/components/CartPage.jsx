import { motion } from "motion/react";
import { useShopping } from "../contexts/ShoppingContext.jsx";
import { useTranslation } from "react-i18next";

function CartPage({ onClose }) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShopping();
  const { t } = useTranslation();

  const handleCheckout = () => {
    // Simulate checkout process
    alert("Checkout functionality coming soon!");
  };

  return (
    <>
      <div className="cart-background-overlay" onClick={onClose} />
      <div className="cart-overlay">
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="cart-modal"
        >
          <div className="cart-header">
            <h2>{t("cart.title")}</h2>
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          </div>

          <div className="cart-content">
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="empty-cart"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </motion.div>
                <h3>{t("cart.empty")}</h3>
                <p>{t("cart.emptyMessage")}</p>
                <motion.button
                  className="continue-shopping"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {t("hero.explore")}
                </motion.button>
              </motion.div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="cart-item"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <div className="cart-item-image">
                        <motion.img
                          src={item.image}
                          alt={item.title}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="cart-item-details">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <div className="cart-item-price">${item.price}</div>
                      </div>
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <motion.button
                            className="quantity-button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "#e74c3c",
                              color: "white",
                            }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            −
                          </motion.button>
                          <span className="quantity">{item.quantity}</span>
                          <motion.button
                            className="quantity-button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "#27ae60",
                              color: "white",
                            }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            +
                          </motion.button>
                        </div>
                        <motion.button
                          className="remove-button"
                          onClick={() => removeFromCart(item.id)}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#e74c3c",
                            color: "white",
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            style={{ marginRight: "8px" }}
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Remove
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="summary-row">
                    <span>Taxes:</span>
                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${(cartTotal * 1.08).toFixed(2)}</span>
                  </div>

                  <motion.button
                    className="checkout-button"
                    onClick={handleCheckout}
                    whileHover={{ scale: 1.05, backgroundColor: "#d4af37" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ marginRight: "10px" }}
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    Proceed to Checkout
                  </motion.button>

                  <motion.button
                    className="clear-cart-button"
                    onClick={() =>
                      cart.forEach((item) => removeFromCart(item.id))
                    }
                    whileHover={{ scale: 1.05, backgroundColor: "#e74c3c" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ marginRight: "8px" }}
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    {t("cart.clear")}
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default CartPage;
