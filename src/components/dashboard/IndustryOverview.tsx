'use client'
import { useState } from 'react'
import { useIndustry } from '@/store/industry-context'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn, formatPE, getMoatColor, getPEColor, getPositionColor } from '@/lib/utils'
import { SupplyChainNode, Company } from '@/data/types'

function PEBar({ pe }: { pe: number | null }) {
  if (pe === null) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-1 w-16 bg-zinc-800 rounded-full" />
        <span className="mono text-[10px] text-zinc-600">N/M</span>
      </div>
    )
  }

  const maxPE = 80
  const width = Math.min((pe / maxPE) * 100, 100)

  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-16 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full',
            pe <= 18 ? 'bg-emerald-400' : pe <= 30 ? 'bg-zinc-400' : 'bg-red-400'
          )}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className={cn('mono text-[10px]', getPEColor(pe))}>{formatPE(pe)}</span>
    </div>
  )
}

function CompanyCard({ company, accentColor }: { company: Company; accentColor: string }) {
  return (
    <div className="bg-[#111111] border border-zinc-800 rounded-md p-3 hover:border-zinc-700 transition-colors">
      {/* Header row */}
      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0">
          <span className="mono text-[11px] font-bold" style={{ color: accentColor }}>
            {company.ticker}
          </span>
          <div className="text-[10px] text-zinc-300 truncate mt-0.5">
            {company.name}
          </div>
        </div>
        <span className="mono text-[10px] text-zinc-400 shrink-0 ml-2">
          {company.marketCap}
        </span>
      </div>

      {/* P/E */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] text-zinc-600 uppercase tracking-wider">P/E</span>
        <PEBar pe={company.peRatio} />
      </div>

      {/* Moat */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] text-zinc-600 uppercase tracking-wider">Moat</span>
        <span className={cn('text-[10px] font-medium', getMoatColor(company.moatRating))}>
          {company.moatRating}
        </span>
      </div>

      {/* Description */}
      <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-2 mb-2">
        {company.description}
      </p>

      {/* Products */}
      <div className="flex flex-wrap gap-1">
        {company.products.slice(0, 3).map((product) => (
          <span
            key={product}
            className="text-[9px] px-1.5 py-0.5 bg-zinc-800/80 text-zinc-500 rounded"
          >
            {product}
          </span>
        ))}
        {company.products.length > 3 && (
          <span className="text-[9px] px-1.5 py-0.5 text-zinc-600">
            +{company.products.length - 3}
          </span>
        )}
      </div>
    </div>
  )
}

function NodeSection({ node, accentColor }: { node: SupplyChainNode; accentColor: string }) {
  const [expanded, setExpanded] = useState(true)
  const posColor = getPositionColor(node.position)

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      {/* Header bar */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center w-full gap-3 px-4 py-2.5 bg-zinc-900/80 hover:bg-zinc-900 transition-colors text-left"
      >
        {expanded ? (
          <ChevronDown size={13} className="text-zinc-500 shrink-0" />
        ) : (
          <ChevronRight size={13} className="text-zinc-500 shrink-0" />
        )}

        {/* Position badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: posColor }}
          />
          <span className="text-[9px] uppercase tracking-wider font-medium text-zinc-500">
            {node.position}
          </span>
        </div>

        {/* Node name */}
        <span className="text-[11px] font-medium text-zinc-200 truncate">
          {node.name}
        </span>

        {/* Company count */}
        <span className="mono text-[10px] text-zinc-600 ml-auto shrink-0">
          {node.companies.length} {node.companies.length === 1 ? 'company' : 'companies'}
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="p-3 bg-[#0d0d12]">
          <div
            className="grid gap-2.5"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
          >
            {node.companies.map((company) => (
              <CompanyCard
                key={company.ticker}
                company={company}
                accentColor={accentColor}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function IndustryOverview() {
  const { currentIndustry } = useIndustry()

  return (
    <div className="space-y-2">
      <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-medium mb-2">
        Supply Chain Nodes
      </div>
      {currentIndustry.supplyChain.map((node) => (
        <NodeSection
          key={node.id}
          node={node}
          accentColor={currentIndustry.accentColor}
        />
      ))}
    </div>
  )
}
