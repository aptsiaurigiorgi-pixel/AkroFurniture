import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: t("navbar.home"), href: "#home" },
        { label: t("navbar.collection"), href: "#collection" },
        { label: t("navbar.products"), href: "#products" },
        { label: t("navbar.features"), href: "#features" },
        { label: t("navbar.contact"), href: "#contact" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { label: "Shipping & Returns", href: "#shipping" },
        { label: "Warranty", href: "#warranty" },
        { label: "FAQs", href: "#faqs" },
        { label: "Support", href: "#support" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Instagram", href: "#instagram" },
        { label: "Facebook", href: "#facebook" },
        { label: "Pinterest", href: "#pinterest" },
        { label: "Twitter", href: "#twitter" },
      ],
    },
  ];

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="footer-section footer-brand"
          >
            <h3>LUXE</h3>
            <p>
              Premium furniture designed to elevate your living space. Crafted
              with passion and precision.
            </p>
            <div className="footer-social">
              <motion.a
                href="#instagram"
                className="social-link"
                whileHover={{ scale: 1.1, y: -2 }}
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
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </motion.a>
              <motion.a
                href="#facebook"
                className="social-link"
                whileHover={{ scale: 1.1, y: -2 }}
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
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </motion.a>
              <motion.a
                href="#twitter"
                className="social-link"
                whileHover={{ scale: 1.1, y: -2 }}
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
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
              className="footer-section"
            >
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="footer-bottom"
        >
          <p>&copy; 2024 LUXE Furniture. All rights reserved.</p>
          <div className="footer-legal">
            <motion.a href="#privacy" whileHover={{ color: "#d4af37" }}>
              Privacy Policy
            </motion.a>
            <motion.a href="#terms" whileHover={{ color: "#d4af37" }}>
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
