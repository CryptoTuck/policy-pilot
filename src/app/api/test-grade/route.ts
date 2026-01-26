import { NextResponse } from 'next/server';
import { gradePolicy } from '@/lib/grader';
import { generateId, storeSubmission, storeReport } from '@/lib/storage';
import type { PolicySubmission, HomePolicy, AutoPolicy } from '@/types/policy';

// Sample policy data for testing
const sampleHomePolicy: HomePolicy = {
  type: 'home',
  policyType: 'HO3',
  state: 'TX',
  coverage: {
    dwelling: 350000,
    dwellingType: 'replacement_cost',
    otherStructures: 35000,
    otherStructuresPercent: 10,
    personalProperty: 175000,
    personalPropertyPercent: 50,
    personalPropertyType: 'replacement_cost',
    lossOfUse: 70000,
    lossOfUseType: 'flat_dollar',
    personalLiability: 300000,
    medicalPayments: 5000,
    deductible: 2500,
    deductiblePercent: 0.71,
  },
  additionalCoverages: {
    waterBackup: 10000,
    equipmentBreakdown: true,
    serviceLine: false,
    ordinanceLaw: false,
    identityTheft: false,
    scheduledProperty: false,
  },
  priorClaims: 0,
  hasDetachedStructures: true,
  hasPool: false,
  hasDog: true,
  hasTrampoline: false,
};

const sampleAutoPolicy: AutoPolicy = {
  type: 'auto',
  state: 'TX',
  coverage: {
    bodilyInjuryPerPerson: 100000,
    bodilyInjuryPerAccident: 300000,
    propertyDamage: 100000,
    uninsuredMotoristPerPerson: 100000,
    uninsuredMotoristPerAccident: 300000,
    underinsuredMotoristPerPerson: 100000,
    underinsuredMotoristPerAccident: 300000,
    medicalPayments: 5000,
    collision: 1,
    collisionDeductible: 500,
    comprehensive: 1,
    comprehensiveDeductible: 250,
  },
  vehicles: [
    {
      year: 2022,
      make: 'Toyota',
      model: 'Camry',
      estimatedValue: 28000,
      isFinanced: true,
    },
  ],
  priorClaims: 0,
  hasHealthInsurance: true,
};

export async function GET() {
  try {
    const submission: PolicySubmission = {
      id: generateId(),
      submittedAt: new Date().toISOString(),
      homePolicy: sampleHomePolicy,
      autoPolicy: sampleAutoPolicy,
      contactEmail: 'test@example.com',
      contactName: 'Test User',
    };

    storeSubmission(submission);
    const report = await gradePolicy(submission);
    storeReport(report);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return NextResponse.json({
      success: true,
      reportId: report.id,
      reportUrl: `${baseUrl}/report/${report.id}`,
      report,
    });
  } catch (error) {
    console.error('Test grade error:', error);
    return NextResponse.json(
      { error: 'Failed to generate test report', details: String(error) },
      { status: 500 }
    );
  }
}
