// components/ProductList.tsx
import ProductCard from './ProductCard'

type Product = {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  sold?: number
}

const products: Product[] = [
  { id: 1, name: 'Lavanta Yağı', price: 79.99, oldPrice: 99.99, image: '/images/girl.webp', sold: 10 },
  { id: 2, name: 'Gül Suyu', price: 49.99, image: '/images/girl.webp', sold: 25 },
  // …
]

export default function ProductList() {
  return (
    <div className="flex overflow-x-auto gap-3 p-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} showDiscount />
      ))}
    </div>
  )
}
