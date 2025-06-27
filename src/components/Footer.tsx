// components/Footer.tsx
'use client'

import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-purple-600 text-white">
      {/* Yatay genişliği sınırlamak için max-w-screen-lg ekledik, dikey padding’i küçülttük */}
      <div className="max-w-screen-lg mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1️⃣ Hakkımızda */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/svgs/logo.svg"
              alt="Aysar Logo"
              width={32}
              height={32}
            />
            <span className="text-xl font-bold">Aysar</span>
          </div>
          <p className="text-sm leading-relaxed">
            Doğanın iyileştirici gücünü size sunuyoruz. Organik ürünlerle
            sağlıklı rutininizi zenginleştirin!
          </p>
          <div className="flex space-x-3">
            <Image src="/svgs/1.svg" width={24} height={24} alt="Twitter" />
            <Image src="/svgs/2.svg" width={24} height={24} alt="Facebook" />
            <Image src="/svgs/3.svg" width={24} height={24} alt="Instagram" />
            <Image src="/svgs/4.svg" width={24} height={24} alt="YouTube" />
          </div>
        </div>

        {/* 2️⃣ İletişim */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">İletişim</h3>
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="w-5 h-5" />
            <span>(454) 545 5454</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="w-5 h-5" />
            <span>info@aysar.com</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-5 h-5" />
            <span>Atakum/Samsun</span>
          </div>
        </div>

        {/* 3️⃣ Kategori & Öne Çıkanlar */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Kategori</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline">Kozmetik</a></li>
            <li><a href="#" className="hover:underline">Cilt Bakımı</a></li>
          </ul>
          <div className="flex space-x-2 mt-3">
            <Image src="/svgs/1.svg" alt="" width={56} height={56} className="rounded-lg object-cover" />
            <Image src="/svgs/2.svg" alt="" width={56} height={56} className="rounded-lg object-cover" />
            <Image src="/svgs/3.svg" alt="" width={56} height={56} className="rounded-lg object-cover" />
            <Image src="/svgs/4.svg" alt="" width={56} height={56} className="rounded-lg object-cover" />
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Alt telif notu da dikey padding’i azalttık */}
      <p className="text-center text-xs py-2">
        © 2025 Aysar, Tüm hakları saklıdır
      </p>
    </footer>
  )
}
