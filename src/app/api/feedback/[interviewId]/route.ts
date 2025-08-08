import { InterviewAnswer } from "@/db/schema";
import { db } from "@/index";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { interviewId: string } }
) {
	try {
		const { interviewId } = params;

		if (!interviewId) {
			return NextResponse.json(
				{ error: "Interview ID is required" },
				{ status: 400 }
			);
		}

		const feedbackData = await db
			.select({
				question: InterviewAnswer.question,
				answer: InterviewAnswer.answer,
				feedback: InterviewAnswer.feedback,
				rating: InterviewAnswer.rating,
				createdAt: InterviewAnswer.createdAt,
			})
			.from(InterviewAnswer)
			.where(eq(InterviewAnswer.mockIdRef, interviewId));

		if (!feedbackData.length) {
			return NextResponse.json(
				{ message: "No feedback found for this interview ID" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ feedback: feedbackData });
	} catch (error) {
		console.error("Error fetching feedback:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
