// app/auth/login/page.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, remember: e.target.checked })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: giriş işlemini buraya bağla
    console.log(form)
  }

  // input-fade sınıfınız globals.css içinde tanımlı olmalı:
  // .input-fade { @apply placeholder-gray-400 text-gray-400
  //               focus:text-gray-900 focus:placeholder-gray-400
  //               transition-colors duration-200; }
  const inputCls =
    'w-full border rounded px-3 py-2 focus:outline-purple-500 input-fade'

  return (
    <>
      {/* ====== Başlık + Breadcrumb ====== */}
      <div className="bg-purple-600 text-white">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Giriş Yap</h1>
          <nav className="text-sm">
            <Link href="/" className="hover:underline">
              Anasayfa
            </Link>
            <span className="mx-2">/</span>
            <span>Giriş</span>
          </nav>
        </div>
      </div>

      {/* ====== Form Bölümü ====== */}
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/svgs/logo.svg"
                alt="Aysar Logo"
                width={76}
                height={76}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">
                  Email *
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Giriniz"
                  value={form.email}
                  onChange={handleChange}
                  className={inputCls}
                  required
                />
              </label>

              {/* Şifre */}
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">
                  Şifre *
                </span>
                <input
                  name="password"
                  type="password"
                  placeholder="Şifrenizi Giriniz"
                  value={form.password}
                  onChange={handleChange}
                  className={inputCls}
                  required
                />
              </label>

              {/* Beni Hatırla & Şifremi Unuttum */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    name="remember"
                    type="checkbox"
                    checked={form.remember}
                    onChange={handleCheckbox}
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Beni hatırla</span>
                </label>
                <Link href="#" className="text-purple-700 hover:underline">
                  Şifremi unuttum?
                </Link>
              </div>

              {/* Gönder & Kayıt Ol */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                >
                  Giriş
                </button>
                <Link
                  href="/auth/register"
                  className="text-sm text-gray-700 hover:underline"
                >
                  Kayıt ol?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
