import React from "react"
import ReactEcharts from "echarts-for-react"
import { ColorPicker } from "utils/color"

function extractAccount(piedata) {
  const accountArray = []

  for (const key in piedata) {
    if (piedata.hasOwnProperty(key) && piedata[key].hasOwnProperty("status")) {
      accountArray.push(piedata[key].status)
    }
  }

  return accountArray
}

const Doughnut = ({ piedata }) => {
  const formattedData = piedata?.map(item => {
    return { name: item.status, value: item.count }
  })

  const accountArray = extractAccount(piedata)

  const colors = ColorPicker(piedata?.length)
  const getOption = () => {
    return {
      toolbox: {
        show: true,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        x: "left",
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
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center",
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold",
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: formattedData,
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

export default Doughnut
