"use client";
import AuthForm from "@/app/components/auth/AuthForm";
import { use } from "react";

export default function ResetPasswordPage({ params, searchParams }) {
  const { token } = use(params);
  const { email } = use(searchParams);
  return <AuthForm mode="resetPassword" token={token} resetEmail={email} />;
}
