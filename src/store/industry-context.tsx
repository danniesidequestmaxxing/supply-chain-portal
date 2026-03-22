'use client'
import { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import { industries } from '@/data/industries'
import { Industry } from '@/data/types'

interface IndustryContextValue {
  selectedIndustryId: string
  setSelectedIndustryId: (id: string) => void
  currentIndustry: Industry
  allIndustries: Industry[]
}

const IndustryContext = createContext<IndustryContextValue | null>(null)

export function IndustryProvider({ children }: { children: ReactNode }) {
  const [selectedIndustryId, setSelectedIndustryId] = useState('semiconductors')

  const currentIndustry = useMemo(() => {
    return industries.find(i => i.industryId === selectedIndustryId) || industries[0]
  }, [selectedIndustryId])

  return (
    <IndustryContext.Provider value={{ selectedIndustryId, setSelectedIndustryId, currentIndustry, allIndustries: industries }}>
      {children}
    </IndustryContext.Provider>
  )
}

export function useIndustry() {
  const ctx = useContext(IndustryContext)
  if (!ctx) throw new Error('useIndustry must be used within IndustryProvider')
  return ctx
}
