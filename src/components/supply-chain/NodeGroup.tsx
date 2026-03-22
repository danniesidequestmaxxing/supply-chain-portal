'use client'

import { SupplyChainNode, Company } from '@/data/types'
import { CompanyCard } from './CompanyCard'

interface NodeGroupProps {
  node: SupplyChainNode
  onSelectCompany: (company: Company) => void
}

export function NodeGroup({ node, onSelectCompany }: NodeGroupProps) {
  return (
    <div className="mb-4">
      {/* Node subheader */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
        <span className="text-[11px] font-semibold text-zinc-300">{node.name}</span>
        <span className="text-[9px] text-zinc-600">{node.companies.length}</span>
      </div>

      {/* Company cards grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        {node.companies.map((company) => (
          <CompanyCard
            key={company.ticker}
            company={company}
            color={node.color}
            onSelect={onSelectCompany}
          />
        ))}
      </div>
    </div>
  )
}
