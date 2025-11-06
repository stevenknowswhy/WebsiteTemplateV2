"use client";

import React from "react";

interface RevenueChartProps {
  className?: string;
}

export default function RevenueChart({ className }: RevenueChartProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`h-40 ${className}`}>
        <div className="animate-pulse bg-gray-200 rounded-md h-full" />
      </div>
    );
  }

  // This would normally contain heavy chart library like Recharts, Chart.js, or D3
  // For this example, we'll simulate a simple chart
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Revenue Overview</h3>
        <div className="text-sm text-gray-500">Last 30 days</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="relative pt-1"
          >
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-blue-600">
                  Week {i}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  ${Math.floor(Math.random() * 10000) + 5000}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${Math.random() * 80 + 20}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}