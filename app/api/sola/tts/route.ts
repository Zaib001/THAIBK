import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { text, lang } = body;

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        // Phase 3 Spec: "Support: lang: th, lang: en"
        // Validating presence and type if provided, defaulting to auto-detect/flexible if omitted isn't strictly forbidden
        // but let's encourage the standard. 
        // Note: OpenAI 'tts-1' with 'shimmer' handles both well, but we could switch voices based on lang in future.
        if (lang && !['th', 'en'].includes(lang)) {
            // Optional: warning or strict validation. Let's be permissive but acknowledge it.
        }

        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "shimmer", // Calm, warm tone
            input: text,
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());
        const base64Audio = buffer.toString("base64");

        // Return structured JSON as per Phase 3 contract
        return NextResponse.json({
            audio_base64: base64Audio
        });

    } catch (error: any) {
        console.error("TTS API Error:", error);
        return NextResponse.json(
            { error: "TTS failed", details: error.message },
            { status: 500 }
        );
    }
}
