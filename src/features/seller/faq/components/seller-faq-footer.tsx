'use client';

import { ExternalLink, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SellerFAQFooter() {
  const router = useRouter();
  return (
    <div className="flex flex-col mx-auto items-center gap-4">
      <p className="text-white font-bold text-2xl">Still Have Questions?</p>
      <p className="text-white/70 text-sm">
        If you couldn&apos;t find the answer to questions, our support team is
        here to help
      </p>
      <div className="flex gap-6">
        <button
          className="flex items-center justify-between bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700"
          onClick={() => router.push('/seller/support')}
        >
          <div className="flex gap-2">
            <MessageSquare />
            <p>Contact Support</p>
          </div>
        </button>

        <button
          className="flex items-center justify-between bg-transparent text-white py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-5 border border-white border-opacity-5"
          onClick={() => router.push('/seller/community-forum')}
        >
          <div className="flex gap-2">
            <ExternalLink />
            <p>Visit Community Forum</p>
          </div>
        </button>
      </div>
    </div>
  );
}
