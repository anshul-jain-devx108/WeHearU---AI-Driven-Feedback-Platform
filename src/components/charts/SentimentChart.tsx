
import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type SentimentTrend } from '@/context/FeedbackContext';

interface SentimentChartProps {
  data: SentimentTrend[];
  title?: string;
  description?: string;
}

const SentimentChart: React.FC<SentimentChartProps> = ({
  data,
  title = "Sentiment Trends",
  description = "Track sentiment changes over time",
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d' | 'all'>('30d');
  
  // Filter data based on selected time range
  const filteredData = (() => {
    if (timeRange === 'all') return data;
    
    const daysToFilter = 
      timeRange === '7d' ? 7 :
      timeRange === '14d' ? 14 : 30;
    
    return data.slice(-daysToFilter);
  })();

  // Calculate total for each day
  const dataWithTotal = filteredData.map(item => ({
    ...item,
    total: item.positive + item.negative + item.neutral,
    // Format date for display
    formattedDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium">{label}</p>
          <div className="space-y-1 mt-2">
            <p style={{ color: '#4ade80' }}>{`Positive: ${payload[0].value}`}</p>
            <p style={{ color: '#f87171' }}>{`Negative: ${payload[1].value}`}</p>
            <p style={{ color: '#94a3b8' }}>{`Neutral: ${payload[2].value}`}</p>
            <p className="font-medium border-t pt-1 mt-1">{`Total: ${payload[0].value + payload[1].value + payload[2].value}`}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={timeRange === '7d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('7d')}
          >
            7d
          </Button>
          <Button 
            variant={timeRange === '14d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('14d')}
          >
            14d
          </Button>
          <Button 
            variant={timeRange === '30d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('30d')}
          >
            30d
          </Button>
          <Button 
            variant={timeRange === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('all')}
          >
            All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dataWithTotal}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="positive"
                stackId="1"
                stroke="#4ade80"
                fill="#4ade8080"
                name="Positive"
              />
              <Area
                type="monotone"
                dataKey="negative"
                stackId="1"
                stroke="#f87171"
                fill="#f8717180"
                name="Negative"
              />
              <Area
                type="monotone"
                dataKey="neutral"
                stackId="1"
                stroke="#94a3b8"
                fill="#94a3b880"
                name="Neutral"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentChart;
