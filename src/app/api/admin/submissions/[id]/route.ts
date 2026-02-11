import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseClient } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check auth
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  
  if (!session?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const supabase = getSupabaseClient();

    // Get full submission with all related data
    const { data: submission, error: subError } = await supabase
      .from('submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (subError) throw subError;
    if (!submission) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Get policies
    const { data: policies } = await supabase
      .from('policies')
      .select('*')
      .eq('submission_id', id);

    // Get coverages for each policy
    const policiesWithCoverages = await Promise.all(
      (policies || []).map(async (policy) => {
        const { data: coverages } = await supabase
          .from('coverages')
          .select('*')
          .eq('policy_id', policy.id);
        
        const { data: vehicles } = await supabase
          .from('vehicles')
          .select('*')
          .eq('policy_id', policy.id);

        return { ...policy, coverages, vehicles };
      })
    );

    // Get grading results
    const { data: gradingResults } = await supabase
      .from('grading_results')
      .select('*')
      .eq('submission_id', id);

    // Get drivers
    const { data: drivers } = await supabase
      .from('drivers')
      .select('*')
      .eq('submission_id', id);

    // Get addresses
    const { data: addresses } = await supabase
      .from('addresses')
      .select('*')
      .eq('submission_id', id);

    return NextResponse.json({
      submission,
      policies: policiesWithCoverages,
      gradingResults,
      drivers,
      addresses,
    });
  } catch (error) {
    console.error('[Admin API] Error fetching submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}
