import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export const getCsrfCookie = async () => {
  try {
    await apiClient.get("/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Failed to get CSRF cookie:", error);
    throw error;
  }
};

export function getCookie(name) {
  if (typeof document === "undefined") return null;
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export default apiClient;
