import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const MonthChart = ({ userConsumptionData }) => {
  const aggregatedData = {};
  const monthsData = {};

  userConsumptionData.forEach((entry) => {
    const { year, month, totalEnergyConsumedPerDay } = entry;
    if (year === new Date().getFullYear()) {
      const fullDate = `${year.toString()}${(month + 1)
        .toString()
        .padStart(2, "0")}`;
      const energyConsumed = Number(totalEnergyConsumedPerDay);

      if (!monthsData[fullDate]) {
        monthsData[fullDate] = { totalConsumption: 0, dayCount: 0 };
      }
      monthsData[fullDate].totalConsumption += energyConsumed;
      monthsData[fullDate].dayCount++;
    }
  });

  for (const month in monthsData) {
    aggregatedData[month] = monthsData[month].totalConsumption;
  }

  function formatMonth(inputMonth) {
    const year = inputMonth.toString().substring(0, 4);
    const month = inputMonth.toString().substring(4, 6);
    const day = inputMonth.toString().substring(6, 8);
    return new Date(year, month, day).toLocaleDateString("en-US", {
      month: "long",
    });
  }

  const sortedMonths = Object.keys(aggregatedData)
    .map((item) => Number(item))
    .sort((a, b) => a - b);

  const labels = sortedMonths.map((month) => formatMonth(month));
  const data = sortedMonths.map((month) => aggregatedData[month]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Energy Consumed per Month",
        data: data,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(210, 180, 140, 0.6)",
          "rgba(128, 128, 0, 0.6)",
          "rgba(255, 69, 0, 0.6)",
          "rgba(0, 255, 255, 0.6)",
          "rgba(255, 192, 203, 0.6)",
          "rgba(0, 128, 0, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(210, 180, 140, 1)",
          "rgba(128, 128, 0, 1)",
          "rgba(255, 69, 0, 1)",
          "rgba(0, 255, 255, 1)",
          "rgba(255, 192, 203, 1)",
          "rgba(0, 128, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Energy Consumption Per Month of Current Year",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Energy Consumed",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12, // Limit the number of visible ticks for better readability
        },
      },
    },
  };

  return (
    <div className="m-auto  w-75">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MonthChart;
