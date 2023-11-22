import React from "react"
import ReactEcharts from "echarts-for-react"
import { ColorPicker } from "utils/color"

function extractAccount(accOverviewdata) {
  const accountArray = []

  for (const key in accOverviewdata) {
    if (
      accOverviewdata.hasOwnProperty(key) &&
      accOverviewdata[key].hasOwnProperty("account")
    ) {
      accountArray.push(accOverviewdata[key].account)
    }
  }

  return accountArray
}

const Pie = ({ accOverviewdata }) => {
  const formattedData = accOverviewdata?.map(item => {
    return { name: item.account, value: item.count }
  })

  const accountArray = extractAccount(accOverviewdata)

  const colors = ColorPicker(accOverviewdata?.length)
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
          name: "Accounts",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          avoidLabelOverlap: true,
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
