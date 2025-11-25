"use client";

import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  return <div>{user.name}</div>;
}
