import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("luxe_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("luxe_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, selectedSize = "", selectedColor = "") => {
    setCart(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );
      if (existing) {
        toast.success(`Updated quantity in cart`);
        return prev.map(item =>
          item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success(`${product.name} added to cart!`);
      return [...prev, { ...product, quantity, selectedSize, selectedColor }];
    });
  };

  const removeFromCart = (id, selectedSize = "", selectedColor = "") => {
    setCart(prev => prev.filter(
      item => !(item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
    ));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (id, quantity, selectedSize = "", selectedColor = "") => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("luxe_cart");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
