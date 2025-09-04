import { NETWORK_PERFORMANCE_CONTENT } from './constants/network-performance';
import { LiveStatusIndicator } from './components/LiveStatusIndicator';
import { NetworkMetrics } from './components/NetworkMetrics';

export function NetworkPerformance() {
  return (
    <>
      {/* Live Indicator */}
      <LiveStatusIndicator liveStatus={NETWORK_PERFORMANCE_CONTENT.liveStatus} />

      {/* Additional Metrics */}
      <NetworkMetrics
        title={NETWORK_PERFORMANCE_CONTENT.title}
        description={NETWORK_PERFORMANCE_CONTENT.description}
        metrics={NETWORK_PERFORMANCE_CONTENT.metrics}
      />
    </>
  );
}