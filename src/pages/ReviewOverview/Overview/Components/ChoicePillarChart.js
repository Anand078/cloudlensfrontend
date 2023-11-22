import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const ChoicePillarChart = () => {
  const data = {
    labels: [
      "Operational Excellence",
      "Reliability",
      "Security",
      "Cost Optimization",
      "Performance",
      "Sustainability",
    ],
    datasets: [
      {
        backgroundColor: "#108dff", // Change the bar color
        borderColor: "#108dff", // Change the border color
        borderWidth: 20, // Increase the bar width
        hoverBackgroundColor: "#108dff", // Change the hover background color
        hoverBorderColor: "#108dff", // Change the hover border color
        data: [80, 68, 66, 50, 43, 29],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        align: "end",
        anchor: "end",
        font: { size: "15" },
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const currentValue = dataset.data[tooltipItem.index];
          return currentValue
        },
        title: (tooltipItem, data) => {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: false, // Remove x-axis grid lines
          },
        },
      ],
      yAxes: [
        {
          categoryPercentage: 0.7, // Adjust the category percentage to control the bar height
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: false, // Remove y-axis grid lines
          },
        },
      ],
    },
  };

  return (
    <React.Fragment>
      <HorizontalBar width={600} height={545} data={data} options={options} />
    </React.Fragment>
  );
};

export default ChoicePillarChart;
