'use client';

import { Button } from '@/shared/components/ui/button';
import { ExternalLink, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FAQFooter() {
  const router = useRouter();
  return (
    <div className="flex flex-col mx-auto items-center gap-4">
      <p className="text-white font-bold text-2xl">Still Have Questions?</p>
      <p className="text-white/70 text-sm">
        If you couldn&apos;t find the answer to questions, our support team is
        here to help
      </p>
      <div className="flex gap-6">
        <Button
          leftIcon={<MessageSquare />}
          variant="primary"
          onClick={() => router.push('/seller/support')}
        >
          Contact Support
        </Button>

        <Button
          leftIcon={<ExternalLink />}
          variant="transparent"
          onClick={() => router.push('/seller/community-forum')}
        >
          Visit Community Forum
        </Button>
      </div>
    </div>
  );
}
