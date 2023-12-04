import React from "react"
import { Bar } from "react-chartjs-2"
import "chartjs-plugin-datalabels"

const BarChart = () => {
  const dataValues = [5, 7, 3, 2, 6, 4]
  const total = dataValues.reduce((acc, value) => acc + value, 0)
  const data = {
    labels: [
      "Cost Optimization",
      "Security",
      "Operations",
      "Reliability",
      "Sustainability",
      "Performance",
    ],
    datasets: [
      {
        label: "",
        backgroundColor: "#626ed4",
        borderColor: "#626ed4",
        borderWidth: 1,
        hoverBackgroundColor: "#626ed4",
        hoverBorderColor: "#626ed4",
        data: [5, 7, 3, 2, 6, 4],
      },
    ],
  }

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        align: "end",
        anchor: "end",
        font: { size: "15" },
        formatter: (value, context) => {
         
          return value
        },
      },
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex]
          const currentValue = dataset.data[tooltipItem.index]
          const percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          )
          return currentValue + " (" + percentage + "%)"
        },
        title: (tooltipItem, data) => {
          return data.labels[tooltipItem[0].index]
        },
      },
    },
    scales: {
      xAxes: [
        {
          barPercentage: 0.6,
          categoryPercentage: 0.7,
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
          },
        },
      ],
    },
  }

  return (
    <React.Fragment>
      <Bar width={700} height={400} data={data} options={options} />
    </React.Fragment>
  )
}

export default BarChart
