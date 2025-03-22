
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  LineChart,
  UploadCloud,
  UserPlus,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import StatCard from '@/components/Dashboard/StatCard';
import SentimentChart from '@/components/charts/SentimentChart';
import CategoryChart from '@/components/charts/CategoryChart';
import ScoreGauge from '@/components/charts/ScoreGauge';
import { useFeedback } from '@/context/FeedbackContext';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { 
    stats, 
    sentimentTrends, 
    categoryDistribution, 
    loading, 
    fetchFeedbacks 
  } = useFeedback();
  const { user } = useAuth();

  useEffect(() => {
    // Refresh data when component mounts
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isMobileOpen={isSidebarOpen} setIsMobileOpen={setIsSidebarOpen} />
      
      <div className="lg:ml-64 min-h-screen">
        <div className="p-6">
          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.name || 'User'}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="sm" className="flex items-center">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="flex items-center">
                <UploadCloud className="mr-2 h-4 w-4" />
                Import Data
              </Button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Feedback"
              value={stats.total}
              description="All time feedback count"
              icon={<MessageSquare className="h-full w-full" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Positive Feedback"
              value={`${Math.round((stats.positive / stats.total) * 100)}%`}
              description={`${stats.positive} out of ${stats.total} responses`}
              icon={<TrendingUp className="h-full w-full" />}
              trend={{ value: 8, isPositive: true }}
              variant="success"
            />
            <StatCard
              title="Negative Feedback"
              value={`${Math.round((stats.negative / stats.total) * 100)}%`}
              description={`${stats.negative} out of ${stats.total} responses`}
              icon={<TrendingUp className="h-full w-full" />}
              trend={{ value: 5, isPositive: false }}
              variant="danger"
            />
            <StatCard
              title="New Users"
              value="128"
              description="Last 30 days"
              icon={<UserPlus className="h-full w-full" />}
              trend={{ value: 18, isPositive: true }}
              variant="primary"
            />
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
              <CategoryChart 
                data={categoryDistribution}
                title="Feedback Categories"
                description="Distribution by category"
              />
            </div>
          </div>

          {/* More metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ScoreGauge
              value={stats.averageScore}
              title="Average Sentiment Score"
              description="Overall sentiment rating"
            />

            <div className="glass-card">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Recent Feedback</h3>
                <div className="space-y-4">
                  {[
                    {
                      text: "Your product has been a game-changer for our team workflow!",
                      time: "2 hours ago",
                      score: 92,
                      positive: true
                    },
                    {
                      text: "The dashboard is confusing and hard to navigate.",
                      time: "5 hours ago",
                      score: 28,
                      positive: false
                    },
                    {
                      text: "I like the product but would love to see more integrations.",
                      time: "1 day ago",
                      score: 68,
                      positive: true
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-3 pb-3 border-b last:border-0 last:pb-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {item.positive ? (
                          <ArrowUpRight className="h-5 w-5" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2">{item.text}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                          <span className={`text-xs font-medium ${
                            item.positive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            Score: {item.score}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View All
                  </Button>
                </div>
              </div>
            </div>

            <div className="glass-card">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Product Performance</h3>
                <div className="space-y-4">
                  {[
                    { name: "Mobile App", score: 87, change: +5 },
                    { name: "Web Dashboard", score: 72, change: -3 },
                    { name: "API Service", score: 91, change: +2 },
                    { name: "Desktop Client", score: 68, change: +8 }
                  ].map((product, i) => (
                    <div key={i} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                      <span className="font-medium">{product.name}</span>
                      <div className="flex items-center space-x-3">
                        <div className={`text-sm font-bold ${
                          product.score > 80 ? 'text-green-600' : product.score > 60 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {product.score}
                        </div>
                        <div className={`flex items-center text-xs font-medium ${
                          product.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {product.change > 0 ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(product.change)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
