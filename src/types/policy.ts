// Home Policy Types
export interface HomeCoverage {
  dwelling: number;
  dwellingType: 'replacement_cost' | 'actual_cash_value' | 'unknown';
  otherStructures: number;
  otherStructuresPercent: number; // calculated as % of dwelling
  personalProperty: number;
  personalPropertyPercent: number; // calculated as % of dwelling
  personalPropertyType: 'replacement_cost' | 'actual_cash_value' | 'unknown';
  lossOfUse: number | string; // can be months or flat dollar
  lossOfUseType: 'months' | 'flat_dollar' | 'percent_of_dwelling';
  personalLiability: number;
  medicalPayments: number;
  deductible: number;
  deductiblePercent: number; // calculated as % of dwelling
}

export interface HomeAdditionalCoverages {
  waterBackup: boolean | number;
  equipmentBreakdown: boolean;
  serviceLine: boolean | number;
  ordinanceLaw: boolean | number;
  identityTheft: boolean | number;
  scheduledProperty: boolean | number;
}

export interface HomePolicy {
  type: 'home';
  policyType: 'HO3' | 'HO5' | 'HO6' | 'HO4' | 'other';
  state: string;
  coverage: HomeCoverage;
  additionalCoverages: HomeAdditionalCoverages;
  priorClaims: number;
  hasDetachedStructures: boolean;
  hasPool: boolean;
  hasDog: boolean;
  hasTrampoline: boolean;
}

// Auto Policy Types
export interface AutoCoverage {
  bodilyInjuryPerPerson: number;
  bodilyInjuryPerAccident: number;
  propertyDamage: number;
  uninsuredMotoristPerPerson: number;
  uninsuredMotoristPerAccident: number;
  underinsuredMotoristPerPerson: number;
  underinsuredMotoristPerAccident: number;
  medicalPayments: number;
  collision: number | null; // null = declined
  collisionDeductible: number | null;
  comprehensive: number | null; // null = declined
  comprehensiveDeductible: number | null;
}

export interface Vehicle {
  year: number;
  make: string;
  model: string;
  estimatedValue: number;
  isFinanced: boolean;
}

export interface AutoPolicy {
  type: 'auto';
  state: string;
  coverage: AutoCoverage;
  vehicles: Vehicle[];
  priorClaims: number;
  hasHealthInsurance: boolean;
}

// Combined Policy Submission
export interface PolicySubmission {
  id: string;
  submittedAt: string;
  homePolicy?: HomePolicy;
  autoPolicy?: AutoPolicy;
  contactEmail?: string;
  contactName?: string;
}
