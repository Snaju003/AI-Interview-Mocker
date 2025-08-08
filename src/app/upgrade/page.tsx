import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star, Zap, Crown, Sparkles, Users, BarChart3, Shield, Headphones } from 'lucide-react';

const UpgradePage = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with AI interviews",
      features: [
        "5 interviews per month",
        "Basic AI feedback",
        "Standard question types",
        "Email support",
      ],
      limitations: [
        "Limited interview history",
        "No advanced analytics",
        "No custom questions",
        "No priority support",
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      popular: false,
      icon: Star,
      color: "slate",
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Ideal for serious job seekers and professionals",
      features: [
        "Unlimited interviews",
        "Advanced AI feedback with insights",
        "Custom question creation",
        "Detailed performance analytics",
        "Interview history & tracking",
        "Priority email support",
        "Export feedback as PDF",
        "Multiple interview formats",
      ],
      limitations: [],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      popular: true,
      icon: Zap,
      color: "blue",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "Perfect for teams and organizations",
      features: [
        "Everything in Pro",
        "Team management dashboard",
        "Bulk interview creation",
        "Advanced team analytics",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
        "SSO authentication",
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false,
      icon: Crown,
      color: "purple",
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Feedback",
      description: "Get detailed, personalized feedback on your interview performance with advanced AI analysis.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track your progress over time with comprehensive analytics and performance insights.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share interviews with team members and get collaborative feedback from colleagues.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with SOC 2 compliance and enterprise-grade data protection.",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      slate: "bg-slate-100 text-slate-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getBorderColor = (color: string, popular: boolean) => {
    if (popular) return "border-blue-500 ring-2 ring-blue-200";
    const colors = {
      slate: "border-slate-200",
      blue: "border-blue-200",
      purple: "border-purple-200",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
            Upgrade Your Interview Skills
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan to accelerate your career growth with AI-powered interview practice and feedback.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={index}
                className={`
                  relative shadow-lg border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105
                  ${getBorderColor(plan.color, plan.popular)}
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`p-3 rounded-full w-fit mx-auto mb-4 ${getColorClasses(plan.color)}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                    <span className="text-slate-600 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-slate-200">
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <div key={limitationIndex} className="flex items-start gap-3">
                          <X className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-500 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="pt-6">
                    <Button
                      variant={plan.buttonVariant}
                      className={`
                        w-full py-3 font-semibold transition-all duration-200
                        ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
                      `}
                      disabled={plan.name === "Free"}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Why Choose InterviewAI Pro?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Unlock powerful features designed to give you the competitive edge in your job search.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">
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
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your billing period."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee. If you're not satisfied with InterviewAI Pro, contact us within 30 days for a full refund."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay via invoice."
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. We use bank-level encryption and are SOC 2 compliant. Your interview data is never shared with third parties and is stored securely."
              }
            ].map((faq, index) => (
              <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;