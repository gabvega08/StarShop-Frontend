import { useState, useEffect } from 'react';
import { NetworkMetric } from '../constants/network-performance';

interface NetworkMetricsProps {
  title: string;
  description: string;
  metrics: NetworkMetric[];
}

const CountUpNumber = ({
  value,
  duration = 1500,
}: {
  value: number;
  duration?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Use easing function for smoother animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeOutCubic * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration, hasStarted]);

  // Start animation when component comes into view
  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return <span>{displayValue.toLocaleString()}</span>;
};

export function NetworkMetrics({
  title,
  description,
  metrics,
}: NetworkMetricsProps) {
  return (
    <div className="mt-16 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-3xl p-12 text-white">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p className="text-xl opacity-90">{description}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="text-3xl font-bold mb-2">
              {metric.prefix}
              <CountUpNumber value={metric.value} />
              {metric.suffix}
            </div>
            <div className="text-lg opacity-90">{metric.label}</div>
          </div>
        ))}
      </div>
         
    </div>
  );
}
