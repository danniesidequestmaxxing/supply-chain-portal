'use client'
import { useIndustry } from '@/store/industry-context'
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const { currentIndustry } = useIndustry()

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <h1 className="mono text-xl font-bold text-zinc-100 tracking-tight">
          {currentIndustry.industryName}
        </h1>
        <p className="text-[11px] text-zinc-500 mt-1 max-w-2xl leading-relaxed">
          {currentIndustry.description}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-3">
        {currentIndustry.keyMetrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
          >
            <div className="text-[9px] uppercase tracking-wider text-zinc-500 mb-2">
              {metric.label}
            </div>
            <div className="mono text-xl font-bold text-zinc-100">
              {metric.value}
            </div>
            {metric.change && (
              <div
                className={cn(
                  'flex items-center gap-1 mt-1.5 text-[10px] font-medium',
                  metric.direction === 'up' && 'text-emerald-400',
                  metric.direction === 'down' && 'text-red-400',
                  metric.direction === 'flat' && 'text-zinc-500'
                )}
              >
                {metric.direction === 'up' && <ArrowUpRight size={11} />}
                {metric.direction === 'down' && <ArrowDownRight size={11} />}
                {metric.direction === 'flat' && <Minus size={11} />}
                <span>{metric.change}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Macro Trends */}
      <div>
        <div className="text-[9px] uppercase tracking-wider text-zinc-500 mb-2 font-medium">
          Macro Trends
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {currentIndustry.macroTrends.map((trend) => (
            <div
              key={trend.title}
              className={cn(
                'bg-zinc-900/60 border border-zinc-800/60 rounded px-3 py-2.5 border-l-2',
                trend.impact === 'bullish' && 'border-l-emerald-400',
                trend.impact === 'bearish' && 'border-l-red-400',
                trend.impact === 'neutral' && 'border-l-zinc-500'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-zinc-200">
                    {trend.title}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5 leading-relaxed">
                    {trend.description}
                  </div>
                </div>
                <span
                  className={cn(
                    'shrink-0 text-[9px] uppercase tracking-wider font-medium mt-0.5',
                    trend.impact === 'bullish' && 'text-emerald-400',
                    trend.impact === 'bearish' && 'text-red-400',
                    trend.impact === 'neutral' && 'text-zinc-500'
                  )}
                >
                  {trend.impact}
                </span>
              </div>
              {trend.source && (
                <div className="text-[9px] text-zinc-600 mt-1">
                  Source: {trend.source}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
