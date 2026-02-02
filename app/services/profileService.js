"use server";

import { cookies } from "next/headers";
import apiClient from "../lib/api";

async function getServerHeaders() {
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
  return {};
}

export async function getProfile(id) {
  const response = await apiClient.get(`/api/profiles/${id}`);
  return response.data.data;
}

export async function getMyProfile() {
  const config = await getServerHeaders();
  const response = await apiClient.get(`/api/profiles/me`, config);
  return response.data.data;
}

export async function getProfileSounds(id) {
  const config = await getServerHeaders();
  const response = await apiClient.get(`/api/profiles/${id}/sounds`, config);
  return response.data.data;
}

export async function toggleFollow(id) {
  const config = await getServerHeaders();
  const response = await apiClient.post(
    `/api/profiles/${id}/follow`,
    {},
    config,
  );
  return response.data.data;
}

export async function updateProfile(formData) {
  const config = await getServerHeaders();

  // Clean up formData if needed or just pass it?
  // apiClient post with FormData handles boundary if Content-Type is not set to multipart manually.
  // But wait, in Server Actions, formData is usually passed as `FormData` object.
  // Axios on Node environment needs `form-data` library for FormData?
  // No, if we use `FormData` standard object in newer Node versions, Axios supports it?
  // Actually, passing FormData from Server Action to Axios might require serialization or handling.
  // For now, assuming Axios handles it or we pass a plain object?
  // The user passed `FormData` from client.

  const response = await apiClient.post(`/api/profiles/update`, formData, {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "multipart/form-data", // OR undefined?
      // If passing FormData instance in Node, Axios needs headers to be calculated.
      // Safest is to let Axios handle it?
      // Let's try undefined for Content-Type to see if Axios sets boundary.
      "Content-Type": undefined,
    },
  });
  return response.data.data;
}
