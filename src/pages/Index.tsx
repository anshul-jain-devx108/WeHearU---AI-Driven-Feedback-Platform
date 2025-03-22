
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  MessageSquare,
  LineChart,
  Zap,
  CheckCircle,
  BarChart,
  BrainCircuit,
  TrendingUp,
  PieChart,
  Star,
} from 'lucide-react';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (document.querySelector('.hero-content')) {
        document.querySelector('.hero-content')!.setAttribute(
          'style', 
          `transform: translateY(${scrollY * 0.2}px)`
        );
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        {/* Background Element */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary opacity-10 blur-3xl animate-spin-slow"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
        </div>
        
        <div className="container-custom pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hero-content space-y-6 md:space-y-8">
              <div className="inline-block">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                  AI-Powered Customer Feedback Platform
                </div>
              </div>
              
              <h1 className="font-bold tracking-tight text-5xl md:text-6xl lg:text-7xl">
                Transform <span className="text-primary">Feedback</span> into Actionable Insights
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                WeHearU uses artificial intelligence to analyze customer feedback, helping businesses understand sentiment and drive improvements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/signup">
                  <Button size="lg" className="group relative overflow-hidden px-8 py-6 w-full sm:w-auto">
                    <span className="relative z-10">Start Free Trial</span>
                    <span className="absolute inset-0 bg-white bg-opacity-20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-6 w-full sm:w-auto"
                  onClick={() => scrollToSection(featuresRef)}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3 text-muted-foreground text-sm pt-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center"
                    >
                      <span className="text-xs font-medium text-gray-600">{String.fromCharCode(65 + i)}</span>
                    </div>
                  ))}
                </div>
                <span>Trusted by 1,000+ businesses</span>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background pointer-events-none z-10"></div>
              <div className="glass-panel p-6 transform translate-x-12 shadow-elevation animate-float">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Sentiment Analysis</h3>
                  <span className="text-green-500 text-sm font-medium">+24%</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Positive</span>
                      <span>68%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Neutral</span>
                      <span>22%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Negative</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-panel p-6 transform -translate-x-12 translate-y-8 shadow-elevation">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Latest Feedback</h3>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  "The new dashboard is intuitive and has helped our team respond to customer feedback much faster."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                    <span className="text-xs font-medium">Sarah J.</span>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Brands */}
        <div className="border-y border-gray-100">
          <div className="container-custom py-8">
            <p className="text-center text-sm font-medium text-muted-foreground mb-6">
              TRUSTED BY INDUSTRY LEADERS
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 opacity-70">
              {['BRAND', 'COMPANY', 'ENTERPRISE', 'CORPORATION', 'INDUSTRY'].map((brand, i) => (
                <div key={i} className="text-xl font-bold tracking-tight text-muted-foreground">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="section bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              AI-Powered Features for Better Insights
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform uses cutting-edge artificial intelligence to deliver valuable insights from your customer feedback.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="h-6 w-6 text-primary" />,
                title: "Sentiment Analysis",
                description: "Automatically detect and categorize customer sentiment with high accuracy."
              },
              {
                icon: <BrainCircuit className="h-6 w-6 text-primary" />,
                title: "AI-Driven Insights",
                description: "Get intelligent recommendations based on feedback patterns and trends."
              },
              {
                icon: <LineChart className="h-6 w-6 text-primary" />,
                title: "Trend Visualization",
                description: "Track sentiment changes over time with intuitive charts and graphs."
              },
              {
                icon: <PieChart className="h-6 w-6 text-primary" />,
                title: "Category Classification",
                description: "Group feedback into relevant categories to identify problem areas."
              },
              {
                icon: <Zap className="h-6 w-6 text-primary" />,
                title: "Real-time Notifications",
                description: "Get instant alerts for negative feedback requiring immediate attention."
              },
              {
                icon: <BarChart className="h-6 w-6 text-primary" />,
                title: "Performance Metrics",
                description: "Measure feedback quality and sentiment across products and services."
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-6 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Feature Highlight */}
          <div className="mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    ACTIONABLE INSIGHTS
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Turn Raw Feedback into Strategic Decisions
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    WeHearU doesn't just collect feedback—it analyzes and translates it into clear, actionable insights for your business.
                  </p>
                  
                  <ul className="space-y-4">
                    {[
                      "Identify recurring customer pain points",
                      "Track sentiment trends across products",
                      "Prioritize feature requests based on impact",
                      "Monitor the success of product changes"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div>
                    <Link to="/features">
                      <Button size="lg" variant="outline">
                        Explore All Features
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/20 rounded-3xl transform rotate-3 scale-95 blur-xl opacity-70"></div>
                <div className="glass-panel p-6 relative">
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Top Customer Requests</h4>
                      <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">This Month</div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { feature: "Mobile App Improvement", score: 85, status: "In Progress" },
                        { feature: "Better Notification System", score: 72, status: "Planned" },
                        { feature: "Dark Mode Support", score: 68, status: "Considering" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs font-medium">
                              {i + 1}
                            </div>
                            <span className="text-sm">{item.feature}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-sm font-medium">{item.score}</div>
                            <div className={`text-xs px-2 py-0.5 rounded ${
                              item.status === "In Progress" 
                                ? "bg-green-100 text-green-700" 
                                : item.status === "Planned" 
                                  ? "bg-blue-100 text-blue-700" 
                                  : "bg-gray-100 text-gray-700"
                            }`}>
                              {item.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Sentiment by Channel</h4>
                      <div className="text-xs font-medium text-muted-foreground">Updated Today</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { channel: "Email", score: 76, icon: "📧" },
                        { channel: "Social", score: 64, icon: "💬" },
                        { channel: "Chat", score: 82, icon: "💻" },
                      ].map((item, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
                          <div className="text-2xl mb-2">{item.icon}</div>
                          <div className="text-sm font-medium">{item.channel}</div>
                          <div className={`text-sm font-medium ${
                            item.score > 75 ? "text-green-600" : item.score > 60 ? "text-amber-600" : "text-red-600"
                          }`}>
                            {item.score}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section ref={testimonialRef} className="section bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Loved by Businesses Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See how WeHearU has transformed customer feedback management for companies of all sizes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "WeHearU completely transformed how we handle customer feedback. The AI insights have helped us identify critical issues we were missing.",
                author: "Michael Johnson",
                role: "Customer Success Director",
                company: "TechCorp Inc."
              },
              {
                quote: "The sentiment analysis is incredibly accurate. We've been able to improve our product based on the insights we've gained.",
                author: "Sarah Williams",
                role: "Product Manager",
                company: "InnovateSoft"
              },
              {
                quote: "I was blown away by how easy it was to get started. Within a week, we had actionable insights that led to real improvements.",
                author: "David Chen",
                role: "CEO",
                company: "StartupGenius"
              }
            ].map((testimonial, i) => (
              <div key={i} className="glass-card p-6 lg:p-8 hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-lg mb-6">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section ref={pricingRef} className="section bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: 29,
                description: "Perfect for small businesses just getting started with feedback management.",
                features: [
                  "Up to 500 feedback entries per month",
                  "Basic sentiment analysis",
                  "Email support",
                  "1 team member",
                  "7-day data retention"
                ]
              },
              {
                name: "Professional",
                price: 79,
                description: "Ideal for growing companies with increasing feedback volumes.",
                features: [
                  "Up to 5,000 feedback entries per month",
                  "Advanced sentiment analysis",
                  "Category classification",
                  "API access",
                  "Priority email support",
                  "5 team members",
                  "30-day data retention"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: 199,
                description: "For large organizations with complex feedback management needs.",
                features: [
                  "Unlimited feedback entries",
                  "Custom AI model training",
                  "Advanced analytics and reporting",
                  "Dedicated account manager",
                  "Phone support",
                  "Unlimited team members",
                  "Custom data retention"
                ]
              }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`glass-card relative p-6 lg:p-8 hover:-translate-y-1 transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary text-white text-xs font-semibold py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/signup">
                  <Button 
                    className={`w-full ${plan.popular ? '' : 'variant-outline'}`} 
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Need a custom solution? Contact our sales team.
            </p>
            <Link to="/contact">
              <Button variant="outline">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary bg-opacity-5">
        <div className="container-custom">
          <div className="glass-panel p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Ready to transform your feedback management?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of businesses using WeHearU to turn customer feedback into meaningful insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="px-8 py-6 w-full sm:w-auto">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg" className="px-8 py-6 w-full sm:w-auto">
                      Request Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl transform -rotate-3 scale-95 blur-xl opacity-70"></div>
                <div className="relative bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-8 border border-white border-opacity-30 shadow-elevation">
                  <div className="flex items-center mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">4.9/5 from 500+ reviews</span>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      {
                        company: "TechCorp Inc",
                        stat: "47% increase in customer satisfaction"
                      },
                      {
                        company: "InnovateSoft",
                        stat: "2.5x faster response to negative feedback"
                      },
                      {
                        company: "StartupGenius",
                        stat: "32% reduction in customer churn"
                      }
                    ].map((result, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <span className="font-medium">{result.company}</span>
                        <span className="text-primary font-medium">{result.stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Get in Touch
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Have questions or need help? Our team is here to assist you every step of the way.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: "Sales",
                    description: "Talk to our sales team about your specific needs.",
                    contact: "sales@wehearu.com"
                  },
                  {
                    title: "Support",
                    description: "Get help with your existing account or service.",
                    contact: "support@wehearu.com"
                  },
                  {
                    title: "Partnerships",
                    description: "Explore partnership opportunities with WeHearU.",
                    contact: "partners@wehearu.com"
                  },
                  {
                    title: "Press",
                    description: "Media inquiries and press information.",
                    contact: "press@wehearu.com"
                  }
                ].map((item, i) => (
                  <div key={i} className="glass-card p-6">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <a href={`mailto:${item.contact}`} className="text-primary font-medium hover:underline">
                      {item.contact}
                    </a>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-px h-8 bg-gray-200"></div>
                <p className="text-muted-foreground">
                  Or visit our <Link to="/contact" className="text-primary font-medium hover:underline">Help Center</Link> for FAQs and guides
                </p>
              </div>
            </div>
            
            <div className="glass-card p-6 lg:p-8">
              <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company
                  </label>
                  <input
                    id="company"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your company"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <Button className="w-full">Send Message</Button>
                <p className="text-xs text-muted-foreground text-center">
                  We'll get back to you within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
