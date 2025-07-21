// src/app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";    // useSession çıkarıldı
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, remember: e.target.checked });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      remember: form.remember,
    });
    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      window.location.href = "/";
    }
  };

  const inputCls =
    "w-full border rounded px-3 py-2 focus:outline-purple-500 input-fade";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Başlık + Breadcrumb */}
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

      {/* Form ve Sosyal İkonlar */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-lg shadow">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/svgs/logo.svg"
              alt="Aysar Logo"
              width={76}
              height={76}
            />
          </div>

          {/* Email+Şifre Formu */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-600 text-sm">{error}</p>}

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

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
              >
                {loading ? "Giriş yapılıyor…" : "Giriş"}
              </button>
              <Link
                href="/auth/register"
                className="text-sm text-gray-700 hover:underline"
              >
                Kayıt ol?
              </Link>
            </div>
          </form>

          {/* Sosyal Giriş İkonları (Formun Altı) */}
          <div className="mt-6 border-t pt-6 flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="p-2 hover:opacity-80"
            >
              <Image
                src="/images/google.png"
                alt="Google ile Giriş"
                width={40}
                height={40}
              />
            </button>
            <button
              type="button"
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="p-2 hover:opacity-80"
            >
              <Image
                src="/images/github.jpeg"
                alt="GitHub ile Giriş"
                width={40}
                height={40}
              />
            </button>
            <button
              type="button"
              onClick={() => signIn("facebook", { callbackUrl: "/" })}
              className="p-2 hover:opacity-80"
            >
              <Image
                src="/images/facebook.png"
                alt="Facebook ile Giriş"
                width={40}
                height={40}
              />
            </button>
            <button
              type="button"
              onClick={() => signIn("credentials", { callbackUrl: "/" })}
              className="p-2 hover:opacity-80"
            >
              <Image
                src="/images/mail.png"
                alt="Email ile Giriş"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
