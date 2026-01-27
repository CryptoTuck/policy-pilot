import { getOpenAIClient } from './openai';
import { POLICY_GRADING_SYSTEM_PROMPT } from './grading-prompt';
import type { PolicyReport, HomePolicyGrade, AutoPolicyGrade } from '@/types/grading';

interface CanopyData {
  autoCoverage?: string;
  homeCoverage?: string;
  homeDeducatable?: string;
  // Allow any additional fields Canopy might send
  [key: string]: unknown;
}

export async function gradeCanopyPolicy(id: string, canopyData: CanopyData): Promise<PolicyReport> {
  const openai = getOpenAIClient();

  const userPrompt = createCanopyGradingPrompt(canopyData);

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: POLICY_GRADING_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
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
    id,
    generatedAt: new Date().toISOString(),
    homeGrade: gradeResult.homeGrade,
    autoGrade: gradeResult.autoGrade,
    combinedGrade,
    combinedScore,
  };
}

function createCanopyGradingPrompt(data: CanopyData): string {
  let prompt = `Please analyze and grade the following insurance policy data from Canopy Connect:\n\n`;

  if (data.homeCoverage) {
    prompt += `## Home Insurance Coverage\n${data.homeCoverage}\n\n`;
  }

  if (data.homeDeducatable) {
    prompt += `## Home Deductible\n${data.homeDeducatable}\n\n`;
  }

  if (data.autoCoverage) {
    prompt += `## Auto Insurance Coverage\n${data.autoCoverage}\n\n`;
  }

  // Include any additional fields that might be useful
  const additionalFields = Object.entries(data).filter(
    ([key]) => !['autoCoverage', 'homeCoverage', 'homeDeducatable'].includes(key)
  );

  if (additionalFields.length > 0) {
    prompt += `## Additional Information\n`;
    for (const [key, value] of additionalFields) {
      if (value) {
        prompt += `${key}: ${value}\n`;
      }
    }
    prompt += '\n';
  }

  prompt += `Provide a comprehensive grade report following the grading criteria and output format specified in your instructions.

Important: Parse the coverage text to extract the relevant limits and values. The format is typically "Coverage Name: $Amount" with some showing split limits like "$X/$Y" for per-person/per-accident.`;

  return prompt;
}

function scoreToLetterGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}
