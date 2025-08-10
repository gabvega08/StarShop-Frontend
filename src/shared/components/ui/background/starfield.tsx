'use client';

import * as React from 'react';
import { cn } from '@/shared/utils/utils';
import { Star, StarDensity } from './types';
import { STAR_CONFIGS } from './constants';

interface StarfieldProps {
  starDensity: StarDensity;
  animated: boolean;
}

export function Starfield({ starDensity, animated }: StarfieldProps) {
  const [stars, setStars] = React.useState<Star[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const config = STAR_CONFIGS[starDensity];
    const generatedStars = Array.from({ length: config.count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (config.maxSize - config.minSize) + config.minSize,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    setStars(generatedStars);
  }, [starDensity]);

  return (
    <>
      {/* Base starfield color */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--starfield-base)' }}
      />

      {/* Scattered stars */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {stars.map(star => (
            <div
              key={star.id}
              className={cn(
                'absolute rounded-full',
                animated && 'animate-pulse'
              )}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                backgroundColor: 'var(--starfield-star)',
                animationDelay: animated ? `${Math.random() * 3}s` : undefined,
                animationDuration: animated
                  ? `${2 + Math.random() * 3}s`
                  : undefined,
              }}
            />
          ))}
        </div>
      )}

      {/* Depth gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent, rgba(12, 11, 29, 0.5), var(--starfield-dark))`,
          opacity: 0.7,
        }}
      />
    </>
  );
}
