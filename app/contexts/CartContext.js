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
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ data: [], meta: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  // const [isAddedToCart, setIsAddedToCart] = useState(false);

  const isInCart = (productId) => {
    return cart.data.some((item) => item.product_id === productId);
  };

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
      toast.success("Item added to cart");
      return { success: true };
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("You already own this sound");
        return { success: false, error };
      }

      return { success: false, error };
    }
  };

  const removeFromCart = async (id) => {
    try {
      await cartService.removeFromCart(id);
      await fetchCart();
      toast.success("Item removed from cart");
      return { success: true };
    } catch (error) {
      toast.error("Failed to remove item from cart");
      return { success: false, error };
    }
  };

  const updateCartItem = async (id, data) => {
    try {
      await cartService.updateCartItem(id, data);
      await fetchCart();
      toast.success("Item updated in cart");
      return { success: true };
    } catch (error) {
      console.error("Update cart failed", error);
      toast.error("Failed to update item in cart");
      return { success: false, error };
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart({ data: [], meta: {} });
      setItemCount(0);
      toast.success("Cart cleared");
      return { success: true };
    } catch (error) {
      console.error("Clear cart failed", error);
      toast.error("Failed to clear cart");
      return { success: false, error };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        itemCount,
        isInCart,
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
