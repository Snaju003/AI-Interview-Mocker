// src/app/api/interviews/[mockId]/route.ts

import { db } from "@/index";
import { MockInterview } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    mockId: string;
  };
}

export async function GET(_: NextRequest, { params }: Params) {
  try {
    const { mockId } = params;

    if (!mockId) {
      return NextResponse.json({ error: "mockId is required" }, { status: 400 });
    }

    const interview = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, mockId))
      .limit(1);

    if (interview.length === 0) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }

    const record = interview[0];

    return NextResponse.json({
      success: true,
      interview: {
        ...record,
        jsonMockResponse: JSON.parse(record.jsonMockResponse), // Convert JSON string to object
      },
    });
  } catch (error) {
    console.error("Error fetching interview by mockId:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
