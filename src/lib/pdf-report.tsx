import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer';
import type {
  PolicyReport,
  CoverageGrade,
  HomePolicyGrade,
  AutoPolicyGrade,
  RentersPolicyGrade,
  CarrierAlignmentAnalysis,
  CarrierAlignmentFinding,
} from '@/types/grading';

// ─── Color helpers (mirrors ReportContent.tsx gradient tiers) ─────────────────

/** Lighter tint used as scorecard background (10-15% opacity feel). */
function getScoreBgColor(score?: number): string {
  if (score === undefined) return '#f1f5f9';
  if (score >= 90) return '#065f46'; // dark emerald
  if (score >= 80) return '#1e40af'; // dark blue
  if (score >= 70) return '#92400e'; // dark amber
  if (score >= 60) return '#c2410c'; // dark orange
  return '#991b1b';                  // dark red
}

function getCoverageScoreColors(score: number, hasRecommendation: boolean): {
  bg: string; text: string; badgeBg: string; badgeText: string;
} {
  if (score <= 2 || hasRecommendation) {
    return { bg: '#fef2f2', text: '#b91c1c', badgeBg: '#ef4444', badgeText: '#ffffff' };
  }
  if (score <= 3) {
    return { bg: '#fffbeb', text: '#92400e', badgeBg: '#f59e0b', badgeText: '#ffffff' };
  }
  return { bg: '#ffffff', text: '#374151', badgeBg: '#3b82f6', badgeText: '#ffffff' };
}

function getSeverityStyles(severity: string): { bg: string; border: string; badge: string; badgeText: string } {
  switch (severity) {
    case 'high': return { bg: '#fef2f2', border: '#fecaca', badge: '#fecdd3', badgeText: '#b91c1c' };
    case 'medium': return { bg: '#fffbeb', border: '#fde68a', badge: '#fef3c7', badgeText: '#92400e' };
    case 'low': return { bg: '#eff6ff', border: '#bfdbfe', badge: '#dbeafe', badgeText: '#1e40af' };
    default: return { bg: '#f9fafb', border: '#e5e7eb', badge: '#f3f4f6', badgeText: '#374151' };
  }
}

function getFindingTypeLabel(type: string): string {
  switch (type) {
    case 'gap': return 'Coverage Gap';
    case 'alignment': return 'Alignment Issue';
    case 'value': return 'Value Opportunity';
    default: return type;
  }
}

function getGradeDescription(grade: string): string {
  switch (grade.charAt(0).toUpperCase()) {
    case 'A': return 'Excellent coverage with strong protection across all areas';
    case 'B': return 'Good coverage with some areas for improvement';
    case 'C': return 'Adequate coverage with notable gaps to address';
    case 'D': return 'Below average coverage with significant gaps';
    case 'F': return 'Poor coverage with critical gaps that need immediate attention';
    default: return 'Coverage assessment complete';
  }
}

// ─── Score calculation (mirrors ReportContent.tsx) ────────────────────────────

function calculateSectionScore(coverages: { score: number | 'bonus'; maxScore: number }[]): { score: number; maxScore: number } {
  const score = coverages.reduce((sum, c) => sum + (typeof c.score === 'number' ? c.score : 0), 0);
  const maxScore = coverages.reduce((sum, c) => sum + (typeof c.score === 'number' ? c.maxScore : 0), 0);
  return { score, maxScore };
}

const AUTO_SECTION_COVERAGES = [
  'bodily injury liability',
  'property damage liability',
  'uninsured/underinsured motorist',
  'uninsured motorist/underinsured motorist',
  'medical payments',
  'collision deductible',
  'collision',
  'comprehensive deductible',
  'comprehensive',
];

const HOME_SECTION_COVERAGES = [
  'dwelling',
  'other structures',
  'personal property',
  'loss of use',
  'personal liability',
  'medical payments',
  'all perils deductible',
  'wind or hail deductible',
  'windstorm or hail deductible',
  'wind hail deductible',
  'windstorm hail deductible',
];

