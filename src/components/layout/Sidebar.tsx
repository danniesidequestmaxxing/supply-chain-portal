'use client'
import { useState } from 'react'
import { useIndustry } from '@/store/industry-context'
import { Cpu, Zap, Leaf, Pill, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Cpu,
  Zap,
  Leaf,
  Pill,
}

const comingSoon = [
  { name: 'Renewable Energy', icon: 'Leaf' },
  { name: 'Pharmaceuticals', icon: 'Pill' },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { allIndustries, selectedIndustryId, setSelectedIndustryId } = useIndustry()

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-[#0a0b0f] border-r border-zinc-800 transition-all duration-200 ease-out shrink-0',
        collapsed ? 'w-14' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-12 px-4 border-b border-zinc-800 shrink-0">
        <span className="mono text-sm font-bold tracking-tight text-emerald-400">
          {collapsed ? 'S' : 'SCIQ'}
        </span>
        {!collapsed && (
          <span className="ml-2 text-[9px] uppercase tracking-widest text-zinc-600">
            v1.0
          </span>
        )}
      </div>

      {/* Label */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-1">
          <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-medium">
            Industries
          </span>
        </div>
      )}

      {/* Industry list */}
      <nav className="flex-1 overflow-y-auto py-1">
        {allIndustries.map((industry) => {
          const Icon = iconMap[industry.icon] || Cpu
          const active = industry.industryId === selectedIndustryId

          return (
            <button
              key={industry.industryId}
              onClick={() => setSelectedIndustryId(industry.industryId)}
              className={cn(
                'flex items-center w-full gap-3 px-4 py-2 text-left transition-colors duration-100',
                'hover:bg-zinc-900/60',
                active
                  ? 'bg-zinc-900/50 border-l-2'
                  : 'border-l-2 border-transparent',
                collapsed && 'justify-center px-0'
              )}
              style={active ? { borderLeftColor: industry.accentColor } : undefined}
              title={collapsed ? industry.industryName : undefined}
            >
              <Icon
                size={16}
                className={cn(
                  'shrink-0 transition-colors',
                  active ? 'text-zinc-100' : 'text-zinc-500'
                )}
              />
              {!collapsed && (
                <span
                  className={cn(
                    'text-[11px] font-medium truncate transition-colors',
                    active ? 'text-zinc-100' : 'text-zinc-500'
                  )}
                >
                  {industry.industryName}
                </span>
              )}
            </button>
          )
        })}

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-zinc-800/60" />

        {/* Coming soon */}
        {comingSoon.map((item) => {
          const Icon = iconMap[item.icon] || Cpu
          return (
            <div
              key={item.name}
              className={cn(
                'flex items-center gap-3 px-4 py-2 cursor-not-allowed opacity-30',
                collapsed && 'justify-center px-0'
              )}
              title={collapsed ? `${item.name} (Coming Soon)` : undefined}
            >
              <Icon size={16} className="shrink-0 text-zinc-600" />
              {!collapsed && (
                <span className="text-[11px] text-zinc-600 truncate">
                  {item.name}
                </span>
              )}
            </div>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t border-zinc-800 hover:bg-zinc-900/60 transition-colors shrink-0"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <PanelLeftOpen size={14} className="text-zinc-500" />
        ) : (
          <PanelLeftClose size={14} className="text-zinc-500" />
        )}
      </button>
    </aside>
  )
}
