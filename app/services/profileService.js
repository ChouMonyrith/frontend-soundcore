import apiClient from "../lib/api";

export const profileService = {
  async getProfile(id) {
    const response = await apiClient.get(`/api/profiles/${id}`);
    return response.data.data;
  },

  async getMyProfile() {
    const response = await apiClient.get(`/api/profiles/me`);
    return response.data.data;
  },

  async getProfileSounds(id) {
    const response = await apiClient.get(`/api/profiles/${id}/sounds`);
    return response.data.data;
  },

  async toggleFollow(id) {
    const cookieStore = await cookies();
    const xsrfToken = cookieStore.get("XSRF-TOKEN")?.value;

    if (!xsrfToken) {
      throw new Error("XSRF-TOKEN cookie not found.");
    }
    const response = await apiClient.post(`/api/profiles/${id}/follow`, {
      withCredentials: true,
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        Cookie: cookieStore.toString(),
        Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      },
    });
    return response.data.data;
  },
};
