import { Redis } from '@upstash/redis';
import type { PolicySubmission } from '@/types/policy';
import type { PolicyReport } from '@/types/grading';

// Initialize Redis client using environment variables
// Vercel KV uses KV_REST_API_URL and KV_REST_API_TOKEN
let redis: Redis | null = null;
const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

if (redisUrl && redisToken) {
  redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });
} else {
  console.log('Redis not configured, using in-memory storage');
}

// Fallback in-memory storage for local development
const globalForStorage = globalThis as unknown as {
  submissions: Map<string, PolicySubmission> | undefined;
  reports: Map<string, PolicyReport> | undefined;
  tokenToReport: Map<string, string> | undefined;
};

const memorySubmissions = globalForStorage.submissions ?? new Map<string, PolicySubmission>();
const memoryReports = globalForStorage.reports ?? new Map<string, PolicyReport>();
const memoryTokenToReport = globalForStorage.tokenToReport ?? new Map<string, string>();

if (process.env.NODE_ENV !== 'production') {
  globalForStorage.submissions = memorySubmissions;
  globalForStorage.reports = memoryReports;
  globalForStorage.tokenToReport = memoryTokenToReport;
}

// Key prefixes for Redis
const SUBMISSION_PREFIX = 'submission:';
const REPORT_PREFIX = 'report:';
const TOKEN_PREFIX = 'token:';

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

/**
 * Store a mapping from a session token to a report ID.
 * Called by the webhook after grading, using the token from pullMetaData.
 */
export async function storeReportByToken(token: string, reportId: string): Promise<void> {
  if (redis) {
    await redis.set(`${TOKEN_PREFIX}${token}`, reportId, {
      ex: TTL_SECONDS,
    });
  } else {
    memoryTokenToReport.set(token, reportId);
  }
}

/**
 * Look up a report by its session token.
 * Called by the polling endpoint to find the user's specific report.
 */
export async function getReportByToken(token: string): Promise<PolicyReport | undefined> {
  let reportId: string | null = null;

  if (redis) {
    reportId = await redis.get<string>(`${TOKEN_PREFIX}${token}`);
  } else {
    reportId = memoryTokenToReport.get(token) ?? null;
  }

  if (!reportId) {
    return undefined;
  }

  return getReport(reportId);
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
