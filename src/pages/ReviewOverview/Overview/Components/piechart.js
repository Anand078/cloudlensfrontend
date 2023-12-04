import React from "react"
import ReactEcharts from "echarts-for-react"

const Pie = () => {
  const getOption = () => ({
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      left: "left",
      data: [
        "Cost Optimization",
        "Security",
        "Operations",
        "Reliability",
        "Sustainability",
        "Performance",
      ],
      textStyle: {
        color: ["#74788d"],
      },
    },
    color: ["#02a499", "#f8b425", "#ec4561", "#38a4f8", "#3c4ccf", "#000000"],
    series: [
      {
        name: "Total sales",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 35, name: "Cost Optimization" },
          { value: 40, name: "Security" },
          { value: 45, name: "Operations" },
          { value: 22, name: "Reliability" },
          { value: 10, name: "Sustainability" },
          { value: 18, name: "Performance" },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  })

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "400px" }} option={getOption()} />
    </React.Fragment>
  )
}

export default Pie
