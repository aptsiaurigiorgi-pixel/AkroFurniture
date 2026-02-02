import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Simulate loading progress
    const interval = setInterval(
      () => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsComplete(true);
              setTimeout(onLoadingComplete, 500);
            }, 300);
            return 100;
          }
          // Slower progress on mobile for better UX
          const increment = isMobile
            ? Math.random() * 10 + 3
            : Math.random() * 15 + 5;
          return prev + increment;
        });
      },
      isMobile ? 100 : 150,
    );

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", checkMobile);
    };
  }, [onLoadingComplete, isMobile]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="loading-content">
            {/* Logo Animation */}
            <motion.div
              className="loading-logo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="logo-text">LUXE</span>
              <motion.div
                className="logo-underline"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.p
              className="loading-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading your experience...
            </motion.p>

            {/* Progress Bar */}
            <div className="progress-container">
              <motion.div
                className="progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.span
              className="progress-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.span>

            {/* Decorative Elements - Reduced on mobile */}
            <div className="loading-decoration">
              <motion.div
                className="decoration-circle circle-1"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {!isMobile && (
                <motion.div
                  className="decoration-circle circle-2"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
