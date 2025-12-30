"use client";

import Link from "next/link";

export function ProBadge({
  label = "Pro",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href="/pro"
      className={
        "inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100 hover:bg-emerald-100 " +
        className
      }
      title="Recursos avançados (em breve)"
    >
      {label} <span className="font-normal text-emerald-700/80">em breve</span>
    </Link>
  );
}
