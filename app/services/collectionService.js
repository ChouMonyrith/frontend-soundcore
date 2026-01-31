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

  let payload;

  // Check if we have a file image
  if (data.cover_image instanceof File) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        // Convert boolean to 1/0 for safer FormData handling
        if (typeof data[key] === "boolean") {
          formData.append(key, data[key] ? "1" : "0");
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    payload = formData;

    // START FIX: Force Content-Type to multipart/form-data to override the application/json default in apiClient
    if (!config.headers) {
      config.headers = {};
    }
    config.headers["Content-Type"] = "multipart/form-data";
    // END FIX
  } else {
    const { cover_image, ...rest } = data;
    payload = { ...rest };
  }

  const response = await apiClient.post("/api/collections", payload, config);
  return response.data;
}

export async function updateCollection(id, data) {
  const config = await getServerHeaders();
  let payload;

  // Check if we have a file image or need FormData for other reasons
  const hasFile = data.cover_image instanceof File;

  if (hasFile) {
    const formData = new FormData();
    formData.append("_method", "PUT"); // Method spoofing for Laravel

    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        if (typeof data[key] === "boolean") {
          formData.append(key, data[key] ? "1" : "0");
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    payload = formData;

    if (!config.headers) {
      config.headers = {};
    }
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    // Standard JSON update if no file
    const { cover_image, ...rest } = data;
    // If cover_image is a string (URL), we generally simply don't send it or send it as is,
    // but typically APIs ignore image URLs on update unless it's a specific "remove" flag.
    // For now we assume if it's not a File, we just send the text fields.
    payload = { ...rest };
  }

  // If using FormData with _method spoofing, we POST to the ID url? No, usually POST to URL with _method.
  // Actually Laravel standard is POST to /resource/id with _method=PUT for file uploads.
  // Standard PUT for JSON.

  const url = `/api/collections/${id}`;

  if (hasFile) {
    const response = await apiClient.post(url, payload, config);
    return response.data;
  } else {
    const response = await apiClient.put(url, payload, config);
    return response.data;
  }
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
