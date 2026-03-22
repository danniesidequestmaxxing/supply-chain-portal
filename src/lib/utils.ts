import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPE(pe: number | null): string {
  if (pe === null) return 'N/M'
  return `${pe}x`
}

export function getMoatColor(moat: 'High' | 'Med' | 'Low'): string {
  switch (moat) {
    case 'High': return 'text-emerald-400'
    case 'Med': return 'text-amber-400'
    case 'Low': return 'text-zinc-500'
  }
}

export function getPEColor(pe: number | null): string {
  if (pe === null) return 'text-zinc-500'
  if (pe <= 18) return 'text-emerald-400'
  if (pe <= 30) return 'text-zinc-300'
  return 'text-red-400'
}

export function getPositionColor(pos: string): string {
  switch (pos) {
    case 'upstream': return '#4ade80'
    case 'midstream': return '#60a5fa'
    case 'downstream': return '#fbbf24'
    default: return '#a3a3a3'
  }
}
