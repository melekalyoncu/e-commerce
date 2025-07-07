// app/checkout/cancel/page.tsx
import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="container mx-auto px-6 py-10 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Ödeme İptal Edildi
      </h1>
      <p className="mb-6">Ödeme işlemi tamamlanamadı.</p>
      <Link
        href="/cart"
        className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        Sepete Geri Dön
      </Link>
    </div>
  )
}
