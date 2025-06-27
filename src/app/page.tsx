// src/app/page.tsx
import HeroSlider        from "@/components/HeroSlider"
import FlashSaleSection  from "@/components/FlashSaleSection"
import CategoryButtons   from "@/components/CategoryButtons"
import InfoBannerRow     from "@/components/InfoBannerRow"
import SuggestedProducts from "@/components/SuggestedProducts"

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900">

      <HeroSlider />
      <FlashSaleSection />
      <CategoryButtons />
      <InfoBannerRow />
      <SuggestedProducts />
    </main>
  )
}
