import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";

export default function Page({
  searchParams,
}: {
  searchParams?: { callbackUrl?: string };
}) {
  const callbackUrl =
    typeof searchParams?.callbackUrl === "string" &&
      searchParams.callbackUrl.length > 0
      ? searchParams.callbackUrl
      : "/";

  return <LoginClient callbackUrl={callbackUrl} />;
}
