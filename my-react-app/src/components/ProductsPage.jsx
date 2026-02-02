import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useShopping } from "../contexts/ShoppingContext.jsx";
import TiltCard from "./TiltCard.jsx";
import MagneticButton from "./MagneticButton.jsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const categories = [
  { id: "all", name: "All Products" },
  { id: "living-room", name: "Living Room" },
  { id: "bedroom", name: "Bedroom" },
  { id: "dining", name: "Dining" },
  { id: "office", name: "Office" },
  { id: "outdoor", name: "Outdoor" },
  { id: "decor", name: "Decor" },
];

const sortOptions = [
  { id: "default", name: "Default" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "name-asc", name: "Name: A-Z" },
  { id: "name-desc", name: "Name: Z-A" },
];

// Category mapping for products
const getProductCategory = (product) => {
  const title = product.title.toLowerCase();
  if (
    title.includes("sofa") ||
    title.includes("coffee") ||
    title.includes("lamp") ||
    title.includes("bookshelf")
  ) {
    return "living-room";
  }
  if (
    title.includes("bed") ||
    title.includes("nightstand") ||
    title.includes("wardrobe")
  ) {
    return "bedroom";
  }
  if (
    title.includes("dining") ||
    (title.includes("table") && !title.includes("coffee")) ||
    title.includes("chair") ||
    title.includes("stool")
  ) {
    return "dining";
  }
  if (title.includes("desk") || title.includes("office")) {
    return "office";
  }
  if (title.includes("outdoor") || title.includes("patio")) {
    return "outdoor";
  }
  if (
    title.includes("mirror") ||
    title.includes("decor") ||
    title.includes("lamp")
  ) {
    return "decor";
  }
  return "living-room";
};

