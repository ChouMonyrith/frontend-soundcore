"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import apiClient, { getCookie, getCsrfCookie } from "@/app/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get("/api/user", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await getCsrfCookie();

      const xsrfToken = getCookie("XSRF-TOKEN");

      if (!xsrfToken) {
        throw new Error(
          "XSRF-TOKEN cookie not found after fetching CSRF cookie."
        );
      }

      await apiClient.post(
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

      // Fetch the user profile *after* login to update context state
      const response = await apiClient.get("/api/user");
      setUser(response.data);

      // Redirect after successful login
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await getCsrfCookie();

      const xsrfToken = getCookie("XSRF-TOKEN");

      if (!xsrfToken) {
        throw new Error(
          "XSRF-TOKEN cookie not found after fetching CSRF cookie."
        );
      }

      await apiClient.post(
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
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      router.push("/sign-in");
    }
  };

  const register = async (name, email, password, password_confirmation) => {
    setLoading(true);
    try {
      await getCsrfCookie();

      const xsrfToken = getCookie("XSRF-TOKEN");
      if (!xsrfToken) {
        throw new Error(
          "XSRF-TOKEN cookie not found after fetching CSRF cookie."
        );
      }

      const response = await apiClient.post(
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

      router.push("/sign-in");

      return response.data.message;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      await apiClient.get("/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const xsrfToken = getCookie("XSRF-TOKEN");
      if (!xsrfToken) {
        throw new Error(
          "XSRF-TOKEN cookie not found after fetching CSRF cookie."
        );
      }

      const response = await apiClient.post(
        "/forgot-password",
        {
          email,
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

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Unexpected response status");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        throw error.response.data.errors;
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    token,
    email,
    password,
    password_confirmation
  ) => {
    setLoading(true);
    try {
      await getCsrfCookie();

      const xsrfToken = getCookie("XSRF-TOKEN");

      if (!xsrfToken) {
        throw new Error(
          "XSRF-TOKEN cookie not found after fetching CSRF cookie."
        );
      }

      const response = await apiClient.post(
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

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Unexpected response data");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        throw error.response.data.errors;
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    await getCsrfCookie();
    const xsrf = getCookie("XSRF-TOKEN");

    try {
      const res = await apiClient.post(
        "/email/verification-notification",
        {},
        {
          headers: {
            "X-XSRF-TOKEN": decodeURIComponent(xsrf),
            Accept: "application/json",
          },
        }
      );

      return res.data; // Laravel returns { status: "verification-link-sent" }
    } catch (error) {
      console.error("Verify email resend error:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
