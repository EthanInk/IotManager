import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { URLS } from "@/util/baseUrls";
import { getServerSession } from "next-auth";

export async function getAttribute(attributeId) {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/attributes/${attributeId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { error, status: 500 };
  }
}

export async function getAttributePublicAccessToken(token) {
  try {
    const url = URLS.BACKEND_URL;
    const res = await fetch(`${url}/api/v1/attributes//token/${token}/history`);
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { error, status: 500 };
  }
}

export async function getAttributeHistory(attributeId) {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/attributes/${attributeId}/history`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { error, status: 500 };
  }
}
