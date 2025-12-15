import { PublicHeader } from "@/app/components/layout/PublicHeader";
import React from "react";

export default function CartLayout({ children }) {
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
}
