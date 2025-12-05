import apiClient, { getCookie, getCsrfCookie } from "@/app/lib/api";
import { authService } from "./authService";

export const productService = {
  async uploadProduct(formData) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error(
        "XSRF-TOKEN cookie not found after fetching CSRF cookie."
      );
    }

    console.log(formData);
    const response = await apiClient.post("/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      },
      withCredentials: true,
    });

    return response.data;
  },

  async getProducts(filters) {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        if (key === "category" && value === "All") return;
        params.append(key, value);
      });
    }

    const response = await apiClient.get("/api/products", {
      params,
    });

    const data = response.data;
    return Array.isArray(data) ? data : data.data || [];
  },

  async getProductBySlug(slug) {
    const response = await apiClient.get(`/api/products/${slug}`);
    return response.data.data;
  },

  async getProductById(id) {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  },

  async updateProduct(id, formData) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error(
        "XSRF-TOKEN cookie not found after fetching CSRF cookie."
      );
    }

    formData.append("_method", "PUT");

    const response = await apiClient.post(`/api/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      },
      withCredentials: true,
    });

    return response.data;
  },

  async getMyProducts(config = {}) {
    // 1. Fetch User (Handles Server/Client logic internally)
    const userResponse = await authService.getUser(config);
    const producerId = userResponse.data.producer_profile?.id;

    if (!producerId) throw new Error("User is not a producer");

    // 2. Prepare headers for the second request
    let headers = config.headers || {};

    // If Server-Side, we must forward cookies manually again
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      headers = {
        ...headers,
        Cookie: cookieStore.toString(),
        Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      };
    }

    // 3. Fetch Producer Sounds
    const response = await apiClient.get(
      `/api/producers/${producerId}/sounds`,
      {
        ...config,
        headers, // Attach the server headers if needed
        withCredentials: true, // For client side
      }
    );
    return response.data.data;
  },

  async deleteProduct(id) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error(
        "XSRF-TOKEN cookie not found after fetching CSRF cookie."
      );
    }

    const response = await apiClient.delete(`/api/products/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      },
      withCredentials: true,
    });

    return response.data;
  },
};
