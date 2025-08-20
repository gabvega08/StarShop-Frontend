import * as React from 'react';
import Image from 'next/image';
import { QuoteBadge } from './QuoteBadge';
import { StarRating } from './StarRating';
import { Testimonial } from '../constants/testimonials';
import { twMerge } from 'tailwind-merge';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <div className="relative flex flex-col items-stretch justify-center">
      <span className="absolute -top-5 left-0 z-20">
        <QuoteBadge />
      </span>
      <blockquote
        className={twMerge(
          `bg-[#23213a] border border-white/10 rounded-3xl p-8 pt-10 shadow-lg overflow-hidden min-h-[340px] flex flex-col hover:bg-slate-800/70 transition-colors duration-300`,
          className
        )}
        tabIndex={0}
      >
        <StarRating />
        <p className="text-slate-100 text-lg italic mb-6 flex-1">
          “{testimonial.quote}”
        </p>
        <footer className="flex items-center gap-3 mt-auto">
          <span className="relative flex-shrink-0">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={44}
              height={44}
              className="rounded-full border-2 border-blue-500/40 shadow-md object-cover"
            />
          </span>
          <div>
            <span className="block font-semibold text-white leading-tight">
              {testimonial.name}
            </span>
            <span className="block text-sm text-slate-400">
              {testimonial.role}{' '}
              <a
                href={testimonial.companyUrl}
                className="text-blue-400 hover:underline focus:underline focus:outline-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                {testimonial.company}
              </a>
            </span>
          </div>
        </footer>
      </blockquote>
    </div>
  );
}
