import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  return (
    <motion.div
      className="category-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      onClick={onClick}
    >
      <div className="category-card-image">
        <img src={image} alt={text} loading="lazy" />
        <div className="category-card-overlay">
          <motion.span
            className="explore-btn"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
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
