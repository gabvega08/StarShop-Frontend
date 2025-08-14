import * as React from 'react';
import { TestimonialsHeader } from './components/TestimonialsHeader';
import { TestimonialsGrid } from './components/TestimonialsGrid';

export function FeaturesTestimonials() {
  return (
    <section
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Subtle star/noise background, can be replaced with a CSS bg or image if available */}
        <div className="w-full h-full bg-[url('/images/bg-stars.png')] opacity-20" />
      </div>
      <div className="relative max-w-7xl mx-auto z-10">
        <TestimonialsHeader id="testimonials-heading" />
        <TestimonialsGrid />
      </div>
    </section>
  );
}
