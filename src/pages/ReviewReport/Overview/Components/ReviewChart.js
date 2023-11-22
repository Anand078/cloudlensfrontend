import React from "react"
import ChartistGraph from "react-chartist"
import "./RROverview.css" // Assuming you have your styles in this file
import Chartist from "chartist";

const ReviewChart = () => {
  const barChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [
      {
        className: "custom-bar-1",
        data: [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
      },
      {
        className: "custom-bar-2",
        data: [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4],
      },
      {
        className: "custom-bar-3",
        data: [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4],
      },
    ],
  }

  const barChartOptions = {
    low: 0,
    showArea: true,
    horizontalBars: true, // Set this to true to make bars horizontal
    seriesBarDistance: 3, // Adjust this value to ensure visibility
  }

  return (
    <>
      <ChartistGraph
        style={{ height: "300px" }}
        data={barChartData}
        options={barChartOptions}
        type={"Bar"}
      />
    </>
  )
}

export default ReviewChart
