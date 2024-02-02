import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie({ pieData }) {
  const seriesData = pieData.map((data, index) => ({
    data,
    name: `Series ${index + 1}`, // Add a name for each series
  }));

  return (
    <PieChart
      colors={["#9FC4FF", "#142E56"]}
      series={seriesData}
      width={350}
      height={350}
    />
  );
}
