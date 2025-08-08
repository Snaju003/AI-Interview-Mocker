// src/app/api/feedback/route.ts
import { db } from "@/index"; // adjust if needed
import { InterviewAnswer } from "@/db/schema";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, question, correctAns, answer, mockIdRef, userEmail } = await request.json();

    if (!prompt || !question || !correctAns || !answer || !mockIdRef || !userEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
    });

    const result = await ai.models.generateContentStream({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let rawText = "";
    for await (const chunk of result) {
      rawText += chunk.text ?? "";
    }

    // 🧹 Clean and parse JSON
    const cleaned = rawText
      .replace(/```(json)?/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse Gemini response as JSON:", cleaned);
      return NextResponse.json({ error: "Invalid response from Gemini" }, { status: 500 });
    }

    const { feedback, rating } = parsed;

    if (!feedback || !rating) {
      return NextResponse.json({ error: "Missing feedback or rating in Gemini response" }, { status: 500 });
    }

    // ✅ Save to DB
    await db.insert(InterviewAnswer).values({
      question,
      correctAns,
      answer,
      feedback,
      rating,
      mockIdRef,
      userEmail,
    });

    return NextResponse.json({ success: true, feedback, rating });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
