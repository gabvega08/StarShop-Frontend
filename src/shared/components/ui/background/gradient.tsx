'use client';

import * as React from 'react';
import { cn } from '@/shared/utils/utils';
import { Intensity } from './types';

interface GradientProps {
  intensity: Intensity;
  animated: boolean;
}

export function Gradient({ intensity, animated }: GradientProps) {
  // Get intensity multiplier for opacity
  const getIntensityOpacity = (base: number) => {
    const multiplier =
      intensity === 'subtle' ? 0.6 : intensity === 'vibrant' ? 1.4 : 1;
    return base * multiplier;
  };

  return (
    <div
      className={cn('absolute inset-0', animated && 'animate-pulse')}
      style={{
        backgroundColor: 'var(--starfield-base)',
        opacity: getIntensityOpacity(1),
      }}
    />
  );
}
