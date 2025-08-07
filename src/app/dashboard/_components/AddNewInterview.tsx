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
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const AddNewInterview = () => {
	const [jobPosition, setJobPosition] = React.useState("");
	const [jobDescription, setJobDescription] = React.useState("");
	const [yearsOfExperience, setYearsOfExperience] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const { user } = useUser();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const inputPrompt = `You are an AI Interviewer. You will ask questions based on the job position, job description, and years of experience provided by the user. The user is applying for a ${jobPosition} position with ${yearsOfExperience} years of experience. The job description is: ${jobDescription}. Please generate ${
				process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5
			} interview questions along with answers in JSON format, Give Question and Answer as field in JSON`;

			console.log("Input Prompt:", inputPrompt);

			// Call the API endpoint
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
				console.log("Generated Interview Questions:", data.data);
				console.log("Saved to database with Mock ID:", data.mockId);

				// Handle success - maybe navigate to interview page or show success message
				router.push(`/dashboard/interview/${data.mockId}`);

				// Reset form and close dialog
				resetForm();
			} else {
				console.error(
					"Failed to generate or save interview:",
					data.error
				);
				if (data.rawContent) {
					console.log("Raw content:", data.rawContent);
					console.log("Cleaned content:", data.cleanedContent);
				}
				// Handle error - show toast or alert to user
			}
		} catch (error) {
			console.error("Error generating interview:", error);
			// Handle error (show toast, alert, etc.)
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
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<div className="flex items-center justify-center h-64 bg-gray-100 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
						<h2 className="font-bold text-xl">+ Add new</h2>
					</div>
				</DialogTrigger>
				<DialogContent className="w-[90vw] sm:max-w-md md:max-w-xl lg:max-w-2xl">
					<DialogHeader>
						<DialogTitle className="text-lg sm:text-xl">
							Tell us more about the interview you want to create.
						</DialogTitle>
						<DialogDescription>
							Add details about your Job Position/Role, Job
							Description and years of Experience.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-4 mt-4">
							<div className="space-y-1">
								<label className="font-semibold block">
									Job Position/Role:
								</label>
								<Input
									placeholder="Ex. Frontend Developer"
									required
									value={jobPosition}
									onChange={(e) =>
										setJobPosition(e.target.value)
									}
								/>
							</div>
							<div className="space-y-1">
								<label className="font-semibold block">
									Job Description:
								</label>
								<Textarea
									placeholder="Ex. Building a responsive web application"
									required
									value={jobDescription}
									onChange={(e) =>
										setJobDescription(e.target.value)
									}
								/>
							</div>
							<div className="space-y-1">
								<label className="font-semibold block">
									Years of Experience:
								</label>
								<Input
									placeholder="Ex. 3"
									type="number"
									required
									value={yearsOfExperience}
									onChange={(e) =>
										setYearsOfExperience(e.target.value)
									}
								/>
							</div>
						</div>

						<div className="mt-6 flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0">
							<DialogClose asChild>
								<Button
									type="button"
									variant="outline"
									className="w-full sm:w-auto"
									onClick={resetForm}>
									Cancel
								</Button>
							</DialogClose>
							<Button
								type="submit"
								className="w-full sm:w-auto"
								disabled={isLoading}>
								{isLoading
									? "Generating..."
									: "Start Interview"}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddNewInterview;
