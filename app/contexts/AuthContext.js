"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/app/services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getUser();
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
      await authService.login(email, password);

      // Fetch the user profile *after* login to update context state
      const response = await authService.getUser();
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
      await authService.logout();
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
      const response = await authService.register(
        name,
        email,
        password,
        password_confirmation
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
      const response = await authService.forgotPassword(email);

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
      const response = await authService.resetPassword(
        token,
        email,
        password,
        password_confirmation
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
    try {
      const res = await authService.verifyEmail();
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
