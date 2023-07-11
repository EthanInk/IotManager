import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { URLS } from "@/util/baseUrls";
import { getServerSession } from "next-auth";

export async function newDevice(data) {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/devices`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}

export async function updateDevice(data) {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/devices`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}

export async function deleteDevice(data) {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/devices`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}

export async function newControl(data) {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/controls`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}

export async function updateControl(data) {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/controls`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}

export async function deleteControl(data) {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/controls`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}

export async function newAttribute(data) {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/attributes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}

export async function updateAttribute(data) {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/attributes`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}

export async function deleteAttribute(data) {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/attributes`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}

export async function getDevices() {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/devices`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}

export async function getSingleDevice(id) {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/devices/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}

export async function getAttributeGraph() {
  try {
    const url = URLS.BACKEND_URL;
    const session = await getServerSession(authOptions);
    const res = await fetch(`${url}/api/v1/devices`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "Content-Type": "application/json",
      },
    });
    return { body: await res.json(), status: res.status };
  } catch (error) {
    return { message: error, status: 500 };
  }
}
