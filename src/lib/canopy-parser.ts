/**
 * Canopy Connect Raw Data Parser
 * 
 * This module handles parsing raw Canopy Connect JSON data into a normalized structure.
 * It properly handles:
 * - Variable policy ordering (home/auto/renters can be in any position)
 * - Multiple vehicles per auto policy
 * - Sparse arrays where empty values exist
 * - Different data formats (arrays, comma-separated strings, etc.)
 */

// Types for raw Canopy data
export interface RawCanopyData {
  // Policies array from Canopy
  policies?: RawCanopyPolicy[];
  
  // Or flattened fields (from Zapier)
  [key: string]: unknown;
}

export interface RawCanopyPolicy {
  id?: string;
  policy_type?: string;
  carrier?: {
    name?: string;
  } | string;
  policy_number?: string;
  effective_date?: string;
  expiration_date?: string;
  premium?: number;
  
  // Home/Renters policies have dwellings
  dwellings?: RawCanopyCoverage[];
  
  // Auto policies have vehicles
  vehicles?: RawCanopyVehicle[];
}

export interface RawCanopyCoverage {
  name?: string;
  friendly_name?: string;
  limit?: number;
  limit_per_occurrence?: number;
  limit_per_person?: number;
  deductible?: number;
  is_declined?: boolean;
}

export interface RawCanopyVehicle {
  year?: number;
  make?: string;
  model?: string;
  vin?: string;
  coverages?: RawCanopyCoverage[];
}

// Normalized output types
export interface ParsedPolicy {
  type: 'home' | 'auto' | 'renters';
  sourceIndex: number;
  carrier?: string;
  policyNumber?: string;
  effectiveDate?: string;
  expirationDate?: string;
  premiumCents?: number;
  vehicleCount?: number;
  coverages: ParsedCoverage[];
  vehicles?: ParsedVehicle[];
}

export interface ParsedCoverage {
  name: string;
  friendlyName?: string;
  perIncidentLimitCents?: number;
  perPersonLimitCents?: number;
  deductibleCents?: number;
  isDeclined: boolean;
  vehicleIndex?: number;
  sourceIndex: number;
}

export interface ParsedVehicle {
  index: number;
  year?: number;
  make?: string;
  model?: string;
  vin?: string;
}

export interface ParsedCanopyData {
  policies: ParsedPolicy[];
  metadata: Record<string, unknown>;
}

/**
 * Main parser function - handles any Canopy data format
 */
export function parseCanopyData(rawData: RawCanopyData): ParsedCanopyData {
  const policies: ParsedPolicy[] = [];
  const metadata: Record<string, unknown> = {};

  // Extract metadata fields
  const metadataKeys = ['MetaData', 'metadata', 'pullMetaData', 'pullMetadata', 'sessionToken'];
  for (const key of metadataKeys) {
    if (rawData[key]) {
      metadata[key] = rawData[key];
    }
  }

  // Check if we have a policies array (raw Canopy format)
  if (rawData.policies && Array.isArray(rawData.policies)) {
    for (let i = 0; i < rawData.policies.length; i++) {
      const policy = parseRawPolicy(rawData.policies[i], i);
      if (policy) {
        policies.push(policy);
      }
    }
  } else {
    // Try to parse flattened Zapier format
    const flattenedPolicies = parseFlattenedFormat(rawData);
    policies.push(...flattenedPolicies);
  }

  return { policies, metadata };
}

/**
 * Parse a single raw policy from Canopy
 */
