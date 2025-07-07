// components/SuggestedProducts.tsx
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

interface DummyAPIResponse {
  products: Array<{
    id: number
    title: string
    price: number
    discountPercentage: number
    thumbnail: string
  }>
}

export default function SuggestedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
  async function fetchSuggested() {
    try {
      const limit = 6
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DUMMYJSON_API}/products?limit=${limit}`
      )
      if (!res.ok) throw new Error(`Ağ Hatası: ${res.status}`)
      const data = (await res.json()) as DummyAPIResponse

      const mapped = data.products.map(p => ({
        id:       p.id,
        name:     p.title,
        price:    p.price,
        oldPrice: Number((p.price / (1 - p.discountPercentage / 100)).toFixed(2)),
        image:    p.thumbnail,
        sold:     Math.floor(Math.random() * 500) + 50,
      }))

      setProducts(mapped)
    } catch (err) {
      console.error('fetchSuggested error:', err)
      // err otomatik unknown kabul edilir; instanceof ile daraltıyoruz
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Ürünler yüklenemedi')
      }
    } finally {
      setLoading(false)
    }
  }

  fetchSuggested()
}, [])


  if (loading) return <p className="p-4 text-center">Yükleniyor…</p>
  if (error)   return <p className="p-4 text-center text-red-500">Hata: {error}</p>

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bugün Senin İçin Seçtiklerimiz</h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {products.map(p => (
          <ProductCard key={p.id} product={p} showDiscount={false} />
        ))}
      </div>
    </section>
  )
}
