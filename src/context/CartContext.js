import { createContext, useState, useContext } from "react";
import { addToCart as apiAddToCart } from "../api/clothes";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (product) => {
    try {
      console.log("Adding to cart:", product); // Log the product for debugging
      // Call the backend API with only id and quantity
      await apiAddToCart(product.clothId, product.quantity || 1);

      // Update local state
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (item) => item.clothId === product.clothId
        );
        if (existingItem) {
          return prevCart.map((item) =>
            item.clothId === product.clothId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
    } catch (error) {
      console.error("Failed to add to cart:", error.message);
      alert(error.message); // Show backend error message
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (clothId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.clothId === clothId
          ? { ...item, quantity: Math.max(1, newQuantity) } // Ensure quantity doesn't go below 1
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
