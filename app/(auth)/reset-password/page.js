// app/reset-password/[token]/page.js (Dynamic route for the reset token)
// Note: This page receives the token via the URL parameter 'token'
// The email is usually sent in the form submission to /reset-password

"use client"; // Mark as Client Component

import { useState } from "react";
import { useRouter, useParams } from "next/navigation"; // App Router hooks, useParams for token
import Link from "next/link";
import apiClient from "@/app/lib/api"; // Adjust path to your apiClient instance

export default function ResetPasswordPage() {
  const params = useParams(); // Get the token from the URL: /reset-password/[token]
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "", // User needs to enter their email again
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage("");

    try {
      // Make the request to your Laravel backend's reset-password endpoint
      // Include the token from the URL params and the email and new passwords from the form
      const response = await apiClient.post("/reset-password", {
        token: params.token, // Get the token from the URL
        email: formData.email, // User enters their email again
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      // If successful, Laravel usually redirects or returns a success message.
      // For an API call, check the response format.
      // Breeze's default response might be a redirect or JSON.
      if (response.status === 200) {
        // Check status code
        setMessage(response.data.status || "Password reset successfully!"); // Laravel's default often has 'status' key
        // Optionally, redirect to login after a short delay
        // setTimeout(() => { router.push('/sign-in'); }, 3000);
        router.push("/sign-in"); // Redirect to sign in after successful reset
      } else {
        // If response status is not 200, it might contain errors
        if (response.data && response.data.errors) {
          setErrors(response.data.errors); // Handle Laravel validation errors (e.g., invalid token, password mismatch)
        } else if (response.data && response.data.message) {
          setMessage(response.data.message); // Handle other potential messages
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage("An error occurred. Please try again.");
      // Check for specific error response from Laravel
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors); // e.g., { token: ["This password reset token is invalid."] }
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
            Reset Your Password
          </h2>
        </div>

        {message && (
          <div
            className={`p-3 rounded-md ${
              message.includes("success")
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
              value={formData.email}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password[0]}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password_confirmation && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password_confirmation[0]}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Back to{" "}
            <Link
              href="/sign-in"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
