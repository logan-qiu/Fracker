"use client";

import ReactECharts from "echarts-for-react";

const timeStamps = ["Jan", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
const values = [820, 932, 901, 934, 1290, 1330, 1320];

const Overview = () => {
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      // this can be passed from api
      data: timeStamps,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        // this can be passed from api
        data: values,
        type: "bar",
        smooth: true,
        itemStyle: {
          color: "#111827",
        },
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return <ReactECharts style={{ height: "340px" }} option={options} />;
};

export default Overview;
