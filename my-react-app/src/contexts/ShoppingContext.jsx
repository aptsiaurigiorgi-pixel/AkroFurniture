import React, { createContext, useState, useContext, useEffect } from "react";

export const products = [
  {
    id: 1,
    title: "Premium Sofa",
    description: "Luxury leather sofa with reclining features",
    price: 1299,
    image: "/images/image1.jpg",
  },
  {
    id: 2,
    title: "Modern Dining Set",
    description: "6-seater dining set with marble table top",
    price: 1599,
    image: "/images/image2.jpg",
  },
  {
    id: 3,
    title: "Elegant Bedroom Set",
    description: "Complete bedroom set with storage solutions",
    price: 2199,
    image: "/images/image3.jpg",
  },
  {
    id: 4,
    title: "Glass Coffee Table",
    description: "Modern coffee table with steel frame",
    price: 499,
    image: "/images/image4.jpg",
  },
  {
    id: 5,
    title: "Minimalist Chair",
    description: "Stylish chair with ergonomic design",
    price: 399,
    image: "/images/image5.jpg",
  },
  {
    id: 6,
    title: "Designer Lamp",
    description: "Artistic lighting for your living space",
    price: 299,
    image: "/images/image6.jpg",
  },
  {
    id: 7,
    title: "Sofa Set",
    description: "Complete living room sofa set",
    price: 2499,
    image: "/images/photo1.jpg",
  },
  {
    id: 8,
    title: "Bedroom Set",
    description: "Complete bedroom furniture collection",
    price: 3499,
    image: "/images/photo2.jpg",
  },
  {
    id: 9,
    title: "Rustic Wooden Table",
    description: "Handcrafted wooden dining table with natural finish",
    price: 899,
    image: "/images/0b147017d6fbf800184d8875f54a2355.jpg",
  },
  {
    id: 10,
    title: "Contemporary Bookshelf",
    description: "Modern bookshelf with adjustable shelves",
    price: 699,
    image: "/images/0e8157c9471aeb365adf282c93ede2e4.jpg",
  },
  {
    id: 11,
    title: "Velvet Armchair",
    description: "Luxurious velvet armchair with tufted details",
    price: 599,
    image: "/images/2da3e6e70edda3b1ecd7f8b88db95545.jpg",
  },
  {
    id: 12,
    title: "Minimalist Desk",
    description: "Clean design desk for home office",
    price: 499,
    image: "/images/4b3a7150be11a581ff26f51baa3b2bac.jpg",
  },
  {
    id: 13,
    title: "Antique Mirror",
    description: "Vintage style mirror with ornate frame",
    price: 799,
    image: "/images/5cddeed48f751cdd0990025852f87c4c.jpg",
  },
  {
    id: 14,
    title: "Outdoor Patio Set",
    description: "Weather-resistant patio furniture set",
    price: 1899,
    image: "/images/9a6d98bc1146963eae6bda5d3eb13fc0.jpg",
  },
  {
    id: 15,
    title: "Modern Bookshelf",
    description: "Contemporary bookshelf with open design",
    price: 599,
    image: "/images/33a6f8d219fc10077936412ab756657a.jpg",
  },
  {
    id: 16,
    title: "Luxury Recliner",
    description: "Premium leather recliner with massage function",
    price: 899,
    image: "/images/70af9fcff8b8e56448b4085982d69f42.jpg",
  },
  {
    id: 17,
    title: "Dining Table",
    description: "Solid wood dining table with extendable leaves",
    price: 1299,
    image: "/images/81c5ab2e84afd66d15ed90583620311f.jpg",
  },
  {
    id: 18,
    title: "Velvet Sofa",
    description: "Plush velvet sofa with tufted backrest",
    price: 1599,
    image: "/images/87f298f483b1e2016651b190d6fbbe58.jpg",
  },
  {
    id: 19,
    title: "Coffee Table",
    description: "Round coffee table with marble top",
    price: 499,
    image: "/images/24118c9b3c56d300d5a26b860378dddb.jpg",
  },
  {
    id: 20,
    title: "Office Chair",
    description: "Ergonomic office chair with lumbar support",
    price: 399,
    image: "/images/94438c1537371e59815dd2c4a4ea2ea8.jpg",
  },
  {
    id: 21,
    title: "Wardrobe",
    description: "Large wardrobe with sliding doors",
    price: 1499,
    image: "/images/a72fb01cdb7eee1d3c45992e5d130bd7.jpg",
  },
  {
    id: 22,
    title: "Nightstand",
    description: "Modern nightstand with USB charging ports",
    price: 299,
    image: "/images/a083efb3a5f0438f6f442e95ca4a9c4f.jpg",
  },
  {
    id: 23,
    title: "TV Stand",
    description: "Entertainment center with media storage",
    price: 899,
    image: "/images/af8269e63e534c8e0d8b405433eaacfa.jpg",
  },
  {
    id: 24,
    title: "Dining Chairs",
    description: "Set of 4 upholstered dining chairs",
    price: 799,
    image: "/images/d69c4c58f8cc6c1d0283694744d4973d.jpg",
  },
  {
    id: 25,
    title: "Bar Stools",
    description: "Modern bar stools with adjustable height",
    price: 399,
    image: "/images/f53cc4e8b3f9012f2d460a94feb192c4.jpg",
  },
  {
    id: 26,
    title: "Coffee Set",
    description: "Complete coffee table set with matching chairs",
    price: 1199,
    image: "/images/photo3.jpg",
  },
];

const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast functions
  const addToast = (message, type = "success", duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    const savedAuth = localStorage.getItem("isLoggedIn");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedAuth) setIsLoggedIn(JSON.parse(savedAuth));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        addToast(`${product.title} quantity updated in cart`, "success");
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      addToast(`${product.title} added to cart`, "success");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        addToast(`${product.title} added to wishlist`, "success");
        return [...prev, product];
      }
      addToast(`${product.title} is already in your wishlist`, "info");
      return prev;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const login = (email, password) => {
    // This is a dummy login - replace with actual authentication
    if (email && password) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShoppingContext.Provider
      value={{
        products,
        cart,
        wishlist,
        isLoggedIn,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
        updateQuantity,
        login,
        logout,
        cartTotal,
        cartCount,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useShopping must be used within a ShoppingProvider");
  }
  return context;
};
