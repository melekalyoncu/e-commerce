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
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Artık Seçmek Daha Kolay</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`
              text-white 
              px-8 py-5      
              rounded-xl    
              shadow-lg      
              text-lg        
              min-w-[180px]  
              ${cat.color}
            `}
          >
            {cat.name}
            <span className="
              ml-3 
              text-sm        /* rozet metni biraz büyüdü */
              bg-white 
              text-black 
              px-2 py-1      /* rozet padding arttı */
              rounded
            ">
              {cat.stock} Stok
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
