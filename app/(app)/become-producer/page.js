"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import producerService from "@/app/services/producerService";
import { useRouter } from "next/navigation";

export default function BecomeProducerPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    bio: "",
    website: "",
  });

  const [status, setStatus] = useState(null); // 'idle', 'pending', 'approved', 'rejected'

  useEffect(() => {
    if (user?.producer_profile) {
      setStatus(user.producer_profile.status);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await producerService.createProducerProfile(formData);
      // Ideally, we should re-fetch the user to get the updated producer_profile
      // For now, we manually update the local status or show a success message
      setStatus("pending");
      // You might want to trigger a user refresh here if your AuthContext supports it
      window.location.reload(); // Simple way to refresh context for now
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "An error occurred while submitting your request."
      );
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (status === "approved") {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-4 bg-linear-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            You&apos;re a Producer!
          </h1>
          <p className="text-neutral-400 mb-6">
            You have already been approved as a producer. Start uploading your
            sounds today.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-primary-600 hover:bg-primary-500 text-white py-3 px-6 rounded-xl transition-all duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Application Pending</h1>
          <p className="text-neutral-400 mb-6">
            Your request to become a producer is currently under review.
            We&apos;ll notify you once your application has been processed.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-white py-3 px-6 rounded-xl transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Become a Producer
          </h1>
          <p className="text-neutral-400 text-lg">
            Join our community of creators and start selling your sounds to the
            world.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-neutral-300 mb-2"
              >
                Website / Portfolio URL
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://your-portfolio.com"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                required
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-neutral-300 mb-2"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself and your music..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all min-h-[150px] resize-y"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-500 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
