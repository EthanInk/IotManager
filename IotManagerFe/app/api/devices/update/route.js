import { updateDevice } from "@/fetchData/backendToApi/crud";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
  const data = await request.json();
  const backendData = await updateDevice(data);
  const backendDataBody = await backendData.json();
  return new NextResponse(JSON.stringify(backendDataBody), {status: backendData.status});
};
