export const API_BASE = "http://localhost:5000";

export async function apiGet(url: string, token?: string) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "no-store",
  });
  return res.json();
}
