import { NextRequest, NextResponse } from 'next/server';
import { parseCanopyData, formatCoverages, type ParsedCanopyData } from '@/lib/canopy-parser';
import {
  createSubmission,
  updateSubmissionStatus,
  createPolicy,
  createCoverages,
  createVehicles,
  createGradingResult,
  createDrivers,
  createDocuments,
  createAgents,
  createAddresses,
} from '@/lib/supabase';
import { getOpenAIClient } from '@/lib/openai';
import { POLICY_GRADING_SYSTEM_PROMPT } from '@/lib/grading-prompt';
import { sendReportEmail } from '@/lib/resend';
import { generateReportPdf } from '@/lib/pdf-report';
import type { PolicyReport } from '@/types/grading';

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

    // Extract customer info - check both raw Canopy format and flattened Zapier format
    const pull = rawData.pull as Record<string, unknown> | undefined;
    const metaData = (rawData.meta_data || rawData.metadata || rawData.MetaData) as Record<string, unknown> | undefined;
    
    // Customer email: pull.account_email or flattened
    const customerEmail = 
      (pull?.account_email as string) || 
      (pull?.email as string) ||
      extractMetadata(rawData, 'Pull Account Email') ||
      extractMetadata(rawData, 'account_email');
    
    // Customer first name: pull.first_name or flattened
    const customerFirstName = 
      (pull?.first_name as string) || 
      extractMetadata(rawData, 'Pull First Name');
    
    // Customer last name: pull.last_name or flattened  
    const customerLastName = 
      (pull?.last_name as string) || 
      extractMetadata(rawData, 'Pull Last Name');
    
    // Customer phone: pull.phone or pull.mobile_phone or flattened
    const customerPhone = 
      (pull?.phone as string) || 
      (pull?.mobile_phone as string) ||
      extractMetadata(rawData, 'Pull Phone');
    
    // Session token: in meta_data or pullMetaData
    const sessionToken = 
      (metaData?.sessionToken as string) ||
      extractMetadata(rawData, 'sessionToken') ||
      extractMetadata(rawData.pullMetaData as Record<string, unknown> || {}, 'sessionToken');
    
    // Insurance provider
    const insuranceProvider = pull?.insurance_provider_name as string | undefined;
    const insuranceProviderFriendly = pull?.insurance_provider_friendly_name as string | undefined;
    
    // Primary address
    const primaryAddress = pull?.primaryAddress as Record<string, unknown> | undefined;
    
    // Canopy pull ID
    const canopyPullId = (pull?.pull_id as string) || (rawData.pull_id as string) || (rawData.id as string);
    
    console.log('[Canopy Webhook] Extracted customer info:', { 
      email: customerEmail, 
      firstName: customerFirstName,
      lastName: customerLastName,
      phone: customerPhone, 
      insuranceProvider: insuranceProviderFriendly,
      hasSessionToken: !!sessionToken,
      canopyPullId,
    });

    // Step 1: Store raw data in Supabase
    const submission = await createSubmission({
      rawData,
      customerEmail,
      customerFirstName,
      customerLastName,
      customerPhone,
      insuranceProvider,
      insuranceProviderFriendly,
      sessionToken,
      primaryAddress,
      canopyPullId,
    });
    submissionId = submission.id;
    console.log('[Canopy Webhook] Created submission:', submissionId);
    
    // Store drivers if present
    const drivers = pull?.drivers as Array<Record<string, unknown>> | undefined;
    if (drivers && Array.isArray(drivers) && drivers.length > 0) {
      await createDrivers(submissionId, null, drivers.map(d => ({
        first_name: d.first_name as string,
        last_name: d.last_name as string,
        gender: d.gender as string,
        age: d.age as number,
        marital_status: d.marital_status as string,
        drivers_license: d.drivers_license as string,
        date_of_birth: d.date_of_birth_str as string,
        is_excluded: d.is_excluded as boolean,
        canopy_driver_id: d.driver_id as string,
      })));
      console.log('[Canopy Webhook] Stored', drivers.length, 'drivers');
    }
    
    // Store documents if present
    const documents = pull?.documents as Record<string, Record<string, unknown>> | undefined;
    if (documents && typeof documents === 'object') {
      const docList = Object.values(documents).filter(d => d && typeof d === 'object');
      if (docList.length > 0) {
        await createDocuments(submissionId, docList.map(d => ({
          title: d.title as string,
          document_type: d.document_type as string,
          date_added: d.date_added as string,
          file_url: d.file as string,
          mime_type: d.mime_type as string,
          canopy_document_id: d.document_id as string,
          canopy_policy_id: d.policy_id as string,
        })));
        console.log('[Canopy Webhook] Stored', docList.length, 'documents');
      }
    }
    
    // Store agents if present
    const agents = pull?.agents as Array<Record<string, unknown>> | undefined;
    if (agents && Array.isArray(agents) && agents.length > 0) {
      await createAgents(submissionId, agents.map(a => ({
        agency_name: a.agency_name as string,
        agent_full_name: a.agent_full_name as string,
        phone_number: a.phone_number as string,
        email: a.email as string,
        address: a.address as Record<string, unknown>,
        canopy_agent_id: a.agent_info_id as string,
      })));
      console.log('[Canopy Webhook] Stored', agents.length, 'agents');
    }
    
    // Store addresses if present
    const addresses = pull?.addresses as Record<string, Record<string, unknown>> | undefined;
    if (addresses && typeof addresses === 'object') {
      const addrList = Object.values(addresses).filter(a => a && typeof a === 'object');
      if (addrList.length > 0) {
        await createAddresses(submissionId, addrList.map(a => ({
          full_address: a.full_address as string,
          street1: a.street1 as string,
          street2: a.street2 as string,
          city: a.city as string,
          state: a.state as string,
          zip: a.zip as string,
          country: a.country as string,
          address_nature: a.address_nature as string,
          canopy_address_id: a.address_id as string,
        })));
        console.log('[Canopy Webhook] Stored', addrList.length, 'addresses');
      }
    }

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
    const formattedByType: Record<string, Array<{ coverage: string; deductible: string; policyNumber?: string; carrier?: string; vehicles?: Array<{ year?: number; make?: string; model?: string }> }>> = {};
    
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
      
      // Handle multiple policies of the same type (e.g., 2 auto policies)
      const typeKey = policy.type;
      if (!formattedByType[typeKey]) {
        formattedByType[typeKey] = [];
      }
      formattedByType[typeKey].push({
        coverage: formatted.coverageString,
        deductible: formatted.deductibleString,
        policyNumber: policy.policyNumber,
        carrier: policy.carrier,
        vehicles: policy.vehicles,
      });
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
    // Combine all coverages of each type into single strings for storage
    const homePolicies = (formattedByType.home || []) as FormattedPolicy[];
    const autoPolicies = (formattedByType.auto || []) as FormattedPolicy[];
    const rentersPolicies = (formattedByType.renters || []) as FormattedPolicy[];

    // Extract carrier names per policy type
    const carriers: Record<string, string> = {};
    if (homePolicies.length > 0 && homePolicies[0].carrier) {
      carriers.home = homePolicies[0].carrier;
    }
    if (autoPolicies.length > 0 && autoPolicies[0].carrier) {
      carriers.auto = autoPolicies[0].carrier;
    }
    if (rentersPolicies.length > 0 && rentersPolicies[0].carrier) {
      carriers.renters = rentersPolicies[0].carrier;
    }
    // Attach carriers to grading result so it's available in the report
    gradeResult.carriers = carriers;
    
    const formatPoliciesForStorage = (policies: FormattedPolicy[], type: string) => {
      if (policies.length === 0) return undefined;
      if (policies.length === 1) return policies[0].coverage;
      return policies.map((p, i) => {
        const vehicleInfo = p.vehicles?.length 
          ? ` (${p.vehicles.map(v => `${v.year || ''} ${v.make || ''} ${v.model || ''}`.trim()).join(', ')})`
          : '';
        return `[${type} ${i + 1}${vehicleInfo}] ${p.coverage}`;
      }).join('\n\n');
    };
    
    // Handle both autoGrade (single) and autoGrades (array) from OpenAI
    const autoGradesArray = gradeResult.autoGrades as Array<{ overallScore?: number }> | undefined;
    const singleAutoGrade = gradeResult.autoGrade as { overallScore?: number } | undefined;
    const autoScoreForStorage = autoGradesArray?.length 
      ? Math.round(autoGradesArray.reduce((sum, g) => sum + (g.overallScore || 0), 0) / autoGradesArray.length)
      : singleAutoGrade?.overallScore;
    
    await createGradingResult(submissionId, {
      formatted_home_coverage: formatPoliciesForStorage(homePolicies, 'Home'),
      formatted_home_deductible: homePolicies.map(p => p.deductible).filter(Boolean).join('; ') || undefined,
      formatted_auto_coverage: formatPoliciesForStorage(autoPolicies, 'Auto'),
      formatted_renters_coverage: formatPoliciesForStorage(rentersPolicies, 'Renters'),
      home_score: gradeResult.homeGrade?.overallScore,
      auto_score: autoScoreForStorage,
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

    // Auto-send email with PDF report if customer email is available
    if (customerEmail) {
      try {
        const report: PolicyReport = {
          id: submissionId,
          generatedAt: new Date().toISOString(),
          homeGrade: gradeResult.homeGrade,
          autoGrade: gradeResult.autoGrade,
          autoGrades: gradeResult.autoGrades,
          rentersGrade: gradeResult.rentersGrade,
          combinedGrade: scoreToGrade(calculateOverallScore(gradeResult)),
          combinedScore: calculateOverallScore(gradeResult),
          carrierAnalysis: gradeResult.carrierAnalysis,
          carriers: gradeResult.carriers,
        };

        let attachments: { filename: string; content: Buffer }[] | undefined;
        try {
          const pdfBuffer = await generateReportPdf(report);
          attachments = [{ filename: 'PolicyPilot-Report.pdf', content: pdfBuffer }];
        } catch (pdfError) {
          console.error('[Canopy Webhook] PDF generation failed, sending email without attachment:', pdfError);
        }

        const emailResult = await sendReportEmail({
          to: customerEmail,
          customerName: customerFirstName || undefined,
          reportUrl,
          attachments,
        });

        if (emailResult.success) {
          console.log('[Canopy Webhook] Report email sent to', customerEmail, 'emailId:', emailResult.emailId);
        } else {
          console.error('[Canopy Webhook] Failed to send report email:', emailResult.error);
        }
      } catch (emailError) {
        console.error('[Canopy Webhook] Email send error (non-fatal):', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      submissionId,
      reportUrl,
      sessionToken,
      policyCounts: {
        home: homePolicies.length,
        auto: autoPolicies.length,
        renters: rentersPolicies.length,
        totalVehicles: autoPolicies.reduce((sum, p) => sum + (p.vehicles?.length || 0), 0),
      },
      grades: {
        home: gradeResult.homeGrade?.overallGrade,
        auto: gradeResult.autoGrade?.overallGrade,
        renters: gradeResult.rentersGrade?.overallGrade,
        overall: scoreToGrade(calculateOverallScore(gradeResult)),
      },
      formattedCoverages: {
        home: formatPoliciesForStorage(homePolicies, 'Home'),
        homeDeductible: homePolicies.map(p => p.deductible).filter(Boolean).join('; ') || undefined,
        auto: formatPoliciesForStorage(autoPolicies, 'Auto'),
        renters: formatPoliciesForStorage(rentersPolicies, 'Renters'),
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

interface FormattedPolicy {
  coverage: string;
  deductible: string;
  policyNumber?: string;
  carrier?: string;
  vehicles?: Array<{ year?: number; make?: string; model?: string }>;
}

/**
 * Build the grading prompt for OpenAI
 * Now handles multiple policies of the same type (e.g., 2 auto policies)
 */
function buildGradingPrompt(
  parsedData: ParsedCanopyData, 
  formattedByType: Record<string, FormattedPolicy[]>
): string {
  let prompt = `Please analyze and grade the following insurance policy data:\n\n`;

  // Home policies
  const homePolicies = formattedByType.home || [];
  if (homePolicies.length > 0) {
    prompt += `## Home Insurance\n`;
    homePolicies.forEach((policy, idx) => {
      if (homePolicies.length > 1) {
        prompt += `### Home Policy ${idx + 1}${policy.policyNumber ? ` (${policy.policyNumber})` : ''}\n`;
      }
      if (policy.carrier) {
        prompt += `Carrier: ${policy.carrier}\n`;
      }
      prompt += `Coverage: ${policy.coverage}\n`;
      if (policy.deductible) {
        prompt += `Deductible: ${policy.deductible}\n`;
      }
      prompt += '\n';
    });
  }

  // Auto policies
  const autoPolicies = formattedByType.auto || [];
  if (autoPolicies.length > 0) {
    prompt += `## Auto Insurance\n`;
    autoPolicies.forEach((policy, idx) => {
      if (autoPolicies.length > 1) {
        prompt += `### Auto Policy ${idx + 1}${policy.policyNumber ? ` (${policy.policyNumber})` : ''}\n`;
      }
      if (policy.carrier) {
        prompt += `Carrier: ${policy.carrier}\n`;
      }
      // List vehicles for this policy
      if (policy.vehicles && policy.vehicles.length > 0) {
        prompt += `Vehicles: ${policy.vehicles.map(v => `${v.year || ''} ${v.make || ''} ${v.model || ''}`.trim()).join(', ')}\n`;
      }
      prompt += `Coverage: ${policy.coverage}\n`;
      prompt += '\n';
    });
  }

  // Renters policies
  const rentersPolicies = formattedByType.renters || [];
  if (rentersPolicies.length > 0) {
    prompt += `## Renters Insurance\n`;
    rentersPolicies.forEach((policy, idx) => {
      if (rentersPolicies.length > 1) {
        prompt += `### Renters Policy ${idx + 1}${policy.policyNumber ? ` (${policy.policyNumber})` : ''}\n`;
      }
      if (policy.carrier) {
        prompt += `Carrier: ${policy.carrier}\n`;
      }
      prompt += `Coverage: ${policy.coverage}\n`;
      prompt += '\n';
    });
  }

  // Summary counts
  const totalPolicies = homePolicies.length + autoPolicies.length + rentersPolicies.length;
  const totalVehicles = autoPolicies.reduce((sum, p) => sum + (p.vehicles?.length || 0), 0);
  
  prompt += `---\nSummary: ${totalPolicies} total policies`;
  if (autoPolicies.length > 0) {
    prompt += `, ${autoPolicies.length} auto (${totalVehicles} vehicles)`;
  }
  if (homePolicies.length > 0) {
    prompt += `, ${homePolicies.length} home`;
  }
  if (rentersPolicies.length > 0) {
    prompt += `, ${rentersPolicies.length} renters`;
  }
  prompt += `\n\n`;

  prompt += `Provide a comprehensive grade report.

IMPORTANT FOR AUTO: If there are multiple vehicles, provide SEPARATE grades for EACH vehicle in an "autoGrades" array. Each entry should have vehicleInfo (e.g., "2024 TESLA Model Y"), its own overallGrade, overallScore, standardCoverages, summary, keyStrengths, and areasToReview.

Output format:
- homeGrade (if home policy exists)
- autoGrades (array - one entry per vehicle, each with vehicleInfo)
- rentersGrade (if renters policy exists)

Do NOT combine multiple vehicles into a single autoGrade. Each vehicle gets its own separate grade entry in the autoGrades array.`;

  return prompt;
}

/**
 * Calculate overall score from grades
 */
function calculateOverallScore(gradeResult: Record<string, unknown>): number | undefined {
  const scores: number[] = [];

  const homeGrade = gradeResult.homeGrade as { overallScore?: number } | undefined;
  const autoGrade = gradeResult.autoGrade as { overallScore?: number } | undefined;
  const autoGrades = gradeResult.autoGrades as Array<{ overallScore?: number }> | undefined;
  const rentersGrade = gradeResult.rentersGrade as { overallScore?: number } | undefined;

  if (homeGrade?.overallScore) scores.push(homeGrade.overallScore);
  
  // Handle both autoGrade (single) and autoGrades (array)
  if (autoGrades?.length) {
    const avgAutoScore = autoGrades.reduce((sum, g) => sum + (g.overallScore || 0), 0) / autoGrades.length;
    scores.push(Math.round(avgAutoScore));
  } else if (autoGrade?.overallScore) {
    scores.push(autoGrade.overallScore);
  }
  
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
