import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";
import React from "react";

export const QuickTips = () => {
	return (
		<Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
			<CardContent className="p-6">
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 bg-blue-100 rounded-lg">
						<Target className="w-5 h-5 text-blue-600" />
					</div>
					<h3 className="font-semibold text-slate-800">Quick Tips</h3>
				</div>
				<ul className="space-y-3 text-sm text-slate-600">
					<li className="flex items-start gap-2">
						<div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
						<span>
							Be specific about your job role and requirements
						</span>
					</li>
					<li className="flex items-start gap-2">
						<div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
						<span>Include relevant technologies and skills</span>
					</li>
					<li className="flex items-start gap-2">
						<div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
						<span>Practice in a quiet environment</span>
					</li>
					<li className="flex items-start gap-2">
						<div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
						<span>Review your answers after each session</span>
					</li>
				</ul>
			</CardContent>
		</Card>
	);
};

export default QuickTips;
