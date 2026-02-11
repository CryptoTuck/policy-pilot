import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.');
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey);
  return supabaseClient;
}

// Type definitions for our tables
export interface Submission {
  id: string;
  created_at: string;
  customer_email: string | null;
  customer_name: string | null;
  raw_canopy_data: Record<string, unknown>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error_message: string | null;
  grading_result: Record<string, unknown> | null;
  formatted_output: Record<string, unknown> | null;
  processed_at: string | null;
}

export interface Policy {
  id: string;
  submission_id: string;
  created_at: string;
  policy_type: 'home' | 'auto' | 'renters';
  policy_index: number | null;
  carrier: string | null;
  policy_number: string | null;
  effective_date: string | null;
  expiration_date: string | null;
  premium_cents: number | null;
  vehicle_count: number;
}

export interface Coverage {
  id: string;
  policy_id: string;
  created_at: string;
  name: string;
  friendly_name: string | null;
  per_incident_limit_cents: number | null;
  per_person_limit_cents: number | null;
  deductible_cents: number | null;
  is_declined: boolean;
  vehicle_index: number | null;
  source_index: number | null;
}

export interface GradingResult {
  id: string;
  submission_id: string;
  created_at: string;
  formatted_home_coverage: string | null;
  formatted_home_deductible: string | null;
  formatted_auto_coverage: string | null;
  formatted_renters_coverage: string | null;
  home_score: number | null;
  auto_score: number | null;
  renters_score: number | null;
  overall_score: number | null;
  recommendations: Record<string, unknown> | null;
  openai_response: Record<string, unknown> | null;
}

// Helper functions for database operations

export async function createSubmission(
  rawData: Record<string, unknown>, 
  customerEmail?: string, 
  customerName?: string
): Promise<Submission> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('submissions')
    .insert({
      raw_canopy_data: rawData,
      customer_email: customerEmail ?? null,
      customer_name: customerName ?? null,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return data as Submission;
}

export async function updateSubmissionStatus(
  id: string, 
  status: 'processing' | 'completed' | 'failed',
  extras?: {
    error_message?: string;
    grading_result?: Record<string, unknown>;
    formatted_output?: Record<string, unknown>;
  }
): Promise<void> {
  const supabase = getSupabaseClient();
  
  const updateData: Record<string, unknown> = {
    status,
    processed_at: status === 'completed' || status === 'failed' ? new Date().toISOString() : null,
  };

  if (extras?.error_message !== undefined) updateData.error_message = extras.error_message;
  if (extras?.grading_result !== undefined) updateData.grading_result = extras.grading_result;
  if (extras?.formatted_output !== undefined) updateData.formatted_output = extras.formatted_output;

  const { error } = await supabase
    .from('submissions')
    .update(updateData)
    .eq('id', id);

  if (error) throw error;
}

export async function createPolicy(
  submissionId: string,
  policyType: 'home' | 'auto' | 'renters',
  policyIndex: number,
  details?: {
    carrier?: string;
    policy_number?: string;
    effective_date?: string;
    expiration_date?: string;
    premium_cents?: number;
    vehicle_count?: number;
  }
): Promise<Policy> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('policies')
    .insert({
      submission_id: submissionId,
      policy_type: policyType,
      policy_index: policyIndex,
      carrier: details?.carrier ?? null,
      policy_number: details?.policy_number ?? null,
      effective_date: details?.effective_date ?? null,
      expiration_date: details?.expiration_date ?? null,
      premium_cents: details?.premium_cents ?? null,
      vehicle_count: details?.vehicle_count ?? 1,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Policy;
}

export async function createCoverages(
  policyId: string,
  coverages: Array<{
    name: string;
    friendly_name?: string;
    per_incident_limit_cents?: number | null;
    per_person_limit_cents?: number | null;
    deductible_cents?: number | null;
    is_declined?: boolean;
    vehicle_index?: number | null;
    source_index?: number | null;
  }>
): Promise<Coverage[]> {
  const supabase = getSupabaseClient();
  
  const inserts = coverages.map(c => ({
    policy_id: policyId,
    name: c.name,
    friendly_name: c.friendly_name ?? null,
    per_incident_limit_cents: c.per_incident_limit_cents ?? null,
    per_person_limit_cents: c.per_person_limit_cents ?? null,
    deductible_cents: c.deductible_cents ?? null,
    is_declined: c.is_declined ?? false,
    vehicle_index: c.vehicle_index ?? null,
    source_index: c.source_index ?? null,
  }));

  const { data, error } = await supabase
    .from('coverages')
    .insert(inserts)
    .select();

  if (error) throw error;
  return data as Coverage[];
}

export async function createGradingResult(
  submissionId: string,
  result: {
    formatted_home_coverage?: string;
    formatted_home_deductible?: string;
    formatted_auto_coverage?: string;
    formatted_renters_coverage?: string;
    home_score?: number;
    auto_score?: number;
    renters_score?: number;
    overall_score?: number;
    recommendations?: Record<string, unknown>;
    openai_response?: Record<string, unknown>;
  }
): Promise<GradingResult> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('grading_results')
    .insert({
      submission_id: submissionId,
      formatted_home_coverage: result.formatted_home_coverage ?? null,
      formatted_home_deductible: result.formatted_home_deductible ?? null,
      formatted_auto_coverage: result.formatted_auto_coverage ?? null,
      formatted_renters_coverage: result.formatted_renters_coverage ?? null,
      home_score: result.home_score ?? null,
      auto_score: result.auto_score ?? null,
      renters_score: result.renters_score ?? null,
      overall_score: result.overall_score ?? null,
      recommendations: result.recommendations ?? null,
      openai_response: result.openai_response ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as GradingResult;
}

export async function getSubmissionWithDetails(id: string): Promise<{
  submission: Submission | null;
  policies: Policy[];
  coverages: Coverage[];
  gradingResults: GradingResult[];
}> {
  const supabase = getSupabaseClient();
  
  const { data: submission, error: subError } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single();

  if (subError && subError.code !== 'PGRST116') throw subError;

  if (!submission) {
    return { submission: null, policies: [], coverages: [], gradingResults: [] };
  }

  const { data: policies, error: polError } = await supabase
    .from('policies')
    .select('*')
    .eq('submission_id', id);

  if (polError) throw polError;

  const policyIds = (policies as Policy[])?.map(p => p.id) ?? [];
  
  let coverages: Coverage[] = [];
  if (policyIds.length > 0) {
    const { data: coverageData, error: covError } = await supabase
      .from('coverages')
      .select('*')
      .in('policy_id', policyIds);

    if (covError) throw covError;
    coverages = coverageData as Coverage[];
  }

  const { data: gradingResults, error: gradeError } = await supabase
    .from('grading_results')
    .select('*')
    .eq('submission_id', id);

  if (gradeError) throw gradeError;

  return {
    submission: submission as Submission,
    policies: (policies ?? []) as Policy[],
    coverages,
    gradingResults: (gradingResults ?? []) as GradingResult[],
  };
}

export async function getSubmissionBySessionToken(token: string): Promise<Submission | null> {
  const supabase = getSupabaseClient();
  
  // Look up by customer_email (where we store session tokens temporarily)
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('customer_email', token)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data as Submission | null;
}
