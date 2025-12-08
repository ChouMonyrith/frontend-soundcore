import apiClient, { getCookie, getCsrfCookie } from "@/app/lib/api";

const producerService = {
  async createProducerProfile(data) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error(
        "XSRF-TOKEN cookie not found after fetching CSRF cookie."
      );
    }

    const response = await apiClient.post("/api/producers", data, {
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      },
      withCredentials: true,
    });

    return response.data;
  },

  async requestProducerStatus(data) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    const response = await apiClient.post("/api/producer/request", data, {
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      },
      withCredentials: true,
    });
    return response.data;
  },

  async getProducerRequests() {
    const response = await apiClient.get("/api/producer/request");
    return response.data;
  },

  async approveProducerRequest(id) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    const response = await apiClient.post(
      `/api/producer/request/${id}/approve`,
      {},
      {
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
      }
    );
    return response.data;
  },

  async rejectProducerRequest(id) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    const response = await apiClient.post(
      `/api/producer/request/${id}/reject`,
      {},
      {
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
      }
    );
    return response.data;
  },
};

export default producerService;
