import { MainShell } from '@/components/layout/MainShell'
import { HeroSection } from '@/components/dashboard/HeroSection'
import { SupplyChainPlaceholder } from '@/components/dashboard/SupplyChainPlaceholder'
import { IndustryOverview } from '@/components/dashboard/IndustryOverview'

export default function Home() {
  return (
    <MainShell>
      <div className="space-y-6 max-w-[1200px]">
        <HeroSection />
        <SupplyChainPlaceholder />
        <IndustryOverview />
      </div>
    </MainShell>
  )
}
