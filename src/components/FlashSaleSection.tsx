// src/components/FlashSaleSection.tsx
'use client'
import ProductCard from './ProductCard'

type Product = {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  sold?: number
}

const flashProducts: Product[] = [
  { id: 1, name: "Lavanta Sabunu", price: 10.0, oldPrice: 20.0, image: "/images/3.jpg", sold: 100 },
  { id: 2, name: "Lavanta Mumları", price: 15.0, oldPrice: 35.0, image: "/images/4.jpg", sold: 320 },
  // … diğer ürünler
]

export default function FlashSaleSection() {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Eylül Flaş Satışı ⚡</h2>

   <div className="w-full overflow-x-auto">
       <div className="flex flex-nowrap gap-4 pb-4">
          {flashProducts.map((p) => (
            <ProductCard key={p.id} product={p} showDiscount />
          ))}
        </div>
      </div>
    </section>
  )
}
