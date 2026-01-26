import { NextResponse } from 'next/server';
import { gradePolicy } from '@/lib/grader';
import { generateId, storeSubmission, storeReport } from '@/lib/storage';
import type { PolicySubmission, HomePolicy, AutoPolicy } from '@/types/policy';

// Sample policy data for testing - designed to score a B grade
const sampleHomePolicy: HomePolicy = {
  type: 'home',
  policyType: 'HO3',
  state: 'TX',
  coverage: {
    dwelling: 320000,
    dwellingType: 'replacement_cost',
    otherStructures: 32000,
    otherStructuresPercent: 10,
    personalProperty: 160000,
    personalPropertyPercent: 50,
    personalPropertyType: 'actual_cash_value', // ACV instead of replacement cost
    lossOfUse: 64000,
    lossOfUseType: 'flat_dollar',
    personalLiability: 100000, // Lower liability - common gap
    medicalPayments: 1000, // Lower med pay
    deductible: 2500,
    deductiblePercent: 0.78,
  },
  additionalCoverages: {
    waterBackup: 5000, // Lower water backup limit
    equipmentBreakdown: false, // Missing
    serviceLine: false, // Missing
    ordinanceLaw: false, // Missing
    identityTheft: false, // Missing
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
    bodilyInjuryPerPerson: 50000, // Lower BI limits
    bodilyInjuryPerAccident: 100000,
    propertyDamage: 50000, // Lower PD
    uninsuredMotoristPerPerson: 50000, // Lower UM
    uninsuredMotoristPerAccident: 100000,
    underinsuredMotoristPerPerson: 50000, // Lower UIM
    underinsuredMotoristPerAccident: 100000,
    medicalPayments: 2500, // Lower med pay
    collision: 1,
    collisionDeductible: 1000, // Higher deductible
    comprehensive: 1,
    comprehensiveDeductible: 500,
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

    await storeSubmission(submission);
    const report = await gradePolicy(submission);
    await storeReport(report);

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
