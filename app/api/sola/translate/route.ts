import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { text } = await req.json();

  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Translate between Thai ↔ English naturally and accurately.",
      },
      { role: "user", content: text },
    ],
  });

  return NextResponse.json({
    translated: result.choices[0].message.content,
  });
}
