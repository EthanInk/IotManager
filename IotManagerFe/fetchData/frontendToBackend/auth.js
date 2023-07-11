const headers = {
  "Content-Type": "application/json",
};

export async function register(data) {
  return await fetch(`/api/auth/register`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
}

export async function login(data) {
  return await fetch(`/api/auth/login`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
}