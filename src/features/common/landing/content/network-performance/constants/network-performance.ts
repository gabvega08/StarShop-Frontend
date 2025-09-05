export interface NetworkMetric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export interface LiveStatus {
  icon: string;
  text: string;
  color: string;
}

export interface NetworkPerformanceContent {
  liveStatus: LiveStatus;
  title: string;
  description: string;
  metrics: NetworkMetric[];
}

export const NETWORK_PERFORMANCE_CONTENT: NetworkPerformanceContent = {
  liveStatus: {
    icon: '●',
    text: 'Live Network Status: All Systems Operational',
    color: 'bg-green-400',
  },
  title: 'Network Performance',
  description:
    'Stellar blockchain delivering exceptional speed and reliability',
  metrics: [
    {
      value: 3,
      suffix: 's',
      label: 'Avg. Transaction Time',
    },
    {
      value: 99,
      prefix: '99.',
      suffix: '%',
      label: 'Uptime',
    },
    {
      value: 1,
      prefix: '$0.0',
      suffix: '',
      label: 'Transaction Fee',
    },
    {
      value: 24,
      suffix: '/7',
      label: 'Network Availability',
    },
  ],
};
