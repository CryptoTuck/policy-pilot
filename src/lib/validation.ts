import { z } from 'zod';

// Flexible schema that accepts data from Zapier/Canopy
// Uses coercion and defaults to handle various input formats

export const homeCoverageSchema = z.object({
  dwelling: z.coerce.number().min(0),
  dwellingType: z.enum(['replacement_cost', 'actual_cash_value', 'unknown']).default('unknown'),
  otherStructures: z.coerce.number().min(0).default(0),
  personalProperty: z.coerce.number().min(0).default(0),
  personalPropertyType: z.enum(['replacement_cost', 'actual_cash_value', 'unknown']).default('unknown'),
  lossOfUse: z.union([z.coerce.number(), z.string()]).default(0),
  lossOfUseType: z.enum(['months', 'flat_dollar', 'percent_of_dwelling']).default('flat_dollar'),
  personalLiability: z.coerce.number().min(0).default(0),
  medicalPayments: z.coerce.number().min(0).default(0),
  deductible: z.coerce.number().min(0).default(0),
});

export const homeAdditionalCoveragesSchema = z.object({
  waterBackup: z.union([z.boolean(), z.coerce.number()]).default(false),
  equipmentBreakdown: z.coerce.boolean().default(false),
  serviceLine: z.union([z.boolean(), z.coerce.number()]).default(false),
  ordinanceLaw: z.union([z.boolean(), z.coerce.number()]).default(false),
  identityTheft: z.union([z.boolean(), z.coerce.number()]).default(false),
  scheduledProperty: z.union([z.boolean(), z.coerce.number()]).default(false),
}).default({});

export const homePolicySchema = z.object({
  type: z.literal('home').default('home'),
  policyType: z.enum(['HO3', 'HO5', 'HO6', 'HO4', 'other']).default('HO3'),
  state: z.string().length(2).toUpperCase(),
  coverage: homeCoverageSchema,
  additionalCoverages: homeAdditionalCoveragesSchema,
  priorClaims: z.coerce.number().min(0).default(0),
  hasDetachedStructures: z.coerce.boolean().default(false),
  hasPool: z.coerce.boolean().default(false),
  hasDog: z.coerce.boolean().default(false),
  hasTrampoline: z.coerce.boolean().default(false),
});

export const autoCoverageSchema = z.object({
  bodilyInjuryPerPerson: z.coerce.number().min(0).default(0),
  bodilyInjuryPerAccident: z.coerce.number().min(0).default(0),
  propertyDamage: z.coerce.number().min(0).default(0),
  uninsuredMotoristPerPerson: z.coerce.number().min(0).default(0),
  uninsuredMotoristPerAccident: z.coerce.number().min(0).default(0),
  underinsuredMotoristPerPerson: z.coerce.number().min(0).default(0),
  underinsuredMotoristPerAccident: z.coerce.number().min(0).default(0),
  medicalPayments: z.coerce.number().min(0).default(0),
  collision: z.coerce.number().nullable().default(null),
  collisionDeductible: z.coerce.number().nullable().default(null),
  comprehensive: z.coerce.number().nullable().default(null),
  comprehensiveDeductible: z.coerce.number().nullable().default(null),
});

export const vehicleSchema = z.object({
  year: z.coerce.number().min(1900).max(2030),
  make: z.string().min(1),
  model: z.string().min(1),
  estimatedValue: z.coerce.number().min(0).default(0),
  isFinanced: z.coerce.boolean().default(false),
});

export const autoPolicySchema = z.object({
  type: z.literal('auto').default('auto'),
  state: z.string().length(2).toUpperCase(),
  coverage: autoCoverageSchema,
  vehicles: z.array(vehicleSchema).min(1),
  priorClaims: z.coerce.number().min(0).default(0),
  hasHealthInsurance: z.coerce.boolean().default(true),
});

export const policySubmissionSchema = z.object({
  homePolicy: homePolicySchema.optional(),
  autoPolicy: autoPolicySchema.optional(),
  contactEmail: z.string().email().optional(),
  contactName: z.string().optional(),
}).refine(
  (data) => data.homePolicy || data.autoPolicy,
  { message: 'At least one policy (home or auto) must be provided' }
);

export type ValidatedPolicySubmission = z.infer<typeof policySubmissionSchema>;
