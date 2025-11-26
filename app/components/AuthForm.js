"use client";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";

export default function AuthForm({ mode = "login", token = null }) {
  const { login, register, forgotPassword, resetPassword } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const titles = {
    login: "Welcome Back",
    register: "Join SoundCore",
    forgotPassword: "Forgot Password",
    resetPassword: "Reset Your Password",
  };

  const subtitles = {
    login: "Sign in to continue your creative journey",
    register: "Create your free account and start exploring",
    forgotPassword: "Enter your email to receive a reset link",
    resetPassword: "Enter your new password",
  };

  const fieldConfig = {
    login: [
      { name: "email", type: "email", placeholder: "Enter your email" },
      {
        name: "password",
        type: "password",
        placeholder: "Enter your password",
      },
    ],
    register: [
      { name: "name", type: "text", placeholder: "Full Name" },
      { name: "email", type: "email", placeholder: "Email Address" },
      { name: "password", type: "password", placeholder: "Create Password" },
      {
        name: "password_confirmation",
        type: "password",
        placeholder: "Confirm Password",
      },
    ],
    forgotPassword: [
      { name: "email", type: "email", placeholder: "Email Address" },
    ],
    resetPassword: [
      { name: "password", type: "password", placeholder: "New Password" },
      {
        name: "password_confirmation",
        type: "password",
        placeholder: "Confirm New Password",
      },
    ],
  };

  const labels = {
    name: "Full Name",
    email: "Email Address",
    password: "Password",
    password_confirmation: "Confirm Password",
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage(null);

    try {
      if (mode === "login") {
        const message = await login(form.email, form.password);
        setMessage(message);
      } else if (mode === "register") {
        const message = await register(
          form.name,
          form.email,
          form.password,
          form.password_confirmation
        );
        setMessage(message);
      } else if (mode === "forgotPassword") {
        const message = await forgotPassword(form.email);
        setMessage(message);
      } else if (mode === "resetPassword") {
        const message = await resetPassword(
          form.password,
          form.password_confirmation,
          token
        );
        setMessage(message);
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-3 relative">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/AuthBG.png')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* LOGO */}
      <div className="absolute top-15 left-15 z-20">
        <Link
          href="/"
          className="text-2xl font-bold text-white tracking-tighter hover:opacity-80 transition-opacity"
        >
          SoundCore
        </Link>
      </div>

      {/* LEFT SIDE (2/3) */}
      <div className="hidden lg:flex col-span-2 items-center px-20 text-white">
        <div className="max-w-xl space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            Shape the Future of Audio.
          </h1>
          <p className="text-lg text-gray-200">
            Create, upload, and discover premium sound assets with SoundCore.
            Join thousands of creators elevating their audio experience.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (1/3) */}
      <div className="col-span-1 flex text-white items-center shadow-2xl z-20 justify-start p-8">
        <div className="w-full max-w-md bg-black backdrop-blur-xl rounded-lg shadow-2xl p-10 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">{titles[mode]}</h2>
            <p className="text-white mt-2">{subtitles[mode]}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {fieldConfig[mode].map((field) => (
              <div key={field.name}>
                <label className="text-sm font-medium text-white">
                  {labels[field.name]}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent"
                />
                {errors[field.name] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[field.name][0]}
                  </p>
                )}
              </div>
            ))}

            {mode === "login" && (
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-white hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            )}

            {message && (
              <p className="text-red-600 text-sm bg-red-100 px-3 py-2 rounded-lg">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-orange-600 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-white">
            {mode === "login" ? (
              <p>
                New to SoundCore?{" "}
                <Link href="/sign-up" className="text-white hover:underline">
                  Create an account
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link href="/sign-in" className="text-white hover:underline">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
