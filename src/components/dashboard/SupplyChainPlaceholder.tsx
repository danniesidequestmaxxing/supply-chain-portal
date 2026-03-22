'use client'
import { Package } from 'lucide-react'

export function SupplyChainPlaceholder() {
  return (
    <div className="bg-zinc-900 border border-dashed border-zinc-700 rounded-lg min-h-[300px] flex flex-col items-center justify-center gap-3">
      <Package size={32} className="text-zinc-600" />
      <div className="text-center">
        <div className="text-[12px] text-zinc-400 font-medium">
          Supply Chain Visualization
        </div>
        <div className="text-[10px] text-zinc-600 mt-0.5">
          Phase 2
        </div>
      </div>
    </div>
  )
}
