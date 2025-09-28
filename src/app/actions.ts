"use server";

import { recommendRemedy, type RemedyRecommenderInput } from "@/ai/flows/remedy-recommender";

export async function getRecommendation(input: RemedyRecommenderInput) {
  try {
    const result = await recommendRemedy(input);
    return { success: true, recommendation: result.recommendation };
  } catch (error) {
    console.error("AI recommendation error:", error);
    return { success: false, error: "Failed to get recommendation." };
  }
}
