import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { cookies } from "next/headers";

const FREE_LIMIT = 5;

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting (Cookie-based for MVP)
    const cookieStore = await cookies();
    const usageCookie = cookieStore.get("sola_usage");
    let usageCount = 0;

    // Check if cookie exists and is from today
    if (usageCookie) {
      const { count, date } = JSON.parse(usageCookie.value);
      const today = new Date().toISOString().split('T')[0];
      if (date === today) {
        usageCount = count;
      }
    }

    if (usageCount >= FREE_LIMIT) {
      // Return specific error structure for Frontend to handle Upsell
      return NextResponse.json(
        { error: "Rate limit exceeded", code: "RATE_LIMIT_EXCEEDED" },
        { status: 429 }
      );
    }

    // 2. Parse Input
    const { text, mode } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // 3. System Prompts
    let systemPrompt = "";
    if (mode === "learn") {
      systemPrompt = `You are SOLA, a calm Thai language coach. When the user asks how to say something, provide the Thai sentence, a simple romanization (lowercase, hyphenated syllables, no IPA), and short guidance on tone/pronunciation (max 1 sentence). Invite the user to repeat, then offer brief feedback.
      
      IMPORTANT: You must respond in valid JSON format with three keys: "thai", "romanized", "english".`;
    } else {
      // Default to "translate"
      systemPrompt = `You are SOLA, a calm and emotionally intelligent bilingual interpreter between Thai and English. Translate the user’s words naturally and politely into the opposite language, preserving emotion and tone. Prioritize everyday conversational meaning — respond as a friendly Thai person would in casual speech, not as a receptionist. Use ครับ/ค่ะ appropriately. If unclear, ask gently for repetition.

      IMPORTANT: You must respond in valid JSON format with three keys: "thai", "romanized", "english".`;
    }

    // 4. OpenAI Call with Retry Logic
    const start = Date.now();
    let parsedResponse;
    let attempts = 0;
    const MAX_RETRIES = 1;

    while (attempts <= MAX_RETRIES) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: text },
          ],
          response_format: { type: "json_object" }, // Enforce JSON
          temperature: 0.2, // Calm, consistent
        });

        const content = completion.choices[0].message.content;

        if (!content) throw new Error("No content from OpenAI");

        const parsed = JSON.parse(content);

        // Validate structure strictly
        if (!parsed.thai || !parsed.romanized || !parsed.english) {
          throw new Error("Malformed output structure");
        }

        parsedResponse = parsed;
        break; // Success

      } catch (e) {
        attempts++;
        if (attempts > MAX_RETRIES) {
          console.error("Max retries exceeded:", e);
          throw new Error("Failed to generate valid translation after retrying");
        }
        console.warn(`Attempt ${attempts} failed, retrying...`);
      }
    }

    const latency = Date.now() - start;

    // 5. Update Usage Cookie
    const nextCount = usageCount + 1;

    // Return structured JSON + metadata
    const response = NextResponse.json({
      ...parsedResponse,
      latency_ms: latency
    });

    // Set cookie for next request logic
    // Using simple client-side accessible cookie for now so frontend can also read if needed, 
    // but httpOnly is better for security. For MVP simplified:
    response.cookies.set("sola_usage", JSON.stringify({
      count: nextCount,
      date: new Date().toISOString().split('T')[0]
    }), {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}