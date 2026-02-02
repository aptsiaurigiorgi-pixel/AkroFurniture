import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useShopping } from "./contexts/ShoppingContext.jsx";
import LoginPage from "./components/LoginPage.jsx";
import CartPage from "./components/CartPage.jsx";
import WishlistPage from "./components/WishlistPage.jsx";
import { useTranslation } from "react-i18next";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout, cartCount } = useShopping();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const languages = [
    { code: "en", name: "EN", flag: "🇺🇸" },
    { code: "ru", name: "RU", flag: "🇷🇺" },
    { code: "ka", name: "KA", flag: "🇬🇪" },
  ];

  const navLinks = [
    { to: "/", label: t("navbar.home") },
    { to: "/#collection", label: t("navbar.collection") },
    { to: "/products", label: t("navbar.products") },
    { to: "/#features", label: t("navbar.features") },
    { to: "/#contact", label: t("navbar.contact") },
  ];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setShowLanguageMenu(false);
  };

  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showLanguageMenu && !e.target.closest(".language-switcher")) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showLanguageMenu]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={isScrolled ? "scrolled" : ""}>
        <nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="logo"
              style={{ cursor: "pointer" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LUXE
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="nav-links"
          >
            {navLinks.map((link) => (
              <motion.li
                key={link.to}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={link.to}>{link.label}</Link>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="header-actions"
          >
            {/* Clean Language Switcher */}
            <div className="language-switcher">
              <motion.button
                className="language-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLanguageMenu(!showLanguageMenu);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="language-flag">
                  {languages.find((l) => l.code === i18n.language)?.flag ||
                    "🌐"}
                </span>
                <span className="language-code">
                  {i18n.language.toUpperCase()}
                </span>
              </motion.button>
              <AnimatePresence>
                {showLanguageMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="language-dropdown"
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        className={`language-option ${
                          i18n.language === lang.code ? "active" : ""
                        }`}
                        onClick={() => changeLanguage(lang.code)}
                        whileHover={{ x: 4 }}
                      >
                        <span className="language-option-flag">
                          {lang.flag}
                        </span>
                        <span className="language-option-name">
                          {lang.name}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Header Actions */}
            <div className="mobile-header-actions">
              {isLoggedIn && (
                <>
                  <motion.button
                    className="wishlist-button"
                    onClick={() => setShowWishlist(true)}
                    whileHover={{ scale: 1.1 }}
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
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </motion.button>
                  <motion.button
                    className="cart-button"
                    onClick={() => setShowCart(true)}
                    whileHover={{ scale: 1.1 }}
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
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="cart-count">{cartCount}</span>
                    )}
                  </motion.button>
                </>
              )}
            </div>

            {/* Desktop Auth Buttons */}
            {isLoggedIn ? (
              <>
                <motion.button
                  className="wishlist-button desktop-only"
                  onClick={() => setShowWishlist(true)}
                  whileHover={{ scale: 1.1 }}
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
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </motion.button>
                <motion.button
                  className="cart-button desktop-only"
                  onClick={() => setShowCart(true)}
                  whileHover={{ scale: 1.1 }}
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
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </motion.button>
                <motion.button
                  className="logout-button desktop-only"
                  onClick={logout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("login.logout")}
                </motion.button>
              </>
            ) : (
              <motion.button
                className="login-button desktop-only"
                onClick={() => setShowLogin(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("login.title")}
              </motion.button>
            )}

            {/* Hamburger Menu Button */}
            <motion.button
              className={`hamburger-button ${isMobileMenuOpen ? "active" : ""}`}
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </motion.button>
          </motion.div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Panel */}
      <motion.div
        className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}
        initial={false}
        animate={isMobileMenuOpen ? { x: 0 } : { x: "100%" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <ul className="mobile-nav-links">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.to}
              initial={{ opacity: 0, x: 20 }}
              animate={
                isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
              }
              transition={{ delay: index * 0.05 + 0.1 }}
            >
              <Link to={link.to} onClick={closeMobileMenu}>
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="mobile-menu-actions">
          {isLoggedIn ? (
            <motion.button
              className="logout-button"
              onClick={() => {
                logout();
                closeMobileMenu();
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("login.logout")}
            </motion.button>
          ) : (
            <motion.button
              className="login-button"
              onClick={() => {
                setShowLogin(true);
                closeMobileMenu();
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("login.title")}
            </motion.button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}
        {showCart && <CartPage onClose={() => setShowCart(false)} />}
        {showWishlist && (
          <WishlistPage onClose={() => setShowWishlist(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
