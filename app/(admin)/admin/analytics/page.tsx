import { Metadata } from 'next';
import RealAnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Analytics Dashboard | Forhem Admin',
  description: 'Real-time analytics and monitoring dashboard for the Forhem network',
};

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor network performance, node status, and system metrics in real-time.
        </p>
      </div>

      <RealAnalyticsDashboard />
    </div>
  );
}