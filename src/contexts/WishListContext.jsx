import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const WishlistContext = createContext();

// Provider Component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  // Save wishlist to localStorage on every update
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      return exists ? prev : [...prev, item];
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the context
export const useWishlist = () => useContext(WishlistContext);
