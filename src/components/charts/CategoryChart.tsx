
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type CategoryDistribution } from '@/context/FeedbackContext';

interface CategoryChartProps {
  data: CategoryDistribution[];
  title?: string;
  description?: string;
}

const COLORS = ['#3b82f6', '#a78bfa', '#4ade80', '#f97316', '#f43f5e', '#64748b'];

const CategoryChart: React.FC<CategoryChartProps> = ({
  data,
  title = "Category Distribution",
  description = "Breakdown of feedback by category",
}) => {
  // Calculate percentages
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const dataWithPercentage = data.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length],
    percentage: ((item.count / total) * 100).toFixed(1),
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium">{data.category}</p>
          <p className="text-sm text-muted-foreground">{`Count: ${data.count}`}</p>
          <p className="text-sm font-medium">{`${data.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const CustomLegend = () => (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
      {dataWithPercentage.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs truncate">
            {entry.category} ({entry.percentage}%)
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithPercentage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="count"
              >
                {dataWithPercentage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <CustomLegend />
      </CardContent>
    </Card>
  );
};

export default CategoryChart;
