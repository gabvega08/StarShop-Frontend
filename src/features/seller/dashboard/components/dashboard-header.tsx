'use client';

import { useUserName } from '@/shared/stores';

export function DashboardHeader() {
  const userName = useUserName();
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white">
        Welcome back, {userName || 'User'}
      </h1>
      <p className="text-gray-400 mt-1">
        Here&apos;s what&apos;s happening with your store today.
      </p>
    </div>
  );
}
