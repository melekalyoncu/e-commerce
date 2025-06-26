'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-100 p-4 shadow">
      <div className="flex justify-between max-w-5xl mx-auto">
        <Link href="/" className="font-bold text-xl text-blue-600">E-Ticaret</Link>
        <div className="flex gap-4">
          <Link href="/about" className="hover:underline">Hakkımızda</Link>
          <Link href="/contact" className="hover:underline">İletişim</Link>
          <Link href="/cart" className="hover:underline">Sepet</Link>
        </div>
      </div>
    </nav>
  )
}
