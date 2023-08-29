import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ userConsumptionData }) => {
  const categoryTotals = {
    ESSENTIAL: 0,
    KITCHEN: 0,
    LAUNDRY: 0,
    ENTERTAINMENT: 0,
    OTHER: 0,
  };

  userConsumptionData.forEach((entry) => {
    entry.energyConsumedData.forEach((appliance) => {
      const category = appliance.category;
      const energyConsumed = Number(appliance.energyConsumed);

      if (category in categoryTotals) {
        categoryTotals[category] += energyConsumed;
      }
    });
  });
  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Energy Consumed by Category",
        data: data,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
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
        text: "Energy Consumption by Category (Pie Chart)",
      },
    },
  };

  return (
    <div className="m-auto" style={{width : "45%"}}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default CategoryChart;
