export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api";

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;
