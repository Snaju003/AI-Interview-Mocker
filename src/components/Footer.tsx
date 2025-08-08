import React from "react";
import Link from "next/link";
import {
	Mail,
	Twitter,
	Linkedin,
	Github,
	Youtube,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
	return (
		<footer className="bg-white text-blue-600">
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					{/* Logo and Brand */}
					<Link
						href="/"
						className="flex items-center space-x-3 group">
						<div className="relative">
							<Image
								src="/logo.svg"
								height={40}
								width={40}
								alt="logo"
								className="transition-transform duration-200 group-hover:scale-105"
							/>
						</div>
						<div className="hidden sm:block">
							<h1 className="text-xl font-bold text-black group-hover:text-blue-600 transition-colors">
								InterviewAI
							</h1>
						</div>
					</Link>

					{/* Contact */}
					<div className="flex items-center gap-3 text-gray-700 bg-gray-50 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 group">
						<Mail className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors" />
						<a
							href="mailto:soumyaraj2003@gmail.com"
							className="font-medium hover:text-blue-600 transition-colors duration-200">
							Contact Me
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
