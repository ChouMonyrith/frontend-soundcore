"use client";

import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import apiClient, { getCookie } from "@/app/lib/api";
import { Link } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div className="p-8">
        <p>
          You are not logged in. Please{" "}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            sign in
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      {/* Check if email is verified */}
      {!user.email_verified_at && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>Please verify your email address. Check your inbox.</p>
          {/* Add a button to resend verification email */}
          <button
            onClick={async () => {
              try {
                await apiClient.get("/sanctum/csrf-cookie", {
                  withCredentials: true,
                });

                const xsrfToken = getCookie("XSRF-TOKEN");

                await apiClient.post(
                  "/email/verification-notification",
                  {},
                  {
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
                    },
                    withCredentials: true,
                  }
                );
                alert("Verification email resent!");
              } catch (error) {
                console.error("Error resending verification:", error);
                alert("Failed to resend verification email.");
              }
            }}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Resend Verification Email
          </button>
        </div>
      )}
    </div>
  );
}
