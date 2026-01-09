import apiClient, { getCookie, getCsrfCookie } from "@/app/lib/api";

export async function createProducerProfile(data) {
  await getCsrfCookie();
  const xsrfToken = getCookie("XSRF-TOKEN");

  if (!xsrfToken) {
    throw new Error("XSRF-TOKEN cookie not found after fetching CSRF cookie.");
  }

  const response = await apiClient.post("/api/producers", data, {
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
    },
    withCredentials: true,
  });

  return response.data;
}

export async function requestProducerStatus(data) {
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
}

export async function getProducerRequests() {
  const response = await apiClient.get("/api/producer/request");
  return response.data;
}

export async function approveProducerRequest(id) {
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
}

export async function rejectProducerRequest(id) {
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
}

export async function getTopProducers() {
  const response = await apiClient.get("/api/producers/top-producers");
  return response.data.data;
}

const producerService = {
  createProducerProfile,
  requestProducerStatus,
  getProducerRequests,
  approveProducerRequest,
  rejectProducerRequest,
  getTopProducers,
};

export default producerService;
