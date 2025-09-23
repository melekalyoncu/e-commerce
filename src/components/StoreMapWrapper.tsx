'use client'

import dynamic from 'next/dynamic'
import type { MapProps } from '@/components/Map'

const Map = dynamic<MapProps>(() => import('@/components/Map').then(m => m.Map), {
  ssr: false,
  loading: () => <div className="h-64 rounded-lg bg-gray-100 animate-pulse" />,
})

type Props = Required<Pick<MapProps, 'latitude' | 'longitude'>> & Pick<MapProps, 'zoom'>

export default function StoreMapWrapper(props: Props) {
  return <Map {...props} />
}
