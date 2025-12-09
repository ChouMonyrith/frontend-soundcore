import { PublicHeader } from "@/app/components/PublicHeader";
import React from "react";

export default function CartLayout({ children }) {
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
}
