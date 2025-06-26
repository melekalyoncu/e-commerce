'use client'

const categories = [
  { name: "Popüler Ürünler", color: "bg-purple-500", stock: 341 },
  { name: "Favoriler", color: "bg-pink-500", stock: 422 },
  { name: "Yeni Moda 2024", color: "bg-blue-500", stock: 298 },
  { name: "En Çok Arananlar", color: "bg-green-500", stock: 182 },
  { name: "En Yeniler", color: "bg-yellow-400", stock: 52 },
]

export default function CategoryButtons() {
  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">Artık Seçmek Daha Kolay</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`text-white px-4 py-2 rounded shadow text-sm ${cat.color}`}
          >
            {cat.name} <span className="ml-2 text-xs bg-white text-black px-1.5 py-0.5 rounded">{cat.stock} Stok</span>
          </button>
        ))}
      </div>
    </section>
  )
}
