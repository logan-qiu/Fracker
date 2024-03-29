"use client";

import ReactECharts from "echarts-for-react";

const Overview = () => {
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      // this can be passed from api
      data: ["Jan", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        // this can be passed from api
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "bar",
        smooth: true,
        itemStyle: {
          opacity: 0.5,
        },
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return <ReactECharts style={{height: '340px'}} option={options} />;
};

export default Overview;
