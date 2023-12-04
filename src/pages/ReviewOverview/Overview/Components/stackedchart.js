import React from "react"
import ReactApexChart from "react-apexcharts"

const ResponseBreakDown = () => {
  const state = {
    series: [
      {
        name: "Compliant",
        data: [44, 55, 41, 37, 22, 43],
      },
      {
        name: "Non Compliant",
        data: [53, 32, 33, 52, 13, 43],
      },
      {
        name: "Not Applicable",
        data: [12, 17, 11, 9, 15, 11],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "25%",
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#ffffff", "#ffffff", "#ffffff"],
        },
        offsetY: -15,
      },
      xaxis: {
        categories: [
          "Cost Optimization",
          "Security",
          "Operations",
          "Reliability",
          "Sustainability",
          "Performance",
        ],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
        offsetX: 100,
      },
      colors: ["#E34F68", "#00E895", "#e3e0e0"],
    },
  }

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </div>
  )
}

export default ResponseBreakDown
