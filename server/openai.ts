import OpenAI from "openai";
import "dotenv/config";


// Set up the OpenAI client
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "",  // Use empty string as fallback for type safety
});

// Basic text analysis example
export async function chatCompletion(text: string): Promise<string> {
  try {
    const prompt = `${text}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content || "";
  } catch (error: any) {
    console.error("OpenAI chat completion error:", error);
    throw new Error(`OpenAI API error: ${error.message || 'Unknown error'}`);
  }
}

// Function to analyze sentiment with structured output
export async function analyzeSentiment(text: string): Promise<{
  rating: number,
  confidence: number
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content:
            "You are a sentiment analysis expert. Analyze the sentiment of the text and provide a rating from 1 to 5 stars and a confidence score between 0 and 1. Respond with JSON in this format: { 'rating': number, 'confidence': number }",
        },
        {
          role: "user",
          content: text || "",
        },
      ],
      response_format: { type: "json_object" },
    });

    // We know the content exists because we're using response_format: { type: "json_object" }
    // But TypeScript doesn't know this, so we need to handle the null case
    const content = response.choices[0].message.content || "{}";
    const result = JSON.parse(content);

    return {
      rating: Math.max(1, Math.min(5, Math.round(result.rating))),
      confidence: Math.max(0, Math.min(1, result.confidence)),
    };
  } catch (error: any) {
    console.error("OpenAI sentiment analysis error:", error);
    throw new Error(`OpenAI API error: ${error.message || 'Unknown error'}`);
  }
}