function ProductsPage() {
  const { products, addToCart, addToWishlist } = useShopping();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => getProductCategory(p) === selectedCategory);
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max,
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <div
      className="products-page"
      style={{ paddingTop: "100px", minHeight: "100vh" }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="products-page-header"
        >
          <h1>All Products</h1>
          <p>Discover our complete collection of premium furniture</p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="products-controls"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            marginBottom: "32px",
            padding: "20px",
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          {/* Search Bar */}
          <div className="search-bar" style={{ flex: "1", minWidth: "250px" }}>
            <div style={{ position: "relative" }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#999",
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 48px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "12px",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "14px 20px",
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              fontSize: "15px",
              cursor: "pointer",
              background: "white",
              minWidth: "180px",
            }}
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div
            className="view-toggle"
            style={{
              display: "flex",
              gap: "8px",
              background: "#f5f5f5",
              padding: "4px",
              borderRadius: "12px",
            }}
          >
            <motion.button
              onClick={() => setViewMode("grid")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "10px 16px",
                border: "none",
                borderRadius: "8px",
                background: viewMode === "grid" ? "white" : "transparent",
                boxShadow:
                  viewMode === "grid" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Grid
            </motion.button>
            <motion.button
              onClick={() => setViewMode("list")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "10px 16px",
                border: "none",
                borderRadius: "8px",
                background: viewMode === "list" ? "white" : "transparent",
                boxShadow:
                  viewMode === "list" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              List
            </motion.button>
          </div>

          {/* Filter Toggle Button */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "14px 20px",
              border: "2px solid #d4af37",
              borderRadius: "12px",
              background: showFilters ? "#d4af37" : "transparent",
              color: showFilters ? "white" : "#d4af37",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: 500,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filters
          </motion.button>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="filters-panel"
              style={{
                marginBottom: "32px",
                padding: "24px",
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              {/* Categories */}
              <div style={{ marginBottom: "24px" }}>
                <h4
                  style={{
                    marginBottom: "12px",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#666",
                  }}
                >
                  Categories
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: "10px 20px",
                        border: "2px solid",
                        borderColor:
                          selectedCategory === category.id
                            ? "#d4af37"
                            : "#e0e0e0",
                        borderRadius: "25px",
                        background:
                          selectedCategory === category.id
                            ? "#d4af37"
                            : "white",
                        color:
                          selectedCategory === category.id ? "white" : "#333",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: 500,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4
                  style={{
                    marginBottom: "12px",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#666",
                  }}
                >
                  Price Range: ${priceRange.min} - ${priceRange.max}
                </h4>
                <div
                  style={{ display: "flex", gap: "16px", alignItems: "center" }}
                >
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: parseInt(e.target.value),
                      })
                    }
                    style={{ flex: 1, accentColor: "#d4af37" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div style={{ marginBottom: "24px", color: "#666", fontSize: "14px" }}>
          Showing {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </div>

        {/* Products Grid/List */}
        <motion.div
          layout
          className="products-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              viewMode === "grid"
                ? "repeat(auto-fill, minmax(300px, 1fr))"
                : "1fr",
            gap: "24px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {viewMode === "grid" ? (
                  <TiltCard
                    className="product-card-wrapper"
                    tiltAmount={8}
                    glareOpacity={0.15}
                  >
                    <div
                      className="product-card"
                      style={{
                        background: "white",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      }}
                    >
                      <Link
                        to={`/product/${product.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div
                          className="product-image"
                          style={{
                            position: "relative",
                            height: "250px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Link>
                      <div className="product-info" style={{ padding: "20px" }}>
                        <Link
                          to={`/product/${product.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <h3
                            style={{
                              fontSize: "18px",
                              marginBottom: "8px",
                              color: "#333",
                            }}
                          >
                            {product.title}
                          </h3>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#666",
                              marginBottom: "12px",
                              lineHeight: 1.5,
                            }}
                          >
                            {product.description}
                          </p>
                          <div
                            className="product-price"
                            style={{
                              fontSize: "20px",
                              fontWeight: 600,
                              color: "#d4af37",
                              marginBottom: "16px",
                            }}
                          >
                            ${product.price}
                          </div>
                        </Link>
                        <div
                          className="product-actions"
                          style={{ display: "flex", gap: "12px" }}
                        >
                          <MagneticButton
                            className="add-to-cart"
                            strength={0.15}
                            onClick={() => addToCart(product)}
                            style={{ flex: 1 }}
                          >
                            {t("cart.addToCart")}
                          </MagneticButton>
                          <motion.button
                            className="add-to-wishlist"
                            onClick={() => addToWishlist(product)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                              width: "44px",
                              height: "44px",
                              border: "2px solid #e0e0e0",
                              borderRadius: "12px",
                              background: "white",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "20px",
                            }}
                          >
                            ♡
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                ) : (
                  <div
                    className="product-card-list"
                    style={{
                      display: "flex",
                      background: "white",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    }}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        width: "250px",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        className="product-image"
                        style={{ height: "200px", overflow: "hidden" }}
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </Link>
                    <div
                      className="product-info"
                      style={{
                        padding: "24px",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Link
                        to={`/product/${product.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <h3
                          style={{
                            fontSize: "20px",
                            marginBottom: "8px",
                            color: "#333",
                          }}
                        >
                          {product.title}
                        </h3>
                        <p
                          style={{
                            fontSize: "15px",
                            color: "#666",
                            marginBottom: "12px",
                            lineHeight: 1.6,
                          }}
                        >
                          {product.description}
                        </p>
                        <div
                          className="product-price"
                          style={{
                            fontSize: "24px",
                            fontWeight: 600,
                            color: "#d4af37",
                            marginBottom: "16px",
                          }}
                        >
                          ${product.price}
                        </div>
                      </Link>
                      <div
                        className="product-actions"
                        style={{ display: "flex", gap: "12px" }}
                      >
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
                          style={{
                            width: "44px",
                            height: "44px",
                            border: "2px solid #e0e0e0",
                            borderRadius: "12px",
                            background: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                          }}
                        >
                          ♡
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="empty-state"
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: "#666",
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              style={{ marginBottom: "24px", opacity: 0.5 }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <h3
              style={{ fontSize: "24px", marginBottom: "12px", color: "#333" }}
            >
              No products found
            </h3>
            <p>Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
