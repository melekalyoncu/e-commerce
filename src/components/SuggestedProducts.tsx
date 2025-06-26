// components/SuggestedProducts.tsx
import ProductCard from './ProductCard'

type Product = {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  sold?: number
}

const suggested: Product[] = [
  { id: 101, name: 'Biberiye Yağı', price: 19.0, image: '/images/4.jpg', sold: 150 },
  { id: 102, name: 'Kekik Yağı',    price: 17.34, image: '/images/3.jpg', sold: 200 },
  // … diğer önerilenler
]

export default function SuggestedProducts() {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bugün Senin İçin Seçtiklerimiz</h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {suggested.map(p => (
          <ProductCard key={p.id} product={p} showDiscount={false} />
        ))}
      </div>
    </section>
  )
}
