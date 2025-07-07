// components/Navbar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../../src/context/CartContext'

export default function Navbar() {
  const path = usePathname()
  const router = useRouter()
  const { items } = useCart()
  const totalCount = items.reduce((sum, x) => sum + x.quantity, 0)
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Anasayfa',    href: '/'        },
    { label: 'Hakkımızda',   href: '/about'   },
    { label: 'Tüm Ürünler',  href: '/products'},
    { label: 'İletişim',     href: '/contact' },
    { label: 'Blog',         href: '/blog'    },
  ]

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/svgs/logo.svg"
              alt="Aysar Logo"
              width={48}
              height={48}
            />
            <span
              className="text-2xl font-extrabold
                         bg-clip-text text-transparent
                         bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600"
            >
              Aysar
            </span>
          </Link>

          {/* Desktop Menü */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Nav Links */}
            <nav className="space-x-6">
              {links.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={
                    path === l.href
                      ? 'text-green-600 font-semibold'
                      : 'text-gray-700 hover:text-green-600'
                  }
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Auth Butonları */}
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

            {/* İkonlar & Avatar */}
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-600 hover:text-gray-800" />

              {/* Sepet İkonu */}
              <button
                onClick={() => router.push('/cart')}
className="
   relative
   p-2                
   rounded-full       
   hover:bg-gray-100  
   transition-colors 
"                aria-label="Sepete git"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                {totalCount > 0 && (
                  <span className="
                    absolute -top-2 -right-2
                    bg-red-500 text-white
                    text-xs font-semibold
                    w-5 h-5 rounded-full
                    flex items-center justify-center
                  ">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Kullanıcı Avatar */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src="/images/girl.jpg"
                    alt="Melek"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Melek</p>
                  <p className="text-green-500">Online</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menü Toggle & İkonlar */}
          <div className="flex lg:hidden items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600 hover:text-gray-800" />

            {/* Mobil Sepet İkonu */}
            <button
              onClick={() => router.push('/cart')}
              className="relative"
              aria-label="Sepete git"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-gray-800" />
              {totalCount > 0 && (
                <span className="
                  absolute -top-2 -right-2
                  bg-red-500 text-white
                  text-xs font-semibold
                  w-4 h-4 rounded-full
                  flex items-center justify-center
                ">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobil Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/images/girl.jpg"
                alt="Melek"
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Menü Aç/Kapat Butonu */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label="Menüyü aç/kapat"
            >
              {open
                ? <X className="w-6 h-6 text-gray-800" />
                : <Menu className="w-6 h-6 text-gray-800" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Collapse Menü */}
        <div
          className={`
            lg:hidden mt-4 space-y-4 overflow-hidden
            transition-[max-height] duration-300 ease-in-out
            ${open ? 'max-h-96' : 'max-h-0'}
          `}
        >
          {/* Nav Links */}
          <nav className="flex flex-col space-y-2">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  path === l.href
                    ? 'block px-4 py-2 text-green-600 font-semibold'
                    : 'block px-4 py-2 text-gray-700 hover:text-green-600'
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Arama (Mobil) */}
          <input
            type="text"
            placeholder="Ürün Ara"
            className="w-full border rounded px-4 py-2 focus:outline-green-500"
          />

          {/* Auth Butonları (Mobil) */}
          <div className="flex flex-col space-y-2">
            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Giriş
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
