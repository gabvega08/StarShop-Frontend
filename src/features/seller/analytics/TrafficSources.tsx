'use client';
import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Filter } from 'lucide-react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const trafficData = [
  { name: 'Direct', value: 50, color: '#8B5CF6' },
  { name: 'Social', value: 30, color: '#3B82F6' },
  { name: 'Search', value: 0, color: '#10B981' },
  { name: 'Referral', value: 20, color: '#F59E0B' },
];

const TrafficSources = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filteredTrafficData = trafficData.filter(item => item.value > 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = 'transparent';
    ctx.beginPath();
    ctx.arc(rect.width / 2, rect.height / 2, rect.width / 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    const numDots = 100;
    for (let i = 0; i < numDots; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const size = Math.random() * 1.5 + 0.5;

      const dx = x - rect.width / 2;
      const dy = y - rect.height / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < rect.width / 2) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }, []);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'pie',
      toolbar: { show: false },
      animations: { enabled: false },
    },
    colors: filteredTrafficData.map(() => 'transparent'),
    labels: filteredTrafficData.map(item => item.name),
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      colors: ['#FFFFFF'],
      width: 3,
      dashArray: 0,
    },
    fill: {
      type: 'solid',
      opacity: 0,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        expandOnClick: false,
        customScale: 1,
        offsetX: 0,
        offsetY: 0,
        donut: {
          size: '0%',
          background: 'transparent',
        },
      },
    },
    states: {
      hover: { filter: { type: 'none' } },
    },
    legend: { show: false },
  };

  return (
    <div className="rounded-lg p-6 border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)] bg-gray-900/50">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-white text-lg font-medium">Traffic Sources</h3>
          <p className="text-gray-400 text-sm">
            Where your visitors are coming from
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-300">
          <Filter size={18} />
        </button>
      </div>

      <div className="flex items-center">
        <div className="relative h-[250px] w-[250px] mx-auto">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
          />
          <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <Chart
              type="pie"
              width="100%"
              height="100%"
              options={chartOptions}
              series={filteredTrafficData.map(item => item.value)}
            />
          </div>
        </div>

        <div className="space-y-6 w-1/2">
          {trafficData.map(source => (
            <div key={source.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: source.color }}
                  ></div>
                  <span className="text-gray-300">{source.name}</span>
                </div>
                <span className="text-white font-medium">{source.value}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-800 rounded-full">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${source.value}%`,
                    backgroundColor: source.color,
                  }}
                ></div>
              </div>
            </div>
          ))}

          <button className="w-full mt-6 bg-gray-900/70 backdrop-blur-sm hover:bg-gray-800/70 text-white py-2 rounded-md text-sm font-medium border border-white/10">
            View Traffic Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrafficSources;
