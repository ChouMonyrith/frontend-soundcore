import { PublicHeader } from "@/app/components/PublicHeader";
import React from "react";

export default function OrdersLayout({ children }) {
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
}
