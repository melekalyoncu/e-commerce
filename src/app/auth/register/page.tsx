// app/auth/register/page.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    city: '',
    password: '',
    confirm: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)
  }

  // ortak input sınıfı
const inputCls =
  'border rounded px-3 py-2 focus:outline-purple-500 ' +
  'font-normal input-fade'


  return (
    <>
      {/* … sayfa başlığı + breadcrumb kısmı değişmedi */}

      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
            {/* logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/svgs/logo.svg"
                alt="Aysar Logo"
                width={76}
                height={76}
              />
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* İsim / Soyisim */}
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">
                  İsim*
                </span>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="İsim Giriniz"
                  className={inputCls}
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">
                  Soyisim*
                </span>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Soyisim Giriniz"
                  className={inputCls}
                  required
                />
              </label>

              {/* Email / Telefon */}
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">
                  Email*
                </span>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Giriniz"
                  className={inputCls}
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">
                  Telefon No*
                </span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Numara Giriniz"
                  className={inputCls}
                  required
                />
              </label>

              {/* Adres */}
              <label className="flex flex-col sm:col-span-2">
                <span className="text-sm font-medium mb-1 text-gray-700">
                  Adres*
                </span>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  type="text"
                  placeholder="Adres"
                  className={inputCls}
                  required
                />
              </label>

              {/* Ülke / Şehir (read-only) */}
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">
                  Ülke*
                </span>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  type="text"
                  placeholder="Ülke"
                  className={inputCls + ' bg-white cursor-not-allowed'}
                  readOnly
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">
                  Şehir*
                </span>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="Şehir"
                  className={inputCls + ' bg-white cursor-not-allowed'}
                  readOnly
                  required
                />
              </label>

              {/* Şifre / Şifre Tekrar */}
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">
                  Şifre*
                </span>
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Şifre Giriniz"
                  className={inputCls}
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">
                  Şifre Tekrar*
                </span>
                <input
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  type="password"
                  placeholder="Şifre Tekrar"
                  className={inputCls + ' bg-white cursor-not-allowed'}
                  readOnly
                  required
                />
              </label>

              {/* Gönder */}
              <div className="sm:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                >
                  Kaydet
                </button>
              </div>

              {/* Zaten hesabın var mı? */}
              <p className="sm:col-span-2 text-right text-sm text-gray-700">
                Hesabın zaten var mı?{' '}
                <Link
                  href="/auth/login"
                  className="text-purple-700 hover:underline"
                >
                  Giriş Yap
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
