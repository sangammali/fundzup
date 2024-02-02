import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  xAxis: [
    {
      label: "Amount in ₹",
    },
  ],
  width: 400,
  height: 300,
};

const valueFormatter = (value) => `${value}`;

export default function CombinedBar({ investmentChart }) {
  // Check if investmentChart is iterable (an array)
  if (!Array.isArray(investmentChart) || investmentChart.length === 0) {
    // Handle the case where investmentChart is not iterable or empty
    return <div>No data to display</div>;
  }

  // Assuming investmentChart is an array of objects with "category", "profit", and "amount" properties
  const dataset = investmentChart.map((item, index) => ({
    ...item,
    category: `${index}`, // You might want to provide a proper category here
  }));

  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: "band", dataKey: "category" }]}
      series={[
        {
          dataKey: "profit",
          valueFormatter,
          barSize: "10px",
          color: "#142E56",
          barGap: 2,
          barCategoryGap: "20%",
        },
        {
          dataKey: "amount",
          valueFormatter,
          barSize: "10px",
          barWidth: "5px",
          color: "#9FC4FF",
          barGap: 2,
          barCategoryGap: "20%",
        },
      ]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}
