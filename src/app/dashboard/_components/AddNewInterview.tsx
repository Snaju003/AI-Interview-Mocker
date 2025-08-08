"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import {
	Plus,
	Briefcase,
	FileText,
	Clock,
	Sparkles,
	Loader2,
	Lock,
} from "lucide-react";

const AddNewInterview = () => {
	const [jobPosition, setJobPosition] = React.useState("");
	const [jobDescription, setJobDescription] = React.useState("");
	const [yearsOfExperience, setYearsOfExperience] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);
	const { user } = useUser();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const inputPrompt = `You are an AI Interviewer. You will ask questions based on the job position, job description, and years of experience provided by the user. The user is applying for a ${jobPosition} position with ${yearsOfExperience} years of experience. The job description is: ${jobDescription}. Please generate ${
				process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5
			} interview questions along with answers in JSON format, Give Question and Answer as field in JSON`;

			const response = await fetch("/api/generate-interview", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: inputPrompt,
					jobPosition: jobPosition,
					jobDescription: jobDescription,
					createdBy: user?.primaryEmailAddress?.emailAddress || "",
					yearsOfExperience: yearsOfExperience,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to generate interview questions");
			}

			const data = await response.json();
			if (data.success) {
				router.push(`/dashboard/interview/${data.mockId}`);
				resetForm();
				setIsOpen(false);
			} else {
				console.error(
					"Failed to generate or save interview:",
					data.error
				);
			}
		} catch (error) {
			console.error("Error generating interview:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const resetForm = () => {
		setJobPosition("");
		setJobDescription("");
		setYearsOfExperience("");
	};

	return (
		<>
			<SignedIn>
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-dashed border-blue-200 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100">
							<CardContent className="flex h-64 flex-col items-center justify-center p-6 text-center">
								<div className="mb-4 rounded-full bg-blue-100 p-4 transition-colors group-hover:bg-blue-200">
									<Plus className="h-8 w-8 text-blue-600" />
								</div>
								<h3 className="mb-2 text-xl font-bold text-slate-800">
									Create New Interview
								</h3>
								<p className="text-sm text-slate-600">
									Generate AI-powered questions tailored to
									your role
								</p>
								<Badge variant="secondary" className="mt-3">
									<Sparkles className="mr-1 h-3 w-3" />
									AI Powered
								</Badge>
							</CardContent>
						</Card>
					</DialogTrigger>
					<DialogContent className="max-h-[90vh] w-[95vw] max-w-2xl overflow-y-auto">
						<DialogHeader className="space-y-3">
							<DialogTitle className="flex items-center gap-3 text-2xl font-bold text-slate-800">
								<div className="rounded-lg bg-blue-100 p-2">
									<Briefcase className="h-6 w-6 text-blue-600" />
								</div>
								Create Your Interview
							</DialogTitle>
							<DialogDescription className="text-base text-slate-600">
								Provide details about the position you're
								preparing for, and our AI will generate
								personalized interview questions.
							</DialogDescription>
						</DialogHeader>

						<form
							onSubmit={handleSubmit}
							className="mt-6 space-y-6">
							{/* Job Position */}
							<div className="space-y-3">
								<label className="flex items-center gap-2 font-semibold text-slate-700">
									<Briefcase className="h-4 w-4 text-blue-600" />
									Job Position/Role
								</label>
								<Input
									placeholder="e.g., Senior Frontend Developer, Product Manager, Data Scientist"
									required
									value={jobPosition}
									onChange={(e) =>
										setJobPosition(e.target.value)
									}
									className="h-12 text-base"
								/>
							</div>

							{/* Job Description */}
							<div className="space-y-3">
								<label className="flex items-center gap-2 font-semibold text-slate-700">
									<FileText className="h-4 w-4 text-blue-600" />
									Job Description
								</label>
								<Textarea
									placeholder="Describe the role, responsibilities, required skills, and technologies. Be as detailed as possible for better question generation."
									required
									value={jobDescription}
									onChange={(e) =>
										setJobDescription(e.target.value)
									}
									className="min-h-32 resize-none text-base"
								/>
								<p className="text-xs text-slate-500">
									Tip: Include specific technologies,
									frameworks, and key responsibilities
								</p>
							</div>

							{/* Years of Experience */}
							<div className="space-y-3">
								<label className="flex items-center gap-2 font-semibold text-slate-700">
									<Clock className="h-4 w-4 text-blue-600" />
									Years of Experience
								</label>
								<Input
									placeholder="e.g., 3"
									type="number"
									min="0"
									max="50"
									required
									value={yearsOfExperience}
									onChange={(e) =>
										setYearsOfExperience(e.target.value)
									}
									className="h-12 text-base"
								/>
							</div>

							{/* Info Card */}
							<div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
								<div className="flex items-start gap-3">
									<Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
									<div>
										<h4 className="mb-1 font-semibold text-amber-800">
											AI Interview Generation
										</h4>
										<p className="text-sm text-amber-700">
											Our AI will analyze your input and
											generate{" "}
											{process.env
												.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT ||
												5}{" "}
											tailored interview questions with
											sample answers to help you prepare
											effectively.
										</p>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col gap-3 pt-4 sm:flex-row">
								<DialogClose asChild>
									<Button
										type="button"
										variant="outline"
										className="h-12 flex-1"
										onClick={resetForm}
										disabled={isLoading}>
										Cancel
									</Button>
								</DialogClose>
								<Button
									type="submit"
									className="h-12 flex-1 bg-blue-600 hover:bg-blue-700"
									disabled={isLoading}>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Generating Questions...
										</>
									) : (
										<>
											<Sparkles className="mr-2 h-4 w-4" />
											Generate Interview
										</>
									)}
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</SignedIn>

			{/* Improved SignedOut UI */}
			<SignedOut>
				<Card className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-slate-50 to-slate-100">
					<CardContent className="flex h-64 flex-col items-center justify-center p-6 text-center">
						<div className="mb-4 rounded-full bg-slate-200 p-4">
							<Lock className="h-8 w-8 text-slate-600" />
						</div>
						<h3 className="mb-2 text-xl font-bold text-slate-800">
							Sign in to create interviews
						</h3>
						<p className="max-w-md text-sm text-slate-600">
							Save your progress, revisit past sessions, and get
							AI‑powered questions tailored to your role.
						</p>

						<div className="mt-3 flex flex-wrap items-center justify-center gap-2">
							<Badge variant="secondary">AI powered</Badge>
							<Badge variant="secondary">Save history</Badge>
							<Badge variant="secondary">Personalized</Badge>
						</div>

						<SignInButton mode="modal">
							<Button className="mt-4 h-10 bg-blue-600 hover:bg-blue-700">
								<Sparkles className="mr-2 h-4 w-4" />
								Sign in to get started
							</Button>
						</SignInButton>

						<p className="mt-2 text-xs text-slate-500">
							It takes just a moment. You can use email to
							continue.
						</p>
					</CardContent>
				</Card>
			</SignedOut>
		</>
	);
};

export default AddNewInterview;
