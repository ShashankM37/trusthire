const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://trusthire-backend-fbpj.onrender.com";

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}
