const headers = {
  "Content-Type": "application/json",
};

export async function newDevice(data, token) {
  return await fetch(`/api/devices/new`, {
    method: "POST",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function updateDevice(data, token) {
  return await fetch(`/api/devices/update`, {
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function newControl(data, token) {
  return await fetch(`/api/controls/new`, {
    method: "POST",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function updateControl(data, token) {
  return await fetch(`/api/controls/update`, {
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function newAttribute(data, token) {
  return await fetch(`/api/attributes/new`, {
    method: "POST",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function updateAttribute(data, token) {
  return await fetch(`/api/attributes/new`, {
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function getDevices(token) {
  let res;
  try {
    res = await fetch("/api/devices", {
      headers: { ...headers, Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error);
  }
  return res;
}
