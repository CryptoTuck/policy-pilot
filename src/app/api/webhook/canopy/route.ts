import { NextRequest, NextResponse } from 'next/server';
import { parseCanopyData, formatCoverages, type ParsedCanopyData } from '@/lib/canopy-parser';
import {
  createSubmission,
  updateSubmissionStatus,
  createPolicy,
  createCoverages,
  createVehicles,
  createGradingResult,
} from '@/lib/supabase';
import { getOpenAIClient } from '@/lib/openai';
import { POLICY_GRADING_SYSTEM_PROMPT } from '@/lib/grading-prompt';

/**
 * New Canopy Webhook Endpoint
 * 
 * Receives raw Canopy Connect data (any format), parses it server-side,
 * stores in Supabase, and sends to OpenAI for grading.
 * 
 * Flow:
 * 1. Receive raw JSON from Zapier
 * 2. Store raw data in Supabase (submissions table)
 * 3. Parse and normalize the data
 * 4. Store parsed policies and coverages in Supabase
 * 5. Format coverage strings for OpenAI
 * 6. Call OpenAI for grading
 * 7. Store grading results
 * 8. Return formatted report URL
 */
export async function POST(request: NextRequest) {
  let submissionId: string | null = null;

  try {
    // Verify webhook secret - TEMPORARILY DISABLED FOR TESTING
    // const webhookSecret = request.headers.get('x-webhook-secret');
    // const expectedSecret = process.env.WEBHOOK_SECRET;
    // if (expectedSecret && webhookSecret !== expectedSecret) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }
    // TODO: Re-enable auth after testing data flow

    // Parse the incoming raw data
    const requestBody = await request.json();
    console.log('[Canopy Webhook] Received payload with keys:', Object.keys(requestBody ?? {}));
    
    // Handle nested canopyData field from Zapier, or use root level if raw Canopy format
    let rawData = requestBody;
    if (requestBody.canopyData && typeof requestBody.canopyData === 'object') {
      console.log('[Canopy Webhook] Found nested canopyData field, using that');
      rawData = requestBody.canopyData;
      // Merge in pullMetaData if present at root level
      if (requestBody.pullMetaData) {
        rawData.pullMetaData = requestBody.pullMetaData;
      }
    } else if (requestBody.canopyData && typeof requestBody.canopyData === 'string') {
      // Handle case where canopyData is a JSON string
      console.log('[Canopy Webhook] Found stringified canopyData, parsing');
      rawData = JSON.parse(requestBody.canopyData);
      if (requestBody.pullMetaData) {
        rawData.pullMetaData = requestBody.pullMetaData;
      }
    }

    // Extract customer info from metadata if available
    const customerEmail = extractMetadata(rawData, 'Pull Account Email');
    const customerFirstName = extractMetadata(rawData, 'Pull First Name');
    const customerLastName = extractMetadata(rawData, 'Pull Last Name');
    const customerPhone = extractMetadata(rawData, 'Pull Phone');
    const sessionToken = extractMetadata(rawData, 'sessionToken');

    // Step 1: Store raw data in Supabase
    const submission = await createSubmission(rawData, customerEmail, customerFirstName, customerLastName, customerPhone);
    submissionId = submission.id;
    console.log('[Canopy Webhook] Created submission:', submissionId);

    // Update status to processing
    await updateSubmissionStatus(submissionId, 'processing');

    // Step 2: Parse and normalize the data
    const parsedData = parseCanopyData(rawData);
    console.log('[Canopy Webhook] Parsed policies:', parsedData.policies.map(p => ({ type: p.type, coverageCount: p.coverages.length })));

    if (parsedData.policies.length === 0) {
      await updateSubmissionStatus(submissionId, 'failed', {
        error_message: 'No valid policies found in the data',
      });
      return NextResponse.json(
        { error: 'No valid policies found in the submitted data' },
        { status: 400 }
      );
    }

    // Step 3: Store parsed policies and coverages in Supabase
    const formattedByType: Record<string, { coverage: string; deductible: string }> = {};
    
    for (const policy of parsedData.policies) {
      const policyRecord = await createPolicy(
        submissionId,
        policy.type,
        policy.sourceIndex,
        {
          carrier: policy.carrier,
          policy_number: policy.policyNumber,
          status: policy.status,
          effective_date: policy.effectiveDate,
          expiration_date: policy.expirationDate,
          renewal_date: policy.renewalDate,
          premium_cents: policy.premiumCents,
          paid_in_full: policy.paidInFull,
          amount_due_cents: policy.amountDueCents,
          amount_paid_cents: policy.amountPaidCents,
          vehicle_count: policy.vehicleCount,
        }
      );

      // Store vehicles if it's an auto policy
      if (policy.type === 'auto' && policy.vehicles && policy.vehicles.length > 0) {
        await createVehicles(
          policyRecord.id,
          policy.vehicles.map(v => ({
            vehicle_index: v.index,
            year: v.year,
            make: v.make,
            model: v.model,
            vin: v.vin,
            vehicle_type: v.vehicleType,
            uses: v.uses,
          }))
        );
      }

      // Store coverages
      if (policy.coverages.length > 0) {
        await createCoverages(
          policyRecord.id,
          policy.coverages.map(c => ({
            name: c.name,
            friendly_name: c.friendlyName,
            per_incident_limit_cents: c.perIncidentLimitCents,
            per_person_limit_cents: c.perPersonLimitCents,
            deductible_cents: c.deductibleCents,
            is_declined: c.isDeclined,
            vehicle_index: c.vehicleIndex,
            source_index: c.sourceIndex,
          }))
        );
      }

      // Format coverages for this policy
      const formatted = formatCoverages(policy);
      formattedByType[policy.type] = {
        coverage: formatted.coverageString,
        deductible: formatted.deductibleString,
      };
    }

    // Step 4: Build prompt for OpenAI
    const openaiPrompt = buildGradingPrompt(parsedData, formattedByType);
    console.log('[Canopy Webhook] Calling OpenAI for grading...');

    // Step 5: Call OpenAI
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: POLICY_GRADING_SYSTEM_PROMPT },
        { role: 'user', content: openaiPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const openaiContent = response.choices[0]?.message?.content;
    if (!openaiContent) {
      throw new Error('No response from OpenAI');
    }

    const gradeResult = JSON.parse(openaiContent);
    console.log('[Canopy Webhook] OpenAI grading complete');

    // Step 6: Store grading results
    await createGradingResult(submissionId, {
      formatted_home_coverage: formattedByType.home?.coverage,
      formatted_home_deductible: formattedByType.home?.deductible,
      formatted_auto_coverage: formattedByType.auto?.coverage,
      formatted_renters_coverage: formattedByType.renters?.coverage,
      home_score: gradeResult.homeGrade?.overallScore,
      auto_score: gradeResult.autoGrade?.overallScore,
      renters_score: gradeResult.rentersGrade?.overallScore,
      overall_score: calculateOverallScore(gradeResult),
      recommendations: gradeResult.recommendations,
      openai_response: gradeResult,
    });

    // Update submission as completed
    await updateSubmissionStatus(submissionId, 'completed', {
      grading_result: gradeResult,
      formatted_output: formattedByType,
    });

    // Build response
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const reportUrl = `${baseUrl}/report/${submissionId}`;

    console.log('[Canopy Webhook] Success! Report URL:', reportUrl);

    return NextResponse.json({
      success: true,
      submissionId,
      reportUrl,
      sessionToken,
      grades: {
        home: gradeResult.homeGrade?.overallGrade,
        auto: gradeResult.autoGrade?.overallGrade,
        renters: gradeResult.rentersGrade?.overallGrade,
        overall: scoreToGrade(calculateOverallScore(gradeResult)),
      },
      formattedCoverages: {
        home: formattedByType.home?.coverage,
        homeDeductible: formattedByType.home?.deductible,
        auto: formattedByType.auto?.coverage,
        renters: formattedByType.renters?.coverage,
      },
    });

  } catch (error) {
    console.error('[Canopy Webhook] Error:', error);

    // Update submission status if we have one
    if (submissionId) {
      await updateSubmissionStatus(submissionId, 'failed', {
        error_message: error instanceof Error ? error.message : 'Unknown error',
      }).catch(console.error);
    }

    return NextResponse.json(
      { 
        error: 'Processing failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        submissionId,
      },
      { status: 500 }
    );
  }
}

