// app/checkout/success/page.tsx
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-6 py-10 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Ödeme Başarılı! 🎉
      </h1>
      <p className="mb-6">Siparişiniz alındı, teşekkürler!</p>
      <Link
        href="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Anasayfaya Dön
      </Link>
    </div>
  )
}
