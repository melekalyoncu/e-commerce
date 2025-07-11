'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Phone, Mail, MapPin } from 'lucide-react'

// Harita bileşenini client-side olarak import ediyoruz
const Map = dynamic(
  () => import('@/components/Map').then((mod) => mod.Map),
  { ssr: false }
)

export default function ContactPage() {
  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  // Input ve textarea değişimlerini yakala
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Form gönderme handler’ı
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Gönderilen form verisi:', form)
    // TODO: API'ye POST atma işlemi
  }

  // Ortak input sınıfları
  const inputCls = 'w-full border rounded px-3 py-2 focus:outline-purple-500'

  return (
    <>
      {/* Hero / Breadcrumb */}
      <div className="bg-purple-600 text-white">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">İletişim</h1>
          <nav className="text-sm">
            <Link href="/" className="hover:underline">Anasayfa</Link>
            <span className="mx-2">/</span>
            <span>İletişim</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-purple-50 py-10">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 items-center">
          {/* SOL SÜTUN: Form */}
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-6 rounded-lg shadow w-full max-w-md"
            >
              <label className="flex flex-col">
                <span className="text-gray-700 text-sm font-medium mb-1">Ad Soyad *</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Adınızı ve Soyadınızı Giriniz"
                  value={form.name}
                  onChange={handleChange}
                  className={inputCls}
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-gray-700 text-sm font-medium mb-1">E-posta *</span>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Adresinizi Giriniz"
                  value={form.email}
                  onChange={handleChange}
                  className={inputCls}
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-gray-700 text-sm font-medium mb-1">Konu *</span>
                <input
                  name="subject"
                  type="text"
                  placeholder="Konu Başlığı"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputCls}
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-gray-700 text-sm font-medium mb-1">Mesajınız *</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Mesajınızı Yazınız"
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputCls} resize-none`}
                  required
                />
              </label>

              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition w-full"
              >
                Gönder
              </button>
            </form>
          </div>

          {/* SAĞ SÜTUN: Harita ve Altında SVG + İletişim Bilgileri Yan Yana */}
          <div className="space-y-6">
            {/* Konumumuz */}
            <section className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2 text-center">Konumumuz</h2>
              <Map latitude={41.2797} longitude={36.3350} zoom={14} />
            </section>

            {/* SVG ve İletişim Bilgileri Row */}
            <div className="bg-white p-6 rounded-lg shadow grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* SVG Illustration */}
              <div className="flex justify-center items-center">
                <Image
                  src="/svgs/contact.svg"
                  alt="Contact Illustration"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>

              {/* İletişim Bilgileri */}
              <div className="space-y-4 text-center md:text-left flex flex-col justify-center">
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">+90 (454) 545 5454</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">info@aysar.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">Atakum / Samsun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
