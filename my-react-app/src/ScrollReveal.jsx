import { useLayoutEffect, useRef, useMemo, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Helper function to detect mobile devices
const checkIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 768 || "ontouchstart" in window;
};

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 8,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  animationType = "blur-reveal", // Options: 'blur-reveal', 'fade-in', 'slide-up', 'zoom-in', 'rotate'
  staggerTime = 0.05,
  duration = 0.6,
}) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll(".word");
    if (!words.length) return;

    // Kill existing triggers for this container
    ScrollTrigger.getAll().forEach((t) => {
      if (
        t.trigger === container ||
        t.trigger?.closest(".scroll-reveal") === container
      ) {
        t.kill();
      }
    });

    // Disable blur effects on mobile for performance
    const shouldEnableBlur = enableBlur && !isMobile;

    // Set initial states based on animation type
    switch (animationType) {
      case "slide-up":
        gsap.set(words, {
          opacity: baseOpacity,
          y: 50,
          filter: shouldEnableBlur ? `blur(${blurStrength}px)` : "none",
          rotation: baseRotation,
        });
        break;
      case "zoom-in":
        gsap.set(words, {
          opacity: baseOpacity,
          scale: 0.8,
          filter: shouldEnableBlur ? `blur(${blurStrength}px)` : "none",
          rotation: baseRotation,
        });
        break;
      case "rotate":
        gsap.set(words, {
          opacity: baseOpacity,
          rotation: baseRotation * 5,
          filter: shouldEnableBlur ? `blur(${blurStrength}px)` : "none",
        });
        break;
      case "blur-reveal":
        gsap.set(words, {
          opacity: 0.2,
          filter: shouldEnableBlur ? `blur(${blurStrength}px)` : "none",
          y: 20,
        });
        break;
      default: // fade-in
        gsap.set(words, {
          opacity: baseOpacity,
          filter: shouldEnableBlur ? `blur(${blurStrength}px)` : "none",
          rotation: baseRotation,
        });
    }

    // Scroll animation - simplified for mobile
    const animProps = {
      opacity: 1,
      filter: shouldEnableBlur ? "blur(0px)" : "none",
      y: 0,
      rotation: 0,
      stagger: isMobile ? Math.min(staggerTime, 0.03) : staggerTime,
      duration: isMobile ? Math.min(duration, 0.4) : duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        end: "top 50%",
        scrub: isMobile ? false : 1, // Disable scrub on mobile for better performance
      },
    };

    if (animationType === "zoom-in") {
      animProps.scale = 1;
    }

    gsap.to(words, animProps);

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (
          t.trigger === container ||
          t.trigger?.closest(".scroll-reveal") === container
        ) {
          t.kill();
        }
      });
    };
  }, [
    scrollContainerRef,
    children,
    animationType,
    staggerTime,
    duration,
    blurStrength,
    baseOpacity,
    baseRotation,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollReveal;
