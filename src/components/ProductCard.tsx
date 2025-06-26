/* eslint-disable @next/next/no-img-element */
type Product = {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  sold?: number
}

export default function ProductCard({ product, showDiscount = false }: { product: Product; showDiscount?: boolean }) {
  const discount = product.oldPrice ? Math.round(100 - (product.price / product.oldPrice) * 100) : 0

  return (
    <div className="w-[160px] bg-white border rounded-lg shadow-sm overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-28 object-cover"
      />
      <div className="p-2">
        <h3 className="text-xs font-medium line-clamp-2">{product.name}</h3>
        <div className="mt-1 text-xs">
          {showDiscount && product.oldPrice ? (
            <div className="flex items-center gap-1 flex-wrap">
              <span className="line-through text-gray-400">{product.oldPrice.toFixed(2)} TL</span>
              <span className="font-bold text-red-600">{product.price.toFixed(2)} TL</span>
              <span className="bg-red-100 text-red-600 text-[10px] px-1 py-0.5 rounded">{discount}%</span>
            </div>
          ) : (
            <p className="font-bold">{product.price.toFixed(2)} TL</p>
          )}
        </div>
        {product.sold !== undefined && (
          <p className="text-[10px] text-gray-500 mt-1">{product.sold} Satıldı</p>
        )}
      </div>
    </div>
  )
}
