const DEFAULT_API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE_URL;

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export async function apiFetch(path, options = {}) {
  const response = await fetch(apiUrl(path), options);
  const contentType = response.headers.get("content-type") || "";
  const bodyText = await response.text();
  const isJson =
    contentType.includes("application/json") ||
    bodyText.trim().startsWith("{") ||
    bodyText.trim().startsWith("[");

  let data = null;

  if (bodyText) {
    if (!isJson) {
      const snippet = bodyText.trim().slice(0, 200);
      throw new Error(`Unexpected server response: ${snippet}`);
    }

    try {
      data = JSON.parse(bodyText);
    } catch (error) {
      throw new Error(
        `Invalid JSON response from ${path}: ${bodyText.trim().slice(0, 200)}`
      );
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    );
  }

  return data;
}
