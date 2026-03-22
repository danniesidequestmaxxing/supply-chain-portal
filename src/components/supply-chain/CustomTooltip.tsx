'use client'

interface TooltipPayload {
  name: string
  value: number
  color: string
  unit?: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-md p-2.5 shadow-xl">
      <p className="text-[10px] text-zinc-500 mb-1 mono">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: entry.color }} />
          <span className="text-[10px] text-zinc-400">{entry.name}:</span>
          <span className="mono text-xs text-zinc-200 font-semibold">
            {entry.name === 'Revenue' ? `$${entry.value.toFixed(1)}B` : `${entry.value}%`}
          </span>
        </div>
      ))}
    </div>
  )
}
