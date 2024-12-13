import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartState {
  series: number[];
  options: ApexOptions;
}

export const SellsPerMoth: React.FC = () => {
  const [state] = React.useState<ChartState>({
    series: [25, 15, 30, 20, 10], // Datos para cada medida
    options: {
      chart: {
        type: "donut", // Cambiar a gráfico tipo donut
        height: 400,
        width: 400,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false, // Ocultar el menú de opciones
        },
      },
      colors: ["#3E3A77", "#FF7F50", "#3BB9FF", "#9C27B0", "#FFEB3B"], // Colores personalizados
      labels: ["Trustless Work", "SotNet", "Safetrust", "ScanGuard", "Other"], // Las 5 medidas
      dataLabels: {
        enabled: false, // Desactivar los porcentajes sobre el gráfico
      },
      stroke: {
        width: 0, // Eliminar borde entre las secciones
      },
      legend: {
        position: "right", // Colocar la leyenda al lado derecho
        labels: {
          colors: "#fff", // Color de la leyenda
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val}`; // Mostrar el valor sin porcentaje
          },
        },
      },
      grid: {
        show: false, // Desactivar la cuadrícula
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