function normalizeCoverageName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function isCoreCoverage(name: string, coreNames: string[]): boolean {
  const normalized = normalizeCoverageName(name);
  return coreNames.some((core) => normalized.includes(normalizeCoverageName(core)));
}


function gradeToScore(grade?: string): number | undefined {
  if (!grade) return undefined;
  switch (grade.charAt(0).toUpperCase()) {
    case 'A': return 95;
    case 'B': return 85;
    case 'C': return 75;
    case 'D': return 65;
    case 'F': return 45;
    default: return undefined;
  }
}

function getPolicyScore(grade?: string, score?: number): number | undefined {
  if (typeof score === 'number' && !Number.isNaN(score)) {
    return Math.max(0, Math.min(100, Math.round(score)));
  }
  const gs = gradeToScore(grade);
  return gs === undefined ? undefined : Math.max(0, Math.min(100, gs));
}

function averageScores(scores: Array<number | undefined>): number | undefined {
  const valid = scores.filter((s): s is number => typeof s === 'number');
  if (valid.length === 0) return undefined;
  return Math.round(valid.reduce((a, b) => a + b, 0) / valid.length);
}

function weightedOverallScore(
  homeScore?: number,
  autoScore?: number,
  rentersScore?: number,
): number | undefined {
  const hasHome = typeof homeScore === 'number';
  const hasAuto = typeof autoScore === 'number';
  const hasRenters = typeof rentersScore === 'number';

  if (!hasHome && !hasAuto && !hasRenters) return undefined;

  if (hasHome && !hasAuto && !hasRenters) return homeScore;
  if (!hasHome && hasAuto && !hasRenters) return autoScore;
  if (!hasHome && !hasAuto && hasRenters) return rentersScore;

  // Home + Auto → 45/55
  if (hasHome && hasAuto && !hasRenters) {
    return Math.round(homeScore! * 0.45 + autoScore! * 0.55);
  }

  // Renters + Auto → 30/70
  if (!hasHome && hasAuto && hasRenters) {
    return Math.round(rentersScore! * 0.30 + autoScore! * 0.70);
  }

  return averageScores([homeScore, autoScore, rentersScore]);
}

function getLetterGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

function getSectionAnalysisColor(score: number, maxScore: number): string {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  if (pct >= 90) return '#22c55e';
  if (pct >= 80) return '#3b82f6';
  if (pct >= 70) return '#f59e0b';
  if (pct >= 60) return '#f97316';
  return '#dc2626';
}

