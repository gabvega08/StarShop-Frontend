'use client';
import { Button } from '@/shared/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();
  return (
    <div className="flex items-center mb-6">
      <Button
        variant="ghost"
        size="sm"
        className="p-2 rounded-full mr-3 hover:bg-transparent"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-5 w-5 text-gray-600" />
      </Button>
      <h1 className="text-xl font-semibold text-white">Billing & Payments</h1>
    </div>
  );
}
