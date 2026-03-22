'use client'

import { MainShell } from '@/components/layout/MainShell'
import { HeroSection } from '@/components/dashboard/HeroSection'
import { SupplyChainMap } from '@/components/supply-chain/SupplyChainMap'
import { IndustryOverview } from '@/components/dashboard/IndustryOverview'
import { useIndustry } from '@/store/industry-context'

export default function Home() {
  const { currentIndustry } = useIndustry()

  return (
    <MainShell>
      <div className="space-y-6 max-w-[1400px]">
        <HeroSection />
        <SupplyChainMap industry={currentIndustry} />
        <IndustryOverview />
      </div>
    </MainShell>
  )
}
