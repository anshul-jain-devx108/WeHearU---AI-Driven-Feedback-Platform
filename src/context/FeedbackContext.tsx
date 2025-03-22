
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

// Types
export type Feedback = {
  id: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number; // 0-100
  source: string;
  category: string;
  date: string;
  product: string;
};

export type FeedbackStats = {
  total: number;
  positive: number;
  negative: number;
  neutral: number;
  averageScore: number;
};

export type SentimentTrend = {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
};

export type CategoryDistribution = {
  category: string;
  count: number;
};

export type FeedbackContextType = {
  feedbacks: Feedback[];
  loading: boolean;
  stats: FeedbackStats;
  sentimentTrends: SentimentTrend[];
  categoryDistribution: CategoryDistribution[];
  fetchFeedbacks: (filters?: any) => Promise<void>;
  exportFeedbacks: (format: 'csv' | 'pdf') => Promise<void>;
};

// Mock data
const generateMockFeedbacks = (): Feedback[] => {
  const categories = ['UI/UX', 'Performance', 'Feature Request', 'Bug Report', 'Customer Service'];
  const products = ['Dashboard', 'Mobile App', 'Website', 'API'];
  const sources = ['Email', 'Chat', 'Survey', 'Social Media', 'App Review'];
  
  return Array.from({ length: 50 }, (_, i) => {
    const isPositive = Math.random() > 0.3;
    const score = isPositive ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 10;
    let sentiment: 'positive' | 'negative' | 'neutral';
    
    if (score > 70) sentiment = 'positive';
    else if (score < 40) sentiment = 'negative';
    else sentiment = 'neutral';
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      id: `feedback-${i + 1}`,
      text: isPositive 
        ? `This is some positive feedback about ${products[Math.floor(Math.random() * products.length)]}.` 
        : `This is a complaint about ${products[Math.floor(Math.random() * products.length)]}.`,
      sentiment,
      score,
      source: sources[Math.floor(Math.random() * sources.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      date: date.toISOString(),
      product: products[Math.floor(Math.random() * products.length)],
    };
  });
};

const generateSentimentTrends = (): SentimentTrend[] => {
  const trends: SentimentTrend[] = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    trends.push({
      date: date.toISOString().split('T')[0],
      positive: Math.floor(Math.random() * 50) + 20,
      negative: Math.floor(Math.random() * 20) + 5,
      neutral: Math.floor(Math.random() * 30) + 10,
    });
  }
  
  return trends;
};

const generateCategoryDistribution = (): CategoryDistribution[] => {
  return [
    { category: 'UI/UX', count: Math.floor(Math.random() * 100) + 50 },
    { category: 'Performance', count: Math.floor(Math.random() * 80) + 40 },
    { category: 'Feature Request', count: Math.floor(Math.random() * 70) + 30 },
    { category: 'Bug Report', count: Math.floor(Math.random() * 60) + 20 },
    { category: 'Customer Service', count: Math.floor(Math.random() * 50) + 10 },
  ];
};

// Create Context
const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<FeedbackStats>({
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    averageScore: 0,
  });
  const [sentimentTrends, setSentimentTrends] = useState<SentimentTrend[]>([]);
  const [categoryDistribution, setCategoryDistribution] = useState<CategoryDistribution[]>([]);

  // Load initial data
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async (filters?: any) => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock data
      const mockFeedbacks = generateMockFeedbacks();
      setFeedbacks(mockFeedbacks);
      
      // Calculate stats
      const total = mockFeedbacks.length;
      const positive = mockFeedbacks.filter(f => f.sentiment === 'positive').length;
      const negative = mockFeedbacks.filter(f => f.sentiment === 'negative').length;
      const neutral = mockFeedbacks.filter(f => f.sentiment === 'neutral').length;
      const totalScore = mockFeedbacks.reduce((sum, f) => sum + f.score, 0);
      
      setStats({
        total,
        positive,
        negative,
        neutral,
        averageScore: Math.round(totalScore / total),
      });
      
      // Set trends and distribution
      setSentimentTrends(generateSentimentTrends());
      setCategoryDistribution(generateCategoryDistribution());
      
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast({
        title: "Error",
        description: "Failed to fetch feedback data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportFeedbacks = async (format: 'csv' | 'pdf') => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would trigger a file download
      toast({
        title: "Export Complete",
        description: `Your feedback data has been exported as ${format.toUpperCase()}.`,
      });
      
    } catch (error) {
      console.error('Error exporting feedback:', error);
      toast({
        title: "Export Failed",
        description: "An error occurred while exporting your data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeedbackContext.Provider value={{
      feedbacks,
      loading,
      stats,
      sentimentTrends,
      categoryDistribution,
      fetchFeedbacks,
      exportFeedbacks,
    }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
