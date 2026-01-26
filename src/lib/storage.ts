import type { PolicySubmission } from '@/types/policy';
import type { PolicyReport } from '@/types/grading';

// In-memory storage for MVP
// In production, replace with database (Postgres, Redis, etc.)

// Use global to persist across hot reloads in development
const globalForStorage = globalThis as unknown as {
  submissions: Map<string, PolicySubmission> | undefined;
  reports: Map<string, PolicyReport> | undefined;
};

const submissions = globalForStorage.submissions ?? new Map<string, PolicySubmission>();
const reports = globalForStorage.reports ?? new Map<string, PolicyReport>();

if (process.env.NODE_ENV !== 'production') {
  globalForStorage.submissions = submissions;
  globalForStorage.reports = reports;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function storeSubmission(submission: PolicySubmission): void {
  submissions.set(submission.id, submission);
}

export function getSubmission(id: string): PolicySubmission | undefined {
  return submissions.get(id);
}

export function storeReport(report: PolicyReport): void {
  reports.set(report.id, report);
}

export function getReport(id: string): PolicyReport | undefined {
  return reports.get(id);
}

// Clean up old entries (call periodically in production)
export function cleanupOldEntries(maxAgeMs: number = 24 * 60 * 60 * 1000): void {
  const now = Date.now();

  for (const [id, submission] of submissions) {
    const submittedAt = new Date(submission.submittedAt).getTime();
    if (now - submittedAt > maxAgeMs) {
      submissions.delete(id);
    }
  }

  for (const [id, report] of reports) {
    const generatedAt = new Date(report.generatedAt).getTime();
    if (now - generatedAt > maxAgeMs) {
      reports.delete(id);
    }
  }
}