function parseRawPolicy(raw: RawCanopyPolicy, index: number): ParsedPolicy | null {
  // Determine policy type
  let type: 'home' | 'auto' | 'renters';
  
  if (raw.policy_type) {
    const pt = raw.policy_type.toLowerCase();
    if (pt.includes('auto') || pt.includes('car') || pt.includes('vehicle')) {
      type = 'auto';
    } else if (pt.includes('rent')) {
      type = 'renters';
    } else if (pt.includes('home') || pt.includes('dwelling') || pt.includes('ho3') || pt.includes('ho5')) {
      type = 'home';
    } else {
      // Infer from structure
      type = raw.vehicles ? 'auto' : (raw.dwellings ? 'home' : 'home');
    }
  } else {
    // Infer from structure
    type = raw.vehicles ? 'auto' : 'home';
  }

  const coverages: ParsedCoverage[] = [];
  const vehicles: ParsedVehicle[] = [];
  let vehicleCount = 1;

  // Parse dwellings (home/renters)
  if (raw.dwellings && Array.isArray(raw.dwellings)) {
    for (let i = 0; i < raw.dwellings.length; i++) {
      const cov = raw.dwellings[i];
      coverages.push({
        name: cov.name || cov.friendly_name || `Coverage ${i}`,
        friendlyName: cov.friendly_name,
        perIncidentLimitCents: cov.limit_per_occurrence ?? cov.limit,
        perPersonLimitCents: cov.limit_per_person,
        deductibleCents: cov.deductible,
        isDeclined: cov.is_declined ?? false,
        sourceIndex: i,
      });
    }
  }

  // Parse vehicles (auto)
  if (raw.vehicles && Array.isArray(raw.vehicles)) {
    vehicleCount = raw.vehicles.length;
    
    for (let vi = 0; vi < raw.vehicles.length; vi++) {
      const vehicle = raw.vehicles[vi];
      
      vehicles.push({
        index: vi,
        year: vehicle.year,
        make: vehicle.make,
        model: vehicle.model,
        vin: vehicle.vin,
      });

      // Parse coverages for this vehicle
      if (vehicle.coverages && Array.isArray(vehicle.coverages)) {
        for (let ci = 0; ci < vehicle.coverages.length; ci++) {
          const cov = vehicle.coverages[ci];
          coverages.push({
            name: cov.name || cov.friendly_name || `Coverage ${ci}`,
            friendlyName: cov.friendly_name,
            perIncidentLimitCents: cov.limit_per_occurrence ?? cov.limit,
            perPersonLimitCents: cov.limit_per_person,
            deductibleCents: cov.deductible,
            isDeclined: cov.is_declined ?? false,
            vehicleIndex: vi,
            sourceIndex: ci,
          });
        }
      }
    }
  }

  // Get carrier name
  let carrier: string | undefined;
  if (typeof raw.carrier === 'string') {
    carrier = raw.carrier;
  } else if (raw.carrier?.name) {
    carrier = raw.carrier.name;
  }

  return {
    type,
    sourceIndex: index,
    carrier,
    policyNumber: raw.policy_number,
    effectiveDate: raw.effective_date,
    expirationDate: raw.expiration_date,
    premiumCents: raw.premium ? Math.round(raw.premium * 100) : undefined,
    vehicleCount,
    coverages,
    vehicles: vehicles.length > 0 ? vehicles : undefined,
  };
}

/**
 * Parse flattened format (from Zapier with concatenated fields)
 * This handles the "Policy 0 Dwellings Coverages Friendly Name" style fields
 */
