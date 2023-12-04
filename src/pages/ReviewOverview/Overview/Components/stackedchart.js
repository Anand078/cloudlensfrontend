import React from "react"
import ReactApexChart from "react-apexcharts"

const ApexChart = () => {
  const state = {
    series: [
      {
        name: "Compliant",
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: "Non Compliant",
        data: [53, 32, 33, 52, 13, 43, 32],
      },
      {
        name: "Not Applicable",
        data: [12, 17, 11, 9, 15, 11, 20],
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
          dataLabels: {
            position: "center",
            style: {
              colors: ["#fff"],
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "100% Stacked Bar",
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
            return val + "%"
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
      colors: ["#02a499", "#bf300f", "#8c8482"],
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

export default ApexChart
