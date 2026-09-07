// src/hooks/useCart.js
import { useMemo, useCallback } from 'react';
import useLocalStorage from './useLocalStorage.js';

function useCart() {
  const [cart, setCart] = useLocalStorage('vapesegy-cart', []);

  const addToCart = useCallback((product, quantity = 1) => {
    console.log('Adding to cart:', product);
    
    setCart(currentCart => {
      // Check if product already exists in cart
      const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
      
      let newCart;
      if (existingItemIndex !== -1) {
        // Product exists - update quantity
        newCart = [...currentCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity
        };
      } else {
        // Product doesn't exist - add new item
        newCart = [...currentCart, { ...product, quantity }];
      }
      
      console.log('Updated cart:', newCart);
      return newCart;
    });
  }, [setCart]);

  const removeFromCart = useCallback((productId) => {
    setCart(currentCart => {
      const newCart = currentCart.filter(item => item.id !== productId);
      console.log('Removed from cart:', newCart);
      return newCart;
    });
  }, [setCart]);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, [setCart, removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  console.log('Cart count:', cartCount, 'Cart items:', cart);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };
}

export default useCart;