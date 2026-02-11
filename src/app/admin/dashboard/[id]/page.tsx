import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';
import { LeadDetailClient } from './LeadDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: Props) {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    redirect('/admin');
  }

  const { id } = await params;
  return <LeadDetailClient id={id} />;
}
