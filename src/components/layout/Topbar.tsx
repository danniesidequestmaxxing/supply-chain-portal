'use client'
import { useState } from 'react'
import { useIndustry } from '@/store/industry-context'
import { ChevronRight, Search } from 'lucide-react'

export function Topbar() {
  const { currentIndustry } = useIndustry()
  const [query, setQuery] = useState('')

  return (
    <header className="flex items-center justify-between h-12 px-5 bg-[#0a0b0f]/80 backdrop-blur-sm border-b border-zinc-800 shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px]">
        <span className="text-zinc-500">Industries</span>
        <ChevronRight size={12} className="text-zinc-600" />
        <span className="text-zinc-200 font-medium">{currentIndustry.industryName}</span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tickers, companies..."
          className="w-56 h-7 pl-8 pr-3 text-[11px] bg-zinc-900/60 border border-zinc-800 rounded-md text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
        />
      </div>
    </header>
  )
}
