'use client';

import * as React from "react";
import { cn } from "@/shared/utils/utils";

type BackgroundProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'starfield' | 'gradient' | 'mesh' | 'both' | 'all';

  opacity?: number;

  animated?: boolean;

  intensity?: 'subtle' | 'normal' | 'vibrant';

  starDensity?: 'low' | 'medium' | 'high';
};

export function Background({
  className,
  variant = 'starfield',
  opacity = 1,
  animated = false,
  intensity = 'normal',
  starDensity = 'medium',
  ...rest
}: BackgroundProps) {
  const showGradient = variant === "gradient" || variant === "both" || variant === "all";
  const showMesh = variant === "mesh" || variant === "all";
  const showStarfield = variant === "starfield" || variant === "both" || variant === "all";

  const getIntensityOpacity = (base: number) => {
    const multiplier =
      intensity === 'subtle' ? 0.6 : intensity === 'vibrant' ? 1.4 : 1;
    return base * multiplier;
  };

  // Star field configuration based on density
  const getStarConfig = () => {
    const configs = {
      low: { count: 100, maxSize: 2, minSize: 0.5 },
      medium: { count: 200, maxSize: 3, minSize: 0.5 },
      high: { count: 300, maxSize: 4, minSize: 0.5 },
    };
    return configs[starDensity];
  };

  const generateStars = () => {
    const config = getStarConfig();
    const stars = [];

    for (let i = 0; i < config.count; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size =
        Math.random() * (config.maxSize - config.minSize) + config.minSize;
      const opacity = Math.random() * 0.8 + 0.2; // 0.2 to 1.0

      stars.push({ x, y, size, opacity, id: i });
    }

    return stars;
  };

  const stars = React.useMemo(() => generateStars(), [starDensity]);

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
      {showStarfield && (
        <>
          <div className="absolute inset-0 bg-[hsl(var(--starfield-base))]" />

          {/* Random scattered stars */}
          <div className="absolute inset-0 overflow-hidden">
            {stars.map(star => (
              <div
                key={star.id}
                className={cn(
                  'absolute rounded-full bg-[hsl(var(--starfield-star))]',
                  animated && 'animate-pulse'
                )}
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  animationDelay: animated
                    ? `${Math.random() * 3}s`
                    : undefined,
                  animationDuration: animated
                    ? `${2 + Math.random() * 3}s`
                    : undefined,
                }}
              />
            ))}
          </div>

          {/* Subtle gradient overlay for depth using CSS variables */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--starfield-base))]/50 to-[hsl(var(--starfield-dark))]"
            style={{ opacity: 0.7 }}
          />
        </>
      )}
      {/* Enhanced multi-radial gradient system */}
      {showGradient && (
        <div
          className={cn(
            'absolute inset-0',
            animated && 'animate-pulse',
            // Light mode gradients
            `bg-[radial-gradient(1200px_900px_at_15%_10%,hsl(var(--primary)/${getIntensityOpacity(0.08)})_0%,transparent_65%),`,
            `radial-gradient(1000px_800px_at_85%_90%,hsl(var(--secondary,230_90%_60%)/${getIntensityOpacity(0.06)})_0%,transparent_60%),`,
            `radial-gradient(800px_600px_at_50%_50%,hsl(var(--accent,280_100%_70%)/${getIntensityOpacity(0.04)})_0%,transparent_50%)]`,
            // Dark mode gradients
            `dark:bg-[radial-gradient(1200px_900px_at_15%_10%,hsl(var(--primary)/${getIntensityOpacity(0.12)})_0%,transparent_65%),`,
            `radial-gradient(1000px_800px_at_85%_90%,hsl(var(--muted-foreground)/${getIntensityOpacity(0.08)})_0%,transparent_60%),`,
            `radial-gradient(800px_600px_at_50%_50%,hsl(var(--accent,280_100%_70%)/${getIntensityOpacity(0.06)})_0%,transparent_50%)]`
          )}
        />
      )}

      {showMesh && (
        <div
          className={cn(
            'absolute inset-0 opacity-30',
            animated && 'animate-pulse',
            'bg-[conic-gradient(from_0deg_at_50%_50%,hsl(var(--primary)/0.1)_0deg,transparent_60deg,hsl(var(--secondary)/0.05)_120deg,transparent_180deg,hsl(var(--accent)/0.08)_240deg,transparent_300deg)]'
          )}
        />
      )}

      <div
        className={cn(
          'absolute inset-0 opacity-[0.015]',
          'bg-[url(\'data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E\')]'
        )}
      />
    </div>
  );
}

export const starshopBackgrounds = {
  starfield: {
    variant: 'starfield' as const,
    starDensity: 'medium' as const,
    animated: false,
  },

  animatedStarfield: {
    variant: 'starfield' as const,
    starDensity: 'high' as const,
    animated: true,
  },

  minimalStarfield: {
    variant: 'starfield' as const,
    starDensity: 'low' as const,
  },

  minimal: { variant: 'gradient' as const, intensity: 'subtle' as const },
  standard: { variant: 'both' as const, intensity: 'normal' as const },
  premium: {
    variant: 'all' as const,
    intensity: 'vibrant' as const,
    animated: true,
  },
} as const;

export function useBackgroundVariant(
  initialVariant: keyof typeof starshopBackgrounds = 'starfield'
) {
  const [variant, setVariant] = React.useState(initialVariant);

  return {
    variant,
    setVariant,
    props: starshopBackgrounds[variant],
  };
}
