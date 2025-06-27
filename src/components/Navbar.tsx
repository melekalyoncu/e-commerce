'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Bell, ShoppingCart } from 'lucide-react'

export default function Navbar() {
  const path = usePathname()

  const links = [
    { label: 'Anasayfa', href: '/' },
    { label: 'Hakkımızda', href: '/about' },
    { label: 'Tüm Ürünler', href: '/products' },
    { label: 'İletişim', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ]

  return (
<header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex flex-col gap-0">
        
        {/* 1️⃣ Logo */}
        <div>
          <Image
            src="/svgs/logo.svg"
            alt="Aysar Logo"
            width={94}
            height={94}
          />
        </div>

        {/* 2️⃣ Aysar + Arama + Auth */}
        <div className="flex items-center justify-between">
          <span
            className="
              text-4xl font-extrabold  
              bg-clip-text text-transparent 
              bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 
              drop-shadow-lg
            "
          >
            Aysar
          </span>

          <input
            type="text"
            placeholder="Ürün Ara"
            className="flex-1 max-w-lg mx-6 border rounded px-4 py-2 focus:outline-green-500"
          />

          <div className="flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Giriş
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>

        {/* 3️⃣ Sayfa linkleri + ikonlar + kullanıcı */}
        <div className="flex items-center justify-between border-t pt-4 mt-4">
          <nav className="space-x-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`${
                  path === l.href
                    ? 'text-green-600 font-semibold'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-600 hover:text-gray-800" />
            <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-gray-800" />
            <div className="flex items-center space-x-2">
              {/* avatar wrapper */}
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/images/girl.jpg"
                  alt="Melek"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* kullanıcı adı */}
              <div className="text-sm">
                <p className="font-medium text-gray-900">Melek</p>
                <p className="text-green-500">Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
