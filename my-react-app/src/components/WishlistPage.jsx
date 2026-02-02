import { motion } from "motion/react";
import { useShopping } from "../contexts/ShoppingContext.jsx";
import { useTranslation } from "react-i18next";

function WishlistPage({ onClose }) {
  const { wishlist, removeFromWishlist, addToCart } = useShopping();
  const { t } = useTranslation();

  return (
    <div className="wishlist-overlay">
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="wishlist-modal"
      >
        <div className="wishlist-header">
          <h2>{t("wishlist.title")}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="wishlist-content">
          {wishlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="empty-wishlist"
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
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </motion.div>
              <h3>{t("wishlist.empty")}</h3>
              <p>{t("wishlist.empty")}</p>
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
            <div className="wishlist-items">
              {wishlist.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="wishlist-item"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <div className="wishlist-item-image">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="wishlist-item-overlay">
                      <motion.div
                        className="quick-actions"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                      >
                        <motion.button
                          className="quick-view-button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                  <div className="wishlist-item-details">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <div className="wishlist-item-price">${item.price}</div>
                  </div>
                  <div className="wishlist-item-actions">
                    <motion.button
                      className="add-to-cart-button"
                      onClick={() => addToCart(item)}
                      whileHover={{ scale: 1.05, backgroundColor: "#d4af37" }}
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
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      {t("cart.addToCart")}
                    </motion.button>
                    <motion.button
                      className="remove-button"
                      onClick={() => removeFromWishlist(item.id)}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#ff4444",
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
                      {t("cart.clear")}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {wishlist.length > 0 && (
          <motion.div
            className="wishlist-footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: wishlist.length * 0.1 }}
          >
            <div className="wishlist-summary">
              <span>Total Items: {wishlist.length}</span>
              <span>
                Total Value: $
                {wishlist.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </span>
            </div>
            <motion.button
              className="add-all-to-cart-button"
              onClick={() => wishlist.forEach((item) => addToCart(item))}
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
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {t("cart.addAll")}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default WishlistPage;
