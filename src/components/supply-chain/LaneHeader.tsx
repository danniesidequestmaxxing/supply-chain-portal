import { getPositionColor } from '@/lib/utils'
import { SupplyChainPosition } from '@/data/types'

interface LaneHeaderProps {
  position: SupplyChainPosition
  nodeCount: number
  companyCount: number
}

export function LaneHeader({ position, nodeCount, companyCount }: LaneHeaderProps) {
  const color = getPositionColor(position)
  const label = position.charAt(0).toUpperCase() + position.slice(1)

  return (
    <div className="flex items-center gap-3 mb-3 pb-2 border-b border-zinc-800">
      <div className="flex items-center gap-2" style={{ borderLeft: `3px solid ${color}`, paddingLeft: 8 }}>
        <span className="mono text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
          {label}
        </span>
      </div>
      <span className="text-[9px] text-zinc-600">
        {nodeCount} segments · {companyCount} companies
      </span>
    </div>
  )
}
