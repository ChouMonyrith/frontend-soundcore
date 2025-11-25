// app/forgot-password/page.js
"use client"; // Mark as Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // App Router hook
import Link from "next/link";
import apiClient, { getCookie } from "@/app/lib/api"; // Adjust path to your apiClient instance

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage("");

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

      if (response.status === 200 || response.status === 201) {
        // Check status code
        setMessage(
          response.data.status || "Password reset link sent successfully!"
        );
        setEmail("");
      } else {
        if (response.data && response.data.errors) {
          setErrors(response.data.errors);
        } else if (response.data && response.data.message) {
          setMessage(response.data.message);
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage("An error occurred. Please try again.");
      // Check for specific error response from Laravel
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors); // e.g., { email: ["We can't find a user with that email address."] }
      } else if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded border shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Your Password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            No worries, we&apos;ll send you a reset link.
          </p>
        </div>

        {message && (
          <div
            className={`p-3 rounded-md ${
              message.includes("success") || message.includes("sent")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
