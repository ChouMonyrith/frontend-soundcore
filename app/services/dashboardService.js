import apiClient from "@/app/lib/api";

export async function dashboardStats() {
  const response = await apiClient.get("/api/dashboard/stats");
  return response.data;
}

export async function dashboardRecentSales() {
  const response = await apiClient.get("/api/dashboard/recent-sales");
  return response.data;
}
