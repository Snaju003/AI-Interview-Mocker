"use client";

import React, { useState, useRef, useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Video,
	VideoOff,
	Mic,
	MicOff,
	Play,
	Square,
	SkipForward,
	SkipBack,
	Camera,
	FileText,
	Copy,
	Trash2,
	Loader2,
	CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface RecordAnswerSectionProps {
	mockInterviewQuestions: { Question: string; Answer: string }[];
	activeQuestionIndex: number;
	interviewId: string;
	totalQuestions: number;
	onNext: () => void;
	onPrevious: () => void;
}

const RecordAnswerSectionClient = ({
	mockInterviewQuestions,
	activeQuestionIndex,
	interviewId,
	totalQuestions,
	onNext,
	onPrevious,
}: RecordAnswerSectionProps) => {
	const [webcamEnabled, setWebcamEnabled] = useState(true);
	const [micEnabled, setMicEnabled] = useState(true);
	const [fullTranscript, setFullTranscript] = useState("");
	const [isProcessingFeedback, setIsProcessingFeedback] = useState(false);
	const [hasRecordedAnswer, setHasRecordedAnswer] = useState(false);
	const [feedbackReceived, setFeedbackReceived] = useState(false);
	const [isEndingInterview, setIsEndingInterview] = useState(false);
	const webcamRef = useRef<Webcam>(null);
	const transcriptRef = useRef<HTMLDivElement>(null);
	const { user } = useClerk();
	const router = useRouter();

	const {
		error,
		interimResult,
		isRecording,
		results,
		startSpeechToText,
		stopSpeechToText,
	} = useSpeechToText({
		continuous: true,
		useLegacyResults: false,
	});

	// Reset states when question changes
	useEffect(() => {
		setHasRecordedAnswer(false);
		setFeedbackReceived(false);
		setIsProcessingFeedback(false);
		setIsEndingInterview(false);
	}, [activeQuestionIndex]);

	// Sync mic state with recording
	useEffect(() => {
		if (!micEnabled && isRecording) {
			stopSpeechToText();
		}
	}, [micEnabled]);

	// Toggle recording manually
	const handleRecordingToggle = async () => {
		if (isRecording) {
			stopSpeechToText();
			setHasRecordedAnswer(true);
			await handleFeedback();
		} else {
			startSpeechToText();
			setFeedbackReceived(false);
		}
	};

	if (error) {
		return (
			<Card className="shadow-lg border-0 bg-red-50">
				<CardContent className="pt-6">
					<div className="text-center text-red-600">
						<Mic className="w-12 h-12 mx-auto mb-4 opacity-50" />
						<p className="font-medium">Speech Recognition Error</p>
						<p className="text-sm mt-2">
							Web Speech API is not supported in this browser or
							microphone access was denied.
						</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	const handleFeedback = async () => {
		if (!interimResult) {
			toast.error("Please record an answer before requesting feedback.");
			return;
		}

		setIsProcessingFeedback(true);

		const prompt = `Question:"${mockInterviewQuestions[activeQuestionIndex].Question}" and User Answer:"${interimResult}". Depending on the question and user answer, provide feedback on the user's response on areas of improvement if any (in just 3-5 lines) along with a rating out of 10. Provide the feedback in JSON format with keys "feedback" and "rating".`;

		try {
			const res = await fetch("/api/feedback", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					prompt,
					question:
						mockInterviewQuestions[activeQuestionIndex].Question,
					correctAns:
						mockInterviewQuestions[activeQuestionIndex].Answer,
					answer: interimResult,
					mockIdRef: interviewId,
					userEmail: user?.primaryEmailAddress?.emailAddress || "",
				}),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Feedback error");

			console.log("✅ Feedback:", data);
			toast.success(
				"Feedback received! You can now proceed to the next question."
			);
			setFeedbackReceived(true);
		} catch (err) {
			console.error(err);
			toast.error("Failed to get feedback. Please try again.");
			setHasRecordedAnswer(false);
		} finally {
			setIsProcessingFeedback(false);
		}
	};

	const handleNextQuestion = async () => {
		if (!feedbackReceived && hasRecordedAnswer) {
			toast.error("Please wait for feedback before proceeding.");
			return;
		}

		// If this is the last question, end the interview
		if (activeQuestionIndex === totalQuestions - 1) {
			setIsEndingInterview(true);
			try {
				// Optional: Add any cleanup or final API calls here
				toast.success(
					"Interview completed! Redirecting to feedback..."
				);

				// Redirect to feedback page
				router.push(`/dashboard/interview/${interviewId}/feedback`);
			} catch (error) {
				console.error("Error ending interview:", error);
				toast.error("Error ending interview. Please try again.");
				setIsEndingInterview(false);
			}
		} else {
			onNext();
		}
	};

	const isNextDisabled =
		(hasRecordedAnswer && !feedbackReceived) ||
		isProcessingFeedback ||
		isEndingInterview;

	const isLastQuestion = activeQuestionIndex === totalQuestions - 1;

	return (
		<div className="space-y-6">
			{/* Camera Section */}
			<Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
				<CardHeader className="pb-4">
					<CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-3">
						<div className="p-2 bg-green-100 rounded-lg">
							<Camera className="w-5 h-5 text-green-600" />
						</div>
						Your Response
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="relative">
						<div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden">
							{webcamEnabled ? (
								<Webcam
									ref={webcamRef}
									mirrored={true}
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center bg-slate-800">
									<div className="text-center text-white">
										<VideoOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
										<p className="text-sm opacity-75">
											Camera is off
										</p>
									</div>
								</div>
							)}

							{/* Recording Indicator */}
							{isRecording && (
								<div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
									<div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
									Recording
								</div>
							)}

							{/* Processing Indicator */}
							{(isProcessingFeedback || isEndingInterview) && (
								<div className="absolute top-4 left-4 flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
									<Loader2 className="w-3 h-3 animate-spin" />
									{isEndingInterview
										? "Ending Interview..."
										: "Processing..."}
								</div>
							)}

							{/* Feedback Received Indicator */}
							{feedbackReceived &&
								!isProcessingFeedback &&
								!isEndingInterview && (
									<div className="absolute top-4 left-4 flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
										✓{" "}
										{isLastQuestion
											? "Ready to Complete!"
											: "Feedback Received"}
									</div>
								)}

							{/* Status Badge */}
							<div className="absolute top-4 right-4">
								<Badge
									variant={
										webcamEnabled ? "default" : "secondary"
									}>
									{webcamEnabled ? "Live" : "Off"}
								</Badge>
							</div>
						</div>

						{/* Camera/Mic Toggle */}
						<div className="flex items-center justify-center gap-4 mt-6">
							<Button
								variant={webcamEnabled ? "default" : "outline"}
								size="sm"
								onClick={() => setWebcamEnabled(!webcamEnabled)}
								className="flex items-center gap-2">
								{webcamEnabled ? (
									<Video className="w-4 h-4" />
								) : (
									<VideoOff className="w-4 h-4" />
								)}
								Camera
							</Button>

							<Button
								variant={micEnabled ? "default" : "outline"}
								size="sm"
								onClick={() => setMicEnabled(!micEnabled)}
								className="flex items-center gap-2">
								{micEnabled ? (
									<Mic className="w-4 h-4" />
								) : (
									<MicOff className="w-4 h-4" />
								)}
								Mic
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Recording Controls */}
			<Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
				<CardContent className="pt-6">
					<div className="text-center space-y-6">
						{/* Main Record Button */}
						<Button
							onClick={handleRecordingToggle}
							size="lg"
							disabled={
								!micEnabled ||
								isProcessingFeedback ||
								isEndingInterview
							}
							className={`
                w-20 h-20 rounded-full text-white font-semibold transition-all duration-200 transform hover:scale-105
                ${
					isRecording
						? "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200"
						: "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
				}
                ${
					!micEnabled || isProcessingFeedback || isEndingInterview
						? "opacity-50 cursor-not-allowed"
						: ""
				}
              `}>
							{isRecording ? (
								<Square className="w-8 h-8" />
							) : (
								<Play className="w-8 h-8 ml-1" />
							)}
						</Button>

						{/* Status Messages */}
						<div className="space-y-2">
							<p className="text-sm text-slate-600">
								{!micEnabled
									? "Enable microphone to start recording"
									: isEndingInterview
									? "Completing your interview and preparing feedback..."
									: isProcessingFeedback
									? "Processing your answer and generating feedback..."
									: isRecording
									? "Click to stop recording"
									: feedbackReceived
									? isLastQuestion
										? "Great job! Click 'Complete Interview' to see your feedback."
										: "Recording complete! You can proceed to the next question."
									: "Click to start recording your answer"}
							</p>

							{(isProcessingFeedback || isEndingInterview) && (
								<div className="flex items-center justify-center gap-2 text-blue-600">
									<Loader2 className="w-4 h-4 animate-spin" />
									<span className="text-sm font-medium">
										{isEndingInterview
											? "Finalizing interview..."
											: "Getting AI feedback..."}
									</span>
								</div>
							)}
						</div>

						{/* Navigation Buttons */}
						<div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-200">
							<Button
								variant="outline"
								onClick={onPrevious}
								disabled={activeQuestionIndex === 0}
								className="flex items-center gap-2">
								<SkipBack className="w-4 h-4" />
								Previous
							</Button>

							<div className="px-4 py-2 bg-slate-100 rounded-lg">
								<span className="text-sm font-medium text-slate-700">
									{activeQuestionIndex + 1} / {totalQuestions}
								</span>
							</div>

							<Button
								variant="outline"
								onClick={handleNextQuestion}
								disabled={isNextDisabled}
								className={`flex items-center gap-2 relative ${
									isLastQuestion &&
									feedbackReceived &&
									!isProcessingFeedback &&
									!isEndingInterview
										? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
										: ""
								}`}>
								{isEndingInterview ? (
									<>
										<Loader2 className="w-4 h-4 animate-spin" />
										Completing...
									</>
								) : isProcessingFeedback ? (
									<>
										<Loader2 className="w-4 h-4 animate-spin" />
										Processing...
									</>
								) : isLastQuestion ? (
									<>
										Complete Interview
										<CheckCircle className="w-4 h-4" />
									</>
								) : (
									<>
										Next
										<SkipForward className="w-4 h-4" />
									</>
								)}
							</Button>
						</div>

						{/* Helper text for disabled next button */}
						{isNextDisabled && !isLastQuestion && (
							<p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
								{isEndingInterview
									? "Completing your interview and preparing results..."
									: isProcessingFeedback
									? "Please wait while we process your answer..."
									: hasRecordedAnswer && !feedbackReceived
									? "Waiting for AI feedback before proceeding to next question"
									: "Record your answer to proceed"}
							</p>
						)}

						{/* Last question completion message */}
						{isLastQuestion &&
							feedbackReceived &&
							!isProcessingFeedback &&
							!isEndingInterview && (
								<p className="text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
									🎉 Congratulations! You've completed all
									questions. Click "Complete Interview" to
									view your detailed feedback.
								</p>
							)}
					</div>
				</CardContent>
			</Card>

			{/* Progress Bar */}
			<Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
				<CardContent className="pt-6">
					<div className="space-y-3">
						<div className="flex justify-between text-sm text-slate-600">
							<span>Progress</span>
							<span>
								{Math.round(
									((activeQuestionIndex + 1) /
										totalQuestions) *
										100
								)}
								%
							</span>
						</div>
						<div className="w-full bg-slate-200 rounded-full h-2">
							<div
								className="bg-blue-600 h-2 rounded-full transition-all duration-300"
								style={{
									width: `${
										((activeQuestionIndex + 1) /
											totalQuestions) *
										100
									}%`,
								}}></div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default RecordAnswerSectionClient;
