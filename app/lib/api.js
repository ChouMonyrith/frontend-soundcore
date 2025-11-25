import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// Function to get CSRF cookie (needed for Sanctum)
export const getCsrfCookie = async () => {
  try {
    // This call sets the CSRF cookie in the browser
    await apiClient.get("/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Failed to get CSRF cookie:", error);
    throw error;
  }
};

export function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export default apiClient;
