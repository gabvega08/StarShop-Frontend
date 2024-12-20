import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartState {
  series: number[];
  options: ApexOptions;
}

export const SellsPerMonth: React.FC = () => {
  const [state] = React.useState<ChartState>({
    series: [18, 22, 19, 27, 23, 20, 25, 31, 24, 28, 26, 30],
    options: {
      chart: {
        type: "donut",
        background: 'transparent',
      },
      colors: ['#f8b4d9', '#fbd38d', '#90cdf4', '#9ae6b4', '#e9d8fd', '#a3bffa', 
               '#faf089', '#feb2b2', '#c6f6d5', '#d6bcfa', '#fed7d7', '#fefcbf'],
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "right",
        offsetY: 0,
        height: 150,
        fontSize: '12px',
        labels: {
          colors: "#fff",
        },
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val.toString() + " sales";
          },
        },
        theme: "dark",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              value: {
                fontSize: '16px',
                color: '#fff',
              },
            }
          },
          startAngle: -90,
          endAngle: 270,
        },
      },
      stroke: {
        width: 0
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  });

  return (
      <div id="chart" className="[&_::-webkit-scrollbar]:bg-white/10 [&_::-webkit-scrollbar-thumb]:bg-white/30 [&_::-webkit-scrollbar]:w-1 [&_::-webkit-scrollbar]:h-1">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          height={180}
          width="100%"
        />
    </div>
  );
};

