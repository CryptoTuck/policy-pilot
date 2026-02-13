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
  status?: string;
  effective_date?: string;
  expiration_date?: string;
  renewal_date?: string;
  premium?: number;
  paid_in_full?: boolean;
  amount_due?: number;
  amount_paid?: number;

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
  vehicle_type?: string;
  uses?: string;
  coverages?: RawCanopyCoverage[];
}

// Normalized output types
export interface ParsedPolicy {
  type: 'home' | 'auto' | 'renters';
  sourceIndex: number;
  carrier?: string;
  policyNumber?: string;
  status?: string;
  effectiveDate?: string;
  expirationDate?: string;
  renewalDate?: string;
  premiumCents?: number;
  paidInFull?: boolean;
  amountDueCents?: number;
  amountPaidCents?: number;
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
  vehicleType?: string;
  uses?: string;
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
  const metadataKeys = ['MetaData', 'metadata', 'pullMetaData', 'pullMetadata', 'sessionToken', 'meta_data'];
  for (const key of metadataKeys) {
    if (rawData[key]) {
      metadata[key] = rawData[key];
    }
  }

  // Try to find policies in various locations
  let policiesSource: unknown = null;
  
  // Option 1: rawData.policies as array (simple format)
  if (rawData.policies && Array.isArray(rawData.policies)) {
    policiesSource = rawData.policies;
  }
  // Option 2: rawData.pull.policies as object with policy0, policy1, etc. (real Canopy format)
  else if (rawData.pull && typeof rawData.pull === 'object') {
    const pull = rawData.pull as Record<string, unknown>;
    if (pull.policies && typeof pull.policies === 'object') {
      policiesSource = pull.policies;
    }
    // Also extract metadata from pull
    if (pull.meta_data) {
      metadata['meta_data'] = pull.meta_data;
    }
  }
  // Option 3: rawData.policies as object with policy0, policy1, etc.
  else if (rawData.policies && typeof rawData.policies === 'object' && !Array.isArray(rawData.policies)) {
    policiesSource = rawData.policies;
  }

  // Parse policies if found
  if (policiesSource) {
    if (Array.isArray(policiesSource)) {
      // It's an array
      for (let i = 0; i < policiesSource.length; i++) {
        const policy = parseRawPolicy(policiesSource[i] as RawCanopyPolicy, i);
        if (policy) {
          policies.push(policy);
        }
      }
    } else if (typeof policiesSource === 'object') {
      // It's an object with keys like policy0, policy1, policy2
      const policiesObj = policiesSource as Record<string, unknown>;
      const policyKeys = Object.keys(policiesObj)
        .filter(k => k.startsWith('policy'))
        .sort((a, b) => {
          const numA = parseInt(a.replace('policy', ''), 10);
          const numB = parseInt(b.replace('policy', ''), 10);
          return numA - numB;
        });
      
      for (let i = 0; i < policyKeys.length; i++) {
        const policy = parseRawPolicy(policiesObj[policyKeys[i]] as RawCanopyPolicy, i);
        if (policy) {
          policies.push(policy);
        }
      }
    }
  }
  
