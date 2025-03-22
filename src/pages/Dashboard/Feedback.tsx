
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Filter, Download } from 'lucide-react';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import FeedbackTable from '@/components/Dashboard/FeedbackTable';
import { useFeedback } from '@/context/FeedbackContext';

const FeedbackPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { feedbacks, loading, fetchFeedbacks, exportFeedbacks } = useFeedback();

  useEffect(() => {
    // Refresh data when component mounts
    fetchFeedbacks();
  }, []);

  const handleRefresh = () => {
    fetchFeedbacks();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isMobileOpen={isSidebarOpen} setIsMobileOpen={setIsSidebarOpen} />
      
      <div className="lg:ml-64 min-h-screen">
        <div className="p-6">
          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Feedback Management</h1>
              <p className="text-muted-foreground">
                View, analyze, and manage all customer feedback
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
          </div>

          {/* Feedback summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { title: "Total Feedback", value: feedbacks.length, color: "bg-blue-50 text-blue-700" },
              { 
                title: "Positive", 
                value: feedbacks.filter(f => f.sentiment === 'positive').length, 
                color: "bg-green-50 text-green-700" 
              },
              { 
                title: "Negative", 
                value: feedbacks.filter(f => f.sentiment === 'negative').length, 
                color: "bg-red-50 text-red-700" 
              },
              { 
                title: "Neutral", 
                value: feedbacks.filter(f => f.sentiment === 'neutral').length, 
                color: "bg-gray-50 text-gray-700" 
              }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                  <span className={`text-xs font-medium py-1 px-2 rounded-full ${stat.color}`}>
                    {Math.round((stat.value / (feedbacks.length || 1)) * 100)}%
                  </span>
                </div>
                <p className="text-2xl font-semibold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Feedback Table */}
          <div className="glass-card">
            <div className="p-6">
              <FeedbackTable 
                feedbacks={feedbacks} 
                loading={loading}
                onExport={exportFeedbacks}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
