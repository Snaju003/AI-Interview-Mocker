// src/app/api/generate-interview/route.ts
import { MockInterview } from "@/db/schema";
import { db } from "@/index";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const {
      prompt,
      jobPosition,
      jobDescription,
      yearsOfExperience,
      createdBy,
    } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
    });

    const config = {
      thinkingConfig: {
        thinkingBudget: 0,
      },
    };

    const model = "gemini-2.5-flash";

    const contents = [
      {
        role: "user" as const,
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullResponse = "";

    for await (const chunk of response) {
      if (chunk.text) {
        fullResponse += chunk.text;
      }
    }

    const cleanedResponse = fullResponse
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsedData: any = null;
    let dbResponse = null;

    try {
      const parsedJSON = JSON.parse(cleanedResponse);

      parsedData = parsedJSON.data || parsedJSON; // Use `data` if exists, else the root

      const mockId = uuidv4();
      dbResponse = await db
        .insert(MockInterview)
        .values({
          jsonMockResponse: JSON.stringify(parsedData),
          jobPosition,
          jobDescription,
          yearsOfExperience,
          createdAt: new Date(),
          mockId,
          createdBy,
        })
        .returning({
          mockId: MockInterview.mockId,
          id: MockInterview.id,
        });
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      console.error("Cleaned response:", cleanedResponse);

      // Return raw response on failure
      return NextResponse.json(
        {
          success: false,
          rawContent: cleanedResponse,
          error: "Failed to parse Gemini response as valid JSON.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
      mockId: dbResponse?.[0]?.mockId,
      dbId: dbResponse?.[0]?.id,
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate interview questions" },
      { status: 500 }
    );
  }
}
