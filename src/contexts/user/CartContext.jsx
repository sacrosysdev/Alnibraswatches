import { useContext, createContext, useState, useEffect } from "react";


const CartContext = createContext()

export const CartProvider=({children})=>{
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
      });
    
      // Save wishlist to localStorage on every update
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);
    
    const addToCart=(item)=>{
        setCart((prev)=>{
            const existingItem = prev.find((i)=> item.id === i.id)
            if(existingItem){
                return prev.map((i)=>
                    item.id === i.id ? {...i, quantity: i.quantity + 1}:i
                );
            }
            return [...prev, {...item, quantity:1}]
        })
    };
    const decreaseFromCart=(id)=>{
        setCart((prev)=>{
            return prev.map((item)=>{
                if(item.id === id){
                    return {...item, quantity: item.quantity - 1}
                }return item
            }).filter((item)=> item.id !== id || item.quantity > 0)
        })
    };
    const removeItemFromCart =(id)=>{
        setCart((prev)=>{
            return prev.filter((item)=>item.id !== id)
        })
    };
    const clearCart = () => setCart([])

    return(
        <CartContext.Provider value={{cart, addToCart, decreaseFromCart, removeItemFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
