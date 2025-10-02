'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';

const schema = z.object({
  firstName: z.string().min(2, 'En az 2 karakter'),
  lastName: z.string().min(2, 'En az 2 karakter'),
  email: z.string().email('Geçerli bir e-posta girin'),
  phone: z.string()
    .min(10, 'Telefon numarası çok kısa')
    .regex(/^\+?\d{10,15}$/, 'Sadece rakam, opsiyonel + ve 10-15 hane'),
  address: z.string().min(5, 'Adres çok kısa'),
  country: z.string().min(2, 'Ülke zorunlu'),
  city: z.string().min(2, 'Şehir zorunlu'),
  password: z.string()
    .min(6, 'En az 6 karakter')
    .regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, 'Harf ve rakam içermeli'),
  confirm: z.string()
}).refine(d => d.password === d.confirm, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirm'],
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      country: '',
      city: '',
      password: '',
      confirm: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    // 1) Kayıt isteği 
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'Kayıt başarısız');
      return;
    }

    // 2) Otomatik giriş (Credentials Provider varsa)
    const signInRes = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    });

    if (signInRes?.ok) {
      router.push('/'); 
      return;
    }

    // Credentials yoksa kullanıcıyı login sayfasına yönlendir
    router.push('/auth/login?callbackUrl=%2F');
  };

  const inputCls =
    'w-full border rounded px-3 py-2 focus:outline-purple-500 input-fade';

  const invalid = 'border-red-500 focus:outline-red-500';

  return (
    <>
      {/* ====== Başlık + Breadcrumb ====== */}
      <div className="bg-purple-600 text-white">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Kayıt Ol</h1>
          <nav className="text-sm">
            <Link href="/" className="hover:underline">Anasayfa</Link>
            <span className="mx-2">/</span>
            <span>Kayıt Ol</span>
          </nav>
        </div>
      </div>

      {/* ====== Form Bölümü ====== */}
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
            {/* logo */}
            <div className="flex justify-center mb-6">
              <Image src="/svgs/logo.svg" alt="Aysar Logo" width={76} height={76} />
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              noValidate
            >
              {/* İsim / Soyisim */}
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">İsim*</span>
                <input
                  {...register('firstName')}
                  type="text"
                  placeholder="İsim Giriniz"
                  className={`${inputCls} ${errors.firstName ? invalid : ''}`}
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && <span className="text-xs text-red-600 mt-1">{errors.firstName.message}</span>}
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">Soyisim*</span>
                <input
                  {...register('lastName')}
                  type="text"
                  placeholder="Soyisim Giriniz"
                  className={`${inputCls} ${errors.lastName ? invalid : ''}`}
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName && <span className="text-xs text-red-600 mt-1">{errors.lastName.message}</span>}
              </label>

              {/* Email / Telefon */}
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">Email*</span>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email Giriniz"
                  autoComplete="email"
                  className={`${inputCls} ${errors.email ? invalid : ''}`}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="text-xs text-red-600 mt-1">{errors.email.message}</span>}
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">Telefon No*</span>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="Numara Giriniz"
                  autoComplete="tel"
                  className={`${inputCls} ${errors.phone ? invalid : ''}`}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <span className="text-xs text-red-600 mt-1">{errors.phone.message}</span>}
              </label>

              {/* Adres */}
              <label className="flex flex-col sm:col-span-2">
                <span className="text-sm font-medium mb-1 text-gray-700">Adres*</span>
                <input
                  {...register('address')}
                  type="text"
                  placeholder="Adres"
                  autoComplete="street-address"
                  className={`${inputCls} ${errors.address ? invalid : ''}`}
                  aria-invalid={!!errors.address}
                />
                {errors.address && <span className="text-xs text-red-600 mt-1">{errors.address.message}</span>}
              </label>

              {/* Ülke / Şehir */}
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">Ülke*</span>
                <input
                  {...register('country')}
                  type="text"
                  placeholder="Ülke"
                  className={`${inputCls} ${errors.country ? invalid : ''}`}
                  aria-invalid={!!errors.country}
                />
                {errors.country && <span className="text-xs text-red-600 mt-1">{errors.country.message}</span>}
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">Şehir*</span>
                <input
                  {...register('city')}
                  type="text"
                  placeholder="Şehir"
                  className={`${inputCls} ${errors.city ? invalid : ''}`}
                  aria-invalid={!!errors.city}
                />
                {errors.city && <span className="text-xs text-red-600 mt-1">{errors.city.message}</span>}
              </label>

              {/* Şifre / Şifre Tekrar + göz ikonu */}
              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">Şifre*</span>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPass ? 'text' : 'password'}
                    placeholder="Şifre Giriniz"
                    autoComplete="new-password"
                    className={`${inputCls} pr-10 ${errors.password ? invalid : ''}`}
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                    aria-label={showPass ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  >
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <span className="text-xs text-red-600 mt-1">{errors.password.message}</span>}
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1 text-gray-700">Şifre Tekrar*</span>
                <div className="relative">
                  <input
                    {...register('confirm')}
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Şifre Tekrar"
                    autoComplete="new-password"
                    className={`${inputCls} pr-10 ${errors.confirm ? invalid : ''}`}
                    aria-invalid={!!errors.confirm}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                    aria-label={showConfirm ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirm && <span className="text-xs text-red-600 mt-1">{errors.confirm.message}</span>}
              </label>

              {/* Gönder */}
              <div className="sm:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition disabled:opacity-60"
                >
                  {isSubmitting ? 'Kaydediliyor…' : 'Kaydet'}
                </button>
              </div>

              {/* Zaten hesabın var mı? */}
              <p className="sm:col-span-2 text-right text-sm text-gray-700">
                Hesabın zaten var mı?{' '}
                <Link href="/auth/login" className="text-purple-700 hover:underline">
                  Giriş Yap
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