// ─── PDF Styles ──────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 56,
    paddingHorizontal: 36,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1f2937',
    backgroundColor: '#f9fafb',
  },

  // ── Header ──
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  brandName: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: '#3b82f6' },
  headerDate: { fontSize: 9, color: '#9ca3af' },
  gradeTitle: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: '#111827', marginBottom: 2 },
  gradeSubtitle: { fontSize: 10, color: '#6b7280', marginBottom: 14 },

  // ── Scorecard banner (matches web gradient card) ──
  scorecardOuter: {
    borderRadius: 12,
    padding: 24,
    marginBottom: 14,
  },
  scorecardFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scorecardLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scorecardValue: {
    fontSize: 40,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    marginTop: 4,
  },
  // Sub-score chips (right side of scorecard)
  chipRow: { flexDirection: 'row', gap: 8 },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    minWidth: 70,
  },
  chipValue: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  chipLabel: { fontSize: 7, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 },

  // ── Areas-to-review alert (red/orange box like web) ──
  alertBox: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
    borderRadius: 6,
    padding: 12,
    marginBottom: 14,
  },
  alertTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#991b1b', marginBottom: 6 },
  alertBullet: { flexDirection: 'row', marginBottom: 3 },
  alertDot: { fontSize: 9, color: '#f87171', marginRight: 6, width: 8 },
  alertText: { fontSize: 9, color: '#b91c1c', flex: 1, lineHeight: 1.4 },

  // ── Section headings ──
  sectionHeading: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginTop: 18,
    marginBottom: 10,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionCardTitle: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: '#111827', marginBottom: 2 },
  sectionCardSubtitle: { fontSize: 9, color: '#6b7280', marginBottom: 10 },

  // ── Coverage table (dark header like web) ──
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderText: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#ffffff', textTransform: 'uppercase', letterSpacing: 0.5 },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  tableRowFlagged: {
    borderLeftWidth: 3,
  },
  colName: { width: '22%' },
  colLimit: { width: '15%' },
  colScore: { width: '10%', alignItems: 'center' },
  colExplanation: { width: '53%' },
  cellText: { fontSize: 8, color: '#374151', lineHeight: 1.4 },
  cellBold: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#111827' },
  scoreBadge: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  recommendationText: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#b91c1c', marginTop: 3 },

  // ── Section analysis bar (gradient bar like web) ──
  analysisBar: {
    borderRadius: 8,
    padding: 14,
    marginTop: 10,
    marginBottom: 4,
  },
  analysisBarTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  analysisBarScore: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginTop: 2 },
  analysisBarText: { fontSize: 9, color: 'rgba(255,255,255,0.92)', marginTop: 6, lineHeight: 1.5 },

  // ── Carrier analysis ──
  carrierSummaryBox: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  carrierSummaryText: { fontSize: 9, color: '#374151', lineHeight: 1.5 },
  findingCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
  },
  findingTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#111827' },
  findingBadge: { fontSize: 7, paddingVertical: 1, paddingHorizontal: 5, borderRadius: 8, marginLeft: 6 },
  findingDesc: { fontSize: 8, color: '#4b5563', marginTop: 3, lineHeight: 1.4 },
  findingPolicies: { flexDirection: 'row', gap: 4, marginTop: 4 },
  findingPolicyTag: { fontSize: 7, backgroundColor: '#f3f4f6', color: '#6b7280', paddingVertical: 1, paddingHorizontal: 5, borderRadius: 4 },

  // ── Footer ──
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 36,
    right: 36,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerText: { fontSize: 7, color: '#9ca3af', textAlign: 'center', lineHeight: 1.4 },
});

// ─── Sub-Components ──────────────────────────────────────────────────────────

