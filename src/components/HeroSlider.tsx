/* eslint-disable @next/next/no-img-element */
'use client'

export default function HeroSlider() {
  return (
    <section className="w-full flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/2 h-48 overflow-hidden rounded-lg shadow">
        <img
          src="/images/sale.jpg"
          alt="Kampanya"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 h-48 overflow-hidden rounded-lg shadow">
        <img
          src="/images/2.jpg"
          alt="Tanıtım"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}
