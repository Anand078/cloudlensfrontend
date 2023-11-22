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

const Doughnut = ({ accOverviewdata }) => {
  const formattedData = accOverviewdata?.map(item => {
    return { name: item.account, value: item.count }
  })

  const accountArray = extractAccount(accOverviewdata)

  const colors = ColorPicker(accOverviewdata?.length)
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
          name: "Accounts",
          type: "pie",
          radius: ["50%", "70%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: true,
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
