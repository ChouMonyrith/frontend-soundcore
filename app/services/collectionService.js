"use server";
import apiClient from "@/app/lib/api";
import { cookies } from "next/headers";

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

export async function getCollections() {
  const config = await getServerHeaders();
  const response = await apiClient.get("/api/collections", config);
  return response.data.data;
}

export async function getCollection(id) {
  const config = await getServerHeaders();
  const response = await apiClient.get(`/api/collections/${id}`, config);
  return response.data;
}

export async function getUserCollections(profileId) {
  const config = await getServerHeaders();
  const response = await apiClient.get(
    `/api/profiles/${profileId}/collections`,
    config,
  );
  return response.data;
}

export async function createCollection(data) {
  const config = await getServerHeaders();
  if (!config.headers) config.headers = {};

  let payload;

  if (data instanceof FormData) {
    // Dialog sent us a ready-made FormData — pass it straight through.
    // Set Content-Type to undefined so Axios auto-sets multipart/form-data
    // WITH the correct boundary string. Never set it to "multipart/form-data"
    // manually — that omits the boundary and breaks server parsing.
    config.headers["Content-Type"] = undefined;
    payload = data;
  } else if (data.cover_image instanceof File) {
    // Legacy: plain object with a File inside — build FormData ourselves
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(
          key,
          typeof data[key] === "boolean" ? (data[key] ? "1" : "0") : data[key],
        );
      }
    });
    config.headers["Content-Type"] = undefined;
    payload = formData;
  } else {
    // Plain JSON — no file
    const { cover_image, ...rest } = data;
    payload = rest;
  }

  const response = await apiClient.post("/api/collections", payload, config);
  return response.data;
}

export async function updateCollection(id, data) {
  const config = await getServerHeaders();
  if (!config.headers) config.headers = {};

  const url = `/api/collections/${id}`;

  if (data instanceof FormData) {
    // Ready-made FormData from dialog (may contain a file)
    // Add _method=PUT for Laravel method spoofing
    if (!data.has("_method")) data.append("_method", "PUT");
    config.headers["Content-Type"] = undefined; // Let Axios set boundary
    const response = await apiClient.post(url, data, config);
    return response.data;
  }

  const hasFile = data.cover_image instanceof File;

  if (hasFile) {
    const formData = new FormData();
    formData.append("_method", "PUT");
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(
          key,
          typeof data[key] === "boolean" ? (data[key] ? "1" : "0") : data[key],
        );
      }
    });
    config.headers["Content-Type"] = undefined;
    const response = await apiClient.post(url, formData, config);
    return response.data;
  }

  // Plain JSON — no file
  const { cover_image, ...rest } = data;
  const response = await apiClient.put(url, rest, config);
  return response.data;
}

export async function addProductToCollection(collectionId, productId) {
  const config = await getServerHeaders();
  const response = await apiClient.post(
    `/api/collections/${collectionId}/products`,
    { product_id: productId },
    config,
  );

  return response.data;
}

export async function removeProductFromCollection(collectionId, productId) {
  const config = await getServerHeaders();
  const response = await apiClient.delete(
    `/api/collections/${collectionId}/products/${productId}`,
    config,
  );
  return response.data;
}

export async function removeCollection(collectionId) {
  const config = await getServerHeaders();
  const response = await apiClient.delete(
    `/api/collections/${collectionId}`,
    config,
  );

  return response.data;
}
