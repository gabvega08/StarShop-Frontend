import * as React from 'react';
import { TESTIMONIALS } from '../constants/testimonials';
import { TestimonialCard } from './TestimonialCard';

export function TestimonialsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto items-center justify-center">
      {TESTIMONIALS.map((testimonial, idx) => (
        <TestimonialCard key={idx} testimonial={testimonial} className={idx === 1 || idx === 3 || idx === 5 ? 'min-h-[240px]' : ''}/>
      ))}
    </div>
  );
}
