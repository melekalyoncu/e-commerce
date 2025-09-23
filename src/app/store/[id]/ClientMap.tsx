'use client'

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map').then(m => m.Map), {
  ssr: false,
  loading: () => <div className="h-64 rounded-lg bg-gray-100 animate-pulse" />,
})

type Props = {
  lat: number
  lng: number
  zoom?: number
}

export default function ClientMap({ lat, lng, zoom = 15 }: Props) {
  return <Map latitude={lat} longitude={lng} zoom={zoom} />
}
