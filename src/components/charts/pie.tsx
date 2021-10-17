import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartData } from "react-chartjs-2";
interface PieChartProps {
  data: ChartData<any>;
}

const Pie = ({ data }: PieChartProps) => {
  return <Doughnut data={data} />;
};

export default Pie;
