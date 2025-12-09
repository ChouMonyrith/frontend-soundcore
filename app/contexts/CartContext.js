"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import cartService from "@/app/services/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ data: [], meta: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart({ data: [], meta: {} });
      setItemCount(0);
      return;
    }

    setIsLoading(true);
    try {
      const response = await cartService.getCart();
      setCart(response);
      const count = response.data.reduce((acc, item) => acc + item.quantity, 0);
      setItemCount(count);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, licenseType, quantity) => {
    try {
      await cartService.addToCart(productId, licenseType, quantity);
      await fetchCart();
      return { success: true };
    } catch (error) {
      console.error("Add to cart failed", error);
      return { success: false, error };
    }
  };

  const removeFromCart = async (id) => {
    try {
      await cartService.removeFromCart(id);
      await fetchCart();
    } catch (error) {
      console.error("Remove from cart failed", error);
    }
  };

  const updateCartItem = async (id, data) => {
    try {
      await cartService.updateCartItem(id, data);
      await fetchCart();
    } catch (error) {
      console.error("Update cart failed", error);
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart({ data: [], meta: {} });
      setItemCount(0);
    } catch (error) {
      console.error("Clear cart failed", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        itemCount,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
