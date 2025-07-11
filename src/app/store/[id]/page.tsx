// src/app/store/[id]/page.tsx
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// Harita bileşenini SSR kapalı olarak import edelim
const Map = dynamic(() => import('@/components/Map').then(m => m.Map), {
  ssr: false,
});

interface Store {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

// Örnek: veritabanından ya da API’dan çek
async function getStore(id: string): Promise<Store | null> {
  // ...fetch logic...
  return { id, name: 'Mağaza X', lat: 41.01, lng: 28.97 };
}

export default async function StorePage({ params }: { params: { id: string } }) {
  const store = await getStore(params.id);
  if (!store) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{store.name}</h1>
      <Map latitude={store.lat} longitude={store.lng} zoom={15} />
    </div>
  );
}
