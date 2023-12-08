import React from "react"
import ReactApexChart from "react-apexcharts"

const ResponseBreakDown = () => {
  const state = {
    series: [
      {
        name: "Compliant",
        data: [25, 28, 21, 55, 28, 40],
      },
      {
        name: "Non Compliant",
        data: [71, 61, 54, 33, 36, 43],
      },

      {
        name: "Not Applicable",
        data: [4, 11, 25, 12, 36, 17],
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
      colors: ["#00E895", "#E34F68", "#e3e0e0"],
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
