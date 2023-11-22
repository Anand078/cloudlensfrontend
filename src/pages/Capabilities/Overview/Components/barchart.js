import React from "react"
import { Bar } from "react-chartjs-2"
import "chartjs-plugin-datalabels"

function extractTechnology(barData) {
  const techArray = []

  for (const key in barData) {
    if (
      barData.hasOwnProperty(key) &&
      barData[key].hasOwnProperty("technology")
    ) {
      techArray.push(barData[key].technology)
    }
  }
  return techArray
}

function extractCount(barData) {
  const countArray = []

  for (const key in barData) {
    if (barData.hasOwnProperty(key) && barData[key].hasOwnProperty("count")) {
      countArray.push(barData[key].count)
    }
  }
  return countArray
}

const BarChart = ({ barData }) => {
  const techArray = extractTechnology(barData)
  const countArray = extractCount(barData)
  const data = {
    labels: techArray,
    datasets: [
      {
        label: "",
        backgroundColor: "#02a499",
        borderColor: "#02a499",
        borderWidth: 1,
        hoverBackgroundColor: "#02a499",
        hoverBorderColor: "#02a499",
        data: countArray,
      },
    ],
  }

  const option = {
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        align: "end",
        anchor: "end",
        font: { size: "15" },
      },
    },
    tootlbar: {
      show: true,
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex]
          const meta = dataset._meta[Object.keys(dataset._meta)[0]]
          const total = meta.total
          const currentValue = dataset.data[tooltipItem.index]
          const percentage = parseFloat(
            ((currentValue / total) * 100).toFixed(1)
          )
          return currentValue //+ " (" + percentage + "%)"
        },
        title: (tooltipItem, data) => {
          return data.labels[tooltipItem[0].index]
        },
      },
    },
    scales: {
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
      <Bar width={600} height={245} data={data} options={option} />
    </React.Fragment>
  )
}

export default BarChart
