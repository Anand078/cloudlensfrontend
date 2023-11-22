import React from "react"
import ReactApexChart from "react-apexcharts"

const ReviewPillarChart = () => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: ["#3c4ccf", "#02a499", "#0e8cfe"],
    plotOptions: {
      bar: {
        columnWidth: "45%",
        dataLabels: {
          show: false,
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#f8f8fa",
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
    stroke: {
      show: true,
      width: 1.5,
      colors: ["#fff"],
    },
    xaxis: {
      categories: [2011, 2012, 2013, 2014, 2015, 2016],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  }

  const series = [
    {
      name: "Series A",
      data: [100, 75, 50, 75, 50, 75],
    },
    {
      name: "Series B",
      data: [90, 65, 40, 65, 40, 65],
    },
    {
      name: "Series c",
      data: [100, 75, 50, 75, 50, 75],
    },
  ]

  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="290"
      />
    </>
  )
}

export default ReviewPillarChart
