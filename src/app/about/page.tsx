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
  { label: 'Müşteriler', target: 230, suffix: 'k' },
  { label: 'Ürünler', target: 200, suffix: 'k' },
]

function Counter({ target, suffix, visible }: { target: number; suffix?: string; visible: boolean }) {
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero / Breadcrumb */}
      <div className="bg-purple-600 text-white">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Hakkımızda</h1>
          <nav className="text-sm">
            <Link href="/" className="hover:underline">Anasayfa</Link>
            <span className="mx-2">/</span>
            <span>Hakkımızda</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 gap-8">
            {/* Text Section */}
            <div>
              <h2 className="flex items-center text-3xl font-bold italic mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
                <Image
                  src="/svgs/logo.svg"
                  alt="Aysar Logo"
                  width={32}
                  height={32}
                  className="inline-block mr-2 object-contain"
                />
                Aysar
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Aysar, her zevke ve ihtiyaca uygun ürünleri tek çatıda buluşturan, güvenilir bir e-ticaret platformudur.
                Giyimden elektroniğe, ev yaşam ürünlerinden spora; binlerce farklı kategoride, her bütçeye hitap eden seçenekler sunuyoruz.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                Amacımız, alışverişi sorunsuz ve keyifli bir deneyime dönüştürmek; siparişten teslimata kadar şeffaf,
                hızlı ve takip edilebilir bir süreç sağlamaktır.
              </p>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">Misyonumuz</h3>
                <p className="text-lg mb-4">E-ticaretin her adımında kalite ve müşteri memnuniyetini ön planda tutmak.</p>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>En geniş ürün portföyünü ve rekabetçi fiyatları sunmak</li>
                  <li>Şeffaf, hızlı ve izlenebilir bir alışveriş süreci işletmek</li>
                  <li>7/24 destekle müşterilerimizin yanında olmak</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">Vizyonumuz</h3>
                <p className="text-lg leading-relaxed">
                  Türkiye’nin en güvenilir ve tercih edilen dijital alışveriş adresi olmak;
                  e-ticareti “her ihtiyaca tek noktadan çözüm” anlayışıyla dönüştürmek.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">Değerlerimiz</h3>
                <ul className="list-decimal list-inside space-y-2 text-lg">
                  <li><strong>Güven</strong>: Kişisel ve ödeme bilgileriniz güncel güvenlik protokolleriyle korunur.</li>
                  <li><strong>Hız</strong>: Teslimatlarınızı 24–48 saat içinde kapınıza ulaştırıyoruz.</li>
                  <li><strong>Açıklık</strong>: Fiyat, stok ve kargo süreçlerimiz baştan sona açıktır.</li>
                  <li><strong>Müşteri Odaklılık</strong>: İhtiyaçlarınızı dinler, çözümler sunar ve memnuniyetinizi önceleriz.</li>
                </ul>
              </section>

              {/* Call to Action */}
              <div className="mt-8">
                <Link href="/products" className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition">
                  Ürünlerimizi Keşfedin
                </Link>
              </div>
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

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { title: 'Taze & Organik', subtitle: 'Yerel üreticiden direkt' },
              { title: 'Hızlı Teslimat', subtitle: '24–48 saatte kapınızda' },
              { title: '7/24 Destek', subtitle: 'Her zaman yanınızdayız' },
              { title: 'Güvenli Ödeme', subtitle: 'Tüm kart ve cüzdanlara uygun' },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-200 text-center"
              >
                <h4 className="mb-2 text-lg font-medium text-gray-700">{f.title}</h4>
                <p className="text-sm text-gray-600">{f.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
