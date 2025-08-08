import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, MessageSquare, BarChart3, CheckCircle, ArrowRight, Sparkles, Brain, Target, Users, Clock, Award, Mic, Video, FileText } from 'lucide-react';
import Link from 'next/link';

const HowItWorksPage = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Interview",
      description: "Tell us about the job position, requirements, and your experience level. Our AI will generate personalized questions tailored to your specific role.",
      icon: MessageSquare,
      color: "blue",
      features: ["Custom job descriptions", "Experience-based questions", "Industry-specific scenarios"]
    },
    {
      number: "02", 
      title: "Practice with AI",
      description: "Answer questions naturally while our AI listens and analyzes your responses in real-time. Practice as many times as you need to build confidence.",
      icon: Mic,
      color: "green",
      features: ["Real-time speech recognition", "Natural conversation flow", "Unlimited practice sessions"]
    },
    {
      number: "03",
      title: "Get Detailed Feedback",
      description: "Receive comprehensive feedback on your answers, including strengths, areas for improvement, and specific suggestions to enhance your performance.",
      icon: BarChart3,
      color: "purple",
      features: ["AI-powered analysis", "Personalized recommendations", "Performance tracking"]
    },
    {
      number: "04",
      title: "Improve & Succeed",
      description: "Use the insights to refine your answers, track your progress over time, and ace your real interviews with confidence.",
      icon: Award,
      color: "orange",
      features: ["Progress tracking", "Performance analytics", "Success metrics"]
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Our advanced AI understands context, evaluates your responses, and provides human-like feedback to help you improve.",
      stats: "95% accuracy rate"
    },
    {
      icon: Target,
      title: "Personalized Experience",
      description: "Every question and feedback is tailored to your specific job role, experience level, and career goals.",
      stats: "100+ job roles supported"
    },
    {
      icon: Clock,
      title: "Practice Anytime",
      description: "Available 24/7, practice at your own pace and schedule. No need to coordinate with human interviewers.",
      stats: "Available 24/7"
    },
    {
      icon: Users,
      title: "Trusted by Professionals",
      description: "Join thousands of job seekers who have successfully improved their interview skills and landed their dream jobs.",
      stats: "10,000+ users"
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Build Confidence",
      description: "Practice in a safe environment without judgment, building the confidence you need for real interviews."
    },
    {
      icon: Target,
      title: "Improve Performance",
      description: "Get specific, actionable feedback that helps you identify and fix weaknesses in your interview technique."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "No need to schedule mock interviews with friends or career counselors. Practice whenever you want."
    },
    {
      icon: BarChart3,
      title: "Track Progress",
      description: "Monitor your improvement over time with detailed analytics and performance metrics."
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <Play className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
            How InterviewAI Works
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Master your interview skills with AI-powered practice sessions designed to simulate real interview experiences and provide actionable feedback.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-semibold">
              Start Practicing Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Steps Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get started in minutes and see immediate improvements in your interview performance.
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="text-2xl font-bold px-4 py-2 bg-slate-200 text-slate-700">
                        {step.number}
                      </Badge>
                      <div className={`p-3 rounded-lg ${getColorClasses(step.color)}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        {step.description}
                      </p>
                      
                      <div className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-slate-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="flex-1 flex justify-center">
                    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm w-full max-w-md">
                      <CardContent className="p-8 text-center">
                        <div className={`p-6 rounded-full w-fit mx-auto mb-6 ${getColorClasses(step.color)}`}>
                          <Icon className="w-16 h-16" />
                        </div>
                        <h4 className="text-xl font-semibold text-slate-800 mb-3">
                          Step {step.number}
                        </h4>
                        <p className="text-slate-600">
                          {step.title}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our cutting-edge AI technology provides human-like interview experiences with personalized feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="p-4 bg-blue-100 rounded-lg flex-shrink-0">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-slate-800">
                            {feature.title}
                          </h3>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            {feature.stats}
                          </Badge>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Why Choose InterviewAI?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience the benefits that have helped thousands of professionals land their dream jobs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-20">
          <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12 text-center">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-12 h-12" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Built with Cutting-Edge Technology
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="flex flex-col items-center">
                  <Video className="w-12 h-12 mb-4 opacity-90" />
                  <h3 className="text-xl font-semibold mb-2">Video Analysis</h3>
                  <p className="opacity-90">Advanced computer vision for body language analysis</p>
                </div>
                <div className="flex flex-col items-center">
                  <Mic className="w-12 h-12 mb-4 opacity-90" />
                  <h3 className="text-xl font-semibold mb-2">Speech Recognition</h3>
                  <p className="opacity-90">Real-time speech-to-text with 99% accuracy</p>
                </div>
                <div className="flex flex-col items-center">
                  <FileText className="w-12 h-12 mb-4 opacity-90" />
                  <h3 className="text-xl font-semibold mb-2">Natural Language Processing</h3>
                  <p className="opacity-90">AI-powered content analysis and feedback generation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                Ready to Transform Your Interview Skills?
              </h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have successfully improved their interview performance with InterviewAI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 font-semibold">
                    Start Free Practice
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/upgrade">
                  <Button size="lg" variant="outline" className="px-8 py-3 font-semibold">
                    View Pricing Plans
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
