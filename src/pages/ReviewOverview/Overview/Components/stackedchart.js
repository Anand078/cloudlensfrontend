import React from "react"
import ReactApexChart from "react-apexcharts"

const ResponseBreakDown = () => {
  const state = {
    series: [
      {
        name: "Compliant",
        data: [40, 50, 40, 35, 25, 40],
      },
      {
        name: "Non Compliant",
        data: [25, 30, 20, 30, 25, 45],
      },
      {
        name: "Not Applicable",
        data: [35, 20, 40, 35, 50, 15],
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
            val = val + "%"
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
