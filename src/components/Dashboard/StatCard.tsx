
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  variant = 'default',
  className,
}) => {
  const variants = {
    default: 'bg-white',
    primary: 'bg-primary bg-opacity-10',
    success: 'bg-green-50',
    warning: 'bg-amber-50',
    danger: 'bg-red-50',
  };

  const iconColors = {
    default: 'text-primary',
    primary: 'text-primary',
    success: 'text-green-500',
    warning: 'text-amber-500',
    danger: 'text-red-500',
  };

  return (
    <Card className={cn(
      'animate-hover-float overflow-hidden border-none shadow-subtle transition-all duration-300 hover:shadow-elevation',
      variants[variant],
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-2">{description}</p>
            )}
            {trend && (
              <div className={`flex items-center mt-2 text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                <span>{trend.isPositive ? '↑' : '↓'}</span>
                <span className="ml-1">{trend.value}%</span>
                <span className="ml-1">from last month</span>
              </div>
            )}
          </div>
          <div className={cn('p-3 rounded-full', `${variants[variant]} bg-opacity-30`)}>
            <div className={cn('h-8 w-8', iconColors[variant])}>
              {icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
