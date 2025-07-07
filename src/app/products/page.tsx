// app/products/page.tsx
'use client'

import { useCart } from '../../../src/context/CartContext'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
}

interface DummyAPIResponse {
  products: Array<{
    id: number
    title: string
    price: number
    category: string
    thumbnail: string
  }>
}

type Toast = { id: string; name: string } | null

export default function ProductsPage() {
  // --- Filtre & Arama State’leri ---
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // --- Sonsuz Kaydırma State’leri ---
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage]         = useState(0)
  const [loading, setLoading]   = useState(false)
  const [hasMore, setHasMore]   = useState(true)
  const loader = useRef<HTMLDivElement>(null)

  // --- Sepet & Toast State’leri ---
  const { addToCart, removeFromCart } = useCart()
  const [toast, setToast] = useState<Toast>(null)

  // --- Dinamik kategori listesi ---
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map(p => p.category)))],
    [products]
  )

  // --- Ürünleri API’den çek (infinite scroll) ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const limit = 20
        const skip  = page * limit
        const res   = await fetch(
          `${process.env.NEXT_PUBLIC_DUMMYJSON_API}/products?limit=${limit}&skip=${skip}`
        )
        if (!res.ok) throw new Error(`API hatası: ${res.status}`)

        const data: DummyAPIResponse = await res.json()
        const fetched: Product[] = data.products.map(p => ({
          id:       p.id.toString(),
          name:     p.title,
          category: p.category,
          price:    p.price,
          image:    p.thumbnail,
        }))

        setProducts(prev => {
          const incoming = fetched.filter(p => !prev.some(x => x.id === p.id))
          return [...prev, ...incoming]
        })
        setHasMore(fetched.length === limit)
      } catch (err) {
        console.error('fetchProducts error:', err)
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [page])

  // --- IntersectionObserver ile sayfanın sonuna gelince `page` artır ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1)
        }
      },
      { rootMargin: '200px' }
    )
    if (loader.current) observer.observe(loader.current)
    return () => observer.disconnect()
  }, [hasMore, loading])

  // --- 5 saniye sonra toast’ı kapat ---
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 5000)
    return () => clearTimeout(t)
  }, [toast])

  // --- Client-side filtreleme ---
  const filtered = useMemo(() => {
    return products.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
      if (category !== 'All' && p.category !== category)       return false
      const min = parseFloat(minPrice)
      const max = parseFloat(maxPrice)
      if (!isNaN(min) && p.price < min) return false
      if (!isNaN(max) && p.price > max) return false
      return true
    })
  }, [products, search, category, minPrice, maxPrice])

  return (
    <>
      {/* Hero / Breadcrumb */}
      <div className="bg-purple-600 text-white">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Tüm Ürünler</h1>
          <nav className="text-sm">
            <Link href="/" className="hover:underline">Anasayfa</Link>
            <span className="mx-2">/</span>
            <span>Tüm Ürünler</span>
          </nav>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <input
                type="text"
                placeholder="Ürün ara…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="
                  w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500
                  border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-purple-600
                  transition
                "
              />
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="
                  w-full px-4 py-3 bg-white text-gray-900
                  border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-purple-600
                  transition appearance-none
                "
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Min ₺"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                className="
                  w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500
                  border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-purple-600
                  transition
                "
              />
              <input
                type="number"
                placeholder="Max ₺"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                className="
                  w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500
                  border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-purple-600
                  transition
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ürünler Grid */}
      <div className="bg-white py-10">
        <div className="container mx-auto px-6">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((product, idx) => (
                <div
                  key={`${product.id}-${idx}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition"
                >
                  <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-3">
                      Kategori: <span className="font-medium">{product.category}</span>
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-bold text-green-600">
                        ₺{product.price}
                      </span>
                      <button
                        onClick={() => {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          })
                          setToast({ id: product.id, name: product.name })
                        }}
                        className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition text-sm"
                      >
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Filtrelerinize uygun ürün bulunamadı.
            </p>
          )}

          {/* Loading & Sentinel & No More */}
          {loading && <p className="text-center py-4">Yükleniyor…</p>}
          <div ref={loader} />
          {!hasMore && !loading && (
            <p className="text-center py-4 text-gray-500">Daha fazla ürün yok.</p>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-white border border-gray-200 shadow-lg px-4 py-3 rounded-lg flex items-center space-x-4 animate-fade-in">
          <span className="font-medium text-gray-500">{toast.name} sepete eklendi!</span>
          <button
            onClick={() => {
              removeFromCart(toast.id)
              setToast(null)
            }}
            className="text-red-600 hover:underline text-sm"
          >
            Kaldır
          </button>
        </div>
      )}
    </>
  )
}
