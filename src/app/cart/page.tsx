// app/cart/page.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../../../src/context/CartContext'
  import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart()
  const total = items.reduce((sum, x) => sum + x.price * x.quantity, 0)
  const router = useRouter()


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
        {items.length === 0 ? (
          <p className="text-gray-800">Sepetinizde ürün bulunmuyor.</p>
        ) : (
          <>
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

            <div className="mt-10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-xl text-gray-900 font-semibold">
                Toplam: <span className="text-purple-600">₺{total.toFixed(2)}</span>
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => clearCart()}
                  className="px-5 py-2 bg-green-600 rounded-lg hover:bg-gray-300 transition"
                >
                  Sepeti Boşalt
                </button>
                <button
                  onClick={() => router.push('/checkout')}
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
