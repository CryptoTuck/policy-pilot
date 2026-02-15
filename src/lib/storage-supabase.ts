/**
 * Supabase-based storage functions for the report page
 * 
 * This module provides functions to retrieve report data from Supabase
 * for displaying on the report page. It transforms the new Supabase
 * schema data into the format expected by existing components.
 */

import { getSupabaseClient, getSubmissionWithDetails, getSubmissionBySessionToken } from './supabase';
import type { PolicyReport, HomePolicyGrade, AutoPolicyGrade, RentersPolicyGrade } from '@/types/grading';

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Get a report from Supabase by submission ID
 * Transforms Supabase data into the PolicyReport format for existing components
 */
export async function getReportFromSupabase(id: string): Promise<PolicyReport | undefined> {
  if (!isSupabaseConfigured()) {
    return undefined;
  }

  try {
    const { submission, gradingResults } = await getSubmissionWithDetails(id);
    
    if (!submission) {
      return undefined;
    }

    const gradingResult = gradingResults[0];

    // If there's no grading data, return undefined so we fall through to Redis/memory
    if (!gradingResult?.openai_response) {
      return undefined;
    }

    const openaiResponse = gradingResult.openai_response as {
      homeGrade?: HomePolicyGrade;
      autoGrade?: AutoPolicyGrade;
      autoGrades?: AutoPolicyGrade[];
      rentersGrade?: RentersPolicyGrade;
      carriers?: { home?: string; auto?: string; renters?: string };
    } | undefined;

    // Calculate combined grade
    let combinedGrade: string | undefined;
    let combinedScore: number | undefined;

    if (gradingResult?.overall_score) {
      combinedScore = gradingResult.overall_score;
      combinedGrade = scoreToLetterGrade(combinedScore);
    }

    return {
      id: submission.id,
      generatedAt: submission.processed_at || submission.created_at,
      homeGrade: openaiResponse?.homeGrade,
      autoGrade: openaiResponse?.autoGrade,
      autoGrades: openaiResponse?.autoGrades,
      rentersGrade: openaiResponse?.rentersGrade,
      combinedGrade,
      combinedScore,
      carriers: openaiResponse?.carriers,
    };
  } catch (error) {
    console.error('[Storage Supabase] Error getting report:', error);
    return undefined;
  }
}

/**
 * Store a mapping from session token to report ID in Supabase
 * This allows the polling endpoint to find reports by session token
 */
export async function storeReportByTokenInSupabase(token: string, reportId: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    return;
  }

  try {
    const supabase = getSupabaseClient();
    
    // Update the submission with the session token in customer_email field
    // (In production, add a dedicated session_token column)
    await supabase
      .from('submissions')
      .update({ customer_email: token })
      .eq('id', reportId);
  } catch (error) {
    console.error('[Storage Supabase] Error storing token mapping:', error);
  }
}

/**
 * Get a report by session token from Supabase
 */
export async function getReportByTokenFromSupabase(token: string): Promise<PolicyReport | undefined> {
  if (!isSupabaseConfigured()) {
    return undefined;
  }

  try {
    const submission = await getSubmissionBySessionToken(token);

    if (!submission) {
      return undefined;
    }

    return getReportFromSupabase(submission.id);
  } catch (error) {
    console.error('[Storage Supabase] Error getting report by token:', error);
    return undefined;
  }
}

function scoreToLetterGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}
