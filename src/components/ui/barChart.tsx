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

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year[2]}${year[3]}`;
  };

  const groupByDay = (data: any) => {
    return data.reduce((acc: any, item: any) => {
      const date = new Date(item.created_at).toISOString().split("T")[0];
      const formattedDate = formatDate(date);

      if (!acc[formattedDate]) {
        acc[formattedDate] = { in: [], out: [], transfer: [] };
      }

      if (item.type === "in") {
        acc[formattedDate].in.push(1);
      } else if (item.type === "out") {
        acc[formattedDate].out.push(1);
      } else if (item.type === "transfer") {
        acc[formattedDate].transfer.push(1);
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

  const labels = Object.keys(groupedData).reverse();

  const inData = labels.map((date) => {
    return groupedData[date].in.reduce(
      (acc: number, val: number) => acc + val,
      0
    );
  });

  const outData = labels.map((date) => {
    return groupedData[date].out.reduce(
      (acc: number, val: number) => acc + val,
      0
    );
  });

  const transferData = labels.map((date) => {
    return groupedData[date].transfer.reduce(
      (acc: number, val: number) => acc + val,
      0
    );
  });

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

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
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
    <div className="w-full h-96 flex justify-center">
      <Chart type="bar" data={chartData} options={options} />{" "}
    </div>
  );
};

export default BarLineChart;
