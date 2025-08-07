"use client";
import { useParams } from "next/navigation";
import Webcam from "react-webcam";
import React from "react";
import { WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Interview = () => {
	const [webcamEnabled, setWebcamEnabled] = React.useState(false);
	const params = useParams();
	const interviewId = params.InterviewId;

	React.useEffect(() => {
		// You can fetch interview details here using interviewId
		console.log("Interview ID:", interviewId);
		fetchInterviewDetails();
	}, [interviewId]);

	const fetchInterviewDetails = async () => {
		try {
			const response = await fetch(`/api/interviews/${interviewId}`);
			if (!response.ok) {
				throw new Error("Failed to fetch interview details");
			}
			const data = await response.json();
			console.log("Interview Details:", data);
		} catch (error) {
			console.error("Error fetching interview details:", error);
		}
	};

	return (
		<div className="my-10 flex justify-center items-center flex-col">
			<h2 className="text-2xl font-bold ">Let's discuss the interview</h2>
			<div>
				{webcamEnabled ? (
					<Webcam
						onUserMedia={() => setWebcamEnabled(true)}
						onUserMediaError={() => setWebcamEnabled(false)}
						mirrored={true}
						style={{ width: "100%", height: "100%" }}
					/>
				) : (
					<>
						<WebcamIcon className="w-72 h-full my-7 p-20 bg-secondary rounded-xl border border-dashed border-gray-300" />
						<Button onClick={() => setWebcamEnabled(true)}>
							Enable WebCam and Microphone
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default Interview;
