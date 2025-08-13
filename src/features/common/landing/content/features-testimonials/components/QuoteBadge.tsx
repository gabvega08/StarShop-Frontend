import * as React from 'react';
import { Quote } from 'lucide-react';

export function QuoteBadge() {
  return (
    <span
      className="inline-flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 shadow-md border-2 border-white/10 text-white text-lg"
      aria-hidden="true"
    >
      <Quote className="rotate-180" fill="white" />
    </span>
  );
}
