import { Lightbulb, MessageCircle } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Question {
	Question: string;
	Answer: string;
}

interface QuestionSectionProps {
	mockInterviewQuestions: Question[];
	activeQuestionIndex: number;
	onQuestionChange: (index: number) => void;
}

const QuestionSection = ({
	mockInterviewQuestions,
	activeQuestionIndex,
	onQuestionChange,
}: QuestionSectionProps) => {
	return (
		<div className="space-y-6">
			{/* Question Navigation */}
			<Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
				<CardHeader className="pb-4">
					<CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-3">
						<div className="p-2 bg-blue-100 rounded-lg">
							<MessageCircle className="w-5 h-5 text-blue-600" />
						</div>
						Question Navigation
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
						{mockInterviewQuestions?.map((q, index) => (
							<button
								key={index}
								onClick={() => onQuestionChange(index)}
								className={`
                                    relative rounded-lg p-3 text-sm font-medium text-center cursor-pointer 
                                    transition-all duration-200 transform hover:scale-105
                                    ${
										activeQuestionIndex === index
											? "bg-blue-600 text-white shadow-lg scale-105"
											: "bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700"
									}
                                `}>
								<span className="block text-xs opacity-75 mb-1">
									Q
								</span>
								<span className="block font-bold">
									{index + 1}
								</span>
								{activeQuestionIndex === index && (
									<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
								)}
							</button>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Current Question */}
			<Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
				<CardHeader className="pb-4">
					<div className="flex items-center justify-between">
						<CardTitle className="text-xl font-semibold text-slate-800">
							Question {activeQuestionIndex + 1}
						</CardTitle>
						<Badge variant="secondary">
							{activeQuestionIndex + 1} of{" "}
							{mockInterviewQuestions.length}
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="bg-slate-50 p-6 rounded-xl border-l-4 border-blue-500">
						<p className="text-lg leading-relaxed text-slate-800 font-medium">
							{mockInterviewQuestions[activeQuestionIndex]
								?.Question || "Loading question..."}
						</p>
					</div>

					{/* Tips Section */}
					<div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
						<div className="flex items-start gap-3">
							<div className="p-1 bg-amber-100 rounded-lg flex-shrink-0">
								<Lightbulb className="w-5 h-5 text-amber-600" />
							</div>
							<div>
								<h3 className="font-semibold text-amber-800 mb-2">
									💡 Interview Tips
								</h3>
								<ul className="text-sm text-amber-700 space-y-1">
									<li>
										• Take your time to think before
										answering
									</li>
									<li>
										• Use the STAR method (Situation, Task,
										Action, Result)
									</li>
									<li>
										• Provide specific examples from your
										experience
									</li>
									<li>
										• Speak clearly and maintain eye contact
										with the camera
									</li>
								</ul>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default QuestionSection;
