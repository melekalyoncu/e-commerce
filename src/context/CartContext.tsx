'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const exist = prev.find(x => x.id === item.id)
      if (exist) {
        return prev.map(x =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(x => x.id !== id))
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
