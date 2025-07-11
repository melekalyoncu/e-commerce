// src/components/Map.tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Next.js, require()’i kısıtladığı için aşağıdaki import’ları kullanalım:
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Default icon ayarları:
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  style?: React.CSSProperties;
}

export function Map({
  latitude,
  longitude,
  zoom = 13,
  style = { height: '400px', width: '100%' },
}: MapProps) {
  return (
    <MapContainer center={[latitude, longitude]} zoom={zoom} style={style}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>Buraya tıklayın!</Popup>
      </Marker>
    </MapContainer>
  );
}
