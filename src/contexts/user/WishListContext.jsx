import { createContext, useContext, useState, useEffect } from "react";
import {
  useAddWishlist,
  useGetWishlist,
  useRemoveWishlist,
} from "../../api/user/hooks";
import { useAuth } from "./AuthContext";

// Create Context
const WishlistContext = createContext();

// Provider Component
export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [localWishlist, setLocalWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  const {
    data: serverWishlist = [],
    refetch,
    isLoading: isLoadingWishlist,
  } = useGetWishlist({
    enabled: Boolean(isAuthenticated), // Only fetch when authenticated
  });

  const addMutation = useAddWishlist();
  const removeMutation = useRemoveWishlist();

  // Local state to track items being removed (for optimistic UI updates)
  const [pendingRemovals, setPendingRemovals] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("wishlist", JSON.stringify(localWishlist));
    }
  }, [localWishlist, isAuthenticated]);

  // When user logs in, merge their local wishlist with the server one
  useEffect(() => {
    const syncWishlist = async () => {
      if (isAuthenticated && localWishlist.length > 0) {
        try {
          // Add each local wishlist item to server
          for (const item of localWishlist) {
            await addMutation.mutateAsync({
              id: item.ProductId,
              variantId: item.variantId,
            });
          }
          // After syncing, clear the localWishlist
          setLocalWishlist([]);
          localStorage.removeItem("wishlist");

          // Refetch server wishlist to update UI
          refetch();
        } catch (error) {
          console.error("Failed to sync wishlist:", error);
        }
      }
    };

    syncWishlist();
  }, [isAuthenticated]);

  const addToWishlist = async (item) => {
    if (isAuthenticated) {
      try {
        await addMutation.mutateAsync(item);
        refetch();
      } catch (error) {
        console.error("Failed to add item to wishlist:", error);
      }
    } else {
      // Guest user - add to localStorage
      const normalizedItem = {
        ProductId: item.id,
        PrimaryImageUrl: item.image || "",
        ProductName: item.title || "",
        BrandName: item.brand || "",
        Price: item.price,
        variantId: item.variantId,
      };

      setLocalWishlist((prev) => {
        const exists = prev.find((i) => i.ProductId === item.id);
        if (exists) return prev;
        return [...prev, normalizedItem];
      });
    }
  };

  const removeFromWishlist = async (item) => {
    const id = typeof item === "object" ? item.id : item;
    const variantId = typeof item === "object" ? item.variantId : -1;
    if (isAuthenticated) {
      try {
        // Add to pending removals for optimistic UI update
        setPendingRemovals((prev) => [...prev, id]);
        // Call API to remove from server
        await removeMutation.mutateAsync({
          id,
          variantId,
        });

        // After successful removal, refetch and clear this item from pending removals
        await refetch();
        setPendingRemovals((prev) => prev.filter((id) => id !== id));
      } catch (error) {
        setPendingRemovals((prev) => prev.filter((id) => id !== id));
      }
    } else {
      // Guest user - remove from localStorage
      setLocalWishlist((prev) => prev.filter((item) => item.ProductId !== id));
    }
  };

  const clearWishlist = () => {
    if (isAuthenticated) {
      // Potentially implement server-side clearing if available
      refetch();
    } else {
      setLocalWishlist([]);
      localStorage.removeItem("wishlist");
    }
  };

  const activeWishlist = isAuthenticated
    ? serverWishlist.filter((item) => !pendingRemovals.includes(item.ProductId))
    : localWishlist;

  // Check if an item is in the wishlist
  const isInWishlist = (itemId) => {
    if (pendingRemovals.includes(itemId)) {
      return false; // Item is being removed
    }
    return activeWishlist.some((item) => item.ProductId === itemId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: activeWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        isLoading: isAuthenticated
          ? isLoadingWishlist ||
            addMutation.isLoading ||
            removeMutation.isLoading
          : false,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the context
export const useWishlist = () => useContext(WishlistContext);
