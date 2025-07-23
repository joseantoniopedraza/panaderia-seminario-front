'use client';

import { useState, useCallback } from 'react';
import { CartItem, ProductModel } from '@/types';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((product: ProductModel) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentItems, { product, quantity: 1 }];
      }
    });
  }, []);

  const updateQuantity = useCallback((productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
    } else {
      setItems(currentItems =>
        currentItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    isCartOpen,
    total,
    totalItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    openCart,
    closeCart,
  };
}
