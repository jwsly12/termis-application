import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function DonutChart({ 
  percentage, 
  size = 120, 
  strokeWidth = 12,
  className 
}: { 
  percentage: number; 
  size?: number; 
  strokeWidth?: number;
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted"
        />
        {/* Progress */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="text-primary"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-display text-foreground">{percentage}%</span>
      </div>
    </div>
  );
}

export function GaugeChart({ 
  percentage, 
  size = 160, 
  strokeWidth = 14,
  className 
}: { 
  percentage: number; 
  size?: number; 
  strokeWidth?: number;
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI; // Half circle
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative flex flex-col items-center", className)} style={{ width: size, height: size / 2 + 20 }}>
      <svg width={size} height={size / 2 + strokeWidth} className="overflow-visible">
        {/* Background track */}
        <path
          d={`M ${strokeWidth/2} ${size/2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth/2} ${size/2}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-muted"
        />
        {/* Progress */}
        <motion.path
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          d={`M ${strokeWidth/2} ${size/2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth/2} ${size/2}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
        />
      </svg>
      <div className="absolute bottom-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold font-display text-foreground">{percentage}%</span>
      </div>
    </div>
  );
}
