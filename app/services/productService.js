"use server";
import apiClient from "@/app/lib/api";
import { authService } from "./authService";
import { cookies } from "next/headers";

export async function uploadProduct(formData) {
  const cookieStore = await cookies();
  const xsrfToken = cookieStore.get("XSRF-TOKEN")?.value;

  if (!xsrfToken) {
    throw new Error("XSRF-TOKEN cookie not found.");
  }

  try {
    const url = `${
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
    }/api/products`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        Cookie: cookieStore.toString(),
        Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Upload failed details:", errorData);
      throw new Error(
        errorData.message || `Upload failed with status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
}

export async function getProducts(filters) {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      if (key === "category" && value === "All") return;
      if (key === "tags") {
        const normalized = String(value)
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
          .join(",");

        if (!normalized) return;
        params.set(key, normalized);
        return;
      }

      params.set(key, value);
    });
  }

  const response = await apiClient.get("/api/products", {
    params,
  });

  const data = response.data;
  return Array.isArray(data) ? data : data.data || [];
}

export async function getProductBySlug(slug) {
  let headers = {};

  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    headers = {
      Cookie: cookieStore.toString(),
      Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    };
  }

  const response = await apiClient.get(`/api/products/${slug}`, {
    headers,
  });
  return response.data.data;
}

export async function getProductById(id) {
  const response = await apiClient.get(`/api/products/${id}`);
  return response.data;
}

export async function updateProduct(id, formData) {
  const cookieStore = await cookies();
  const xsrfToken = cookieStore.get("XSRF-TOKEN")?.value;

  if (!xsrfToken) {
    throw new Error("XSRF-TOKEN cookie not found.");
  }

  formData.append("_method", "PUT");

  const url = `${
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
  }/api/products/${id}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      Cookie: cookieStore.toString(),
      Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      Accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Update failed");
  }

  return await response.json();
}

export async function getMyProducts(config = {}) {
  // 1. Fetch User (Handles Server/Client logic internally)
  const userResponse = await authService.getUser(config);
  const producerId = userResponse.data.producer_profile?.id;

  if (!producerId) throw new Error("User is not a producer");

  // 2. Prepare headers for the second request
  let headers = config.headers || {};

  // If Server-Side, we must forward cookies manually again
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    headers = {
      ...headers,
      Cookie: cookieStore.toString(),
      Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    };
  }

  // 3. Fetch Producer Sounds
  const response = await apiClient.get(`/api/producers/${producerId}/sounds`, {
    ...config,
    headers, // Attach the server headers if needed
  });
  return response.data.data;
}

export async function getDownloads() {
  const cookieStore = await cookies();
  const xsrfToken = cookieStore.get("XSRF-TOKEN")?.value;

  if (!xsrfToken) {
    throw new Error("XSRF-TOKEN cookie not found.");
  }

  const response = await apiClient.get("/api/my-downloads", {
    headers: {
      "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      Cookie: cookieStore.toString(),
      Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    },
  });
  return response.data;
}

export async function deleteProduct(id) {
  const cookieStore = await cookies();
  const xsrfToken = cookieStore.get("XSRF-TOKEN")?.value;

  if (!xsrfToken) {
    throw new Error("XSRF-TOKEN cookie not found.");
  }

  const response = await apiClient.delete(`/api/products/${id}`, {
    headers: {
      "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      Cookie: cookieStore.toString(),
      Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    },
  });

  return response.data;
}

export async function createReview(id, reviewData) {
  const cookieStore = await cookies();
  const xsrfToken = cookieStore.get("XSRF-TOKEN")?.value;

  if (!xsrfToken) {
    throw new Error("XSRF-TOKEN cookie not found.");
  }

  const response = await apiClient.post(
    `/api/products/${id}/reviews`,
    reviewData,
    {
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        Cookie: cookieStore.toString(),
        Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      },
      withCredentials: true,
    }
  );

  return response.data;
}

export async function getTrendingTags() {
  const response = await apiClient.get("/api/tags/trending");
  return response.data.tags;
}

export async function getPopularProducts() {
  const response = await apiClient.get("/api/products/popular");
  return response.data.data;
}
