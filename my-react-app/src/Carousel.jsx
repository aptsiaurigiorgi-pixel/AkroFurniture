import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import carousel1 from "./assets/icons/carousel1.jpg";
import carousel2 from "./assets/icons/carousel2.jpg";
import carousel3 from "./assets/icons/carousel3.jpg";
import carousel4 from "./assets/icons/carousel4.jpg";
import carousel5 from "./assets/icons/carousel5.jpg";
import carousel6 from "./assets/icons/carousel6.jpg";
import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";
import image4 from "./assets/image4.jpg";

const DEFAULT_ITEMS = [
  {
    title: "Premium Sofas",
    description: "Handcrafted luxury sofas with Italian leather upholstery.",
    id: 1,
    image: carousel1,
    category: "Living Room",
  },
  {
    title: "Elegant Dining",
    description: "Modern dining sets for memorable gatherings.",
    id: 2,
    image: carousel2,
    category: "Dining",
  },
  {
    title: "Designer Lighting",
    description: "Statement lighting pieces that transform any space.",
    id: 3,
    image: carousel3,
    category: "Lighting",
  },
  {
    title: "Luxury Bedroom",
    description: "Premium bedroom furniture for restful nights.",
    id: 4,
    image: carousel4,
    category: "Bedroom",
  },
  {
    title: "Home Office",
    description: "Ergonomic and stylish workspace solutions.",
    id: 5,
    image: carousel5,
    category: "Office",
  },
  {
    title: "Decor Accents",
    description: "Curated accessories to complete your interior.",
    id: 6,
    image: carousel6,
    category: "Decor",
  },
  {
    title: "Outdoor Living",
    description: "Stylish outdoor furniture for alfresco relaxation.",
    id: 7,
    image: image1,
    category: "Outdoor",
  },
  {
    title: "Storage Solutions",
    description: "Smart storage that combines form and function.",
    id: 8,
    image: image2,
    category: "Storage",
  },
  {
    title: "Accent Chairs",
    description: "Statement chairs that elevate any corner.",
    id: 9,
    image: image3,
    category: "Seating",
  },
  {
    title: "Coffee Tables",
    description: "Centerpieces that anchor your living space.",
    id: 10,
    image: image4,
    category: "Tables",
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 24;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, x }) {
  const range = [
    -(index + 1) * (itemWidth + GAP),
    -index * (itemWidth + GAP),
    -(index - 1) * (itemWidth + GAP),
  ];
  const outputRange = [30, 0, -30];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className="carousel-item"
      style={{
        width: `${itemWidth}px`,
        height: "100%",
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="carousel-item-content">
        <div className="carousel-image-wrapper">
          <img
            src={item.image}
            alt={item.title}
            className="carousel-image"
            loading="lazy"
            decoding="async"
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          />
          <div className="carousel-category">{item.category}</div>
        </div>
        <div className="carousel-text">
          <h3 className="carousel-item-title">{item.title}</h3>
          <p className="carousel-item-description">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = typeof window !== "undefined" ? window.innerWidth * 0.9 : 1200,
  autoplay = true,
  autoplayDelay = 5000,
  pauseOnHover = true,
  loop = true,
}) {
  const containerPadding = 16;
  const itemWidth = Math.min(320, baseWidth - containerPadding * 2);
  const trackItemOffset = itemWidth + GAP;
  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  // Update active index
  useEffect(() => {
    const newIndex =
      items.length === 0
        ? 0
        : loop
          ? (position - 1 + items.length) % items.length
          : Math.min(position, items.length - 1);
    setActiveIndex(newIndex);
  }, [position, items.length, loop]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const goToSlide = (index) => {
    if (isAnimating) return;
    setPosition(index + 1);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setPosition((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    if (isAnimating) return;
    setPosition((prev) => Math.min(itemsForRender.length - 1, prev + 1));
  };

  return (
    <div className="carousel-wrapper">
      <div ref={containerRef} className="carousel-container">
        {/* Navigation Arrows */}
        <motion.button
          className="carousel-arrow carousel-arrow-prev"
          onClick={goToPrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </motion.button>
        <motion.button
          className="carousel-arrow carousel-arrow-next"
          onClick={goToNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.button>

        <motion.div
          className="carousel-track"
          drag="x"
          dragConstraints={{
            left: -trackItemOffset * (itemsForRender.length - 1),
            right: 0,
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -position * trackItemOffset }}
          transition={effectiveTransition}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
          style={{ x, gap: `${GAP}px` }}
        >
          {itemsForRender.map((item, index) => (
            <CarouselItem
              key={`${item.id}-${index}`}
              item={item}
              index={index}
              itemWidth={itemWidth}
              x={x}
            />
          ))}
        </motion.div>

        {/* Progress Indicators */}
        <div className="carousel-progress">
          {items.map((_, index) => (
            <motion.button
              key={index}
              className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
