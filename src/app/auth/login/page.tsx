import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic"; 

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl?: string }>;
}) {
  const sp = await searchParams; // Promise'i çöz
  const callbackUrl =
    (sp?.callbackUrl && sp.callbackUrl.length > 0 ? sp.callbackUrl : "/");

  return <LoginClient callbackUrl={callbackUrl} />;
}
