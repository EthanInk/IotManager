import { getDevices } from "@/fetchData/backendToApi/crud";
import { NextResponse } from "next/server";

export const GET = async () => {
  const backendData = await getDevices();
  return new NextResponse( backendData.body ? backendData.body : undefined, {status: backendData.status});
};