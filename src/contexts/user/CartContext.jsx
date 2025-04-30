import { useContext, createContext, useState, useEffect } from "react";
import { useAddToCart, useGetCart, useUpdateCartItem, useDeleteCartItem } from "../../api/user/hooks";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [localCartlist, setLocalCartlist] = useState(() => {
    try {
      const stored = localStorage.getItem("cartlist");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  });

  const [previousLoginState, setPreviousLoginState] = useState(null);
  const userId = localStorage.getItem("alNibrazUserId");
  
  const { 
    data: serverCart = [],
    refetch, 
    isLoading: isLoadingCart 
  } = useGetCart() || {};
  
  const addMutation = useAddToCart();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useDeleteCartItem();

  // Track login status changes
  useEffect(() => {
    const currentLoginState = !!userId;
    
    // Detect login (previous state was no userId, current state has userId)
    if (currentLoginState && previousLoginState === false) {
      syncLocalCartToServer();
    }
    
    setPreviousLoginState(currentLoginState);
  }, [userId]);

  // Sync local storage for guest users
  useEffect(() => {
    if (!userId) {
      localStorage.setItem("cartlist", JSON.stringify(localCartlist));
    }
  }, [localCartlist, userId]);

  // Function to sync local cart to server when user logs in
  const syncLocalCartToServer = async () => {
    if (!userId || localCartlist.length === 0) return;
    
    try {
      // Get the latest server cart first
      await refetch();
      
      // Add local cart items to server one by one
      for (const item of localCartlist) {
        const serverItem = serverCart.find(
          si => si.ProductId === item.ProductId && si.VariantId === item.VariantId
        );
        
        if (serverItem) {
          // Item exists in server cart, update quantity
          await updateMutation.mutateAsync({
            cartId: serverItem.id,
            quantity: serverItem.quantity + item.Quantity
          });
        } else {
          // Item doesn't exist in server cart, add it
          await addMutation.mutateAsync({
            productId: item.ProductId,
            variantId: item.VariantId,
            quantity: item.Quantity
          });
        }
      }
      
      // Clear local cart after successful sync
      setLocalCartlist([]);
      localStorage.removeItem("cartlist");
      
      // Refresh server cart to get updated data
      await refetch();
    } catch (error) {
      console.error("Failed to sync local cart to server:", error);
    }
  };

  const addToCartlist = async (item) => {
    if (userId) {
      try {
        await addMutation.mutateAsync(item);
        await refetch();
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    } else {
      // Guest user - add to localStorage
      const normalizedItem = {
        ProductId: item.productId,
        Quantity: item.quantity || 1,
        VariantId: item.variantId,
        PrimaryImageUrl: item.PrimaryImageUrl,
        Price: item.Price,
        ProductName: item.ProductName,
        DiscountPrice: item.DiscountPrice
      };

      setLocalCartlist((prev) => {
        const existingItemIndex = prev.findIndex(
          (i) => i.ProductId === normalizedItem.ProductId && 
                 i.VariantId === normalizedItem.VariantId
        );
        
        if (existingItemIndex !== -1) {
          // Item exists, update quantity
          const updatedCart = [...prev];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            Quantity: updatedCart[existingItemIndex].Quantity + normalizedItem.Quantity
          };
          return updatedCart;
        }
        
        // Item doesn't exist, add it
        return [...prev, normalizedItem];
      });
    }
  };

  const updateCartItem = async (item) => {
    if (userId) {
      try {
        await updateMutation.mutateAsync(item);
        await refetch();
      } catch (error) {
        console.error("Failed to update cart item:", error);
      }
    } else {
      setLocalCartlist((prev) => 
        prev.map(cartItem => 
          (cartItem.ProductId === item.ProductId) 
            ? { ...cartItem, ...item } 
            : cartItem
        )
      );
    }
  };

  const removeFromCart = async (cartId) => {
    if (userId) {
      try {
        await removeMutation.mutateAsync(cartId);
        await refetch();
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    } else {
      setLocalCartlist((prev) => 
        prev.filter(item => item.ProductId !== cartId && item.id !== cartId)
      );
    }
  };

  const clearCart = async () => {
    if (userId) {
      try {
        // This should be implemented based on your backend API
        // For example, a dedicated endpoint to clear the entire cart
        await refetch();
      } catch (error) {
        console.error("Failed to clear cart:", error);
      }
    } else {
      setLocalCartlist([]);
      localStorage.removeItem("cartlist");
    }
  };

  const cartItemsCount = (userId ? serverCart : localCartlist).reduce(
    (total, item) => total + (parseInt(item.Quantity || item.quantity) || 1), 
    0
  );

  const cartTotal = (userId ? serverCart : localCartlist).reduce(
    (total, item) => {
      const price = item.Price || item.price || 0;
      const quantity = parseInt(item.Quantity || item.quantity) || 1;
      return total + (price * quantity);
    }, 
    0
  );

  const activeCartList = userId ? serverCart : localCartlist;
  const isLoading = userId ? isLoadingCart : false;

  return (
    <CartContext.Provider 
      value={{ 
        cart: activeCartList,
        isLoading,
        cartItemsCount,
        cartTotal,
        addToCartlist,
        updateCartItem,
        removeFromCart,
        clearCart,
        syncLocalCartToServer  // Expose sync function if you need to trigger it manually
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};