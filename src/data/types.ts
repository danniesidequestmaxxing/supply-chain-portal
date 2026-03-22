export type MoatRating = 'High' | 'Med' | 'Low';
export type SupplyChainPosition = 'upstream' | 'midstream' | 'downstream';

export interface RevenueDataPoint {
  year: number;
  quarter?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  revenue: number; // In millions USD
}

export interface Company {
  name: string;
  ticker: string;
  exchange?: string;
  marketCap: string;
  marketCapNumeric: number; // In billions
  peRatio: number | null;
  evEbitda: number | null;
  moatRating: MoatRating;
  marketSharePercentage: number | null;
  description: string;
  products: string[];
  keySuppliers: string[];
  keyCustomers: string[];
  revenueHistory: RevenueDataPoint[];
  beta: number | null;
  fcfYield: number | null;
  revenueGrowth: number | null;
  ebitdaMargin: number | null;
}

export interface SupplyChainNode {
  id: string;
  name: string;
  position: SupplyChainPosition;
  description: string;
  companies: Company[];
  color: string;
}

export interface SupplyChainLink {
  supplierTicker: string;
  customerTicker: string;
  relationship: string;
  category: string;
}

export interface MacroTrend {
  title: string;
  description: string;
  impact: 'bullish' | 'bearish' | 'neutral';
  source?: string;
}

export interface IndustryKeyMetric {
  label: string;
  value: string;
  change?: string;
  direction?: 'up' | 'down' | 'flat';
}

export interface Industry {
  industryId: string;
  industryName: string;
  icon: string; // Lucide icon name
  accentColor: string;
  description: string;
  macroTrends: MacroTrend[];
  supplyChain: SupplyChainNode[];
  supplyChainLinks: SupplyChainLink[];
  keyMetrics: IndustryKeyMetric[];
}
