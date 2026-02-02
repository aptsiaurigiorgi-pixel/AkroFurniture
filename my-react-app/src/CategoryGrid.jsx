import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CategoryGrid({ items = [] }) {
  const navigate = useNavigate();

  return (
    <div className="category-grid">
      {items.map((item, idx) => (
        <CategoryCard
          key={idx}
          {...item}
          onClick={() =>
            navigate(
              `/products?category=${item.text.toLowerCase().replace(" ", "-")}`,
            )
          }
          delay={idx * 0.1}
        />
      ))}
    </div>
  );
}

function CategoryCard({ text, image, itemCount = "24 items", onClick, delay }) {
  const [isLoaded, setIsLoaded] = useState(false);
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

  return (
    <motion.div
      className="category-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={isMobile ? {} : { y: -8 }}
      onClick={onClick}
    >
      <div className="category-card-image">
        <img
          src={image}
          alt={text}
          loading="lazy"
          decoding="async"
          className={`lazy-image ${isLoaded ? "loaded" : ""}`}
          onLoad={() => setIsLoaded(true)}
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />
        <div className="category-card-overlay">
          <motion.span
            className="explore-btn"
            initial={{ opacity: 0, y: 10 }}
            whileHover={isMobile ? {} : { scale: 1.05 }}
          >
            Explore
          </motion.span>
        </div>
      </div>
      <div className="category-card-content">
        <h3>{text}</h3>
        <span className="item-count">{itemCount}</span>
      </div>
    </motion.div>
  );
}

export default CategoryGrid;
