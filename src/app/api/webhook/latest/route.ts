import { NextRequest, NextResponse } from 'next/server';
import { getReportByToken } from '@/lib/storage';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { status: 'error', message: 'Missing token parameter' },
      { status: 400 }
    );
  }

  const report = await getReportByToken(token);

  if (!report) {
    return NextResponse.json({ status: 'pending' });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const reportUrl = `${baseUrl}/report/${report.id}`;

  return NextResponse.json({
    status: 'complete',
    reportId: report.id,
    reportUrl,
  });
}
