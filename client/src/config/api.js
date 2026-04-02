export const API_BASE =
  typeof __BACKEND_URL__ !== "undefined"
    ? __BACKEND_URL__
    : "http://localhost:5800";

export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}
