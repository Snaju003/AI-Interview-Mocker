import { db } from "@/index";

export async function GET(
  request: Request,
  { params }: { params: { interviewId: string } }
) {
  try {
    // Query your database to get answered questions for this interview
    const answeredQuestions = await db.select({
      questionIndex: userAnswers.questionIndex
    })
    .from(userAnswers)
    .where(eq(userAnswers.mockIdRef, params.interviewId))
    .groupBy(userAnswers.questionIndex);

    // Extract just the indices
    const questionIndices = answeredQuestions.map(q => q.questionIndex);

    return NextResponse.json({ 
      answeredQuestions: questionIndices 
    });

  } catch (error) {
    console.error('Error fetching answered questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch answered questions' },
      { status: 500 }
    );
  }
}