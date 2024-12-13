import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartState {
  series: number[];
  options: ApexOptions;
}

export const SellsPerMonth: React.FC = () => {
  const [state] = React.useState<ChartState>({
    series: [25, 15, 30, 20, 10],
    options: {
      chart: {
        type: "donut",
        height: 400,
        width: 400,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#3E3A77", "#FF7F50", "#3BB9FF", "#9C27B0", "#FFEB3B"],
      labels: ["Trustless Work", "SotNet", "Safetrust", "ScanGuard", "Other"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legend: {
        position: "right",
        labels: {
          colors: "#fff",
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val}`;
          },
        },
      },
      grid: {
        show: false,
      },
    },
  });

  return (
    <div>
      <div id="chart" className="mt-6">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          height={400}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
