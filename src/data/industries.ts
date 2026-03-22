import { semiconductorsData } from './semiconductors';
import { electricVehiclesData } from './electric-vehicles';
import { Industry } from './types';

export const industries: Industry[] = [semiconductorsData, electricVehiclesData];

export function getIndustryById(id: string): Industry | undefined {
  return industries.find(i => i.industryId === id);
}
