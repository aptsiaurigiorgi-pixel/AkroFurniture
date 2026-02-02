import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";
import { useTranslation } from "react-i18next";

function HeroSection({ scrollToProducts }) {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const title = t("hero.title");
  const words = title.split(" ");

  return (
    <section className="hero-premium" id="home" ref={containerRef}>
      {/* Animated background gradient */}
      <div className="hero-background">
        <motion.div
          className="gradient-orb orb-1"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="gradient-orb orb-2"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="gradient-orb orb-3"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div className="container hero-content" style={{ opacity, scale }}>
        <div className="hero-text">
          {/* Animated title with letter stagger */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="hero-title"
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="word-wrapper">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={letterVariants}
                    className="char"
                    style={{
                      display: "inline-block",
                      background:
                        "linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordIndex < words.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-subtitle"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <MagneticButton
              onClick={scrollToProducts}
              className="cta-button-premium"
              strength={0.2}
            >
              <span className="btn-text">{t("hero.explore")}</span>
              <motion.span
                className="btn-arrow"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </MagneticButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { value: "15K+", label: "Happy Customers" },
              { value: "500+", label: "Products" },
              { value: "25", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Hero visual with parallax furniture images */}
        <div className="hero-visual-premium">
          <motion.div
            className="hero-image-wrapper image-1"
            style={{ y: y1 }}
            initial={{ opacity: 0, x: 100, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img
              src="/images/photo1.jpg"
              alt="Luxury Sofa"
              className="hero-image"
              loading="eager"
              decoding="async"
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
              }}
            />
            <div className="image-glow" />
          </motion.div>

          <motion.div
            className="hero-image-wrapper image-2"
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 100, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <img
              src="/images/photo2.jpg"
              alt="Modern Interior"
              className="hero-image"
              loading="lazy"
              decoding="async"
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
              }}
            />
            <div className="image-glow" />
          </motion.div>

          <motion.div
            className="hero-image-wrapper image-3"
            style={{ y: y3 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <img
              src="/images/photo3.jpg"
              alt="Designer Furniture"
              className="hero-image"
              loading="lazy"
              decoding="async"
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
              }}
            />
            <div className="image-glow" />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="scroll-mouse"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="scroll-wheel" />
        </motion.div>
        <span className="scroll-text">Scroll to explore</span>
      </motion.div>
    </section>
  );
}

export default HeroSection;
