import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartState {
  series: Array<{
    name: string;
    data: number[];
  }>;
  options: ApexOptions;
}

export const SellsPerMoth: React.FC = () => {
  const [state] = React.useState<ChartState>({
    series: [
      {
        name: "Page Views",
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
      },
    ],
    options: {
      chart: {
        height: 300,
        width: 300,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false, // Oculta el menú de opciones
        },
      },
      colors: ["#3E3A77"], // Cambia el color de la línea principal a rojo
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [5],
        curve: "straight",
      },
      legend: {
        show: false, // Oculta las leyendas
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: [
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan",
          "08 Jan",
          "09 Jan",
          "10 Jan",
          "11 Jan",
          "12 Jan",
        ],
        labels: {
          show: false, // Oculta las etiquetas del eje X
        },
      },
      yaxis: {
        labels: {
          show: false, // Oculta las etiquetas del eje Y
        },
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (mins)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " per session";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={200}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
