"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import apiClient, { getCsrfCookie } from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get("/api/user");
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  const login = async (email, password) => {
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

      // Attempt login
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
      // Call the logout endpoint provided by Breeze
      await apiClient.post("/logout");
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
      await apiClient.get("/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const xsrfToken = getCookie("XSRF-TOKEN");
      if (!xsrfToken) {
        throw new Error(
          "XSRF-TOKEN cookie not found after fetching CSRF cookie."
        );
      }

      await apiClient.post(
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
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
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
