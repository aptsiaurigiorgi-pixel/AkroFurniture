import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has pointer (not touch)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hoverable elements
    const handleMouseOver = (e) => {
      const target = e.target;

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(true);

        // Check for specific cursor variants
        if (
          target.classList.contains("cursor-view") ||
          target.closest(".cursor-view")
        ) {
          setCursorVariant("view");
        } else if (
          target.classList.contains("cursor-drag") ||
          target.closest(".cursor-drag")
        ) {
          setCursorVariant("drag");
        } else {
          setCursorVariant("hover");
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(false);
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (
    typeof window !== "undefined" &&
    !window.matchMedia("(pointer: fine)").matches
  ) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering
            ? cursorVariant === "view"
              ? 100
              : cursorVariant === "drag"
                ? 80
                : 60
            : 40,
          height: isHovering
            ? cursorVariant === "view"
              ? 100
              : cursorVariant === "drag"
                ? 80
                : 60
            : 40,
          marginLeft: isHovering
            ? cursorVariant === "view"
              ? -50
              : cursorVariant === "drag"
                ? -40
                : -30
            : -20,
          marginTop: isHovering
            ? cursorVariant === "view"
              ? -50
              : cursorVariant === "drag"
                ? -40
                : -30
            : -20,
          borderRadius: "50%",
          border: "1px solid rgba(212, 175, 55, 0.8)",
          backgroundColor: isHovering
            ? "rgba(212, 175, 55, 0.1)"
            : "transparent",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition:
            "width 0.3s ease, height 0.3s ease, margin 0.3s ease, background-color 0.3s ease",
          transform: isClicking ? "scale(0.9)" : "scale(1)",
        }}
      >
        {cursorVariant === "view" && (
          <span
            style={{
              color: "#d4af37",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            View
          </span>
        )}
        {cursorVariant === "drag" && (
          <span
            style={{
              color: "#d4af37",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Drag
          </span>
        )}
      </motion.div>

      {/* Center dot */}
      <motion.div
        ref={cursorDotRef}
        style={{
          x: cursorX,
          y: cursorY,
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? 0 : 6,
          height: isHovering ? 0 : 6,
          marginLeft: isHovering ? 0 : -3,
          marginTop: isHovering ? 0 : -3,
          borderRadius: "50%",
          backgroundColor: "#d4af37",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease",
        }}
      />

      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default CustomCursor;
