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
							<h1 className="text-xl font-bold text-blue-600 group-hover:text-blue-800 transition-colors">
								InterviewAI
							</h1>
						</div>
					</Link>

					{/* Contact */}
					<div className="flex items-center gap-2 text-blue-600">
						<Mail className="w-4 h-4" />
						<a
							href="mailto:soumyaraj2003@gmail.com"
							className="hover:text-blue-800 transition-colors">
							Contact Me
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
