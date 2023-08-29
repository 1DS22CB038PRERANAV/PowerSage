import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DayChart = ({ userConsumptionData }) => {
  const aggregatedData = {};
  userConsumptionData.forEach((entry) => {
    const { year, month, date } = entry;
    const fullDate = `${year.toString()}${(month + 1)
      .toString()
      .padStart(2, "0")}${date.toString().padStart(2, "0")}`; // Adjust month since it's zero-based
    const energyConsumed = Number(entry.totalEnergyConsumedPerDay);

    if (aggregatedData.hasOwnProperty(fullDate)) {
      aggregatedData[fullDate] += energyConsumed;
    } else {
      aggregatedData[fullDate] = energyConsumed;
    }
  });

  function formatDate(inputDate) {
    const year = inputDate.toString().substring(0, 4);
    const month = inputDate.toString().substring(4, 6);
    const day = inputDate.toString().substring(6, 8);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
  // Sort the keys (dates) in ascending order
  const sortedDates = Object.keys(aggregatedData)
    .map((item) => Number(item))
    .sort((a, b) => a - b);

  // Create arrays for chart data
  const labels = sortedDates.map((date) => formatDate(date));
  const data = sortedDates.map((date) => aggregatedData[date]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Energy Consumed per Day",
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
        text: "Energy Consumption Per Day",
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
          text: "Date",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10, // Limit the number of visible ticks for better readability
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

export default DayChart;
