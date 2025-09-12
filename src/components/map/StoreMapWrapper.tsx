"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map").then(m => m.Map), {
  ssr: false,
});

interface Props {
  latitude: number;
  longitude: number;
  zoom: number;
}

export default function StoreMapWrapper({ latitude, longitude, zoom }: Props) {
  return <Map latitude={latitude} longitude={longitude} zoom={zoom} />;
}
