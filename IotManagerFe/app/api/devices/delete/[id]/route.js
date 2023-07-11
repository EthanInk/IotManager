import { deleteDevice } from "@/fetchData/backendToApi/crud";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  const data = await request.json();
  const backendData = await deleteDevice(data);
  return new NextResponse(undefined, {
    status: backendData.status,
  });
};