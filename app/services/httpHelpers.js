import { getCookie, getCsrfCookie } from "@/app/lib/api";

export async function getCsrfHeaders() {
  await getCsrfCookie();
  const xsrfToken = getCookie("XSRF-TOKEN");

  if (!xsrfToken) {
    throw new Error("XSRF-TOKEN cookie not found.");
  }

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
  };
}
