import apiClient, { getCookie, getCsrfCookie } from "@/app/lib/api";

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

  async updateProduct(slug, formData) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error(
        "XSRF-TOKEN cookie not found after fetching CSRF cookie."
      );
    }

    const response = await apiClient.put(`/api/products/${slug}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      },
      withCredentials: true,
    });

    return response.data;
  },
};
