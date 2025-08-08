"use client";

import { useParams } from "next/navigation";
import Webcam from "react-webcam";
import React, { useState, useEffect } from "react";
import { WebcamIcon, Briefcase, FileText, Clock, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const Interview = () => {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [data, setData] = useState<any>();
  const params = useParams();
  const interviewId = params.InterviewId;

  useEffect(() => {
    // console.log("Interview ID:", interviewId);
    fetchInterviewDetails();
  }, [interviewId]);

  const fetchInterviewDetails = async () => {
    try {
      const response = await fetch(`/api/interviews/${interviewId}`);
      if (!response.ok)
        throw new Error("Failed to fetch interview details");
      const data = await response.json();
      setData(data);
      console.log("Interview Details:", data);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Interview Preparation
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Review your interview details and ensure your camera and microphone are working properly
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Interview Details Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  Interview Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <Badge variant="secondary" className="w-fit">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Position
                    </Badge>
                    <p className="text-lg font-medium text-slate-700">
                      {data?.interview?.jobPosition || "Loading..."}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Badge variant="secondary" className="w-fit">
                      <FileText className="w-4 h-4 mr-2" />
                      Description
                    </Badge>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg">
                      {data?.interview?.jobDescription || "Loading..."}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <Badge variant="secondary" className="w-fit">
                      <Clock className="w-4 h-4 mr-2" />
                      Experience
                    </Badge>
                    <p className="text-lg font-medium text-slate-700">
                      {data?.interview?.yearsOfExperience || "Loading..."} years
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Webcam Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <WebcamIcon className="w-6 h-6 text-green-600" />
                  </div>
                  Camera Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="relative w-full max-w-md aspect-video">
                    {webcamEnabled ? (
                      <div className="relative w-full h-full">
                        <Webcam
                          onUserMedia={() => setWebcamEnabled(true)}
                          onUserMediaError={() => setWebcamEnabled(false)}
                          mirrored
                          className="w-full h-full object-cover rounded-xl border-4 border-green-200 shadow-lg"
                        />
                        <div className="absolute top-3 right-3">
                          <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            Live
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center space-y-4">
                        <div className="p-6 bg-slate-200 rounded-full">
                          <WebcamIcon className="w-16 h-16 text-slate-400" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-slate-600 font-medium">Camera Preview</p>
                          <p className="text-sm text-slate-500">Enable to test your setup</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {!webcamEnabled && (
                    <Button 
                      onClick={() => setWebcamEnabled(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                    >
                      <WebcamIcon className="w-5 h-5 mr-2" />
                      Enable Camera & Microphone
                    </Button>
                  )}
                  
                  {webcamEnabled && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Camera is ready</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Start Interview Button */}
          <div className="text-center">
            <Link href={`/dashboard/interview/${interviewId}/start`}>
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Play className="w-6 h-6 mr-3" />
                Start Interview
              </Button>
            </Link>
            <p className="text-sm text-slate-500 mt-4">
              Make sure your camera and microphone are working before starting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
