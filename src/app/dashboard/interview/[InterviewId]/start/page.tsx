"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageSquare } from "lucide-react";
import dynamic from "next/dynamic";

const RecordAnswerSection = dynamic(
  () => import('./_components/RecordAnswerSection'),
  { ssr: false }
);

const Start = () => {
	const params = useParams();
	const interviewId = params.InterviewId as string;
	const [data, setData] = useState<any>();
	const [mockInterviewQuestions, setMockInterviewQuestions] = useState<any[]>(
		[]
	);
	const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchInterviewDetails();
	}, []);

	const fetchInterviewDetails = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(`/api/interviews/${interviewId}`);
			if (!response.ok)
				throw new Error("Failed to fetch interview details");
			const data = await response.json();
			setData(data);
			console.log("Interview Details:", data);
		} catch (error) {
			console.error("Error fetching interview details:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (data?.interview?.jsonMockResponse) {
			setMockInterviewQuestions(data.interview.jsonMockResponse);
		}
	}, [data]);

	const handleQuestionChange = (index: number) => {
		setActiveQuestionIndex(index);
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
				<div className="text-center space-y-4">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="text-slate-600">
						Loading interview questions...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<div className="container mx-auto px-4 py-6 lg:py-8">
				{/* Header */}
				<div className="mb-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
								Interview in Progress
							</h1>
							<p className="text-slate-600">
								{data?.interview?.jobPosition} • Question{" "}
								{activeQuestionIndex + 1} of{" "}
								{mockInterviewQuestions.length}
							</p>
						</div>
						<div className="flex items-center gap-4">
							<Badge
								variant="secondary"
								className="flex items-center gap-2">
								<MessageSquare className="w-4 h-4" />
								{mockInterviewQuestions.length} Questions
							</Badge>
							<Badge
								variant="outline"
								className="flex items-center gap-2">
								<Clock className="w-4 h-4" />
								~30 min
							</Badge>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
					{/* Question Section - Takes 2 columns on xl screens */}
					<div className="xl:col-span-2">
						<QuestionSection
							mockInterviewQuestions={mockInterviewQuestions}
							activeQuestionIndex={activeQuestionIndex}
							onQuestionChange={handleQuestionChange}
						/>
					</div>

					{/* Record Answer Section - Takes 1 column on xl screens */}
					<div className="xl:col-span-1">
						<RecordAnswerSection
							mockInterviewQuestions={mockInterviewQuestions}
							activeQuestionIndex={activeQuestionIndex}
							interviewId={interviewId}
							totalQuestions={mockInterviewQuestions.length}
							onNext={() => {
								if (
									activeQuestionIndex <
									mockInterviewQuestions.length - 1
								) {
									setActiveQuestionIndex(
										activeQuestionIndex + 1
									);
								}
							}}
							onPrevious={() => {
								if (activeQuestionIndex > 0) {
									setActiveQuestionIndex(
										activeQuestionIndex - 1
									);
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Start;