function CoverageTable({ coverages }: { coverages: CoverageGrade[] }) {
  return (
    <View>
      <View style={s.tableHeader}>
        <Text style={[s.tableHeaderText, s.colName]}>Coverage</Text>
        <Text style={[s.tableHeaderText, s.colLimit]}>Limit</Text>
        <Text style={[s.tableHeaderText, s.colScore]}>Score</Text>
        <Text style={[s.tableHeaderText, s.colExplanation]}>What It Means</Text>
      </View>
      {coverages.map((c, i) => {
        const isBonus = c.score === 'bonus';
        const numericScore = typeof c.score === 'number' ? c.score : undefined;
        const flagged = !isBonus && ((numericScore ?? 0) <= 3 || !!c.recommendation);
        const colors = isBonus
          ? { bg: '#ffffff', text: '#374151', badgeBg: '#e2e8f0', badgeText: '#475569' }
          : getCoverageScoreColors(numericScore ?? 0, !!c.recommendation);
        return (
          <View
            style={[
              s.tableRow,
              { backgroundColor: flagged ? colors.bg : i % 2 === 0 ? '#ffffff' : '#f9fafb' },
              flagged ? { ...s.tableRowFlagged, borderLeftColor: colors.badgeBg } : {},
            ]}
            key={i}
            wrap={false}
          >
            <View style={s.colName}>
              <Text style={[s.cellBold, flagged ? { color: colors.text } : {}]}>{c.name}</Text>
            </View>
            <View style={s.colLimit}>
              <Text style={[s.cellText, flagged ? { color: colors.text } : {}]}>{c.limit || '—'}</Text>
            </View>
            <View style={s.colScore}>
              <Text style={[s.scoreBadge, { backgroundColor: colors.badgeBg, color: colors.badgeText }]}>
                {isBonus ? 'Bonus' : `${numericScore}/${c.maxScore}`}
              </Text>
            </View>
            <View style={s.colExplanation}>
              <Text style={[s.cellText, flagged ? { color: colors.text } : {}]}>{c.explanation}</Text>
              {c.recommendation && (
                <Text style={s.recommendationText}>→ {c.recommendation}</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

function SectionAnalysisBar({ title, score, maxScore, summary }: { title: string; score: number; maxScore: number; summary: string }) {
  const bgColor = getSectionAnalysisColor(score, maxScore);
  return (
    <View style={[s.analysisBar, { backgroundColor: bgColor }]}>
      <Text style={s.analysisBarTitle}>Section Analysis</Text>
      <Text style={s.analysisBarScore}>{title} — Total Score: {score}/{maxScore}</Text>
      <Text style={s.analysisBarText}>{summary}</Text>
    </View>
  );
}

function AreasToReviewAlert({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <View style={s.alertBox}>
      <Text style={s.alertTitle}>Areas That Need Your Attention</Text>
      {items.map((item, i) => (
        <View style={s.alertBullet} key={i}>
          <Text style={s.alertDot}>•</Text>
          <Text style={s.alertText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Policy Sections ─────────────────────────────────────────────────────────

function HomeSection({ home, carrier }: { home: HomePolicyGrade; carrier?: string }) {
  const allCoverages = [...home.standardCoverages, home.deductibleGrade];
  const coveragesWithBonus = allCoverages.map((coverage) => (
    isCoreCoverage(coverage.name, HOME_SECTION_COVERAGES)
      ? coverage
      : { ...coverage, score: 'bonus' as const }
  ));
  const scores = calculateSectionScore(coveragesWithBonus);

  return (
    <View>
      <Text style={s.sectionHeading}>
        Home Policy Analysis{carrier ? ` (${carrier})` : ''}
      </Text>
      <View style={s.sectionCard}>
        <Text style={s.sectionCardTitle}>Your Home Coverages</Text>
        <Text style={s.sectionCardSubtitle}>Standard coverages, deductibles, and endorsements</Text>
        <CoverageTable coverages={coveragesWithBonus} />
        <SectionAnalysisBar title="Home Coverage" score={scores.score} maxScore={scores.maxScore} summary={home.summary} />
      </View>
    </View>
  );
}

function AutoSection({ auto, index }: { auto: AutoPolicyGrade; index?: number }) {
  const coveragesWithBonus = auto.standardCoverages.map((coverage) => (
    isCoreCoverage(coverage.name, AUTO_SECTION_COVERAGES)
      ? coverage
      : { ...coverage, score: 'bonus' as const }
  ));
  const scores = calculateSectionScore(coveragesWithBonus);
  const showVehicleHeader = auto.vehicleInfo || (index !== undefined && index > 0);

  return (
    <View style={s.sectionCard}>
      {showVehicleHeader && (
        <View style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 8, color: '#6b7280' }}>Vehicle</Text>
          <Text style={{ fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#111827', marginTop: 2 }}>
            {auto.vehicleInfo || `Auto Policy ${(index ?? 0) + 1}`}
          </Text>
          {auto.policyNumber && auto.policyNumber !== 'N/A' && (
            <Text style={{ fontSize: 8, color: '#6b7280', marginTop: 2 }}>Policy #{auto.policyNumber}</Text>
          )}
        </View>
      )}
      <Text style={s.sectionCardTitle}>{showVehicleHeader ? 'Your Coverages' : 'Your Auto Coverages'}</Text>
      <CoverageTable coverages={coveragesWithBonus} />
      <SectionAnalysisBar
        title={showVehicleHeader ? `${auto.vehicleInfo || `Policy ${(index ?? 0) + 1}`} Coverage` : 'Auto Coverage'}
        score={scores.score}
        maxScore={scores.maxScore}
        summary={auto.summary}
      />
    </View>
  );
}

function RentersSection({ renters, carrier }: { renters: RentersPolicyGrade; carrier?: string }) {
  const allCoverages = renters.deductibleGrade
    ? [...renters.standardCoverages, renters.deductibleGrade]
    : renters.standardCoverages;
  const scores = calculateSectionScore(allCoverages);

  return (
    <View>
      <Text style={s.sectionHeading}>
        Renters Policy Analysis{carrier ? ` (${carrier})` : ''}
      </Text>
      <View style={s.sectionCard}>
        <Text style={s.sectionCardTitle}>Your Renters Coverages</Text>
        <CoverageTable coverages={allCoverages} />
        <SectionAnalysisBar title="Renters Coverage" score={scores.score} maxScore={scores.maxScore} summary={renters.summary} />
      </View>
    </View>
  );
}

function CarrierSection({ analysis }: { analysis: CarrierAlignmentAnalysis }) {
  const sorted = [...analysis.findings].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 } as Record<string, number>;
    return (order[a.severity] ?? 3) - (order[b.severity] ?? 3);
  });

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18, marginBottom: 10, gap: 8 }}>
        <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#111827' }}>Carrier-Aligned Analysis</Text>
        <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#ffffff', backgroundColor: '#3b82f6', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 8 }}>
          Portfolio View
        </Text>
      </View>

      {/* Status badges */}
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
        <Text style={{
          fontSize: 8, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 10,
          backgroundColor: analysis.isBundled ? '#dcfce7' : '#fef3c7',
          color: analysis.isBundled ? '#166534' : '#92400e',
        }}>
          {analysis.isBundled ? '✓ Bundled' : '! Not Bundled'}
        </Text>
        <Text style={{
          fontSize: 8, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 10,
          backgroundColor: analysis.liabilityAligned ? '#dcfce7' : '#fef3c7',
          color: analysis.liabilityAligned ? '#166534' : '#92400e',
        }}>
          {analysis.liabilityAligned ? '✓ Liability Aligned' : '! Liability Mismatch'}
        </Text>
      </View>

      {analysis.summary && (
        <View style={s.carrierSummaryBox}>
          <Text style={s.carrierSummaryText}>{analysis.summary}</Text>
        </View>
      )}

      {sorted.map((f: CarrierAlignmentFinding, i: number) => {
        const sty = getSeverityStyles(f.severity);
        return (
          <View style={[s.findingCard, { backgroundColor: sty.bg, borderColor: sty.border }]} key={i} wrap={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={s.findingTitle}>{f.title}</Text>
              <Text style={[s.findingBadge, { backgroundColor: sty.badge, color: sty.badgeText }]}>
                {getFindingTypeLabel(f.type)}
              </Text>
            </View>
            <Text style={s.findingDesc}>{f.description}</Text>
            {f.affectedPolicies.length > 0 && (
              <View style={s.findingPolicies}>
                {f.affectedPolicies.map((p, j) => (
                  <Text style={s.findingPolicyTag} key={j}>{p}</Text>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

// ─── Main Document ───────────────────────────────────────────────────────────

function ReportDocument({ report }: { report: PolicyReport }) {
  const homeScore = getPolicyScore(report.homeGrade?.overallGrade, report.homeGrade?.overallScore);
  const rentersScore = getPolicyScore(report.rentersGrade?.overallGrade, report.rentersGrade?.overallScore);

  const autoPolicies: AutoPolicyGrade[] =
    report.autoGrades && report.autoGrades.length > 0
      ? report.autoGrades
      : report.autoGrade
        ? [report.autoGrade]
        : [];
  const autoScoresArr = autoPolicies.map((a) => getPolicyScore(a.overallGrade, a.overallScore));
  const autoAvg = averageScores(autoScoresArr);

  const overallScore = report.combinedScore ?? weightedOverallScore(homeScore, autoAvg, rentersScore);
  const overallGrade = report.combinedGrade ?? (overallScore !== undefined ? getLetterGrade(overallScore) : undefined);

  const dateStr = new Date(report.generatedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const allAreasToReview: string[] = [
    ...(report.homeGrade?.areasToReview || []).map((a) => `Home: ${a}`),
    ...autoPolicies.flatMap((a) => (a.areasToReview || []).map((area) => `Auto: ${area}`)),
    ...(report.rentersGrade?.areasToReview || []).map((a) => `Renters: ${a}`),
  ];

  const subScoreChips: { label: string; score: number | undefined }[] = [];
  if (report.homeGrade) subScoreChips.push({ label: 'Home', score: homeScore });
  if (autoPolicies.length > 0) subScoreChips.push({ label: 'Auto', score: autoAvg });
  if (report.rentersGrade) subScoreChips.push({ label: 'Renters', score: rentersScore });

  const formatPct = (v?: number) => (typeof v === 'number' ? `${v}%` : '--');
  const scoreBg = getScoreBgColor(overallScore);

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* ── Header ── */}
        <View style={s.headerRow}>
          <Text style={s.brandName}>Policy Pilot</Text>
          <Text style={s.headerDate}>{dateStr}</Text>
        </View>

        <Text style={s.gradeTitle}>Overall Policy Grade</Text>
        <Text style={s.gradeSubtitle}>
          {overallGrade ? getGradeDescription(overallGrade) : 'Coverage assessment complete'}
        </Text>

        {/* ── Scorecard Banner ── */}
        {overallScore !== undefined && (
          <View style={[s.scorecardOuter, { backgroundColor: scoreBg }]}>
            <View style={s.scorecardFlex}>
              <View>
                <Text style={s.scorecardLabel}>Overall Score</Text>
                <Text style={s.scorecardValue}>{formatPct(overallScore)}</Text>
              </View>
              {subScoreChips.length > 1 && (
                <View style={s.chipRow}>
                  {subScoreChips.map((chip, i) => (
                    <View style={s.chip} key={i}>
                      <Text style={s.chipValue}>{formatPct(chip.score)}</Text>
                      <Text style={s.chipLabel}>{chip.label}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

        {/* ── Areas to Review ── */}
        <AreasToReviewAlert items={allAreasToReview} />

        {/* ── Carrier Analysis ── */}
        {report.carrierAnalysis && <CarrierSection analysis={report.carrierAnalysis} />}

        {/* ── Home Section ── */}
        {report.homeGrade && <HomeSection home={report.homeGrade} carrier={report.carriers?.home} />}

        {/* ── Auto Section(s) ── */}
        {autoPolicies.length > 0 && (
          <View>
            <Text style={s.sectionHeading}>
              Auto Policy Analysis{report.carriers?.auto ? ` (${report.carriers.auto})` : ''}
            </Text>
            {autoPolicies.map((auto, i) => (
              <AutoSection auto={auto} index={i} key={i} />
            ))}
          </View>
        )}

        {/* ── Renters Section ── */}
        {report.rentersGrade && <RentersSection renters={report.rentersGrade} carrier={report.carriers?.renters} />}

        {/* ── Footer ── */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>
            This report is for educational purposes only and does not constitute professional insurance advice.
            Consult with a licensed insurance agent for personalized recommendations.
          </Text>
          <Text style={[s.footerText, { marginTop: 4 }]}>
            © {new Date().getFullYear()} Policy Pilot. All rights reserved.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function generateReportPdf(report: PolicyReport): Promise<Buffer> {
  const buffer = await renderToBuffer(<ReportDocument report={report} />);
  return Buffer.from(buffer);
}
