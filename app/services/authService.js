import apiClient, { getCookie, getCsrfCookie } from "@/app/lib/api";

export const authService = {
  async getUser(config = {}) {
    // 1. Server-Side Logic
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();

      // Forward all cookies (Session + XSRF) to the API
      return apiClient.get("/api/user", {
        ...config,
        headers: {
          ...config.headers,
          Cookie: cookieStore.toString(),
          // Sanctum requires a Referer header for stateful requests from the server
          Referer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        },
      });
    }

    // 2. Client-Side Logic (Your original code)
    if (Object.keys(config).length === 0) {
      await getCsrfCookie();
      const xsrfToken = getCookie("XSRF-TOKEN");

      if (!xsrfToken) {
        throw new Error(
          "XSRF-TOKEN cookie not found after fetching CSRF cookie."
        );
      }

      return apiClient.get("/api/user", {
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
          Accept: "application/json",
        },
        withCredentials: true,
      });
    }

    return apiClient.get("/api/user", {
      ...config,
      withCredentials: true,
    });
  },

  async login(email, password) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error(
        "XSRF-TOKEN cookie not found after fetching CSRF cookie."
      );
    }

    return apiClient.post(
      "/login",
      { email, password },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
        withCredentials: true,
      }
    );
  },

  async logout() {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error(
        "XSRF-TOKEN cookie not found after fetching CSRF cookie."
      );
    }

    return apiClient.post(
      "/logout",
      {},
      {
        withCredentials: true,
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
          Accept: "application/json",
        },
      }
    );
  },

  async register(name, email, password, password_confirmation) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error(
        "XSRF-TOKEN cookie not found after fetching CSRF cookie."
      );
    }

    return apiClient.post(
      "/register",
      {
        name,
        email,
        password,
        password_confirmation,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
        withCredentials: true,
      }
    );
  },

  async forgotPassword(email) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error(
        "XSRF-TOKEN cookie not found after fetching CSRF cookie."
      );
    }

    return apiClient.post(
      "/forgot-password",
      { email },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
        withCredentials: true,
      }
    );
  },

  async resetPassword(token, email, password, password_confirmation) {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (!xsrfToken) {
      throw new Error(
        "XSRF-TOKEN cookie not found after fetching CSRF cookie."
      );
    }

    return apiClient.post(
      "/reset-password",
      {
        token,
        email,
        password,
        password_confirmation,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
        withCredentials: true,
      }
    );
  },

  async verifyEmail() {
    await getCsrfCookie();
    const xsrfToken = getCookie("XSRF-TOKEN");

    return apiClient.post(
      "/email/verification-notification",
      {},
      {
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
          Accept: "application/json",
        },
      }
    );
  },
};
