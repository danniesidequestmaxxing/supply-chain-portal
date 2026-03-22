'use client'

import { useState, useMemo } from 'react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Industry, Company, SupplyChainPosition, SupplyChainNode } from '@/data/types'
import { getPositionColor } from '@/lib/utils'
import { LaneHeader } from './LaneHeader'
import { NodeGroup } from './NodeGroup'

interface SupplyChainMapProps {
  industry: Industry
}

function FlowArrow({ label, direction = 'right' }: { label: string; direction?: 'right' | 'down' }) {
  if (direction === 'down') {
    return (
      <div className="flex flex-col items-center py-3 lg:hidden">
        <div className="w-px h-4 bg-zinc-700" />
        <ArrowDown className="w-3 h-3 text-zinc-600 my-1" />
        <span className="text-[9px] text-zinc-600 mono">{label}</span>
        <div className="w-px h-4 bg-zinc-700" />
      </div>
    )
  }
  return (
    <div className="hidden lg:flex flex-col items-center justify-center px-1 self-stretch">
      <div className="flex items-center gap-1">
        <div className="w-6 h-px bg-zinc-700" />
        <ArrowRight className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
      </div>
      <span className="text-[8px] text-zinc-600 mono mt-1 whitespace-nowrap">{label}</span>
    </div>
  )
}

function Lane({ position, nodes, onSelectCompany }: {
  position: SupplyChainPosition
  nodes: SupplyChainNode[]
  onSelectCompany: (company: Company) => void
}) {
  const companyCount = nodes.reduce((sum, n) => sum + n.companies.length, 0)
  const color = getPositionColor(position)

  return (
    <div className="flex-1 min-w-0">
      <div
        className="rounded-lg border border-zinc-800 bg-[#0d0d12] p-3 h-full"
        style={{ borderTopColor: color, borderTopWidth: 2 }}
      >
        <LaneHeader position={position} nodeCount={nodes.length} companyCount={companyCount} />
        <div className="space-y-1">
          {nodes.map((node) => (
            <NodeGroup key={node.id} node={node} onSelectCompany={onSelectCompany} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SupplyChainMap({ industry }: SupplyChainMapProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const { upstream, midstream, downstream } = useMemo(() => ({
    upstream: industry.supplyChain.filter(n => n.position === 'upstream'),
    midstream: industry.supplyChain.filter(n => n.position === 'midstream'),
    downstream: industry.supplyChain.filter(n => n.position === 'downstream'),
  }), [industry])

  const handleSelect = (company: Company) => {
    setSelectedCompany(company)
    console.log('Selected:', company.name, company.ticker)
  }

  return (
    <div>
      {/* Title bar */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="mono text-sm font-bold text-zinc-200">Supply Chain Map</h2>
          <p className="text-[10px] text-zinc-500 mt-0.5">
            {industry.supplyChain.length} segments ·{' '}
            {industry.supplyChain.reduce((s, n) => s + n.companies.length, 0)} companies ·{' '}
            Click any company for details
          </p>
        </div>
        {selectedCompany && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800">
            <span className="text-[9px] text-zinc-500">Selected:</span>
            <span className="mono text-[11px] font-bold text-zinc-200">{selectedCompany.ticker}</span>
            <span className="text-[10px] text-zinc-400">{selectedCompany.name}</span>
            <button
              onClick={() => setSelectedCompany(null)}
              className="text-zinc-600 hover:text-zinc-400 text-xs ml-1"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* 3-column layout */}
      <div className="flex flex-col lg:flex-row gap-0 items-stretch">
        <Lane position="upstream" nodes={upstream} onSelectCompany={handleSelect} />

        <FlowArrow label="Materials →" direction="right" />
        <FlowArrow label="Materials flow ↓" direction="down" />

        <Lane position="midstream" nodes={midstream} onSelectCompany={handleSelect} />

        <FlowArrow label="Products →" direction="right" />
        <FlowArrow label="Products flow ↓" direction="down" />

        <Lane position="downstream" nodes={downstream} onSelectCompany={handleSelect} />
      </div>
    </div>
  )
}
