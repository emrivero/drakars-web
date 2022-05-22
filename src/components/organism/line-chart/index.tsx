import { useTheme } from "@mui/material";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import moment from "moment";
import { FC } from "react";
import { Line } from "react-chartjs-2";

export const LineChart: FC = () => {
  const theme = useTheme();
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const currentMoment = moment().month();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const data: ChartData<"line", number[], string> = {
    labels: labels.slice(0, currentMoment),
    datasets: [
      {
        label: "Dataset 1",
        data: [400, 300, 400, 200],
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };
  return <Line options={options} data={data} />;
};
