import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  // Check auth
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  
  if (!session?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get submissions with grading results
    const { data: submissions, error, count } = await supabase
      .from('submissions')
      .select(`
        id,
        created_at,
        status,
        customer_email,
        customer_first_name,
        customer_last_name,
        customer_phone,
        insurance_provider,
        insurance_provider_friendly,
        grading_results (
          overall_score,
          home_score,
          auto_score,
          renters_score
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Calculate grades from scores
    const submissionsWithGrades = submissions?.map(sub => {
      const grading = sub.grading_results?.[0];
      return {
        ...sub,
        overallGrade: grading?.overall_score ? scoreToGrade(grading.overall_score) : null,
        homeGrade: grading?.home_score ? scoreToGrade(grading.home_score) : null,
        autoGrade: grading?.auto_score ? scoreToGrade(grading.auto_score) : null,
        rentersGrade: grading?.renters_score ? scoreToGrade(grading.renters_score) : null,
      };
    });

    return NextResponse.json({
      submissions: submissionsWithGrades,
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('[Admin API] Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

function scoreToGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}
