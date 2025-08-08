"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Star, CheckCircle, AlertCircle, BarChart3, MessageSquare, Target, ArrowLeft, Download, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import Link from "next/link";

interface InterviewAnswer {
  question: string;
  answer: string;
  feedback: string;
  rating: string; // Note: rating comes as string from API
  createdAt: string;
}

interface FeedbackResponse {
  feedback: InterviewAnswer[];
}

interface FeedbackData {
  mockId: string;
  jobPosition?: string;
  interviewAnswers: InterviewAnswer[];
  // We'll calculate these from the data
  overallRating?: number;
  averageScore?: number;
  totalQuestions?: number;
  completedQuestions?: number;
}

const FeedbackPage = () => {
  const params = useParams();
  const mockId = params.InterviewId as string;
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchFeedback();
  }, [mockId]);

  const fetchFeedback = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/feedback/${mockId}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch feedback');
      }
      
      const data: FeedbackResponse = await res.json();
      
      // Extract the feedback array from the response
      const interviewAnswers = data.feedback || [];
      
      // Calculate derived metrics
      const processedData: FeedbackData = {
        mockId,
        interviewAnswers,
        totalQuestions: interviewAnswers.length,
        completedQuestions: interviewAnswers.filter((answer) => answer.answer && answer.answer.trim() !== '').length,
        averageScore: interviewAnswers.length > 0 
          ? Math.round((interviewAnswers.reduce((sum, answer) => sum + parseInt(answer.rating), 0) / interviewAnswers.length) * 10) 
          : 0,
        overallRating: interviewAnswers.length > 0 
          ? interviewAnswers.reduce((sum, answer) => sum + parseInt(answer.rating), 0) / interviewAnswers.length 
          : 0,
      };
      
      setFeedbackData(processedData);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setError('Failed to load feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const expandAll = () => {
    if (feedbackData?.interviewAnswers) {
      setExpandedQuestions(new Set(Array.from({ length: feedbackData.interviewAnswers.length }, (_, i) => i)));
    }
  };

  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  const renderStars = (rating: number, maxRating: number = 10) => {
    // Convert rating out of 10 to 5 stars
    const starRating = Math.round((rating / maxRating) * 5);
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 sm:w-5 sm:h-5 ${
          index < starRating
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getScoreColor = (rating: number) => {
    const percentage = (rating / 10) * 100;
    if (percentage >= 80) return "text-green-600 bg-green-100";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreLabel = (rating: number) => {
    const percentage = (rating / 10) * 100;
    if (percentage >= 80) return "Excellent";
    if (percentage >= 60) return "Good";
    return "Needs Improvement";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600">Loading your feedback...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto w-full">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Error Loading Feedback</h2>
            <p className="text-slate-600 mb-4">{error}</p>
            <Button onClick={fetchFeedback}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!feedbackData || !feedbackData.interviewAnswers || feedbackData.interviewAnswers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto w-full">
          <CardContent className="pt-6 text-center">
            <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-800 mb-2">No Feedback Available</h2>
            <p className="text-slate-600 mb-4">No interview answers found for this session.</p>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <Link href={`/dashboard/interview/${mockId}`}>
              <Button variant="outline" size="sm" className="flex items-center gap-2 w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4" />
                Back to Interview
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Interview Feedback
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 px-4">
              {feedbackData.jobPosition || "Interview Session"} • {feedbackData.completedQuestions} of {feedbackData.totalQuestions} questions completed
            </p>
          </div>
        </div>

        {/* Overall Score Section - Removed Duration Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-4 sm:pt-6 text-center">
              <div className="flex items-center justify-center mb-3">
                {renderStars(feedbackData.overallRating || 0)}
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
                {(feedbackData.overallRating || 0).toFixed(1)}/10
              </p>
              <p className="text-xs sm:text-sm text-slate-600">Overall Rating</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-4 sm:pt-6 text-center">
              <div className="p-2 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
                {feedbackData.averageScore}%
              </p>
              <p className="text-xs sm:text-sm text-slate-600">Average Score</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
            <CardContent className="pt-4 sm:pt-6 text-center">
              <div className="p-2 bg-green-100 rounded-lg w-fit mx-auto mb-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
                {feedbackData.completedQuestions}/{feedbackData.totalQuestions}
              </p>
              <p className="text-xs sm:text-sm text-slate-600">Completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Question-by-Question Feedback */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-xl sm:text-2xl font-semibold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    Question Feedback
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={expandAll}
                      className="text-xs sm:text-sm"
                    >
                      Expand All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={collapseAll}
                      className="text-xs sm:text-sm"
                    >
                      Collapse All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {feedbackData.interviewAnswers.map((answer, index) => {
                  const numericRating = parseInt(answer.rating);
                  const isExpanded = expandedQuestions.has(index);
                  
                  return (
                    <Collapsible
                      key={index}
                      open={isExpanded}
                      onOpenChange={() => toggleQuestion(index)}
                    >
                      <Card className="border border-slate-200 hover:border-slate-300 transition-colors">
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                                  Question {index + 1}
                                </h3>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge className={`${getScoreColor(numericRating)} border-0 text-xs`}>
                                    {answer.rating}/10
                                  </Badge>
                                  <div className="hidden sm:flex items-center">
                                    {renderStars(numericRating)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="hidden sm:inline-flex text-xs">
                                  {getScoreLabel(numericRating)}
                                </Badge>
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-slate-500" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-slate-500" />
                                )}
                              </div>
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <CardContent className="pt-0 space-y-4">
                            {/* Mobile star rating */}
                            <div className="flex sm:hidden items-center justify-between">
                              <div className="flex items-center">
                                {renderStars(numericRating)}
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {getScoreLabel(numericRating)}
                              </Badge>
                            </div>
                            
                            <div className="bg-slate-50 p-3 sm:p-4 rounded-lg">
                              <p className="text-slate-700 font-medium mb-2 text-sm sm:text-base">Question:</p>
                              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{answer.question}</p>
                            </div>

                            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                              <p className="text-slate-700 font-medium mb-2 text-sm sm:text-base">Your Answer:</p>
                              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                {answer.answer || "No answer provided"}
                              </p>
                            </div>

                            <div className="bg-amber-50 p-3 sm:p-4 rounded-lg">
                              <p className="text-slate-700 font-medium mb-2 text-sm sm:text-base">AI Feedback:</p>
                              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{answer.feedback}</p>
                            </div>

                            <div className="text-xs text-slate-400 pt-2 border-t border-slate-200">
                              Answered on: {formatDate(answer.createdAt)}
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Performance Summary */}
          <div className="xl:col-span-1 space-y-6">
            {/* Performance Breakdown */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-semibold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  Performance Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {feedbackData.interviewAnswers.map((answer, index) => {
                  const numericRating = parseInt(answer.rating);
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Q{index + 1}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 sm:w-20 bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              numericRating >= 8 ? 'bg-green-500' :
                              numericRating >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(numericRating / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700 w-8">
                          {answer.rating}/10
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-semibold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm sm:text-base">Highest Score:</span>
                  <span className="font-semibold text-green-600 text-sm sm:text-base">
                    {Math.max(...feedbackData.interviewAnswers.map(a => parseInt(a.rating)))}/10
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm sm:text-base">Lowest Score:</span>
                  <span className="font-semibold text-red-600 text-sm sm:text-base">
                    {Math.min(...feedbackData.interviewAnswers.map(a => parseInt(a.rating)))}/10
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm sm:text-base">Questions Answered:</span>
                  <span className="font-semibold text-slate-800 text-sm sm:text-base">
                    {feedbackData.completedQuestions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm sm:text-base">Success Rate:</span>
                  <span className="font-semibold text-blue-600 text-sm sm:text-base">
                    {feedbackData.interviewAnswers.filter(a => parseInt(a.rating) >= 6).length}/{feedbackData.totalQuestions}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/dashboard" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base">
                  Practice Another Interview
                </Button>
              </Link>
              <Link href={`/dashboard/interview/${mockId}`} className="block">
                <Button variant="outline" className="w-full text-sm sm:text-base">
                  Review Interview Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
