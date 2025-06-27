'use client';

import Unauthorized from '@/shared/components/layout/Unauthorized';

export default function UnauthorizedPage() {
  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <Unauthorized />
    </div>
  );
}
