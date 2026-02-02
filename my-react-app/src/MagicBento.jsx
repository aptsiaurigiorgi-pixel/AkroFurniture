import { useState, useRef, useEffect } from "react";

const MagicBento = ({
  children,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = true,
  spotlightRadius = 400,
  particleCount = 12,
  glowColor = "100, 100, 100",
  disableAnimations = false,
}) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!enableSpotlight && !enableMagnetism && !enableTilt) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [enableSpotlight, enableMagnetism, enableTilt]);

  const spotlightStyle = enableSpotlight
    ? {
        background: `radial-gradient(circle ${spotlightRadius}px at ${mousePos.x}px ${mousePos.y}px, rgba(${glowColor}, 0.2), transparent)`,
      }
    : {};

  const glowStyle = enableBorderGlow
    ? {
        boxShadow: isHovered
          ? `0 0 20px rgba(${glowColor}, 0.5), inset 0 0 20px rgba(${glowColor}, 0.1)`
          : `0 0 10px rgba(${glowColor}, 0.3)`,
      }
    : {};

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="magic-bento"
      style={{
        fontFamily: '"Playfair Display", serif',
        position: "relative",
        width: "70%",
        minHeight: "400px",
        marginTop: "100px",
        marginBottom: "100px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "40px",
        borderRadius: "16px",
        background:
          "linear-gradient(135deg, rgba(245, 245, 245, 0.49), rgba(220, 220, 220, 0.53))",
        overflow: "hidden",
        transition: disableAnimations ? "none" : "all 0.3s ease",
        ...glowStyle,
      }}
    >
      {enableSpotlight && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            ...spotlightStyle,
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "40px",
            color: "#1a1a1a",
            fontFamily: '"Playfair Display", serif',
            fontWeight: "600",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Explore Our Collection
        </h2>

        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "200px",
            gap: "16px",
            width: "100%",
            cursor: "pointer",
          }}
        >
          {children}

          {/* Text in bottom-right corner */}
          <div
            style={{
              gridColumn: "3 / 5",
              gridRow: "3 / 4",
              padding: "10px 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, rgba(245, 245, 245, 0.43), rgba(235, 235, 235, 0.95))",
              borderRadius: "12px",
              border: "1px solid rgba(180, 180, 180, 0.3)",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
                color: "#666",
                margin: 0,
                fontFamily: '"Oswald", sans-serif',
                textAlign: "center",
                fontWeight: "300",
                letterSpacing: "0.3px",
                width: "50%",
              }}
            >
              Welcome to a world where every piece tells a story of intention.
              We create modern furniture that blends clean architecture-inspired
              lines with everyday comfort — because your space should feel as
              current as your life.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .bento-item {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .bento-item:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }
      `}</style>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MagicBento;
