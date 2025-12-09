import apiClient, { getCookie, getCsrfCookie } from "@/app/lib/api";

const cartService = {
  async getCart() {
    const response = await apiClient.get("/api/carts");
    return response.data;
  },

  async addToCart(productId, licenseType = "standard", quantity = 1) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error("XSRF-TOKEN cookie not found.");
    }

    const response = await apiClient.post(
      "/api/carts",
      {
        product_id: productId,
        license_type: licenseType,
        quantity: quantity,
      },
      {
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
      }
    );
    return response.data;
  },

  async updateCartItem(id, data) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error("XSRF-TOKEN cookie not found.");
    }

    const response = await apiClient.put(`/api/carts/${id}`, data, {
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      },
    });
    return response.data;
  },

  async removeFromCart(id) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error("XSRF-TOKEN cookie not found.");
    }

    await apiClient.delete(`/api/carts/${id}`, {
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      },
    });
  },

  async clearCart() {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error("XSRF-TOKEN cookie not found.");
    }

    await apiClient.delete("/api/carts", {
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      },
    });
  },
};

export default cartService;
