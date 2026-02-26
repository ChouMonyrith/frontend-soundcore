import apiClient from "../lib/api";

export async function searchAll(query) {
  const response = await apiClient.get(`/api/search?q=${query}`);
  return response.data;
}
