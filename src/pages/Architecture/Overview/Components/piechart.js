import React from "react"
import ReactEcharts from "echarts-for-react"
import { ColorPicker } from "utils/color"

function extractAccount(piedata) {
  const accountArray = []

  for (const key in piedata) {
    if (
        piedata.hasOwnProperty(key) &&
        piedata[key].hasOwnProperty("status")
    ) {
        accountArray.push(piedata[key].status)
    }
  }

  return accountArray
}

const Pie = ({ piedata }) => {
  const formattedData = piedata?.map(item => {
    return { name: item.status, value: item.count }
  })

  const accountArray = extractAccount(piedata)

  const colors = ColorPicker(piedata?.length)
  const getOption = () => {
    return {
      toolbox: {
        show: false,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: accountArray,
        textStyle: {
          color: ["#74788d"],
        },
      },
      color: colors,
      series: [
        {
          name: "Status",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: formattedData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    }
  }

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "350px" }} option={getOption()} />
    </React.Fragment>
  )
}

export default Pie
