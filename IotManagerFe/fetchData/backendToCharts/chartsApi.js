import { URLS } from "@/util/baseUrls";
import { testChartData } from "./testData";
import { getAttribute, getAttributeHistory } from "../backendToApi/attribute";

export async function getTestChart() {
  try {
    const url = URLS.CHART_URL;
    const resSvg = await fetch(`${url}/charts/line`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testChartData),
    });
    const graphSVG = await resSvg.text();
    return graphSVG;
  } catch (error) {
    return error;
  }
}

export async function getAttributeChart(attributeId, h, w) {
  try {
    const chartURL = URLS.CHART_URL;
    const backendURL = URLS.CHART_URL;
    const attributeHistory = await getAttributeHistory(attributeId);
    if (attributeHistory.error) return null;

    const attributeHistoryData = [
      {
        id: attributeHistory.body.attribute.name,
        color: "hsl(208, 100%, 51%)",
        data: attributeHistory.body.attributeHistory
          .map((att) => {
            if (
              att.attributeValue &&
              !isNaN(att.attributeValue) &&
              !isNaN(parseFloat(att.attributeValue))
            )
              return { y: Number(att.attributeValue), x: att.timeOfUpdate };
          })
          .filter((att) => att != undefined),
      },
    ];

    const lineGraphData = getLineGraphFormat(attributeHistoryData, h, w);
    lineGraphData.maxY = attributeHistoryData.reduce((max, dataSet)=>{
      const setMax = dataSet.data.reduce((max, att)=> att.y > max ? att.y : max, 0);
      return setMax > max ? setMax : max;
    }, 0) 
    const resSvg = await fetch(`${chartURL}/charts/line`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lineGraphData),
    });
    const graphSVG = await resSvg.text();
    return graphSVG;
  } catch (error) {
    return error;
  }
}

function getLineGraphFormat(data,h,w) {
  return {
    width: w ? w : 1920,
    height: h ? h : 1080,
    minY: 0,
    maxY: 400,
    margin: {
      top: 50,
      right: 50,
      bottom: 200,
      left: 50,
    },
    curve: "linear",
    axisTop: null,
    axisRight: null,
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -90,
      legend: "Date",
      legendOffset: 175,
      legendPosition: "center",
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "center",
    },
    enableGridX: true,
    enableGridY: true,
    lineWidth: 2,
    data,
  };
}
