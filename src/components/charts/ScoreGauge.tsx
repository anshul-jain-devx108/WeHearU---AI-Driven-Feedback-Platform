
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ScoreGaugeProps {
  value: number;
  title?: string;
  description?: string;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  value,
  title = "Average Sentiment Score",
  description = "Overall customer sentiment",
  maxValue = 100,
  size = 180,
  strokeWidth = 12,
}) => {
  // Calculate angle based on value
  const percentage = (value / maxValue) * 100;
  const angle = (percentage * 2.4) - 120; // -120 to 120 degrees
  
  // Calculate gradient color based on value
  const getColor = () => {
    if (percentage >= 70) return '#4ade80'; // green
    if (percentage >= 40) return '#facc15'; // yellow
    return '#f87171'; // red
  };
  
  // Calculate label position
  const radius = (size / 2) - strokeWidth - 10;
  const labelX = size / 2;
  const labelY = (size / 2) + 15;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="relative" style={{ width: size, height: size }}>
          {/* Background arc */}
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <path
              d={`M ${strokeWidth} ${size / 2} A ${size / 2 - strokeWidth} ${size / 2 - strokeWidth} 0 0 1 ${size - strokeWidth} ${size / 2}`}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            
            {/* Value arc */}
            <path
              d={`M ${strokeWidth} ${size / 2} A ${size / 2 - strokeWidth} ${size / 2 - strokeWidth} 0 0 1 ${size / 2} ${strokeWidth}`}
              fill="none"
              stroke={getColor()}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{
                transformOrigin: `${size / 2}px ${size / 2}px`,
                transform: `rotate(${angle}deg)`,
                transition: 'transform 1s ease-out, stroke 1s ease-out',
              }}
            />
          </svg>
          
          {/* Value label */}
          <div 
            className="absolute flex flex-col items-center justify-center"
            style={{
              top: labelY,
              left: labelX,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span className="text-3xl font-semibold" style={{ color: getColor() }}>
              {value}
            </span>
            <span className="text-xs text-muted-foreground">out of {maxValue}</span>
          </div>
          
          {/* Min/Max labels */}
          <div className="absolute bottom-1 left-2 text-xs text-muted-foreground">0</div>
          <div className="absolute bottom-1 right-2 text-xs text-muted-foreground">{maxValue}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreGauge;
