import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema"; 

const PostSchema = z.object({
  title: z
    .string()
    .min(5, "Title is too short.")
    .describe("A catchy, SEO-friendly title."),
  content: z
    .string()
    .min(100, "Content must be substantial.")
    .describe("The full blog content in Markdown format."),
  summary: z
    .string()
    .min(20, "Summary is too short.")
    .describe("A brief, two-sentence summary."),
  tags: z
    .array(z.string())
    .max(5, "Limit tags to 5.")
    .describe("Up to 5 relevant technical tags.")
    .optional(),
});

export type GeneratedPost = z.infer<typeof PostSchema>;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateBlogPost(topic: string): Promise<GeneratedPost> {
  const systemInstruction = `You are an expert technical blog writer specializing in modern web development.
    Your response MUST be a valid JSON object matching the provided schema.
    The 'content' field must be well-formatted using detailed Markdown, including headings, lists, and code blocks.
    The blog post should be insightful, detailed, and aimed at developers.`;

  const userPrompt = `Generate a comprehensive blog post on the topic: "${topic}". 
    Ensure the content is high-quality Markdown.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemInstruction, 
        temperature: 0.7,
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(PostSchema),
      },
      contents: userPrompt,
    });

    if (!response.text) {
      throw new Error("AI response text is empty or undefined.");
    }
    const jsonText = response.text.trim();
    const generatedObject = JSON.parse(jsonText);

    return PostSchema.parse(generatedObject);
  } catch (e) {
    console.error("AI response validation failed or API error:", e);
    throw new Error(
      "Failed to generate or validate structured content from AI. Check API Key and prompt."
    );
  }
}