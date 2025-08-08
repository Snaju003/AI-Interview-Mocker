"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, MessageSquare } from "lucide-react";
import { MockInterview } from "@/db/schema";
import { db } from "@/index";
import { desc, eq } from "drizzle-orm";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";

const RecentInterviews = () => {
	const { user } = useClerk();
	const [interviews, setInterviews] = useState<any[]>([]);

	useEffect(() => {
		if (user) {
			GetInterviewList();
		}
	}, [user]);

	const GetInterviewList = async () => {
		const result = await db
			.select()
			.from(MockInterview)
			.where(
				eq(
					MockInterview.createdBy,
					user?.primaryEmailAddress?.emailAddress || ""
				)
			)
			.orderBy(desc(MockInterview.createdAt));
		console.log("Fetched Interviews:", result);
		setInterviews(result);
	};

	return (
		<Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
			<CardHeader className="pb-4">
				<CardTitle className="text-lg sm:text-xl font-semibold text-slate-800 flex items-center gap-3">
					<div className="p-2 bg-purple-100 rounded-lg">
						<Clock className="w-5 h-5 text-purple-600" />
					</div>
					Recent Interviews
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{interviews.map((interview) => (
					<div
						key={interview.id}
						className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
						<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
							<div className="min-w-0">
								<h4 className="font-semibold text-slate-800 truncate">
									{interview.jobPosition}
								</h4>
								<p className="text-sm text-slate-600 line-clamp-2">
									{interview.jobDescription}
								</p>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
							<span className="text-xs text-slate-500">
								{new Date(
									interview.createdAt
								).toLocaleDateString()}
							</span>

							<div className="flex flex-wrap gap-2">
								<Link
									href={`/dashboard/interview/${interview.mockId}/start`}>
									<Button
										size="sm"
										className="h-8 w-full sm:w-auto">
										<Play className="w-3 h-3 mr-1" />
										Start
									</Button>
								</Link>
								<Link
									href={`/dashboard/interview/${interview.mockId}/feedback`}>
									<Button
										size="sm"
										variant="secondary"
										className="h-8 w-full sm:w-auto">
										<MessageSquare className="w-3 h-3 mr-1" />
										Feedback
									</Button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default RecentInterviews;
