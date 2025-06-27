'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface Stat {
  label: string
  target: number
  suffix?: string
}

const stats: Stat[] = [
  { label: 'Satıcılar', target: 100, suffix: 'k' },
  { label: 'Müşteriler', target: 230  , suffix: 'k' },
  { label: 'Ürünler', target: 200, suffix: 'k' },
]

function Counter({
  target,
  suffix,
  visible,
}: {
  target: number
  suffix?: string
  visible: boolean
}) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!visible) return
    let start = 0
    const duration = 800
    const stepTime = Math.max(Math.floor(duration / target), 50)
    const timer = setInterval(() => {
      start += 1
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, stepTime)
    return () => clearInterval(timer)
  }, [visible, target])
  return (
    <span className="text-4xl font-bold text-green-600">
      {count}
      {suffix}
    </span>
  )
}

export default function AboutPage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Hero / Breadcrumb */}
      <div className="bg-purple-600 text-white">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Hakkımızda</h1>
          <nav className="text-sm">
            <Link href="/" className="hover:underline">
              Anasayfa
            </Link>
            <span className="mx-2">/</span>
            <span>Hakkımızda</span>
          </nav>
        </div>
      </div>

      {/* Main Content (arka plan beyaz) */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Metin */}
            <div>
              <h2
                className="
                  text-3xl font-bold italic mb-4 
                  bg-clip-text text-transparent
                  bg-gradient-to-r from-green-400 to-blue-500
                "
              >
                Aysar ile Lezzet Kapınızda
              </h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Aysar olarak amacımız, en taze ve en lezzetli yemekleri doğrudan
                mutfağınıza taşımak. Yerel işletmelerden seçtiğimiz organik
                malzemelerle hazırlanan seçeneklerimiz hem sağlıklı hem de tam
                istediğiniz porsiyon kontrolünde.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                İster ev yapımı tarifler arıyor olun, ister özel diyet menüler –
                Aysar’da pek çok farklı kategori ve mutfaktan yüzlerce yemek
                seçeneği bulabilirsiniz. Restoranlarla birebir iş birliği sayesinde
                her sipariş titizlikle paketleniyor ve hijyen kurallarına uygun
                olarak size ulaştırılıyor.
              </p>
              <p className="mb-8 text-gray-700 leading-relaxed">
                Hızlı teslimat ağımız, gerçek zamanlı takip sistemi ve 7/24 destek
                hattımızla Aysar, lezzetli bir deneyimi mümkün olan en konforlu
                şekilde yaşamanızı garanti ediyor.
              </p>
            </div>
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="/svgs/logo.svg"
                alt="Aysar Logo"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>

          {/* Animated Stats */}
          <div ref={statsRef} className="flex justify-center space-x-16 mt-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <Counter target={s.target} suffix={s.suffix} visible={statsVisible} />
                <p className="mt-2 text-sm text-gray-600">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { title: 'Taze & Organik', subtitle: 'Doğrudan yerel üreticiden' },
              { title: 'Hızlı Teslimat', subtitle: '30 dakikada kapınızda' },
              { title: '7/24 Destek', subtitle: 'Her daim yanınızdayız' },
              { title: 'Güvenli Ödeme', subtitle: 'Tüm kartlara uygun' },
            ].map((f) => (
              <div
                key={f.title}
                className="
                  bg-white p-6 rounded-lg 
                  shadow-md hover:shadow-lg 
                  transform hover:-translate-y-1 
                  transition-shadow duration-200 
                  text-center
                "
              >
                <h3 className="mb-2 text-gray-400">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
