export type RiskTier = 'low' | 'moderate' | 'elevated';

export interface CoverageGrade {
  name: string;
  limit?: string; // e.g., "$350,000", "2% of Dwelling"
  score: number; // 1-5
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
  summary: string;
  keyStrengths: string[];
  areasToReview: string[];
}

export interface PolicyReport {
  id: string;
  generatedAt: string;
  homeGrade?: HomePolicyGrade;
  autoGrade?: AutoPolicyGrade;
  combinedGrade?: string;
  combinedScore?: number;
}
