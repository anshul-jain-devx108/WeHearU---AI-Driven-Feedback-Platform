
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Download, 
  Filter, 
  PieChart, 
  BarChart, 
  TrendingUp,
  RefreshCw 
} from 'lucide-react';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import SentimentChart from '@/components/charts/SentimentChart';
import CategoryChart from '@/components/charts/CategoryChart';
import ScoreGauge from '@/components/charts/ScoreGauge';
import { useFeedback } from '@/context/FeedbackContext';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Insights = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { sentimentTrends, categoryDistribution, stats, loading } = useFeedback();
  
  // Prepared data for product comparison
  const productData = [
    { name: 'Mobile App', positive: 65, negative: 15, neutral: 20 },
    { name: 'Web Dashboard', positive: 45, negative: 25, neutral: 30 },
    { name: 'API', positive: 80, negative: 5, neutral: 15 },
    { name: 'Desktop Client', positive: 50, negative: 30, neutral: 20 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isMobileOpen={isSidebarOpen} setIsMobileOpen={setIsSidebarOpen} />
      
      <div className="lg:ml-64 min-h-screen">
        <div className="p-6">
          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI Insights</h1>
              <p className="text-muted-foreground">
                Advanced analytics and AI-generated insights from your feedback
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                disabled={loading}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          {/* AI Insights Summary */}
          <div className="glass-card p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 border-b pb-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">AI Analysis Summary</h2>
                <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-lg">
                Based on recent feedback analysis, customer sentiment is <span className="font-medium text-green-600">trending positively</span> with an improvement of 8% over the last 30 days.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800">Key Strength</h3>
                  <p className="text-green-700">User interface improvements are being well-received, with 92% positive feedback.</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-800">Key Concern</h3>
                  <p className="text-red-700">Performance issues on the mobile app are generating 68% of negative feedback.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800">Recommendation</h3>
                  <p className="text-blue-700">Focus on improving mobile app performance to significantly boost overall sentiment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <SentimentChart 
                data={sentimentTrends} 
                title="Sentiment Trends" 
                description="Track customer sentiment over time"
              />
            </div>
            <div>
              <ScoreGauge
                value={stats.averageScore}
                title="Sentiment Score"
                description="Overall sentiment rating"
              />
            </div>
          </div>

          {/* More Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <CategoryChart 
              data={categoryDistribution}
              title="Feedback by Category"
              description="Distribution of feedback across categories"
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Product Comparison</CardTitle>
                <CardDescription>Sentiment comparison across products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={productData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="positive" stackId="a" name="Positive" fill="#4ade80" />
                      <Bar dataKey="neutral" stackId="a" name="Neutral" fill="#94a3b8" />
                      <Bar dataKey="negative" stackId="a" name="Negative" fill="#f87171" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Trends and Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-medium">Trending Topics</h3>
              </div>
              <div className="space-y-4">
                {[
                  { topic: "Mobile Performance", score: 85, change: +12 },
                  { topic: "UI Design", score: 78, change: +5 },
                  { topic: "Customer Support", score: 92, change: +8 },
                  { topic: "Feature Requests", score: 65, change: -3 },
                  { topic: "Onboarding", score: 72, change: +2 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between pb-2 border-b last:border-0">
                    <span className="font-medium">{item.topic}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{item.score}</span>
                      <span className={`text-xs ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <BarChart className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-medium">Sentiment Drivers</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Key factors driving sentiment scores
              </p>
              <div className="space-y-3">
                {[
                  { name: "Ease of Use", impact: 85, positive: true },
                  { name: "Response Time", impact: 72, positive: true },
                  { name: "Feature Set", impact: 68, positive: true },
                  { name: "App Crashes", impact: 62, positive: false },
                  { name: "Customer Support", impact: 76, positive: true },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className={item.positive ? 'text-green-600' : 'text-red-600'}>
                        {item.positive ? 'Positive' : 'Negative'} Impact
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.positive ? 'bg-green-500' : 'bg-red-500'}`} 
                        style={{ width: `${item.impact}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <PieChart className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-medium">Suggested Actions</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                AI-recommended actions based on feedback
              </p>
              <div className="space-y-4">
                {[
                  { action: "Fix mobile app performance issues", priority: "High", impact: 8.5 },
                  { action: "Improve onboarding documentation", priority: "Medium", impact: 7.2 },
                  { action: "Add requested dark mode feature", priority: "Medium", impact: 6.8 },
                  { action: "Enhance error reporting", priority: "Low", impact: 5.4 },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                    <div className={`mt-0.5 px-2 py-1 text-xs font-medium rounded-md ${
                      item.priority === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : item.priority === 'Medium' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.priority}
                    </div>
                    <div>
                      <p className="font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Estimated impact: <span className="font-medium">{item.impact}/10</span>
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Recommendations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
