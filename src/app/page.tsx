import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, CheckCircle, Star, Users, BarChart3, MessageSquare, Sparkles, Brain, Target, Clock, Award, Quote, TrendingUp, Shield, Zap } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Feedback",
      description: "Get personalized, detailed feedback on your interview performance with advanced AI analysis.",
      color: "blue"
    },
    {
      icon: Target,
      title: "Tailored Questions",
      description: "Practice with questions specifically generated for your job role and experience level.",
      color: "green"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track your progress over time with comprehensive analytics and improvement insights.",
      color: "purple"
    },
    {
      icon: Clock,
      title: "Practice Anytime",
      description: "Available 24/7, practice at your own pace without scheduling constraints.",
      color: "orange"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Professionals Trained", icon: Users },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "50+", label: "Job Roles Supported", icon: Award },
    { number: "24/7", label: "Available", icon: Clock }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      content: "InterviewAI helped me prepare for my Google interview. The AI feedback was incredibly detailed and helped me identify areas I never knew I needed to improve.",
      rating: 5,
      avatar: "/professional-woman-diverse.png"
    },
    {
      name: "Michael Chen",
      role: "Product Manager at Microsoft",
      content: "The personalized questions were spot-on for my PM role. I felt so much more confident going into my real interviews after practicing here.",
      rating: 5,
      avatar: "/professional-man.png"
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist at Netflix",
      content: "The analytics feature is amazing! Being able to track my improvement over time really motivated me to keep practicing.",
      rating: 5,
      avatar: "/professional-woman-data-scientist.png"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: ["5 interviews per month", "Basic AI feedback", "Standard questions", "Email support"],
      buttonText: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For serious job seekers",
      features: ["Unlimited interviews", "Advanced AI feedback", "Custom questions", "Performance analytics", "Priority support"],
      buttonText: "Start Free Trial",
      popular: true
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
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6 lg:py-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Interview Practice
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            Master Your Next
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Interview</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Practice with AI-powered mock interviews, get personalized feedback, and land your dream job with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold">
                Start Practicing Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                  <div className="text-slate-600 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
            Why Choose InterviewAI?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our AI-powered platform provides everything you need to excel in your interviews and advance your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-lg ${getColorClasses(feature.color)} flex-shrink-0`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">
                        {feature.title}
                      </h3>
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
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get started in minutes with our simple 3-step process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Create Interview",
              description: "Tell us about your job role and experience level",
              icon: MessageSquare
            },
            {
              step: "02", 
              title: "Practice with AI",
              description: "Answer personalized questions and get real-time feedback",
              icon: Brain
            },
            {
              step: "03",
              title: "Improve & Succeed",
              description: "Track progress and ace your real interviews",
              icon: Award
            }
          ].map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <Badge variant="secondary" className="text-2xl font-bold px-4 py-2 mb-6 bg-blue-100 text-blue-700">
                    {step.step}
                  </Badge>
                  <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/how-it-works">
            <Button variant="outline" size="lg" className="px-8 py-3 font-semibold">
              Learn More About Our Process
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="shadow-2xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-12 h-12" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their interview skills with InterviewAI. Start practicing today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="px-8 py-3 font-semibold bg-white text-blue-600 hover:bg-white/90">
                  Start Free Practice
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default LandingPage;
