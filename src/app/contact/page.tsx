// app/contact/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: gönderme işlemi
    console.log(form)
  }

  const inputCls =
    'w-full border rounded px-3 py-2 focus:outline-purple-500 input-fade'

  return (
    <>
      {/* ===== Hero / Breadcrumb ===== */}
      <div className="bg-purple-600 text-white">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">İletişim</h1>
          <nav className="text-sm">
            <Link href="/" className="hover:underline">
              Anasayfa
            </Link>
            <span className="mx-2">/</span>
            <span>İletişim</span>
          </nav>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      {/* Arka planı hafif mor tonuna boyadık */}
      <div className="bg-purple-50 py-10">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* — Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-lg shadow"
          >
            <label className="flex flex-col">
              <span className="text-gray-700 text-sm font-medium mb-1">
                Ad Soyad *
              </span>
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
              <span className="text-gray-700 text-sm font-medium mb-1">
                E-posta *
              </span>
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
              <span className="text-gray-700 text-sm font-medium mb-1">
                Konu *
              </span>
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
              <span className="text-gray-700 text-sm font-medium mb-1">
                Mesajınız *
              </span>
              <textarea
                name="message"
                rows={5}
                placeholder="Mesajınızı Yazınız"
                value={form.message}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-purple-500 input-fade resize-none"
                required
              />
            </label>

            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
            >
              Gönder
            </button>
          </form>

          {/* — Contact Info & Illustration */}
 <div className="flex flex-col md:flex-row items-center justify-between md:space-x-8 space-y-8 md:space-y-0">
            {/* İletişim Bilgileri */}
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">+90 (454) 545 5454</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">info@aysar.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">Atakum / Samsun</span>
              </div>
            </div>

            {/* İllüstrasyon: contact.svg */}
            <Image
              src="/svgs/contact.svg"
              alt="Contact Illustration"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </>
  )
}
