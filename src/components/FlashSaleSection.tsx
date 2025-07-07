// src/components/FlashSaleSection.tsx
'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

type Product = {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  sold?: number
}

export default function FlashSaleSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFlashProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_FAKESTORE_API}/products?limit=4`
        )
        if (!res.ok) throw new Error('Ağ hatası')
        const data: Array<{
          id: number
          title: string
          price: number
          image: string
        }> = await res.json()

        // Örnek mapping: eski fiyatı %50 indirimli fiyat üzerinden hesaplıyoruz,
        // sold sayısını rastgele atıyoruz.
        const mapped: Product[] = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          oldPrice: Number((item.price * 2).toFixed(2)),
          image: item.image,
          sold: Math.floor(Math.random() * 500) + 1,
        }))

        setProducts(mapped)
      } catch (err: unknown) {
    console.error(err)
    if (err instanceof Error) {
      setError(err.message)
    } else {
      setError('Ürünler yüklenemedi')
    }
  }finally {
        setLoading(false)
      }
    }

    fetchFlashProducts()
  }, [])

  if (loading) return <p className="p-4">Yükleniyor…</p>
  if (error) return <p className="p-4 text-red-500">Hata: {error}</p>

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Eylül Flaş Satışı ⚡</h2>
      <div className="w-full overflow-x-auto">
        <div className="flex flex-nowrap gap-4 pb-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} showDiscount />
          ))}
        </div>
      </div>
    </section>
  )
}
