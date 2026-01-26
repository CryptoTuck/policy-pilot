import { getOpenAIClient } from './openai';
import { POLICY_GRADING_SYSTEM_PROMPT, createGradingUserPrompt } from './grading-prompt';
import type { PolicySubmission } from '@/types/policy';
import type { PolicyReport, HomePolicyGrade, AutoPolicyGrade } from '@/types/grading';

export async function gradePolicy(submission: PolicySubmission): Promise<PolicyReport> {
  const openai = getOpenAIClient();

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: POLICY_GRADING_SYSTEM_PROMPT },
      { role: 'user', content: createGradingUserPrompt(submission) },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3, // Lower temperature for more consistent grading
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  const gradeResult = JSON.parse(content) as {
    homeGrade?: HomePolicyGrade;
    autoGrade?: AutoPolicyGrade;
  };

  // Calculate combined grade if both policies present
  let combinedGrade: string | undefined;
  let combinedScore: number | undefined;

  if (gradeResult.homeGrade && gradeResult.autoGrade) {
    combinedScore = Math.round(
      (gradeResult.homeGrade.overallScore + gradeResult.autoGrade.overallScore) / 2
    );
    combinedGrade = scoreToLetterGrade(combinedScore);
  }

  return {
    id: submission.id,
    generatedAt: new Date().toISOString(),
    homeGrade: gradeResult.homeGrade,
    autoGrade: gradeResult.autoGrade,
    combinedGrade,
    combinedScore,
  };
}

function scoreToLetterGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}
