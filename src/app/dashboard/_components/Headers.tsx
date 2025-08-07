"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Headers = () => {
  const path = usePathname();
  useEffect(() => {}, [path]);
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <Image src={"./logo.svg"} height={160} width={100} alt="logo" />
      <ul className="hidden md:flex space-x-6">
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard" && "text-primary font-bold"
          }`}>
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/questions" && "text-primary font-bold"
          }`}>
          Questions
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/upgrade" && "text-primary font-bold"
          }`}>
          Upgrade
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/how-it-works" && "text-primary font-bold"
          }`}>
          How it works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Headers;
