'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

const MIN_TOTAL_TL = 20.0  // Ödeme için izin verilen en düşük tutar

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart()
  const total = items.reduce((sum, x) => sum + x.price * x.quantity, 0)
  const router = useRouter()

  // Alert mesajı kontrolü
  const [alertMessage, setAlertMessage] = useState<string | null>(null)

  const handleProceed = () => {
    if (total < MIN_TOTAL_TL) {
      setAlertMessage(`Sipariş toplamı en az ${MIN_TOTAL_TL.toFixed(2)} TL olmalıdır.`)
      return
    }
    setAlertMessage(null)
    router.push('/checkout')
  }

  return (
    <>
      {/* Başlık ve Breadcrumb */}
      <div className="bg-purple-600 text-white">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Sepetim</h1>
          <nav className="text-sm opacity-75">
            <Link href="/" className="hover:opacity-100 transition-opacity">
              Anasayfa
            </Link>
            <span className="mx-2">/</span>
            <span>Sepetim</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* Uyarı kartı */}
        {alertMessage && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded shadow">
            <div className="flex items-start">
              <svg
                className="h-6 w-6 text-yellow-400 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 9v.01M12 12v.01M12 15v.01"
                />
              </svg>
              <p className="ml-3 text-sm text-yellow-700 flex-1">{alertMessage}</p>
              <button
                onClick={() => setAlertMessage(null)}
                className="ml-4 text-yellow-500 hover:text-yellow-700 focus:outline-none"
              >
                <span className="sr-only">Kapat</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <p className="text-gray-800">Sepetinizde ürün bulunmuyor.</p>
        ) : (
          <>
            {/* Ürün listesi */}
            <ul className="space-y-6">
              {items.map(item => (
                <li key={item.id} className="flex items-center space-x-6">
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-gray-600">
                      ₺{item.price.toFixed(2)} × {item.quantity} ={' '}
                      <span className="font-medium text-gray-800">
                        ₺{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-purple-600 hover:text-purple-800 text-sm transition"
                  >
                    Kaldır
                  </button>
                </li>
              ))}
            </ul>

            {/* Alt bölüm: Alışverişe Devam Et, Sepeti Boşalt, Ödemeye Git */}
            <div className="mt-10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-xl text-gray-900 font-semibold">
                Toplam: <span className="text-purple-600">₺{total.toFixed(2)}</span>
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Alışverişe Devam Et
                </Link>
                <button
                  onClick={() => clearCart()}
                  className="px-5 py-2 bg-green-600 rounded-lg hover:bg-green-700 text-white transition"
                >
                  Sepeti Boşalt
                </button>
                <button
                  onClick={handleProceed}
                  className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Ödemeye Git
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
