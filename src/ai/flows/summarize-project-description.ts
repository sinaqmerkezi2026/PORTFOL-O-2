'use server';
/**
 * @fileOverview A Genkit flow for summarizing project descriptions.
 *
 * - summarizeProjectDescription - A function that generates a concise summary for a given project description.
 * - SummarizeProjectDescriptionInput - The input type for the summarizeProjectDescription function.
 * - SummarizeProjectDescriptionOutput - The return type for the summarizeProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProjectDescriptionInputSchema = z.object({
  projectDescription: z
    .string()
    .describe("The detailed description of the project."),
  maxLengthWords: z
    .number()
    .optional()
    .describe("The maximum number of words for the summary. Defaults to 50 if not provided."),
});
export type SummarizeProjectDescriptionInput = z.infer<
  typeof SummarizeProjectDescriptionInputSchema
>;

const SummarizeProjectDescriptionOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the project description.'),
});
export type SummarizeProjectDescriptionOutput = z.infer<
  typeof SummarizeProjectDescriptionOutputSchema
>;

export async function summarizeProjectDescription(
  input: SummarizeProjectDescriptionInput
): Promise<SummarizeProjectDescriptionOutput> {
  return summarizeProjectDescriptionFlow(input);
}

const summarizeProjectDescriptionPrompt = ai.definePrompt({
  name: 'summarizeProjectDescriptionPrompt',
  input: {schema: SummarizeProjectDescriptionInputSchema},
  output: {schema: SummarizeProjectDescriptionOutputSchema},
  prompt: `You are an AI assistant tasked with generating concise summaries of project descriptions for a student developer's portfolio.

Summarize the following project description into a brief, engaging, and professional paragraph suitable for a project card.

If a maximum word length is provided, adhere to it strictly. Otherwise, aim for around 50 words.

Project Description: {{{projectDescription}}}

Maximum Word Length: {{{maxLengthWords}}}`,
});

const summarizeProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'summarizeProjectDescriptionFlow',
    inputSchema: SummarizeProjectDescriptionInputSchema,
    outputSchema: SummarizeProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await summarizeProjectDescriptionPrompt(input);
    if (!output) {
      throw new Error('Failed to generate project summary.');
    }
    return output;
  }
);
