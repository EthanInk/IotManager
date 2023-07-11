import { newControl } from "@/fetchData/backendToApi/crud";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const data = await request.json();
  const backendData = await newControl(data);
  const backendDataBody = await backendData.json();
  return new NextResponse(JSON.stringify(backendDataBody), {status: backendData.status});
};