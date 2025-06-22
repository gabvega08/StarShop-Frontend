'use client'

import AnalyticsSummary from '@/features/store/analytics/AnalyticsSummary';
import AnalyticsHeader from '@/features/store/analytics/AnalyticsHeader';
import RevenueTrafficOverview from '@/features/store/analytics/RevenueTrafficOverview';

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnalyticsHeader />
      <AnalyticsSummary />
      <RevenueTrafficOverview />
    </div>
  );
}
