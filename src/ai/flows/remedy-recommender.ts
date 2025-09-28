// remedy-recommender.ts
'use server';

/**
 * @fileOverview Remedy Recommender AI agent.
 *
 * - recommendRemedy - A function that recommends alternative remedies.
 * - RemedyRecommenderInput - The input type for the recommendRemedy function.
 * - RemedyRecommenderOutput - The return type for the recommendRemedy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RemedyRecommenderInputSchema = z.object({
  ailment: z.string().describe('The ailment for which to recommend remedies.'),
  availableIngredients: z.string().describe('A comma-separated list of ingredients the user has available.'),
  originalRemedy: z.string().describe('The original remedy the user was considering.'),
});
export type RemedyRecommenderInput = z.infer<typeof RemedyRecommenderInputSchema>;

const RemedyRecommenderOutputSchema = z.object({
  recommendation: z.string().describe('A recommendation for an alternative remedy based on the available ingredients.'),
});
export type RemedyRecommenderOutput = z.infer<typeof RemedyRecommenderOutputSchema>;

export async function recommendRemedy(input: RemedyRecommenderInput): Promise<RemedyRecommenderOutput> {
  return remedyRecommenderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'remedyRecommenderPrompt',
  input: {schema: RemedyRecommenderInputSchema},
  output: {schema: RemedyRecommenderOutputSchema},
  prompt: `You are an expert in traditional Indian remedies.

  The user is seeking a remedy for the following ailment: {{{ailment}}}.
  The user has the following ingredients available: {{{availableIngredients}}}.
  The user was originally considering the following remedy: {{{originalRemedy}}}.

  Recommend an alternative remedy that utilizes the available ingredients to treat the ailment. Be brief and specific.`,
});

const remedyRecommenderFlow = ai.defineFlow(
  {
    name: 'remedyRecommenderFlow',
    inputSchema: RemedyRecommenderInputSchema,
    outputSchema: RemedyRecommenderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
