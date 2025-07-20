// components/Footer.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const gallery = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
  ]

  const categories = [
    { name: 'Kozmetik', href: '/kozmetik' },
    { name: 'Cilt Bakımı', href: '/cilt-bakimi' },
  ]

  const socials = [
    {
      src: '/svgs/Vector.svg',
      alt: 'Twitter',
      href: 'https://twitter.com',
      label: 'Twitter hesabımız',
    },
    {
      src: '/svgs/Vector-2.svg',
      alt: 'Facebook',
      href: 'https://facebook.com',
      label: 'Facebook hesabımız',
    },
    {
      src: '/svgs/Vector-3.svg',
      alt: 'Instagram',
      href: 'https://instagram.com',
      label: 'Instagram hesabımız',
    },
    {
      src: '/svgs/Vector-4.svg',
      alt: 'YouTube',
      href: 'https://youtube.com',
      label: 'YouTube kanalımız',
    },
  ]

  return (
    <footer className="bg-purple-600 text-white">
      <div className="max-w-screen-lg mx-auto px-4 py-4 md:px-6 md:py-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* 1️⃣ Hakkımızda */}
        <div className="space-y-2 md:space-y-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/svgs/logo.svg"
              alt="Aysar logosu"
              width={32}
              height={32}
            />
            <span
              className="text-2xl font-extrabold
                         bg-clip-text text-transparent
                         bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600"
            >
              Aysar
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Eğlenceli ve sıradışı ürünlerimizle her gününüze küçük bir sürpriz
            katıyoruz. Sorularınız ve önerileriniz için samimi ekibimiz her zaman
            yanınızda.
          </p>
          <div className="flex space-x-3">
            {socials.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={item.src}
                  width={24}
                  height={24}
                  alt={item.alt}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* 2️⃣ İletişim */}
        <div className="space-y-2 md:space-y-3">
          <h3 className="text-lg font-semibold">İletişim</h3>
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="w-5 h-5" aria-hidden="true" />
            <span>(454) 545 5454</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="w-5 h-5" aria-hidden="true" />
            <span>info@aysar.com</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-5 h-5" aria-hidden="true" />
            <span>Atakum/Samsun</span>
          </div>
        </div>

        {/* 3️⃣ Kategori & Öne Çıkanlar */}
        <div className="space-y-2 md:space-y-3">
          <h3 className="text-lg font-semibold">Kategori</h3>
          <nav aria-label="Footer kategori navigasyonu">
            <ul className="text-sm space-y-1">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link href={cat.href} className="hover:underline">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex space-x-2 mt-3">
            {gallery.map((src, i) => (
              <Image
                key={i}
                src={src}
                width={56}
                height={56}
                className="rounded-lg object-cover"
                alt={`Ürün ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <hr className="border-purple-500" />

      <p className="text-center text-xs py-2">
        © 2025 Aysar, Tüm hakları saklıdır
      </p>
    </footer>
  )
}
