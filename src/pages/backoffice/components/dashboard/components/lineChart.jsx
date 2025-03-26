// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import "../chartConfig"

function LineChart({ chartData, desc, title }) {

  const options = {
    plugins: {
      title: {
        display: true,
        text: desc
      },
      legend: {
        display: false
      },
    },
    maintainAspectRatio: false
  };

  return (
    <div className="w-full min-h-[300px] max-h-[400px] flex items-center">
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      <Line
        data={chartData}
        width={100}
        height={100}
        options={options}
      />
    </div>
  );
}
export default LineChart;