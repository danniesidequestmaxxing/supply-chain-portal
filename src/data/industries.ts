import { semiconductorsData } from './semiconductors';
import { electricVehiclesData } from './electric-vehicles';
import { defenseData } from './defense';
import { energyData } from './energy';
import { datacentersData } from './datacenters';
import { roboticsData } from './robotics';
import { miningData } from './mining';
import { agricultureData } from './agriculture';
import { Industry } from './types';

export const industries: Industry[] = [
  semiconductorsData,
  electricVehiclesData,
  defenseData,
  energyData,
  datacentersData,
  roboticsData,
  miningData,
  agricultureData,
];

export function getIndustryById(id: string): Industry | undefined {
  return industries.find(i => i.industryId === id);
}
