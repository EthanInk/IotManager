import { deleteControl } from "@/fetchData/backendToApi/crud";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  const data = await request.json();
  const backendData = await deleteControl(data);
  return new NextResponse(undefined, {
    status: backendData.status,
  });
};