function parseFlattenedFormat(rawData: RawCanopyData): ParsedPolicy[] {
  const policies: ParsedPolicy[] = [];
  
  // Look for policy indicators
  const policyPatterns = [
    { type: 'home' as const, nameKey: 'homeNames', amountKey: 'homeAmounts', deductibleKey: 'homeDeductibles', perPersonKey: 'homePerPerson', declinedKey: 'homeDeclined', effectiveKey: 'homeEffectiveDate' },
    { type: 'auto' as const, nameKey: 'autoNames', amountKey: 'autoAmounts', deductibleKey: 'autoDeductibles', perPersonKey: 'autoPerPersonLimits', declinedKey: 'autoDeclined', effectiveKey: 'autoEffectiveDate' },
    { type: 'renters' as const, nameKey: 'rentersNames', amountKey: 'rentersAmounts', deductibleKey: 'rentersDeductibles', perPersonKey: 'rentersPerPerson', declinedKey: 'rentersDeclined', effectiveKey: 'rentersEffectiveDate' },
  ];

  for (const pattern of policyPatterns) {
    const names = normalizeToArray(rawData[pattern.nameKey]);
    if (names.length === 0) continue;

    const amounts = normalizeToArray(rawData[pattern.amountKey]);
    const deductibles = normalizeToArray(rawData[pattern.deductibleKey]);
    const perPerson = normalizeToArray(rawData[pattern.perPersonKey]);
    const declined = normalizeToArray(rawData[pattern.declinedKey]);
    const effectiveDate = rawData[pattern.effectiveKey] as string | undefined;

    const coverages: ParsedCoverage[] = [];
    
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      if (!name || name === 'null' || name === '') continue;

      coverages.push({
        name,
        perIncidentLimitCents: parseNumber(amounts[i]),
        perPersonLimitCents: parseNumber(perPerson[i]),
        deductibleCents: parseNumber(deductibles[i]),
        isDeclined: parseBool(declined[i]),
        sourceIndex: i,
      });
    }

    if (coverages.length > 0) {
      policies.push({
        type: pattern.type,
        sourceIndex: policies.length,
        effectiveDate,
        vehicleCount: 1,
        coverages,
      });
    }
  }

  return policies;
}

/**
 * Normalize any value to an array of strings
 */
function normalizeToArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') return [];
    // Handle JSON array format
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch {
        // Fall through to comma split
      }
    }
    // Split by comma
    return trimmed.split(',').map(s => s.trim());
  }
  return [];
}

/**
 * Parse a value to a number (cents)
 */
function parseNumber(value: unknown): number | undefined {
  if (value === null || value === undefined || value === '' || value === 'null') {
    return undefined;
  }
  const num = typeof value === 'string' ? Number(value) : Number(value);
  if (isNaN(num)) return undefined;
  return num;
}

/**
 * Parse a value to boolean
 */
function parseBool(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return false;
}

/**
 * Format cents to dollar string
 */
