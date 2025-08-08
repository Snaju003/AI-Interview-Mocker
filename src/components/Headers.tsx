"use client";

import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Menu, X, Home, HelpCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
	const path = usePathname();
	const { isSignedIn } = useUser(); // Clerk auth state
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navigationItems = [
		{ name: "Dashboard", path: "/dashboard", icon: Home },
		{ name: "Upgrade", path: "/upgrade", icon: Zap },
		{ name: "How it works?", path: "/how-it-works", icon: HelpCircle },
	];

	const isActivePath = (itemPath: string) => {
		if (itemPath === "/dashboard") {
			return path === "/dashboard" || path.startsWith("/dashboard");
		}
		return path === itemPath;
	};

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${
			isScrolled
				? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20"
				: "bg-white/95 backdrop-blur-sm"
		}`}>
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16 lg:h-20">
						{/* Logo */}
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
								<h1 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
									InterviewAI
								</h1>
							</div>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center space-x-1">
							{navigationItems.map((item) => {
								const Icon = item.icon;
								const isActive = isActivePath(item.path);
								return (
									<Link key={item.path} href={item.path}>
										<div
											className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm
                        transition-all duration-200 hover:bg-blue-50 hover:text-blue-600
                        ${
							isActive
								? "bg-blue-100 text-blue-600 shadow-sm"
								: "text-slate-600"
						}`}>
											<Icon className="w-4 h-4" />
											<span>{item.name}</span>
										</div>
									</Link>
								);
							})}
						</nav>

						{/* Right Side - Auth / Menu */}
						<div className="flex items-center space-x-4">
							{isSignedIn ? (
								<UserButton
									appearance={{
										elements: {
											avatarBox:
												"w-10 h-10 ring-2 ring-blue-100 hover:ring-blue-200 transition-all",
										},
									}}
								/>
							) : (
								<SignInButton mode="modal">
									<Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
										Sign in / Sign up
									</Button>
								</SignInButton>
							)}

							{/* Mobile Menu Button */}
							<Button
								variant="ghost"
								size="sm"
								className="lg:hidden p-2"
								onClick={() =>
									setIsMobileMenuOpen(!isMobileMenuOpen)
								}>
								{isMobileMenuOpen ? (
									<X className="w-5 h-5" />
								) : (
									<Menu className="w-5 h-5" />
								)}
							</Button>
						</div>
					</div>
				</div>

				{/* Mobile Navigation */}
				<div
					className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-slate-200
            ${
				isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
			}`}>
					<div className="bg-white/95 backdrop-blur-sm">
						<nav className="container mx-auto px-4 py-4">
							<div className="space-y-2">
								{navigationItems.map((item) => {
									const Icon = item.icon;
									const isActive = isActivePath(item.path);
									return (
										<Link
											key={item.path}
											href={item.path}
											onClick={() =>
												setIsMobileMenuOpen(false)
											}>
											<div
												className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium
                          transition-all duration-200 hover:bg-blue-50 hover:text-blue-600
                          ${
								isActive
									? "bg-blue-100 text-blue-600 shadow-sm"
									: "text-slate-600"
							}`}>
												<Icon className="w-5 h-5" />
												<span>{item.name}</span>
											</div>
										</Link>
									);
								})}

								{!isSignedIn && (
									<SignInButton mode="modal">
										<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
											Sign in / Sign up
										</Button>
									</SignInButton>
								)}
							</div>
						</nav>
					</div>
				</div>
			</header>

			<div className="h-16 lg:h-20" />
		</>
	);
};

export default Header;
