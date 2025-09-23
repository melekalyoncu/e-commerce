import { notFound } from "next/navigation";
import type { Metadata } from "next";
import StoreMapWrapper from "@/components/StoreMapWrapper";

export const revalidate = 60;

type Params = { id: string };

interface Store {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

async function getStore(id: string): Promise<Store | null> {
  return { id, name: "Mağaza X", lat: 41.01, lng: 28.97 };
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { id } = await params;
  const store = await getStore(id);
  if (!store) return { title: "Mağaza Bulunamadı" };
  return { title: `${store.name} | Store` };
}

const isUUID = (s: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);

export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;

  if (!isUUID(id)) notFound();

  const store = await getStore(id);
  if (!store) notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{store.name}</h1>
      <StoreMapWrapper latitude={store.lat} longitude={store.lng} zoom={15} />
    </div>
  );
}
