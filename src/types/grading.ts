export type RiskTier = 'low' | 'moderate' | 'elevated';

export type CoverageScore = number | 'bonus';

export interface CoverageGrade {
  name: string;
  limit?: string; // e.g., "$350,000", "2% of Dwelling"
  score: CoverageScore; // 1-5, or "bonus" for non-scored coverages
  maxScore: 5;
  explanation: string;
  recommendation?: string;
}

export interface AdditionalCoverageAssessment {
  name: string;
  limit?: string; // e.g., "$25,000", "None"
  present: boolean;
  relevance: 'low' | 'situational' | 'often_worth_reviewing';
  note?: string;
}

export interface HomePolicyGrade {
  overallGrade: string; // A, B, C, D, F
  overallScore: number; // 0-100
  riskTier: RiskTier; // internal, not displayed
  standardCoverages: CoverageGrade[];
  deductibleGrade: CoverageGrade;
  additionalCoverages: AdditionalCoverageAssessment[];
  summary: string;
  keyStrengths: string[];
  areasToReview: string[];
}

export interface AutoPolicyGrade {
  overallGrade: string; // A, B, C, D, F
  overallScore: number; // 0-100
  riskTier: RiskTier; // internal, not displayed
  standardCoverages: CoverageGrade[];
  additionalCoverages?: AdditionalCoverageAssessment[];
  summary: string;
  keyStrengths: string[];
  areasToReview: string[];
  // For multiple auto policies, store individual policy details
  vehicleInfo?: string; // e.g., "2024 TESLA Model Y"
  policyNumber?: string;
}

export type CondoPolicyGrade = HomePolicyGrade;

export interface RentersPolicyGrade {
  overallGrade: string; // A, B, C, D, F
  overallScore: number; // 0-100
  riskTier: RiskTier;
  standardCoverages: CoverageGrade[];
  deductibleGrade?: CoverageGrade;
  additionalCoverages?: AdditionalCoverageAssessment[];
  summary: string;
  keyStrengths: string[];
  areasToReview: string[];
}

export interface CarrierAlignmentFinding {
  type: 'gap' | 'alignment' | 'value';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  affectedPolicies: string[]; // e.g., ['home', 'auto'] or ['auto-1', 'auto-2']
}

export interface CarrierAlignmentAnalysis {
  findings: CarrierAlignmentFinding[];
  isBundled: boolean;
  liabilityAligned: boolean;
  portfolioEfficiencyScore?: number; // 0-100
  summary: string;
}

export interface PolicyReport {
  id: string;
  generatedAt: string;
  homeGrade?: HomePolicyGrade;
  condoGrade?: CondoPolicyGrade;
  autoGrade?: AutoPolicyGrade;
  autoGrades?: AutoPolicyGrade[]; // For multiple auto policies
  rentersGrade?: RentersPolicyGrade;
  combinedGrade?: string;
  combinedScore?: number;
  carrierAnalysis?: CarrierAlignmentAnalysis;
  // Carrier names per policy type
  carriers?: {
    home?: string;
    auto?: string;
    renters?: string;
  };
}
