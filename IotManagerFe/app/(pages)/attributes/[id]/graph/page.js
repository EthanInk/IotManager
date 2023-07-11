import { getAttributeChart, getTestChart } from "@/fetchData/backendToCharts/chartsApi";
import React from "react";

const page = async ({ params, searchParams  }) => {
 
  const chartData = await getAttributeChart(params.id, searchParams.h, searchParams.w);
  return <div dangerouslySetInnerHTML={{ __html: chartData }} />;
};

export default page;
