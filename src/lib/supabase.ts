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
  customer_first_name: string | null;
  customer_last_name: string | null;
  customer_phone: string | null;
  insurance_provider: string | null;
  insurance_provider_friendly: string | null;
  session_token: string | null;
  primary_address: Record<string, unknown> | null;
  canopy_pull_id: string | null;
  raw_canopy_data: Record<string, unknown>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error_message: string | null;
  grading_result: Record<string, unknown> | null;
  formatted_output: Record<string, unknown> | null;
  processed_at: string | null;
}

export interface Driver {
  id: string;
  submission_id: string;
  policy_id: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  gender: string | null;
  age: number | null;
  marital_status: string | null;
  drivers_license: string | null;
  date_of_birth: string | null;
  is_excluded: boolean;
  canopy_driver_id: string | null;
}

export interface Document {
  id: string;
  submission_id: string;
  policy_id: string | null;
  title: string | null;
  document_type: string | null;
  date_added: string | null;
  file_url: string | null;
  mime_type: string | null;
  canopy_document_id: string | null;
  canopy_policy_id: string | null;
}

export interface Agent {
  id: string;
  submission_id: string;
  agency_name: string | null;
  agent_full_name: string | null;
  phone_number: string | null;
  email: string | null;
  address: Record<string, unknown> | null;
  canopy_agent_id: string | null;
}

export interface Address {
  id: string;
  submission_id: string;
  full_address: string | null;
  street1: string | null;
  street2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  address_nature: string | null;
  canopy_address_id: string | null;
}

export interface Policy {
  id: string;
  submission_id: string;
  created_at: string;
  policy_type: 'home' | 'auto' | 'renters';
  policy_index: number | null;
  carrier: string | null;
  policy_number: string | null;
  status: string | null;
  effective_date: string | null;
  expiration_date: string | null;
  renewal_date: string | null;
  premium_cents: number | null;
  paid_in_full: boolean | null;
  amount_due_cents: number | null;
  amount_paid_cents: number | null;
  vehicle_count: number;
}