export function formatMoney(cents: number | undefined | null): string | null {
  if (cents === null || cents === undefined) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

/**
 * Format cents to whole dollar string (no cents)
 */
export function formatMoneyWhole(cents: number | undefined | null): string | null {
  if (cents === null || cents === undefined) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

/**
 * Format parsed coverages into human-readable strings
 */
export function formatCoverages(policy: ParsedPolicy): {
  coverageString: string;
  deductibleString: string;
} {
  const coverageItems: string[] = [];
  const deductibleItems: string[] = [];

  // Group coverages by vehicle if auto policy
  if (policy.type === 'auto' && policy.vehicles && policy.vehicles.length > 1) {
    // Multi-vehicle handling
    const vehicleGroups = new Map<number, ParsedCoverage[]>();
    const sharedCoverages: ParsedCoverage[] = [];

    for (const cov of policy.coverages) {
      if (cov.vehicleIndex !== undefined) {
        if (!vehicleGroups.has(cov.vehicleIndex)) {
          vehicleGroups.set(cov.vehicleIndex, []);
        }
        vehicleGroups.get(cov.vehicleIndex)!.push(cov);
      } else {
        sharedCoverages.push(cov);
      }
    }

    // Format shared coverages first
    for (const cov of sharedCoverages) {
      const formatted = formatSingleCoverage(cov, policy.type);
      if (formatted) coverageItems.push(formatted);
    }

    // Then per-vehicle coverages
    for (const [vehicleIdx, coverages] of vehicleGroups) {
      const vehicle = policy.vehicles.find(v => v.index === vehicleIdx);
      const vehicleLabel = vehicle 
        ? `${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''}`.trim() || `Vehicle ${vehicleIdx + 1}`
        : `Vehicle ${vehicleIdx + 1}`;
      
      const vehicleCoverages: string[] = [];
      for (const cov of coverages) {
        const formatted = formatSingleCoverage(cov, policy.type);
        if (formatted) vehicleCoverages.push(formatted);
      }
      if (vehicleCoverages.length > 0) {
        coverageItems.push(`[${vehicleLabel}] ${vehicleCoverages.join(', ')}`);
      }
    }
  } else {
    // Single vehicle or home/renters
    for (const cov of policy.coverages) {
      const formatted = formatSingleCoverage(cov, policy.type);
      if (formatted) coverageItems.push(formatted);
      
      // Track deductibles for home
      if (policy.type === 'home' && cov.deductibleCents) {
        deductibleItems.push(`${cov.name}: ${formatMoney(cov.deductibleCents)}`);
      }
    }
  }

  return {
    coverageString: coverageItems.join(', '),
    deductibleString: deductibleItems.join(', '),
  };
}

function formatSingleCoverage(cov: ParsedCoverage, policyType: 'home' | 'auto' | 'renters'): string | null {
  if (cov.isDeclined) {
    return `${cov.name}: None`;
  }

  // Auto-specific formatting
  if (policyType === 'auto') {
    const splitLimitCoverages = [
      'Bodily Injury Liability',
      'Uninsured Motorist Bodily Injury Liability',
      'Underinsured Motorist Bodily Injury Liability',
    ];

    if (splitLimitCoverages.includes(cov.name)) {
      if (cov.perPersonLimitCents && cov.perIncidentLimitCents) {
        return `${cov.name}: ${formatMoneyWhole(cov.perPersonLimitCents)}/${formatMoneyWhole(cov.perIncidentLimitCents)}`;
      } else if (cov.perIncidentLimitCents) {
        return `${cov.name}: ${formatMoneyWhole(cov.perIncidentLimitCents)}`;
      }
      return `${cov.name}: None`;
    }

    if (cov.name === 'Collision' || cov.name === 'Comprehensive') {
      if (cov.deductibleCents) {
        return `${cov.name}: ${formatMoney(cov.deductibleCents)} deductible`;
      }
      return null; // Skip if no deductible
    }

    if (cov.name === 'Emergency Road Service') {
      return `${cov.name}: Yes`;
    }

    if (cov.name === 'Property Damage Liability' || cov.name === 'Medical Payments') {
      if (cov.perIncidentLimitCents) {
        return `${cov.name}: ${formatMoneyWhole(cov.perIncidentLimitCents)}`;
      }
      return `${cov.name}: None`;
    }

    if (cov.name === 'Car Rental and Travel Expenses' || cov.name === 'Rental Reimbursement') {
      if (cov.perPersonLimitCents) {
        return `${cov.name}: ${formatMoney(cov.perPersonLimitCents)}`;
      } else if (cov.perIncidentLimitCents) {
        return `${cov.name}: ${formatMoney(cov.perIncidentLimitCents)}`;
      }
      return null;
    }
  }

  // Home/renters formatting
  if (policyType === 'home' || policyType === 'renters') {
    const skipCoverages = ['All Other Perils', 'Windstorm or Hail', 'All Perils'];
    if (skipCoverages.includes(cov.name)) {
      return null;
    }

    const perPersonCoverages = ['Personal Liability', 'Medical Payments to Others', 'Medical Payments'];
    if (perPersonCoverages.includes(cov.name)) {
      if (cov.perPersonLimitCents) {
        return `${cov.name}: ${formatMoneyWhole(cov.perPersonLimitCents)}`;
      } else if (cov.perIncidentLimitCents) {
        return `${cov.name}: ${formatMoneyWhole(cov.perIncidentLimitCents)}`;
      }
      return `${cov.name}: None`;
    }

    if (cov.perIncidentLimitCents) {
      return `${cov.name}: ${formatMoneyWhole(cov.perIncidentLimitCents)}`;
    }
    return `${cov.name}: None`;
  }

  // Default formatting
  if (cov.perIncidentLimitCents) {
    return `${cov.name}: ${formatMoneyWhole(cov.perIncidentLimitCents)}`;
  }
  return null;
}
