import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

const FREE_LIMIT = 5;
const PREMIUM_LIMIT = 100;

export async function POST(req: NextRequest) {
  try {
    // 1. Authentication & Usage Tracking
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    let usageCount = 0;
    let isPremium = false;

    const client = await clientPromise;
    const db = client.db();

    if (userId) {
      // Authenticated User: Check DB
      const user = await db.collection("users").findOne(
        { _id: new ObjectId(userId) },
        { projection: { usageCount: true, isPremium: true } }
      );
      usageCount = user?.usageCount || 0;
      isPremium = user?.isPremium || false;
    } else {
      // Guest User: Fallback to Cookie
      const cookieStore = await cookies();
      const usageCookie = cookieStore.get("sola_usage");
      if (usageCookie) {
        try {
          const { count, date } = JSON.parse(usageCookie.value);
          const today = new Date().toISOString().split('T')[0];
          if (date === today) {
            usageCount = count;
          }
        } catch (e) {
          console.error("Cookie parse error:", e);
        }
      }
    }

    // 2. Limit Check
    const currentLimit = isPremium ? PREMIUM_LIMIT : FREE_LIMIT;

    if (usageCount >= currentLimit) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          code: "RATE_LIMIT_EXCEEDED",
          message: isPremium
            ? "Premium limit reached (100 translations). Please contact support for more."
            : "Free limit reached. Upgrade to THAIBK+ for 100 translations!"
        },
        { status: 429 }
      );
    }

    // 3. Parse Input
    const { text, mode } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // 4. System Prompts
    let systemPrompt = "";
    if (mode === "learn") {
      systemPrompt = `You are SOLA, a calm Thai language coach. When the user asks how to say something, provide the Thai sentence, a simple romanization (lowercase, hyphenated syllables, no IPA), and short guidance on tone/pronunciation (max 1 sentence). Invite the user to repeat, then offer brief feedback.
      
      IMPORTANT: You must respond in valid JSON format with three keys: "thai", "romanized", "english".`;
    } else {
      systemPrompt = `You are SOLA, a calm and emotionally intelligent bilingual interpreter between Thai and English. Translate the user’s words naturally and politely into the opposite language, preserving emotion and tone. Prioritize everyday conversational meaning — respond as a friendly Thai person would in casual speech, not as a receptionist. Use ครับ/ค่ะ appropriately. If unclear, ask gently for repetition.
 
      IMPORTANT: You must respond in valid JSON format with three keys: "thai", "romanized", "english".`;
    }

    // 5. OpenAI Call
    const start = Date.now();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("No content from OpenAI");
    const parsedResponse = JSON.parse(content);

    const latency = Date.now() - start;

    // 6. Update Usage
    const nextCount = usageCount + 1;

    if (userId) {
      // Save to DB for signed-in users
      await db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: { usageCount: nextCount, updatedAt: new Date() }
        }
      );
    }

    const response = NextResponse.json({
      ...parsedResponse,
      latency_ms: latency,
      usageCount: nextCount,
      limit: currentLimit,
      isPremium
    });

    // Also update cookie for guests/redundancy
    const today = new Date().toISOString().split('T')[0];
    response.cookies.set("sola_usage", JSON.stringify({
      count: nextCount,
      date: today
    }), {
      path: "/",
      maxAge: 60 * 60 * 24,
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
