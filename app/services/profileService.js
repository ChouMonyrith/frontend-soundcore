import apiClient from "../lib/api";

async function getServerHeaders() {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const xsrfToken = cookieStore.get("XSRF-TOKEN")?.value;

    if (xsrfToken) {
      return {
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
          Cookie: cookieStore.toString(),
          Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        },
      };
    }
  }
  return {};
}

export const profileService = {
  async getProfile(id) {
    const response = await apiClient.get(`/api/profiles/${id}`);
    return response.data.data;
  },

  async getMyProfile() {
    const config = await getServerHeaders();
    const response = await apiClient.get(`/api/profiles/me`, config);
    return response.data.data;
  },

  async getProfileSounds(id) {
    const config = await getServerHeaders();
    const response = await apiClient.get(`/api/profiles/${id}/sounds`, config);
    return response.data.data;
  },

  async toggleFollow(id) {
    const response = await apiClient.post(`/api/profiles/${id}/follow`, {});
    return response.data.data;
  },
};