  // If still no policies, try flattened Zapier format
  if (policies.length === 0) {
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

  // Parse dwellings (home/renters) - coverages are nested inside each dwelling
  if (raw.dwellings && Array.isArray(raw.dwellings)) {
    for (let di = 0; di < raw.dwellings.length; di++) {
      const dwelling = raw.dwellings[di] as Record<string, unknown>;
      
      // Canopy nests coverages inside each dwelling
      const dwellingCoverages = dwelling.coverages as Array<Record<string, unknown>> | undefined;
      if (dwellingCoverages && Array.isArray(dwellingCoverages)) {
        for (let ci = 0; ci < dwellingCoverages.length; ci++) {
          const cov = dwellingCoverages[ci];
          coverages.push({
            name: (cov.name as string) || (cov.friendly_name as string) || `Coverage ${ci}`,
            friendlyName: cov.friendly_name as string | undefined,
            perIncidentLimitCents: (cov.per_incident_limit_cents as number) ?? (cov.limit_per_occurrence as number) ?? (cov.limit as number),
            perPersonLimitCents: (cov.per_person_limit_cents as number) ?? (cov.limit_per_person as number),
            deductibleCents: (cov.deductible_cents as number) ?? (cov.deductible as number),
            isDeclined: (cov.is_declined as boolean) ?? false,
            sourceIndex: ci,
          });
        }
      } else {
        // Fallback: dwelling itself might be a coverage (old format)
        const cov = dwelling as unknown as RawCanopyCoverage;
        if (cov.name || cov.friendly_name) {
          coverages.push({
            name: cov.name || cov.friendly_name || `Coverage ${di}`,
            friendlyName: cov.friendly_name,
            perIncidentLimitCents: cov.limit_per_occurrence ?? cov.limit,
            perPersonLimitCents: cov.limit_per_person,
            deductibleCents: cov.deductible,
            isDeclined: cov.is_declined ?? false,
            sourceIndex: di,
          });
        }
      }
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
        vehicleType: vehicle.vehicle_type,
        uses: vehicle.uses,
      });

      // Parse coverages for this vehicle
      if (vehicle.coverages && Array.isArray(vehicle.coverages)) {
        for (let ci = 0; ci < vehicle.coverages.length; ci++) {
          const cov = vehicle.coverages[ci] as Record<string, unknown>;
          coverages.push({
            name: (cov.name as string) || (cov.friendly_name as string) || `Coverage ${ci}`,
            friendlyName: cov.friendly_name as string | undefined,
            perIncidentLimitCents: (cov.per_incident_limit_cents as number) ?? (cov.limit_per_occurrence as number) ?? (cov.limit as number),
            perPersonLimitCents: (cov.per_person_limit_cents as number) ?? (cov.limit_per_person as number),
            deductibleCents: (cov.deductible_cents as number) ?? (cov.deductible as number),
            isDeclined: (cov.is_declined as boolean) ?? false,
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
    status: raw.status,
    effectiveDate: raw.effective_date,
    expirationDate: raw.expiration_date,
    renewalDate: raw.renewal_date,
    premiumCents: raw.premium ? Math.round(raw.premium * 100) : undefined,
    paidInFull: raw.paid_in_full,
    amountDueCents: raw.amount_due ? Math.round(raw.amount_due * 100) : undefined,
    amountPaidCents: raw.amount_paid ? Math.round(raw.amount_paid * 100) : undefined,
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
  // Use friendly name for both display and matching (raw Canopy names are UPPER_SNAKE_CASE)
  const displayName = cov.friendlyName || cov.name;
  const matchName = displayName.toLowerCase();

  if (cov.isDeclined) {
    return `${displayName}: None`;
  }

  // Auto-specific formatting
  if (policyType === 'auto') {
    // Split-limit coverages: show per-person/per-accident
    if (matchName.includes('bodily injury') || matchName.includes('uninsured motorist') || matchName.includes('underinsured motorist')) {
      if (cov.perPersonLimitCents && cov.perIncidentLimitCents) {
        return `${displayName}: ${formatMoneyWhole(cov.perPersonLimitCents)}/${formatMoneyWhole(cov.perIncidentLimitCents)}`;
      } else if (cov.perIncidentLimitCents) {
        return `${displayName}: ${formatMoneyWhole(cov.perIncidentLimitCents)}`;
      }
      return `${displayName}: None`;
    }

    if (matchName === 'collision' || matchName === 'comprehensive') {
      if (cov.deductibleCents) {
        return `${displayName}: ${formatMoney(cov.deductibleCents)} deductible`;
      }
      return `${displayName}: Not included`;
    }

    if (matchName.includes('emergency road') || matchName.includes('roadside')) {
      return `${displayName}: Yes`;
    }

    if (matchName === 'property damage liability') {
      if (cov.perIncidentLimitCents) {
        return `${displayName}: ${formatMoneyWhole(cov.perIncidentLimitCents)}`;
      }
      return `${displayName}: None`;
    }

    if (matchName === 'medical payments') {
      // Medical payments may come as per-person or per-incident
      if (cov.perPersonLimitCents) {
        return `${displayName}: ${formatMoneyWhole(cov.perPersonLimitCents)}`;
      } else if (cov.perIncidentLimitCents) {
        return `${displayName}: ${formatMoneyWhole(cov.perIncidentLimitCents)}`;
      }
      return `${displayName}: None`;
    }

    if (matchName.includes('car rental') || matchName.includes('rental reimbursement')) {
      if (cov.perPersonLimitCents) {
        return `${displayName}: ${formatMoney(cov.perPersonLimitCents)}`;
      } else if (cov.perIncidentLimitCents) {
        return `${displayName}: ${formatMoney(cov.perIncidentLimitCents)}`;
      }
      return `${displayName}: Not included`;
    }
  }

  // Home/renters formatting
  if (policyType === 'home' || policyType === 'renters') {
    // Show deductible-based coverages with their deductible amount
    if (matchName.includes('all other perils') || matchName.includes('windstorm') || matchName === 'all perils') {
      if (cov.deductibleCents) {
        return `${displayName} Deductible: ${formatMoney(cov.deductibleCents)}`;
      }
      return `${displayName} Deductible: Not specified`;
    }

    // Per-person coverages
    if (matchName.includes('personal liability') || matchName.includes('medical payments')) {
      if (cov.perPersonLimitCents) {
        return `${displayName}: ${formatMoneyWhole(cov.perPersonLimitCents)}`;
      } else if (cov.perIncidentLimitCents) {
        return `${displayName}: ${formatMoneyWhole(cov.perIncidentLimitCents)}`;
      }
      return `${displayName}: None`;
    }

    if (cov.perIncidentLimitCents) {
      return `${displayName}: ${formatMoneyWhole(cov.perIncidentLimitCents)}`;
    }
    return `${displayName}: None`;
  }

  // Default formatting
  if (cov.perIncidentLimitCents) {
    return `${displayName}: ${formatMoneyWhole(cov.perIncidentLimitCents)}`;
  } else if (cov.perPersonLimitCents) {
    return `${displayName}: ${formatMoneyWhole(cov.perPersonLimitCents)}`;
  }
  return null;
}
