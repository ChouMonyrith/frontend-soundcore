import apiClient, { getCookie, getCsrfCookie } from "@/app/lib/api";

export const categoriesService = {
  async getCategories() {
    if (typeof document !== "undefined") {
      await getCsrfCookie();
    }
    const xsrf = getCookie("XSRF-TOKEN");

    const headers = {
      Accept: "application/json",
    };

    if (xsrf) {
      headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrf);
    }

    const response = await apiClient.get("/api/categories", {
      headers,
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch categories");
    }

    return response.data.data;
  },
};
