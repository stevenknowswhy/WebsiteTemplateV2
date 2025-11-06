'use client';

import React from 'react';
import PerformanceDashboard from '@/components/PerformanceDashboard';

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PerformanceDashboard />
      </div>
    </div>
  );
}