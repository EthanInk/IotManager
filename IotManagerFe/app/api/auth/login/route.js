import URLS from "@/util/baseUrls";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const data = await request.json();
  try {
    const res = await fetch(`${URLS.BACKEND_URL}/api/v1/security/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await res.json();
    if(!res.ok) throw {message: newData.error, status: res.status};
    return NextResponse.json(newData);
  } catch (error) {
    return new NextResponse(JSON.stringify({errorMessage: error.message}), {status: error.status});
  }
};
