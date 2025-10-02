// app/checkout/page.tsx
'use client'

import React, { useState } from 'react'
import { useCart } from '../../../src/context/CartContext'

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const total = items.reduce((sum, x) => sum + x.price * x.quantity, 0)

  const handleCheckout = async () => {
  setLoading(true)
  try {
    const res = await fetch('/checkout/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map(i => ({
          name:     i.name,
          price:    i.price,
          quantity: i.quantity,
        })),
      }),
    })

    const data = await res.json()

    if (!res.ok) {
     console.error('API hata:', data.error) 

      throw new Error(data.error || `HTTP ${res.status}`)
    }

      if (!data.url) {
    console.error('URL yok veya boş geldi:', data)
      throw new Error('Session URL gelmedi')
    }
   console.log('➡️ Yönlendiriliyor:', data.url)

    clearCart()
    window.location.href = data.url
  } catch (err: unknown) {
     if (err instanceof Error) {
       alert(`Ödeme başlatılamadı: ${err.message}`)
    } else {
       alert('Ödeme başlatılamadı: Bilinmeyen hata')
     }
    setLoading(false)
  }
}


  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-purple-600 mb-6">Ödeme</h1>

      {items.length === 0 ? (
        <p className="text-gray-700">Sepetinizde ürün yok.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-8">
            {items.map(i => (
              <li key={i.id} className="flex justify-between">
                <span>{i.name} × {i.quantity}</span>
                <span>₺{(i.price * i.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold">Toplam:</span>
            <span className="text-xl font-bold text-purple-600">
              ₺{total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="
              w-full px-6 py-3
              bg-green-500 text-white font-semibold
              rounded-lg hover:bg-green-700 disabled:opacity-50
              transition
            "
          >
            {loading ? 'Yönlendiriliyor…' : 'Ödemeye Git'}
          </button>
        </>
      )}
    </div>
  )
}