export interface Vehicle {
  id: string;
  policy_id: string;
  created_at: string;
  vehicle_index: number;
  year: number | null;
  make: string | null;
  model: string | null;
  vin: string | null;
  vehicle_type: string | null;
  uses: string | null;
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

export interface CreateSubmissionParams {
  rawData: Record<string, unknown>;
  customerEmail?: string;
  customerFirstName?: string;
  customerLastName?: string;
  customerPhone?: string;
  insuranceProvider?: string;
  insuranceProviderFriendly?: string;
  sessionToken?: string;
  primaryAddress?: Record<string, unknown>;
  canopyPullId?: string;
}

export async function createSubmission(params: CreateSubmissionParams): Promise<Submission> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('submissions')
    .insert({
      raw_canopy_data: params.rawData,
      customer_email: params.customerEmail ?? null,
      customer_first_name: params.customerFirstName ?? null,
      customer_last_name: params.customerLastName ?? null,
      customer_phone: params.customerPhone ?? null,
      insurance_provider: params.insuranceProvider ?? null,
      insurance_provider_friendly: params.insuranceProviderFriendly ?? null,
      session_token: params.sessionToken ?? null,
      primary_address: params.primaryAddress ?? null,
      canopy_pull_id: params.canopyPullId ?? null,
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
    status?: string;
    effective_date?: string;
    expiration_date?: string;
    renewal_date?: string;
    premium_cents?: number;
    paid_in_full?: boolean;
    amount_due_cents?: number;
    amount_paid_cents?: number;
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
      status: details?.status ?? null,
      effective_date: details?.effective_date ?? null,
      expiration_date: details?.expiration_date ?? null,
      renewal_date: details?.renewal_date ?? null,
      premium_cents: details?.premium_cents ?? null,
      paid_in_full: details?.paid_in_full ?? null,
      amount_due_cents: details?.amount_due_cents ?? null,
      amount_paid_cents: details?.amount_paid_cents ?? null,
      vehicle_count: details?.vehicle_count ?? 0,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Policy;
}

export async function createVehicles(
  policyId: string,
  vehicles: Array<{
    vehicle_index: number;
    year?: number;
    make?: string;
    model?: string;
    vin?: string;
    vehicle_type?: string;
    uses?: string;
  }>
): Promise<Vehicle[]> {
  const supabase = getSupabaseClient();

  const inserts = vehicles.map(v => ({
    policy_id: policyId,
    vehicle_index: v.vehicle_index,
    year: v.year ?? null,
    make: v.make ?? null,
    model: v.model ?? null,
    vin: v.vin ?? null,
    vehicle_type: v.vehicle_type ?? null,
    uses: v.uses ?? null,
  }));

  const { data, error } = await supabase
    .from('vehicles')
    .insert(inserts)
    .select();

  if (error) throw error;
  return data as Vehicle[];
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
  
  // Look up by session_token field
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('session_token', token)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data as Submission | null;
}

// Create drivers for a submission/policy
export async function createDrivers(
  submissionId: string,
  policyId: string | null,
  drivers: Array<{
    first_name?: string;
    last_name?: string;
    full_name?: string;
    gender?: string;
    age?: number;
    marital_status?: string;
    drivers_license?: string;
    date_of_birth?: string;
    is_excluded?: boolean;
    canopy_driver_id?: string;
  }>
): Promise<Driver[]> {
  const supabase = getSupabaseClient();

  const inserts = drivers.map(d => ({
    submission_id: submissionId,
    policy_id: policyId,
    first_name: d.first_name ?? null,
    last_name: d.last_name ?? null,
    full_name: d.full_name ?? `${d.first_name || ''} ${d.last_name || ''}`.trim() || null,
    gender: d.gender ?? null,
    age: d.age ?? null,
    marital_status: d.marital_status ?? null,
    drivers_license: d.drivers_license ?? null,
    date_of_birth: d.date_of_birth ?? null,
    is_excluded: d.is_excluded ?? false,
    canopy_driver_id: d.canopy_driver_id ?? null,
  }));

  const { data, error } = await supabase
    .from('drivers')
    .insert(inserts)
    .select();

  if (error) throw error;
  return data as Driver[];
}

// Create documents for a submission
export async function createDocuments(
  submissionId: string,
  documents: Array<{
    policy_id?: string;
    title?: string;
    document_type?: string;
    date_added?: string;
    file_url?: string;
    mime_type?: string;
    canopy_document_id?: string;
    canopy_policy_id?: string;
  }>
): Promise<Document[]> {
  const supabase = getSupabaseClient();

  const inserts = documents.map(d => ({
    submission_id: submissionId,
    policy_id: d.policy_id ?? null,
    title: d.title ?? null,
    document_type: d.document_type ?? null,
    date_added: d.date_added ?? null,
    file_url: d.file_url ?? null,
    mime_type: d.mime_type ?? null,
    canopy_document_id: d.canopy_document_id ?? null,
    canopy_policy_id: d.canopy_policy_id ?? null,
  }));

  const { data, error } = await supabase
    .from('documents')
    .insert(inserts)
    .select();

  if (error) throw error;
  return data as Document[];
}

// Create agents for a submission
export async function createAgents(
  submissionId: string,
  agents: Array<{
    agency_name?: string;
    agent_full_name?: string;
    phone_number?: string;
    email?: string;
    address?: Record<string, unknown>;
    canopy_agent_id?: string;
  }>
): Promise<Agent[]> {
  const supabase = getSupabaseClient();

  const inserts = agents.map(a => ({
    submission_id: submissionId,
    agency_name: a.agency_name ?? null,
    agent_full_name: a.agent_full_name ?? null,
    phone_number: a.phone_number ?? null,
    email: a.email ?? null,
    address: a.address ?? null,
    canopy_agent_id: a.canopy_agent_id ?? null,
  }));

  const { data, error } = await supabase
    .from('agents')
    .insert(inserts)
    .select();

  if (error) throw error;
  return data as Agent[];
}

// Create addresses for a submission
export async function createAddresses(
  submissionId: string,
  addresses: Array<{
    full_address?: string;
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    address_nature?: string;
    canopy_address_id?: string;
  }>
): Promise<Address[]> {
  const supabase = getSupabaseClient();

  const inserts = addresses.map(a => ({
    submission_id: submissionId,
    full_address: a.full_address ?? null,
    street1: a.street1 ?? null,
    street2: a.street2 ?? null,
    city: a.city ?? null,
    state: a.state ?? null,
    zip: a.zip ?? null,
    country: a.country ?? null,
    address_nature: a.address_nature ?? null,
    canopy_address_id: a.canopy_address_id ?? null,
  }));

  const { data, error } = await supabase
    .from('addresses')
    .insert(inserts)
    .select();

  if (error) throw error;
  return data as Address[];
}
