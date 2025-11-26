// app/forgot-password/page.js
"use client"; // Mark as Client Component

import AuthForm from "@/app/components/AuthForm";

export default function ForgotPasswordPage() {
  return <AuthForm mode="forgotPassword" />;
}