// Verification endpoint for Zapier
export async function GET() {
  return NextResponse.json({ 
    status: 'Canopy webhook endpoint active',
    version: '2.0',
    features: ['supabase-storage', 'raw-data-parsing', 'multi-vehicle-support'],
  });
}

/**
 * Extract metadata from various possible locations in raw data
 */
function extractMetadata(rawData: Record<string, unknown>, key: string): string | undefined {
  const locations = [
    rawData[key],
    (rawData.MetaData as Record<string, unknown> | undefined)?.[key],
    (rawData.metadata as Record<string, unknown> | undefined)?.[key],
    (rawData.pullMetaData as Record<string, unknown> | undefined)?.[key],
    (rawData.pullMetadata as Record<string, unknown> | undefined)?.[key],
  ];

  for (const value of locations) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return undefined;
}

/**
 * Build the grading prompt for OpenAI
 */
function buildGradingPrompt(
  parsedData: ParsedCanopyData, 
  formattedByType: Record<string, { coverage: string; deductible: string }>
): string {
  let prompt = `Please analyze and grade the following insurance policy data:\n\n`;

  if (formattedByType.home) {
    prompt += `## Home Insurance Coverage\n${formattedByType.home.coverage}\n\n`;
    if (formattedByType.home.deductible) {
      prompt += `## Home Deductible\n${formattedByType.home.deductible}\n\n`;
    }
  }

  if (formattedByType.auto) {
    prompt += `## Auto Insurance Coverage\n${formattedByType.auto.coverage}\n\n`;
    
    // Include vehicle details if available
    const autoPolicy = parsedData.policies.find(p => p.type === 'auto');
    if (autoPolicy?.vehicles && autoPolicy.vehicles.length > 0) {
      prompt += `## Vehicles\n`;
      for (const v of autoPolicy.vehicles) {
        prompt += `- ${v.year || ''} ${v.make || ''} ${v.model || ''}\n`;
      }
      prompt += '\n';
    }
  }

  if (formattedByType.renters) {
    prompt += `## Renters Insurance Coverage\n${formattedByType.renters.coverage}\n\n`;
  }

  prompt += `Provide a comprehensive grade report following the grading criteria and output format specified in your instructions.`;

  return prompt;
}

/**
 * Calculate overall score from grades
 */
function calculateOverallScore(gradeResult: Record<string, unknown>): number | undefined {
  const scores: number[] = [];

  const homeGrade = gradeResult.homeGrade as { overallScore?: number } | undefined;
  const autoGrade = gradeResult.autoGrade as { overallScore?: number } | undefined;
  const rentersGrade = gradeResult.rentersGrade as { overallScore?: number } | undefined;

  if (homeGrade?.overallScore) scores.push(homeGrade.overallScore);
  if (autoGrade?.overallScore) scores.push(autoGrade.overallScore);
  if (rentersGrade?.overallScore) scores.push(rentersGrade.overallScore);

  if (scores.length === 0) return undefined;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

/**
 * Convert score to letter grade
 */
function scoreToGrade(score: number | undefined): string | undefined {
  if (score === undefined) return undefined;
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}
