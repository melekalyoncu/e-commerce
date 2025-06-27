/* eslint-disable @next/next/no-img-element */
// components/InfoBannerRow.tsx
type Info = {
  id: number
  title: string
  desc: string
  icon: string  // public/images altındaki ikon yolu
}

const infos: Info[] = [
  { id: 1, title: 'Stokta Hazır', desc: 'Hemen gönderime hazır ürünler', icon: '/images/1.jpg' },
  { id: 2, title: 'Ön Sipariş',  desc: 'Ön siparişle almak isteyenler için', icon: '/images/4.jpg' },
  { id: 3, title: 'En İyi Lavantalar', desc: 'Burada bulabileceğiniz en iyi çeşitler', icon: '/images/3.jpg' },
  { id: 4, title: 'Ücretsiz Kargo', desc: 'Tüm ücretsiz kargo ürünleri', icon: '/images/2.jpg' },
]

export default function InfoBannerRow() {
  return (
    <section className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {infos.map(i => (
          <div key={i.id} className="flex items-center gap-3 border rounded-lg p-4 hover:shadow">
            <img src={i.icon} alt={i.title} className="w-10 h-10" />
            <div>
              <p className="font-medium">{i.title}</p>
              <p className="text-xs text-gray-600">{i.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
