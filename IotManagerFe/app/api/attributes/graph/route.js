import { newAttribute } from "@/fetchData/backendToApi/crud";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const data = await request.json();
  const backendData = await newAttribute(data);
  const backendDataBody = await backendData.json();
  return new NextResponse(JSON.stringify(backendDataBody), {status: backendData.status});
};