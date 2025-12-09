import { PublicHeader } from "@/app/components/PublicHeader";
import React from "react";

export default function CheckoutLayout({ children }) {
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
}
