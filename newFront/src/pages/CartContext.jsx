import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Charger depuis localStorage si disponible
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };
const updateCartItemQuantity = (itemId, quantity) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
  );
};
const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem("cartItems"); // facultatif mais propre
};

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount ,removeFromCart ,updateCartItemQuantity,clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
