import { StarConfig } from './types';

// Star configuration based on density
export const STAR_CONFIGS: Record<string, StarConfig> = {
  low: { count: 100, maxSize: 2, minSize: 0.5 },
  medium: { count: 200, maxSize: 3, minSize: 0.5 },
  high: { count: 300, maxSize: 4, minSize: 0.5 },
} as const;
