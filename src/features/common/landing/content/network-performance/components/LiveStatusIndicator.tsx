import { LiveStatus } from '../constants/network-performance';

interface LiveStatusIndicatorProps {
  liveStatus: LiveStatus;
}

export function LiveStatusIndicator({ liveStatus }: LiveStatusIndicatorProps) {
  return (
    <div className="mt-16 text-center">
      <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-green-400/30">
        <div className={`w-3 h-3 ${liveStatus.color} rounded-full animate-pulse mr-3`}></div>
        <span className="text-green-300 font-semibold">
          {liveStatus.text}
        </span>
      </div>
    </div>
  );
}