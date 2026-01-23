"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ meta }) {
  const searchParams = useSearchParams();
  const { current_page, last_page, links } = meta || {};

  if (!meta || last_page <= 1) return null;

  const createPageUrl = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Link
        href={createPageUrl(current_page - 1)}
        className={`p-2 rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:text-white transition-colors ${
          current_page === 1 ? "pointer-events-none opacity-50" : ""
        }`}
        aria-disabled={current_page === 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      <div className="flex items-center gap-2">
        {links.slice(1, -1).map((link, index) => {
          const isActive = link.active;
          const pageNumber = link.label;

          if (pageNumber === "...") {
            return (
              <span key={index} className="px-2 text-neutral-500">
                ...
              </span>
            );
          }

          return (
            <Link
              key={index}
              href={createPageUrl(pageNumber)}
              className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white text-black"
                  : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>

      <Link
        href={createPageUrl(current_page + 1)}
        className={`p-2 rounded-lg border border-white/10 bg-white/5 text-neutral-400 hover:text-white transition-colors ${
          current_page === last_page ? "pointer-events-none opacity-50" : ""
        }`}
        aria-disabled={current_page === last_page}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
