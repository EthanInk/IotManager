import { register } from "@/fetchData/backendToApi/auth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const data = await request.json();
  const backendData = await register(data);
  return new NextResponse(JSON.stringify(backendData), {status: backendData.status});
};
