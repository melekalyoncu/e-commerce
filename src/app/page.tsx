// src/app/page.tsx
import HeroSlider        from "@/components/HeroSlider"
import FlashSaleSection  from "@/components/FlashSaleSection"
import CategoryButtons   from "@/components/CategoryButtons"
import InfoBannerRow     from "@/components/InfoBannerRow"
import SuggestedProducts from "@/components/SuggestedProducts"

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900">
      <div className="mt-4 p-4 bg-green-500 text-white">TAILWIND ÇALIŞIYOR MU?</div>

      <HeroSlider />
      <FlashSaleSection />
      <CategoryButtons />
      <InfoBannerRow />
      <SuggestedProducts />
    </main>
  )
}
