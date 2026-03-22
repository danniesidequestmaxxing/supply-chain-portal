'use client'

import { useMemo } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Company } from '@/data/types'
import { cn, formatPE, getPEColor } from '@/lib/utils'
import { CustomTooltip } from './CustomTooltip'

interface CompanyDeepDiveProps {
  company: Company
  allCompanies: Company[]
  accentColor: string
  onClose: () => void
  onNavigate: (company: Company) => void
}

function MetricCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-zinc-900 rounded-md p-2.5">
      <div className="text-[8px] uppercase tracking-widest text-zinc-500 mb-1">{label}</div>
      <div className={cn('mono text-sm font-bold', color || 'text-zinc-200')}>{value}</div>
    </div>
  )
}

export function CompanyDeepDive({ company, allCompanies, accentColor, onClose, onNavigate }: CompanyDeepDiveProps) {
  // Transform revenue history for Recharts
  const chartData = useMemo(() => {
    if (!company.revenueHistory?.length) return []
    const margin = company.ebitdaMargin || 0
    return company.revenueHistory.map((d, i, arr) => {
      // Simulate margin progression: ramp from (margin - 8) to current margin over the years
      const progress = arr.length > 1 ? i / (arr.length - 1) : 1
      const simulatedMargin = Math.round((margin - 8 + progress * 8) * 10) / 10
      return {
        year: d.year.toString(),
        revenue: Math.round(d.revenue / 100) / 10, // millions to billions with 1 decimal
        margin: Math.max(simulatedMargin, 0),
      }
    })
  }, [company])

  // Resolve supplier/customer tickers to Company objects
  const resolveCompanies = (tickers: string[]) => {
    return tickers.map(ticker => {
      const found = allCompanies.find(c => c.ticker === ticker)
      return { ticker, company: found }
    })
  }

  const suppliers = resolveCompanies(company.keySuppliers || [])
  const customers = resolveCompanies(company.keyCustomers || [])

  return (
    <div className="fixed inset-y-0 right-0 w-[420px] max-w-full z-50 bg-zinc-950 border-l border-zinc-800 shadow-2xl overflow-y-auto animate-slide-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1.5 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors z-10"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="p-5 space-y-5">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="mono text-lg font-bold" style={{ color: accentColor }}>{company.ticker}</span>
            {company.exchange && (
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 uppercase tracking-wider">
                {company.exchange}
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-zinc-200 mb-1.5">{company.name}</h3>
          <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{company.description}</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2">
          <MetricCard label="Market Cap" value={company.marketCap} />
          <MetricCard label="Fwd P/E" value={formatPE(company.peRatio)} color={getPEColor(company.peRatio)} />
          <MetricCard label="EV/EBITDA" value={company.evEbitda ? `${company.evEbitda}x` : 'N/M'} />
          <MetricCard
            label="Moat"
            value={company.moatRating}
            color={company.moatRating === 'High' ? 'text-emerald-400' : company.moatRating === 'Med' ? 'text-amber-400' : 'text-zinc-500'}
          />
          <MetricCard label="Beta" value={company.beta != null ? company.beta.toFixed(1) : '\u2014'} />
          <MetricCard
            label="FCF Yield"
            value={company.fcfYield != null ? `${company.fcfYield}%` : '\u2014'}
            color={company.fcfYield != null ? (company.fcfYield > 3 ? 'text-emerald-400' : company.fcfYield < 0 ? 'text-red-400' : 'text-zinc-300') : undefined}
          />
          <MetricCard
            label="Rev Growth"
            value={company.revenueGrowth != null ? `${company.revenueGrowth > 0 ? '+' : ''}${company.revenueGrowth}%` : '\u2014'}
            color={company.revenueGrowth != null ? (company.revenueGrowth > 20 ? 'text-emerald-400' : company.revenueGrowth < 0 ? 'text-red-400' : 'text-zinc-300') : undefined}
          />
          <MetricCard
            label="EBITDA Margin"
            value={company.ebitdaMargin != null ? `${company.ebitdaMargin}%` : '\u2014'}
          />
          <MetricCard
            label="Mkt Share"
            value={company.marketSharePercentage != null ? `${company.marketSharePercentage}%` : '\u2014'}
          />
        </div>

        {/* Revenue & Margin Chart */}
        {chartData.length > 0 && (
          <div>
            <h4 className="mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
              Financial Performance
            </h4>
            <div className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800/50">
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="year" tick={{ fill: '#a1a1aa', fontSize: 10 }} tickLine={false} axisLine={{ stroke: '#27272a' }} />
                  <YAxis yAxisId="revenue" tick={{ fill: '#a1a1aa', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${v}B`} />
                  <YAxis yAxisId="margin" orientation="right" tick={{ fill: '#a1a1aa', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}%`} domain={[0, 80]} />
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Tooltip content={<CustomTooltip /> as any} />
                  <Bar yAxisId="revenue" dataKey="revenue" name="Revenue" fill={accentColor} fillOpacity={0.6} radius={[2, 2, 0, 0]} />
                  <Line yAxisId="margin" dataKey="margin" name="EBITDA Margin" stroke="#4ade80" strokeWidth={2} dot={{ r: 3, fill: '#4ade80' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Products */}
        {company.products?.length > 0 && (
          <div>
            <h4 className="mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Products</h4>
            <div className="flex flex-wrap gap-1.5">
              {company.products.map((product) => (
                <span key={product} className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                  {product}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Supply Chain Relationships */}
        {suppliers.length > 0 && (
          <div>
            <h4 className="mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
              Key Suppliers
              <span className="text-zinc-600 ml-1.5 font-normal">{suppliers.length}</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {suppliers.map(({ ticker, company: co }) => (
                co ? (
                  <button
                    key={ticker}
                    onClick={() => onNavigate(co)}
                    className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-md px-2.5 py-1.5 transition-colors group cursor-pointer"
                  >
                    <span className="mono text-[10px] font-bold" style={{ color: accentColor }}>{co.ticker}</span>
                    <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400 truncate max-w-[120px]">{co.name}</span>
                    <ArrowUpRight className="w-2.5 h-2.5 text-zinc-600 group-hover:text-zinc-400" />
                  </button>
                ) : (
                  <span key={ticker} className="mono text-[10px] text-zinc-600 bg-zinc-900/50 border border-zinc-800/50 rounded-md px-2.5 py-1.5">
                    {ticker}
                  </span>
                )
              ))}
            </div>
          </div>
        )}

        {customers.length > 0 && (
          <div>
            <h4 className="mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
              Key Customers
              <span className="text-zinc-600 ml-1.5 font-normal">{customers.length}</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {customers.map(({ ticker, company: co }) => (
                co ? (
                  <button
                    key={ticker}
                    onClick={() => onNavigate(co)}
                    className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-md px-2.5 py-1.5 transition-colors group cursor-pointer"
                  >
                    <span className="mono text-[10px] font-bold" style={{ color: accentColor }}>{co.ticker}</span>
                    <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400 truncate max-w-[120px]">{co.name}</span>
                    <ArrowUpRight className="w-2.5 h-2.5 text-zinc-600 group-hover:text-zinc-400" />
                  </button>
                ) : (
                  <span key={ticker} className="mono text-[10px] text-zinc-600 bg-zinc-900/50 border border-zinc-800/50 rounded-md px-2.5 py-1.5">
                    {ticker}
                  </span>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
