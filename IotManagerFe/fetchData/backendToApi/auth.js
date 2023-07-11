import { URLS } from "@/util/baseUrls";

export async function login(data) {
  try {
    const url = URLS.BACKEND_URL;
    const res = await fetch(`${url}/api/v1/security/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await res.json();
    return { ...newData, status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}

export async function register(data) {
  try {
    const url = URLS.BACKEND_URL;
    const res = await fetch(`${url}/api/v1/security/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await res.json();
    return { ...newData, status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}
