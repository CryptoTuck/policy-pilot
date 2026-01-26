import { Redis } from '@upstash/redis';
import type { PolicySubmission } from '@/types/policy';
import type { PolicyReport } from '@/types/grading';

// Initialize Redis client if environment variables are set
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Fallback in-memory storage for local development
const globalForStorage = globalThis as unknown as {
  submissions: Map<string, PolicySubmission> | undefined;
  reports: Map<string, PolicyReport> | undefined;
};

const memorySubmissions = globalForStorage.submissions ?? new Map<string, PolicySubmission>();
const memoryReports = globalForStorage.reports ?? new Map<string, PolicyReport>();

if (process.env.NODE_ENV !== 'production') {
  globalForStorage.submissions = memorySubmissions;
  globalForStorage.reports = memoryReports;
}

// Key prefixes for Redis
const SUBMISSION_PREFIX = 'submission:';
const REPORT_PREFIX = 'report:';

// TTL for stored data (7 days in seconds)
const TTL_SECONDS = 7 * 24 * 60 * 60;

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export async function storeSubmission(submission: PolicySubmission): Promise<void> {
  if (redis) {
    // Upstash SDK auto-serializes objects
    await redis.set(`${SUBMISSION_PREFIX}${submission.id}`, submission, {
      ex: TTL_SECONDS,
    });
  } else {
    memorySubmissions.set(submission.id, submission);
  }
}

export async function getSubmission(id: string): Promise<PolicySubmission | undefined> {
  if (redis) {
    // Upstash SDK auto-deserializes objects
    const data = await redis.get<PolicySubmission>(`${SUBMISSION_PREFIX}${id}`);
    return data ?? undefined;
  }
  return memorySubmissions.get(id);
}

export async function storeReport(report: PolicyReport): Promise<void> {
  if (redis) {
    // Upstash SDK auto-serializes objects
    await redis.set(`${REPORT_PREFIX}${report.id}`, report, {
      ex: TTL_SECONDS,
    });
  } else {
    memoryReports.set(report.id, report);
  }
}

export async function getReport(id: string): Promise<PolicyReport | undefined> {
  if (redis) {
    // Upstash SDK auto-deserializes objects
    const data = await redis.get<PolicyReport>(`${REPORT_PREFIX}${id}`);
    return data ?? undefined;
  }
  return memoryReports.get(id);
}

// Clean up old entries (only needed for in-memory storage)
export function cleanupOldEntries(maxAgeMs: number = 24 * 60 * 60 * 1000): void {
  if (redis) {
    // Redis handles TTL automatically
    return;
  }

  const now = Date.now();

  for (const [id, submission] of memorySubmissions) {
    const submittedAt = new Date(submission.submittedAt).getTime();
    if (now - submittedAt > maxAgeMs) {
      memorySubmissions.delete(id);
    }
  }

  for (const [id, report] of memoryReports) {
    const generatedAt = new Date(report.generatedAt).getTime();
    if (now - generatedAt > maxAgeMs) {
      memoryReports.delete(id);
    }
  }
}
