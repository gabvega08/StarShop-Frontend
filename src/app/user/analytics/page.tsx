'use client'
import AnalyticsSummary from '@/components/features/user/analytics/AnalyticsSummary';
import AnalyticsHeader from '@/components/features/user/analytics/AnalyticsHeader';

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnalyticsHeader />
      <AnalyticsSummary />
    </div>
  );
}
