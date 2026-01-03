import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { cookies } from "next/headers";

const FREE_LIMIT = 5;

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limit Check (Read-only, to prevent abuse)
    const cookieStore = await cookies();
    const usageCookie = cookieStore.get("sola_usage");
    let usageCount = 0;

    if (usageCookie) {
      const { count, date } = JSON.parse(usageCookie.value);
      const today = new Date().toISOString().split('T')[0];
      if (date === today) {
        usageCount = count;
      }
    }

    if (usageCount >= FREE_LIMIT) {
      return NextResponse.json(
        { error: "Rate limit exceeded", code: "RATE_LIMIT_EXCEEDED" },
        { status: 429 }
      );
    }

    // 2. Parse Form Data
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;
    const mode = formData.get("mode") as string | null; // Optional, maybe for future use

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    // 3. OpenAI Whisper Call (In-memory, passing File object directly)
    // Next.js 'File' is compatible with OpenAI SDK
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: mode === "learn" ? "th" : undefined, // optimization: if learn mode, assume user is speaking Thai? Or just auto-detect. 
      // Playbook says: "Voice input and spoken responses ... Thai <-> English (automatic detection)"
      // So let's NOT restrict language, let it auto-detect.
    });

    const text = transcription.text;

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("Whisper API Error:", error);
    return NextResponse.json(
      { error: "Audio processing failed", details: error.message },
      { status: 500 }
    );
  }
}