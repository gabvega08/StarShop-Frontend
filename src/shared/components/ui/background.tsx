'use client';

import * as React from 'react';
import { cn } from '@/shared/utils/utils';
import { BackgroundProps } from './background/types';
import { Starfield } from './background/starfield';
import { Gradient } from './background/gradient';

export function Background({
  className,
  variant = 'starfield',
  opacity = 1,
  animated = false,
  intensity = 'normal',
  starDensity = 'medium',
  ...rest
}: BackgroundProps) {
  const showGradient =
    variant === 'gradient' || variant === 'both' || variant === 'all';
  const showStarfield =
    variant === 'starfield' || variant === 'both' || variant === 'all';

  return (
    <div
      aria-hidden="true"
      {...rest}
      className={cn(
        'pointer-events-none fixed inset-0 -z-10',
        animated && 'transition-opacity duration-1000',
        className
      )}
      style={{ opacity }}
    >
      {/* Starfield Background */}
      {showStarfield && (
        <Starfield starDensity={starDensity} animated={animated} />
      )}

      {/* Gradient Background */}
      {showGradient && <Gradient intensity={intensity} animated={animated} />}
    </div>
  );
}
