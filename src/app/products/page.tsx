// app/products/page.tsx
'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
}

const products: Product[] = [
  { id: '1', name: 'Organik Sebze Sepeti',    category: 'Sebze',       price: 120, image: '/images/4.jpg' },
  { id: '2', name: 'Taze Meyve Paketi',       category: 'Meyve',       price: 95,  image: '/images/3.jpg' },
  { id: '3', name: 'Ev Yapımı Zeytinyağı',    category: 'Yağ',         price: 80,  image: '/images/2.jpg' },
  { id: '4', name: 'Glutensiz Ekmek',         category: 'Unlu Mamul',  price: 45,  image: '/images/1.jpg' },
  // …daha fazla ürün ekleyebilirsin
]

export default function ProductsPage() {
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('All')
  const [minPrice, setMinPrice]   = useState('')
  const [maxPrice, setMaxPrice]   = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cart, setCart]           = useState<Product[]>([])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map(p => p.category)))],
    []
  )

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
      if (category !== 'All' && p.category !== category) return false
      const min = parseFloat(minPrice), max = parseFloat(maxPrice)
      if (!isNaN(min) && p.price < min) return false
      if (!isNaN(max) && p.price > max) return false
      return true
    })
  }, [search, category, minPrice, maxPrice])

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product])
    alert(`"${product.name}" sepete eklendi!`)
  }

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
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Ürün Ara"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-purple-500 input-fade"
              />
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-purple-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Min Fiyat (₺)"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-purple-500 input-fade"
              />
              <input
                type="number"
                placeholder="Max Fiyat (₺)"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-purple-500 input-fade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="bg-white py-10">
        <div className="container mx-auto px-6">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map(product => (
                <div
                  key={product.id}
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
                        onClick={() => handleAddToCart(product)}
                        className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition text-sm cursor-pointer"
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
        </div>
      </div>
    </>
  )
}
