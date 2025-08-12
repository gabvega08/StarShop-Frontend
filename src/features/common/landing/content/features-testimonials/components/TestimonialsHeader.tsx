import * as React from 'react';

interface TestimonialsHeaderProps {
  id?: string;
}

export function TestimonialsHeader({ id }: TestimonialsHeaderProps) {
  return (
    <div className="text-center mb-16" id={id}>
      <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-8">
        <span className="text-blue-400">★</span>
        <span className="text-white text-sm font-medium">Customer Stories</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
        Loved by{' '}
        <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Thousands
        </span>
      </h2>
      <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
        Discover why businesses and customers choose StarShop for their
        blockchain commerce journey. Real stories from our amazing community.
      </p>
    </div>
  );
}
