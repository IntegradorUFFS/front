import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LinearScale, CategoryScale, BarElement, Tooltip, Legend);

interface DataItem {
  id: string;
  quantity: number;
  created_at: string;
  type: string;
  material: {
    id: string;
    name: string;
    description: string;
    quantity: number;
  };
  origin: { id: string | null; name: string | null };
  destiny: { id: string | null; name: string | null };
}

interface ChartDataProps {
  data: DataItem[];
}

const BarLineChart: React.FC<ChartDataProps> = ({ data }) => {
  const [groupedData, setGroupedData] = useState<any>({});

  // Função para agrupar os dados por dia
  const groupByDay = (data: any) => {
    return data.reduce((acc: any, item: any) => {
      const date = new Date(item.created_at).toISOString().split("T")[0]; // Extrai a data sem o tempo

      if (!acc[date]) {
        acc[date] = { in: [], out: [], transfer: [] };
      }

      // Adiciona a quantidade ao tipo correspondente
      if (item.type === "in") {
        acc[date].in.push(item.quantity);
      } else if (item.type === "out") {
        acc[date].out.push(item.quantity);
      } else if (item.type === "transfer") {
        acc[date].transfer.push(item.quantity);
      }

      return acc;
    }, {});
  };

  useEffect(() => {
    if (data) {
      const grouped = groupByDay(data);
      setGroupedData(grouped);
    }
  }, [data]);

  // Geração das labels a partir das chaves do groupedData
  const labels = Object.keys(groupedData);

  // Calculando as quantidades para cada tipo por data
  const inData = labels.map((date) => {
    return groupedData[date].in.reduce(
      (acc: number, val: number) => acc + val,
      0
    ); // Soma de todas as entradas para a data
  });

  const outData = labels.map((date) => {
    return groupedData[date].out.reduce(
      (acc: number, val: number) => acc + val,
      0
    ); // Soma de todas as saídas para a data
  });

  const transferData = labels.map((date) => {
    return groupedData[date].transfer.reduce(
      (acc: number, val: number) => acc + val,
      0
    ); // Soma de todas as transferências para a data
  });

  // Configuração dos dados do gráfico
  const chartData = {
    labels,
    datasets: [
      {
        label: "Entrada",
        data: inData,
        backgroundColor: "#006e7fb3",
        borderColor: "#006e7f",
        borderWidth: 1,
      },
      {
        label: "Saída",
        data: outData,
        backgroundColor: "#b22727b3",
        borderColor: "#b22727",
        borderWidth: 1,
      },
      {
        label: "Transferências",
        data: transferData,
        backgroundColor: "#ee5007b3",
        borderColor: "#ee5007",
        borderWidth: 1,
      },
    ],
  };

  // Configuração das opções do gráfico
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Remove a grade do eixo X
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Remove a grade do eixo Y
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-96">
      <Chart type="bar" data={chartData} options={options} />{" "}
    </div>
  );
};

export default BarLineChart;
