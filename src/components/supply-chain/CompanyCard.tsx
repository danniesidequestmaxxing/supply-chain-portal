'use client'

import { Company } from '@/data/types'
import { cn, formatPE, getPEColor } from '@/lib/utils'

interface CompanyCardProps {
  company: Company
  color: string
  onSelect: (company: Company) => void
}

export function CompanyCard({ company, color, onSelect }: CompanyCardProps) {
  const moatBg = company.moatRating === 'High' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
    : company.moatRating === 'Med' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20'
    : 'bg-zinc-700/30 text-zinc-500 border-zinc-600/20'

  return (
    <div
      onClick={() => { onSelect(company); console.log('Selected:', company.name) }}
      className={cn(
        'group cursor-pointer rounded-md border border-zinc-800 bg-zinc-900/50 p-2.5',
        'hover:border-zinc-600 hover:bg-zinc-900 hover:shadow-lg hover:shadow-black/20',
        'transition-all duration-150'
      )}
    >
      {/* Top row: Ticker + Moat badge */}
      <div className="flex items-center justify-between mb-1">
        <span className="mono text-[11px] font-bold" style={{ color }}>{company.ticker}</span>
        <span className={cn('text-[8px] font-semibold px-1.5 py-0.5 rounded border', moatBg)}>
          {company.moatRating}
        </span>
      </div>

      {/* Company name */}
      <div className="text-xs font-semibold text-zinc-200 truncate mb-1.5">{company.name}</div>

      {/* Metrics row */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="mono text-[10px] text-zinc-400">{company.marketCap}</span>
        <span className={cn('mono text-[10px] font-semibold', getPEColor(company.peRatio))}>
          {formatPE(company.peRatio)}
        </span>
      </div>

      {/* Market share bar (if available) */}
      {company.marketSharePercentage != null && company.marketSharePercentage > 0 && (
        <div className="mb-1.5">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[8px] text-zinc-500 uppercase tracking-wider">Mkt Share</span>
            <span className="mono text-[9px] text-zinc-400">{company.marketSharePercentage}%</span>
          </div>
          <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(company.marketSharePercentage, 100)}%`, backgroundColor: color }}
            />
          </div>
        </div>
      )}

      {/* Description */}
      <p className="text-[10px] text-zinc-500 line-clamp-1 group-hover:text-zinc-400 transition-colors">
        {company.description}
      </p>
    </div>
  )
}
