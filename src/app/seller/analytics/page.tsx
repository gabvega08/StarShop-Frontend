'use client';

import AnalyticsSummary from '@/features/seller/analytics/AnalyticsSummary';
import AnalyticsHeader from '@/features/seller/analytics/AnalyticsHeader';
import RevenueTrafficOverview from '@/features/seller/analytics/RevenueTrafficOverview';

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnalyticsHeader />
      <AnalyticsSummary />
      <RevenueTrafficOverview />
    </div>
  );
}
