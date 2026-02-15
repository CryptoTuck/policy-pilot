import { NextResponse } from 'next/server';
import { gradePolicy } from '@/lib/grader';
import { storeSubmission, storeReport } from '@/lib/storage';
import { createSubmission as createSupabaseSubmission, updateSubmissionStatus } from '@/lib/supabase';
import type { PolicySubmission, HomePolicy, AutoPolicy } from '@/types/policy';

// Comprehensive sample policy data - slightly above average (B/B+ range)
const sampleHomePolicy: HomePolicy = {
  type: 'home',
  policyType: 'HO3',
  state: 'TX',
  coverage: {
    dwelling: 425000,
    dwellingType: 'replacement_cost',
    otherStructures: 42500,
    otherStructuresPercent: 10,
    personalProperty: 212500,
    personalPropertyPercent: 50,
    personalPropertyType: 'replacement_cost',
    lossOfUse: 85000,
    lossOfUseType: 'flat_dollar',
    personalLiability: 300000,
    medicalPayments: 5000,
    deductible: 2500,
    deductiblePercent: 0.59,
  },
  additionalCoverages: {
    waterBackup: 10000,
    equipmentBreakdown: true,
    serviceLine: false, // Missing - gap
    ordinanceLaw: false, // Missing - gap
    identityTheft: 25000,
    scheduledProperty: false,
  },
  priorClaims: 1,
  hasDetachedStructures: true,
  hasPool: true,
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
    underinsuredMotoristPerPerson: 50000, // Lower than BI - partial gap
    underinsuredMotoristPerAccident: 100000,
    medicalPayments: 5000,
    collision: 1,
    collisionDeductible: 500,
    comprehensive: 1,
    comprehensiveDeductible: 250,
  },
  vehicles: [
    {
      year: 2023,
      make: 'BMW',
      model: 'X5 xDrive40i',
      estimatedValue: 55000,
      isFinanced: true, // Financed - gap coverage will be flagged
    },
    {
      year: 2021,
      make: 'Honda',
      model: 'Civic EX',
      estimatedValue: 22000,
      isFinanced: false,
    },
  ],
  priorClaims: 0,
  hasHealthInsurance: true,
};

export async function GET() {
  try {
    // Create Supabase submission first to get a valid UUID
    const supabaseSub = await createSupabaseSubmission({
      rawData: { test: true },
      customerEmail: 'tuckergeorge77@gmail.com',
      customerFirstName: 'Test',
      customerLastName: 'User',
    });
    await updateSubmissionStatus(supabaseSub.id, 'completed');

    // Use the Supabase UUID as the submission ID so everything matches
    const submission: PolicySubmission = {
      id: supabaseSub.id,
      submittedAt: new Date().toISOString(),
      homePolicy: sampleHomePolicy,
      autoPolicy: sampleAutoPolicy,
      contactEmail: 'tuckergeorge77@gmail.com',
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
