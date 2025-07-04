'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Bell, ShoppingCart, Menu, X } from 'lucide-react'

export default function Navbar() {
  const path = usePathname()
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

          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/svgs/logo.svg"
              alt="Aysar Logo"
              width={48}
              height={48}
            />
            <span className="text-2xl font-extrabold
                             bg-clip-text text-transparent
                             bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600">
              Aysar
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {/* Nav Links */}
            <nav className="space-x-6">
              {links.map((l) => (
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

            {/* Auth Buttons */}
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

            {/* Icons & User Avatar */}
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-600 hover:text-gray-800" />
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-gray-800" />
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

          {/* Mobile & md (<lg): Icons + Avatar  */}
          <div className="flex lg:hidden items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600 hover:text-gray-800" />
            <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-gray-800" />
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/images/girl.jpg"
                alt="Melek"
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menüyü aç/kapat"
            >
              {open
                ? <X className="w-6 h-6 text-gray-800" />
                : <Menu className="w-6 h-6 text-gray-800" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Collapse Menu (<lg) */}
        <div
          className={
            `lg:hidden mt-4 space-y-4 overflow-hidden
            transition-[max-height] duration-300 ease-in-out
            ${open ? 'max-h-96' : 'max-h-0'}`
          }
        >
          {/* Nav Links */}
          <nav className="flex flex-col space-y-2">
            {links.map((l) => (
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

          {/* Search */}
          <input
            type="text"
            placeholder="Ürün Ara"
            className="w-full border rounded px-4 py-2 focus:outline-green-500"
          />

          {/* Auth Buttons */}
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
  