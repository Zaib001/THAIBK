import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

const FREE_LIMIT = 5;

export async function POST(req: NextRequest) {
    console.log("[SPEECH_API] Request received");
    try {
        // 1. Rate Limit Check
        const cookieStore = await cookies();
        const usageCookie = cookieStore.get("sola_usage");
        let usageCount = 0;

        if (usageCookie) {
            try {
                const { count, date } = JSON.parse(usageCookie.value);
                const today = new Date().toISOString().split('T')[0];
                if (date === today) {
                    usageCount = count;
                }
            } catch (e) {
                console.warn("[SPEECH_API] Malformed usage cookie:", e);
            }
        }
        console.log("[SPEECH_API] Usage count:", usageCount);

        if (usageCount >= FREE_LIMIT) {
            return NextResponse.json(
                { error: "Rate limit exceeded", code: "RATE_LIMIT_EXCEEDED" },
                { status: 429 }
            );
        }

        // 2. Parse Input
        const body = await req.json();
        const { audio_base64 } = body;

        if (!audio_base64) {
            console.error("[SPEECH_API] Missing audio_base64");
            return NextResponse.json({ error: "audio_base64 is required" }, { status: 400 });
        }

        // 3. Convert Base64 -> File
        console.log("[SPEECH_API] Converting base64 to File...");
        const buffer = Buffer.from(audio_base64, 'base64');
        const blob = new Blob([buffer], { type: 'audio/webm' });
        const audioFile = new File([blob], 'speech.webm', { type: 'audio/webm' });

        // 4. OpenAI Whisper Call
        console.log("[SPEECH_API] Calling OpenAI Whisper...");
        const transcription = await openai.audio.transcriptions.create({
            file: audioFile,
            model: "whisper-1",
        });

        const text = transcription.text;
        console.log("[SPEECH_API] Transcription success:", text.substring(0, 20) + "...");

        return NextResponse.json({ text });

    } catch (error: any) {
        console.error("[SPEECH_API] Fatal Error:", error);

        return NextResponse.json(
            {
                error: "Audio processing failed",
                details: error.message,
                code: "SPEECH_API_ERROR"
            },
            { status: 500 }
        );
    }
}
