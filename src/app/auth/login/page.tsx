"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") || "/";

  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const remembered = localStorage.getItem("remember_email");
    if (remembered) {
      setForm((f) => ({ ...f, email: remembered, remember: true }));
    }
  }, []);

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
      callbackUrl, 
    });

    setLoading(false);

    // email'i hatırla
    if (form.remember) localStorage.setItem("remember_email", form.email);
    else localStorage.removeItem("remember_email");

    if (!res || !res.ok) {
      setError(res?.error || "E-posta veya şifre hatalı");
      return;
    }
    router.push(callbackUrl);
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
            <Link href="/" className="hover:underline">Anasayfa</Link>
            <span className="mx-2">/</span>
            <span>Giriş</span>
          </nav>
        </div>
      </div>

      {/* Form */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-lg shadow">
          <div className="flex justify-center mb-6">
            <Image src="/svgs/logo.svg" alt="Aysar Logo" width={76} height={76} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1 text-gray-700">Email *</span>
              <input
                name="email"
                type="email"
                placeholder="Email Giriniz"
                value={form.email}
                onChange={handleChange}
                className={inputCls}
                autoComplete="email"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium mb-1 text-gray-700">Şifre *</span>
              <input
                name="password"
                type="password"
                placeholder="Şifrenizi Giriniz"
                value={form.password}
                onChange={handleChange}
                className={inputCls}
                autoComplete="current-password"
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
              <Link href={`/auth/register?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-sm text-gray-700 hover:underline">
                Kayıt ol?
              </Link>
            </div>
          </form>

          <div className="mt-6 border-t pt-6 flex justify-center gap-4">
            <button type="button" onClick={() => signIn("google", { callbackUrl })} className="p-2 hover:opacity-80">
              <Image src="/images/google.png" alt="Google ile Giriş" width={40} height={40} />
            </button>
            <button type="button" onClick={() => signIn("github", { callbackUrl })} className="p-2 hover:opacity-80">
              <Image src="/images/github.jpeg" alt="GitHub ile Giriş" width={40} height={40} />
            </button>
            <button type="button" onClick={() => signIn("facebook", { callbackUrl })} className="p-2 hover:opacity-80">
              <Image src="/images/facebook.png" alt="Facebook ile Giriş" width={40} height={40} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
