"use client";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import { Sparkles } from "lucide-react";
import RecentInterviews from "./_components/RecentInterviews";
import QuickTips from "./_components/QuickTips";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Create and practice AI-powered mock interviews to ace your next job opportunity
          </p>
        </div>

        {/* Create New Interview Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Create New Interview
                  </h2>
                  <p className="text-slate-600">
                    Start practicing with AI-generated questions
                  </p>
                </div>
              </div>

              <div className={`grid grid-cols-1 ${isSignedIn ? "md:grid-cols-2" : "md:grid-cols-1"} gap-6`}>
                <AddNewInterview />
                <QuickTips />
              </div>

              {/* Show recent interviews only if signed in */}
              {isSignedIn && (
                <div className="pt-5">
                  <RecentInterviews />
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
