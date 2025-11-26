"use client";

import AuthForm from "@/app/components/AuthForm";
import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SingUpPage() {
  // // Note: Typo 'SingUp' instead of 'SignUp'? Correct if needed.

  return <AuthForm mode="register" />;
}
